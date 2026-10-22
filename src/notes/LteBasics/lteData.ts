export type NodeId =
  | "ue"
  | "enb"
  | "sgw"
  | "pgw"
  | "pdn"
  | "mme"
  | "hss"
  | "pcrf";

export type Plane = "user" | "control";
export type Direction = "uplink" | "downlink";

export type NetworkNode = {
  id: NodeId;
  label: string;
  subtitle: string;
  x: number;
  y: number;
  description: string;
};

export const nodes: NetworkNode[] = [
  {
    id: "ue",
    label: "UE",
    subtitle: "Végberendezés",
    x: 80,
    y: 260,
    description:
      "User Equipment: például telefon vagy LTE-modem. A rádiós hálózaton keresztül kapcsolódik a szolgáltatóhoz.",
  },
  {
    id: "enb",
    label: "eNodeB",
    subtitle: "Bázisállomás",
    x: 245,
    y: 260,
    description:
      "A rádiós kapcsolatot kezelő bázisállomás. Az E-UTRAN ilyen csomópontokból áll. A telefon adatforgalmát az EPC felé továbbítja.",
  },
  {
    id: "sgw",
    label: "S-GW",
    subtitle: "Serving Gateway",
    x: 435,
    y: 260,
    description:
      "A felhasználói csomagokat továbbító átjáró. Az LTE-n belüli mobilitásnál az adatút egyik horgonypontja.",
  },
  {
    id: "pgw",
    label: "P-GW",
    subtitle: "PDN Gateway",
    x: 625,
    y: 260,
    description:
      "A külső csomagkapcsolt adathálózat felé vezető átjáró. A PDN-kapcsolathoz tartozó IP-címzésben és a forgalmi szabályok érvényesítésében is szerepe van.",
  },
  {
    id: "pdn",
    label: "PDN",
    subtitle: "Külső IP-hálózat",
    x: 815,
    y: 260,
    description:
      "Packet Data Network: például az internet vagy egy szolgáltatói IP-hálózat. Nem minden PDN a nyilvános internet.",
  },
  {
    id: "mme",
    label: "MME",
    subtitle: "Mobilitásvezérlés",
    x: 435,
    y: 100,
    description:
      "Mobility Management Entity: a hozzáférés és mobilitás vezérlésének fontos eleme. A bemutatott hagyományos LTE-adatúton nem továbbítja a felhasználó internetes csomagjait.",
  },
  {
    id: "hss",
    label: "HSS",
    subtitle: "Előfizetői adatok",
    x: 625,
    y: 100,
    description:
      "Home Subscriber Server: előfizetői profilokat és a hitelesítéshez szükséges adatokat kezel. Nem az internetforgalom tranzitpontja.",
  },
  {
    id: "pcrf",
    label: "PCRF",
    subtitle: "Forgalmi szabályok",
    x: 625,
    y: 390,
    description:
      "Policy and Charging Rules Function: szolgáltatásminőségi és díjazáshoz kapcsolódó forgalmi szabályokról dönt. Nem továbbítja a felhasználó adatcsomagjait.",
  },
];

export type NetworkLink = {
  from: NodeId;
  to: NodeId;
  label: string;
  plane: Plane;
  labelX: number;
  labelY: number;
};

export const links: NetworkLink[] = [
  {
    from: "ue", to: "enb", label: "Uu",
    plane: "user", labelX: 162, labelY: 242,
  },
  {
    from: "enb", to: "sgw", label: "S1-U",
    plane: "user", labelX: 340, labelY: 242,
  },
  {
    from: "sgw", to: "pgw", label: "S5",
    plane: "user", labelX: 530, labelY: 242,
  },
  {
    from: "pgw", to: "pdn", label: "SGi",
    plane: "user", labelX: 720, labelY: 242,
  },
  {
    from: "enb", to: "mme", label: "S1-MME",
    plane: "control", labelX: 302, labelY: 155,
  },
  {
    from: "mme", to: "hss", label: "S6a",
    plane: "control", labelX: 530, labelY: 82,
  },
  {
    from: "mme", to: "sgw", label: "S11",
    plane: "control", labelX: 458, labelY: 184,
  },
  {
    from: "pcrf", to: "pgw", label: "Gx",
    plane: "control", labelX: 649, labelY: 332,
  },
];

export const userRoute: NodeId[] = [
  "ue", "enb", "sgw", "pgw", "pdn",
];

export const routeSteps = [
  {
    label: "Uu · rádiós kapcsolat",
    text:
      "A UE és az eNodeB között rádión jut át az adat. A rádiós protokollok viszik át az IP-csomaghoz tartozó adatokat.",
  },
  {
    label: "S1-U · hozzáférési hálózat és EPC",
    text:
      "Az eNodeB és az S-GW között a felhasználói adat GTP-U alagútban halad. Az MME nem része ennek az adatútnak.",
  },
  {
    label: "S5 · a két átjáró között",
    text:
      "Az S-GW és a P-GW között folytatódik az adat továbbítása. Itt egy szolgáltatón belüli, GTP-alapú példát mutatunk; roamingnál S8 is szerepelhet.",
  },
  {
    label: "SGi · kapcsolat a PDN-nel",
    text:
      "A P-GW a külső IP-hálózathoz kapcsolódik. Az interneten további útválasztók vezetnek a tényleges szerverhez.",
  },
];

export const DURATION = 12;
export const SEGMENT_DURATION = DURATION / 4;

export const panelClass =
  "rounded-3xl border border-slate-800 bg-slate-900/70 p-5 sm:p-8";

export const buttonClass =
  "rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 " +
  "text-sm text-slate-200 transition hover:bg-slate-700 " +
  "disabled:cursor-not-allowed disabled:opacity-40 " +
  "focus-visible:outline-2 focus-visible:outline-cyan-400";

export function getNode(id: NodeId) {
  return nodes.find((node) => node.id === id)!;
}