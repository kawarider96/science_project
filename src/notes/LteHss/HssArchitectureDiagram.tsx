import { useState } from "react";
import { panelClass } from "./hssData";

type Mode = "control" | "user";

const Node = ({
  label,
  active = false,
  color = "cyan",
}: {
  label: string;
  active?: boolean;
  color?: "cyan" | "violet" | "emerald";
}) => {
  const activeClass = {
    cyan: "border-cyan-400 bg-cyan-500/10 text-cyan-200",
    violet: "border-violet-400 bg-violet-500/10 text-violet-200",
    emerald: "border-emerald-400 bg-emerald-500/10 text-emerald-200",
  }[color];

  return (
    <div
      className={[
        "relative z-10 flex h-20 min-w-24 items-center justify-center rounded-2xl border px-4 text-center text-sm font-bold transition-all duration-300",
        active
          ? activeClass
          : "border-slate-700 bg-slate-900 text-slate-400",
      ].join(" ")}
    >
      {label}
    </div>
  );
};

const Arrow = ({
  active,
  label,
}: {
  active: boolean;
  label?: string;
}) => (
  <div className="flex min-w-14 flex-1 flex-col items-center">
    {label && (
      <span
        className={[
          "mb-2 text-[10px] font-semibold uppercase tracking-wider transition",
          active ? "text-cyan-300" : "text-slate-600",
        ].join(" ")}
      >
        {label}
      </span>
    )}

    <div className="flex w-full items-center">
      <div
        className={[
          "h-0.5 flex-1 transition-all duration-500",
          active
            ? "bg-gradient-to-r from-cyan-500 to-violet-500"
            : "bg-slate-800",
        ].join(" ")}
      />

      <div
        className={[
          "h-0 w-0 border-y-[5px] border-y-transparent border-l-[8px]",
          active ? "border-l-violet-400" : "border-l-slate-700",
        ].join(" ")}
      />
    </div>
  </div>
);

export function HssArchitectureDiagram() {
  const [mode, setMode] = useState<Mode>("control");

  const control = mode === "control";

  return (
    <section className={panelClass}>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Architecture
          </p>

          <h2 className="text-2xl font-bold text-white">
            Hol van a HSS az LTE hálózatban?
          </h2>
        </div>

        <div className="flex rounded-xl border border-slate-800 bg-slate-950 p-1">
          <button
            onClick={() => setMode("control")}
            className={[
              "rounded-lg px-4 py-2 text-sm font-medium transition",
              control
                ? "bg-cyan-500/15 text-cyan-300"
                : "text-slate-500 hover:text-slate-300",
            ].join(" ")}
          >
            Control Plane
          </button>

          <button
            onClick={() => setMode("user")}
            className={[
              "rounded-lg px-4 py-2 text-sm font-medium transition",
              !control
                ? "bg-emerald-500/15 text-emerald-300"
                : "text-slate-500 hover:text-slate-300",
            ].join(" ")}
          >
            User Plane
          </button>
        </div>
      </div>

      {control ? (
        <div>
          <div className="overflow-x-auto pb-3">
            <div className="mx-auto flex min-w-[650px] items-center">
              <Node label="UE" active />
              <Arrow active label="radio" />

              <Node label="eNodeB" active />
              <Arrow active label="S1-MME" />

              <Node label="MME" active color="cyan" />
              <Arrow active label="S6a / Diameter" />

              <Node label="HSS" active color="violet" />
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">
            <div className="font-semibold text-cyan-300">
              Control Plane
            </div>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Az MME az <strong className="text-slate-200">S6a</strong>{" "}
              interfészen kommunikál a HSS-sel. Az ezen használt
              protokoll a{" "}
              <strong className="text-slate-200">Diameter</strong>.
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-slate-950/70 p-4">
                <div className="text-xs uppercase text-slate-500">
                  Interfész
                </div>
                <div className="mt-1 font-mono text-cyan-300">S6a</div>
              </div>

              <div className="rounded-xl bg-slate-950/70 p-4">
                <div className="text-xs uppercase text-slate-500">
                  Protokoll
                </div>
                <div className="mt-1 font-mono text-violet-300">
                  Diameter
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="overflow-x-auto pb-3">
            <div className="mx-auto flex min-w-[650px] items-center">
              <Node label="UE" active color="emerald" />
              <Arrow active />

              <Node label="eNodeB" active color="emerald" />
              <Arrow active />

              <Node label="S-GW" active color="emerald" />
              <Arrow active />

              <Node label="P-GW" active color="emerald" />
              <Arrow active />

              <Node label="Internet" active color="emerald" />
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
            <div className="font-semibold text-emerald-300">
              User Plane
            </div>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              A valódi felhasználói adatcsomagok{" "}
              <strong className="text-white">nem mennek át a HSS-en</strong>.
            </p>

            <pre className="mt-4 overflow-x-auto rounded-xl bg-slate-950 p-4 text-sm text-emerald-300">
{`UE → eNodeB → S-GW → P-GW → Internet`}
            </pre>

            <p className="mt-4 text-sm text-slate-500">
              A HSS abban segít eldönteni, hogy a kapcsolat egyáltalán
              létrejöhet-e. Utána nem ő cipeli a HBO adatcsomagjaidat.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}