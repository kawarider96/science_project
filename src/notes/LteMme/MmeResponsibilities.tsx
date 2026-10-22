import { useState } from "react";
import { buttonClass, responsibilities } from "./mmeData";

/**
 * Az MME feladatainak interaktív magyarázata.
 * A kiválasztott feladathoz egy konkrét kérdés és válasz jelenik meg.
 */
export default function MmeResponsibilities() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = responsibilities[selectedIndex];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {responsibilities.map((item, index) => (
          <button
            key={item.title}
            type="button"
            aria-pressed={selectedIndex === index}
            onClick={() => setSelectedIndex(index)}
            className={`${buttonClass} ${
              selectedIndex === index
                ? "border-amber-400 text-amber-200"
                : ""
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div
        aria-live="polite"
        className="rounded-2xl border border-amber-400/20 bg-slate-950 p-5"
      >
        <p className="text-xs uppercase tracking-widest text-amber-300">
          {selected.title}
        </p>

        <h3 className="mt-3 text-xl font-semibold">
          {selected.question}
        </h3>

        <p className="mt-4 leading-8 text-slate-300">
          {selected.description}
        </p>
      </div>
    </div>
  );
}