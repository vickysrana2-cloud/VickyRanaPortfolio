import { ProfileData } from '@/types';

export const profileData: ProfileData = {
  name: "Full Stack Engineer",
  title: "Full-Stack Software Engineer & System Architect",
  tagline: "Building scalable web platforms, high-performance APIs, and intuitive digital experiences with modern TypeScript, Next.js, and Cloud backends.",
  bio: [
    "I am a passionate Full-Stack Developer specializing in modern web architecture, reactive user interfaces, and robust backend microservices. I bridge the gap between design precision and server-side scalability.",
    "With hands-on software engineering experience at Actifyzone and Havet AI, I have engineered production-grade features, optimized database querying with MongoDB Atlas and MySQL, and built maintainable RESTful services using NestJS and Spring Boot.",
    "When I'm not architecting web apps or refining user experiences, I enjoy developing interactive browser games, open-source utilities, and reusable design templates for developers."
  ],
  availability: {
    status: 'Available',
    message: 'Available for full-time roles & high-impact contract engineering',
    location: 'Open to Remote & Hybrid',
    timezone: 'UTC+05:30 (IST)'
  },
  contact: {
    email: 'developer.contact@example.com', // [EDITABLE PLACEHOLDER: Replace with your actual email]
    github: 'https://github.com', // [EDITABLE PLACEHOLDER: Replace with your GitHub URL]
    linkedin: 'https://linkedin.com', // [EDITABLE PLACEHOLDER: Replace with your LinkedIn URL]
    twitter: 'https://twitter.com', // [EDITABLE PLACEHOLDER: Optional]
  },
  resumeUrl: '/resume.pdf', // [EDITABLE PLACEHOLDER: Place your resume.pdf in /public/resume.pdf]
  metrics: [
    {
      label: 'Core Focus',
      value: 'Full-Stack',
      description: 'End-to-end architecture & system design'
    },
    {
      label: 'Modern Stack',
      value: 'TypeScript',
      description: 'Next.js, React, Node.js & Spring Boot'
    },
    {
      label: 'Databases',
      value: 'NoSQL & SQL',
      description: 'MongoDB Atlas, MySQL & Redis'
    },
    {
      label: 'Status',
      value: 'Ready to Deploy',
      description: 'Actively interviewing for new opportunities'
    }
  ],
  coreHighlights: [
    'Engineered production web apps using Next.js App Router, React 19, and Tailwind CSS',
    'Developed robust backend services with NestJS, Spring Boot, and RESTful APIs',
    'Designed scalable relational & document database schemas with MySQL & MongoDB Atlas',
    'Strong focus on accessible UI, performance optimization, and clean architectural design'
  ]
};
