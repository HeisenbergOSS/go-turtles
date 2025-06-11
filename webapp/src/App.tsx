import { useLazyQuery, useQuery } from "@apollo/client";
import { FactCard } from "./components/FactCard";
// Import the generated query document
import { GetTopLevelFactsDocument, SearchFactsDocument } from "./gql/graphql";
import { useState } from "react";
import { Search, X } from "lucide-react";

function App() {
  // --- STATE MANAGEMENT ---
  // State for the search input field
  const [searchTerm, setSearchTerm] = useState<string>("");
  // State to determine if we are showing search results or the default list
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // --- DATA FETCHING HOOKS ---
  // Query for the default view of top-level facts
  const {
    loading: topLevelLoading,
    error: topLevelError,
    data: topLevelData,
  } = useQuery(GetTopLevelFactsDocument);

  // Lazy query for searching, which we can trigger manually
  const [
    executeSearch,
    { loading: searchLoading, error: searchError, data: searchData },
  ] = useLazyQuery(SearchFactsDocument);

  // --- EVENT HANDLERS ---

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchTerm.trim() !== "") {
      executeSearch({ variables: { term: searchTerm } });
      setIsSearching(true);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setIsSearching(false);
  };

  // --- RENDER LOGIC ---
  const renderContent = () => {
    if (isSearching) {
      if (searchLoading)
        return (
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500 mx-auto"></div>
        );
      if (searchError)
        return (
          <p className="text-red-500 text-center">
            Error searching: {searchError.message}
          </p>
        );
      if (searchData?.search.length === 0)
        return (
          <p className="text-slate-400 text-center">
            No results found for "{searchTerm}".
          </p>
        );

      return (
        <div className="space-y-6">
          {searchData?.search.map((fact) => (
            <FactCard key={fact.id} fact={fact} />
          ))}
        </div>
      );
    } else {
      if (topLevelLoading)
        return (
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500 mx-auto"></div>
        );
      if (topLevelError)
        return (
          <p className="text-red-500 text-center">
            Error loading data: {topLevelError.message}
          </p>
        );

      return (
        <div className="space-y-6">
          {topLevelData?.topLevelFacts.map((fact) => (
            <FactCard key={fact.id} fact={fact} />
          ))}
        </div>
      );
    }
  };

  return (
    <div className="bg-slate-900 text-white min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
          Turtles All The Way Down
        </h1>

        {/* Search Form */}
        <form onSubmit={handleSearchSubmit} className="mb-12 flex gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for facts..."
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          />
          {isSearching && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="bg-slate-700 hover:bg-slate-600 p-2 rounded-lg"
              aria-label="Clear search"
            >
              <X className="h-6 w-6" />
            </button>
          )}
          <button
            type="submit"
            className="bg-cyan-600 hover:bg-cyan-500 font-bold p-2 rounded-lg flex items-center"
            aria-label="Search"
          >
            <Search className="h-6 w-6" />
          </button>
        </form>

        {/* Content Area */}
        {renderContent()}
      </div>
    </div>
  );
}

export default App;
