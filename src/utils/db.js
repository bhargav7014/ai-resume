
export const db = {
    resumes: [
        {
            id: '1',
            name: 'John Doe',
            title: 'Software Engineer',
            summary: 'A passionate software engineer with 5+ years of experience in building web applications.',
            skills: ['React', 'Node.js', 'JavaScript', 'HTML', 'CSS'],
            experience: [
                {
                    id: 'exp1',
                    title: 'Senior Software Engineer',
                    company: 'Google',
                    duration: '2020 - Present',
                    description: 'Worked on the Google Search team, improving the user experience.'
                },
                {
                    id: 'exp2',
                    title: 'Software Engineer',
                    company: 'Facebook',
                    duration: '2018 - 2020',
                    description: 'Developed new features for the Facebook news feed.'
                }
            ],
            education: [
                {
                    id: 'edu1',
                    degree: 'B.Sc. in Computer Science',
                    institution: 'University of California, Berkeley',
                    duration: '2014 - 2018'
                }
            ]
        }
    ]
}
