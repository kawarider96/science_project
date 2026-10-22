import { useTimeline } from "../LteBasics/useTimeline";
import {
  HANDOVER_DURATION,
  handoverSteps,
  buttonClass,
  panelClass,
} from "./sgwData";

export function SgwHandoverPlayer() {
  const clock = useTimeline({
    duration: HANDOVER_DURATION,
    autoPlay: false,
    loop: false,
  });

  const activeStep =
    handoverSteps.find(
      (step) =>
        clock.time >= step.start &&
        clock.time < step.end,
    ) ?? handoverSteps[handoverSteps.length - 1];

  const handoverProgress = Math.min(
    1,
    Math.max(0, (clock.time - 4) / 4),
  );

  const ueX =
    clock.time < 4
      ? 180
      : 180 + (620 - 180) * handoverProgress;

  const usingEnb1 = clock.time < 6;
  const usingEnb2 = clock.time >= 6;

  return (
    <section className={panelClass}>
      <div className="mb-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
          Interactive handover
        </p>

        <h2 className="text-2xl font-bold text-white">
          Mi történik handovernél?
        </h2>

        <p className="mt-2 max-w-3xl text-slate-400">
          Figyeld meg, hogy a UE és az eNodeB kapcsolata
          megváltozik, miközben az S-GW végig ugyanaz marad.
        </p>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-950 p-5">
        <svg
          viewBox="0 0 800 390"
          className="min-w-[720px]"
          role="img"
          aria-label="LTE handover Serving Gateway anchor szemléltetés"
        >
          {/* eNB1 */}
          <rect
            x="110"
            y="120"
            width="140"
            height="70"
            rx="18"
            fill={usingEnb1 ? "#083344" : "#0f172a"}
            stroke={usingEnb1 ? "#22d3ee" : "#475569"}
            strokeWidth="3"
          />

          <text
            x="180"
            y="160"
            textAnchor="middle"
            fill="#f8fafc"
            fontWeight="700"
          >
            eNB1
          </text>

          {/* eNB2 */}
          <rect
            x="550"
            y="120"
            width="140"
            height="70"
            rx="18"
            fill={usingEnb2 ? "#083344" : "#0f172a"}
            stroke={usingEnb2 ? "#22d3ee" : "#475569"}
            strokeWidth="3"
          />

          <text
            x="620"
            y="160"
            textAnchor="middle"
            fill="#f8fafc"
            fontWeight="700"
          >
            eNB2
          </text>

          {/* SGW */}
          <rect
            x="330"
            y="280"
            width="140"
            height="70"
            rx="18"
            fill="#052e16"
            stroke="#34d399"
            strokeWidth="3"
          />

          <text
            x="400"
            y="311"
            textAnchor="middle"
            fill="#6ee7b7"
            fontWeight="800"
          >
            S-GW
          </text>

          <text
            x="400"
            y="330"
            textAnchor="middle"
            fill="#94a3b8"
            fontSize="11"
          >
            anchor
          </text>

          {/* eNB1 -> S-GW */}
          <line
            x1="180"
            y1="190"
            x2="370"
            y2="280"
            stroke={usingEnb1 ? "#34d399" : "#334155"}
            strokeWidth="4"
          />

          {/* eNB2 -> S-GW */}
          <line
            x1="620"
            y1="190"
            x2="430"
            y2="280"
            stroke={usingEnb2 ? "#34d399" : "#334155"}
            strokeWidth="4"
          />

          {/* moving UE */}
          <circle
            cx={ueX}
            cy="60"
            r="28"
            fill="#082f49"
            stroke="#22d3ee"
            strokeWidth="3"
          />

          <text
            x={ueX}
            y="65"
            textAnchor="middle"
            fill="#67e8f9"
            fontWeight="800"
          >
            UE
          </text>

          {/* UE link */}
          <line
            x1={ueX}
            y1="88"
            x2={usingEnb1 ? 180 : 620}
            y2="120"
            stroke="#22d3ee"
            strokeWidth="3"
            strokeDasharray="8 6"
          />
        </svg>
      </div>

      <div className="mt-5">
        <input
          type="range"
          min={0}
          max={HANDOVER_DURATION}
          step={0.01}
          value={clock.time}
          onChange={(event) =>
            clock.seek(Number(event.target.value))
          }
          className="w-full accent-emerald-400"
        />

        <div className="mt-2 flex justify-between font-mono text-xs text-slate-600">
          <span>0 s</span>
          <span>{HANDOVER_DURATION} s</span>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          className={buttonClass}
          onClick={clock.toggle}
        >
          {clock.playing ? "⏸ Szünet" : "▶ Lejátszás"}
        </button>

        <button
          className={buttonClass}
          onClick={() => clock.seek(0)}
        >
          ↺ Újrakezdés
        </button>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950 p-5">
        <div className="text-xs uppercase tracking-wider text-slate-500">
          Aktuális lépés
        </div>

        <div className="mt-2 font-semibold text-white">
          {activeStep.title}
        </div>

        <p className="mt-2 text-sm leading-6 text-slate-400">
          {activeStep.description}
        </p>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
        {handoverSteps.map((step) => (
          <button
            key={step.id}
            onClick={() => clock.seek(step.start + 0.01)}
            className={[
              "rounded-xl border p-3 text-left text-xs transition",
              activeStep.id === step.id
                ? "border-emerald-500 bg-emerald-500/10 text-emerald-200"
                : "border-slate-800 bg-slate-950 text-slate-500 hover:border-slate-700",
            ].join(" ")}
          >
            {step.title}
          </button>
        ))}
      </div>
    </section>
  );
}