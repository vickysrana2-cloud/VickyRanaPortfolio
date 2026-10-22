import { Experience } from '@/types';

export const experienceData: Experience[] = [
  {
    id: 'actifyzone-internship',
    company: 'Actifyzone',
    role: 'Frontend Developer Intern',
    location: 'Remote / Hybrid',
    type: 'Internship',
    period: 'Aug 2026 – Present',
    startDate: '2026',
    endDate: 'Present',
    current: true,
    description: 'Contributing to frontend development across multiple web projects, focusing on responsive UI engineering, cross-device compatibility, and accessible design.',
    responsibilities: [
      'Contributing to frontend development across multiple active web client projects.',
      'Working on responsive user interfaces, modular React/Next.js components, and CSS/Tailwind utilities.',
      'Implementing UI motion, interactive elements, and modern layout best practices.',
      'Collaborating with engineering team members on Git code reviews and interface testing.'
    ],
    keyAchievements: [
      'Engineered clean, reusable UI components that improved design consistency across client web projects.',
      'Optimized responsive layouts for mobile, tablet, and desktop viewports with zero visual regression.',
      'Delivered sprint deliverables on schedule with high adherence to usability standards.'
    ],
    technologies: [
      'Next.js',
      'React.js',
      'JavaScript (ES6+)',
      'Tailwind CSS',
      'HTML5 & CSS3',
      'Git & GitHub'
    ],
    verified: true,
    isInternship: true,
    website: 'https://actifyzone.com'
  },
  {
    id: 'havet-ai-internship',
    company: 'Havet AI',
    role: 'Full Stack Developer Intern',
    location: 'Remote',
    type: 'Internship',
    period: '3-Month Internship',
    startDate: '2024',
    endDate: '2024',
    current: false,
    description: 'Contributed to full-stack web development using Next.js, NestJS, and MongoDB Atlas—implementing responsive UI components, REST API integrations, and backend features.',
    responsibilities: [
      'Contributed to full-stack web development using Next.js, NestJS, and MongoDB Atlas cloud database.',
      'Implemented clean, reusable UI components and client-side views with responsive design.',
      'Engineered and integrated REST API endpoints, handling JSON request/response payloads.',
      'Supported backend functionality, database connection validation, and UI integration tasks.'
    ],
    keyAchievements: [
      'Seamlessly connected Next.js frontend interfaces to NestJS microservices and MongoDB Atlas collections.',
      'Ensured strict data validation on API payloads, reducing client-side submission errors.',
      'Actively supported development across the entire full-stack lifecycle during the 3-month tenure.'
    ],
    technologies: [
      'Next.js',
      'NestJS',
      'MongoDB Atlas',
      'REST APIs',
      'JavaScript',
      'JSON',
      'Git & GitHub'
    ],
    verified: true,
    isInternship: true,
    website: 'https://havet.ai'
  }
];

export const educationData = [
  {
    id: 'it-vedant-fullstack',
    institution: 'IT Vedant Education',
    degree: 'Professional Certification',
    fieldOfStudy: 'Full Stack Web Development (Java, Spring Boot, React, MySQL)',
    period: 'Completed Feb 2026',
    score: 'Team Leader & Hackathon Silver Medalist',
    coursework: [
      'Java (8+) & Object-Oriented Programming',
      'Spring Boot & RESTful API Architecture',
      'React.js & Frontend Component Design',
      'MySQL Relational Database Management',
      'JWT Authentication & Full Stack Integration'
    ],
    verified: true
  },
  {
    id: 'btech-rtmnu',
    institution: 'RTMNU University',
    degree: 'Bachelor of Technology (B.Tech)',
    fieldOfStudy: 'Mechanical Engineering',
    period: 'Graduated 2024',
    score: 'First Class Graduate',
    coursework: [
      'Applied Mathematics & Computational Logic',
      'Engineering Design & Systems Modeling',
      'Project Management & Optimization',
      'Analytical Problem Solving'
    ],
    verified: true
  },
  {
    id: 'diploma-msbte',
    institution: 'MSBTE Board',
    degree: 'Diploma (Polytechnic)',
    fieldOfStudy: 'Mechanical Engineering',
    period: 'Completed 2021',
    score: 'Distinction',
    coursework: [
      'Core Technical Fundamentals',
      'CAD / CAM & Engineering Graphics',
      'Industrial Systems & Practical Workshops'
    ],
    verified: true
  },
  {
    id: 'hsc-cs',
    institution: 'Maharashtra State Board (HSC)',
    degree: 'Higher Secondary Certificate (12th)',
    fieldOfStudy: 'Computer Science (Science Stream)',
    period: 'Completed 2019',
    score: 'First Class',
    coursework: [
      'Computer Science Principles',
      'Fundamentals of Programming',
      'Physics, Chemistry & Mathematics'
    ],
    verified: true
  },
  {
    id: 'ssc-board',
    institution: 'Maharashtra State Board (SSC)',
    degree: 'Secondary School Certificate (10th)',
    fieldOfStudy: 'General Studies',
    period: 'Completed 2017',
    score: 'Distinction',
    coursework: ['Mathematics', 'Science', 'Languages & Social Studies'],
    verified: true
  }
];
