import { Library } from "lucide-react";

export default function LibraryPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <Library className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Your Library</h1>
      </div>
      <p className="text-muted-foreground">
        Playlists you&apos;ve created or saved will appear here. This feature is coming soon!
      </p>
    </div>
  );
}
