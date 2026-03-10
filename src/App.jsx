import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { SearchBox } from './components/SearchBox';
import { ShowList } from './components/ShowList';
import { ShowDetails } from './components/ShowDetails';
import { useShowSearch } from './hooks/useShowSearch';
import { Tv } from 'lucide-react';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [selectedShowId, setSelectedShowId] = useState(null);
  
  const { shows, isLoading, error } = useShowSearch(debouncedSearchTerm);

  const handleShowClick = (showId) => {
    setSelectedShowId(showId);
  };

  const handleCloseModal = () => {
    setSelectedShowId(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <Tv className="size-8 text-primary" />
            <h1 className="text-3xl font-bold">TV Show Search</h1>
          </div>
          <SearchBox
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search for TV shows..."
          />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {!debouncedSearchTerm ? (
          <div className="text-center py-20">
            <Tv className="size-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-semibold mb-2">Start searching for TV shows</h2>
            <p className="text-muted-foreground">
              Enter a show name in the search box above to get started
            </p>
          </div>
        ) : (
          <ShowList shows={shows} isLoading={isLoading} error={error} onShowClick={handleShowClick} />
        )}
      </main>

      <ShowDetails 
        showId={selectedShowId} 
        open={!!selectedShowId} 
        onOpenChange={(open) => !open && handleCloseModal()} 
      />
    </div>
  );
}