import { MetadataRoute } from "next";
import { caseStudies, posts, projects, services, siteConfig } from "./config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/services", "/projects", "/case-studies", "/blog", "/videos", "/contact", "/privacy", "/terms"];
  const routes = [
    ...staticRoutes,
    ...services.map((item) => `/services/${item.slug}`),
    ...projects.map((item) => `/projects/${item.slug}`),
    ...caseStudies.map((item) => `/case-studies/${item.slug}`),
    ...posts.map((item) => `/blog/${item.slug}`),
  ];
  return routes.map((route) => ({ url: `${siteConfig.domain}${route}`, lastModified: new Date() }));
}
