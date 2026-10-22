import { useId } from "react";
import { useTimeline } from "../LteBasics/useTimeline";
import { buttonClass } from "./ueData";

const DURATION = 6;

function clamp(value: number) {
  return Math.max(0, Math.min(1, value));
}

function smooth(value: number) {
  return value * value * (3 - 2 * value);
}

/**
 * Két készülék közötti fizikai SIM-áthelyezés szemléltetése.
 * Az azonosítók szimbolikus példák, nem valódi IMEI/IMSI értékek.
 * Az idővonalból származik minden mozgás és állapot.
 */
export default function SimTransfer() {
  const sliderId = useId();

  const clock = useTimeline({
    duration: DURATION,
    autoPlay: true,
    loop: false,
  });

  const movement = clamp((clock.time - 1.5) / 3);
  const eased = smooth(movement);

  const cardX = 185 + (575 - 185) * eased;
  const cardY = 245 - Math.sin(Math.PI * movement) * 100;

  const location =
    clock.time <= 1.5
      ? "a"
      : clock.time >= 4.5
        ? "b"
        : "moving";

  const description =
    location === "a"
      ? "Az előfizetés az A telefonban van: IMSI-X és IMEI-A tartozik a példában használt pároshoz."
      : location === "b"
        ? "Ugyanaz az előfizetés a B telefonba került: az IMSI-X maradt, a használt készülék IMEI-B."
        : "A kártyát éppen áthelyezzük. Az előfizetői azonosító a kártyával együtt mozog.";

  return (
    <div className="space-y-5">
      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950">
        <svg
          viewBox="0 0 760 395"
          className="block w-full min-w-[540px]"
          role="img"
          aria-label={description}
        >
          {[
            { id: "a", x: 185, title: "A telefon", imei: "IMEI-A" },
            { id: "b", x: 575, title: "B telefon", imei: "IMEI-B" },
          ].map((phone) => {
            const occupied = location === phone.id;

            return (
              <g key={phone.id}>
                <rect
                  x={phone.x - 105}
                  y={35}
                  width={210}
                  height={305}
                  rx={28}
                  fill="#0f172a"
                  stroke={occupied ? "#67e8f9" : "#475569"}
                  strokeWidth={2}
                />

                <rect
                  x={phone.x - 25}
                  y={48}
                  width={50}
                  height={5}
                  rx={3}
                  fill="#475569"
                />

                <text
                  x={phone.x}
                  y={91}
                  textAnchor="middle"
                  fill="#f1f5f9"
                  fontSize={21}
                  fontWeight={700}
                >
                  {phone.title}
                </text>

                <text
                  x={phone.x}
                  y={123}
                  textAnchor="middle"
                  fill="#c4b5fd"
                  fontSize={19}
                  fontWeight={600}
                >
                  {phone.imei}
                </text>

                <text
                  x={phone.x}
                  y={147}
                  textAnchor="middle"
                  fill="#94a3b8"
                  fontSize={12}
                >
                  A készülék saját azonosítója
                </text>

                <rect
                  x={phone.x - 76}
                  y={203}
                  width={152}
                  height={84}
                  rx={12}
                  fill="#020617"
                  stroke="#334155"
                  strokeDasharray="5 5"
                />

                <text
                  x={phone.x}
                  y={315}
                  textAnchor="middle"
                  fill={occupied ? "#67e8f9" : "#64748b"}
                  fontSize={13}
                >
                  {occupied
                    ? "A bemutatott kártya itt van"
                    : "A bemutatott kártya nincs itt"}
                </text>
              </g>
            );
          })}

          <g transform={`translate(${cardX}, ${cardY})`}>
            <path
              d="M-67,-34 H45 L67,-12 V34 H-67 Z"
              fill="#422006"
              stroke="#fcd34d"
              strokeWidth={2}
            />

            <text
              y={-7}
              textAnchor="middle"
              fill="#fcd34d"
              fontSize={17}
              fontWeight={700}
            >
              USIM
            </text>

            <text
              y={17}
              textAnchor="middle"
              fill="#fef3c7"
              fontSize={15}
            >
              IMSI-X
            </text>
          </g>

          <text
            x={380}
            y={377}
            textAnchor="middle"
            fill="#64748b"
            fontSize={12}
          >
            Szimbolikus azonosítók · ugyanaz a fizikai kártya
          </text>
        </svg>
      </div>

      <div className="min-h-24 rounded-xl bg-slate-950 p-4 leading-7 text-slate-300">
        {description}
      </div>

      <div>
        <div className="flex justify-between text-sm text-slate-400">
          <label htmlFor={sliderId}>SIM-áthelyezés</label>
          <span>{clock.time.toFixed(1)} / {DURATION} mp</span>
        </div>

        <input
          id={sliderId}
          type="range"
          min={0}
          max={DURATION}
          step={0.01}
          value={clock.time}
          aria-valuetext={`${clock.time.toFixed(1)} másodperc. ${description}`}
          onChange={(event) => clock.seek(Number(event.target.value))}
          className="mt-3 h-8 w-full cursor-pointer accent-cyan-400"
        />

        <div className="mt-3 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => clock.seek(0)}
            className={buttonClass}
          >
            A telefonban
          </button>

          <button
            type="button"
            onClick={clock.toggle}
            className={buttonClass}
          >
            {clock.playing
              ? "Szünet"
              : clock.time >= DURATION
                ? "Újrajátszás"
                : "Lejátszás"}
          </button>

          <button
            type="button"
            onClick={() => clock.seek(DURATION)}
            className={buttonClass}
          >
            B telefonban
          </button>
        </div>
      </div>

      <p className="text-sm leading-7 text-slate-500">
        Az animáció az azonosítók kapcsolatát mutatja.
        A kártya behelyezése után szükséges hálózati regisztrációt
        és hitelesítést itt nem modellezzük.
      </p>
    </div>
  );
}