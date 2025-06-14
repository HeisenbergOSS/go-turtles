import { useState } from "react";
import {
  type FactDetailsFragment,
  useGetFactChildrenLazyQuery,
} from "../graphql/generated";
import { ChevronRight } from "lucide-react";

interface FactCardProps {
  fact: FactDetailsFragment;
}

export function FactCard({ fact }: FactCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = fact.children && fact.children.length > 0;

  // 1. Use a lazy query to fetch children on demand.
  const [fetchChildren, { loading, error, data }] = useGetFactChildrenLazyQuery(
    {
      variables: { id: fact.id },
    },
  );

  const handleToggle = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    // If we are opening the card for the first time, fetch its children.
    if (newIsOpen && !data) {
      fetchChildren();
    }
  };

  const childrenData = data?.fact?.children;

  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700">
      <h3 className="text-xl font-semibold mb-2 text-cyan-400">{fact.title}</h3>
      <p className="text-slate-300 mb-4">{fact.content}</p>

      {fact.sourceURL && (
        <a
          href={fact.sourceURL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-slate-400 hover:text-cyan-400"
        >
          Source
        </a>
      )}

      {hasChildren && (
        <button
          onClick={handleToggle}
          className="mt-4 bg-slate-700 hover:bg-slate-600 font-bold py-2 px-4 rounded flex items-center"
        >
          <ChevronRight
            className={`mr-2 h-5 w-5 transition-transform ${isOpen ? "rotate-90" : ""}`}
          />
          {isOpen ? "Hide Evidence" : `Show Evidence (${fact.children.length})`}
        </button>
      )}

      {isOpen && (
        <div className="mt-6 pl-6 border-l-2 border-slate-700 space-y-4">
          {loading && <p>Loading evidence...</p>}
          {error && <p className="text-red-500">Could not load evidence.</p>}
          {childrenData?.map((childFact) => (
            <FactCard key={childFact.id} fact={childFact} />
          ))}
        </div>
      )}
    </div>
  );
}
