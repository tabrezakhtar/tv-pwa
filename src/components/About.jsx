import { Tv, Code2, Database, Wifi, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function About() {
  const technologies = [
    {
      name: "React",
      description: "UI library for building interactive interfaces",
      icon: Code2,
    },
    {
      name: "Vite",
      description: "Fast build tool and development server",
      icon: Zap,
    },
    {
      name: "Tailwind CSS + shadcn/ui",
      description: "Utility-first CSS with beautiful components",
      icon: Code2,
    },
    {
      name: "SWR",
      description: "React hooks for data fetching with caching",
      icon: Wifi,
    },
    {
      name: "IndexedDB (via idb)",
      description: "Client-side database for offline storage",
      icon: Database,
    },
    {
      name: "vite-plugin-pwa",
      description: "Progressive Web App support with service workers",
      icon: Wifi,
    },
    {
      name: "TVMaze API",
      description: "TV show data and search functionality",
      icon: Tv,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About TV Show Search</h1>
          <p className="text-xl text-muted-foreground">
            A Progressive Web App for searching and exploring TV shows
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wifi className="size-5" />
              Progressive Web App (PWA)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              This application is built as a Progressive Web App, which means it works
              offline and can be installed on your device like a native app. All search
              results are cached locally using IndexedDB, so you can browse shows even
              without an internet connection.
            </p>
            <div className="bg-secondary/50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Features:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Offline-first architecture with intelligent caching</li>
                <li>Fast search with debounced input</li>
                <li>Detailed show information including cast and seasons</li>
                <li>Responsive design that works on all devices</li>
                <li>Service worker for background updates</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Technology Stack</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {technologies.map((tech) => {
              const Icon = tech.icon;
              return (
                <Card key={tech.name}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Icon className="size-5 text-primary" />
                      {tech.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{tech.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <Card>
          <CardContent className="pt-6 space-y-3">
            <p className="text-center text-sm text-muted-foreground">
              Data provided by{" "}
              <a
                href="https://www.tvmaze.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                TVMaze API
              </a>
            </p>
            <p className="text-center text-sm text-muted-foreground">
              View source code on{" "}
              <a
                href="https://github.com/tabrezakhtar/tv-pwa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                GitHub
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
