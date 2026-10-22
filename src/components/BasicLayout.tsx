import { useId, useState } from "react";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

import SidebarNavigation from "./SidebarNavigation";
import type { NavigationItem } from "./SidebarNavigation";

/**
 * children: az aktuális tananyagoldal tartalma.
 * navigation: a navigáció menüpontjai.
 * activeId: a kiválasztott tananyag azonosítója.
 * onNavigate: menüpont kiválasztásakor fut.
 * title: a fejlécben megjelenő oldalcím.
 */
type BasicLayoutProps = {
  children: ReactNode;
  navigation: NavigationItem[];
  activeId: string;
  onNavigate: (id: string) => void;
  title: string;
};

export default function BasicLayout({
  children,
  navigation,
  activeId,
  onNavigate,
  title,
}: BasicLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const navigationId = useId();

  function handleNavigate(id: string) {
    onNavigate(id);

    // Mobilon választás után újra a tananyag kapja a helyet.
    if (window.matchMedia("(max-width: 767px)").matches) {
      setSidebarOpen(false);
    }
  }

  return (
    <div className="min-h-dvh bg-slate-950 text-slate-100">
      <a
        href="#main-content"
        className={[
          "sr-only focus:not-sr-only",
          "fixed left-4 top-4 z-50 rounded-lg",
          "bg-cyan-300 px-4 py-2 text-slate-950",
        ].join(" ")}
      >
        Ugrás a tartalomhoz
      </a>

      <div className="flex min-h-dvh">
        <motion.aside
          initial={false}
          animate={{ width: sidebarOpen ? 288 : 72 }}
          transition={{
            duration: reducedMotion ? 0 : 0.22,
            ease: "easeInOut",
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setSidebarOpen(false);
            }
          }}
          className={[
            "fixed inset-y-0 left-0 z-30",
            "flex flex-col overflow-hidden",
            "border-r border-slate-800 bg-slate-900",
            "md:sticky md:top-0 md:h-dvh md:shrink-0",
          ].join(" ")}
        >
          <div className="flex h-20 shrink-0 items-center gap-3 border-b border-slate-800 px-4">
            <button
              type="button"
              aria-label={
                sidebarOpen
                  ? "Navigáció becsukása"
                  : "Navigáció megnyitása"
              }
              aria-expanded={sidebarOpen}
              aria-controls={navigationId}
              onClick={() => setSidebarOpen((value) => !value)}
              className={[
                "flex h-10 w-10 shrink-0 items-center justify-center",
                "rounded-xl border border-slate-700",
                "text-slate-300 transition hover:bg-slate-800",
                "hover:text-white focus-visible:outline-2",
                "focus-visible:outline-cyan-400",
              ].join(" ")}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                className="h-5 w-5"
                aria-hidden="true"
              >
                {sidebarOpen ? (
                  <path
                    d="m6 6 12 12M6 18 18 6"
                    strokeLinecap="round"
                  />
                ) : (
                  <path
                    d="M4 6h16M4 12h16M4 18h16"
                    strokeLinecap="round"
                  />
                )}
              </svg>
            </button>

            {sidebarOpen && (
              <span className="whitespace-nowrap font-semibold tracking-tight">
                Matek<span className="text-cyan-400"> & </span>Fizika
              </span>
            )}
          </div>

          <div
            id={navigationId}
            hidden={!sidebarOpen}
            className="min-h-0 flex-1 overflow-y-auto p-4"
          >
            <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
              Tananyagok
            </p>

            <SidebarNavigation
              items={navigation}
              activeId={activeId}
              onSelect={handleNavigate}
            />
          </div>

          {sidebarOpen && (
            <div className="shrink-0 border-t border-slate-800 p-5 text-xs text-slate-500">
              Értsd meg. Próbáld ki. Oldd meg.
            </div>
          )}
        </motion.aside>

        {sidebarOpen && (
          <button
            type="button"
            tabIndex={-1}
            aria-label="Navigáció bezárása"
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-20 bg-black/60 md:hidden"
          />
        )}

        <div className="ml-[72px] min-w-0 flex-1 md:ml-0">
          <header className="flex min-h-20 items-center border-b border-slate-800 px-5 sm:px-8">
            <span className="text-sm font-medium text-slate-300">
              {title}
            </span>
          </header>

          <main
            id="main-content"
            tabIndex={-1}
            className="mx-auto w-full max-w-6xl px-4 py-8 outline-none sm:px-8"
          >
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}