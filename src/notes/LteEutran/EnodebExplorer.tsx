import { useId, useState } from "react";
import { buttonClass, enodebFunctions } from "./eutranData";

/**
 * Interaktív eNodeB-feladatbemutató.
 * A kiválasztás a magyarázatot és a vizuális kiemelést változtatja.
 * Az SVG kapcsolati szemléltetés, nem rádiós szimuláció.
 */
export default function EnodebExplorer() {
  const descriptionId = useId();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selected = enodebFunctions[selectedIndex];

  return (
    <div className="space-y-5">
      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950">
        <svg
          viewBox="0 0 800 390"
          className="block w-full min-w-[580px]"
          role="img"
          aria-labelledby={descriptionId}
        >
          <title id={descriptionId}>
            Egy eNodeB három UE-t szolgál ki rádiós kapcsolaton,
            és az EPC-hez csatlakozik. Kiemelt feladat:
            {selected.title}.
          </title>

          <rect
            x={45}
            y={35}
            width={490}
            height={165}
            rx={24}
            fill="#0f172a"
            stroke="#334155"
          />

          <text
            x={70}
            y={65}
            fill="#94a3b8"
            fontSize={14}
          >
            E-UTRAN · egy bemutatott eNodeB
          </text>

          <line
            x1={420}
            y1={120}
            x2={640}
            y2={120}
            stroke="#64748b"
            strokeWidth={2}
          />

          <text
            x={570}
            y={104}
            textAnchor="middle"
            fill="#94a3b8"
            fontSize={13}
          >
            S1
          </text>

          {[145, 290, 435].map((x, index) => (
            <g key={x}>
              <line
                x1={290}
                y1={160}
                x2={x}
                y2={285}
                stroke={selected.color}
                strokeWidth={2}
                strokeDasharray="6 5"
                opacity={0.65}
              />

              <rect
                x={x - 43}
                y={285}
                width={86}
                height={64}
                rx={14}
                fill="#0f172a"
                stroke={selected.color}
              />

              <text
                x={x}
                y={313}
                textAnchor="middle"
                fill="#e2e8f0"
                fontSize={19}
                fontWeight={600}
              >
                UE {index + 1}
              </text>

              <text
                x={x}
                y={334}
                textAnchor="middle"
                fill="#94a3b8"
                fontSize={11}
              >
                Készülék
              </text>
            </g>
          ))}

          <text
            x={290}
            y={246}
            textAnchor="middle"
            fill="#94a3b8"
            fontSize={13}
            stroke="#020617"
            strokeWidth={5}
            paintOrder="stroke"
          >
            Uu · rádiós hozzáférés
          </text>

          <rect
            x={160}
            y={85}
            width={260}
            height={75}
            rx={16}
            fill="#020617"
            stroke={selected.color}
            strokeWidth={2}
          />

          <text
            x={290}
            y={116}
            textAnchor="middle"
            fill={selected.color}
            fontSize={25}
            fontWeight={700}
          >
            eNodeB
          </text>

          <text
            x={290}
            y={140}
            textAnchor="middle"
            fill="#cbd5e1"
            fontSize={13}
          >
            {selected.title}
          </text>

          <rect
            x={640}
            y={85}
            width={120}
            height={75}
            rx={16}
            fill="#0f172a"
            stroke="#475569"
          />

          <text
            x={700}
            y={117}
            textAnchor="middle"
            fill="#e2e8f0"
            fontSize={22}
            fontWeight={700}
          >
            EPC
          </text>

          <text
            x={700}
            y={140}
            textAnchor="middle"
            fill="#94a3b8"
            fontSize={12}
          >
            Maghálózat
          </text>

          <text
            x={400}
            y={378}
            textAnchor="middle"
            fill="#64748b"
            fontSize={12}
          >
            Logikai kapcsolatok · nem fizikai elrendezés
          </text>
        </svg>
      </div>

      <div className="flex flex-wrap gap-2">
        {enodebFunctions.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={selectedIndex === index}
            onClick={() => setSelectedIndex(index)}
            className={buttonClass}
            style={
              selectedIndex === index
                ? {
                    borderColor: item.color,
                    color: item.color,
                  }
                : undefined
            }
          >
            {item.title}
          </button>
        ))}
      </div>

      <div
        aria-live="polite"
        className="rounded-2xl bg-slate-950 p-5"
      >
        <p
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: selected.color }}
        >
          {selected.english}
        </p>

        <h3 className="mt-3 text-xl font-semibold">
          {selected.question}
        </h3>

        <p className="mt-3 leading-7 text-slate-300">
          {selected.description}
        </p>

        <p className="mt-4 leading-7 text-slate-400">
          <strong className="text-slate-200">Példa: </strong>
          {selected.example}
        </p>
      </div>
    </div>
  );
}