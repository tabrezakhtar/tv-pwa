import { ShowCard } from "./ShowCard";
import { Loader2 } from "lucide-react";

export function ShowList({ shows, isLoading, error }) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-destructive text-lg">Error loading shows: {error.message}</p>
        <p className="text-muted-foreground mt-2">
          {navigator.onLine ? "Please try again later." : "You're offline. Showing cached results if available."}
        </p>
      </div>
    );
  }

  if (!shows || shows.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground text-lg">
          No shows found. Try a different search term.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {shows.map((item) => (
        <ShowCard key={item.show.id} show={item.show} />
      ))}
    </div>
  );
}
