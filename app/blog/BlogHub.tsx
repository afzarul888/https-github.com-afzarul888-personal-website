"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";

type PublishedPost = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
};

type ImportedPost = PublishedPost & { content: string; importedAt: number };
const storageKey = "tech-with-afzarul-blog-drafts";

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "blog-draft";
}

function cleanValue(value: string) {
  return value.trim().replace(/^['"]|['"]$/g, "");
}

function parseMarkdown(source: string, filename: string): ImportedPost {
  let body = source.trim();
  const metadata: Record<string, string> = {};
  const frontmatter = body.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?/);
  if (frontmatter) {
    frontmatter[1].split(/\r?\n/).forEach((line) => {
      const separator = line.indexOf(":");
      if (separator > -1) metadata[line.slice(0, separator).trim().toLowerCase()] = cleanValue(line.slice(separator + 1));
    });
    body = body.slice(frontmatter[0].length).trim();
  }
  const heading = body.match(/^#\s+(.+)$/m);
  const title = metadata.title || heading?.[1]?.trim() || filename.replace(/\.(md|markdown|txt)$/i, "");
  if (heading && !metadata.title) body = body.replace(heading[0], "").trim();
  const plainText = body.replace(/[#*_>`\[\]()-]/g, " ").replace(/\s+/g, " ").trim();
  const wordCount = plainText ? plainText.split(/\s+/).length : 0;
  const importedAt = Date.now();
  return {
    slug: `draft-${slugify(title)}-${importedAt}`,
    title,
    category: metadata.category || "Draft",
    date: metadata.date || new Intl.DateTimeFormat("en", { month: "short", day: "2-digit", year: "numeric" }).format(new Date()),
    readingTime: metadata.readingtime || metadata.reading_time || `${Math.max(1, Math.ceil(wordCount / 220))} min read`,
    excerpt: metadata.excerpt || plainText.slice(0, 170) + (plainText.length > 170 ? "…" : ""),
    content: body,
    importedAt,
  };
}

function parseJson(source: string, filename: string) {
  const parsed = JSON.parse(source) as Record<string, unknown> | Record<string, unknown>[];
  return (Array.isArray(parsed) ? parsed : [parsed]).map((entry, index) => {
    const title = String(entry.title || `${filename.replace(/\.json$/i, "")} ${index + 1}`);
    const content = String(entry.content || entry.body || entry.excerpt || "");
    const base = parseMarkdown(content, title);
    return { ...base, slug: `draft-${slugify(title)}-${Date.now()}-${index}`, title, category: String(entry.category || base.category), date: String(entry.date || base.date), readingTime: String(entry.readingTime || entry.reading_time || base.readingTime), excerpt: String(entry.excerpt || base.excerpt), content, importedAt: Date.now() + index };
  });
}

function DraftPreview({ post, onClose }: { post: ImportedPost; onClose: () => void }) {
  return <div className="draft-preview" role="dialog" aria-modal="true" aria-labelledby="draft-preview-title">
    <div className="draft-preview-bar"><span>Local draft preview</span><button type="button" onClick={onClose} aria-label="Close preview">×</button></div>
    <article><span className="eyebrow">{post.category} · {post.date} · {post.readingTime}</span><h2 id="draft-preview-title">{post.title}</h2><p className="page-lede">{post.excerpt}</p><div className="draft-content">{post.content.split(/\r?\n\r?\n/).filter(Boolean).map((paragraph, index) => <p key={`${post.slug}-${index}`}>{paragraph.replace(/^#{1,6}\s*/, "")}</p>)}</div></article>
  </div>;
}

export function BlogHub({ publishedPosts, showUploader = false }: { publishedPosts: readonly PublishedPost[]; showUploader?: boolean }) {
  const [drafts, setDrafts] = useState<ImportedPost[]>([]);
  const [activeDraft, setActiveDraft] = useState<ImportedPost | null>(null);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try { const saved = window.localStorage.getItem(storageKey); if (saved) setDrafts(JSON.parse(saved)); }
    catch { window.localStorage.removeItem(storageKey); }
  }, []);

  const saveDrafts = (next: ImportedPost[]) => { setDrafts(next); window.localStorage.setItem(storageKey, JSON.stringify(next)); };
  const importFiles = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []); setError("");
    try {
      const imported = (await Promise.all(files.map(async (file) => { const source = await file.text(); return file.name.toLowerCase().endsWith(".json") ? parseJson(source, file.name) : [parseMarkdown(source, file.name)]; }))).flat();
      saveDrafts([...imported, ...drafts]);
    } catch { setError("That file could not be imported. Check the Markdown, text, or JSON format and try again."); }
    finally { event.target.value = ""; }
  };

  return <main className="inner-page blog-page"><div className="shell">
    <div className={showUploader ? "blog-hero" : "blog-hero blog-hero-public"}><div className="section-intro"><span className="eyebrow">{showUploader ? "Private blog studio" : "Engineering notes"}</span><h1>{showUploader ? "Import and preview blog drafts." : "Practical ideas for dependable technology."}</h1><p>{showUploader ? "This protected workspace keeps upload controls away from the public website." : "Infrastructure, DevOps, automation, AI, and the operating habits that make complex systems easier to understand and trust."}</p></div>
      {showUploader && <aside className="blog-import-panel"><span className="eyebrow">Admin upload</span><h2>Import a draft from your PC.</h2><p>Upload Markdown, text, or JSON. Drafts stay private in this browser until you add them to the website and redeploy.</p><input ref={inputRef} className="sr-only" type="file" accept=".md,.markdown,.txt,.json,text/markdown,text/plain,application/json" multiple onChange={importFiles} /><button className="button blog-upload-button" type="button" onClick={() => inputRef.current?.click()}><span aria-hidden="true">↑</span> Choose blog files</button><small>Accepted: .md, .txt, .json · Multiple files supported</small>{error && <p className="blog-import-error" role="alert">{error}</p>}</aside>}
    </div>
    {showUploader && drafts.length > 0 && <section className="draft-section" aria-labelledby="draft-heading"><div className="blog-section-heading"><div><span className="eyebrow">Private workspace</span><h2 id="draft-heading">Imported drafts</h2></div><span>{drafts.length.toString().padStart(2, "0")} saved locally</span></div><div className="draft-grid">{drafts.map((post) => <article className="draft-card" key={post.slug}><span className="eyebrow">{post.category} · {post.readingTime}</span><h3>{post.title}</h3><p>{post.excerpt || "No excerpt provided."}</p><div><button type="button" onClick={() => setActiveDraft(post)}>Preview</button><button type="button" onClick={() => saveDrafts(drafts.filter((draft) => draft.slug !== post.slug))}>Remove</button></div></article>)}</div></section>}
    <section className="published-section" aria-labelledby="published-heading"><div className="blog-section-heading"><div><span className="eyebrow">Published library</span><h2 id="published-heading">Latest engineering notes</h2></div><span>{publishedPosts.length.toString().padStart(2, "0")} articles</span></div><div className="post-list">{publishedPosts.map((post, index) => <a className="post-row" href={`/blog/${post.slug}`} key={post.slug}><span className="post-index">{(index + 1).toString().padStart(2, "0")}</span><div className="post-copy"><span className="eyebrow">{post.category} · {post.date} · {post.readingTime}</span><h2>{post.title}</h2><p>{post.excerpt}</p></div><span className="post-arrow" aria-hidden="true">↗</span></a>)}</div></section>
    {activeDraft && <DraftPreview post={activeDraft} onClose={() => setActiveDraft(null)} />}
  </div></main>;
}
