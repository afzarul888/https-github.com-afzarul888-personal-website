import { requireAdmin } from "../lib/requireAdmin";

export default async function AdminDashboard() {
  await requireAdmin();
  return <main className="inner-page admin-page"><div className="shell"><div className="admin-header"><div><span className="eyebrow">Protected workspace</span><h1>Content administration.</h1><p className="page-lede">Upload and preview private blog drafts or build a local video playlist. These controls are not available on public pages.</p></div><form action="/api/admin/logout" method="post"><button className="button button-ghost" type="submit">Sign out</button></form></div><div className="admin-tool-grid"><a href="/admin/blog"><span>01 / BLOG</span><h2>Blog drafts</h2><p>Import Markdown, text, or JSON drafts from your computer and preview them privately.</p><b>Open blog studio ↗</b></a><a href="/admin/videos"><span>02 / VIDEO</span><h2>Video workspace</h2><p>Select local video files, build a temporary playlist, and review playback privately.</p><b>Open video workspace ↗</b></a></div></div></main>;
}
