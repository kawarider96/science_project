import { useId } from "react";
import {
  DURATION,
  SEGMENT_DURATION,
  getNode,
  links,
  nodes,
  userRoute,
} from "./lteData";

import type { Direction, NodeId, Plane } from "./lteData";

/**
 * time: az adatút időpontja 0–12 másodperc között.
 * plane: felhasználói adatút vagy vezérlési kapcsolatok.
 * direction: feltöltési vagy letöltési irány.
 * selected: a részletesen vizsgált hálózati elem.
 */
type Props = {
  time: number;
  plane: Plane;
  direction: Direction;
  selected?: NodeId;
};

export default function LteDiagram({
  time,
  plane,
  direction,
  selected,
}: Props) {
  const descriptionId = useId();

  const route =
    direction === "uplink" ? userRoute : [...userRoute].reverse();

  const position = Math.min(
    Math.max(time, 0),
    DURATION,
  ) / SEGMENT_DURATION;

  const segment = Math.min(3, Math.floor(position));
  const fraction = Math.min(1, position - segment);

  const from = getNode(route[segment]);
  const to = getNode(route[segment + 1]);

  const packetX = from.x + (to.x - from.x) * fraction;
  const packetY = from.y + (to.y - from.y) * fraction;

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950">
      <svg
        viewBox="0 0 900 470"
        className="block w-full min-w-[720px]"
        role="img"
        aria-labelledby={descriptionId}
      >
        <title id={descriptionId}>
          {plane === "user"
            ? `LTE adatút, ${
                direction === "uplink" ? "feltöltés" : "letöltés"
              }: ${route.map((id) => getNode(id).label).join(", ")}.`
            : "Vezérlési kapcsolatok: eNodeB–MME, MME–HSS, MME–S-GW és PCRF–P-GW."}
        </title>

        <rect
          x={175}
          y={205}
          width={140}
          height={115}
          rx={18}
          fill="#0c4a6e"
          fillOpacity={0.12}
          stroke="#334155"
        />

        <text x={245} y={194} textAnchor="middle" fill="#94a3b8" fontSize={13}>
          E-UTRAN
        </text>

        <rect
          x={355}
          y={35}
          width={350}
          height={400}
          rx={20}
          fill="#0f172a"
          stroke="#334155"
        />

        <text x={530} y={24} textAnchor="middle" fill="#94a3b8" fontSize={13}>
          EPC · maghálózat és szabályozási funkciók
        </text>

        {links.map((link) => {
          const start = getNode(link.from);
          const end = getNode(link.to);
          const active = plane === link.plane;
          const color = link.plane === "user" ? "#22d3ee" : "#fbbf24";

          return (
            <g
              key={`${link.from}-${link.to}`}
              opacity={active ? 1 : 0.22}
            >
              <line
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke={color}
                strokeWidth={active ? 3 : 1.5}
                strokeDasharray={link.plane === "control" ? "6 5" : undefined}
              />

              <text
                x={link.labelX}
                y={link.labelY}
                textAnchor="middle"
                fill={color}
                fontSize={13}
                fontWeight={600}
                stroke="#020617"
                strokeWidth={4}
                paintOrder="stroke"
              >
                {link.label}
              </text>
            </g>
          );
        })}

        {nodes.map((node) => {
          const onPath =
            plane === "user" &&
            (node.id === from.id || node.id === to.id);

          const inspecting = selected === node.id;
          const color = inspecting
            ? "#a78bfa"
            : onPath
              ? "#22d3ee"
              : "#475569";

          return (
            <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
              <rect
                x={-57}
                y={-32}
                width={114}
                height={64}
                rx={13}
                fill="#0f172a"
                stroke={color}
                strokeWidth={inspecting || onPath ? 2 : 1}
              />

              <text
                y={-4}
                textAnchor="middle"
                fill="#f1f5f9"
                fontSize={18}
                fontWeight={700}
              >
                {node.label}
              </text>

              <text
                y={17}
                textAnchor="middle"
                fill="#94a3b8"
                fontSize={10}
              >
                {node.subtitle}
              </text>
            </g>
          );
        })}

        {plane === "user" && (
          <g>
            <circle
              cx={packetX}
              cy={packetY + 42}
              r={13}
              fill="#22d3ee"
              opacity={0.13}
            />

            <circle
              cx={packetX}
              cy={packetY + 42}
              r={6}
              fill="#67e8f9"
            />

            <text
              x={packetX}
              y={packetY + 66}
              textAnchor="middle"
              fill="#67e8f9"
              fontSize={11}
            >
              IP-adat
            </text>
          </g>
        )}

        <text x={25} y={453} fill="#64748b" fontSize={12}>
          Logikai ábra · nem fizikai kábelezés · nem valós késleltetési modell
        </text>
      </svg>
    </div>
  );
}