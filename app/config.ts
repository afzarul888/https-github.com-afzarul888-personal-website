export const siteConfig = {
  name: "Tech with Afzarul",
  founder: "Afzarul",
  role: "Infrastructure Engineer | DevOps Specialist | AI Automation Consultant",
  tagline: "Engineering reliable infrastructure, automating operations, and building intelligent systems.",
  email: "afzarul070@gmail.com",
  phone: "+880 1744-823335",
  phoneHref: "+8801744823335",
  whatsapp: "8801744823335",
  location: "Bangladesh · Available remotely",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://bd.linkedin.com/in/afzarul-islam-b8bb79179",
  github: process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/afzarul888",
  youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL || "https://www.youtube.com/@techwithafzarul",
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://www.facebook.com/techwithafzarul",
  domain: process.env.NEXT_PUBLIC_SITE_URL || "https://tech-with-afzarul.vercel.app",
  bookingUrl: "/contact",
  description: "VPS, Proxmox, Windows and Linux server migration, DevOps, monitoring, and workflow automation for growing businesses and technical teams.",
};

export const coreServiceSlugs = ["infrastructure", "devops-cloud", "ai-automation"] as const;

export const siteImages = {
  founderHero: {
    src: "/images/hero/afzarul-infrastructure.png",
    alt: "Afzarul in a modern infrastructure engineering workspace",
  },
};

export const navItems = [
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Videos", href: "/videos" },
];

export const services = [
  {
    slug: "infrastructure", number: "01", title: "Infrastructure Engineering", icon: "⌁",
    headline: "Infrastructure That You Can Depend On",
    description: "Design, deployment, optimization, migration, and troubleshooting for server environments built around stability and performance.",
    tags: ["VPS", "Windows Server", "Linux", "Proxmox"],
    items: ["VPS infrastructure", "Linux servers", "Windows Server", "Proxmox and virtualization", "Networking and DNS", "RDP infrastructure", "Server migration", "Storage optimization", "Performance tuning", "Infrastructure troubleshooting"],
  },
  {
    slug: "devops-cloud", number: "02", title: "DevOps & Cloud Engineering", icon: "↗",
    headline: "From Manual Operations to Automated Infrastructure",
    description: "Repeatable, observable delivery systems using containers, CI/CD, infrastructure automation, monitoring, logging, and practical cloud architecture.",
    tags: ["Docker", "CI/CD", "Cloud", "Monitoring"],
    items: ["Docker", "CI/CD pipelines", "Deployment automation", "Infrastructure as Code", "Cloud deployment", "Monitoring", "Centralized logging", "Backup automation", "Server hardening", "Infrastructure automation"],
  },
  {
    slug: "ai-automation", number: "03", title: "AI Automation", icon: "✦",
    headline: "Turn Repetitive Work Into Intelligent Workflows",
    description: "Practical AI connected to real business systems, knowledge, APIs, and human approval—not a disconnected chatbot.",
    tags: ["LLMs", "n8n", "APIs", "RAG"],
    items: ["AI support agents", "LLM integrations", "Knowledge assistants", "Ticket classification", "Email automation", "Document processing", "AI reporting", "Internal AI tools", "Infrastructure event analysis", "Human approval workflows"],
  },
  {
    slug: "automation", number: "04", title: "Business Automation", icon: "⟷",
    headline: "Automate the Work Between Your Systems",
    description: "Connect applications, APIs, databases, email, and operational tools so routine processes move without constant manual intervention.",
    tags: ["n8n", "Webhooks", "APIs", "Workflows"],
    items: ["Workflow mapping", "n8n automation", "Webhook integrations", "REST APIs", "Database workflows", "Scheduled operations", "CRM integrations", "Email notifications", "Operational reporting", "Error handling and logging"],
  },
  {
    slug: "consulting", number: "05", title: "Technical Consulting", icon: "◇",
    headline: "Practical Direction for Complex Technical Decisions",
    description: "Architecture reviews, audits, migration planning, and modernization guidance grounded in real production infrastructure experience.",
    tags: ["Audits", "Architecture", "Strategy", "Troubleshooting"],
    items: ["Infrastructure audits", "Architecture reviews", "VPS optimization", "DevOps strategy", "Automation strategy", "AI implementation planning", "Migration planning", "Root-cause troubleshooting"],
  },
  {
    slug: "digital-marketing", number: "06", title: "Digital Marketing", icon: "◎",
    headline: "Digital Growth Built on Measurable Systems",
    description: "Technical SEO, content systems, campaign operations, and analytics-led optimization with clear measurement and practical execution.",
    tags: ["SEO", "Content", "Analytics", "Campaigns"],
    items: ["Technical SEO", "Content planning", "Website analytics", "Search visibility", "Campaign operations", "Conversion tracking", "Reporting dashboards", "Workflow automation"],
  },
  {
    slug: "technical-training", number: "07", title: "Technical Training & Mentorship", icon: "◫",
    headline: "Learn Practical Technology from Real Infrastructure Experience",
    description: "One-to-one and small-group teaching focused on practical understanding, guided exercises, troubleshooting habits, and skills that connect to real technical work.",
    tags: ["Training", "Mentorship", "Practical Labs", "Career Guidance"],
    items: ["VPS and server fundamentals", "Windows Server", "Linux administration", "Networking and DNS", "Docker fundamentals", "CI/CD concepts", "Monitoring and troubleshooting", "n8n workflow automation", "Practical AI workflows", "Personal learning plans"],
  },
];

export const projects = [
  { slug: "vps-infrastructure-automation", eyebrow: "Concept", title: "VPS Infrastructure Automation Platform", description: "A concept for automating VPS provisioning, configuration, networking, monitoring, and customer lifecycle operations.", tags: ["Proxmox", "Linux", "Windows Server", "APIs", "Automation"] },
  { slug: "ai-support-automation", eyebrow: "Prototype", title: "AI Support Assistant", description: "A support workflow designed to classify questions, retrieve technical knowledge, and assist teams with response generation.", tags: ["LLMs", "n8n", "APIs", "Knowledge Base"] },
  { slug: "infrastructure-monitoring", eyebrow: "Reference architecture", title: "Infrastructure Monitoring Platform", description: "A centralized architecture for tracking server health, resource usage, availability, alerts, and operational events.", tags: ["Prometheus", "Grafana", "Docker", "Linux"] },
  { slug: "devops-deployment-pipeline", eyebrow: "Experiment", title: "Automated DevOps Pipeline", description: "A deployment workflow connecting source control, containers, automated testing, deployment, and monitoring.", tags: ["Git", "Docker", "CI/CD", "Linux"] },
  { slug: "ai-business-workflow", eyebrow: "Concept", title: "AI Business Workflow Automation", description: "A practical workflow connecting business triggers, AI processing, APIs, databases, approval, and notifications.", tags: ["n8n", "LLMs", "REST APIs", "Webhooks", "Database"] },
];

export const caseStudies = [
  { slug: "manual-operations-to-automation", label: "Conceptual case study", title: "From Manual Infrastructure Operations to Automation", problem: "Infrastructure operations often involve repetitive configuration, monitoring, troubleshooting, and customer communication.", approach: ["Identify repetitive operations", "Map the current workflow", "Define infrastructure requirements", "Introduce controlled automation", "Add monitoring and logging", "Connect APIs", "Apply AI where useful", "Keep human approval for sensitive actions"], result: "The objective is to automate the right work while keeping systems observable, reliable, and controllable." },
  { slug: "support-knowledge-workflow", label: "Prototype case study", title: "Designing an AI-Assisted Support Workflow", problem: "Support teams repeatedly search documentation, classify similar issues, and draft responses while still needing human judgment.", approach: ["Classify the request", "Retrieve approved knowledge", "Draft a grounded response", "Route uncertain cases", "Keep a human review step", "Log decisions for improvement"], result: "The design reduces repetitive searching while keeping final support decisions with the team." },
  { slug: "observable-vps-platform", label: "Reference architecture", title: "Making VPS Infrastructure Observable", problem: "Server issues are harder to resolve when health, capacity, logs, and alerts are spread across disconnected tools.", approach: ["Inventory critical signals", "Collect system metrics", "Centralize dashboards", "Route actionable alerts", "Document response paths", "Review noisy signals"], result: "A shared operational view makes investigation faster and helps teams respond from evidence rather than guesswork." },
  { slug: "repeatable-deployment", label: "Reference architecture", title: "Building a Repeatable Deployment Path", problem: "Manual deployments create inconsistent steps, unclear rollback paths, and avoidable production risk.", approach: ["Define the release path", "Containerize the application", "Automate tests", "Control environment configuration", "Deploy consistently", "Monitor and improve"], result: "The reference design creates a clearer, auditable route from source code to an observable deployment." },
];

export const posts = [
  { slug: "vps-support-to-devops", category: "DevOps", title: "From VPS Support Engineer to DevOps Engineer", excerpt: "What more than a decade of infrastructure troubleshooting can teach you about DevOps engineering.", date: "Oct 07, 2026", readingTime: "6 min read" },
  { slug: "infrastructure-experience-devops", category: "Infrastructure", title: "Why Infrastructure Experience Matters in DevOps", excerpt: "Tools change quickly; operational judgment, root-cause thinking, and reliability fundamentals endure.", date: "Oct 01, 2026", readingTime: "5 min read" },
  { slug: "ai-technical-support", category: "AI", title: "How AI Automation Can Transform Technical Support", excerpt: "A practical view of classification, knowledge retrieval, drafting, routing, and human approval.", date: "Sep 24, 2026", readingTime: "7 min read" },
  { slug: "ai-powered-support-workflow", category: "Automation", title: "Building an AI-Powered Support Workflow", excerpt: "A reference flow connecting customer requests, approved knowledge, decisions, actions, and logs.", date: "Sep 18, 2026", readingTime: "8 min read" },
  { slug: "n8n-infrastructure-operations", category: "Automation", title: "Automating Infrastructure Operations with n8n", excerpt: "Where workflow orchestration can remove repetitive operational handoffs without hiding failure states.", date: "Sep 11, 2026", readingTime: "6 min read" },
  { slug: "docker-infrastructure-engineers", category: "DevOps", title: "Docker for Infrastructure Engineers", excerpt: "Containers explained from an infrastructure operations and troubleshooting perspective.", date: "Sep 04, 2026", readingTime: "7 min read" },
  { slug: "monitoring-vps-prometheus-grafana", category: "Monitoring", title: "Monitoring VPS Infrastructure with Prometheus and Grafana", excerpt: "Choosing useful server signals and turning them into operational dashboards and alerts.", date: "Aug 28, 2026", readingTime: "9 min read" },
  { slug: "reliable-server-automation", category: "Infrastructure", title: "Building Reliable Server Automation", excerpt: "Idempotency, validation, observability, and safe failure paths for server operations.", date: "Aug 21, 2026", readingTime: "6 min read" },
];

export const technologies = [
  { group: "Infrastructure", items: ["Windows Server", "Linux", "Proxmox", "Networking", "DNS", "Virtualization", "RDP"] },
  { group: "DevOps", items: ["Docker", "Git", "CI/CD", "Infrastructure Automation", "Monitoring", "Logging"] },
  { group: "Automation", items: ["n8n", "APIs", "Webhooks", "Workflow Automation"] },
  { group: "AI", items: ["LLMs", "AI Agents", "RAG", "Knowledge Bases", "AI APIs"] },
];

export const processSteps = [
  { number: "01", title: "Discover", copy: "Understand the current infrastructure, workflow, pain points, and business goals." },
  { number: "02", title: "Design", copy: "Create a practical architecture focused on reliability and maintainability." },
  { number: "03", title: "Build", copy: "Implement infrastructure, automation, integrations, and supporting systems." },
  { number: "04", title: "Test", copy: "Validate functionality, reliability, security, and operational behavior." },
  { number: "05", title: "Deploy", copy: "Move the solution into a production-ready environment with a clear handoff." },
  { number: "06", title: "Improve", copy: "Monitor the system and identify opportunities for optimization and automation." },
];

export const reasons = [
  { title: "Real Infrastructure Experience", copy: "More than a decade working directly with production infrastructure and technical support." },
  { title: "Practical Approach", copy: "Solutions are designed around actual operational requirements rather than unnecessary complexity." },
  { title: "Automation Mindset", copy: "Repetitive operations should be identified, simplified, and automated where appropriate." },
  { title: "Continuous Development", copy: "Combining years of infrastructure experience with modern DevOps, cloud, automation, and AI technologies." },
];
