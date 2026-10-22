import { useTimeline } from "../LteBasics/useTimeline";
import {
  AUTH_DURATION,
  authSteps,
  buttonClass,
  panelClass,
} from "./hssData";
import { HssAuthenticationDiagram } from "./HssAuthenticationDiagram";

export function HssAuthenticationPlayer() {
  const clock = useTimeline({
    duration: AUTH_DURATION,
    autoPlay: false,
    loop: false,
  });

  const activeStep =
    authSteps.find(
      (step) => clock.time >= step.start && clock.time < step.end,
    ) ?? authSteps[authSteps.length - 1];

  const jumpToStep = (start: number) => {
    clock.seek(start + 0.01);
  };

  return (
    <section className={panelClass}>
      <div className="mb-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
          Interactive authentication flow
        </p>

        <h2 className="text-2xl font-bold text-white">
          Mit csinál a HSS amikor a telefon csatlakozik?
        </h2>

        <p className="mt-2 max-w-3xl text-slate-400">
          Indítsd el vagy lépkedj végig a folyamaton. Figyeld meg:
          a HSS-sel közvetlenül az MME kommunikál.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-4 sm:p-6">
        <HssAuthenticationDiagram time={clock.time} />
      </div>

      <div className="mt-5">
        <input
          type="range"
          min={0}
          max={AUTH_DURATION}
          step={0.01}
          value={clock.time}
          onChange={(event) =>
            clock.seek(Number(event.target.value))
          }
          className="w-full accent-cyan-400"
        />

        <div className="mt-2 flex justify-between font-mono text-xs text-slate-600">
          <span>0 s</span>
          <span>{AUTH_DURATION} s</span>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button className={buttonClass} onClick={clock.toggle}>
          {clock.playing ? "⏸ Szünet" : "▶ Lejátszás"}
        </button>

        <button className={buttonClass} onClick={() => clock.seek(0)}>
            ↺ Újrakezdés
        </button>
      </div>

      <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {authSteps.map((step) => {
          const active = step.id === activeStep.id;

          return (
            <button
              key={step.id}
              onClick={() => jumpToStep(step.start)}
              className={[
                "rounded-xl border p-3 text-left text-sm transition",
                active
                  ? "border-cyan-500 bg-cyan-500/10 text-cyan-200"
                  : "border-slate-800 bg-slate-950 text-slate-500 hover:border-slate-700 hover:text-slate-300",
              ].join(" ")}
            >
              {step.title}
            </button>
          );
        })}
      </div>
    </section>
  );
}