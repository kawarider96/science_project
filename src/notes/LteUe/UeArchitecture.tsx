import { useId, useState } from "react";
import { buttonClass, ueParts } from "./ueData";
import type { UePartId } from "./ueData";

/**
 * A UE belső funkcionális felépítése.
 * A kiválasztott rész szövegesen és az SVG-n is kiemelődik.
 * Az ábra funkciókat mutat, nem konkrét chipelrendezést.
 */
export default function UeArchitecture() {
  const descriptionId = useId();
  const arrowId = useId();

  const [selected, setSelected] = useState<UePartId>("modem");

  const activePart = ueParts.find((part) => part.id === selected)!;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {ueParts.map((part) => (
          <button
            key={part.id}
            type="button"
            aria-pressed={selected === part.id}
            onClick={() => setSelected(part.id)}
            className={`${buttonClass} ${
              selected === part.id
                ? "border-cyan-400 text-cyan-200"
                : ""
            }`}
          >
            {part.title}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950">
        <svg
          viewBox="0 0 760 540"
          className="block w-full min-w-[580px]"
          role="img"
          aria-labelledby={descriptionId}
        >
          <title id={descriptionId}>
            A UE funkcionális felépítése: alkalmazás, IP stack,
            LTE modem és RF hardver. A USIM a modemhez kapcsolódó
            előfizetői funkció, nem a felhasználói adatút része.
            Kiválasztva: {activePart.title}.
          </title>

          <defs>
            <marker
              id={arrowId}
              viewBox="0 0 10 10"
              refX={9}
              refY={5}
              markerWidth={6}
              markerHeight={6}
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill="#64748b" />
            </marker>
          </defs>

          <rect
            x={30}
            y={25}
            width={700}
            height={445}
            rx={24}
            fill="#0f172a"
            stroke="#334155"
          />

          <text
            x={60}
            y={60}
            fill="#e2e8f0"
            fontSize={20}
            fontWeight={700}
          >
            UE · User Equipment
          </text>

          {[0, 1, 2].map((index) => (
            <line
              key={index}
              x1={270}
              y1={157 + index * 88}
              x2={270}
              y2={179 + index * 88}
              stroke="#64748b"
              strokeWidth={2}
              markerEnd={`url(#${arrowId})`}
            />
          ))}

          {ueParts.slice(0, 4).map((part, index) => {
            const highlighted = selected === part.id;
            const y = 95 + index * 88;

            return (
              <g key={part.id}>
                <rect
                  x={80}
                  y={y}
                  width={380}
                  height={62}
                  rx={14}
                  fill={highlighted ? part.color : "#020617"}
                  fillOpacity={highlighted ? 0.1 : 1}
                  stroke={highlighted ? part.color : "#334155"}
                  strokeWidth={highlighted ? 2 : 1}
                />

                <text
                  x={100}
                  y={y + 26}
                  fill={part.color}
                  fontSize={18}
                  fontWeight={700}
                >
                  {part.title}
                </text>

                <text
                  x={100}
                  y={y + 47}
                  fill="#94a3b8"
                  fontSize={13}
                >
                  {part.subtitle}
                </text>
              </g>
            );
          })}

          <line
            x1={460}
            y1={302}
            x2={520}
            y2={302}
            stroke="#fcd34d"
            strokeWidth={2}
            strokeDasharray="5 5"
          />

          <rect
            x={520}
            y={262}
            width={165}
            height={80}
            rx={14}
            fill="#fcd34d"
            fillOpacity={selected === "usim" ? 0.15 : 0.04}
            stroke={selected === "usim" ? "#fcd34d" : "#475569"}
            strokeWidth={selected === "usim" ? 2 : 1}
          />

          <text
            x={602}
            y={292}
            textAnchor="middle"
            fill="#fcd34d"
            fontSize={20}
            fontWeight={700}
          >
            USIM
          </text>

          <text
            x={602}
            y={316}
            textAnchor="middle"
            fill="#94a3b8"
            fontSize={12}
          >
            UICC-n futó alkalmazás
          </text>

          <line
            x1={270}
            y1={421}
            x2={270}
            y2={495}
            stroke="#64748b"
            strokeWidth={2}
            markerEnd={`url(#${arrowId})`}
          />

          <text
            x={290}
            y={451}
            fill="#6ee7b7"
            fontSize={13}
          >
            Rádiós kapcsolat
          </text>

          <text
            x={270}
            y={521}
            textAnchor="middle"
            fill="#94a3b8"
            fontSize={15}
          >
            eNodeB · bázisállomás
          </text>
        </svg>
      </div>

      <div
        aria-live="polite"
        className="rounded-2xl bg-slate-950 p-5"
      >
        <h3
          className="text-lg font-semibold"
          style={{ color: activePart.color }}
        >
          {activePart.title} · {activePart.subtitle}
        </h3>

        <p className="mt-3 leading-7 text-slate-300">
          {activePart.description}
        </p>

        <p className="mt-3 text-sm leading-7 text-slate-400">
          <strong className="text-slate-200">Példa: </strong>
          {activePart.example}
        </p>
      </div>

      <p className="text-sm leading-7 text-slate-500">
        Az ábra a kifelé menő adat feldolgozását egyszerűsíti.
        Vételnél az irány fordított. A tényleges hardveres és
        szoftveres határok készülékenként eltérhetnek.
      </p>
    </div>
  );
}