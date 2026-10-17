import { SkillCategory } from '@/types';

export const skillsData: SkillCategory[] = [
  {
    category: 'Frontend Engineering',
    description: 'Creating accessible, responsive, and blazing-fast user interfaces with modern React ecosystems.',
    iconName: 'Layout',
    skills: [
      {
        name: 'Next.js (App Router)',
        level: 'Expert',
        highlight: true,
        iconName: 'Nextjs',
        description: 'Server Components, streaming SSR, API routes, Turbopack, and dynamic routing'
      },
      {
        name: 'React',
        level: 'Expert',
        highlight: true,
        iconName: 'React',
        description: 'Hooks, custom hooks, context, state optimization, Concurrent features'
      },
      {
        name: 'TypeScript',
        level: 'Expert',
        highlight: true,
        iconName: 'TypeScript',
        description: 'Type safety, generics, utility types, strict schema enforcement'
      },
      {
        name: 'JavaScript (ES6+)',
        level: 'Expert',
        highlight: false,
        iconName: 'JavaScript',
        description: 'Modern asynchronous patterns, event loop, DOM manipulation, modular JS'
      },
      {
        name: 'Tailwind CSS',
        level: 'Expert',
        highlight: true,
        iconName: 'Tailwind',
        description: 'Utility-first styling, CSS variables, dark mode architecture, custom tokens'
      },
      {
        name: 'Framer Motion / Animations',
        level: 'Advanced',
        highlight: false,
        iconName: 'Motion',
        description: 'Micro-interactions, layout transitions, gesture physics, scroll animations'
      },
      {
        name: 'HTML5 & Semantic Markup',
        level: 'Expert',
        highlight: false,
        iconName: 'Html',
        description: 'WCAG 2.1 AA accessibility, SEO structured data, semantic layout elements'
      }
    ]
  },
  {
    category: 'Backend & System Architecture',
    description: 'Architecting robust, secure server-side applications, microservices, and high-throughput APIs.',
    iconName: 'Server',
    skills: [
      {
        name: 'NestJS',
        level: 'Advanced',
        highlight: true,
        iconName: 'Nestjs',
        description: 'Enterprise modular architecture, dependency injection, guards, interceptors'
      },
      {
        name: 'REST APIs',
        level: 'Expert',
        highlight: true,
        iconName: 'Api',
        description: 'RESTful architecture, status codes, OpenAPI/Swagger docs, payload validation'
      },
      {
        name: 'Node.js & Express',
        level: 'Advanced',
        highlight: false,
        iconName: 'Node',
        description: 'Event-driven backend services, middleware pipelines, streaming files'
      },
      {
        name: 'Java',
        level: 'Proficient',
        highlight: true,
        iconName: 'Java',
        description: 'Object-oriented programming, data structures, concurrency, JVM ecosystem'
      },
      {
        name: 'Spring Boot',
        level: 'Proficient',
        highlight: true,
        iconName: 'Spring',
        description: 'Spring MVC, JPA/Hibernate, Spring Security, microservice configuration'
      }
    ]
  },
  {
    category: 'Databases & Cloud Storage',
    description: 'Designing performant relational and document schemas, indexing strategies, and data integrity.',
    iconName: 'Database',
    skills: [
      {
        name: 'MongoDB',
        level: 'Advanced',
        highlight: true,
        iconName: 'Mongodb',
        description: 'Aggregation pipelines, indexing, schema validation, document modeling'
      },
      {
        name: 'MongoDB Atlas',
        level: 'Advanced',
        highlight: true,
        iconName: 'Cloud',
        description: 'Cloud cluster provisioning, connection pooling, Atlas Search, backup policies'
      },
      {
        name: 'MySQL',
        level: 'Advanced',
        highlight: true,
        iconName: 'Mysql',
        description: 'Relational schema design, complex joins, indexing, ACID transactions'
      },
      {
        name: 'Redis',
        level: 'Proficient',
        highlight: false,
        iconName: 'Redis',
        description: 'In-memory caching, rate limiting, pub/sub queues, session management'
      }
    ]
  },
  {
    category: 'DevOps, Tooling & Version Control',
    description: 'Streamlining deployment workflows, automated CI/CD pipelines, and collaboration standards.',
    iconName: 'Cpu',
    skills: [
      {
        name: 'Git',
        level: 'Expert',
        highlight: true,
        iconName: 'Git',
        description: 'Branching strategies, interactive rebasing, merge conflict resolution'
      },
      {
        name: 'GitHub',
        level: 'Expert',
        highlight: true,
        iconName: 'Github',
        description: 'GitHub Actions CI/CD, PR code reviews, issues, releases, project boards'
      },
      {
        name: 'Docker & Containers',
        level: 'Proficient',
        highlight: false,
        iconName: 'Docker',
        description: 'Dockerfile composition, multi-stage builds, containerized local dev'
      },
      {
        name: 'Postman & API Testing',
        level: 'Advanced',
        highlight: false,
        iconName: 'Postman',
        description: 'Automated test collections, environment variables, integration testing'
      },
      {
        name: 'Vercel & Cloud Deployments',
        level: 'Advanced',
        highlight: false,
        iconName: 'Vercel',
        description: 'Serverless deployment, edge network optimization, environment configs'
      }
    ]
  }
];
