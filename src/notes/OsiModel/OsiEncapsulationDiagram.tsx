import { useState } from "react";
import { panelClass } from "./osiData";

const steps = [
  {
    layer: "Application",
    result: "DATA",
    explanation:
      "Az alkalmazás létrehozza az elküldendő adatot.",
  },
  {
    layer: "Transport",
    result: "[TCP][DATA]",
    explanation:
      "A TCP fejlécet ad hozzá: például portszámokat.",
  },
  {
    layer: "Network",
    result: "[IP][TCP][DATA]",
    explanation:
      "Az IP réteg hozzáadja a forrás és cél IP címet.",
  },
  {
    layer: "Data Link",
    result: "[ETH][IP][TCP][DATA][FCS]",
    explanation:
      "Az Ethernet frame MAC címeket és frame információkat ad hozzá.",
  },
  {
    layer: "Physical",
    result: "010011010101...",
    explanation:
      "A teljes frame végül fizikai jelek sorozatává válik.",
  },
];

export function OsiEncapsulationDiagram() {
  const [step, setStep] = useState(0);

  const current = steps[step];

  return (
    <section className={panelClass}>
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-violet-400">
        Encapsulation
      </p>

      <h2 className="text-2xl font-bold text-white">
        Hogyan csomagolódik be az adat?
      </h2>

      <p className="mt-2 max-w-3xl text-slate-400">
        Ahogy az adat lefelé halad a stackben, minden réteg hozzáad
        valamilyen saját információt.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.65fr_1.35fr]">
        <div className="space-y-2">
          {steps.map((item, index) => (
            <button
              key={item.layer}
              onClick={() => setStep(index)}
              className={[
                "w-full rounded-xl border px-4 py-3 text-left transition",
                step === index
                  ? "border-violet-400 bg-violet-500/10 text-violet-200"
                  : "border-slate-800 bg-slate-950 text-slate-500 hover:border-slate-700",
              ].join(" ")}
            >
              {index + 1}. {item.layer}
            </button>
          ))}
        </div>

        <div className="flex min-h-72 flex-col justify-center rounded-3xl border border-slate-800 bg-slate-950 p-6">
          <div className="text-xs uppercase tracking-wider text-slate-500">
            {current.layer}
          </div>

          <div className="mt-6 overflow-x-auto rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6 text-center">
            <code className="whitespace-nowrap text-lg font-bold text-cyan-300 sm:text-2xl">
              {current.result}
            </code>
          </div>

          <p className="mt-6 leading-7 text-slate-300">
            {current.explanation}
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
        <div className="font-semibold text-emerald-300">
          A lényeg
        </div>

        <pre className="mt-4 overflow-x-auto font-mono text-sm text-slate-300">
{`Application data
       ↓
TCP segment
       ↓
IP packet
       ↓
Ethernet frame
       ↓
Bits / physical signal`}
        </pre>
      </div>
    </section>
  );
}