import { useState } from "react";
import {
  panelClass,
  subscriberFields,
  type SubscriberField,
} from "./hssData";

export function HssSubscriberData() {
  const [selected, setSelected] = useState<SubscriberField>(
    subscriberFields[0],
  );

  return (
    <section className={panelClass}>
      <div className="mb-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-violet-400">
          Subscriber database
        </p>

        <h2 className="text-2xl font-bold text-white">
          Mi van a HSS-ben?
        </h2>

        <p className="mt-2 max-w-3xl text-slate-400">
          Kattints valamelyik adatra. A HSS nem egyszerűen egy
          „névjegyzék”: ebből tudja az LTE core, hogy ki vagy,
          jogosult vagy-e, és mit használhatsz.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_1.15fr]">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {subscriberFields.map((field) => {
            const active = selected.id === field.id;

            return (
              <button
                key={field.id}
                onClick={() => setSelected(field)}
                className={[
                  "rounded-2xl border p-4 text-left transition",
                  active
                    ? "border-violet-500/70 bg-violet-500/10"
                    : "border-slate-800 bg-slate-950/60 hover:border-slate-700",
                ].join(" ")}
              >
                <div className="flex items-center justify-between gap-4">
                  <span
                    className={
                      active
                        ? "font-semibold text-violet-300"
                        : "font-semibold text-slate-200"
                    }
                  >
                    {field.label}
                  </span>

                  <span className="text-xs text-slate-500">→</span>
                </div>

                <div className="mt-1 text-sm text-slate-500">
                  {field.shortLabel}
                </div>
              </button>
            );
          })}
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-slate-950 p-6">
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" />

          <div className="relative">
            <div className="mb-5 inline-flex rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-300">
              {selected.label}
            </div>

            <h3 className="text-xl font-bold text-white">
              {selected.question}
            </h3>

            <p className="mt-4 leading-7 text-slate-300">
              {selected.description}
            </p>

            <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-4">
              <div className="mb-1 text-xs uppercase tracking-wider text-slate-500">
                Példa
              </div>

              <code className="text-sm text-cyan-300">
                {selected.example}
              </code>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}