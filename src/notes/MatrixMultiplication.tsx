import { useEffect, useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import MatrixMultiplicationIntro from "../components/MatrixMultiplicationIntro";

type Matrix = number[][];
type MatrixDraft = string[][];

const INITIAL_A: MatrixDraft = [
  ["1", "2"],
  ["3", "4"],
];

const INITIAL_B: MatrixDraft = [
  ["5", "6"],
  ["7", "8"],
];

const PHASE_COUNT = 6;
const TOTAL_STEPS = 4 * PHASE_COUNT;

const panelClass =
  "rounded-3xl border border-slate-800 bg-slate-900/70 p-5 sm:p-8";

const buttonClass =
  "rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 " +
  "text-sm font-medium text-slate-100 transition hover:bg-slate-700 " +
  "disabled:cursor-not-allowed disabled:opacity-35 " +
  "focus-visible:outline-2 focus-visible:outline-cyan-400";

const phaseTitles = [
  "Kiválasztjuk a sort és az oszlopot",
  "Lehozzuk az első mátrix számait",
  "Melléjük hozzuk a második mátrix számait",
  "Kiszámítjuk a két szorzatot",
  "Összeadjuk a szorzatokat",
  "Beírjuk az eredményt",
];

function parseMatrix(draft: MatrixDraft): Matrix | null {
  const valid = draft.every((row) =>
    row.every((value) => /^-?[0-9]$/.test(value.trim())),
  );

  return valid ? draft.map((row) => row.map(Number)) : null;
}

function factor(value: number) {
  return value < 0 ? `(${value})` : String(value);
}

function multiplyCell(a: Matrix, b: Matrix, row: number, col: number) {
  return a[row][0] * b[0][col] + a[row][1] * b[1][col];
}

/**
 * Szerkeszthető 2×2-es mátrix.
 * A szöveges állapot lehetővé teszi az üres és félkész bevitelt is.
 */
function MatrixEditor({
  name,
  value,
  onChange,
}: {
  name: string;
  value: MatrixDraft;
  onChange: (next: MatrixDraft) => void;
}) {
  return (
    <fieldset className="rounded-2xl border border-slate-700 p-4">
      <legend className="px-2 text-sm font-semibold text-slate-300">
        {name} mátrix
      </legend>

      <div className="grid grid-cols-2 gap-3">
        {value.flatMap((row, r) =>
          row.map((entry, c) => {
            const valid = /^-?[0-9]$/.test(entry.trim());

            return (
              <input
                key={`${r}-${c}`}
                type="text"
                value={entry}
                maxLength={3}
                autoComplete="off"
                spellCheck={false}
                aria-label={`${name}: ${r + 1}. sor, ${c + 1}. oszlop`}
                aria-invalid={!valid}
                onChange={(event) => {
                  const next = value.map((currentRow, ri) =>
                    currentRow.map((current, ci) =>
                      ri === r && ci === c
                        ? event.target.value
                        : current,
                    ),
                  );

                  onChange(next);
                }}
                className={[
                  "w-20 rounded-xl border bg-slate-950 p-3",
                  "text-center font-mono text-lg text-slate-100",
                  "outline-none focus:ring-2 focus:ring-cyan-400/40",
                  valid ? "border-slate-700" : "border-rose-400",
                ].join(" ")}
              />
            );
          }),
        )}
      </div>
    </fieldset>
  );
}

/**
 * SVG-mátrix: origin a bal felső sarok, active a kiemelés feltétele.
 * A cellák középpontja: origin + 26 + index × 60.
 */
function SvgMatrix({
  name,
  values,
  x,
  y,
  color,
  active,
}: {
  name: string;
  values: (number | string)[][];
  x: number;
  y: number;
  color: string;
  active: (row: number, col: number) => boolean;
}) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <text
        x={56}
        y={-18}
        textAnchor="middle"
        fill={color}
        fontSize={18}
        fontWeight={700}
      >
        {name}
      </text>

      <path
        d="M-4,-3 H-12 V115 H-4 M116,-3 H124 V115 H116"
        fill="none"
        stroke="#64748b"
        strokeWidth={2}
      />

      {values.flatMap((row, r) =>
        row.map((value, c) => {
          const highlighted = active(r, c);

          return (
            <g key={`${r}-${c}`}>
              <rect
                x={c * 60}
                y={r * 60}
                width={52}
                height={52}
                rx={12}
                fill={highlighted ? color : "#1e293b"}
                fillOpacity={highlighted ? 0.13 : 0.65}
                stroke={highlighted ? color : "transparent"}
                strokeOpacity={0.7}
              />

              <text
                x={26 + c * 60}
                y={26 + r * 60}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={highlighted ? color : "#94a3b8"}
                fontSize={21}
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
 * Az animáció teljes állapotát az index határozza meg.
 * Ezért visszalépéskor és csúszkás ugráskor is helyes marad.
 */
function MultiplicationScene({
  a,
  b,
  index,
}: {
  a: Matrix;
  b: Matrix;
  index: number;
}) {
  const reducedMotion = useReducedMotion();

  const cellIndex = Math.floor(index / PHASE_COUNT);
  const row = Math.floor(cellIndex / 2);
  const col = cellIndex % 2;
  const phase = index % PHASE_COUNT;

  const products = [
    a[row][0] * b[0][col],
    a[row][1] * b[1][col],
  ];

  const result = products[0] + products[1];

  const transition = {
    duration: reducedMotion ? 0 : 0.6,
    ease: "easeInOut" as const,
  };

  const partial: (number | string)[][] = [0, 1].map((r) =>
    [0, 1].map((c) => {
      const target = r * 2 + c;

      if (target < cellIndex) {
        return multiplyCell(a, b, r, c);
      }

      // A jelenlegi eredményt a mozgó szám rajzolja ki.
      if (target === cellIndex && phase === 5) {
        return "";
      }

      return "?";
    }),
  );

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950">
      <svg
        viewBox="0 0 760 630"
        className="mx-auto block w-full min-w-[540px] max-w-[850px]"
        role="img"
        aria-label={
          `${row + 1}. sor, ${col + 1}. oszlop. ` +
          `${phaseTitles[phase]}. ` +
          `${factor(a[row][0])} szor ${factor(b[0][col])} plusz ` +
          `${factor(a[row][1])} szor ${factor(b[1][col])} ` +
          `egyenlő ${result}.`
        }
      >
        <SvgMatrix
          name={`A · ${row + 1}. sor`}
          values={a}
          x={130}
          y={70}
          color="#67e8f9"
          active={(r) => r === row}
        />

        <text
          x={380}
          y={130}
          textAnchor="middle"
          fill="#64748b"
          fontSize={32}
        >
          ×
        </text>

        <SvgMatrix
          name={`B · ${col + 1}. oszlop`}
          values={b}
          x={490}
          y={70}
          color="#fcd34d"
          active={(_, c) => c === col}
        />

        <text
          x={380}
          y={220}
          textAnchor="middle"
          fill="#64748b"
          fontSize={13}
          letterSpacing={2}
        >
          PÁRONKÉNT SZORZUNK
        </text>

        {/* Cellaváltáskor új jelenet indul, a régi számok eltűnnek. */}
        <g key={cellIndex}>
          {[0, 1].map((k) => {
            const equationY = 265 + k * 60;

            return (
              <g key={k}>
                {/* Az A számainak színes másolatai. */}
                <motion.g
                  initial={false}
                  animate={{
                    x: phase >= 1 ? 270 : 156 + k * 60,
                    y: phase >= 1 ? equationY : 96 + row * 60,
                    opacity: phase >= 1 ? 1 : 0,
                  }}
                  transition={transition}
                >
                  <text
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#67e8f9"
                    fontSize={25}
                    fontWeight={700}
                  >
                    {factor(a[row][k])}
                  </text>
                </motion.g>

                {phase >= 1 && (
                  <text
                    x={315}
                    y={equationY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#94a3b8"
                    fontSize={24}
                  >
                    ×
                  </text>
                )}

                {/* A B számainak másolatai ugyanabba a két sorba úsznak. */}
                <motion.g
                  initial={false}
                  animate={{
                    x: phase >= 2 ? 360 : 516 + col * 60,
                    y: phase >= 2 ? equationY : 96 + k * 60,
                    opacity: phase >= 2 ? 1 : 0,
                  }}
                  transition={transition}
                >
                  <text
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#fcd34d"
                    fontSize={25}
                    fontWeight={700}
                  >
                    {factor(b[k][col])}
                  </text>
                </motion.g>

                {phase >= 3 && (
                  <g>
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
                      fill="#e2e8f0"
                      fontSize={25}
                      fontWeight={700}
                    >
                      {products[k]}
                    </text>
                  </g>
                )}

                {/* A két részszorzat másolata az összeadás sorába kerül. */}
                <motion.g
                  initial={false}
                  animate={{
                    x: phase >= 4 ? 310 + k * 90 : 455,
                    y: phase >= 4 ? 400 : equationY,
                    opacity: phase >= 4 ? 1 : 0,
                  }}
                  transition={transition}
                >
                  <text
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#e2e8f0"
                    fontSize={25}
                    fontWeight={700}
                  >
                    {factor(products[k])}
                  </text>
                </motion.g>
              </g>
            );
          })}

          {phase >= 4 && (
            <g fill="#94a3b8" fontSize={24}>
              <text
                x={355}
                y={400}
                textAnchor="middle"
                dominantBaseline="middle"
              >
                +
              </text>
              <text
                x={445}
                y={400}
                textAnchor="middle"
                dominantBaseline="middle"
              >
                =
              </text>
            </g>
          )}
        </g>

        <SvgMatrix
          name="C · eredménymátrix"
          values={partial}
          x={320}
          y={490}
          color="#6ee7b7"
          active={(r, c) => r === row && c === col}
        />

        {/* Utoljára rajzoljuk: a mátrixcellák fölött marad. */}
        <motion.g
          key={`result-${cellIndex}`}
          initial={false}
          animate={{
            x: phase === 5 ? 346 + col * 60 : 500,
            y: phase === 5 ? 516 + row * 60 : 400,
            opacity: phase >= 4 ? 1 : 0,
          }}
          transition={transition}
        >
          <text
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#6ee7b7"
            fontSize={25}
            fontWeight={700}
          >
            {result}
          </text>
        </motion.g>
      </svg>
    </div>
  );
}

const quizTasks = [
  {
    a: [[2, 3], [4, 1]],
    b: [[5, 1], [2, 6]],
    row: 0,
    col: 0,
  },
  {
    a: [[1, -2], [3, 4]],
    b: [[2, 5], [1, 3]],
    row: 0,
    col: 1,
  },
  {
    a: [[2, 1], [3, 2]],
    b: [[4, 2], [1, 5]],
    row: 1,
    col: 0,
  },
];

function QuizMatrix({
  name,
  values,
}: {
  name: string;
  values: Matrix;
}) {
  return (
    <div>
      <p className="mb-2 text-center text-sm text-slate-400">
        {name}
      </p>

      <div
        role="img"
        aria-label={
          `${name} mátrix. ` +
          values
            .map((row, r) => `${r + 1}. sor: ${row.join(", ")}`)
            .join(". ")
        }
        className="grid grid-cols-2 gap-2 rounded-lg border-x-2 border-slate-600 px-3 py-2"
      >
        {values.flatMap((row, r) =>
          row.map((value, c) => (
            <span
              key={`${r}-${c}`}
              className="grid h-10 w-10 place-items-center rounded-lg bg-slate-800 font-mono"
            >
              {value}
            </span>
          )),
        )}
      </div>
    </div>
  );
}

function MatrixQuiz() {
  const answerId = useId();
  const [taskIndex, setTaskIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const task = quizTasks[taskIndex];
  const expected = multiplyCell(task.a, task.b, task.row, task.col);
  const valid = /^-?\d+$/.test(answer.trim());
  const correct = valid && Number(answer) === expected;

  const first = task.a[task.row][0] * task.b[0][task.col];
  const second = task.a[task.row][1] * task.b[1][task.col];

  function nextTask() {
    setTaskIndex((current) => (current + 1) % quizTasks.length);
    setAnswer("");
    setChecked(false);
    setShowSolution(false);
  }

  return (
    <section className={panelClass} aria-labelledby="quiz-title">
      <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
        03 / Ellenőrizd magad
      </p>

      <h2 id="quiz-title" className="mt-3 text-2xl font-semibold">
        Most te jössz!
      </h2>

      <p className="mt-3 leading-7 text-slate-400">
        Számítsd ki a C eredménymátrix{" "}
        <strong className="text-slate-100">
          {task.row + 1}. sorának {task.col + 1}. elemét
        </strong>
        . Csak ezt az egy elemet kell megadnod.
      </p>

      <div className="my-6 flex items-center justify-center gap-5">
        <QuizMatrix name="A" values={task.a} />
        <span className="text-2xl text-slate-500">×</span>
        <QuizMatrix name="B" values={task.b} />
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (valid) setChecked(true);
        }}
      >
        <label htmlFor={answerId} className="text-sm text-slate-300">
          A kiszámított elem értéke
        </label>

        <div className="mt-2 flex flex-wrap gap-3">
          <input
            id={answerId}
            type="text"
            value={answer}
            autoComplete="off"
            placeholder="Eredmény"
            onChange={(event) => {
              setAnswer(event.target.value);
              setChecked(false);
              setShowSolution(false);
            }}
            className="w-36 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 font-mono outline-none focus:border-cyan-400"
          />

          <button
            type="submit"
            disabled={!valid}
            className={buttonClass}
          >
            Ellenőrzés
          </button>
        </div>
      </form>

      <div aria-live="polite">
        {checked && (
          <div
            className={[
              "mt-5 rounded-xl border p-4 leading-7",
              correct
                ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-200"
                : "border-amber-400/20 bg-amber-400/10 text-amber-200",
            ].join(" ")}
          >
            {correct ? (
              <p>
                Helyes! A két részszorzat {first} és {second};
                az összegük {expected}.
              </p>
            ) : (
              <p>
                Ez még nem jó. Az A mátrix {task.row + 1}. sorát
                párosítsd a B mátrix {task.col + 1}. oszlopával.
                Két szorzást végezz, majd add össze az eredményeiket!
                Átírhatod a válaszodat és újra próbálkozhatsz.
              </p>
            )}

            {!correct && (
              <button
                type="button"
                onClick={() => setShowSolution((value) => !value)}
                className="mt-3 underline underline-offset-4"
              >
                {showSolution ? "Megoldás elrejtése" : "Megoldás mutatása"}
              </button>
            )}

            {!correct && showSolution && (
              <p className="mt-3 font-mono">
                {factor(task.a[task.row][0])} ×{" "}
                {factor(task.b[0][task.col])} +{" "}
                {factor(task.a[task.row][1])} ×{" "}
                {factor(task.b[1][task.col])}
                {" = "}
                {factor(first)} + {factor(second)} = {expected}
              </p>
            )}

            {(correct || showSolution) && (
              <button
                type="button"
                onClick={nextTask}
                className={`${buttonClass} mt-4 block`}
              >
                Következő feladat →
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default function MatrixMultiplication() {
  const sliderId = useId();

  const [draftA, setDraftA] = useState<MatrixDraft>(INITIAL_A);
  const [draftB, setDraftB] = useState<MatrixDraft>(INITIAL_B);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  const a = parseMatrix(draftA);
  const b = parseMatrix(draftB);
  const valid = a !== null && b !== null;

  const cellIndex = Math.floor(index / PHASE_COUNT);
  const row = Math.floor(cellIndex / 2);
  const col = cellIndex % 2;
  const phase = index % PHASE_COUNT;
  const lastStep = index === TOTAL_STEPS - 1;

  useEffect(() => {
    if (!playing || !valid) return;

    if (lastStep) {
      setPlaying(false);
      return;
    }

    const timer = window.setTimeout(() => {
      setIndex((current) => current + 1);
    }, 1800);

    return () => window.clearTimeout(timer);
  }, [playing, index, valid, lastStep]);

  function seek(next: number) {
    setPlaying(false);
    setIndex(Math.max(0, Math.min(TOTAL_STEPS - 1, next)));
  }

  function updateMatrix(target: "a" | "b", next: MatrixDraft) {
    seek(0);

    if (target === "a") setDraftA(next);
    else setDraftB(next);
  }

  function resetExample() {
    seek(0);
    setDraftA(INITIAL_A);
    setDraftB(INITIAL_B);
  }

  function togglePlayback() {
    if (playing) {
      setPlaying(false);
      return;
    }

    if (lastStep) setIndex(0);
    setPlaying(true);
  }

  const explanations = [
    `Az A mátrix ${row + 1}. sorát és a B mátrix ${
      col + 1
    }. oszlopát használjuk. Ezekből kapjuk C ${
      row + 1
    }. sorának ${col + 1}. elemét.`,

    "Az első mátrix kiválasztott sorának számait egymás alá rendezzük. Mindkettő mellé egy szorzásjel kerül.",

    "A második mátrix kiválasztott oszlopának felső száma a felső sorba, az alsó száma az alsó sorba kerül.",

    "Külön elvégezzük a két szorzást. Ezzel két részszorzatot kapunk, még nem a mátrix végleges elemét.",

    "Összeadjuk a két részszorzatot. Ez az összeg lesz az eredménymátrix egyik eleme.",

    `Az összeget beírjuk a C mátrix ${row + 1}. sorának ${
      col + 1
    }. helyére. A többi elemhez ugyanezt a módszert alkalmazzuk.`,
  ];

  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
          Matek / Lineáris algebra
        </p>

        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
          Mátrixszorzás
        </h1>

        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-400">
          Egy sor találkozik egy oszloppal.
          Páronként szorzunk, majd összeadunk.
        </p>
      </header>

      <section className={panelClass} aria-labelledby="intro-title">
        <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
          01 / Értsd meg
        </p>

        <h2 id="intro-title" className="mt-3 text-2xl font-semibold">
          Mi történik mátrixszorzáskor?
        </h2>

        <div className="mt-4 space-y-4 leading-8 text-slate-300">
          <p>
            A mátrix egy számokból álló táblázat. A{" "}
            <strong className="text-cyan-300">sor vízszintes</strong>,
            az{" "}
            <strong className="text-amber-300">oszlop függőleges</strong>.
            Most két olyan mátrixot szorzunk össze, amelyeknek két
            soruk és két oszlopuk van.
          </p>

          <p>
            Az eredménymátrix minden számát külön számítjuk ki.
            Kiválasztunk egy sort az első mátrixból és egy oszlopot
            a másodikból. Az első számot az elsővel, a másodikat
            a másodikkal szorozzuk össze, majd a két szorzatot összeadjuk.
          </p>
        </div>

        <div className="mt-5 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-5">
          <p className="font-medium text-cyan-200">
            Például: [1, 2] sor és [5, 7] oszlop
          </p>
          <p className="mt-3 font-mono text-lg text-slate-100">
            1 × 5 + 2 × 7 = 5 + 14 = 19
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            Mivel az első sort és az első oszlopot használtuk,
            a 19 az eredménymátrix bal felső cellájába kerül.
            A két szorzatot összeadjuk, nem összeszorozzuk.
          </p>
        </div>

        <figure className="mt-6">
          <MatrixMultiplicationIntro />

          <figcaption className="mt-3 text-sm leading-6 text-slate-500">
            A bemutató automatikusan ismétlődik.
            Megállíthatod, és az idővonalon a mozgás bármelyik
            pillanatára visszatekerhetsz.
          </figcaption>
        </figure>

        <p className="mt-6 text-sm leading-7 text-slate-400">
          <strong className="text-slate-200">Mikor szorozhatók össze?</strong>{" "}
          Az első mátrix oszlopainak száma egyezzen meg a második
          mátrix sorainak számával. Itt mindkettő 2.
          Az eredménynek az első mátrixhoz hasonlóan 2 sora,
          a másodikhoz hasonlóan 2 oszlopa lesz.
        </p>
      </section>

      <section className={panelClass} aria-labelledby="practice-title">
        <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
          02 / Próbáld ki
        </p>

        <h2 id="practice-title" className="mt-3 text-2xl font-semibold">
          Számoljuk ki együtt!
        </h2>

        <p className="mt-3 leading-7 text-slate-400">
          Adj meg egész számokat −9 és 9 között.
          Módosításkor a levezetés visszatér az első lépéshez.
          A kék számok az A mátrixból, a sárgák a B mátrixból érkeznek.
        </p>

        <div className="my-6 flex flex-wrap items-end gap-5">
          <MatrixEditor
            name="A"
            value={draftA}
            onChange={(next) => updateMatrix("a", next)}
          />

          <MatrixEditor
            name="B"
            value={draftB}
            onChange={(next) => updateMatrix("b", next)}
          />

          <button
            type="button"
            onClick={resetExample}
            className={buttonClass}
          >
            Eredeti példa
          </button>
        </div>

        {!valid ? (
          <p
            role="status"
            className="rounded-xl border border-amber-400/20 bg-amber-400/10 p-4 text-amber-200"
          >
            Minden cellába −9 és 9 közötti egész számot írj.
            A levezetés akkor jelenik meg, ha minden érték érvényes.
          </p>
        ) : (
          <>
            <MultiplicationScene a={a} b={b} index={index} />

            <div className="mt-5 min-h-36 rounded-2xl bg-slate-950 p-5">
              <p className="text-xs font-medium uppercase tracking-widest text-emerald-300">
                {cellIndex + 1}. eredménycella / 4
              </p>

              <h3 className="mt-2 text-lg font-semibold">
                {phaseTitles[phase]}
              </h3>

              <p className="mt-2 leading-7 text-slate-400">
                {explanations[phase]}
              </p>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between gap-3 text-sm">
                <label htmlFor={sliderId} className="text-slate-400">
                  A megoldás menete
                </label>

                <span className="font-mono text-cyan-300">
                  {index + 1} / {TOTAL_STEPS}. lépés
                </span>
              </div>

              <input
                id={sliderId}
                type="range"
                min={0}
                max={TOTAL_STEPS - 1}
                step={1}
                value={index}
                aria-valuetext={
                  `${index + 1}. lépés: ${phaseTitles[phase]}`
                }
                onChange={(event) => seek(Number(event.target.value))}
                className="mt-3 h-8 w-full cursor-pointer accent-cyan-400"
              />

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => seek(0)}
                  disabled={index === 0}
                  className={buttonClass}
                >
                  Elejére
                </button>

                <button
                  type="button"
                  onClick={() => seek(index - 1)}
                  disabled={index === 0}
                  className={buttonClass}
                >
                  ← Előző
                </button>

                <button
                  type="button"
                  onClick={togglePlayback}
                  className={`${buttonClass} border-cyan-400/40 text-cyan-200`}
                >
                  {playing
                    ? "Szünet"
                    : lastStep
                      ? "Újrajátszás"
                      : "Lejátszás"}
                </button>

                <button
                  type="button"
                  onClick={() => seek(index + 1)}
                  disabled={lastStep}
                  className={buttonClass}
                >
                  Következő →
                </button>
              </div>
            </div>

            {lastStep && (
              <p
                role="status"
                className="mt-5 rounded-xl bg-emerald-400/10 p-4 leading-7 text-emerald-200"
              >
                Kész! Mind a négy eredményelemet kiszámoltuk.
                Minden cellához egy sort és egy oszlopot párosítottunk.
              </p>
            )}
          </>
        )}
      </section>

      <MatrixQuiz />
    </div>
  );
}