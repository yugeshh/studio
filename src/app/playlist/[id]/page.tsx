
"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart, ListMusic, Play, Share2, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


// This is a placeholder page. In a real app, you'd fetch playlist details by ID.
export default function PlaylistDetailPage() {
  const params = useParams();
  const playlistId = params.id;

  // Placeholder data - replace with actual data fetching based on playlistId
  const playlist = {
    title: "Epic Driving Mix",
    description: "High-energy tracks for the open road.",
    imageUrl: "https://placehold.co/300x300.png", // Removed ?text=...
    creator: { name: "DJ Roadmaster", avatarUrl: "https://placehold.co/40x40.png" }, // Removed ?text=...
    tracks: [
      { id: "t1", title: "Highway Star", artist: "Deep Purple", album: "Machine Head", duration: "6:05" },
      { id: "t2", title: "Born to Run", artist: "Bruce Springsteen", album: "Born to Run", duration: "4:30" },
      { id: "t3", title: "Radar Love", artist: "Golden Earring", album: "Moontan", duration: "6:24" },
      { id: "t4", title: "Go Your Own Way", artist: "Fleetwood Mac", album: "Rumours", duration: "3:38" },
      { id: "t5", title: "Life is a Highway", artist: "Tom Cochrane", album: "Mad Mad World", duration: "4:26" },
    ]
  };

  if (!playlistId) {
    return <div>Loading playlist...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <Image
          src={playlist.imageUrl}
          alt={playlist.title}
          width={280}
          height={280}
          className="rounded-lg shadow-xl aspect-square object-cover"
          data-ai-hint="playlist cover" // Updated hint
        />
        <div className="flex-1 space-y-4">
          <p className="text-sm font-medium text-primary">PLAYLIST</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">{playlist.title}</h1>
          <p className="text-muted-foreground text-lg">{playlist.description}</p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Avatar className="h-6 w-6">
              <AvatarImage src={playlist.creator.avatarUrl} data-ai-hint="user avatar" />
              <AvatarFallback>{playlist.creator.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>Created by <span className="font-semibold text-foreground">{playlist.creator.name}</span></span>
            <span>• {playlist.tracks.length} songs</span>
          </div>
          <div className="flex gap-3 items-center mt-6">
            <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full px-8 py-3">
              <Play className="mr-2 h-5 w-5 fill-current" /> Play
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive rounded-full">
              <Heart className="h-6 w-6" />
            </Button>
             <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary rounded-full">
              <Share2 className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] text-center">#</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="hidden md:table-cell">Album</TableHead>
              <TableHead className="text-right"><Clock className="inline-block h-4 w-4" /></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {playlist.tracks.map((track, index) => (
              <TableRow key={track.id} className="group hover:bg-muted/50">
                <TableCell className="text-center text-muted-foreground">{index + 1}</TableCell>
                <TableCell>
                  <div className="font-medium">{track.title}</div>
                  <div className="text-sm text-muted-foreground">{track.artist}</div>
                </TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground">{track.album}</TableCell>
                <TableCell className="text-right text-muted-foreground">{track.duration}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
