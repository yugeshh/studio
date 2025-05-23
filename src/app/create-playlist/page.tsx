import { PlusSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function CreatePlaylistPage() {
  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="flex items-center gap-3">
        <PlusSquare className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Create New Playlist</h1>
      </div>
      
      <form className="space-y-6">
        <div>
          <Label htmlFor="playlist-title">Playlist Title</Label>
          <Input id="playlist-title" placeholder="My Awesome Mix" className="mt-1" />
        </div>
        <div>
          <Label htmlFor="playlist-description">Description</Label>
          <Textarea id="playlist-description" placeholder="A short description of your playlist..." className="mt-1" />
        </div>
        <div>
          <Label htmlFor="playlist-image">Cover Image URL (Optional)</Label>
          <Input id="playlist-image" type="url" placeholder="https://example.com/image.png" className="mt-1" />
        </div>
        <Button type="submit" className="w-full sm:w-auto">Create Playlist</Button>
      </form>

      <p className="text-sm text-muted-foreground text-center">
        Note: Actual playlist creation functionality is not yet implemented. This is a UI placeholder.
      </p>
    </div>
  );
}
