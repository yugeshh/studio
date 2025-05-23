import { Heart } from "lucide-react";

export default function LikedSongsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <Heart className="h-8 w-8 text-destructive fill-destructive" />
        <h1 className="text-3xl font-bold">Liked Songs</h1>
      </div>
      <p className="text-muted-foreground">
        All your liked songs and playlists will appear here. This feature is coming soon!
      </p>
    </div>
  );
}
