import { useState } from "react";
import { osiLayers, panelClass } from "./osiData";

export function OsiLayerCards() {
  const [selectedLayer, setSelectedLayer] = useState(3);

  const selected =
    osiLayers.find((layer) => layer.id === selectedLayer) ??
    osiLayers[0];

  return (
    <section className={panelClass}>
      <div className="mb-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
          7 Layers
        </p>

        <h2 className="text-2xl font-bold text-white">
          Az OSI modell 7 rétege
        </h2>

        <p className="mt-2 max-w-3xl text-slate-400">
          Ne a neveket próbáld bemagolni. Kattints a rétegekre, és
          azt figyeld, milyen problémát old meg az adott réteg.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-2">
          {osiLayers.map((layer) => {
            const active = layer.id === selected.id;

            return (
              <button
                key={layer.id}
                onClick={() => setSelectedLayer(layer.id)}
                className={[
                  "flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition",
                  active
                    ? "border-cyan-400 bg-cyan-500/10"
                    : "border-slate-800 bg-slate-950/70 hover:border-slate-700",
                ].join(" ")}
              >
                <div
                  className={[
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-black",
                    active
                      ? "bg-cyan-500/20 text-cyan-300"
                      : "bg-slate-800 text-slate-500",
                  ].join(" ")}
                >
                  L{layer.id}
                </div>

                <div>
                  <div
                    className={
                      active
                        ? "font-bold text-cyan-200"
                        : "font-bold text-slate-200"
                    }
                  >
                    {layer.name}
                  </div>

                  <div className="text-xs text-slate-500">
                    {layer.hungarianName}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="rounded-3xl border border-cyan-500/20 bg-slate-950 p-6">
          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-xl bg-cyan-500/15 px-3 py-2 font-black text-cyan-300">
              Layer {selected.id}
            </div>

            <div>
              <div className="text-xl font-bold text-white">
                {selected.name}
              </div>

              <div className="text-sm text-slate-500">
                {selected.hungarianName}
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
            <div className="text-xs uppercase tracking-wider text-amber-400">
              A réteg kérdése
            </div>

            <div className="mt-2 text-lg font-semibold text-white">
              „{selected.question}”
            </div>
          </div>

          <p className="mt-6 leading-7 text-slate-300">
            {selected.job}
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <div className="mb-2 text-xs uppercase tracking-wider text-slate-500">
                Példák
              </div>

              <div className="space-y-2">
                {selected.examples.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-2 text-xs uppercase tracking-wider text-slate-500">
                Protokollok
              </div>

              <div className="flex flex-wrap gap-2">
                {selected.protocols.map((protocol) => (
                  <span
                    key={protocol}
                    className="rounded-lg border border-violet-500/20 bg-violet-500/10 px-3 py-2 font-mono text-sm text-violet-300"
                  >
                    {protocol}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-slate-900 p-4">
            <span className="text-sm text-slate-500">
              PDU / adat egység:
            </span>

            <span className="ml-2 font-mono font-bold text-emerald-300">
              {selected.unit}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}