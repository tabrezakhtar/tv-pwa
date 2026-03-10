import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Loader2, Calendar, Star, Clock, Tv, Users, Globe } from "lucide-react";
import { useShowDetails } from "@/hooks/useShowDetails";

export function ShowDetails({ showId, open, onOpenChange }) {
  const { show, isLoading, error, clearError, refetch } = useShowDetails(showId);

  const stripHtml = (html) => {
    if (!html) return "No description available";
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const handleOpenChange = (isOpen) => {
    if (!isOpen) {
      // clear error and reset data so that reopening will fetch again
      clearError();
    } else {
      // when opening the dialog, make sure we pull fresh data
      refetch();
    }
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-3xl">
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="size-8 animate-spin text-primary" />
          </div>
        )}

        {error && open && (
          <div className="text-center py-10">
            <p className="text-destructive">Error loading show details</p>
          </div>
        )}

        {show && !isLoading && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">{show.name}</DialogTitle>
              {show.genres && show.genres.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {show.genres.map((genre) => (
                    <span
                      key={genre}
                      className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              )}
            </DialogHeader>

            <div className="grid md:grid-cols-[200px,1fr] gap-6">
              {/* Poster */}
              <div className="aspect-[2/3] overflow-hidden rounded-lg bg-muted">
                {show.image?.original ? (
                  <img
                    src={show.image.original}
                    alt={show.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No Image
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="space-y-4">
                {/* Meta Info */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {show.premiered && (
                    <div className="flex items-center gap-2">
                      <Calendar className="size-4 text-muted-foreground" />
                      <span>{new Date(show.premiered).getFullYear()}</span>
                    </div>
                  )}
                  {show.rating?.average && (
                    <div className="flex items-center gap-2">
                      <Star className="size-4 fill-yellow-400 text-yellow-400" />
                      <span>{show.rating.average}/10</span>
                    </div>
                  )}
                  {show.runtime && (
                    <div className="flex items-center gap-2">
                      <Clock className="size-4 text-muted-foreground" />
                      <span>{show.runtime} min</span>
                    </div>
                  )}
                  {show.network?.name && (
                    <div className="flex items-center gap-2">
                      <Tv className="size-4 text-muted-foreground" />
                      <span>{show.network.name}</span>
                    </div>
                  )}
                  {show.status && (
                    <div className="flex items-center gap-2">
                      <Globe className="size-4 text-muted-foreground" />
                      <span>{show.status}</span>
                    </div>
                  )}
                  {show.language && (
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Language:</span>
                      <span>{show.language}</span>
                    </div>
                  )}
                </div>

                {/* Summary */}
                <div>
                  <h4 className="font-semibold mb-2">Summary</h4>
                  <DialogDescription className="text-sm leading-relaxed">
                    {stripHtml(show.summary)}
                  </DialogDescription>
                </div>

                {/* Seasons */}
                {show._embedded?.seasons && show._embedded.seasons.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Seasons</h4>
                    <div className="flex flex-wrap gap-2">
                      {show._embedded.seasons.map((season) => (
                        <div
                          key={season.id}
                          className="px-3 py-1 text-xs rounded-md bg-secondary text-secondary-foreground"
                        >
                          Season {season.number} ({season.episodeOrder || 0} episodes)
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Cast */}
                {show._embedded?.cast && show._embedded.cast.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Users className="size-4" />
                      Cast
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {show._embedded.cast.slice(0, 6).map((member) => (
                        <div key={member.person.id} className="truncate">
                          <span className="font-medium">{member.person.name}</span>
                          {member.character?.name && (
                            <span className="text-muted-foreground"> as {member.character.name}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* External Links */}
                {show.officialSite && (
                  <div>
                    <a
                      href={show.officialSite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      Official Website →
                    </a>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
