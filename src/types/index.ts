
import type { Timestamp } from "firebase/firestore";

export interface User {
  uid: string;
  email: string | null;
  displayName?: string | null;
  photoURL?: string | null;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  dataAiHint?: string; // Added for AI image hints
  createdBy?: string; // User ID
  createdAt?: Timestamp;
  trackIds?: string[]; // Array of track IDs
}

// Example Track structure, can be expanded
export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number; // in seconds
  url: string; // path to audio file
}
