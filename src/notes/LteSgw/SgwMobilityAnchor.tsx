import { useState } from "react";
import { panelClass } from "./sgwData";

type ActiveEnb = "eNB1" | "eNB2";

export function SgwMobilityAnchor() {
  const [activeEnb, setActiveEnb] = useState<ActiveEnb>("eNB1");

  return (
    <section className={panelClass}>
      <div className="mb-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
          Mobility Anchor
        </p>

        <h2 className="text-2xl font-bold text-white">
          Mit jelent az, hogy az S-GW „anchor”?
        </h2>

        <p className="mt-2 max-w-3xl leading-7 text-slate-400">
          Az <strong className="text-white">anchor</strong> szó szó szerint
          horgonyt jelent. A rádiós kapcsolat változhat körülötte,
          miközben az S-GW egy stabil pont maradhat a packet sessionben.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="relative min-h-[420px] overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 p-6">
          {/* UE */}
          <div className="absolute left-1/2 top-6 -translate-x-1/2 rounded-2xl border border-cyan-500/50 bg-cyan-500/10 px-6 py-4 text-center">
            <div className="font-bold text-cyan-300">UE</div>
            <div className="text-xs text-slate-500">telefon</div>
          </div>

          {/* eNB1 */}
          <button
            onClick={() => setActiveEnb("eNB1")}
            className={[
              "absolute left-[12%] top-[150px] rounded-2xl border px-6 py-4 text-center transition-all duration-300",
              activeEnb === "eNB1"
                ? "border-cyan-400 bg-cyan-500/15 shadow-lg shadow-cyan-500/10"
                : "border-slate-700 bg-slate-900 opacity-45",
            ].join(" ")}
          >
            <div className="font-bold text-white">eNB1</div>
            <div className="text-xs text-slate-500">cell #1</div>
          </button>

          {/* eNB2 */}
          <button
            onClick={() => setActiveEnb("eNB2")}
            className={[
              "absolute right-[12%] top-[150px] rounded-2xl border px-6 py-4 text-center transition-all duration-300",
              activeEnb === "eNB2"
                ? "border-cyan-400 bg-cyan-500/15 shadow-lg shadow-cyan-500/10"
                : "border-slate-700 bg-slate-900 opacity-45",
            ].join(" ")}
          >
            <div className="font-bold text-white">eNB2</div>
            <div className="text-xs text-slate-500">cell #2</div>
          </button>

          {/* S-GW */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-2xl border border-emerald-400 bg-emerald-500/15 px-8 py-5 text-center shadow-lg shadow-emerald-500/10">
            <div className="text-lg font-black text-emerald-300">
              S-GW
            </div>

            <div className="mt-1 text-xs text-slate-400">
              mobility anchor
            </div>
          </div>

          {/* Lines */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 800 420"
            preserveAspectRatio="none"
          >
            {/* UE -> eNB1 */}
            <line
              x1="400"
              y1="85"
              x2="180"
              y2="185"
              stroke={
                activeEnb === "eNB1" ? "#22d3ee" : "#334155"
              }
              strokeWidth="4"
            />

            {/* UE -> eNB2 */}
            <line
              x1="400"
              y1="85"
              x2="620"
              y2="185"
              stroke={
                activeEnb === "eNB2" ? "#22d3ee" : "#334155"
              }
              strokeWidth="4"
            />

            {/* eNB1 -> SGW */}
            <line
              x1="180"
              y1="215"
              x2="400"
              y2="345"
              stroke={
                activeEnb === "eNB1" ? "#34d399" : "#334155"
              }
              strokeWidth="4"
            />

            {/* eNB2 -> SGW */}
            <line
              x1="620"
              y1="215"
              x2="400"
              y2="345"
              stroke={
                activeEnb === "eNB2" ? "#34d399" : "#334155"
              }
              strokeWidth="4"
            />
          </svg>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
            <div className="text-xs uppercase tracking-wider text-slate-500">
              Jelenlegi adatút
            </div>

            <div className="mt-3 font-mono text-sm text-emerald-300">
              UE → {activeEnb} → S-GW
            </div>
          </div>

          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">
            <div className="font-semibold text-cyan-300">
              Ami változik
            </div>

            <div className="mt-3 font-mono text-sm text-slate-300">
              eNB1 ↔ eNB2
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              A telefon másik rádiós cellába kerül.
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
            <div className="font-semibold text-emerald-300">
              Ami maradhat
            </div>

            <div className="mt-3 font-mono text-lg font-bold text-emerald-300">
              S-GW
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Ezért nevezzük mobilitási anchornak: a hozzáférési pont
              cseréje mellett stabil user-plane pontként szolgálhat.
            </p>
          </div>

          <button
            onClick={() =>
              setActiveEnb((current) =>
                current === "eNB1" ? "eNB2" : "eNB1",
              )
            }
            className="w-full rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 font-medium text-amber-300 transition hover:bg-amber-500/20"
          >
            ⇄ Handover indítása
          </button>
        </div>
      </div>
    </section>
  );
}