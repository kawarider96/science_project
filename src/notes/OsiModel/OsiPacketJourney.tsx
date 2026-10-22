import { useState } from "react";
import { panelClass } from "./osiData";

const journey = [
  {
    layer: 7,
    title: "Böngésző",
    text: "A böngésző HTTP/HTTPS kérést akar küldeni a webszervernek.",
    data: "GET /",
  },
  {
    layer: 6,
    title: "Titkosítás / formátum",
    text: "HTTPS esetén a kommunikáció TLS-sel titkosított.",
    data: "Encrypted application data",
  },
  {
    layer: 5,
    title: "Session",
    text: "A két végpont között fennálló kommunikációs viszony kezelését szemlélteti.",
    data: "Session state",
  },
  {
    layer: 4,
    title: "TCP",
    text: "A TCP portszámokat és megbízható szállítást biztosít.",
    data: "src port → 443",
  },
  {
    layer: 3,
    title: "IP",
    text: "Az IP réteg meghatározza a forrás és cél IP címet.",
    data: "192.168.1.20 → 93.184.216.34",
  },
  {
    layer: 2,
    title: "Ethernet / Wi-Fi",
    text: "A helyi linken MAC címekkel továbbítjuk a frame-et a következő hop felé.",
    data: "Laptop MAC → Gateway MAC",
  },
  {
    layer: 1,
    title: "Fizikai jel",
    text: "A bitek elektromos, optikai vagy rádiós jelekké alakulnak.",
    data: "010101101...",
  },
];

export function OsiPacketJourney() {
  const [step, setStep] = useState(0);

  const current = journey[step];

  return (
    <section className={panelClass}>
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
        Real Example
      </p>

      <h2 className="text-2xl font-bold text-white">
        Mi történik, amikor megnyitsz egy weboldalt?
      </h2>

      <p className="mt-2 max-w-3xl text-slate-400">
        Lépj végig rajta. Ugyanaz az adat minden rétegnél más
        problémával egészül ki.
      </p>

      <div className="mt-8">
        <div className="grid grid-cols-7 gap-2">
          {journey.map((item, index) => (
            <button
              key={item.layer}
              onClick={() => setStep(index)}
              className={[
                "rounded-xl border py-3 text-sm font-bold transition",
                index === step
                  ? "border-emerald-400 bg-emerald-500/15 text-emerald-300"
                  : index < step
                    ? "border-slate-700 bg-slate-800 text-slate-300"
                    : "border-slate-800 bg-slate-950 text-slate-600",
              ].join(" ")}
            >
              L{item.layer}
            </button>
          ))}
        </div>

        <div className="mt-6 rounded-3xl border border-emerald-500/20 bg-slate-950 p-6">
          <div className="text-sm font-semibold text-emerald-400">
            Layer {current.layer}
          </div>

          <h3 className="mt-2 text-2xl font-bold text-white">
            {current.title}
          </h3>

          <p className="mt-4 leading-7 text-slate-300">
            {current.text}
          </p>

          <div className="mt-6 rounded-xl bg-slate-900 p-4 font-mono text-cyan-300">
            {current.data}
          </div>
        </div>

        <div className="mt-5 flex gap-3">
          <button
            disabled={step === 0}
            onClick={() => setStep((value) => value - 1)}
            className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-slate-200 disabled:opacity-30"
          >
            ← Vissza
          </button>

          <button
            disabled={step === journey.length - 1}
            onClick={() => setStep((value) => value + 1)}
            className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300 disabled:opacity-30"
          >
            Következő →
          </button>
        </div>
      </div>
    </section>
  );
}