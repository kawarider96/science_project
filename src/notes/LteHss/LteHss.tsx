import { HssArchitectureDiagram } from "./HssArchitectureDiagram";
import { HssSubscriberData } from "./HssSubscriberData";
import { HssAuthenticationPlayer } from "./HssAuthenticationPlayer";
import { panelClass } from "./hssData";

export default function LteHss() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
        {/* HERO */}
        <section className="relative overflow-hidden rounded-[2rem] border border-violet-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-violet-950/40 p-6 sm:p-10">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />

          <div className="relative max-w-4xl">
            <div className="mb-4 inline-flex rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
              LTE Core Network
            </div>

            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
              7. HSS
            </h1>

            <div className="mt-2 text-xl font-semibold text-violet-300">
              Home Subscriber Server
            </div>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              A HSS az LTE központi előfizetői adatbázisa.
              Innen tudja a hálózat, hogy{" "}
              <strong className="text-white">ki vagy</strong>,{" "}
              <strong className="text-white">
                hogyan lehet hitelesíteni
              </strong>
              , és{" "}
              <strong className="text-white">
                milyen szolgáltatásokra vagy jogosult
              </strong>
              .
            </p>

            <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-950/60 p-5 font-mono text-sm sm:text-base">
              <div className="text-slate-500">A legegyszerűbben:</div>

              <div className="mt-2 text-violet-300">
                HSS = a mobilhálózat előfizetői nyilvántartása
              </div>
            </div>
          </div>
        </section>

        {/* SUBSCRIBER DATA */}
        <HssSubscriberData />

        {/* ARCHITECTURE */}
        <HssArchitectureDiagram />

        {/* AUTHENTICATION */}
        <HssAuthenticationPlayer />

        {/* S6A / DIAMETER */}
        <section className={panelClass}>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-violet-400">
            S6a & Diameter
          </p>

          <h2 className="text-2xl font-bold text-white">
            S6a és Diameter nem ugyanaz
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">
              <div className="text-xs uppercase tracking-wider text-cyan-500">
                Interfész
              </div>

              <div className="mt-2 text-3xl font-black text-cyan-300">
                S6a
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Az LTE architektúrában ez az MME és a HSS közötti
                logikai interfész.
              </p>

              <pre className="mt-4 rounded-xl bg-slate-950 p-4 text-center text-cyan-300">
{`MME ───── S6a ───── HSS`}
              </pre>
            </div>

            <div className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-5">
              <div className="text-xs uppercase tracking-wider text-violet-500">
                Protokoll
              </div>

              <div className="mt-2 text-3xl font-black text-violet-300">
                Diameter
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Ez az a protokoll, amelyen az S6a kommunikáció
                tényleges üzenetei mennek.
              </p>

              <pre className="mt-4 rounded-xl bg-slate-950 p-4 text-center text-violet-300">
{`MME ── Diameter ── HSS`}
              </pre>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
            <div className="font-semibold text-amber-300">
              🧠 Mentális modell
            </div>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Gondolj úgy rá, hogy az{" "}
              <strong className="text-white">S6a az út</strong>, a{" "}
              <strong className="text-white">Diameter pedig a nyelv</strong>,
              amin az MME és a HSS beszélget.
            </p>
          </div>
        </section>

        {/* FINAL MENTAL MODEL */}
        <section className="rounded-[2rem] border border-violet-500/30 bg-gradient-to-r from-violet-950/40 to-slate-900 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-white">
            🧠 Ezt vidd magaddal
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["HSS", "Előfizetői adatbázis"],
              ["MME ↔ HSS", "Control Plane"],
              ["S6a", "MME–HSS interfész"],
              ["Diameter", "Az S6a protokollja"],
              ["IMSI", "Előfizető azonosítása"],
              ["User traffic", "Nem megy át a HSS-en"],
            ].map(([title, text]) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4"
              >
                <div className="font-mono font-bold text-violet-300">
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
              <span className="text-cyan-300">MME</span>
              {" ↔ "}
              <span className="text-violet-300">HSS</span>
            </div>

            <div className="mt-2 text-sm text-slate-500">
              „Ki ez? Jogosult? Mit használhat?”
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}