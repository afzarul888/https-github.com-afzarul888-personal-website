import { VideoWorkspace } from "../../components/VideoWorkspace";
import { requireAdmin } from "../../lib/requireAdmin";

export default async function AdminVideos() {
  await requireAdmin();
  return <VideoWorkspace />;
}
