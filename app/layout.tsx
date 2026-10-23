import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "./config";
import { Header, Footer } from "./components/Shell";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: { default: `${siteConfig.name} — VPS, Proxmox, DevOps & Automation`, template: `%s — ${siteConfig.name}` },
  description: siteConfig.description,
  keywords: ["VPS engineer", "Proxmox", "Windows Server", "Linux server", "server migration", "DevOps consultant", "workflow automation", "Bangladesh"],
  openGraph: { title: `${siteConfig.name} — VPS, Proxmox, DevOps & Automation`, description: siteConfig.description, type: "website", url: "/", siteName: siteConfig.name, images: [{ url: "/images/hero/afzarul-infrastructure.png", width: 912, height: 1152, alt: "Afzarul in an infrastructure engineering workspace" }] },
  twitter: { card: "summary_large_image", title: `${siteConfig.name} — VPS, Proxmox, DevOps & Automation`, description: siteConfig.description, images: ["/images/hero/afzarul-infrastructure.png"] },
};

export const dynamic = "force-dynamic";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Header />{children}<Footer /></body></html>;
}
