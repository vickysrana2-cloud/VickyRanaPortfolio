import { Project } from '@/types';

export const projectsData: Project[] = [
  {
    id: 'proj-pawsitive',
    slug: 'pawsitive-pet-care-platform',
    title: 'Pawsitive – Pet Care Management Platform',
    tagline: 'Comprehensive pet care management system with React.js frontend, Spring Boot backend, and MySQL database.',
    description: 'A full-stack pet care management platform featuring role-based access control, medical and adoption records tracking, appointment scheduling, and secure JWT authentication.',
    fullDescription: 'Pawsitive was engineered to streamline the operations of veterinary clinics, pet owners, and shelters. It provides a centralized dashboard for managing user profiles, pet medical histories, vaccination schedules, and appointments. The backend uses Java and Spring Boot with RESTful endpoints, while the client utilizes React.js, Tailwind CSS, and client-side state management for real-time data synchronization.',
    category: 'Full Stack',
    featured: true,
    tags: ['React.js', 'JavaScript', 'Spring Boot', 'REST APIs', 'MySQL', 'JWT', 'Tailwind CSS', 'Git', 'GitHub'],
    thumbnail: '/images/projects/pawsitive.png',
    liveUrl: 'https://github.com/vickysrana2-cloud',
    githubUrl: 'https://github.com/vickysrana2-cloud',
    problemStatement: 'Pet care management and veterinary clinics often rely on disconnected manual records or fragmented tools, leading to missed vaccination schedules and delayed medical histories.',
    architectureOverview: 'Multi-tier architecture combining a modular React.js SPA communicating via JSON payloads over HTTP to a secure Spring Boot REST API, persisting normalized relational entities in a MySQL database.',
    architecturePoints: [
      'Spring Boot backend with RESTful controllers, service layers, and Spring Data JPA repositories',
      'MySQL database design enforcing relational integrity with foreign keys and optimized indexes',
      'JWT token authentication for secure, role-based access (Owner, Veterinarian, Admin)',
      'React.js component-based architecture styled with responsive Tailwind CSS utilities',
      'Client-side state management handling dynamic asynchronous data fetching and loading states'
    ],
    keyFeatures: [
      'Developed responsive UI components using React.js and Tailwind CSS for managing user and pet data',
      'Integrated REST APIs and handled client-side state for dynamic data rendering',
      'Implemented role-based UI access and ensured consistent, user-friendly experience across devices',
      'Appointment scheduling and vaccination reminder tracker with status updates',
      'Responsive design ensuring full accessibility across mobile, tablet, and desktop'
    ],
    technicalChallenges: [
      'Managing client-side authentication persistence with JWT tokens while preventing stale session states.',
      'Structuring relational foreign keys between user accounts, multiple pet profiles, and historical medical logs.',
      'Ensuring seamless form validations and feedback states across complex multi-step intake flows.'
    ],
    contributions: [
      'Engineered responsive React.js UI views and modular form components with Tailwind CSS.',
      'Developed Spring Boot RESTful API endpoints for pet and user data operations.',
      'Configured MySQL schemas, entity relationships, and database transactions.'
    ],
    stats: {
      performance: 'Fast API Response',
      uptime: 'ACID Compliant',
      queriesPerSec: 'Role-Based RBAC'
    },
    role: 'Full-Stack Developer',
    timeline: 'Completed',
    publishedAt: '2025-02-01'
  },
  {
    id: 'proj-designmeinteriors',
    slug: 'designmeinteriors',
    title: 'DesignMeInteriors – Studio Showcase Website',
    tagline: 'Modern, responsive interior design showcase built with Next.js, Tailwind CSS, and Blogger API integration.',
    description: 'An aesthetic, reference-driven interior design portfolio featuring fluid animations, dynamic blog updates via Blogger API, responsive gallery layouts, and SEO enhancements.',
    fullDescription: 'DesignMeInteriors was crafted to showcase bespoke architectural and interior design concepts. Built with Next.js App Router and Tailwind CSS, it incorporates subtle UI motion, high-resolution visual imagery, and external CMS integration through Blogger API to deliver an editorial, luxury user experience.',
    category: 'Frontend',
    featured: true,
    tags: ['Next.js', 'Tailwind CSS', 'Blogger API', 'UI Motion', 'Responsive Web Design', 'SEO'],
    thumbnail: '/images/projects/designmeinteriors.png',
    liveUrl: 'https://vickysrana2-cloud.github.io',
    githubUrl: 'https://github.com/vickysrana2-cloud',
    problemStatement: 'Interior design studios require highly visual, fast-loading portfolios with rich typography, smooth transitions, and seamless content publishing capabilities without heavy CMS overhead.',
    architectureOverview: 'Constructed with Next.js App Router for server-rendered page efficiency and Tailwind CSS for utility styling. Integrates Blogger API as a lightweight headless CMS for dynamic studio updates.',
    architecturePoints: [
      'Next.js component hierarchy optimized for fast initial paint and fluid navigation',
      'Tailwind CSS design system utilizing custom typography, aspect ratios, and soft shadows',
      'Blogger API integration for publishing studio design articles and case studies',
      'Semantic HTML5 structure and OpenGraph metadata for enhanced search engine visibility'
    ],
    keyFeatures: [
      'Developed frontend sections for an interior-design website using a reference-driven layout and responsive styling',
      'Implemented UI motion and animations and integrated a mock API during development',
      'Applied responsive design and SEO-related improvements',
      'Filterable project gallery showcasing residential, commercial, and modular concepts',
      'Mobile-first responsive navigation with fluid layout reflow'
    ],
    technicalChallenges: [
      'Preserving high visual fidelity while preventing layout shifts (CLS) on large photography assets.',
      'Integrating external API data with graceful fallbacks during network latency.'
    ],
    contributions: [
      'Built complete frontend UI components and layout sections from scratch.',
      'Authored responsive styling using modern Tailwind CSS tokens.',
      'Implemented SEO enhancements and meta tags.'
    ],
    stats: {
      performance: '100% Mobile Responsive',
      uptime: 'SEO Optimized',
      queriesPerSec: 'Next.js Fast Refresh'
    },
    role: 'Frontend Developer',
    timeline: 'Completed',
    publishedAt: '2025-01-10'
  },
  {
    id: 'proj-archinet',
    slug: 'archinet-design-architecture',
    title: 'Archinet – Design & Architecture Website',
    tagline: 'Clean, structured architecture portfolio engineered from scratch with Next.js and Tailwind CSS.',
    description: 'A modern design and architectural firm website featuring structured frontend implementation, interactive UI components, clean typography, and cross-device responsiveness.',
    fullDescription: 'Archinet is a dedicated architectural firm portfolio developed from scratch. It emphasizes minimalist aesthetics, structured component hierarchies, intuitive navigation, and clean user experience. Engineered with Next.js and Tailwind CSS, it delivers fast page load times and accessible interactive components.',
    category: 'Frontend',
    featured: true,
    tags: ['Next.js', 'Tailwind CSS', 'JavaScript (ES6+)', 'GitHub', 'Component Architecture'],
    thumbnail: '/images/projects/archinet.png',
    liveUrl: 'https://vickysrana2-cloud.github.io',
    githubUrl: 'https://github.com/vickysrana2-cloud',
    problemStatement: 'Architectural portfolios often fail to balance heavy visual assets with structured, maintainable codebases and fast load times.',
    architectureOverview: 'Built around a modular React component design with Next.js static asset optimization and zero-runtime CSS via Tailwind utilities.',
    architecturePoints: [
      'Next.js for component modularity and efficient client routing',
      'Tailwind CSS for responsive layouts and custom theme tokens',
      'Component-based architecture ensuring reusability across pages',
      'Cross-browser tested for consistent rendering on Chrome, Safari, and Firefox'
    ],
    keyFeatures: [
      'Developed the Archinet website from scratch, implementing the frontend and overall user interface',
      'Built responsive layouts and interactive UI components to deliver a consistent experience across devices',
      'Focused on clean design, usability, and structured frontend implementation',
      'Project showcase with categorization by project scale and typology',
      'Clean interactive contact and inquiry forms'
    ],
    technicalChallenges: [
      'Designing an intuitive grid system that adapts seamlessly from ultra-wide desktops to compact mobile screens.',
      'Writing maintainable, DRY component structures for architectural showcase sections.'
    ],
    contributions: [
      'Architected and implemented the entire frontend user interface from scratch.',
      'Created reusable interactive components with responsive Tailwind CSS utilities.',
      'Managed version control and deployment workflows using Git & GitHub.'
    ],
    stats: {
      performance: 'Fluid 60 FPS UI',
      uptime: 'Responsive',
      queriesPerSec: 'Clean Code'
    },
    role: 'Frontend Developer',
    timeline: 'Completed',
    publishedAt: '2024-12-05'
  },
  {
    id: 'proj-weatherwatch',
    slug: 'weatherwatch-hackathon-project',
    title: 'WeatherWatch – Live Weather Telemetry Platform',
    tagline: 'Hackathon Silver Medal winning project at IT Vedant. Led development as Team Leader.',
    description: 'An interactive weather forecasting and climate telemetry application featuring real-time meteorological API integration, location lookup, and reactive dashboards.',
    fullDescription: 'WeatherWatch earned the Silver Medal at the IT Vedant Tech Hackathon. Leading a cross-functional team, Vicky architected the frontend application, coordinated API integrations for real-time weather metrics, humidity, and 7-day outlook forecasts, and delivered a winning demo under competitive sprint conditions.',
    category: 'Frontend',
    featured: false,
    tags: ['React.js', 'JavaScript', 'REST APIs', 'Tailwind CSS', 'Team Leadership', 'Hackathon Winner'],
    thumbnail: '/images/projects/weatherwatch.png',
    liveUrl: 'https://github.com/vickysrana2-cloud',
    githubUrl: 'https://github.com/vickysrana2-cloud',
    problemStatement: 'Providing users with real-time, accurate, and easily digestible meteorological forecasts across varying bandwidth conditions during competitive hackathon constraints.',
    architectureOverview: 'React.js application communicating with external weather telemetry REST endpoints, featuring responsive data cards, visual icon mappings, and search caching.',
    architecturePoints: [
      'React.js with custom hooks for weather API polling and coordinate geocoding',
      'Responsive weather metrics dashboard showing temperature, humidity, wind, and forecast',
      'Error handling and fallback states for failed geolocation permissions or network drops',
      'Team leadership and Agile sprint coordination under tight hackathon deadlines'
    ],
    keyFeatures: [
      'Team Leader for hackathon project, achieving Silver Medal recognition at IT Vedant',
      'Live weather radar and telemetry metrics with instant city search',
      '7-day forecast cards with dynamic weather condition visuals',
      'Intuitive responsive interface built with modern Tailwind CSS'
    ],
    technicalChallenges: [
      'Coordinating rapid task delegation across team members while maintaining a unified UI standard.',
      'Handling asynchronous API limits and geocoding fallbacks smoothly.'
    ],
    contributions: [
      'Served as Team Leader, coordinating architecture and feature roadmap.',
      'Developed core React components and API integration pipeline.',
      'Delivered final presentation and live system demonstration to judges.'
    ],
    stats: {
      performance: 'Silver Medalist',
      uptime: 'IT Vedant Hackathon',
      users: 'Team Leader'
    },
    role: 'Team Leader & Lead Developer',
    timeline: 'Hackathon Sprint',
    publishedAt: '2024-11-15'
  }
];
