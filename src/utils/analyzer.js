export const analyzeResume = (resume) => {
  let score = 0;
  const feedback = [];

  // 1. Summary Analysis
  if (!resume.summary || resume.summary.length < 50) {
    feedback.push("Your professional summary is too short. Aim for 2-3 sentences that highlight your key value.");
  } else if (resume.summary.length > 500) {
    score += 15;
    feedback.push("Professional summary is detailed and well-written.");
  } else {
    score += 20;
    feedback.push("Professional summary looks good.");
  }

  // 2. Skills Analysis
  if (!resume.skills || resume.skills.length < 3) {
    feedback.push("Add more relevant skills (at least 5-8) to improve keyword matching for ATS.");
  } else {
    score += Math.min(resume.skills.length * 4, 25);
    feedback.push(`${resume.skills.length} skills identified. Good range.`);
  }

  // 3. Experience Analysis
  if (!resume.experience || resume.experience.length === 0) {
    feedback.push("Experience section is empty. List your past roles with specific achievements.");
  } else {
    score += 30;
    const actionVerbs = ['led', 'developed', 'managed', 'created', 'improved', 'spearheaded', 'coordinated', 'designed'];
    let hasActionVerbs = false;
    
    resume.experience.forEach(exp => {
      const desc = exp.description?.toLowerCase() || '';
      if (actionVerbs.some(verb => desc.includes(verb))) {
        hasActionVerbs = true;
      }
    });

    if (!hasActionVerbs) {
      feedback.push("Use more action verbs like 'Led', 'Developed', or 'Managed' in your experience descriptions.");
    } else {
      score += 15;
      feedback.push("Strong use of action verbs in experience section.");
    }
  }

  // 4. Education Analysis
  if (!resume.education || resume.education.length === 0) {
    feedback.push("Include your educational background.");
  } else {
    score += 10;
  }

  return {
    score: Math.min(score, 100),
    feedback: feedback
  };
};
