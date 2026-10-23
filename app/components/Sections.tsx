import Link from "./Link";
import { processSteps, projects, reasons, services, technologies } from "../config";
import { ArchitectureGraph, Terminal, Workflow } from "./TechnicalVisuals";

export function SectionIntro({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) { return <div className="section-intro"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{copy && <p>{copy}</p>}</div>; }

export function ServiceGrid({ items = services }: { items?: typeof services }) { return <div className="service-grid">{items.map((s) => <article className="service-card" key={s.slug}><div className="card-top"><span className="service-icon">{s.icon}</span><span className="card-number">{s.number}</span></div><h3>{s.title}</h3><p>{s.description}</p><div className="tag-row">{s.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</div><a className="text-link" href={`/services/${s.slug}`}>Learn more <span>↗</span></a></article>)}</div>; }

export function ProjectGrid() { return <div className="project-grid">{projects.map((p, i) => <article className={`project-card project-${i + 1}`} key={p.slug}><div className="project-art"><ArchitectureGraph compact /></div><span className="eyebrow">{p.eyebrow}</span><h3>{p.title}</h3><p>{p.description}</p><div className="tag-row">{p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</div><a className="text-link" href={`/projects/${p.slug}`}>View project <span>↗</span></a></article>)}</div>; }

export function TechnicalSplit() { return <div className="technical-split"><div><SectionIntro eyebrow="Operational by default" title="Technical clarity from the first conversation." copy="Good infrastructure work is not about adding complexity. It is about making the important parts visible, repeatable, and resilient." /><ArchitectureGraph /></div><Terminal /></div>; }

export function AutomationSplit() { return <div className="automation-block"><SectionIntro eyebrow="AI, applied" title="Turn repetitive operations into intelligent workflows." copy="Connect business context to capable models, useful tools, and clear approval points. The result is automation that supports people instead of creating another black box." /><Workflow /></div>; }

export function TechStack() {
  return <div className="tech-grid">{technologies.map((group) => <article className="tech-group" key={group.group}><span className="eyebrow">{group.group}</span>{group.items.map((item) => <span className="tech-item" key={item}>{item}</span>)}</article>)}</div>;
}

export function ProcessSection() {
  return <div className="process-grid">{processSteps.map((step) => <article className="process-step" key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.copy}</p></article>)}</div>;
}

export function ReasonsGrid() {
  return <div className="reason-grid">{reasons.map((reason, index) => <article key={reason.title}><span>0{index + 1}</span><h3>{reason.title}</h3><p>{reason.copy}</p></article>)}</div>;
}
