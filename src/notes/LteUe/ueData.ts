export const panelClass =
  "rounded-3xl border border-slate-800 bg-slate-900/70 p-5 sm:p-8";

export const buttonClass =
  "rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 " +
  "text-sm text-slate-200 transition hover:bg-slate-700 " +
  "focus-visible:outline-2 focus-visible:outline-cyan-400";

export const ueParts = [
  {
    id: "app",
    title: "Application",
    subtitle: "Alkalmazás",
    color: "#67e8f9",
    description:
      "Például böngésző, üzenetküldő vagy videólejátszó. Hálózati szolgáltatásokat használ, de nem közvetlenül a rádiót vezérli.",
    example:
      "Megnyitsz egy weboldalt: a böngésző hálózati kérést indít.",
  },
  {
    id: "ip",
    title: "IP stack",
    subtitle: "Hálózati protokollok",
    color: "#93c5fd",
    description:
      "Az operációs rendszer hálózati rétegei kezelik például az IP-címzést és a szállítási protokollokat. A modem felé IP-adat kerül.",
    example:
      "A webes kommunikáció történhet TCP vagy QUIC használatával; az LTE felé IP-csomagokat kell továbbítani.",
  },
  {
    id: "modem",
    title: "LTE modem",
    subtitle: "Baseband és protokollok",
    color: "#c4b5fd",
    description:
      "A mobilkommunikáció digitális feldolgozását és protokolljait kezeli. Ide tartozik többek között a cellakeresés, az RRC és NAS működése, valamint a rádiós adatfeldolgozás.",
    example:
      "A készülék megfelelő cellát keres, majd elindítja a hálózati csatlakozáshoz szükséges eljárásokat.",
  },
  {
    id: "rf",
    title: "RF hardware",
    subtitle: "Rádiófrekvenciás hardver",
    color: "#6ee7b7",
    description:
      "Adó-vevő, erősítők, szűrők és antennák. A digitális kommunikáció és a tényleges rádiófrekvenciás jel között teremt kapcsolatot.",
    example:
      "Az antenna elektromágneses jelet sugároz ki, illetve vesz a bázisállomás felől.",
  },
  {
    id: "usim",
    title: "USIM",
    subtitle: "Előfizetői alkalmazás",
    color: "#fcd34d",
    description:
      "A UICC-n működő biztonságos alkalmazás. Az előfizető azonosításához és hitelesítéséhez szükséges adatokat és funkciókat biztosítja.",
    example:
      "A hitelesítési eljárásban közreműködik, de a böngésződ adatcsomagjai nem rajta keresztül haladnak.",
  },
] as const;

export type UePartId = (typeof ueParts)[number]["id"];

export const modemFunctions = [
  {
    title: "Cellakeresés",
    description:
      "Rádiós jelek keresése, szinkronizáció és a cella alapinformációinak feldolgozása.",
  },
  {
    title: "Rádiós adatfeldolgozás",
    description:
      "A digitális adatok rádiós átvitelhez szükséges feldolgozása, például kódolás és moduláció.",
  },
  {
    title: "RRC-jelzés",
    description:
      "Radio Resource Control: a UE és az eNodeB közötti rádiós vezérlés.",
  },
  {
    title: "NAS-jelzés",
    description:
      "Non-Access Stratum: a UE és az MME közötti vezérlés, például regisztráció és mobilitáskezelés.",
  },
  {
    title: "Biztonsági funkciók",
    description:
      "Az egyeztetett biztonsági eljárások részeként titkosítás és a megfelelő vezérlési üzenetek integritásvédelme.",
  },
  {
    title: "Mobilitás",
    description:
      "Mérések, cella-újraválasztás és közreműködés a hálózat által vezérelt handoverben.",
  },
];