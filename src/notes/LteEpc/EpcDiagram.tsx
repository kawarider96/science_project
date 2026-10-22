import { useId } from "react";

import {
  getNode,
  links,
  nodes,
} from "../LteBasics/lteData";

import type { NodeId } from "../LteBasics/lteData";
import type { EpcScenario } from "./epcData";
import { SEGMENT_DURATION } from "./epcData";

/**
 * scenario: a megjelenített adatút vagy vezérlési kapcsolat.
 * time: az animáció aktuális ideje másodpercben.
 *
 * A hálózati pozíciókat az LTE-alapmodulból használjuk újra.
 */
type Props = {
  scenario: EpcScenario;
  time: number;
};

function sameConnection(
  a: NodeId,
  b: NodeId,
  c: NodeId,
  d: NodeId,
) {
  return (a === c && b === d) || (a === d && b === c);
}

export default function EpcDiagram({ scenario, time }: Props) {
  const descriptionId = useId();

  const stepCount = scenario.route.length - 1;
  const duration = stepCount * SEGMENT_DURATION;
  const position =
    Math.max(0, Math.min(time, duration)) / SEGMENT_DURATION;

  const segment = Math.min(stepCount - 1, Math.floor(position));
  const fraction = Math.min(1, position - segment);

  const from = getNode(scenario.route[segment]);
  const to = getNode(scenario.route[segment + 1]);

  const color = scenario.plane === "user" ? "#67e8f9" : "#fcd34d";

  const dx = to.x - from.x;
  const dy = to.y - from.y;

  // A mozgó jel a dobozok szélétől indul,
  // így nem takarja el a hálózati elem nevét.
  const edgeOffset = Math.min(
    dx === 0 ? Infinity : 57 / Math.abs(dx),
    dy === 0 ? Infinity : 32 / Math.abs(dy),
  );

  const travel = edgeOffset + (1 - 2 * edgeOffset) * fraction;
  const packetX = from.x + dx * travel;
  const packetY = from.y + dy * travel;

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950">
      <svg
        viewBox="0 0 900 470"
        className="block w-full min-w-[720px]"
        role="img"
        aria-labelledby={descriptionId}
      >
        <title id={descriptionId}>
          {scenario.title}. Útvonal:
          {scenario.route.map((id) => getNode(id).label).join(", ")}.
          Aktuális szakasz: {from.label} és {to.label} között.
        </title>

        <rect
          x={355}
          y={35}
          width={350}
          height={400}
          rx={20}
          fill="#0f172a"
          stroke="#334155"
        />

        <text
          x={530}
          y={23}
          textAnchor="middle"
          fill="#94a3b8"
          fontSize={13}
        >
          EPC és kapcsolódó szabályozási funkciók
        </text>

        {links.map((link) => {
          const start = getNode(link.from);
          const end = getNode(link.to);

          const onRoute = scenario.route.some((id, index) => {
            const next = scenario.route[index + 1];

            return next !== undefined &&
              sameConnection(id, next, link.from, link.to);
          });

          const current = sameConnection(
            from.id,
            to.id,
            link.from,
            link.to,
          );

          const linkColor = onRoute
            ? color
            : link.plane === "user"
              ? "#22d3ee"
              : "#fbbf24";

          const isControl = onRoute
            ? scenario.plane === "control"
            : link.plane === "control";

          const label =
            link.label === "S5"
              ? onRoute && scenario.plane === "control"
                ? "S5-C"
                : "S5-U"
              : link.label;

          return (
            <g
              key={`${link.from}-${link.to}`}
              opacity={onRoute ? 1 : 0.22}
            >
              <line
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke={linkColor}
                strokeWidth={current ? 4 : 2}
                strokeDasharray={isControl ? "6 5" : undefined}
              />

              <text
                x={link.labelX}
                y={link.labelY}
                textAnchor="middle"
                fill={linkColor}
                fontSize={13}
                fontWeight={600}
                stroke="#020617"
                strokeWidth={4}
                paintOrder="stroke"
              >
                {label}
              </text>
            </g>
          );
        })}

        {nodes.map((node) => {
          const active = node.id === from.id || node.id === to.id;

          return (
            <g
              key={node.id}
              transform={`translate(${node.x}, ${node.y})`}
            >
              <rect
                x={-57}
                y={-32}
                width={114}
                height={64}
                rx={13}
                fill="#020617"
                stroke={active ? color : "#475569"}
                strokeWidth={active ? 2 : 1}
              />

              <text
                y={-4}
                textAnchor="middle"
                fill={active ? color : "#e2e8f0"}
                fontSize={18}
                fontWeight={700}
              >
                {node.id === "pdn" ? "Internet" : node.label}
              </text>

              <text
                y={17}
                textAnchor="middle"
                fill="#94a3b8"
                fontSize={10}
              >
                {node.id === "pdn" ? "CDN / szerver" : node.subtitle}
              </text>
            </g>
          );
        })}

        <circle
          cx={packetX}
          cy={packetY}
          r={12}
          fill={color}
          opacity={0.18}
        />

        <circle
          cx={packetX}
          cy={packetY}
          r={6}
          fill={color}
          stroke="#020617"
          strokeWidth={2}
        />

        <text
          x={25}
          y={451}
          fill={color}
          fontSize={13}
        >
          {scenario.plane === "user"
            ? "Folytonos kiemelés: felhasználói adat"
            : "Szaggatott kiemelés: vezérlési jelzés"}
        </text>
      </svg>
    </div>
  );
}