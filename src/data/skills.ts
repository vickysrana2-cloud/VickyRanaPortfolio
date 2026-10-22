import { SkillCategory } from '@/types';

export const skillsData: SkillCategory[] = [
  {
    category: 'Frontend Engineering',
    description: 'Crafting responsive, high-performance, component-driven user interfaces.',
    iconName: 'Layout',
    skills: [
      {
        name: 'Next.js',
        level: 'Expert',
        highlight: true,
        iconName: 'Nextjs',
        description: 'App Router, Server-Side Rendering (SSR), Static Generation (SSG), and responsive layouts'
      },
      {
        name: 'React.js',
        level: 'Expert',
        highlight: true,
        iconName: 'React',
        description: 'Component-based architecture, React hooks, state management, and virtual DOM optimization'
      },
      {
        name: 'JavaScript (ES6+)',
        level: 'Expert',
        highlight: true,
        iconName: 'JavaScript',
        description: 'Modern asynchronous programming, promises, DOM manipulation, and ES6+ features'
      },
      {
        name: 'Tailwind CSS',
        level: 'Expert',
        highlight: true,
        iconName: 'Tailwind',
        description: 'Utility-first modern styling, responsive layouts, dark/light themes, and custom animations'
      },
      {
        name: 'HTML5 & CSS3',
        level: 'Expert',
        highlight: false,
        iconName: 'Html',
        description: 'Semantic markup, accessible structure, Flexbox, Grid, and cross-browser styling'
      },
      {
        name: 'Bootstrap',
        level: 'Advanced',
        highlight: false,
        iconName: 'Bootstrap',
        description: 'Rapid responsive grid layout prototyping and UI component integration'
      }
    ]
  },
  {
    category: 'Backend & APIs',
    description: 'Developing secure, high-throughput server backends and RESTful API endpoints.',
    iconName: 'Server',
    skills: [
      {
        name: 'Java (8+)',
        level: 'Advanced',
        highlight: true,
        iconName: 'Java',
        description: 'Object-oriented programming, data structures, multithreading, and JVM ecosystem'
      },
      {
        name: 'Spring Boot',
        level: 'Advanced',
        highlight: true,
        iconName: 'Spring',
        description: 'Spring MVC, Spring Data JPA/Hibernate, Spring Security with JWT, and dependency injection'
      },
      {
        name: 'RESTful APIs & JSON',
        level: 'Expert',
        highlight: true,
        iconName: 'Api',
        description: 'Robust REST architectural principles, JSON schema contracts, and error handling'
      },
      {
        name: 'NestJS',
        level: 'Proficient',
        highlight: true,
        iconName: 'Nestjs',
        description: 'Modular TypeScript backend architecture, controllers, services, and middleware'
      }
    ]
  },
  {
    category: 'Databases & Storage',
    description: 'Designing normalized relational schemas and scalable document collections.',
    iconName: 'Database',
    skills: [
      {
        name: 'MySQL',
        level: 'Advanced',
        highlight: true,
        iconName: 'Mysql',
        description: 'Relational database schema design, indexing, complex joins, and transactional integrity'
      },
      {
        name: 'MongoDB',
        level: 'Advanced',
        highlight: true,
        iconName: 'Mongodb',
        description: 'Document modeling, BSON data structures, and query optimization'
      },
      {
        name: 'MongoDB Atlas',
        level: 'Advanced',
        highlight: true,
        iconName: 'Cloud',
        description: 'Cloud database cluster provisioning, connection management, and live monitoring'
      }
    ]
  },
  {
    category: 'Tools, UI & Performance',
    description: 'Professional developer tooling, version control, and web performance optimization.',
    iconName: 'Cpu',
    skills: [
      {
        name: 'Git & GitHub',
        level: 'Expert',
        highlight: true,
        iconName: 'Github',
        description: 'Branch management, pull requests, collaborative code reviews, and remote repositories'
      },
      {
        name: 'Responsive Web Design',
        level: 'Expert',
        highlight: true,
        iconName: 'Responsive',
        description: 'Mobile-first fluid layouts, media queries, and touch-screen accessibility'
      },
      {
        name: 'Performance Optimization & SEO',
        level: 'Advanced',
        highlight: false,
        iconName: 'Speed',
        description: 'Minimizing layout shifts, asset compression, meta tags, and Lighthouse optimization'
      },
      {
        name: 'Chrome DevTools',
        level: 'Expert',
        highlight: false,
        iconName: 'Tools',
        description: 'DOM inspection, network waterfall analysis, JavaScript debugging, and memory profiling'
      }
    ]
  }
];
