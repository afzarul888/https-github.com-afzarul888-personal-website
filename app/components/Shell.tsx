import { navItems, siteConfig } from "../config";
import { LiveChatWidget } from "./LiveChatWidget";

export function Header() {
  return <header className="site-header">
    <div className="shell nav-wrap">
      <a href="/" className="brand"><span className="brand-mark">/\</span><span>{siteConfig.name}</span></a>
      <details className="mobile-nav">
        <summary className="menu-button" aria-label="Toggle navigation"><span /><span /><span /></summary>
        <nav className="nav-links">
          {navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
          <a className="button button-small" href="/contact">Start a Project <span>↗</span></a>
        </nav>
      </details>
      <nav className="nav-links desktop-nav">
        {navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        <a className="button button-small" href="/contact">Start a Project <span>↗</span></a>
      </nav>
    </div>
  </header>;
}

export function Footer() {
  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("Hello Afzarul, I am interested in discussing a technology project.")}`;
  return <>
    <a className="whatsapp-button" href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Message Afzarul on WhatsApp">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.08 0C5.52 0 .18 5.34.18 11.9c0 2.1.55 4.15 1.6 5.96L.08 24l6.29-1.65a11.9 11.9 0 0 0 5.7 1.45h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.23-6.16-3.48-8.4Zm-8.42 18.3h-.01a9.85 9.85 0 0 1-5.02-1.37l-.36-.21-3.73.98 1-3.64-.24-.38a9.87 9.87 0 1 1 8.36 4.62Zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47a8.93 8.93 0 0 1-1.65-2.05c-.17-.3-.02-.46.13-.6.13-.13.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.09 4.5.71.3 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.08 1.76-.72 2.01-1.41.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" /></svg>
      <span>WhatsApp</span>
    </a>
    <LiveChatWidget />
    <footer className="footer">
      <div className="shell footer-grid">
        <div><a href="/" className="brand"><span className="brand-mark">/\</span><span>{siteConfig.name}</span></a><p className="footer-copy">{siteConfig.description}</p></div>
        <div><p className="footer-label">Explore</p><a href="/services">Services</a><a href="/projects">Projects</a><a href="/about">About</a><a href="/blog">Blog</a><a href="/videos">Videos</a></div>
        <div>
          <p className="footer-label">Connect</p>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          <a href={`tel:${siteConfig.phoneHref}`}>{siteConfig.phone}</a>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp ↗</a>
          <a href={siteConfig.youtube} target="_blank" rel="noopener noreferrer">YouTube ↗</a>
          <a href={siteConfig.facebook} target="_blank" rel="noopener noreferrer">Facebook ↗</a>
          {siteConfig.linkedin && <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>}
          {siteConfig.github && <a href={siteConfig.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>}
        </div>
      </div>
      <div className="shell footer-bottom"><span>© {new Date().getFullYear()} {siteConfig.name}</span><span><a href="/privacy">Privacy</a> <a href="/terms">Terms</a></span></div>
    </footer>
  </>;
}
