import { Achievement } from '@/types';

export const achievementsData: Achievement[] = [
  {
    id: 'ach-hackathon-silver',
    title: 'Hackathon Winner – WeatherWatch Project',
    issuer: 'IT Vedant Tech Hackathon',
    issueDate: '2024',
    category: 'Award',
    credentialId: 'ITV-HACK-WEATHERWATCH-SILVER',
    credentialUrl: 'https://github.com/vickysrana2-cloud',
    description: 'Awarded the Silver Medal as Team Leader for conceptualizing, engineering, and deploying WeatherWatch—a live meteorological forecasting and telemetry web application—under competitive hackathon conditions.',
    skillsHighlighted: ['Team Leadership', 'React.js', 'REST APIs', 'Agile Delivery', 'Problem Solving'],
    verified: true,
    iconName: 'Trophy',
    gradeOrScore: 'Silver Medal | Team Leader'
  },
  {
    id: 'ach-java-fullstack',
    title: 'Java Full Stack Web Development Essentials',
    issuer: 'IT Vedant',
    issueDate: 'Feb 2026',
    category: 'Certification',
    credentialId: 'ITV-JFS-2026',
    credentialUrl: 'https://itvedant.com',
    description: 'Comprehensive certification in full-stack software development spanning Java (8+), Spring Boot, RESTful APIs, React.js, MySQL relational database management, and JWT authentication.',
    skillsHighlighted: ['Java (8+)', 'Spring Boot', 'React.js', 'MySQL', 'RESTful APIs'],
    verified: true,
    iconName: 'Code',
    gradeOrScore: 'Certified Full Stack Developer'
  },
  {
    id: 'ach-hackerrank-js',
    title: 'Certificate Of Accomplishment – JavaScript Basics',
    issuer: 'HackerRank',
    issueDate: '2024',
    category: 'Certification',
    credentialId: 'HACKERRANK-JS-BASICS',
    credentialUrl: 'https://hackerrank.com',
    description: 'Verified assessment in JavaScript fundamentals, covering asynchronous events, closures, functions, prototypes, array manipulation, and ES6+ programming standards.',
    skillsHighlighted: ['JavaScript (ES6+)', 'Problem Solving', 'Data Structures', 'DOM'],
    verified: true,
    iconName: 'Award',
    gradeOrScore: 'Passed Assessment'
  },
  {
    id: 'ach-btech-degree',
    title: 'Bachelor of Technology (B.Tech)',
    issuer: 'RTMNU University',
    issueDate: '2021 – 2024',
    category: 'Education',
    credentialId: 'RTMNU-BTECH-2024',
    description: 'Graduated in 2024 with a strong analytical foundation in engineering problem solving, systems analysis, computational thinking, and project execution.',
    skillsHighlighted: ['Systems Analysis', 'Analytical Thinking', 'Engineering Mathematics'],
    verified: true,
    iconName: 'GraduationCap',
    gradeOrScore: 'First Class Graduate'
  },
  {
    id: 'ach-polytechnic-diploma',
    title: 'Diploma (Polytechnic) in Mechanical Engineering',
    issuer: 'MSBTE Board',
    issueDate: '2019 – 2021',
    category: 'Education',
    credentialId: 'MSBTE-DIPLOMA-2021',
    description: 'Completed 3-year polytechnic engineering diploma with distinction, building practical technical proficiencies, applied mathematics, and design methodology.',
    skillsHighlighted: ['Technical Foundations', 'CAD / CAM', 'Design Principles'],
    verified: true,
    iconName: 'GraduationCap',
    gradeOrScore: 'Distinction'
  }
];
