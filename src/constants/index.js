// ===== Portfolio Data Constants =====

export const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'coding-profiles', label: 'Profiles' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

export const ROLES = [
  'Full Stack Developer',
  'DSA Enthusiast',
  'Software Engineering Student',
  'Problem Solver',
  'React Developer',
];

export const SKILLS = {
  Frontend: [
    { name: 'React', level: 90, icon: '⚛️' },
    { name: 'Next.js', level: 80, icon: '▲' },
    { name: 'JavaScript', level: 92, icon: '🟨' },
    { name: 'TypeScript', level: 75, icon: '🔷' },
    { name: 'Tailwind CSS', level: 88, icon: '🎨' },
    { name: 'HTML/CSS', level: 95, icon: '🌐' },
  ],
  Backend: [
    { name: 'Node.js', level: 85, icon: '🟢' },
    { name: 'Express.js', level: 82, icon: '🚂' },
    { name: 'MongoDB', level: 80, icon: '🍃' },
    { name: 'PostgreSQL', level: 70, icon: '🐘' },
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
    { name: 'Docker', level: 65, icon: '🐳' },
    { name: 'AWS Basics', level: 60, icon: '☁️' },
    { name: 'Linux', level: 72, icon: '🐧' },
  ],
};

export const PROJECTS = [
  {
    id: 1,
    title: 'Gignest',
    subtitle: 'Freelancer-Client Marketplace Platform',
    description: 'A full-stack freelancer-client marketplace platform connecting businesses with skilled professionals through a modern, scalable, and secure experience. Features real-time notifications, escrow payments, and advanced matching algorithms.',
    longDescription: 'Gignest is a comprehensive marketplace that bridges the gap between talented freelancers and clients looking for quality work. Built with scalability and performance in mind, it handles thousands of concurrent users with real-time updates.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Socket.io', 'JWT', 'Tailwind CSS', 'Cloudinary'],
    github: 'https://github.com/abhishek-kumar',
    demo: '#',
    featured: true,
    color: '#00E5FF',
    category: 'Full Stack',
    stats: { users: '500+', transactions: '1K+', uptime: '99.9%' },
    problem: 'Freelancers struggled to find quality clients and vice versa, with existing platforms charging excessive fees.',
    solution: 'Built a platform with smart matching, transparent pricing, secure escrow payments, and a modern UX that reduces friction.',
    challenges: ['Real-time bidding system', 'Secure payment escrow', 'File upload optimization', 'Concurrent user management'],
    learnings: ['WebSocket architecture', 'Payment gateway integration', 'Performance optimization', 'System design at scale'],
  },
  {
    id: 2,
    title: 'DevConnect',
    subtitle: 'Developer Networking Platform',
    description: 'A social platform for developers to showcase projects, collaborate on open source, and build meaningful professional connections.',
    tech: ['React', 'Next.js', 'PostgreSQL', 'Prisma', 'NextAuth', 'TypeScript'],
    github: 'https://github.com/abhishek-kumar',
    demo: '#',
    featured: false,
    color: '#7C3AED',
    category: 'Full Stack',
  },
  {
    id: 3,
    title: 'AlgoViz Pro',
    subtitle: 'Algorithm Visualizer',
    description: 'An interactive visualization tool for data structures and algorithms with step-by-step animations, code execution, and complexity analysis.',
    tech: ['React', 'D3.js', 'TypeScript', 'Tailwind CSS'],
    github: 'https://github.com/abhishek-kumar',
    demo: '#',
    featured: false,
    color: '#FF6B6B',
    category: 'Frontend',
  },
  {
    id: 4,
    title: 'EduStream',
    subtitle: 'Online Learning Management System',
    description: 'A comprehensive LMS with video lectures, quiz systems, progress tracking, and certificate generation for educational institutions.',
    tech: ['React', 'Node.js', 'MongoDB', 'FFmpeg', 'AWS S3', 'Redis'],
    github: 'https://github.com/abhishek-kumar',
    demo: '#',
    featured: false,
    color: '#FFE66D',
    category: 'Full Stack',
  },
  {
    id: 5,
    title: 'WeatherAI',
    subtitle: 'AI-Powered Weather Dashboard',
    description: 'Smart weather application with ML-powered predictions, interactive maps, historical analysis, and personalized recommendations.',
    tech: ['React', 'Python', 'FastAPI', 'OpenAI API', 'Leaflet.js'],
    github: 'https://github.com/abhishek-kumar',
    demo: '#',
    featured: false,
    color: '#4ECDC4',
    category: 'AI/ML',
  },
  {
    id: 6,
    title: 'TaskFlow',
    subtitle: 'Project Management Tool',
    description: 'A Jira-inspired project management tool with Kanban boards, sprint planning, real-time collaboration, and advanced reporting.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Socket.io', 'Docker'],
    github: 'https://github.com/abhishek-kumar',
    demo: '#',
    featured: false,
    color: '#A8E6CF',
    category: 'Full Stack',
  },
];

export const CODING_PROFILES = [
  {
    platform: 'LeetCode',
    username: 'abhishek_kumar',
    url: 'https://leetcode.com/abhishek_kumar',
    stats: {
      solved: 450,
      easy: 180,
      medium: 210,
      hard: 60,
      rating: 1650,
    },
    color: '#FFA116',
    bgColor: 'rgba(255, 161, 22, 0.08)',
    borderColor: 'rgba(255, 161, 22, 0.25)',
    description: 'Consistent problem solver with focus on medium-hard problems',
  },
  {
    platform: 'CodeChef',
    username: 'abhishek_k',
    url: 'https://codechef.com/users/abhishek_k',
    stats: {
      solved: 200,
      rating: 1624,
      stars: 3,
      globalRank: '15K',
    },
    color: '#5B4638',
    bgColor: 'rgba(91, 70, 56, 0.08)',
    borderColor: 'rgba(91, 70, 56, 0.3)',
    description: '3-star rated competitive programmer',
  },
  {
    platform: 'GeeksforGeeks',
    username: 'abhishek_kumar',
    url: 'https://geeksforgeeks.org/user/abhishek_kumar',
    stats: {
      solved: 320,
      score: 1200,
      rank: 'Institute Rank 5',
      streak: 45,
    },
    color: '#2F8D46',
    bgColor: 'rgba(47, 141, 70, 0.08)',
    borderColor: 'rgba(47, 141, 70, 0.25)',
    description: 'Active contributor with high institute rank',
  },
  {
    platform: 'Coding Ninjas',
    username: 'abhishek_kumar',
    url: 'https://codingninjas.com/studio/profile/abhishek_kumar',
    stats: {
      solved: 280,
      rating: 2100,
      rank: 'Expert',
      streak: 60,
    },
    color: '#E65C00',
    bgColor: 'rgba(230, 92, 0, 0.08)',
    borderColor: 'rgba(230, 92, 0, 0.25)',
    description: 'Expert-rated coder with impressive streak',
  },
];

export const EDUCATION = [
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
      'Software Engineering',
      'Machine Learning',
      'Cloud Computing',
    ],
    highlights: [
      'Active in Coding Club',
      'Participated in 5+ Hackathons',
      'Dean\'s List Academic Recognition',
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

export const ACHIEVEMENTS = [
  { label: 'Projects Built', value: 15, suffix: '+', icon: '🚀', color: '#00E5FF' },
  { label: 'Problems Solved', value: 1000, suffix: '+', icon: '🧠', color: '#7C3AED' },
  { label: 'Certifications', value: 8, suffix: '', icon: '🏆', color: '#FFE66D' },
  { label: 'Hackathons', value: 5, suffix: '+', icon: '⚡', color: '#FF6B6B' },
  { label: 'GitHub Stars', value: 200, suffix: '+', icon: '⭐', color: '#4ECDC4' },
  { label: 'Open Source PRs', value: 20, suffix: '+', icon: '🔧', color: '#A8E6CF' },
];

export const SOCIAL_LINKS = [
  { name: 'GitHub', url: 'https://github.com/abhishek-kumar', icon: 'FiGithub' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/abhishek-kumar', icon: 'FiLinkedin' },
  { name: 'Twitter', url: 'https://twitter.com/abhishek_kumar', icon: 'FiTwitter' },
  { name: 'Email', url: 'mailto:abhishek@example.com', icon: 'FiMail' },
];

export const ABOUT_CARDS = [
  {
    title: 'Frontend Development',
    icon: '🎨',
    description: 'Building pixel-perfect, performant UIs with React, TypeScript, and modern CSS. Passionate about micro-animations and exceptional user experiences.',
    color: '#00E5FF',
  },
  {
    title: 'Backend Development',
    icon: '⚙️',
    description: 'Designing scalable RESTful APIs, microservices architecture, and robust database schemas with Node.js, MongoDB, and PostgreSQL.',
    color: '#7C3AED',
  },
  {
    title: 'Data Structures & Algorithms',
    icon: '🧩',
    description: 'Solving 1000+ problems across platforms. Strong foundation in time-space complexity, graph theory, dynamic programming, and optimization.',
    color: '#FF6B6B',
  },
  {
    title: 'Cloud & Modern Technologies',
    icon: '☁️',
    description: 'Familiar with cloud deployment, containerization with Docker, CI/CD pipelines, and modern DevOps practices for production-ready applications.',
    color: '#FFE66D',
  },
];
