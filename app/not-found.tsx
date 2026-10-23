import Link from "./components/Link";
export default function NotFound() { return <main className="inner-page"><div className="shell narrow empty-state"><span className="eyebrow">404 / Not found</span><h1>This route is not in the map.</h1><p>The page may have moved, or the system never deployed it.</p><Link className="button" href="/">Return home <span>↗</span></Link></div></main>; }
