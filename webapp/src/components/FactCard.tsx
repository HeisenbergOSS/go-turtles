import { useState } from "react";
import { useFragment } from "../gql/fragment-masking";
import { FactDetailsFragmentDoc } from "../gql/graphql";
import { ChevronRight } from "lucide-react";

interface FactCardProps {
  fact: unknown;
}

export function FactCard({ fact: factData }: FactCardProps) {
  const fact = useFragment(FactDetailsFragmentDoc, factData);
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = fact.children && fact.children.length > 0;

  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700">
      <h3 className="text-xl font-semibold mb-2 text-cyan-400">{fact.title}</h3>
      <p className="text-slate-300 mb-4">{fact.content}</p>

      {fact.sourceURL && (
        <a
          href={fact.sourceURL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-slate-400 hover:text-cyan-400 transition-colors duration-200"
        >
          Source
        </a>
      )}

      {hasChildren && (
        // 2. Update the button to include the icon
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mt-4 bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200 flex items-center"
        >
          <ChevronRight
            className={`mr-2 h-5 w-5 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
          />
          {isOpen ? "Hide Evidence" : `Show Evidence (${fact.children.length})`}
        </button>
      )}

      {/* 3. Add transition classes to the children's container */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? "max-h-[1000px] opacity-100 mt-6" : "max-h-0 opacity-0"}`}
      >
        <div className="pl-6 border-l-2 border-slate-700 space-y-4">
          {fact.children.map((childFact) => (
            <FactCard key={childFact.id} fact={childFact} />
          ))}
        </div>
      </div>
    </div>
  );
}
