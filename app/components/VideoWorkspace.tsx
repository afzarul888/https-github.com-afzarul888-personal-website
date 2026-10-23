"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, DragEvent } from "react";

type PlaylistVideo = {
  id: string;
  name: string;
  size: number;
  url: string;
};

const formatSize = (bytes: number) => {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export function VideoWorkspace() {
  const [playlistName, setPlaylistName] = useState("My technical playlist");
  const [videos, setVideos] = useState<PlaylistVideo[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const urls = useRef<string[]>([]);

  useEffect(() => () => urls.current.forEach((url) => URL.revokeObjectURL(url)), []);

  const addFiles = (files: FileList | File[]) => {
    const incoming = Array.from(files);
    const valid = incoming.filter((file) => file.type.startsWith("video/"));
    if (!valid.length) {
      setError("Choose one or more video files from your computer.");
      return;
    }

    const added = valid.map((file) => {
      const url = URL.createObjectURL(file);
      urls.current.push(url);
      return { id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`, name: file.name, size: file.size, url };
    });
    setVideos((current) => [...current, ...added]);
    setActiveId((current) => current ?? added[0].id);
    setError(incoming.length !== valid.length ? "Some non-video files were skipped." : "");
  };

  const handleFiles = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) addFiles(event.target.files);
    event.target.value = "";
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    addFiles(event.dataTransfer.files);
  };

  const removeVideo = (id: string) => {
    setVideos((current) => {
      const removed = current.find((video) => video.id === id);
      if (removed) URL.revokeObjectURL(removed.url);
      const remaining = current.filter((video) => video.id !== id);
      if (activeId === id) setActiveId(remaining[0]?.id ?? null);
      return remaining;
    });
  };

  const activeVideo = videos.find((video) => video.id === activeId) ?? null;

  return <main className="inner-page video-page"><div className="shell"><div className="section-intro"><span className="eyebrow">Local video workspace</span><h1>Create a video playlist.</h1><p>Choose videos from your computer, arrange a temporary viewing queue, and play them directly in your browser. Files remain on this device and are not sent to a server.</p></div><div className="video-layout"><section className="video-player-panel" aria-label="Video player">{activeVideo ? <video key={activeVideo.id} className="video-player" controls playsInline src={activeVideo.url}>Your browser does not support HTML video.</video> : <div className="video-empty"><span>▶</span><strong>No video selected</strong><p>Add videos to start your playlist.</p></div>}<div className="now-playing"><span className="eyebrow">Now playing</span><strong>{activeVideo?.name ?? "Waiting for a video"}</strong></div></section><aside className="playlist-panel"><label className="playlist-name">Playlist name<input value={playlistName} onChange={(event) => setPlaylistName(event.target.value)} maxLength={80} /></label><label className="upload-zone" onDragOver={(event) => event.preventDefault()} onDrop={handleDrop}><input className="sr-only" type="file" accept="video/*" multiple onChange={handleFiles} /><span className="upload-icon">＋</span><strong>Upload videos from your PC</strong><small>Choose multiple files or drag and drop them here</small></label>{error && <p className="upload-error" role="alert">{error}</p>}<div className="playlist-heading"><div><span className="eyebrow">Playlist</span><h2>{playlistName || "Untitled playlist"}</h2></div><span>{videos.length} {videos.length === 1 ? "video" : "videos"}</span></div><div className="video-queue">{videos.length ? videos.map((video, index) => <article className={video.id === activeId ? "video-item active" : "video-item"} key={video.id}><button className="video-select" onClick={() => setActiveId(video.id)} aria-label={`Play ${video.name}`}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{video.name}</strong><small>{formatSize(video.size)}</small></div></button><button className="video-remove" onClick={() => removeVideo(video.id)} aria-label={`Remove ${video.name}`}>×</button></article>) : <p className="queue-empty">Your uploaded videos will appear here.</p>}</div></aside></div></div></main>;
}
