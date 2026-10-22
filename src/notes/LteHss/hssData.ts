export const panelClass =
  "rounded-3xl border border-slate-800 bg-slate-900/70 p-5 sm:p-8";

export const buttonClass =
  "rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 " +
  "text-sm text-slate-200 transition hover:bg-slate-700 " +
  "disabled:cursor-not-allowed disabled:opacity-40 " +
  "focus-visible:outline-2 focus-visible:outline-cyan-400";

export type SubscriberField = {
  id: string;
  label: string;
  shortLabel: string;
  description: string;
  example: string;
  question: string;
};

export const subscriberFields: SubscriberField[] = [
  {
    id: "imsi",
    label: "IMSI",
    shortLabel: "Ki vagy?",
    description:
      "Az International Mobile Subscriber Identity az előfizető egyedi hálózati azonosítója.",
    example: "216011234567890",
    question: "Melyik előfizetőről beszélünk?",
  },
  {
    id: "profile",
    label: "Subscriber profile",
    shortLabel: "Mit használhatsz?",
    description:
      "Az előfizető szolgáltatási profilja. Meghatározza, milyen hálózati szolgáltatások használhatók.",
    example: "LTE: igen • data: igen • VoLTE: igen",
    question: "Milyen szolgáltatások engedélyezettek?",
  },
  {
    id: "auth",
    label: "Authentication information",
    shortLabel: "Valóban te vagy?",
    description:
      "A SIM és a hálózat kölcsönös hitelesítéséhez szükséges információk.",
    example: "EPS-AKA authentication vector",
    question: "Hogyan tudjuk bizonyítani, hogy jogos előfizető vagy?",
  },
  {
    id: "apn",
    label: "APN",
    shortLabel: "Melyik hálózat?",
    description:
      "Az Access Point Name meghatározza, milyen packet data networkhöz kapcsolódhat az előfizető.",
    example: "internet",
    question: "Milyen külső adathálózathoz férhetsz hozzá?",
  },
  {
    id: "roaming",
    label: "Roaming permissions",
    shortLabel: "Mehetsz külföldre?",
    description:
      "Meghatározza, hogy az előfizető használhat-e más szolgáltatóhoz tartozó hálózatot.",
    example: "EU roaming: allowed",
    question: "Használhatod ezt a hálózatot roaming közben?",
  },
  {
    id: "qos",
    label: "QoS profile",
    shortLabel: "Milyen minőség jár?",
    description:
      "Az előfizetőhöz kapcsolódó Quality of Service paraméterek és szolgáltatási korlátozások.",
    example: "priority / bandwidth / bearer parameters",
    question: "Milyen hálózati kiszolgálási paraméterek járnak?",
  },
];

export type AuthStep = {
  id: number;
  start: number;
  end: number;
  title: string;
  description: string;
  sender?: "UE" | "eNodeB" | "MME" | "HSS";
  receiver?: "UE" | "eNodeB" | "MME" | "HSS";
  message?: string;
};

export const AUTH_DURATION = 12;

export const authSteps: AuthStep[] = [
  {
    id: 1,
    start: 0,
    end: 2,
    title: "1. Attach Request",
    description:
      "A telefon jelzi az LTE hálózatnak, hogy csatlakozni szeretne.",
    sender: "UE",
    receiver: "eNodeB",
    message: "Attach Request",
  },
  {
    id: 2,
    start: 2,
    end: 4,
    title: "2. Az MME megkapja a kérést",
    description:
      "Az eNodeB továbbítja a vezérlési üzenetet az MME felé.",
    sender: "eNodeB",
    receiver: "MME",
    message: "S1AP / NAS",
  },
  {
    id: 3,
    start: 4,
    end: 6,
    title: "3. Authentication Data Request",
    description:
      "Az MME a HSS-től kér hitelesítési információt az előfizetőhöz.",
    sender: "MME",
    receiver: "HSS",
    message: "S6a • Diameter",
  },
  {
    id: 4,
    start: 6,
    end: 8,
    title: "4. Authentication Data Answer",
    description:
      "A HSS visszaadja az előfizető hitelesítéséhez szükséges adatokat.",
    sender: "HSS",
    receiver: "MME",
    message: "Authentication Vector",
  },
  {
    id: 5,
    start: 8,
    end: 10,
    title: "5. Előfizető hitelesítése",
    description:
      "Az MME és az UE végrehajtja az EPS-AKA hitelesítési folyamatot.",
    sender: "MME",
    receiver: "UE",
    message: "Authentication",
  },
  {
    id: 6,
    start: 10,
    end: 12,
    title: "6. Hozzáférés engedélyezhető",
    description:
      "Sikeres hitelesítés után folytatódhat az LTE kapcsolat és a bearer felépítése.",
  },
];