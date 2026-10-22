import { useId, useState } from "react";

export type NavigationItem = {
  id: string;
  label: string;
  children?: NavigationItem[];
};

/**
 * items: a menü hierarchiája.
 * activeId: az aktuálisan megnyitott oldal azonosítója.
 * onSelect: egy levélmenüpont kiválasztásakor fut.
 *
 * A children mezővel rendelkező elemek lenyitható csoportok.
 * A többi elem egy megnyitható oldal.
 */
type SidebarNavigationProps = {
  items: NavigationItem[];
  activeId: string;
  onSelect: (id: string) => void;
};

function containsActive(
  item: NavigationItem,
  activeId: string,
): boolean {
  return (
    item.id === activeId ||
    Boolean(
      item.children?.some((child) =>
        containsActive(child, activeId),
      ),
    )
  );
}

function NavigationBranch({
  item,
  activeId,
  onSelect,
}: {
  item: NavigationItem;
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const submenuId = useId();
  const isGroup = Boolean(item.children?.length);
  const isActive = item.id === activeId;
  const hasActiveChild = containsActive(item, activeId);

  const [expanded, setExpanded] = useState(hasActiveChild);

  if (isGroup) {
    return (
      <li>
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={submenuId}
          onClick={() => setExpanded((value) => !value)}
          className={[
            "flex w-full items-center gap-3 rounded-xl px-3 py-3",
            "text-left text-sm font-medium transition-colors",
            "focus-visible:outline-2 focus-visible:outline-cyan-400",
            hasActiveChild
              ? "text-cyan-300 hover:bg-slate-800"
              : "text-slate-300 hover:bg-slate-800 hover:text-white",
          ].join(" ")}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            aria-hidden="true"
            className={[
              "h-4 w-4 shrink-0 transition-transform",
              "motion-reduce:transition-none",
              expanded ? "rotate-90" : "",
            ].join(" ")}
          >
            <path
              d="m9 5 7 7-7 7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <span>{item.label}</span>
        </button>

        <ul
          id={submenuId}
          hidden={!expanded}
          className="ml-5 space-y-1 border-l border-slate-800 pl-3"
        >
          {item.children!.map((child) => (
            <NavigationBranch
              key={child.id}
              item={child}
              activeId={activeId}
              onSelect={onSelect}
            />
          ))}
        </ul>
      </li>
    );
  }

  return (
    <li>
      <button
        type="button"
        aria-current={isActive ? "page" : undefined}
        onClick={() => onSelect(item.id)}
        className={[
          "flex w-full items-center gap-3 rounded-xl px-3 py-3",
          "text-left text-sm transition-colors",
          "focus-visible:outline-2 focus-visible:outline-cyan-400",
          isActive
            ? "bg-cyan-400/10 font-semibold text-cyan-300"
            : "text-slate-400 hover:bg-slate-800 hover:text-white",
        ].join(" ")}
      >
        <span
          aria-hidden="true"
          className={[
            "h-1.5 w-1.5 shrink-0 rounded-full",
            isActive ? "bg-cyan-400" : "bg-slate-600",
          ].join(" ")}
        />

        <span>{item.label}</span>
      </button>
    </li>
  );
}

export default function SidebarNavigation({
  items,
  activeId,
  onSelect,
}: SidebarNavigationProps) {
  return (
    <nav aria-label="Tananyagok">
      <ul className="space-y-2">
        {items.map((item) => (
          <NavigationBranch
            key={item.id}
            item={item}
            activeId={activeId}
            onSelect={onSelect}
          />
        ))}
      </ul>
    </nav>
  );
}