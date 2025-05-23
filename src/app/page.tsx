
"use client";

import { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { PlaylistCard } from "@/components/playlist/playlist-card";
import type { Playlist } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { SearchIcon, ListMusic } from "lucide-react";
import { db } from "@/lib/firebase/config";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

// Sample playlists - now using Unsplash URLs
const samplePlaylists: Playlist[] = [
  { id: "1", title: "Chill Vibes", description: "Relax and unwind with these soothing tunes.", imageUrl: "https://source.unsplash.com/600x400/?chill,music", dataAiHint: "chill music", trackIds: ["t1", "t2"] },
  { id: "2", title: "Workout Beats", description: "Get pumped up with high-energy tracks for your workout.", imageUrl: "https://source.unsplash.com/600x400/?workout,fitness", dataAiHint: "workout fitness", trackIds: ["t3", "t4"] },
  { id: "3", title: "Focus Flow", description: "Instrumental music to help you concentrate and focus.", imageUrl: "https://source.unsplash.com/600x400/?focus,study", dataAiHint: "focus study", trackIds: ["t5", "t6"] },
  { id: "4", title: "Indie Anthems", description: "Discover the best new indie artists.", imageUrl: "https://source.unsplash.com/600x400/?indie,music", dataAiHint: "indie music", trackIds: ["t7", "t8"] },
  { id: "5", title: "Road Trip", description: "The perfect soundtrack for your next adventure on the road.", imageUrl: "https://source.unsplash.com/600x400/?road,trip", dataAiHint: "road trip", trackIds: ["t9", "t10"] },
  { id: "6", title: "Evening Jazz", description: "Smooth jazz for a sophisticated evening.", imageUrl: "https://source.unsplash.com/600x400/?jazz,music", dataAiHint: "jazz music", trackIds: ["t11", "t12"] },
];


export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const playlistsCollection = collection(db, "playlists");
        const q = query(playlistsCollection, limit(20));
        const querySnapshot = await getDocs(q);
        const fetchedPlaylists: Playlist[] = querySnapshot.docs.map(doc => {
          const data = doc.data();
          const hint = data.dataAiHint || "music playlist";
          return {
            id: doc.id,
            title: data.title || "Untitled Playlist",
            description: data.description || "No description available.",
            imageUrl: data.imageUrl || `https://source.unsplash.com/600x400/?${hint.replace(/ /g, ',')}`, 
            dataAiHint: hint,
            trackIds: data.trackIds || [],
            createdBy: data.createdBy,
            createdAt: data.createdAt,
          } as Playlist;
        });
        
        if (fetchedPlaylists.length === 0) {
            setPlaylists(samplePlaylists);
        } else {
            setPlaylists(fetchedPlaylists);
        }

      } catch (err) {
        console.error("Error fetching playlists:", err);
        setError("Failed to load playlists. Displaying sample data.");
        setPlaylists(samplePlaylists); 
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  const filteredPlaylists = useMemo(() => {
    if (!searchTerm) {
      return playlists;
    }
    return playlists.filter((playlist) =>
      playlist.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      playlist.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [playlists, searchTerm]);

  return (
    <div className="space-y-8">
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search playlists..."
          className="w-full rounded-full bg-muted pl-10 pr-4 py-3 text-base shadow-inner focus:ring-primary"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {error && <p className="text-destructive text-center">{error}</p>}

      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-[160px] w-full rounded-lg" />
              <Skeleton className="h-6 w-3/4 rounded-md" />
              <Skeleton className="h-4 w-1/2 rounded-md" />
            </div>
          ))}
        </div>
      ) : filteredPlaylists.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredPlaylists.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <ListMusic className="h-16 w-16 text-muted-foreground" />
          <h3 className="mt-4 text-xl font-semibold">No Playlists Found</h3>
          <p className="mt-1 text-muted-foreground">
            {searchTerm ? "Try adjusting your search term." : "There are no playlists available right now."}
          </p>
        </div>
      )}
    </div>
  );
}
