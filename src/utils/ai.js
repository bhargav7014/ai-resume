/**
 * AI Analysis Service using Groq (OpenAI-compatible)
 * Groq is used for ultra-fast inference speeds.
 */

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export const analyzeResumeWithAI = async (resumeData, jobDescription = "") => {
  if (!GROQ_API_KEY || GROQ_API_KEY === 'YOUR_API_KEY_HERE') {
    throw new Error("Missing Groq API Key. Please ensure VITE_GROQ_API_KEY is set in your .env file.");
  }

  const prompt = `
    You are an elite Technical Recruiter and ATS Optimization Expert. 
    Critically analyze the resume data below for professional impact, quantitative achievements, and keyword alignment.
    
    ${jobDescription ? `TARGET JOB DESCRIPTION (Analyze alignment with these specific requirements):\n${jobDescription}\n\n` : "Analyze against modern high-growth tech industry standards."}
    
    Provide:
    1. A numerical 'Job Fit Score' (0-100). Be strict. A generic resume should score low, while a perfectly tailored one scores 90+. 
    2. Exactly 5 highly specific, professional, and actionable tips. Do not give generic advice like 'add more skills'. Instead, say 'Include specific experience with [Keyword] as requested in the JD' or 'Quantify the impact in your [X] role'.
    
    Resume Data:
    ${JSON.stringify(resumeData, null, 2)}
    
    Return the response ONLY as a valid JSON object:
    {
      "score": number,
      "feedback": ["tip 1", "tip 2", "tip 3", "tip 4", "tip 5"]
    }
    
    Do not include any other text or markdown formatting in your response.
  `;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: "You are a professional resume analyzer that returns only JSON."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.3,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Groq API call failed");
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    return JSON.parse(content);
  } catch (error) {
    console.error("AI Analysis Error:", error);
    throw error;
  }
};

export const enhanceTextWithAI = async (text, fieldType, jobDescription = "") => {
  if (!GROQ_API_KEY || GROQ_API_KEY === 'YOUR_API_KEY_HERE') {
    throw new Error("Missing Groq API Key.");
  }

  const prompt = `
    You are a professional resume writer. 
    Polish and enhance the following ${fieldType} to make it sound more professional, impactful, and achievement-oriented.
    Keep it concise and appropriate for a high-end resume.
    
    ${jobDescription ? `Target Job Description (Optimize for these keywords): ${jobDescription}` : ""}
    
    Original Text: ${text}
    
    Return ONLY the enhanced text. Do not include any explanations or conversational text.
  `;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.5
      })
    });

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error("AI Enhancement Error:", error);
    return text; // Return original text on failure
  }
};

export const parseResumeWithAI = async (rawText) => {
  if (!GROQ_API_KEY || GROQ_API_KEY === 'YOUR_API_KEY_HERE') {
    throw new Error("Missing Groq API Key.");
  }

  const prompt = `
    Extract structured resume data from the following raw text. 
    Map it EXACTLY to this JSON structure:
    {
      "name": "string",
      "title": "string",
      "summary": "string",
      "skills": ["string"],
      "experience": [
        { "id": "unique_string", "title": "string", "company": "string", "duration": "string", "description": "string" }
      ],
      "education": [
        { "id": "unique_string", "degree": "string", "institution": "string", "duration": "string" }
      ],
      "projects": [
        { "id": "unique_string", "title": "string", "duration": "string", "description": "string" }
      ]
    }

    Raw Text: 
    ${rawText}

    Rules:
    1. If a field is missing, use an empty string or empty array.
    2. Generate unique IDs for experience, education, and project items.
    3. Return ONLY valid JSON.
  `;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: "You are a resume parsing assistant that returns JSON." },
          { role: "user", content: prompt }
        ],
        temperature: 0.1,
        response_format: { type: "json_object" }
      })
    });

    const data = await response.json();
    const content = data.choices[0].message.content;
    return JSON.parse(content);
  } catch (error) {
    console.error("AI Parsing Error:", error);
    throw error;
  }
};
