"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="inner-page"><div className="shell narrow empty-state"><span className="eyebrow">500 / System error</span><h1>The system hit an unexpected state.</h1><p>Try the request again, or return to the home page.</p><button className="button" onClick={() => reset()}>Try again <span>↗</span></button></div></main>;
}
