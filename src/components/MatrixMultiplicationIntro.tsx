import { useEffect, useId, useState } from "react";
import { useReducedMotion } from "motion/react";

const DURATION = 20;

const CYAN = "#67e8f9";
const AMBER = "#fcd34d";
const GREEN = "#6ee7b7";
const WHITE = "#e2e8f0";
const MUTED = "#64748b";

const buttonClass =
  "rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 " +
  "text-sm text-slate-100 transition hover:bg-slate-700 " +
  "focus-visible:outline-2 focus-visible:outline-cyan-400";

/** Egy időszakasz előrehaladása 0 és 1 között. */
function progress(time: number, start: number, end: number) {
  return Math.max(0, Math.min(1, (time - start) / (end - start)));
}

/** Finom indulás és megállás. */
function smooth(value: number) {
  return value * value * (3 - 2 * value);
}

function interpolate(from: number, to: number, progress: number) {
  return from + (to - from) * progress;
}

function getCaption(time: number) {
  if (time < 2) {
    return "Kiválasztjuk A első sorát és B első oszlopát.";
  }

  if (time < 5) {
    return "Az A mátrix 1 és 2 elemét egymás alá rendezzük.";
  }

  if (time < 8) {
    return "Melléjük kerül B első oszlopából az 5 és a 7.";
  }

  if (time < 11) {
    return "Két szorzást végzünk: 1 × 5 = 5, és 2 × 7 = 14.";
  }

  if (time < 15) {
    return "A részszorzatokat összeadjuk: 5 + 14 = 19.";
  }

  return "A 19 az eredménymátrix első sorának első helyére kerül.";
}

/**
 * Egy 2×2-es mátrix megjelenítése.
 * Az x és y a bal felső cella bal felső sarkát jelöli.
 */
function Matrix({
  name,
  x,
  y,
  values,
  color,
  highlight,
  emphasis,
}: {
  name: string;
  x: number;
  y: number;
  values: (number | string)[][];
  color: string;
  highlight: (row: number, col: number) => boolean;
  emphasis: number;
}) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <text
        x={56}
        y={-22}
        textAnchor="middle"
        fill={color}
        fontSize={17}
        fontWeight={700}
      >
        {name}
      </text>

      <path
        d="M-4,-3 H-12 V115 H-4 M116,-3 H124 V115 H116"
        fill="none"
        stroke={MUTED}
        strokeWidth={2}
      />

      {values.flatMap((row, r) =>
        row.map((value, c) => {
          const selected = highlight(r, c);

          return (
            <g key={`${r}-${c}`}>
              <rect
                x={c * 60}
                y={r * 60}
                width={52}
                height={52}
                rx={12}
                fill={selected ? color : "#1e293b"}
                fillOpacity={selected ? 0.14 * emphasis : 0.7}
                stroke={selected ? color : "transparent"}
                strokeOpacity={emphasis * 0.7}
              />

              <text
                x={26 + c * 60}
                y={26 + r * 60}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={selected ? color : "#94a3b8"}
                fontSize={22}
                fontWeight={600}
              >
                {value}
              </text>
            </g>
          );
        }),
      )}
    </g>
  );
}

/**
 * Mozgó szám: a helyzet és az átlátszóság kizárólag
 * az idővonal aktuális állapotából származik.
 */
function NumberToken({
  value,
  from,
  to,
  amount,
  opacity,
  color,
}: {
  value: number;
  from: [number, number];
  to: [number, number];
  amount: number;
  opacity: number;
  color: string;
}) {
  const eased = smooth(amount);

  return (
    <text
      x={interpolate(from[0], to[0], eased)}
      y={interpolate(from[1], to[1], eased)}
      opacity={opacity}
      textAnchor="middle"
      dominantBaseline="middle"
      fill={color}
      fontSize={25}
      fontWeight={700}
    >
      {value}
    </text>
  );
}

/**
 * Önálló, 20 másodperces bemutató.
 * Automatikusan ismétlődik, de megállítható és tekerhető.
 * Csökkentett mozgás beállításánál kézzel indítható.
 */
export default function MatrixMultiplicationIntro() {
  const sliderId = useId();
  const reducedMotion = useReducedMotion();

  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setPlaying(reducedMotion === false);
  }, [reducedMotion]);

  useEffect(() => {
    if (!playing) return;

    let frameId = 0;
    let previousTime: number | null = null;

    function tick(timestamp: number) {
      if (previousTime !== null) {
        // Háttérbe tett böngészőfül után ne ugorjon nagyot.
        const elapsed = Math.min(
          (timestamp - previousTime) / 1000,
          0.1,
        );

        setTime((current) => (current + elapsed) % DURATION);
      }

      previousTime = timestamp;
      frameId = window.requestAnimationFrame(tick);
    }

    frameId = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frameId);
  }, [playing]);

  function seek(next: number) {
    setPlaying(false);
    setTime(Math.max(0, Math.min(DURATION, next)));
  }

  function restart() {
    setTime(0);
    setPlaying(true);
  }

  const emphasis = progress(time, 0.3, 1.2);

  const aMove = progress(time, 2, 4);
  const aVisible = progress(time, 2, 2.25);

  const multiplicationSigns = progress(time, 4, 4.5);

  const bMove = progress(time, 5, 7);
  const bVisible = progress(time, 5, 5.25);

  const productsVisible = progress(time, 8, 9);

  const sumMove = progress(time, 11, 13);
  const sumVisible = progress(time, 11, 11.25);
  const sumSigns = progress(time, 12.5, 13);

  const resultVisible = progress(time, 13.5, 14);
  const resultMove = progress(time, 15, 17);

  const questionOpacity = 1 - progress(time, 15, 15.5);
  const caption = getCaption(time);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
      <svg
        viewBox="0 0 760 630"
        className="mx-auto block w-full max-w-[850px]"
        role="img"
        aria-label="Mátrixszorzás: az első sor 1 és 2 elemét az első oszlop 5 és 7 elemével párosítjuk. 1 szor 5 plusz 2 szor 7 egyenlő 19. A 19 a C mátrix bal felső cellájába kerül."
      >
        <Matrix
          name="A · első sor"
          x={130}
          y={70}
          values={[[1, 2], [3, 4]]}
          color={CYAN}
          highlight={(row) => row === 0}
          emphasis={emphasis}
        />

        <text
          x={380}
          y={130}
          textAnchor="middle"
          fill={MUTED}
          fontSize={32}
        >
          ×
        </text>

        <Matrix
          name="B · első oszlop"
          x={490}
          y={70}
          values={[[5, 6], [7, 8]]}
          color={AMBER}
          highlight={(_, col) => col === 0}
          emphasis={emphasis}
        />

        <text
          x={380}
          y={220}
          textAnchor="middle"
          fill={MUTED}
          fontSize={13}
          letterSpacing={2}
        >
          KÉT KÜLÖN SZORZÁS
        </text>

        {[0, 1].map((k) => {
          const equationY = 265 + k * 60;

          return (
            <g key={k}>
              <NumberToken
                value={k === 0 ? 1 : 2}
                from={[156 + k * 60, 96]}
                to={[270, equationY]}
                amount={aMove}
                opacity={aVisible}
                color={CYAN}
              />

              <text
                x={315}
                y={equationY}
                opacity={multiplicationSigns}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#94a3b8"
                fontSize={24}
              >
                ×
              </text>

              <NumberToken
                value={k === 0 ? 5 : 7}
                from={[516, 96 + k * 60]}
                to={[360, equationY]}
                amount={bMove}
                opacity={bVisible}
                color={AMBER}
              />

              <g opacity={productsVisible}>
                <text
                  x={405}
                  y={equationY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#94a3b8"
                  fontSize={24}
                >
                  =
                </text>

                <text
                  x={455}
                  y={equationY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={WHITE}
                  fontSize={25}
                  fontWeight={700}
                >
                  {k === 0 ? 5 : 14}
                </text>
              </g>

              <NumberToken
                value={k === 0 ? 5 : 14}
                from={[455, equationY]}
                to={[310 + k * 90, 400]}
                amount={sumMove}
                opacity={sumVisible}
                color={WHITE}
              />
            </g>
          );
        })}

        <g
          opacity={sumSigns}
          fill="#94a3b8"
          fontSize={24}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          <text x={355} y={400}>+</text>
          <text x={445} y={400}>=</text>
        </g>

        <Matrix
          name="C · eredménymátrix"
          x={320}
          y={490}
          values={[["", "?"], ["?", "?"]]}
          color={GREEN}
          highlight={(row, col) => row === 0 && col === 0}
          emphasis={emphasis}
        />

        <text
          x={346}
          y={516}
          opacity={questionOpacity}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={GREEN}
          fontSize={22}
          fontWeight={600}
        >
          ?
        </text>

        <NumberToken
          value={19}
          from={[500, 400]}
          to={[346, 516]}
          amount={resultMove}
          opacity={resultVisible}
          color={GREEN}
        />
      </svg>

      <div className="border-t border-slate-800 p-4 sm:p-5">
        <p className="min-h-14 text-sm leading-7 text-slate-300">
          {caption}
        </p>

        <div className="mt-3 flex items-center justify-between gap-3 text-xs text-slate-500">
          <label htmlFor={sliderId}>Bemutató idővonala</label>

          <span className="font-mono text-cyan-300">
            {time.toFixed(1)} / {DURATION} mp
          </span>
        </div>

        <input
          id={sliderId}
          type="range"
          min={0}
          max={DURATION}
          step={0.01}
          value={time}
          aria-valuetext={`${time.toFixed(1)} másodperc. ${caption}`}
          onChange={(event) => seek(Number(event.target.value))}
          className="mt-2 h-8 w-full cursor-pointer accent-cyan-400"
        />

        <div className="mt-3 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => {
              if (!playing && time >= DURATION) {
                setTime(0);
              }

              setPlaying((current) => !current);
            }}
            className={buttonClass}
          >
            {playing ? "Szünet" : "Lejátszás"}
          </button>

          <button
            type="button"
            onClick={restart}
            className={buttonClass}
          >
            Újraindítás
          </button>
        </div>
      </div>
    </div>
  );
}