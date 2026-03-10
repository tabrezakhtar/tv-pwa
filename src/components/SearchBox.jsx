import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

export function SearchBox({ value, onChange, placeholder = "Search TV shows..." }) {
  return (
    <div className="relative w-full max-w-2xl">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-10 h-12 text-base"
      />
      {value && (
        <button
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground hover:text-foreground"
          onClick={() => onChange("")}
        >
          <X />
        </button>
      )}
    </div>
  );
}
