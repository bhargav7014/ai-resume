const AI_ENDPOINT = '/api/ai'

const requestAI = async ({ messages, model = 'llama-3.3-70b-versatile', temperature = 0.3, json = false }) => {
  const response = await fetch(AI_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      messages,
      temperature,
      ...(json ? { response_format: { type: 'json_object' } } : {}),
    }),
  })

  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.error || 'AI request failed')

  const content = data.choices?.[0]?.message?.content
  if (!content) throw new Error('AI returned an empty response')
  return content
}

export const analyzeResumeWithAI = async (resumeData, jobDescription = '') => {
  const prompt = `
You are an elite technical recruiter and ATS optimization expert.
Critically analyze the resume below for professional impact, measurable achievements, and keyword alignment.
${jobDescription ? `TARGET JOB DESCRIPTION:\n${jobDescription}\n` : 'Analyze against modern technology industry standards.'}

Return exactly this JSON shape:
{
  "score": number,
  "feedback": ["tip 1", "tip 2", "tip 3", "tip 4", "tip 5"]
}

Rules:
- Score from 0-100. Be strict; never guarantee employment.
- Give exactly 5 specific, actionable tips.
- Do not invent experience, metrics, skills, employers, or qualifications.
- Only recommend keywords that are supported by the target job description or resume.
- Return JSON only.

RESUME DATA:
${JSON.stringify(resumeData, null, 2)}
`

  const content = await requestAI({
    model: 'llama-3.3-70b-versatile',
    temperature: 0.2,
    json: true,
    messages: [
      { role: 'system', content: 'You are a professional resume analyzer. Return only valid JSON.' },
      { role: 'user', content: prompt },
    ],
  })

  const result = JSON.parse(content)
  return {
    score: Math.max(0, Math.min(100, Number(result.score) || 0)),
    feedback: Array.isArray(result.feedback) ? result.feedback.slice(0, 5) : [],
  }
}

export const enhanceTextWithAI = async (text, fieldType, jobDescription = '') => {
  const prompt = `
You are a professional resume writer. Improve this ${fieldType} so it is concise, credible, achievement-oriented, and ATS-friendly.
${jobDescription ? `Target job description:\n${jobDescription}\n` : ''}

Rules:
- Preserve the original facts.
- Never invent numbers, technologies, responsibilities, employers, or achievements.
- Do not add explanations or quotation marks.
- Return only the improved text.

Original text:
${text}
`

  return (await requestAI({
    model: 'llama-3.1-8b-instant',
    temperature: 0.4,
    messages: [{ role: 'user', content: prompt }],
  })).trim()
}

export const parseResumeWithAI = async (rawText) => {
  const prompt = `
Extract structured resume data from the raw text below.
Return exactly this JSON structure:
{
  "name": "string",
  "title": "string",
  "summary": "string",
  "skills": ["string"],
  "experience": [{ "id": "unique_string", "title": "string", "company": "string", "duration": "string", "description": "string" }],
  "education": [{ "id": "unique_string", "degree": "string", "institution": "string", "duration": "string" }],
  "projects": [{ "id": "unique_string", "title": "string", "duration": "string", "description": "string" }]
}

Rules:
- Preserve facts exactly; do not invent missing information.
- Use empty strings/arrays when information is absent.
- Generate unique IDs for structured items.
- Return JSON only.

RAW RESUME:
${rawText}
`

  const content = await requestAI({
    model: 'llama-3.3-70b-versatile',
    temperature: 0.1,
    json: true,
    messages: [
      { role: 'system', content: 'You are a resume parsing assistant. Return only valid JSON.' },
      { role: 'user', content: prompt },
    ],
  })

  return JSON.parse(content)
}
