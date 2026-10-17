import { Project } from '@/types';

export const projectsData: Project[] = [
  {
    id: 'proj-nexus-saas',
    slug: 'nexus-cloud-workspace',
    title: 'Nexus Cloud Workspace & API Hub',
    tagline: 'High-concurrency collaborative workspace with real-time sync, microservice integrations, and JWT authentication.',
    description: 'A full-stack enterprise collaboration suite enabling developers and teams to manage projects, simulate API endpoints, and inspect logs with real-time WebSocket telemetry.',
    fullDescription: 'Nexus Cloud Workspace was designed to solve communication overhead between frontend and backend teams. It features real-time document collaboration, an interactive REST API mock playground, role-based access control (RBAC), and team workspaces. Built with Next.js App Router on the client and NestJS on the backend, it utilizes MongoDB Atlas for flexible metadata storage and Redis for sub-millisecond session caching.',
    category: 'Full Stack',
    featured: true,
    tags: ['Next.js', 'TypeScript', 'NestJS', 'MongoDB Atlas', 'Tailwind CSS', 'Redis', 'Docker'],
    thumbnail: '/images/projects/nexus-cloud.png',
    liveUrl: 'https://demo-nexus-workspace.example.com', // [EDITABLE PLACEHOLDER]
    githubUrl: 'https://github.com/example/nexus-cloud-workspace', // [EDITABLE PLACEHOLDER]
    problemStatement: 'Modern distributed engineering teams frequently suffer from disconnected documentation, out-of-sync API mocks, and slow feedback loops during sprint development.',
    architectureOverview: 'Architected around a modular decoupled stack: Next.js 16 handles server-side streaming and static asset delivery, while a NestJS cluster manages business rules, WebSocket events, and database transactions with MongoDB Atlas replica sets.',
    architecturePoints: [
      'Next.js App Router for dynamic routing and fast edge rendering',
      'NestJS microservices with modular providers and dependency injection',
      'MongoDB Atlas cluster with optimized compound indices for high read efficiency',
      'Redis Pub/Sub channel for instant synchronization across connected user tabs',
      'JWT with refresh token rotation stored in secure HTTP-only cookies'
    ],
    keyFeatures: [
      'Live real-time collaborative workspace with multi-user presence indicators',
      'API testing simulator with request payload validation and response inspection',
      'Role-based permissions (Admin, Developer, Viewer) with granular workspace security',
      'Automated schema generation and export to Postman / OpenAPI formats'
    ],
    technicalChallenges: [
      'Managing WebSocket reconnection and missed delta events during brief network drops.',
      'Preventing N+1 query bottlenecks in nested workspace tree structures through MongoDB aggregation pipelines.',
      'Ensuring strict TypeScript type inference across shared client-server contracts.'
    ],
    contributions: [
      'Designed end-to-end database schema models and aggregation queries in MongoDB Atlas.',
      'Authored reusable design system components in React and Tailwind CSS.',
      'Implemented JWT authentication flow with refresh tokens and NestJS authentication guards.'
    ],
    stats: {
      performance: '99/100 Lighthouse',
      uptime: '99.9% Uptime',
      queriesPerSec: '1,200+ req/sec'
    },
    role: 'Lead Full-Stack Architect',
    timeline: '3 Months (Iterative releases)',
    publishedAt: '2025-01-15'
  },
  {
    id: 'proj-pulse-ecommerce',
    slug: 'pulse-commerce-engine',
    title: 'Pulse Commerce Engine & Inventory Manager',
    tagline: 'High-throughput e-commerce platform with Spring Boot backend, MySQL transactions, and Next.js storefront.',
    description: 'An end-to-end transactional e-commerce engine with inventory tracking, ACID payment processing, and an administrative dashboard for order fulfillment.',
    fullDescription: 'Pulse Commerce was built to deliver enterprise-grade transaction handling with zero tolerance for overselling or race conditions. The backend leverages Java and Spring Boot with Spring Data JPA and MySQL to enforce strict database locks during checkout. The frontend utilizes Next.js with optimistic UI updates and instant search filtering.',
    category: 'Full Stack',
    featured: true,
    tags: ['Next.js', 'React', 'Java', 'Spring Boot', 'MySQL', 'Tailwind CSS', 'REST APIs'],
    thumbnail: '/images/projects/pulse-commerce.png',
    liveUrl: 'https://demo-pulse-commerce.example.com', // [EDITABLE PLACEHOLDER]
    githubUrl: 'https://github.com/example/pulse-commerce-engine', // [EDITABLE PLACEHOLDER]
    problemStatement: 'E-commerce flash sales frequently cause inventory inconsistencies, race conditions in multi-server environments, and sluggish product catalog search.',
    architectureOverview: 'Employs a multi-tier architecture with a Next.js server-rendered storefront communicating via RESTful endpoints to a Spring Boot microservice. Relational data integrity is enforced in MySQL using pessimistic write locks on stock rows during cart checkout.',
    architecturePoints: [
      'Spring Boot 3 application with JPA/Hibernate entity mappings and validation',
      'MySQL database with foreign keys, index-backed lookup, and ACID transactions',
      'Next.js dynamic product catalogs with ISR (Incremental Static Regeneration)',
      'Optimistic cart updates on the frontend for instantaneous customer interactions'
    ],
    keyFeatures: [
      'Concurrent-safe checkout pipeline with automated inventory reservation timeouts',
      'Admin analytics dashboard with charts for daily sales, inventory levels, and orders',
      'Full-text product search with instant category, price range, and tag filtering',
      'Automated email notification triggers upon order confirmation and dispatch'
    ],
    technicalChallenges: [
      'Handling race conditions when multiple customers attempt to purchase the final inventory item simultaneously.',
      'Structuring relational foreign keys and indexes to sustain high query throughput during promotional events.',
      'Maintaining consistent decimal calculations for taxes and discounts without floating-point inaccuracies.'
    ],
    contributions: [
      'Engineered Spring Boot REST controllers, service layers, and Spring Data JPA repositories.',
      'Wrote relational migration scripts and index optimization for MySQL tables.',
      'Created responsive checkout flows, cart drawers, and product filter interfaces in React.'
    ],
    stats: {
      performance: '< 180ms API Latency',
      uptime: 'ACID Compliant',
      queriesPerSec: '850 transactions/sec'
    },
    role: 'Full-Stack Developer',
    timeline: '2.5 Months',
    publishedAt: '2024-11-20'
  },
  {
    id: 'proj-zenith-api',
    slug: 'zenith-microservice-gateway',
    title: 'Zenith API Gateway & Telemetry Service',
    tagline: 'High-performance NestJS microservice gateway featuring token bucket rate limiting, Redis caching, and health diagnostics.',
    description: 'A centralized backend gateway that routes incoming API requests, enforces JWT authorization, applies distributed rate-limiting, and captures system metrics.',
    fullDescription: 'Zenith was created to orchestrate communication between distributed microservices. It intercepts incoming HTTP traffic, validates bearer tokens, manages client rate limits using a Redis token bucket algorithm, and logs Prometheus-compatible telemetry for system monitoring.',
    category: 'Backend & API',
    featured: true,
    tags: ['NestJS', 'TypeScript', 'Redis', 'REST APIs', 'Docker', 'Postman'],
    thumbnail: '/images/projects/zenith-gateway.png',
    liveUrl: 'https://demo-zenith-gateway.example.com', // [EDITABLE PLACEHOLDER]
    githubUrl: 'https://github.com/example/zenith-api-gateway', // [EDITABLE PLACEHOLDER]
    problemStatement: 'Unprotected microservices lack uniform security enforcement, request throttling, and unified request tracing across independent backend services.',
    architectureOverview: 'Constructed with NestJS fastify/express adapters, Redis cluster for distributed caching and sliding window counters, and standardized middleware pipelines.',
    architecturePoints: [
      'Reverse proxy routing layer routing requests dynamically to upstream services',
      'Redis-backed distributed rate limiter preventing denial of service attempts',
      'Centralized CORS, security headers, and compression middleware',
      'Comprehensive Swagger/OpenAPI interactive documentation generation'
    ],
    keyFeatures: [
      'Configurable rate-limiting tiers (Free, Pro, Enterprise) based on client API keys',
      'Sub-5ms proxy overhead with streaming request/response pipelines',
      'Automated health check endpoints with database and cache liveness probes',
      'Structured JSON logging with unique trace-id propagation'
    ],
    technicalChallenges: [
      'Minimizing gateway latency overhead while executing multi-step token validation.',
      'Synchronizing sliding window rate counters accurately across multiple container instances in Redis.'
    ],
    contributions: [
      'Developed custom NestJS interceptors for distributed request tracing and error masking.',
      'Configured Docker Compose multi-container test environments with automated Postman tests.',
      'Authored technical documentation and architecture diagrams for upstream developers.'
    ],
    stats: {
      performance: '3.4ms avg latency',
      uptime: '99.95%',
      queriesPerSec: '5,000+ rps'
    },
    role: 'Backend Architect',
    timeline: '6 Weeks',
    publishedAt: '2024-09-10'
  },
  {
    id: 'proj-aurora-ui',
    slug: 'aurora-design-system',
    title: 'Aurora UI Component Library & Token Suite',
    tagline: 'Accessible, themeable design system built with React, TypeScript, Tailwind CSS, and Radix UI primitives.',
    description: 'An open-source accessible component system providing 40+ primitives, keyboard-first navigation, fluid typography, and zero-runtime style token customization.',
    fullDescription: 'Aurora UI is an enterprise design system focusing on WCAG 2.1 AA compliance, smooth keyboard navigation, and seamless light/dark mode theming. It provides ready-to-use form controls, modal dialogs, data tables, and animated disclosure panels.',
    category: 'Frontend',
    featured: false,
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Accessibility', 'Framer Motion'],
    thumbnail: '/images/projects/aurora-ui.png',
    liveUrl: 'https://demo-aurora-ui.example.com', // [EDITABLE PLACEHOLDER]
    githubUrl: 'https://github.com/example/aurora-design-system', // [EDITABLE PLACEHOLDER]
    problemStatement: 'Inconsistent component implementations across projects create accessibility bugs and slow down UI engineering velocity.',
    architectureOverview: 'Built as a tree-shakeable TypeScript package using Radix UI accessible unstyled primitives and styled with Tailwind CSS tokens and CSS variables.',
    architecturePoints: [
      'Radix UI primitives ensuring screen-reader compatibility and focus trapping',
      'Tailwind CSS tokens using semantic CSS variables for dark/light transitions',
      'Full TypeScript type safety with strict prop inference',
      'Comprehensive keyboard navigation support for modals, dropdowns, and tabs'
    ],
    keyFeatures: [
      '40+ accessible UI components including dialogs, tooltips, sheets, and datatables',
      'Built-in reduced motion fallbacks for vestibular sensitivity compliance',
      'Zero layout shift (CLS) design with predefined aspect ratio utilities',
      'Interactive component playground with live code preview and copy-paste exports'
    ],
    technicalChallenges: [
      'Managing modal focus traps without disrupting screen reader announcement flow.',
      'Structuring CSS variable fallbacks to prevent theme flash (FOUC) during client hydration.'
    ],
    contributions: [
      'Implemented component library architecture, build tooling, and TypeScript types.',
      'Conducted keyboard navigation and accessibility screen reader audits.',
      'Created documentation site with live editable code previews.'
    ],
    stats: {
      performance: '100% WCAG AA',
      uptime: '12kb Gzip',
      users: '40+ Components'
    },
    role: 'Frontend Engineer',
    timeline: '2 Months',
    publishedAt: '2024-07-05'
  },
  {
    id: 'proj-atlas-sync',
    slug: 'atlas-db-monitor',
    title: 'AtlasDB Query Health & Schema Inspector',
    tagline: 'Database diagnostic tool for MongoDB Atlas and MySQL instances with slow query profiling and index recommendations.',
    description: 'A developer tool that analyzes database schema utilization, tracks slow query spikes, and suggests missing composite indices to optimize database throughput.',
    fullDescription: 'AtlasDB Monitor helps developers proactively identify database bottlenecks before they cause production downtime. It connects securely to MongoDB Atlas clusters and MySQL servers, monitors execution plans (EXPLAIN), and visualizes query latency distributions in real-time.',
    category: 'DevOps & Tools',
    featured: false,
    tags: ['TypeScript', 'MongoDB Atlas', 'MySQL', 'Node.js', 'REST APIs', 'Tailwind CSS'],
    thumbnail: '/images/projects/atlas-monitor.png',
    liveUrl: 'https://demo-atlas-monitor.example.com', // [EDITABLE PLACEHOLDER]
    githubUrl: 'https://github.com/example/atlas-db-monitor', // [EDITABLE PLACEHOLDER]
    problemStatement: 'Developers frequently discover unindexed or unoptimized database queries only after application latency degrades under production traffic.',
    architectureOverview: 'A Node.js backend connects using read-only administrative credentials to database servers, pulling execution statistics and serving summarized diagnostics through a responsive dashboard.',
    architecturePoints: [
      'MongoDB Atlas management API integration for cluster metric aggregation',
      'MySQL performance_schema analysis for slow query detection',
      'Interactive query timeline graphs with drill-down execution statistics',
      'Automated index advisor detecting unindexed sorting and collations'
    ],
    keyFeatures: [
      'Real-time query duration heatmaps and slowest 10 queries list',
      'Index redundancy detector highlighting duplicate index paths',
      'One-click query EXPLAIN visualizer with execution cost scoring',
      'Slack and Webhook alerting for sudden connection pool saturation'
    ],
    technicalChallenges: [
      'Executing diagnostics with zero performance impact on monitored production clusters.',
      'Normalizing execution plan formats across heterogeneous SQL and NoSQL engines.'
    ],
    contributions: [
      'Wrote MongoDB aggregation pipelines and MySQL performance query extractors.',
      'Built interactive data visualization views with responsive charts.',
      'Engineered connection pool management with automatic retry logic.'
    ],
    stats: {
      performance: 'Near-zero overhead',
      queriesPerSec: '100+ Metrics/sec'
    },
    role: 'Backend & DevOps Engineer',
    timeline: '1 Month',
    publishedAt: '2024-05-18'
  }
];
