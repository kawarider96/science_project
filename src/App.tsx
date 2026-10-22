import { useState } from "react";
import MatrixMultiplication from "./notes/MatrixMultiplication";
import BasicLayout from "./components/BasicLayout";
import type { NavigationItem } from "./components/SidebarNavigation";
import LteBasics from "./notes/LteBasics/LteBasics";
import LteUe from "./notes/LteUe/LteUe";
import LteEutran from "./notes/LteEutran/LteEutran";
import LteEpc from "./notes/LteEpc/LteEpc";
import LteMme from "./notes/LteMme/LteMme";
import LteHss from "./notes/LteHss/LteHss";
import LteSgw from "./notes/LteSgw/LteSgw";
import OsiModel from "./notes/OsiModel/OsiModel";

const navigation: NavigationItem[] = [
  {
    id: "math",
    label: "Matek",
    children: [
      {
        id: "linear-algebra",
        label: "Lineáris algebra",
        children: [
          {
            id: "matrix-multiplication",
            label: "Mátrixszorzás",
          },
          {
            id: "determinants",
            label: "Determinánsok",
          },
        ],
      },
    ],
  },
  {
    id: "physics",
    label: "Fizika",
    children: [
      {
        id: "mechanics",
        label: "Mechanika",
        children: [
          {
            id: "kinetic-energy",
            label: "Mozgási energia",
          },
        ],
      },
    ],
  },
  {
    id: "informatics",
    label: "Informatika",
    children: [
      {
        id: "networks",
        label: "Hálózatok",
        children: [
          {
            id: "mobile-networks",
            label: "Mobilhálózatok",
            children: [
              {
                id: "4G-LTE",
                label: "4G / LTE",
                children: [
                  {
                    id: "lte-basics",
                    label: "LTE alapok és architektúra",
                  },
                  {
                    id: "lte-ue",
                    label: "UE – User Equipment",
                  },
                  {
                    id: "lte-eutran",
                    label: "E-UTRAN és eNodeB",
                  },
                  {
                    id: "lte-epc",
                    label: "EPC – Control és User Plane",
                  },
                  {
                    id: "lte-mme",
                    label: "MME – Mobilitás és vezérlés",
                  },
                  {
                    id: "lte-hss",
                    label: "HSS – Előfizetői adatbázis",
                  },
                  {
                    id: "lte-sgw",
                    label: "S-GW – Serving Gateway",
                  },
                ],
              },
            ],
          },
          {
            id: "osi-model",
            label: "OSI modell",
          },
        ],
      },
    ],
  },
];

const pages = {
  "osi-model": {
    title: "OSI modell",
    content: <OsiModel />,
  },
  "lte-sgw": {
    title: "S-GW – Serving Gateway",
    content: <LteSgw />,
  },
  "lte-hss": {
    title: "HSS – Home Subscriber Server",
    content: <LteHss />,
  },
  "lte-mme": {
    title: "MME – Mobility Management Entity",
    content: <LteMme />,
  },
  "lte-epc": {
    title: "EPC – Evolved Packet Core",
    content: <LteEpc />,
  },
  "lte-eutran": {
    title: "E-UTRAN és eNodeB",
    content: <LteEutran />,
  },
  "lte-ue": {
    title: "UE – User Equipment",
    content: <LteUe />,
  },
  "lte-basics": {
    title: "LTE alapok és architektúra",
    content: <LteBasics />,
  },
  "matrix-multiplication": {
    title: "Mátrixszorzás",
    content: <MatrixMultiplication />,
  },
  determinants: {
    title: "Determinánsok",
    content: (
      <p className="text-slate-400">
        A determinánsszámítás tananyaga készül.
      </p>
    ),
  },
  "kinetic-energy": {
    title: "Mozgási energia",
    content: (
      <p className="text-slate-400">
        A mozgási energia tananyaga készül.
      </p>
    ),
  },
};

type PageId = keyof typeof pages;

function isPageId(id: string): id is PageId {
  return Object.prototype.hasOwnProperty.call(pages, id);
}

export default function App() {
  const [activeId, setActiveId] = useState<PageId>(
    "matrix-multiplication",
  );

  const page = pages[activeId];

  return (
    <BasicLayout
      navigation={navigation}
      activeId={activeId}
      title={page.title}
      onNavigate={(id) => {
        if (isPageId(id)) {
          setActiveId(id);
        }
      }}
    >
      {page.content}
    </BasicLayout>
  );
}