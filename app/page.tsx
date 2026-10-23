import { AutomationSplit, ProcessSection, ProjectGrid, ReasonsGrid, SectionIntro, ServiceGrid, TechStack, TechnicalSplit } from "./components/Sections";
import { HeroSlider } from "./components/HeroSlider";
import { coreServiceSlugs, posts, services, siteConfig } from "./config";

const coreServices = services.filter((service) => (coreServiceSlugs as readonly string[]).includes(service.slug));
const engagements = [
  { step: "01", title: "Infrastructure audit", time: "2–5 business days", copy: "Review the current VPS, server, network, risks, and priorities before changes begin." },
  { step: "02", title: "Migration or optimization", time: "Typically 1–3 weeks", copy: "A scoped move, rebuild, performance improvement, or reliability engagement with a clear handoff." },
  { step: "03", title: "Automation build", time: "Typically 2–6 weeks", copy: "Design and implement a repeatable DevOps, monitoring, integration, or AI-assisted workflow." },
];

export default function Home() {
  return <main>
    <HeroSlider />

    <section className="trust-band"><div className="shell trust-grid">
      <div><span className="eyebrow">Built from real experience</span><h2>Technology looks different when you have worked directly with the systems behind it.</h2></div>
      <div><p>My journey started with VPS infrastructure and technical support—solving server problems, troubleshooting production environments, and working with Windows, Linux, networking, and virtualization.</p><p>Today, that foundation supports modern DevOps, cloud engineering, automation, and practical AI workflows.</p><a className="text-link intro-link" href="/about">Learn more about my journey <span>↗</span></a></div>
      <div className="metrics"><div><strong>10+</strong><span>Years infrastructure experience</span></div><div><strong>24/7</strong><span>Production support mindset</span></div><div><strong>DevOps</strong><span>Infrastructure & automation</span></div><div><strong>AI</strong><span>Intelligent workflow automation</span></div></div>
    </div></section>

    <section className="shell section"><SectionIntro eyebrow="Core services" title="Infrastructure, DevOps, and automation—without the noise." copy="Three focused capabilities for businesses that need dependable systems, repeatable delivery, and less manual work." /><ServiceGrid items={coreServices} /><div className="center-action"><a className="button button-ghost" href="/services">View all capabilities <span>↗</span></a></div></section>
    <section className="shell section"><TechnicalSplit /></section>
    <section className="dark-section"><div className="shell section"><AutomationSplit /></div></section>
    <section className="shell section"><SectionIntro eyebrow="Selected work" title="Engineering projects and experiments." copy="Infrastructure, DevOps, automation, and AI concepts designed around practical technical problems. Every item is labeled honestly." /><ProjectGrid /><div className="center-action"><a className="button button-ghost" href="/projects">See all projects <span>↗</span></a></div></section>
    <section className="dark-section"><div className="shell section"><SectionIntro eyebrow="Tools & technologies" title="A focused technical ecosystem." copy="Technologies presented here reflect the areas used or developed as part of the practice—not a wall of inflated logos." /><TechStack /></div></section>
    <section className="shell section"><SectionIntro eyebrow="How I work" title="A clear path from problem to dependable system." /><ProcessSection /></section>
    <section className="engagement-section"><div className="shell section"><SectionIntro eyebrow="Typical engagements" title="Know the shape of the work before committing." copy="Every project is scoped around the current environment and desired outcome. Final timing and price are confirmed after a short discovery conversation." /><div className="engagement-grid">{engagements.map((item) => <article key={item.step}><span>{item.step}</span><small>{item.time}</small><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div><p className="engagement-note">Start with a focused assessment. You receive a recommended scope, delivery plan, and quote before implementation begins.</p></div></section>
    <section className="shell section section-tight"><SectionIntro eyebrow="Why work with me" title="Practical experience. Modern engineering." /><ReasonsGrid /></section>
    <section className="shell section latest-section"><SectionIntro eyebrow="Latest insights" title="Notes and videos from the practice." copy="Recent writing and practical teaching keep the site useful—and show how technical problems are approached." /><div className="latest-grid"><div className="latest-posts">{posts.slice(0, 3).map((post) => <a href={`/blog/${post.slug}`} key={post.slug}><span className="eyebrow">{post.category} · {post.readingTime}</span><h3>{post.title}</h3><p>{post.excerpt}</p><b>Read article ↗</b></a>)}</div><a className="latest-video" href={siteConfig.youtube} target="_blank" rel="noopener noreferrer"><span className="video-public-icon">▶</span><span className="eyebrow">Tech with Afzarul on YouTube</span><h3>Practical infrastructure and automation lessons.</h3><p>Follow tutorials, engineering walkthroughs, and technical learning content on the official channel.</p><b>Watch the channel ↗</b></a></div></section>
    <section className="cta-section"><div className="shell cta-inner"><span className="eyebrow">Have a technical problem worth solving?</span><h2>Bring the problem.<br />Leave with a clear plan.</h2><p>Share the current environment, urgency, and desired outcome. I will review the details and suggest the next practical step.</p><a className="button" href="/contact">Discuss your project <span>↗</span></a></div></section>
  </main>;
}
