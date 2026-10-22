export const panelClass =
  "rounded-3xl border border-slate-800 bg-slate-900/70 p-5 sm:p-8";

export const buttonClass =
  "rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 " +
  "text-sm text-slate-200 transition hover:bg-slate-700 " +
  "disabled:cursor-not-allowed disabled:opacity-40 " +
  "focus-visible:outline-2 focus-visible:outline-cyan-400";

export const responsibilities = [
  {
    title: "UE authentication",
    label: "Hitelesítés",
    question: "Valóban a megfelelő előfizető jelentkezik?",
    description:
      "Az MME a HSS-től kapott hitelesítési információkkal ellenőrzi a UE válaszát. A készülék oldalán a USIM is részt vesz az eljárásban.",
  },
  {
    title: "NAS signaling",
    label: "NAS-jelzés",
    question: "Hogyan egyeztet a készülék a maghálózattal?",
    description:
      "Az MME a UE NAS-vezérlésének hálózati végpontja. Az üzenetek az eNodeB-n keresztül jutnak el hozzá.",
  },
  {
    title: "Mobility management",
    label: "Mobilitás",
    question: "Hogyan marad elérhető a mozgó készülék?",
    description:
      "Az MME mobilitási és elérhetőségi állapotot kezel. Ez nem folyamatos GPS-követés.",
  },
  {
    title: "Bearer control",
    label: "Bearer-vezérlés",
    question: "Milyen logikai adatkapcsolatok tartoznak a UE-hez?",
    description:
      "Az MME részt vesz a bearerek létrehozásának, módosításának és megszüntetésének vezérlésében. A bearer adatcsomagjait nem ő továbbítja.",
  },
  {
    title: "Paging coordination",
    label: "Paging",
    question: "Hogyan keressük meg az idle készüléket?",
    description:
      "Az MME koordinálhatja a keresést a megfelelő területek eNodeB-i felé. A rádiós paginget az eNodeB sugározza ki.",
  },
  {
    title: "S-GW selection",
    label: "S-GW-választás",
    question: "Melyik Serving Gateway kezelje a kapcsolatot?",
    description:
      "Az MME megfelelő S-GW-t választ a hálózati konfiguráció és a kiszolgálási körülmények alapján.",
  },
  {
    title: "P-GW selection",
    label: "P-GW-választás",
    question: "Melyik átjárón érjük el a kívánt adathálózatot?",
    description:
      "A P-GW meghatározásában az APN, az előfizetői adatok és a szolgáltatói szabályok is szerepet kaphatnak. Az APN a kívánt adathálózati hozzáférést azonosítja.",
  },
] as const;

export const participants = {
  ue: { x: 100, label: "UE", subtitle: "Készülék + USIM" },
  enb: { x: 300, label: "eNodeB", subtitle: "Rádiós hozzáférés" },
  mme: { x: 500, label: "MME", subtitle: "NAS-végpont" },
  hss: { x: 700, label: "HSS", subtitle: "Hitelesítési háttér" },
} as const;

export type ParticipantId = keyof typeof participants;

export type AttachStep = {
  title: string;
  message: string;
  transport: string;
  path: ParticipantId[];
  explanation: string;
};

export const attachSteps: AttachStep[] = [
  {
    title: "A UE jelentkezik",
    message: "Attach Request",
    transport: "NAS az RRCConnectionSetupComplete üzenetben",
    path: ["ue", "enb"],
    explanation:
      "A UE NAS Attach Request üzenete a rádiós kapcsolatfelépítés részeként jut az eNodeB-hez. A rádiós előkészítés részleteit itt kihagyjuk.",
  },
  {
    title: "Az eNodeB továbbít az MME felé",
    message: "Initial UE Message",
    transport: "S1AP · benne a NAS Attach Request",
    path: ["enb", "mme"],
    explanation:
      "Az eNodeB az Attach Requestet S1AP üzenetben továbbítja. Az S1AP a szállító vezérlési protokoll; a NAS-üzenet logikai címzettje az MME.",
  },
  {
    title: "Az MME hitelesítési adatot kér",
    message: "Authentication Information Request",
    transport: "Diameter · S6a · AIR",
    path: ["mme", "hss"],
    explanation:
      "Az MME új, saját kérést küld a HSS-nek. Ebben a példában már ismert az IMSI, és friss hitelesítési vektorra van szükség.",
  },
  {
    title: "A HSS válaszol",
    message: "Authentication Information Answer",
    transport: "Diameter · S6a · AIA",
    path: ["hss", "mme"],
    explanation:
      "Az MME hitelesítési vektort kap: RAND, AUTN, XRES és K_ASME. A hosszú távú K titkos kulcsot nem kapja meg.",
  },
  {
    title: "A UE megkapja a kihívást",
    message: "Authentication Request",
    transport: "NAS · S1AP és RRC továbbítással",
    path: ["mme", "enb", "ue"],
    explanation:
      "A RAND és AUTN eljut a UE-hez. A USIM ellenőrzi a hálózati hitelesítési tokent, és siker esetén kiszámítja a választ.",
  },
  {
    title: "A UE visszaküldi a választ",
    message: "Authentication Response",
    transport: "NAS · RRC és S1AP továbbítással",
    path: ["ue", "enb", "mme"],
    explanation:
      "A UE a RES választ küldi vissza az MME-nek. A titkos K kulcs helyett a kihívásra számított válasz utazik.",
  },
  {
    title: "Az MME ellenőrzi az eredményt",
    message: "RES összehasonlítása XRES-szel",
    transport: "Helyi ellenőrzés az MME-ben",
    path: ["mme"],
    explanation:
      "A bemutató sikeres esetet mutat: a kapott RES egyezik a várt XRES-szel. Ez a hitelesítési részfolyamat vége, nem a teljes attach befejezése.",
  },
];

export const STEP_DURATION = 3;
export const ATTACH_DURATION = attachSteps.length * STEP_DURATION;