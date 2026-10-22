export const panelClass =
  "rounded-3xl border border-slate-800 bg-slate-900/70 p-5 sm:p-8";

export const buttonClass =
  "rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 " +
  "text-sm text-slate-200 transition hover:bg-slate-700 " +
  "focus-visible:outline-2 focus-visible:outline-cyan-400";

export const enodebFunctions = [
  {
    id: "rrm",
    title: "Erőforrás-kezelés",
    english: "Radio Resource Management",
    color: "#67e8f9",
    question: "Hogyan használjuk a rendelkezésre álló rádiós kapacitást?",
    description:
      "Az eNodeB kezeli a rádiós kapcsolatokat és a hozzájuk rendelt erőforrásokat. A kapacitás véges, ezért a készülékek igényeit össze kell hangolni.",
    example:
      "Egy új kapcsolat erőforrásigényét a már kiszolgált forgalom mellett kell kezelni.",
  },
  {
    id: "scheduling",
    title: "Ütemezés",
    english: "Scheduling / Packet Scheduling",
    color: "#93c5fd",
    question: "Ki, mikor és milyen rádiós erőforrást használhat?",
    description:
      "Az ütemező a készülékek között osztja el a rádiós erőforrásokat feltöltési és letöltési irányban. Figyelembe veheti a várakozó adatokat, a rádiós állapotot és a szolgáltatási követelményeket.",
    example:
      "Három aktív készülék nem automatikusan három egyenlő részt kap. A kiosztás a körülmények és az ütemezési algoritmus szerint változik.",
  },
  {
    id: "adaptation",
    title: "Linkadaptáció",
    english: "Modulation and Coding Selection",
    color: "#c4b5fd",
    question: "Milyen átviteli beállítással küldjük az adatot?",
    description:
      "A rádiós viszonyokhoz igazítjuk a modulációt és a kódolást. A nagyobb spektrális hatékonyság megfelelő jelminőséget igényel.",
    example:
      "Jó rádiós körülmények között több adat férhet ugyanakkora rádiós erőforrásba. Rosszabb körülmények között robusztusabb beállítás szükséges.",
  },
  {
    id: "handover",
    title: "Mobilitás",
    english: "Handover",
    color: "#6ee7b7",
    question: "Hogyan folytatódjon a kapcsolat mozgás közben?",
    description:
      "Az eNodeB a UE méréseit és hálózati információkat is felhasználva közreműködik a másik cellára történő átadásban. Ehhez más hálózati elemekkel is együttműködik.",
    example:
      "Utazás közben a készülék átkerülhet egy másik eNodeB által kiszolgált cellára.",
  },
  {
    id: "security",
    title: "Biztonság",
    english: "Ciphering and Integrity Protection",
    color: "#fcd34d",
    question: "Hogyan védjük a rádiós kommunikációt?",
    description:
      "Az eNodeB az LTE rádiós hozzáférési biztonságának egyik végpontja. Részt vesz a felhasználói adat titkosításában és a megfelelő vezérlési üzenetek védelmében.",
    example:
      "A rádiós titkosítás a UE és az eNodeB közötti szakaszt védi. Ez nem helyettesíti a HTTPS-t vagy az alkalmazás végpontok közötti titkosítását.",
  },
  {
    id: "qos",
    title: "Szolgáltatásminőség",
    english: "Quality of Service",
    color: "#f9a8d4",
    question: "Melyik forgalomnak milyen kiszolgálásra van szüksége?",
    description:
      "A hálózat által beállított bearer- és QoS-paraméterek befolyásolják a rádiós kiszolgálást. Nem minden adatfolyamnak azonosak a késleltetési és veszteségi követelményei.",
    example:
      "Egy beszélgetés érzékenyebb lehet a késésre, mint egy háttérben futó fájlletöltés. A QoS azonban nem jelent korlátlan kapacitást.",
  },
] as const;