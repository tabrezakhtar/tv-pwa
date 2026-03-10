import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Star } from "lucide-react";

export function ShowCard({ show }) {
  const stripHtml = (html) => {
    if (!html) return "No description available";
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="aspect-[2/3] overflow-hidden bg-muted">
        {show.image?.medium ? (
          <img
            src={show.image.medium}
            alt={show.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No Image
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle className="text-xl line-clamp-1">{show.name}</CardTitle>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {show.premiered && (
            <div className="flex items-center gap-1">
              <Calendar className="size-4" />
              <span>{new Date(show.premiered).getFullYear()}</span>
            </div>
          )}
          {show.rating?.average && (
            <div className="flex items-center gap-1">
              <Star className="size-4 fill-yellow-400 text-yellow-400" />
              <span>{show.rating.average}</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-3">
          {stripHtml(show.summary)}
        </CardDescription>
        {show.genres && show.genres.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
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
      </CardContent>
    </Card>
  );
}
