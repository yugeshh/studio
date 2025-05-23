
"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Playlist } from "@/types";
import { Button } from "@/components/ui/button";
import { Heart, Play } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase/config";
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc, setDoc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface PlaylistCardProps {
  playlist: Playlist;
}

export function PlaylistCard({ playlist }: PlaylistCardProps) {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [isLoadingLike, setIsLoadingLike] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const checkIfLiked = async () => {
      if (user && playlist.id) {
        const userDocRef = doc(db, "users", user.uid);
        try {
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            if (userData.likedPlaylists && userData.likedPlaylists.includes(playlist.id)) {
              setIsLiked(true);
            } else {
              setIsLiked(false);
            }
          } else {
            setIsLiked(false);
          }
        } catch (error) {
          console.error("Error checking if playlist is liked:", error);
          setIsLiked(false); // Default to not liked on error
        }
      } else {
        setIsLiked(false);
      }
    };
    checkIfLiked();
  }, [user, playlist.id]);

  const handleLikeToggle = async (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();

    if (!user) {
      toast({ title: "Login Required", description: "Please log in to like playlists.", variant: "destructive" });
      return;
    }
    setIsLoadingLike(true);
    try {
      const userDocRef = doc(db, "users", user.uid);
       if (isLiked) {
        await updateDoc(userDocRef, {
          likedPlaylists: arrayRemove(playlist.id)
        });
        setIsLiked(false);
        toast({ title: "Unliked", description: `Removed "${playlist.title}" from liked songs.` });
      } else {
        await setDoc(userDocRef, { 
          likedPlaylists: arrayUnion(playlist.id) 
        }, { merge: true });
        setIsLiked(true);
        toast({ title: "Liked!", description: `Added "${playlist.title}" to liked songs.` });
      }
    } catch (error) {
      console.error("Error updating like status:", error);
      toast({ title: "Error", description: "Could not update like status.", variant: "destructive" });
    } finally {
      setIsLoadingLike(false);
    }
  };

  const keywords = playlist.dataAiHint?.replace(/ /g, ',') || 'music,album';
  const fallbackImageUrl = `https://source.unsplash.com/600x400/?${keywords}`;

  return (
    <Link href={`/playlist/${playlist.id}`} passHref legacyBehavior>
      <a className="block group">
        <Card className="overflow-hidden transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-xl h-full flex flex-col">
          <CardHeader className="p-0 relative">
            <Image
              src={playlist.imageUrl || fallbackImageUrl}
              alt={playlist.title}
              width={600}
              height={400}
              className="aspect-[3/2] w-full object-cover"
              data-ai-hint={playlist.dataAiHint || "music album"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Button variant="ghost" size="icon" className="bg-primary/80 hover:bg-primary text-primary-foreground rounded-full h-12 w-12">
                    <Play className="h-6 w-6 fill-current" />
                </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4 flex-grow">
            <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">
              {playlist.title}
            </CardTitle>
            <CardDescription className="mt-1 text-sm text-muted-foreground line-clamp-2">
              {playlist.description}
            </CardDescription>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between items-center">
            <span className="text-xs text-muted-foreground">
              {playlist.trackIds ? `${playlist.trackIds.length} tracks` : "Curated Mix"}
            </span>
            {user && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLikeToggle}
              disabled={isLoadingLike}
              aria-label={isLiked ? "Unlike playlist" : "Like playlist"}
              className="text-muted-foreground hover:text-destructive"
            >
              <Heart className={cn("h-5 w-5", isLiked ? "fill-destructive text-destructive" : "")} />
            </Button>
            )}
          </CardFooter>
        </Card>
      </a>
    </Link>
  );
}
