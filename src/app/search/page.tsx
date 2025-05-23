// This page can be enhanced to provide a dedicated search experience
// or redirect to the home page with search query params.
// For now, the primary search is on the Home page.

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

export default function SearchPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Search</h1>
       <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search for songs, artists, playlists..."
          className="w-full rounded-full bg-muted pl-10 pr-4 py-3 text-base shadow-inner focus:ring-primary"
        />
      </div>
      <p className="text-muted-foreground">
        Search results will appear here. For now, please use the search bar on the Home page.
      </p>
    </div>
  );
}
