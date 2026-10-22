import type { NodeId } from "../LteBasics/lteData";

export const panelClass =
  "rounded-3xl border border-slate-800 bg-slate-900/70 p-5 sm:p-8";

export const buttonClass =
  "rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 " +
  "text-sm text-slate-200 transition hover:bg-slate-700 " +
  "disabled:cursor-not-allowed disabled:opacity-40 " +
  "focus-visible:outline-2 focus-visible:outline-cyan-400";

export const SEGMENT_DURATION = 3;

export type EpcScenario = {
  id: string;
  title: string;
  plane: "user" | "control";
  packetLabel: string;
  route: NodeId[];
  steps: {
    title: string;
    text: string;
  }[];
};

export const scenarios: EpcScenario[] = [
  {
    id: "video",
    title: "Videó letöltése",
    plane: "user",
    packetLabel: "Videóadat",
    route: ["pdn", "pgw", "sgw", "enb", "ue"],
    steps: [
      {
        title: "Internet / CDN → P-GW",
        text:
          "A videószolgáltatás adatai a külső IP-hálózat felől érkeznek. A P-GW a mobil-előfizető PDN-kapcsolatának átjárója.",
      },
      {
        title: "P-GW → S-GW",
        text:
          "A felhasználói adat az átjárók közötti adatúton folytatja az útját. Nem kerül át az MME-re.",
      },
      {
        title: "S-GW → eNodeB",
        text:
          "Az S-GW a megfelelő eNodeB felé továbbítja a csomaghoz tartozó adatokat az S1-U kapcsolaton.",
      },
      {
        title: "eNodeB → UE",
        text:
          "A rádiós hozzáférésen át megérkezik az adat a telefonhoz. Az alkalmazás ezekből az adatokból állítja elő a lejátszható tartalmat.",
      },
    ],
  },
  {
    id: "nas",
    title: "UE–MME jelzés",
    plane: "control",
    packetLabel: "NAS-jelzés",
    route: ["ue", "enb", "mme"],
    steps: [
      {
        title: "UE → eNodeB",
        text:
          "A UE maghálózatnak szóló NAS-üzenetét a rádiós hozzáférés továbbítja. Az eNodeB közvetítő ebben a logikai kapcsolatban.",
      },
      {
        title: "eNodeB → MME",
        text:
          "A NAS-üzenet az S1-MME kapcsolaton jut az MME-hez. A logikai NAS-végpont a UE és az MME.",
      },
    ],
  },
  {
    id: "subscriber",
    title: "MME–HSS kapcsolat",
    plane: "control",
    packetLabel: "Vezérlési kérés",
    route: ["mme", "hss"],
    steps: [
      {
        title: "MME → HSS",
        text:
          "Az MME a HSS-sel kommunikálhat például előfizetői adatok vagy a hitelesítéshez szükséges információk ügyében. A választ külön üzenet viszi vissza.",
      },
    ],
  },
  {
    id: "session",
    title: "Átjárók vezérlése",
    plane: "control",
    packetLabel: "Session-kérés",
    route: ["mme", "sgw", "pgw"],
    steps: [
      {
        title: "MME → S-GW",
        text:
          "Az MME S11-en vezérlési kérést küldhet az S-GW-nek, például a kapcsolat létrehozásának részeként.",
      },
      {
        title: "S-GW → P-GW",
        text:
          "Az S-GW külön vezérlési üzenettel fordulhat a P-GW felé. A GTP-alapú S5 kapcsolatnak adat- és vezérlési oldala is van.",
      },
    ],
  },
  {
    id: "policy",
    title: "PCRF-szabályok",
    plane: "control",
    packetLabel: "Szabályjelzés",
    route: ["pcrf", "pgw"],
    steps: [
      {
        title: "PCRF → P-GW",
        text:
          "A PCRF szabályokat adhat át a P-GW-ben működő szabályérvényesítő funkciónak a Gx kapcsolaton. A videócsomagot nem a PCRF továbbítja.",
      },
    ],
  },
];