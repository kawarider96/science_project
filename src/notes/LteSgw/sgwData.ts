export const panelClass =
  "rounded-3xl border border-slate-800 bg-slate-900/70 p-5 sm:p-8";

export const buttonClass =
  "rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 " +
  "text-sm text-slate-200 transition hover:bg-slate-700 " +
  "disabled:cursor-not-allowed disabled:opacity-40 " +
  "focus-visible:outline-2 focus-visible:outline-emerald-400";

export type HandoverStep = {
  id: number;
  start: number;
  end: number;
  title: string;
  description: string;
};

export const HANDOVER_DURATION = 10;

export const handoverSteps: HandoverStep[] = [
  {
    id: 1,
    start: 0,
    end: 2,
    title: "1. UE az eNodeB1-hez kapcsolódik",
    description:
      "A telefon jelenleg az eNodeB1 rádiós celláján keresztül kommunikál.",
  },
  {
    id: 2,
    start: 2,
    end: 4,
    title: "2. A user-plane adatút aktív",
    description:
      "A felhasználói adat UE → eNodeB1 → S-GW → P-GW útvonalon halad.",
  },
  {
    id: 3,
    start: 4,
    end: 6,
    title: "3. Handover indul",
    description:
      "A UE átkerül az eNodeB1-ről az eNodeB2-re.",
  },
  {
    id: 4,
    start: 6,
    end: 8,
    title: "4. Új rádiós útvonal",
    description:
      "Az adatút most már az eNodeB2-n keresztül éri el ugyanazt az S-GW-t.",
  },
  {
    id: 5,
    start: 8,
    end: 10,
    title: "5. Az S-GW anchor marad",
    description:
      "A rádiós hozzáférési pont megváltozott, de az S-GW megmaradhat, így a packet session folytonossága fenntartható.",
  },
];