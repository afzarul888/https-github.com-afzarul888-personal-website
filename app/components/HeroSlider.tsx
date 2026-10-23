"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, TouchEvent } from "react";
import { siteImages } from "../config";

const slides = [
  {
    id: "infrastructure",
    eyebrow: "10+ years of infrastructure experience",
    headline: "VPS, Proxmox & Server Systems Built to Stay Reliable.",
    description: "Plan, migrate, troubleshoot, and automate Windows and Linux server environments for growing businesses and technical teams.",
    primary: ["Discuss Your Infrastructure", "/contact"],
    secondary: ["View Experience", "/about"],
    labels: ["VPS", "Linux", "Windows Server", "Proxmox", "Networking", "Virtualization"],
  },
  {
    id: "devops",
    eyebrow: "DevOps • Cloud • Automation",
    headline: "From Manual Operations to Automated Infrastructure.",
    description: "Build repeatable deployments, automated workflows, containerized applications, monitoring systems, and reliable infrastructure operations.",
    primary: ["Explore DevOps", "/services/devops-cloud"],
    secondary: ["View Projects", "/projects"],
    labels: ["Git", "Build", "Test", "Docker", "Deploy", "Monitor"],
  },
  {
    id: "ai",
    eyebrow: "AI Automation • Intelligent Workflows",
    headline: "Turn Repetitive Work Into Intelligent Automation.",
    description: "Connect AI, APIs, business systems, and automation workflows to reduce repetitive work and create smarter operational processes.",
    primary: ["Explore AI Automation", "/services/ai-automation"],
    secondary: ["View Projects", "/projects"],
    labels: ["Request", "AI", "Knowledge", "Decision", "Automation", "API", "System"],
  },
  {
    id: "consulting",
    eyebrow: "Engineering • Consulting • Solutions",
    headline: "Solve Technical Problems. Build Better Systems.",
    description: "Practical engineering guidance built from years of real infrastructure experience and modern DevOps, automation, and AI technologies.",
    primary: ["Start a Project", "/contact"],
    secondary: ["View Experience", "/about"],
    labels: ["Assess", "Architect", "Build", "Observe"],
  },
] as const;

function SlideVisual({ id, labels }: { id: string; labels: readonly string[] }) {
  if (id === "infrastructure") return <div className="slide-visual infrastructure-visual">
    <Image
      className="founder-hero-image"
      src={siteImages.founderHero.src}
      alt={siteImages.founderHero.alt}
      fill
      priority
      sizes="(max-width: 900px) 90vw, 45vw"
    />
    <div className="founder-tech-overlay" aria-hidden="true">
      <div className="infra-core"><span>/\</span><small>CORE</small></div>
      <div className="network-ring ring-a" />
      <div className="network-ring ring-b" />
      {labels.map((label, index) => <div className={`visual-chip chip-${index + 1}`} key={label}><i />{label}</div>)}
      <div className="signal-line line-a" /><div className="signal-line line-b" />
    </div>
  </div>;
  if (id === "devops") return <div className="slide-visual pipeline-visual" aria-hidden="true"><div className="pipeline-label">DEPLOYMENT PIPELINE / ACTIVE</div><div className="pipeline-track">{labels.map((label, index) => <div className="pipeline-node" key={label}><span>0{index + 1}</span><strong>{label}</strong>{index < labels.length - 1 && <b>→</b>}</div>)}</div><div className="pipeline-pulse" /><div className="code-panel"><span>$ git push origin main</span><span>✓ tests passed</span><span>✓ image published</span><span>● deploy running_</span></div></div>;
  if (id === "ai") return <div className="slide-visual ai-visual" aria-hidden="true"><div className="ai-hub"><span>AI</span><small>ORCHESTRATOR</small></div>{labels.map((label, index) => <div className={`ai-node ai-node-${index + 1}`} key={label}><i />{label}</div>)}<svg viewBox="0 0 600 440" preserveAspectRatio="none"><path d="M80 100 C220 100 190 220 300 220 S410 95 530 95" /><path d="M75 345 C190 345 210 220 300 220 S410 350 525 350" /><path d="M300 45 L300 395" /></svg></div>;
  return <div className="slide-visual consulting-visual" aria-hidden="true"><div className="consult-layer layer-one"><span>ARCHITECTURE REVIEW</span><div className="mini-diagram"><i /><b>API</b><i /><b>Cloud</b><i /><b>Data</b></div></div><div className="consult-layer layer-two"><span>TERMINAL</span><p>$ inspect infrastructure</p><p>✓ dependencies mapped</p><p>✓ risks identified</p></div><div className="consult-layer layer-three"><span>OBSERVABILITY</span><div className="mini-chart"><i /><i /><i /><i /><i /><i /></div></div><div className="consult-flow">{labels.map((label) => <b key={label}>{label}</b>)}</div></div>;
}

export function HeroSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchStart = useRef<number | null>(null);
  const shouldPause = paused || hovered || reducedMotion;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update(); media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (shouldPause) return;
    const timer = window.setTimeout(() => setActive((current) => (current + 1) % slides.length), 6000);
    return () => window.clearTimeout(timer);
  }, [active, shouldPause]);

  const go = (index: number) => setActive((index + slides.length) % slides.length);
  const handleKey = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowRight") go(active + 1);
    if (event.key === "ArrowLeft") go(active - 1);
    if (event.key === " ") { event.preventDefault(); setPaused((value) => !value); }
  };
  const handleTouchStart = (event: TouchEvent<HTMLElement>) => { touchStart.current = event.touches[0].clientX; };
  const handleTouchEnd = (event: TouchEvent<HTMLElement>) => {
    if (touchStart.current === null) return;
    const distance = event.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(distance) > 45) go(active + (distance < 0 ? 1 : -1));
    touchStart.current = null;
  };

  return <section className="hero-slider" role="region" aria-roledescription="carousel" aria-label="Technology services" tabIndex={0} onKeyDown={handleKey} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
    <div className="slider-grid" aria-hidden="true" /><div className="slider-glow" aria-hidden="true" />
    {slides.map((slide, index) => <article className={`hero-slide slide-${slide.id} ${index === active ? "active" : ""}`} aria-hidden={index !== active} key={slide.id}>
      <div className="shell slide-layout"><div className="slide-copy"><span className="eyebrow">{slide.eyebrow}</span><h1>{slide.headline}</h1><p>{slide.description}</p><div className="hero-actions"><a className="button" href={slide.primary[1]} tabIndex={index === active ? 0 : -1}>{slide.primary[0]} <span>↗</span></a><a className="button button-ghost" href={slide.secondary[1]} tabIndex={index === active ? 0 : -1}>{slide.secondary[0]} <span>↗</span></a></div></div><SlideVisual id={slide.id} labels={slide.labels} /></div>
    </article>)}
    <div className="shell slider-controls"><div className="slide-count" aria-live="polite"><strong>{String(active + 1).padStart(2, "0")}</strong><span>/ {String(slides.length).padStart(2, "0")}</span></div><div className="progress-list">{slides.map((slide, index) => <button onClick={() => go(index)} aria-label={`Go to slide ${index + 1}: ${slide.headline}`} aria-current={index === active ? "true" : undefined} key={slide.id}><i className={index === active ? "active" : ""}>{index === active && <b key={`${active}-${shouldPause}`} className={shouldPause ? "paused" : ""} />}</i></button>)}</div><div className="slider-buttons"><button onClick={() => setPaused((value) => !value)} aria-label={paused ? "Resume automatic slides" : "Pause automatic slides"}>{paused ? "▶" : "Ⅱ"}</button><button onClick={() => go(active - 1)} aria-label="Previous slide">←</button><button onClick={() => go(active + 1)} aria-label="Next slide">→</button></div></div>
  </section>;
}
