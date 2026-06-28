import { NavLink, SkillsData, Project, CodingProfile, EducationEntry, Achievement, SocialLink, AboutCard } from '@/types';

export const NAV_LINKS: NavLink[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'coding-profiles', label: 'Profiles' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

export const ROLES: string[] = [
  'Full Stack Developer',
  'DSA Specialist',
  'Systems Engineer',
  'Creative Thinker',
  'React Architect',
];

export const SKILLS: SkillsData = {
  Frontend: [
    { name: 'React', level: 90, icon: '⚛️' },
    { name: 'Next.js', level: 85, icon: '▲' },
    { name: 'JavaScript', level: 92, icon: '🟨' },
    { name: 'TypeScript', level: 80, icon: '🔷' },
    { name: 'Tailwind CSS', level: 88, icon: '🎨' },
    { name: 'HTML/CSS', level: 95, icon: '🌐' },
  ],
  Backend: [
    { name: 'Node.js', level: 85, icon: '🟢' },
    { name: 'Express.js', level: 82, icon: '🚂' },
    { name: 'MongoDB', level: 80, icon: '🍃' },
    { name: 'PostgreSQL', level: 75, icon: '🐘' },
    { name: 'REST APIs', level: 88, icon: '🔗' },
  ],
  Languages: [
    { name: 'C++', level: 90, icon: '💻' },
    { name: 'JavaScript', level: 92, icon: '🟨' },
    { name: 'Python', level: 75, icon: '🐍' },
  ],
  'DSA & Algorithms': [
    { name: 'Arrays & Strings', level: 92, icon: '📊' },
    { name: 'Trees & Graphs', level: 85, icon: '🌳' },
    { name: 'Dynamic Programming', level: 80, icon: '🧩' },
    { name: 'Sorting & Searching', level: 90, icon: '🔍' },
    { name: 'Problem Solving', level: 88, icon: '🧠' },
  ],
  Tools: [
    { name: 'Git & GitHub', level: 88, icon: '🐙' },
    { name: 'Docker', level: 70, icon: '🐳' },
    { name: 'AWS Cloud', level: 60, icon: '☁️' },
    { name: 'Linux', level: 72, icon: '🐧' },
  ],
};

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'CodePrepX',
    subtitle: 'Isolated Sandbox Compilation Engine & LMS',
    description: 'A Next-gen compiler sandbox hosting isolated Docker containers to evaluate multi-language submissions securely. Features GraphQL subscriptions, a Redis-backed BullMQ message system, and performance telemetry.',
    longDescription: 'CodePrepX is a high-performance evaluation platform that executes user code submissions inside isolated micro-containers in real time. Designed for maximum security and minimal latency, it serves as an enterprise-grade sandboxed runtime environment for developers.',
    tech: ['Next.js', 'Go', 'Docker', 'GraphQL', 'Redis', 'PostgreSQL', 'BullMQ', 'Tailwind CSS'],
    github: 'https://github.com/abhishek-kumar',
    demo: 'https://cql.onrender.com',
    featured: true,
    color: '#A855F7',
    category: 'Systems / Full Stack',
    stats: { compiles: '10K+', latency: '< 150ms', isolation: '100%' },
    problem: 'Traditional code execution environments are vulnerable to malicious system commands and memory leaks, crashing the main server.',
    solution: 'Engineered a highly secured sandbox that spins up short-lived, sandboxed Docker instances, fetching code and output over socket channels.',
    challenges: ['Docker container cold-start delay mitigation', 'Resource containment (cgroups CPU limit)', 'BullMQ scheduler race conditions'],
    learnings: ['Go concurrency models', 'Docker SDK internals', 'Message queue resilience at scale'],
  },
  {
    id: 2,
    title: 'CSV Query Compiler',
    subtitle: 'SQL-to-Python Query Compilation Pipeline',
    description: 'A SQL-like compiler that translates queries for CSV files into executable Python code. Features semantic validation, AST generation, and an interactive web IDE.',
    tech: ['Python', 'TypeScript', 'React', 'AST Parser', 'Tailwind CSS'],
    github: 'https://github.com/Abhishek-18bit/CQL',
    demo: 'https://cql.onrender.com',
    featured: false,
    color: '#0EA5E9',
    category: 'Compiler Design',
    mockFileName: 'compiler.py',
    mockCodeLines: [
      'def compile_query(sql_str):',
      '    # AST compilation pipeline',
      '    tokens = tokenize(sql_str)',
      '    return translate_to_py(tokens)'
    ],
  },
  {
    id: 3,
    title: 'CodeElevate',
    subtitle: 'Interactive Coding & LMS Platform',
    description: 'An interactive platform featuring sandboxed code execution, structured programming lessons, competitive coding challenges, and user progress analytics.',
    tech: ['Next.js', 'PostgreSQL', 'Prisma', 'Monaco Editor', 'Tailwind CSS', 'Docker'],
    github: 'https://github.com/Abhishek-18bit/Learning-and-Coding-Platform',
    demo: 'https://learning-and-coding-platform-gjt1.vercel.app/',
    featured: false,
    color: '#10B981',
    category: 'Full Stack',
  },
  {
    id: 4,
    title: 'AlgoViz Pro',
    subtitle: 'Algorithm Visualizer',
    description: 'An interactive visualization tool for data structures and algorithms with step-by-step animations, code execution, and complexity analysis.',
    tech: ['React', 'D3.js', 'TypeScript', 'Tailwind CSS'],
    github: 'https://github.com/abhishek-kumar',
    demo: '#',
    featured: false,
    color: '#FB923C',
    category: 'Frontend',
  },
  {
    id: 5,
    title: 'EduStream',
    subtitle: 'Online Learning Management System',
    description: 'A comprehensive LMS with video lectures, quiz systems, progress tracking, and certificate generation for educational institutions.',
    tech: ['React', 'Node.js', 'MongoDB', 'FFmpeg', 'AWS S3', 'Redis'],
    github: 'https://github.com/abhishek-kumar',
    demo: '#',
    featured: false,
    color: '#A855F7',
    category: 'Full Stack',
  },
  {
    id: 6,
    title: 'WeatherAI',
    subtitle: 'AI-Powered Weather Dashboard',
    description: 'Smart weather application with ML-powered predictions, interactive maps, historical analysis, and personalized recommendations.',
    tech: ['React', 'Python', 'FastAPI', 'OpenAI API', 'Leaflet.js'],
    github: 'https://github.com/abhishek-kumar',
    demo: '#',
    featured: false,
    color: '#FB923C',
    category: 'AI / ML',
  },
];

export const CODING_PROFILES: CodingProfile[] = [
  {
    platform: 'LeetCode',
    username: 'abhishek_kumar',
    url: 'https://leetcode.com/abhishek_kumar',
    stats: {
      solved: 480,
      easy: 190,
      medium: 230,
      hard: 60,
      rating: 1680,
    },
    color: '#FFA116',
    bgColor: 'rgba(255, 161, 22, 0.08)',
    borderColor: 'rgba(255, 161, 22, 0.25)',
    description: 'Consistent solver with a focus on medium-hard problems',
  },
  {
    platform: 'GitHub',
    username: 'abhishek-kumar',
    url: 'https://github.com/abhishek-kumar',
    stats: {
      stars: 120,
      contributions: '1,200+',
      repos: 45,
    },
    color: '#FFFFFF',
    bgColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(255, 255, 255, 0.15)',
    description: 'Active open-source contributor and software system designer',
  },
  {
    platform: 'CodeChef',
    username: 'abhishek_k',
    url: 'https://codechef.com/users/abhishek_k',
    stats: {
      solved: 210,
      rating: 1635,
      stars: 3,
      globalRank: '14K',
    },
    color: '#9F7AEA',
    bgColor: 'rgba(159, 122, 234, 0.08)',
    borderColor: 'rgba(159, 122, 234, 0.25)',
    description: '3-star rated competitive programmer on algorithms',
  },
  {
    platform: 'GeeksforGeeks',
    username: 'abhishek_kumar',
    url: 'https://geeksforgeeks.org/user/abhishek_kumar',
    stats: {
      solved: 340,
      score: 1350,
      rank: 'Institute Rank 4',
      streak: 50,
    },
    color: '#2F8D46',
    bgColor: 'rgba(47, 141, 70, 0.08)',
    borderColor: 'rgba(47, 141, 70, 0.25)',
    description: 'Top institute rank and regular DSA solver',
  },
  {
    platform: 'Coding Ninjas',
    username: 'abhishek_kumar',
    url: 'https://codingninjas.com/studio/profile/abhishek_kumar',
    stats: {
      solved: 300,
      rating: 2150,
      rank: 'Expert',
      streak: 72,
    },
    color: '#E65C00',
    bgColor: 'rgba(230, 92, 0, 0.08)',
    borderColor: 'rgba(230, 92, 0, 0.25)',
    description: 'Expert-level rating with structured problem-solving streaks',
  },
];

export const EDUCATION: EducationEntry[] = [
  {
    degree: 'B.Tech in Computer Science & Engineering',
    institution: 'Your University Name',
    year: '2022 — 2026',
    current: '3rd Year (6th Semester)',
    cgpa: '8.5',
    courses: [
      'Data Structures & Algorithms',
      'Database Management Systems',
      'Operating Systems',
      'Computer Networks',
      'Object-Oriented Programming',
      'Systems Engineering',
      'Machine Learning',
      'Cloud Infrastructure',
    ],
    highlights: [
      'Core Technical Lead at Coding Society',
      'Built 6+ enterprise level apps',
      'Winner of local and state Hackathons',
    ],
  },
  {
    degree: 'Higher Secondary Education (12th)',
    institution: 'Your School Name',
    year: '2020 — 2022',
    score: '92%',
    stream: 'Science (PCM)',
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  { label: 'Problems Solved', value: 1200, suffix: '+', icon: '🧠', color: '#A855F7' },
  { label: 'Projects Built', value: 18, suffix: '+', icon: '🚀', color: '#FB923C' },
  { label: 'Certifications', value: 10, suffix: '', icon: '🏆', color: '#A855F7' },
  { label: 'Hackathons Won', value: 6, suffix: '+', icon: '⚡', color: '#FB923C' },
  { label: 'GitHub Stars', value: 120, suffix: '+', icon: '⭐', color: '#A855F7' },
  { label: 'Contributions', value: 1200, suffix: '+', icon: '🔧', color: '#FB923C' },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com/abhishek-kumar', icon: 'FiGithub' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/abhishek-kumar', icon: 'FiLinkedin' },
  { name: 'Twitter', url: 'https://twitter.com/abhishek_kumar', icon: 'FiTwitter' },
  { name: 'Email', url: 'mailto:abhishek@example.com', icon: 'FiMail' },
];

export const ABOUT_CARDS: AboutCard[] = [
  {
    title: 'Full Stack Systems',
    icon: '🎨',
    description: 'Developing highly responsive client UIs coupled with optimized database backends. Expertise in React architecture, caching layers, and TypeScript structures.',
    color: '#A855F7',
  },
  {
    title: 'Data Structures & Algorithms',
    icon: '🧩',
    description: 'Solving complex computational problems with advanced understanding of tree traversal, graph traversal, and dynamic programming patterns.',
    color: '#FB923C',
  },
  {
    title: 'Sandbox Containerization',
    icon: '⚙️',
    description: 'Deploying docker containers dynamically to run isolated sandboxes and microservices. Skilled in Redis queues, socket-based streaming, and Docker SDK.',
    color: '#A855F7',
  },
  {
    title: 'Cloud Architecture',
    icon: '☁️',
    description: 'Designing deployment environments, CI/CD automated test pipelines, and Linux server orchestrations for scalable hosting configurations.',
    color: '#FB923C',
  },
];
