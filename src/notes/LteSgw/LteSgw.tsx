import { SgwUserPlaneDiagram } from "./SgwUserPlaneDiagram";
import { SgwMobilityAnchor } from "./SgwMobilityAnchor";
import { SgwHandoverPlayer } from "./SgwHandoverPlayer";
import { panelClass } from "./sgwData";

export default function LteSgw() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">

        {/* HERO */}
        <section className="relative overflow-hidden rounded-[2rem] border border-emerald-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 p-6 sm:p-10">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="relative max-w-4xl">
            <div className="mb-4 inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
              LTE Core Network
            </div>

            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
              8. Serving Gateway
            </h1>

            <div className="mt-2 text-xl font-semibold text-emerald-300">
              S-GW
            </div>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Az S-GW az LTE EPC egyik fontos{" "}
              <strong className="text-white">user-plane node-ja</strong>.
              A felhasználói adatcsomagok keresztülhaladnak rajta,
              és mobilitás közben{" "}
              <strong className="text-white">
                anchor pontként
              </strong>{" "}
              is szolgálhat.
            </p>

            <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-950/60 p-5">
              <div className="text-xs uppercase tracking-wider text-slate-500">
                Alap adatút
              </div>

              <div className="mt-3 font-mono text-base text-emerald-300 sm:text-lg">
                UE → eNodeB → S-GW → P-GW
              </div>
            </div>
          </div>
        </section>

        <SgwUserPlaneDiagram />

        <SgwMobilityAnchor />

        <SgwHandoverPlayer />

        {/* ANCHOR EXPLANATION */}
        <section className={panelClass}>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
            Mental Model
          </p>

          <h2 className="text-2xl font-bold text-white">
            Miért pont „anchor”?
          </h2>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">
              <div className="font-semibold text-cyan-300">
                Mozgó rész
              </div>

              <pre className="mt-4 rounded-xl bg-slate-950 p-4 text-center font-mono text-cyan-300">
{`eNB1  →  eNB2`}
              </pre>

              <p className="mt-4 text-sm leading-6 text-slate-400">
                Ahogy a telefon mozog, másik eNodeB-hez kerülhet.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
              <div className="font-semibold text-emerald-300">
                Stabil pont
              </div>

              <pre className="mt-4 rounded-xl bg-slate-950 p-4 text-center font-mono text-emerald-300">
{`        eNB1
          \\
           \\
            S-GW
           /
          /
        eNB2`}
              </pre>

              <p className="mt-4 text-sm leading-6 text-slate-400">
                Az S-GW eközben ugyanaz maradhat.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
            <div className="font-semibold text-amber-300">
              ⚓ Horgony-analógia
            </div>

            <p className="mt-2 leading-7 text-slate-400">
              Képzeld el úgy, hogy az eNodeB-k azok a pontok,
              amelyek között a telefon mozog. Az S-GW viszont egy
              stabil hálózati horgonyként maradhat mögöttük.
              Így nem kell minden rádiós cellaváltásnál az egész
              packet sessiont nulláról újraépíteni.
            </p>
          </div>
        </section>

        {/* SUMMARY */}
        <section className="rounded-[2rem] border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 to-slate-900 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-white">
            🧠 Ezt jegyezd meg
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["S-GW", "Serving Gateway"],
              ["Plane", "User Plane"],
              ["Forgalom", "IP packetek átmennek rajta"],
              ["Mobilitás", "Anchor szerepet tölthet be"],
              ["Handover", "eNB1 → eNB2"],
              ["Stabil pont", "Az S-GW maradhat"],
            ].map(([title, text]) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4"
              >
                <div className="font-mono font-bold text-emerald-300">
                  {title}
                </div>

                <div className="mt-1 text-sm text-slate-400">
                  {text}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl bg-slate-950/70 p-5 text-center">
            <div className="font-mono text-lg text-slate-300">
              UE → eNodeB →{" "}
              <span className="font-bold text-emerald-300">
                S-GW
              </span>
              {" → "}P-GW
            </div>

            <div className="mt-3 text-sm text-slate-500">
              eNodeB változhat. Az S-GW maradhat.
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}