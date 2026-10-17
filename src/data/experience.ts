import { Experience } from '@/types';

export const experienceData: Experience[] = [
  {
    id: 'actifyzone-internship',
    company: 'Actifyzone',
    role: 'Full Stack Developer Intern',
    location: 'Remote / Hybrid', // [EDITABLE PLACEHOLDER: Update location if needed]
    type: 'Internship',
    period: 'Internship Period (e.g. 2024 - 2025)', // [EDITABLE PLACEHOLDER: Add exact dates e.g. Jun 2024 - Dec 2024]
    startDate: '2024',
    endDate: '2025',
    current: false,
    description: 'Contributed as a Full Stack Developer Intern, collaborating with cross-functional teams to build, test, and deploy responsive web interfaces, robust backend APIs, and database workflows.',
    responsibilities: [
      'Engineered responsive web interfaces using React, Next.js, and modern CSS/Tailwind utilities to ensure seamless user engagement across devices.',
      'Developed and integrated RESTful APIs, handling asynchronous data fetching, error handling, and structured JSON payloads.',
      'Designed and optimized database queries with MongoDB Atlas and MySQL, ensuring high data integrity and efficient response times.',
      'Collaborated in Agile sprints, participated in code reviews on GitHub, and resolved frontend and backend issues.'
    ],
    keyAchievements: [
      'Improved component reusability and reduced styling redundancy by implementing shared design tokens and modular UI components.',
      'Optimized client-side rendering and API response formatting, resulting in smoother page navigation and reduced network payloads.',
      'Delivered production-ready modules within sprint deadlines with thorough unit testing.'
    ],
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'REST APIs',
      'MongoDB Atlas',
      'Node.js',
      'Git & GitHub'
    ],
    verified: true,
    isInternship: true,
    website: 'https://actifyzone.com' // [EDITABLE PLACEHOLDER: Verify/update company URL]
  },
  {
    id: 'havet-ai-internship',
    company: 'Havet AI',
    role: 'Software Engineer Intern',
    location: 'Remote', // [EDITABLE PLACEHOLDER: Update location if needed]
    type: 'Internship',
    period: 'Internship Period (e.g. 2024)', // [EDITABLE PLACEHOLDER: Add exact dates]
    startDate: '2024',
    endDate: '2024',
    current: false,
    description: 'Engaged as a Software Engineer Intern at Havet AI, focusing on AI-driven platform features, backend microservices, intelligent workflow integrations, and user experience enhancements.',
    responsibilities: [
      'Participated in developing and testing scalable backend services using NestJS and Spring Boot for AI application pipelines.',
      'Integrated external REST APIs, machine learning inference endpoints, and caching layers to accelerate data retrieval.',
      'Refined user-facing dashboards and data visualization components with TypeScript and reactive state management.',
      'Implemented robust validation logic using Zod and class-validator to ensure strict runtime data safety.'
    ],
    keyAchievements: [
      'Streamlined API response times by incorporating caching strategies and indexing database fields in MongoDB and MySQL.',
      'Built reusable, accessible UI elements enabling smooth user interaction with AI prompt pipelines and results.',
      'Active contributor to architectural design discussions, documentation, and automated testing.'
    ],
    technologies: [
      'NestJS',
      'Spring Boot',
      'Java',
      'TypeScript',
      'REST APIs',
      'MongoDB',
      'MySQL',
      'Postman',
      'Git'
    ],
    verified: true,
    isInternship: true,
    website: 'https://havet.ai' // [EDITABLE PLACEHOLDER: Verify/update company URL]
  }
];

export const educationData = [
  {
    id: 'btech-cs',
    institution: 'University / Institute of Technology', // [EDITABLE PLACEHOLDER: Add your college/university name]
    degree: 'Bachelor of Technology (B.Tech)',
    fieldOfStudy: 'Computer Science and Engineering',
    period: '2021 – 2025 (or Expected)', // [EDITABLE PLACEHOLDER: Add graduation years]
    score: 'First Class with Distinction', // [EDITABLE PLACEHOLDER: Add GPA or percentage if desired]
    coursework: [
      'Data Structures & Algorithms',
      'Object-Oriented Programming (Java)',
      'Database Management Systems (MySQL/NoSQL)',
      'Web Technologies & Cloud Computing',
      'Operating Systems & Computer Networks',
      'Software Engineering & System Design'
    ],
    verified: true
  }
];
