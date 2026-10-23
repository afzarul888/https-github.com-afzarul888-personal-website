import Image from "next/image";
import { TechStack } from "../components/Sections";
import { siteConfig, siteImages } from "../config";

export default function About() {
  return <main className="inner-page">
    <div className="shell about-grid">
      <div>
        <span className="eyebrow">About {siteConfig.founder}</span>
        <h1>A Decade of<br /><span>Infrastructure Experience.</span></h1>
        <p className="role-line">{siteConfig.role}</p>
        <figure className="founder-portrait">
          <Image src={siteImages.founderHero.src} alt={siteImages.founderHero.alt} width={912} height={1152} sizes="(max-width: 900px) 100vw, 45vw" />
          <figcaption>10+ years in infrastructure engineering</figcaption>
        </figure>
      </div>
      <div className="about-copy">
        <p className="page-lede">My career has been built around solving technical problems in real server environments.</p>
        <p>For more than 10 years, I have worked in VPS services and infrastructure support—dealing with troubleshooting, networking, virtualization, operating systems, performance issues, migrations, and customer-facing technical operations.</p>
        <p>More recently, I expanded that foundation through professional DevOps training and continued development in cloud engineering, automation, and AI systems. The progression is continuous: infrastructure provides the foundation, DevOps makes operations repeatable, automation removes unnecessary manual work, and AI adds intelligence where it creates real value.</p>
        <div className="principles"><div><strong>01</strong><span>Solve the root cause.</span></div><div><strong>02</strong><span>Automate repetitive work.</span></div><div><strong>03</strong><span>Monitor what matters.</span></div><div><strong>04</strong><span>Keep systems simple.</span></div></div>
        <a className="button" href="/contact">Work together <span>↗</span></a>
      </div>
    </div>
    <section className="shell section"><div className="section-intro"><span className="eyebrow">Tools & technologies</span><h2>A practical engineering toolkit.</h2><p>These are the systems and concepts I am comfortable presenting as part of the practice.</p></div><TechStack /></section>
  </main>;
}
