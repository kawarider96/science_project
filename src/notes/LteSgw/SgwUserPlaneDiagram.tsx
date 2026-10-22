import { useState } from "react";
import { panelClass } from "./sgwData";

type NodeProps = {
  label: string;
  subtitle?: string;
  active?: boolean;
  highlighted?: boolean;
};

function Node({
  label,
  subtitle,
  active = true,
  highlighted = false,
}: NodeProps) {
  return (
    <div
      className={[
        "relative z-10 flex min-h-24 min-w-28 flex-col items-center justify-center rounded-2xl border px-4 text-center transition-all duration-300",
        highlighted
          ? "border-emerald-400 bg-emerald-500/15 shadow-lg shadow-emerald-500/10"
          : active
            ? "border-slate-700 bg-slate-900"
            : "border-slate-800 bg-slate-950 opacity-40",
      ].join(" ")}
    >
      <div
        className={[
          "font-bold",
          highlighted ? "text-emerald-300" : "text-slate-200",
        ].join(" ")}
      >
        {label}
      </div>

      {subtitle && (
        <div className="mt-1 text-xs text-slate-500">
          {subtitle}
        </div>
      )}
    </div>
  );
}

function Arrow({ active }: { active: boolean }) {
  return (
    <div className="flex min-w-12 flex-1 items-center">
      <div
        className={[
          "h-0.5 flex-1 transition-all duration-500",
          active
            ? "bg-gradient-to-r from-cyan-400 to-emerald-400"
            : "bg-slate-800",
        ].join(" ")}
      />

      <div
        className={[
          "h-0 w-0 border-y-[5px] border-y-transparent border-l-[8px]",
          active ? "border-l-emerald-400" : "border-l-slate-700",
        ].join(" ")}
      />
    </div>
  );
}

export function SgwUserPlaneDiagram() {
  const [flowing, setFlowing] = useState(true);

  return (
    <section className={panelClass}>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
            User Plane
          </p>

          <h2 className="text-2xl font-bold text-white">
            Hol van az S-GW az adatútban?
          </h2>

          <p className="mt-2 max-w-3xl text-slate-400">
            Az S-GW nem csak vezérlési információkat kezel.
            A tényleges felhasználói IP-csomagok is keresztülhaladnak rajta.
          </p>
        </div>

        <button
          onClick={() => setFlowing((value) => !value)}
          className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300 transition hover:bg-emerald-500/20"
        >
          {flowing ? "⏸ Adatfolyam leállítása" : "▶ Adatfolyam indítása"}
        </button>
      </div>

      <div className="overflow-x-auto pb-4">
        <div className="mx-auto flex min-w-[760px] items-center">
          <Node label="UE" subtitle="telefon" />

          <Arrow active={flowing} />

          <Node label="eNodeB" subtitle="rádiós hozzáférés" />

          <Arrow active={flowing} />

          <Node
            label="S-GW"
            subtitle="Serving Gateway"
            highlighted
          />

          <Arrow active={flowing} />

          <Node label="P-GW" subtitle="PDN Gateway" />

          <Arrow active={flowing} />

          <Node label="Internet" />
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
        <div className="font-semibold text-emerald-300">
          A fontos felismerés
        </div>

        <p className="mt-2 leading-7 text-slate-400">
          Az S-GW egy valódi{" "}
          <strong className="text-white">user-plane node</strong>.
          Ha például videót töltesz le, az IP-csomagok tipikusan ezen az
          útvonalon mennek keresztül.
        </p>

        <pre className="mt-4 overflow-x-auto rounded-xl bg-slate-950 p-4 text-center font-mono text-sm text-emerald-300">
{`UE → eNodeB → S-GW → P-GW → Internet`}
        </pre>
      </div>
    </section>
  );
}