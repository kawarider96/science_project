import { useId, useState } from "react";
import LteDiagram from "./LteDiagram";
import { useTimeline } from "./useTimeline";

import {
  DURATION,
  SEGMENT_DURATION,
  buttonClass,
  getNode,
  nodes,
  routeSteps,
} from "./lteData";

import type { Direction, NodeId, Plane } from "./lteData";

/**
 * demo=true: ismétlődő bemutató.
 * demo=false: irányválasztás, vezérlési nézet és elemvizsgálat.
 */
export default function LtePlayer({ demo = false }: { demo?: boolean }) {
  const sliderId = useId();
  const directionId = useId();
  const speedId = useId();

  const [plane, setPlane] = useState<Plane>("user");
  const [direction, setDirection] = useState<Direction>("uplink");
  const [selected, setSelected] = useState<NodeId>("ue");

  const clock = useTimeline({
    duration: DURATION,
    loop: demo,
    autoPlay: demo,
  });

  const segment = Math.min(
    3,
    Math.floor(clock.time / SEGMENT_DURATION),
  );

  const stepIndex = direction === "uplink" ? segment : 3 - segment;
  const step = routeSteps[stepIndex];
  const selectedNode = getNode(selected);

  function changePlane(next: Plane) {
    clock.seek(0);
    setPlane(next);
  }

  return (
    <div className="space-y-5">
      {!demo && (
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className={buttonClass}
            aria-pressed={plane === "user"}
            onClick={() => changePlane("user")}
          >
            {plane === "user" ? "● " : ""}Felhasználói adatút
          </button>

          <button
            type="button"
            className={buttonClass}
            aria-pressed={plane === "control"}
            onClick={() => changePlane("control")}
          >
            {plane === "control" ? "● " : ""}Vezérlési kapcsolatok
          </button>
        </div>
      )}

      <LteDiagram
        time={clock.time}
        plane={plane}
        direction={direction}
        selected={demo ? undefined : selected}
      />

      {plane === "user" ? (
        <>
          <div className="min-h-32 rounded-2xl bg-slate-950 p-5">
            <p className="text-xs uppercase tracking-widest text-cyan-400">
              {segment + 1} / 4. szakasz ·{" "}
              {direction === "uplink" ? "Feltöltés" : "Letöltés"}
            </p>

            <h3 className="mt-2 font-semibold">{step.label}</h3>
            <p className="mt-2 leading-7 text-slate-400">{step.text}</p>
          </div>

          {!demo && (
            <div className="flex flex-wrap gap-5">
              <div>
                <label htmlFor={directionId} className="mb-2 block text-sm text-slate-400">
                  Forgalom iránya
                </label>

                <select
                  id={directionId}
                  value={direction}
                  onChange={(event) => {
                    clock.seek(0);
                    setDirection(event.target.value as Direction);
                  }}
                  className={buttonClass}
                >
                  <option value="uplink">Feltöltés: UE → PDN</option>
                  <option value="downlink">Letöltés: PDN → UE</option>
                </select>
              </div>

              <div>
                <label htmlFor={speedId} className="mb-2 block text-sm text-slate-400">
                  Animáció sebessége
                </label>

                <select
                  id={speedId}
                  value={clock.speed}
                  onChange={(event) => clock.setSpeed(Number(event.target.value))}
                  className={buttonClass}
                >
                  <option value={0.5}>0,5×</option>
                  <option value={1}>1×</option>
                  <option value={2}>2×</option>
                </select>
              </div>
            </div>
          )}

          <div>
            <div className="flex justify-between text-sm text-slate-400">
              <label htmlFor={sliderId}>Animáció idővonala</label>
              <span>{clock.time.toFixed(1)} / {DURATION} mp</span>
            </div>

            <input
              id={sliderId}
              type="range"
              min={0}
              max={DURATION}
              step={0.01}
              value={clock.time}
              onChange={(event) => clock.seek(Number(event.target.value))}
              aria-valuetext={`${step.label}, ${clock.time.toFixed(1)} másodperc`}
              className="mt-3 h-8 w-full cursor-pointer accent-cyan-400"
            />

            <div className="mt-3 flex flex-wrap gap-3">
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
                ← Előző szakasz
              </button>

              <button
                type="button"
                className={buttonClass}
                onClick={clock.toggle}
              >
                {clock.playing ? "Szünet" : "Lejátszás"}
              </button>

              <button
                type="button"
                className={buttonClass}
                disabled={clock.time >= DURATION}
                onClick={() => clock.seek((segment + 1) * SEGMENT_DURATION)}
              >
                Következő szakasz →
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5 leading-7 text-slate-300">
          <p>
            A vezérlés többek között a hozzáférést, a mobilitást és
            az adatkapcsolatok létrehozását szervezi.
            A sárga kapcsolatokon nem a weboldalad tartalma halad.
          </p>

          <p className="mt-3 text-slate-400">
            Ez kapcsolati áttekintés, nem üzenetsorrend.
            Az Uu rádiós interfész vezérlést is visz; az S5-nek
            is van vezérlési oldala. Az ábra a legfontosabb
            kapcsolatokat emeli ki, nem teljes protokolltérkép.
          </p>
        </div>
      )}

      {!demo && (
        <div className="border-t border-slate-800 pt-5">
          <h3 className="font-semibold">Vizsgálj meg egy hálózati elemet!</h3>

          <div className="mt-3 flex flex-wrap gap-2">
            {nodes.map((node) => (
              <button
                key={node.id}
                type="button"
                aria-pressed={selected === node.id}
                onClick={() => setSelected(node.id)}
                className={`${buttonClass} ${
                  selected === node.id
                    ? "border-violet-400 text-violet-300"
                    : ""
                }`}
              >
                {node.label}
              </button>
            ))}
          </div>

          <div
            aria-live="polite"
            className="mt-4 rounded-2xl bg-slate-950 p-5"
          >
            <h4 className="font-semibold text-violet-300">
              {selectedNode.label} · {selectedNode.subtitle}
            </h4>
            <p className="mt-2 leading-7 text-slate-400">
              {selectedNode.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}