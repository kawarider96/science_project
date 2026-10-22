import { useId } from "react";

import {
  attachSteps,
  participants,
  STEP_DURATION,
} from "./mmeData";

import type { ParticipantId } from "./mmeData";

/**
 * time: a bemutató ideje másodpercben.
 * A megjelenített lépés és az üzenet helye ebből származik.
 * A helyi MME-ellenőrzésnél nem rajzolunk hálózati csomagot.
 */
export default function MmeAttachDiagram({ time }: { time: number }) {
  const descriptionId = useId();

  const stepIndex = Math.min(
    attachSteps.length - 1,
    Math.floor(time / STEP_DURATION),
  );

  const step = attachSteps[stepIndex];

  const progress = Math.max(
    0,
    Math.min(1, (time - stepIndex * STEP_DURATION) / STEP_DURATION),
  );

  const local = step.path.length === 1;

  const segmentCount = Math.max(1, step.path.length - 1);
  const position = progress * segmentCount;
  const segment = Math.min(segmentCount - 1, Math.floor(position));
  const fraction = Math.min(1, position - segment);

  const fromId = local ? step.path[0] : step.path[segment];
  const toId = local ? fromId : step.path[segment + 1];

  const from = participants[fromId];
  const to = participants[toId];

  const direction = Math.sign(to.x - from.x);
  const startX = from.x + direction * 62;
  const endX = to.x - direction * 62;
  const packetX = startX + (endX - startX) * fraction;

  const connections: {
    from: ParticipantId;
    to: ParticipantId;
    label: string;
  }[] = [
    { from: "ue", to: "enb", label: "Uu" },
    { from: "enb", to: "mme", label: "S1-MME" },
    { from: "mme", to: "hss", label: "S6a" },
  ];

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950">
      <svg
        viewBox="0 0 800 300"
        className="block w-full min-w-[650px]"
        role="img"
        aria-labelledby={descriptionId}
      >
        <title id={descriptionId}>
          {step.title}. {step.message}.
          {local
            ? "Helyi művelet az MME-ben."
            : `Az üzenet ${from.label} felől ${to.label} felé halad.`}
        </title>

        <text
          x={30}
          y={34}
          fill="#fcd34d"
          fontSize={13}
          letterSpacing={2}
        >
          CONTROL PLANE · VEZÉRLÉSI ÜZENETEK
        </text>

        {connections.map((connection) => {
          const a = participants[connection.from];
          const b = participants[connection.to];

          const active =
            !local &&
            (
              (connection.from === fromId && connection.to === toId) ||
              (connection.from === toId && connection.to === fromId)
            );

          return (
            <g key={connection.label}>
              <line
                x1={a.x}
                y1={110}
                x2={b.x}
                y2={110}
                stroke={active ? "#fcd34d" : "#334155"}
                strokeWidth={active ? 3 : 2}
                strokeDasharray="6 5"
              />

              <text
                x={(a.x + b.x) / 2}
                y={90}
                textAnchor="middle"
                fill={active ? "#fcd34d" : "#64748b"}
                fontSize={12}
              >
                {connection.label}
              </text>
            </g>
          );
        })}

        {(Object.keys(participants) as ParticipantId[]).map((id) => {
          const node = participants[id];
          const active = id === fromId || id === toId;

          return (
            <g key={id} transform={`translate(${node.x}, 110)`}>
              <rect
                x={-60}
                y={-35}
                width={120}
                height={70}
                rx={14}
                fill="#0f172a"
                stroke={active ? "#fcd34d" : "#475569"}
                strokeWidth={active ? 2 : 1}
              />

              <text
                y={-3}
                textAnchor="middle"
                fill={active ? "#fcd34d" : "#e2e8f0"}
                fontSize={21}
                fontWeight={700}
              >
                {node.label}
              </text>

              <text
                y={20}
                textAnchor="middle"
                fill="#94a3b8"
                fontSize={11}
              >
                {node.subtitle}
              </text>
            </g>
          );
        })}

        {!local && (
          <g>
            <circle
              cx={packetX}
              cy={110}
              r={12}
              fill="#fcd34d"
              opacity={0.15}
            />
            <circle
              cx={packetX}
              cy={110}
              r={6}
              fill="#fcd34d"
              stroke="#020617"
              strokeWidth={2}
            />
          </g>
        )}

        {local && (
          <text
            x={500}
            y={178}
            textAnchor="middle"
            fill="#6ee7b7"
            fontSize={15}
            fontWeight={600}
          >
            {progress < 1 ? "Válasz ellenőrzése…" : "RES = XRES"}
          </text>
        )}

        <text
          x={400}
          y={220}
          textAnchor="middle"
          fill="#f1f5f9"
          fontSize={19}
          fontWeight={600}
        >
          {step.message}
        </text>

        <text
          x={400}
          y={249}
          textAnchor="middle"
          fill="#94a3b8"
          fontSize={13}
        >
          {step.transport}
        </text>

        <text
          x={400}
          y={282}
          textAnchor="middle"
          fill="#64748b"
          fontSize={12}
        >
          Egyszerűsített sikeres eset · az időzítés szemléltető
        </text>
      </svg>
    </div>
  );
}