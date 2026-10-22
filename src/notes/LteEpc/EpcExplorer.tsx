import { useId, useState } from "react";

import { useTimeline } from "../LteBasics/useTimeline";
import EpcDiagram from "./EpcDiagram";

import {
  SEGMENT_DURATION,
  buttonClass,
  scenarios,
} from "./epcData";

import type { EpcScenario } from "./epcData";

/**
 * Egy kiválasztott útvonal idővonala.
 * A szülő key alapján új példányt hoz létre forgatókönyvváltáskor.
 */
function ScenarioPlayer({ scenario }: { scenario: EpcScenario }) {
  const sliderId = useId();
  const speedId = useId();

  const duration = scenario.steps.length * SEGMENT_DURATION;

  const clock = useTimeline({
    duration,
    autoPlay: false,
    loop: false,
  });

  const stepIndex = Math.min(
    scenario.steps.length - 1,
    Math.floor(clock.time / SEGMENT_DURATION),
  );

  const step = scenario.steps[stepIndex];
  const finished = clock.time >= duration;

  return (
    <div className="space-y-5">
      <EpcDiagram scenario={scenario} time={clock.time} />

      <div className="min-h-36 rounded-2xl bg-slate-950 p-5">
        <p
          className={`text-xs uppercase tracking-widest ${
            scenario.plane === "user"
              ? "text-cyan-300"
              : "text-amber-300"
          }`}
        >
          {scenario.packetLabel} · {stepIndex + 1} /{" "}
          {scenario.steps.length}. szakasz
        </p>

        <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>

        <p className="mt-2 leading-7 text-slate-400">
          {step.text}
        </p>
      </div>

      <div>
        <div className="flex justify-between gap-3 text-sm text-slate-400">
          <label htmlFor={sliderId}>A kiválasztott útvonal</label>
          <span>{clock.time.toFixed(1)} / {duration} mp</span>
        </div>

        <input
          id={sliderId}
          type="range"
          min={0}
          max={duration}
          step={0.01}
          value={clock.time}
          onChange={(event) => clock.seek(Number(event.target.value))}
          aria-valuetext={`${step.title}, ${clock.time.toFixed(1)} másodperc`}
          className="mt-3 h-8 w-full cursor-pointer accent-cyan-400"
        />

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button
            type="button"
            className={buttonClass}
            onClick={() => clock.seek(0)}
          >
            Elejére
          </button>

          <button
            type="button"
            className={buttonClass}
            disabled={clock.time === 0}
            onClick={() =>
              clock.seek(
                (Math.ceil(clock.time / SEGMENT_DURATION) - 1) *
                  SEGMENT_DURATION,
              )
            }
          >
            ← Előző
          </button>

          <button
            type="button"
            className={buttonClass}
            onClick={clock.toggle}
          >
            {clock.playing
              ? "Szünet"
              : finished
                ? "Újrajátszás"
                : "Lejátszás"}
          </button>

          <button
            type="button"
            className={buttonClass}
            disabled={finished}
            onClick={() =>
              clock.seek((stepIndex + 1) * SEGMENT_DURATION)
            }
          >
            Következő →
          </button>

          <label htmlFor={speedId} className="text-sm text-slate-400">
            Sebesség
          </label>

          <select
            id={speedId}
            value={clock.speed}
            onChange={(event) =>
              clock.setSpeed(Number(event.target.value))
            }
            className={buttonClass}
          >
            <option value={0.5}>0,5×</option>
            <option value={1}>1×</option>
            <option value={2}>2×</option>
          </select>
        </div>
      </div>

      {scenario.plane === "control" && (
        <p className="rounded-xl border border-amber-400/20 bg-amber-400/5 p-4 text-sm leading-7 text-amber-100">
          Ez egy vezérlési kapcsolat vagy rövid részfolyamat
          szemléltetése. Nem teljes attach-üzenetsorrend.
          A válaszüzeneteket és a további egyeztetéseket most
          nem ábrázoljuk.
        </p>
      )}

      {scenario.id === "video" && finished && (
        <p
          role="status"
          className="rounded-xl bg-cyan-400/10 p-4 leading-7 text-cyan-200"
        >
          Az adat eljutott a telefonhoz. Az MME, a HSS és a PCRF
          egyikén sem haladt át a videócsomag.
        </p>
      )}
    </div>
  );
}

export default function EpcExplorer() {
  const [selectedId, setSelectedId] = useState("video");

  const scenario = scenarios.find((item) => item.id === selectedId)!;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {scenarios.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={selectedId === item.id}
            onClick={() => setSelectedId(item.id)}
            className={`${buttonClass} ${
              selectedId === item.id
                ? item.plane === "user"
                  ? "border-cyan-400 text-cyan-200"
                  : "border-amber-400 text-amber-200"
                : ""
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>

      <ScenarioPlayer key={scenario.id} scenario={scenario} />

      <p className="text-sm leading-7 text-slate-500">
        A mozgás ideje szemléltető jellegű, nem valódi hálózati
        késleltetés. A több szakaszon végighaladó pont adatot
        vagy összefüggő jelzési feladatot jelöl; a konkrét
        üzenetformátum és kapszulázás közben változhat.
      </p>
    </div>
  );
}