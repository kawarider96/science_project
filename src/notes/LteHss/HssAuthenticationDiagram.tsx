import { authSteps } from "./hssData";

type Props = {
  time: number;
};

const positions = {
  UE: 70,
  eNodeB: 270,
  MME: 470,
  HSS: 670,
};

export function HssAuthenticationDiagram({ time }: Props) {
  const current =
    authSteps.find((step) => time >= step.start && time < step.end) ??
    authSteps[authSteps.length - 1];

  const senderX = current.sender ? positions[current.sender] : 0;
  const receiverX = current.receiver ? positions[current.receiver] : 0;

  const hasMessage = current.sender && current.receiver;

  const progress = hasMessage
    ? Math.min(
        1,
        Math.max(
          0,
          (time - current.start) / (current.end - current.start),
        ),
      )
    : 0;

  const packetX =
    senderX + (receiverX - senderX) * progress;

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox="0 0 740 290"
        className="min-w-[700px]"
        role="img"
        aria-label="LTE HSS authentication folyamat"
      >
        <defs>
          <filter id="packetGlow">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {Object.entries(positions).map(([name, x]) => (
          <g key={name}>
            <line
              x1={x}
              x2={x}
              y1="80"
              y2="250"
              stroke="#334155"
              strokeWidth="2"
              strokeDasharray="5 7"
            />

            <rect
              x={x - 58}
              y="20"
              width="116"
              height="58"
              rx="16"
              fill={
                name === "HSS"
                  ? "#2e1065"
                  : name === "MME"
                    ? "#083344"
                    : "#0f172a"
              }
              stroke={
                name === "HSS"
                  ? "#8b5cf6"
                  : name === "MME"
                    ? "#22d3ee"
                    : "#475569"
              }
            />

            <text
              x={x}
              y="55"
              textAnchor="middle"
              fill="#f8fafc"
              fontWeight="700"
              fontSize="15"
            >
              {name}
            </text>
          </g>
        ))}

        {hasMessage && (
          <>
            <line
              x1={senderX}
              x2={receiverX}
              y1="150"
              y2="150"
              stroke="#475569"
              strokeWidth="3"
            />

            <circle
              cx={packetX}
              cy="150"
              r="9"
              fill="#22d3ee"
              filter="url(#packetGlow)"
            />

            <text
              x={(senderX + receiverX) / 2}
              y="132"
              textAnchor="middle"
              fill="#94a3b8"
              fontSize="12"
              fontWeight="600"
            >
              {current.message}
            </text>
          </>
        )}

        <text
          x="370"
          y="220"
          textAnchor="middle"
          fill="#f8fafc"
          fontWeight="700"
          fontSize="17"
        >
          {current.title}
        </text>

        <foreignObject x="110" y="230" width="520" height="55">
            <div
                style={{
                margin: 0,
                textAlign: "center",
                fontSize: 13,
                lineHeight: 1.5,
                color: "#94a3b8",
                }}
            >
                {current.description}
            </div>
        </foreignObject>
      </svg>
    </div>
  );
}