export const panelClass =
  "rounded-3xl border border-slate-800 bg-slate-900/70 p-5 sm:p-8";

export type OsiLayer = {
  id: number;
  name: string;
  hungarianName: string;
  unit: string;
  job: string;
  question: string;
  examples: string[];
  devices: string[];
  protocols: string[];
};

export const osiLayers: OsiLayer[] = [
  {
    id: 7,
    name: "Application",
    hungarianName: "Alkalmazási réteg",
    unit: "Data",
    job: "Az alkalmazások hálózati szolgáltatásait kezeli.",
    question: "Mit akar az alkalmazás a hálózattól?",
    examples: [
      "Weboldal lekérése",
      "E-mail küldése",
      "DNS lekérdezés",
    ],
    devices: ["PC", "Telefon", "Szerver"],
    protocols: ["HTTP", "HTTPS", "DNS", "SMTP"],
  },
  {
    id: 6,
    name: "Presentation",
    hungarianName: "Megjelenítési réteg",
    unit: "Data",
    job: "Az adat formátumával, kódolásával, titkosításával és tömörítésével foglalkozik.",
    question: "Milyen formában legyen az adat?",
    examples: [
      "Titkosítás",
      "Karakterkódolás",
      "Adatformátum",
    ],
    devices: ["Végponti rendszer"],
    protocols: ["TLS gyakran ide szemléltethető"],
  },
  {
    id: 5,
    name: "Session",
    hungarianName: "Viszonyréteg",
    unit: "Data",
    job: "A kommunikációs munkamenetek felépítését és kezelését szemlélteti.",
    question: "Milyen kommunikációs kapcsolatban vagyunk?",
    examples: [
      "Session létrehozás",
      "Session fenntartás",
      "Session lezárás",
    ],
    devices: ["Végponti rendszer"],
    protocols: ["RPC", "NetBIOS session szemléltetésként"],
  },
  {
    id: 4,
    name: "Transport",
    hungarianName: "Szállítási réteg",
    unit: "Segment / Datagram",
    job: "Végpontok közötti szállítást, portokat és megbízhatóságot kezel.",
    question: "Melyik alkalmazásnak és hogyan vigyük oda?",
    examples: [
      "Portszámok",
      "Szegmentálás",
      "Megbízható átvitel",
    ],
    devices: ["Host", "Firewall", "Load balancer"],
    protocols: ["TCP", "UDP"],
  },
  {
    id: 3,
    name: "Network",
    hungarianName: "Hálózati réteg",
    unit: "Packet",
    job: "Logikai címzést és hálózatok közötti útvonalválasztást végez.",
    question: "Melyik hálózatban van a cél?",
    examples: [
      "IP cím",
      "Routing",
      "Hálózatok összekötése",
    ],
    devices: ["Router", "Layer 3 switch"],
    protocols: ["IPv4", "IPv6", "ICMP"],
  },
  {
    id: 2,
    name: "Data Link",
    hungarianName: "Adatkapcsolati réteg",
    unit: "Frame",
    job: "Azonos helyi hálózati szegmensen továbbítja a frame-eket.",
    question: "Melyik közvetlen hálózati eszköznek adjam át?",
    examples: [
      "MAC cím",
      "Ethernet frame",
      "Switching",
    ],
    devices: ["Switch", "Bridge", "NIC"],
    protocols: ["Ethernet", "802.11", "ARP kapcsolódó szereppel"],
  },
  {
    id: 1,
    name: "Physical",
    hungarianName: "Fizikai réteg",
    unit: "Bits",
    job: "A bitek fizikai továbbítását végzi elektromos, optikai vagy rádiós formában.",
    question: "Hogyan lesz a 0 és 1 valódi fizikai jel?",
    examples: [
      "Elektromos jel",
      "Fényimpulzus",
      "Rádióhullám",
    ],
    devices: ["Kábel", "Antenna", "Repeater"],
    protocols: ["Ethernet PHY", "Wi-Fi PHY"],
  },
];