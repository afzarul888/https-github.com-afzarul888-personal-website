import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { caseStudies, posts, projects, services, siteConfig } from "../config";
import { ArchitectureGraph, Terminal, Workflow } from "../components/TechnicalVisuals";

type Params = Promise<{ slug: string[] }>;

export function generateStaticParams() {
  return [
    ...services.map((item) => ({ slug: ["services", item.slug] })),
    ...projects.map((item) => ({ slug: ["projects", item.slug] })),
    ...caseStudies.map((item) => ({ slug: ["case-studies", item.slug] })),
    ...posts.map((item) => ({ slug: ["blog", item.slug] })),
  ];
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const [section, slug] = (await params).slug;
  const item = section === "services" ? services.find((entry) => entry.slug === slug)
    : section === "projects" ? projects.find((entry) => entry.slug === slug)
      : section === "case-studies" ? caseStudies.find((entry) => entry.slug === slug)
        : section === "blog" ? posts.find((entry) => entry.slug === slug) : undefined;
  if (!item) return {};
  const description = "description" in item ? item.description : "problem" in item ? item.problem : item.excerpt;
  const canonical = `${siteConfig.domain}/${section}/${slug}`;
  return { title: item.title, description, alternates: { canonical }, openGraph: { title: item.title, description, url: canonical, type: section === "blog" ? "article" : "website" } };
}

export default async function DynamicPage({ params }: { params: Params }) {
  const [section, slug] = (await params).slug;

  if (section === "services" && slug) {
    const item = services.find((service) => service.slug === slug);
    if (!item) return notFound();
    const isWorkflow = item.slug === "ai-automation" || item.slug === "automation";
    return <main className="inner-page"><div className="shell narrow">
      <a className="back-link" href="/services">← All services</a><span className="eyebrow">{item.number} / Service line</span><h1>{item.headline}</h1><p className="page-lede">{item.description}</p>
      {isWorkflow ? <Workflow /> : <ArchitectureGraph />}
      <div className="page-grid"><div><h2>{item.title} capabilities</h2><p>The engagement starts with the current operating reality, the constraints that matter, and a practical definition of success.</p><div className="capability-list">{item.items.map((capability) => <span key={capability}>{capability}</span>)}</div></div><Terminal /></div>
      <div className="cta-inline"><div><span className="eyebrow">Discuss the challenge</span><h2>Build the right next step.</h2></div><a className="button" href="/contact">Start a project <span>↗</span></a></div>
    </div></main>;
  }

  if (section === "projects" && slug) {
    const item = projects.find((project) => project.slug === slug);
    if (!item) return notFound();
    return <main className="inner-page"><div className="shell narrow">
      <a className="back-link" href="/projects">← All projects</a><span className="eyebrow">{item.eyebrow}</span><h1>{item.title}</h1><p className="page-lede">{item.description}</p><ArchitectureGraph />
      <div className="case-copy"><h2>Architecture notes</h2><p>This personal reference explores how the components fit together without representing client work. The design keeps access, deployment, observability, and failure handling explicit.</p><h2>Technologies</h2><div className="tag-row">{item.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div></div>
    </div></main>;
  }

  if (section === "case-studies" && slug) {
    const item = caseStudies.find((study) => study.slug === slug);
    if (!item) return notFound();
    return <main className="inner-page"><article className="shell narrow engineering-doc">
      <a className="back-link" href="/case-studies">← All case studies</a><span className="eyebrow">{item.label}</span><h1>{item.title}</h1>
      <div className="doc-section"><span>01 / Problem</span><h2>Operational context</h2><p>{item.problem}</p></div><ArchitectureGraph />
      <div className="doc-section"><span>02 / Approach</span><h2>A controlled path forward</h2><ol>{item.approach.map((step) => <li key={step}>{step}</li>)}</ol></div>
      <div className="doc-section"><span>03 / Intended result</span><h2>Reliability over spectacle</h2><p>{item.result}</p></div>
    </article></main>;
  }

  if (section === "blog" && slug) {
    const item = posts.find((post) => post.slug === slug);
    if (!item) return notFound();
    return <main className="inner-page"><article className="shell narrow article">
      <a className="back-link" href="/blog">← All engineering notes</a><span className="eyebrow">{item.category} · {item.date} · {item.readingTime}</span><h1>{item.title}</h1><p className="page-lede">{item.excerpt}</p><p className="article-author">By {siteConfig.founder} · Infrastructure, DevOps & Automation</p>
      <nav className="article-toc" aria-label="Table of contents"><span>On this page</span><a href="#reality">Start with operational reality</a><a href="#boundaries">Choose useful boundaries</a><a href="#observable">Make the result observable</a></nav>
      <div className="article-body"><p>Reliable systems are shaped by the details that are easy to miss: access patterns, operational context, recovery paths, and the feedback loops that show when something has changed.</p><h2 id="reality">Start with the operational reality</h2><p>Before choosing another tool, understand the environment and the work around it. What is repeated? What is fragile? What needs a human decision? Those questions create a stronger foundation than technology alone.</p><h2 id="boundaries">Choose useful boundaries</h2><p>Automation should have an explicit trigger, clear inputs, predictable actions, and a safe failure path. Sensitive changes should retain approval and recovery controls.</p><h2 id="observable">Make the result observable</h2><p>Whether the solution is a deployment pipeline, support workflow, or monitoring system, clarity is the feature. Log important decisions and leave a useful path back to the root cause.</p></div>
      <div className="share-row"><span>Share this note</span><a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${siteConfig.domain}/blog/${item.slug}`)}`}>LinkedIn ↗</a><a href={`mailto:?subject=${encodeURIComponent(item.title)}&body=${encodeURIComponent(`${siteConfig.domain}/blog/${item.slug}`)}`}>Email ↗</a></div>
    </article></main>;
  }

  return notFound();
}
