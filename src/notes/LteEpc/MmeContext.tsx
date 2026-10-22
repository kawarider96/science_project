import { useState } from "react";
import { buttonClass } from "./epcData";

/**
 * Szemléltető MME-állapotlap.
 * Nem valódi hálózati adat és nem regisztrációs szimuláció.
 */
export default function MmeContext() {
  const [connected, setConnected] = useState(true);

  const rows = [
    ["Előfizetői azonosító", "IMSI-DEMO"],
    ["Kiválasztott S-GW", "S-GW-A"],
    ["EPS bearer", "Példa: EBI 5"],
    ["Kapcsolatállapot", connected ? "ECM-CONNECTED" : "ECM-IDLE"],
    [
      "S1 jelzési kapcsolat",
      connected ? "Van kapcsolat a kiszolgáló eNodeB felé" : "Nincs aktív S1 jelzési kapcsolat",
    ],
    [
      "Elérhetőség",
      connected
        ? "Kiszolgáló eNodeB-hez kapcsolódó állapot"
        : "Tracking Area-lista és tárolt helyinformáció",
    ],
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          aria-pressed={connected}
          onClick={() => setConnected(true)}
          className={`${buttonClass} ${
            connected ? "border-cyan-400 text-cyan-200" : ""
          }`}
        >
          Aktív kapcsolat
        </button>

        <button
          type="button"
          aria-pressed={!connected}
          onClick={() => setConnected(false)}
          className={`${buttonClass} ${
            !connected ? "border-amber-400 text-amber-200" : ""
          }`}
        >
          Idle állapot
        </button>
      </div>

      <div
        aria-live="polite"
        className="overflow-hidden rounded-2xl border border-slate-800"
      >
        <div className="border-b border-slate-800 bg-slate-950 px-5 py-4">
          <h3 className="font-semibold text-violet-300">
            MME · szemléltető UE-context
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            A context a készülékhez és kapcsolataihoz tárolt állapotadat.
          </p>
        </div>

        <dl className="divide-y divide-slate-800">
          {rows.map(([label, value]) => (
            <div
              key={label}
              className="grid gap-2 px-5 py-4 sm:grid-cols-2"
            >
              <dt className="text-sm text-slate-400">{label}</dt>
              <dd className="text-sm font-medium text-slate-200">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <p className="leading-7 text-slate-400">
        {connected
          ? "Aktív kapcsolatnál a hálózatnak van kapcsolata a kiszolgáló eNodeB felé. Ettől az MME továbbra sem lesz a videóforgalom továbbítója."
          : "Idle állapotban a telefon cellát válthat anélkül, hogy minden ilyen váltást bejelentene az MME-nek. Ha újra el kell érni, a hálózat paginget, azaz keresési jelzést használhat."}
      </p>

      <div className="rounded-xl border border-rose-400/20 bg-rose-400/5 p-4">
        <p className="font-semibold text-rose-200">
          Ami nem szerepel ebben az állapotlapban:
        </p>
        <p className="mt-2 text-sm leading-7 text-slate-400">
          A film képkockái, a videószegmens tartalma vagy a
          letöltött fájl bájtjai. Ezek a User Plane-en haladnak.
        </p>
      </div>

      <p className="text-sm leading-7 text-slate-500">
        A két gomb két állapotot hasonlít össze. Nem indítja el
        a hálózati kapcsolat tényleges felépítési vagy bontási
        eljárását.
      </p>
    </div>
  );
}