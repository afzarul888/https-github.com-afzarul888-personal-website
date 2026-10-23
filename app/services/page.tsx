import { ServiceGrid, SectionIntro } from "../components/Sections";
import { coreServiceSlugs, services } from "../config";

const coreServices = services.filter((service) => (coreServiceSlugs as readonly string[]).includes(service.slug));
const additionalServices = services.filter((service) => !(coreServiceSlugs as readonly string[]).includes(service.slug));

export default function Services() { return <main className="inner-page"><div className="shell"><SectionIntro eyebrow="Core engineering services" title="Dependable infrastructure, delivery, and automation." copy="The primary practice focuses on three connected areas: stable systems, repeatable DevOps, and useful automation." /><ServiceGrid items={coreServices} /><section className="additional-services"><SectionIntro eyebrow="Additional capabilities" title="Support around the core engineering work." copy="Consulting, business automation, digital marketing, and technical teaching are available when they support a clear business or learning outcome." /><ServiceGrid items={additionalServices} /></section></div></main>; }
