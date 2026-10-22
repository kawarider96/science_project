import { useId } from "react";
import { useTimeline } from "../LteBasics/useTimeline";

import MmeAttachDiagram from "./MmeAttachDiagram";

import {
  ATTACH_DURATION,
  STEP_DURATION,
  attachSteps,
  buttonClass,
} from "./mmeData";

export default function MmeAttachPlayer() {
  const sliderId = useId();

  const clock = useTimeline({
    duration: ATTACH_DURATION,
    autoPlay: false,
    loop: false,
  });

  const stepIndex = Math.min(
    attachSteps.length - 1,
    Math.floor(clock.time / STEP_DURATION),
  );

  const step = attachSteps[stepIndex];
  const finished = clock.time >= ATTACH_DURATION;

  // Az állapot az üzenet megérkezésekor frissül.
  const attachReceived = clock.time >= STEP_DURATION * 2;
  const vectorReceived = clock.time >= STEP_DURATION * 4;
  const responseReceived = clock.time >= STEP_DURATION * 6;

  const contextRows = [
    [
      "Attach Request",
      attachReceived ? "Megérkezett az MME-hez" : "Még nem érkezett meg",
    ],
    [
      "Hitelesítési vektor",
      vectorReceived ? "Megérkezett a HSS-től" : "Még nincs betöltve",
    ],
    [
      "UE válasza – RES",
      responseReceived ? "Megérkezett" : "Még nem érkezett meg",
    ],
    [
      "Ellenőrzés",
      finished
        ? "Sikeres: RES = XRES"
        : responseReceived
          ? "Folyamatban"
          : "Várakozik",
    ],
  ];

  return (
    <div className="space-y-5">
      <MmeAttachDiagram time={clock.time} />

      <div className="min-h-36 rounded-2xl bg-slate-950 p-5">
        <p className="text-xs uppercase tracking-widest text-amber-300">
          {stepIndex + 1} / {attachSteps.length}. lépés
        </p>

        <h3 className="mt-3 text-xl font-semibold">{step.title}</h3>

        <p className="mt-3 leading-7 text-slate-300">
          {step.explanation}
        </p>
      </div>

      <div>
        <div className="flex justify-between gap-3 text-sm text-slate-400">
          <label htmlFor={sliderId}>A részfolyamat idővonala</label>
          <span>
            {clock.time.toFixed(1)} / {ATTACH_DURATION} mp
          </span>
        </div>

        <input
          id={sliderId}
          type="range"
          min={0}
          max={ATTACH_DURATION}
          step={0.01}
          value={clock.time}
          onChange={(event) => clock.seek(Number(event.target.value))}
          aria-valuetext={`${stepIndex + 1}. lépés: ${step.title}`}
          className="mt-3 h-8 w-full cursor-pointer accent-amber-400"
        />

        <div className="mt-3 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => clock.seek(0)}
            className={buttonClass}
          >
            Elejére
          </button>

          <button
            type="button"
            disabled={clock.time === 0}
            onClick={() =>
              clock.seek(
                (Math.ceil(clock.time / STEP_DURATION) - 1) *
                  STEP_DURATION,
              )
            }
            className={buttonClass}
          >
            ← Előző
          </button>

          <button
            type="button"
            onClick={clock.toggle}
            className={buttonClass}
          >
            {clock.playing
              ? "Szünet"
              : finished
                ? "Újrajátszás"
                : "Lejátszás"}
          </button>

          <button
            type="button"
            disabled={finished}
            onClick={() => clock.seek((stepIndex + 1) * STEP_DURATION)}
            className={buttonClass}
          >
            Következő →
          </button>
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {attachSteps.map((item, index) => (
          <button
            key={item.title}
            type="button"
            aria-pressed={index === stepIndex}
            onClick={() => clock.seek(index * STEP_DURATION)}
            className={`${buttonClass} text-left ${
              index === stepIndex
                ? "border-amber-400 text-amber-200"
                : ""
            }`}
          >
            {index + 1}. {item.title}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-800">
        <h3 className="border-b border-slate-800 bg-slate-950 p-5 font-semibold text-violet-300">
          Mi áll már az MME rendelkezésére?
        </h3>

        <dl className="divide-y divide-slate-800">
          {contextRows.map(([label, value]) => (
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

      {finished && (
        <p
          role="status"
          className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-5 leading-7 text-emerald-200"
        >
          A bemutatott hitelesítés sikeres. A teljes attach még
          nem fejeződött be: további biztonsági, előfizető-kezelési
          és adatkapcsolat-felépítési műveletek szükségesek.
        </p>
      )}
    </div>
  );
}