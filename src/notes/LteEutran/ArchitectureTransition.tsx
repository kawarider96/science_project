import { useId } from "react";
import { useTimeline } from "../LteBasics/useTimeline";
import { buttonClass } from "./eutranData";

const DURATION = 8;

function clamp(value: number) {
  return Math.max(0, Math.min(1, value));
}

function smooth(value: number) {
  return value * value * (3 - 2 * value);
}

function mix(from: number, to: number, amount: number) {
  return from + (to - from) * amount;
}

/**
 * Önálló hálózati csomópont az összehasonlító ábrán.
 * Az x és y a doboz középpontja.
 */
function NodeBox({
  x,
  y,
  title,
  subtitle,
  color,
  opacity = 1,
}: {
  x: number;
  y: number;
  title: string;
  subtitle: string;
  color: string;
  opacity?: number;
}) {
  return (
    <g
      transform={`translate(${x}, ${y})`}
      opacity={opacity}
    >
      <rect
        x={-67}
        y={-38}
        width={134}
        height={76}
        rx={16}
        fill="#0f172a"
        stroke={color}
        strokeWidth={2}
      />

      <text
        y={-3}
        textAnchor="middle"
        fill={color}
        fontSize={22}
        fontWeight={700}
      >
        {title}
      </text>

      <text
        y={21}
        textAnchor="middle"
        fill="#94a3b8"
        fontSize={12}
      >
        {subtitle}
      </text>
    </g>
  );
}

/**
 * A 3G és LTE logikai architektúrájának összehasonlítása.
 * A köztes képkockák szemléltető átmenetek, nem működő
 * hálózatok állapotai vagy egy valódi migráció lépései.
 */
export default function ArchitectureTransition() {
  const sliderId = useId();
  const descriptionId = useId();

  const clock = useTimeline({
    duration: DURATION,
    autoPlay: true,
    loop: false,
  });

  const progress = clamp((clock.time - 2) / 4);
  const eased = smooth(progress);

  const coreX = mix(700, 570, eased);
  const functionX = mix(500, 300, eased);
  const rncOpacity = 1 - clamp(progress * 1.5);

  const isLte = clock.time >= 6;
  const isUmts = clock.time <= 2;

  const caption = isUmts
    ? "A hagyományos 3G UTRAN-ban a NodeB és a maghálózat között külön RNC vezérlő található."
    : isLte
      ? "Az LTE E-UTRAN-ban nincs külön RNC. Az eNodeB a bázisállomás és számos rádiós vezérlési funkció szerepét is ellátja."
      : "Összehasonlító átmenet: a korábbi RNC rádiós vezérlési funkcióinak jelentős része az eNodeB-hez kerül.";

  return (
    <div className="space-y-5">
      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950">
        <svg
          viewBox="0 0 800 410"
          className="block w-full min-w-[650px]"
          role="img"
          aria-labelledby={descriptionId}
        >
          <title id={descriptionId}>{caption}</title>

          <text
            x={40}
            y={45}
            fill={isLte ? "#67e8f9" : "#fcd34d"}
            fontSize={20}
            fontWeight={700}
          >
            {isUmts
              ? "3G · UTRAN"
              : isLte
                ? "LTE · E-UTRAN"
                : "A funkciók elosztása változik"}
          </text>

          <text
            x={40}
            y={73}
            fill="#94a3b8"
            fontSize={13}
          >
            Rádiós hozzáférés és kapcsolat a maghálózathoz
          </text>

          <line
            x1={100}
            y1={160}
            x2={coreX}
            y2={160}
            stroke="#475569"
            strokeWidth={3}
          />

          <NodeBox
            x={100}
            y={160}
            title="UE"
            subtitle="Végberendezés"
            color="#94a3b8"
          />

          <NodeBox
            x={300}
            y={160}
            title={isLte ? "eNodeB" : "NodeB"}
            subtitle={isLte ? "Rádió + vezérlés" : "Bázisállomás"}
            color={isLte ? "#67e8f9" : "#93c5fd"}
          />

          <NodeBox
            x={500}
            y={160}
            title="RNC"
            subtitle="Külön rádiós vezérlő"
            color="#fcd34d"
            opacity={rncOpacity}
          />

          <NodeBox
            x={coreX}
            y={160}
            title={isLte ? "EPC" : "Core"}
            subtitle="Maghálózat"
            color="#c4b5fd"
          />

          <line
            x1={functionX}
            y1={205}
            x2={functionX}
            y2={240}
            stroke="#fcd34d"
            strokeWidth={2}
            strokeDasharray="5 5"
          />

          <g transform={`translate(${functionX}, 275)`}>
            <rect
              x={-110}
              y={-35}
              width={220}
              height={70}
              rx={14}
              fill="#422006"
              stroke="#fcd34d"
              strokeOpacity={0.6}
            />

            <text
              y={-5}
              textAnchor="middle"
              fill="#fcd34d"
              fontSize={15}
              fontWeight={700}
            >
              Rádiós vezérlési
            </text>

            <text
              y={18}
              textAnchor="middle"
              fill="#fef3c7"
              fontSize={15}
            >
              funkciók jelentős része
            </text>
          </g>

          <text
            x={400}
            y={365}
            textAnchor="middle"
            fill="#94a3b8"
            fontSize={14}
          >
            {isLte
              ? "A rádiós hozzáférésből eltűnik a külön RNC-szint."
              : "A vezérlés feladatai megmaradnak, az elhelyezésük változik."}
          </text>

          <text
            x={400}
            y={391}
            textAnchor="middle"
            fill="#64748b"
            fontSize={12}
          >
            Fogalmi összehasonlítás · nem valós hálózatmigráció
          </text>
        </svg>
      </div>

      <div className="min-h-28 rounded-2xl bg-slate-950 p-5 leading-7 text-slate-300">
        {caption}
      </div>

      <div>
        <div className="flex justify-between text-sm text-slate-400">
          <label htmlFor={sliderId}>3G → LTE összehasonlítás</label>
          <span>{clock.time.toFixed(1)} / {DURATION} mp</span>
        </div>

        <input
          id={sliderId}
          type="range"
          min={0}
          max={DURATION}
          step={0.01}
          value={clock.time}
          aria-valuetext={`${clock.time.toFixed(1)} másodperc. ${caption}`}
          onChange={(event) => clock.seek(Number(event.target.value))}
          className="mt-3 h-8 w-full cursor-pointer accent-cyan-400"
        />

        <div className="mt-3 flex flex-wrap gap-3">
          <button
            type="button"
            className={buttonClass}
            onClick={() => clock.seek(0)}
          >
            3G felépítés
          </button>

          <button
            type="button"
            className={buttonClass}
            onClick={clock.toggle}
          >
            {clock.playing
              ? "Szünet"
              : clock.time >= DURATION
                ? "Újrajátszás"
                : "Lejátszás"}
          </button>

          <button
            type="button"
            className={buttonClass}
            onClick={() => clock.seek(DURATION)}
          >
            LTE felépítés
          </button>
        </div>
      </div>

      <p className="text-sm leading-7 text-slate-500">
        Nem minden RNC-funkció került egy az egyben az eNodeB-be.
        Az animáció a rádiós hozzáférés egyszerűsödésének alapelvét
        emeli ki. A 3G maghálózat és az EPC sem ugyanaz a rendszer.
      </p>
    </div>
  );
}