"use client";

import { FormEvent, useState } from "react";
import { siteConfig } from "../config";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const formData = new FormData(form);
    if (formData.get("website")) return;

    const payload = Object.fromEntries(formData.entries());
    delete payload.website;

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${siteConfig.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...payload, _subject: "New project inquiry — Tech with Afzarul", _template: "table" }),
      });
      if (!response.ok) throw new Error("Unable to send inquiry");
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return <main className="inner-page">
    <div className="shell contact-grid">
      <div>
        <span className="eyebrow">Start a project</span>
        <h1>Have an infrastructure or automation challenge?</h1>
        <p className="page-lede">Tell me what you are trying to build, improve, automate, or troubleshoot.</p>
        <div className="contact-details">
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          <a href={`tel:${siteConfig.phoneHref}`}>{siteConfig.phone}</a>
          <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp ↗</a>
          <a href={siteConfig.youtube} target="_blank" rel="noopener noreferrer">YouTube ↗</a>
          <a href={siteConfig.facebook} target="_blank" rel="noopener noreferrer">Facebook ↗</a>
        </div>
      </div>
      <form className="contact-form" onSubmit={submit}>
        {status === "sent" ? <div className="success"><span>✓</span><h2>Project inquiry received.</h2><p>Thanks for reaching out. I will review the details and get back to you.</p></div> : <>
          <input className="sr-only" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <label>Name<input required name="name" /></label>
          <label>Email<input required type="email" name="email" /></label>
          <label>Company<input name="company" /></label>
          <label>Project Type<select name="type"><option>Infrastructure</option><option>DevOps</option><option>Cloud</option><option>AI Automation</option><option>Digital Marketing</option><option>Automation</option><option>Technical Training / Mentorship</option><option>Consulting</option><option>Other</option></select></label>
          <label>Current Environment<select name="environment"><option>VPS</option><option>Proxmox / Virtualization</option><option>Windows Server</option><option>Linux Server</option><option>Cloud</option><option>Mixed Environment</option><option>Not Sure Yet</option></select></label>
          <label>Urgency<select name="urgency"><option>This week</option><option>Within 2–4 weeks</option><option>Within 1–3 months</option><option>Exploring options</option></select></label>
          <label>Budget<select name="budget"><option>Under $500</option><option>$500–$1,000</option><option>$1,000–$2,500</option><option>$2,500–$5,000</option><option>$5,000+</option><option>Let&apos;s Discuss</option></select></label>
          <label>What problem are you trying to solve?<textarea required name="message" rows={5} placeholder="Describe the current issue, desired outcome, and anything already tried." /></label>
          {status === "error" && <p className="form-error" role="alert">Something went wrong while submitting the form. Please try again or contact me directly by email.</p>}
          <button className="button" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send Project Inquiry"} <span>↗</span></button>
        </>}
      </form>
    </div>
  </main>;
}
