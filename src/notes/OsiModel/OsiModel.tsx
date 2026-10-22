import { OsiLayerCards } from "./OsiLayerCards";
import { OsiEncapsulationDiagram } from "./OsiEncapsulationDiagram";
import { OsiPacketJourney } from "./OsiPacketJourney";
import { panelClass } from "./osiData";

export default function OsiModel() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">

        {/* HERO */}
        <section className="relative overflow-hidden rounded-[2rem] border border-cyan-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40 p-6 sm:p-10">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="relative max-w-4xl">
            <div className="mb-4 inline-flex rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Networking Fundamentals
            </div>

            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
              OSI modell
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Az OSI modell egy olyan{" "}
              <strong className="text-white">
                gondolkodási keretrendszer
              </strong>
              , amely a hálózati kommunikációt hét különböző
              feladatrétegre bontja.
            </p>

            <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-950/60 p-5">
              <div className="text-xs uppercase tracking-wider text-slate-500">
                A kulcsgondolat
              </div>

              <div className="mt-3 text-lg font-semibold text-cyan-300">
                Minden réteg egy másik problémát old meg.
              </div>
            </div>
          </div>
        </section>

        <OsiLayerCards />

        <OsiEncapsulationDiagram />

        <OsiPacketJourney />

        {/* L2 vs L3 */}
        <section className={panelClass}>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
            Important distinction
          </p>

          <h2 className="text-2xl font-bold text-white">
            Layer 2 vs Layer 3
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-5">
              <div className="text-2xl font-black text-violet-300">
                Layer 2
              </div>

              <div className="mt-1 text-sm text-slate-500">
                Data Link
              </div>

              <p className="mt-4 leading-7 text-slate-300">
                A Layer 2 alapvetően a{" "}
                <strong className="text-white">
                  helyi hálózati szegmensen
                </strong>{" "}
                történő továbbítással foglalkozik.
              </p>

              <div className="mt-4 rounded-xl bg-slate-950 p-4">
                <div className="font-mono text-violet-300">
                  MAC address
                </div>

                <div className="mt-1 text-sm text-slate-500">
                  tipikus eszköz: switch
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">
              <div className="text-2xl font-black text-cyan-300">
                Layer 3
              </div>

              <div className="mt-1 text-sm text-slate-500">
                Network
              </div>

              <p className="mt-4 leading-7 text-slate-300">
                A Layer 3 feladata, hogy{" "}
                <strong className="text-white">
                  különböző hálózatok között
                </strong>{" "}
                továbbítsa a csomagokat.
              </p>

              <div className="mt-4 rounded-xl bg-slate-950 p-4">
                <div className="font-mono text-cyan-300">
                  IP address
                </div>

                <div className="mt-1 text-sm text-slate-500">
                  tipikus eszköz: router
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
            <div className="font-semibold text-amber-300">
              🧠 Egyszerű mentális modell
            </div>

            <pre className="mt-4 overflow-x-auto font-mono text-sm text-slate-300">
{`Layer 2:
"Ki kapja meg ezt a frame-et ezen a helyi hálózaton?"

Layer 3:
"Melyik hálózat felé kell elküldenem ezt a packetet?"`}
            </pre>
          </div>
        </section>

        {/* SUMMARY */}
        <section className="rounded-[2rem] border border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 to-slate-900 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-white">
            🧠 Ezt vidd magaddal
          </h2>

          <div className="mt-6 space-y-2 font-mono">
            <div className="rounded-xl bg-slate-950/70 p-3">
              <span className="text-cyan-300">7 Application</span>
              <span className="ml-4 text-slate-500">
                → mit akar az alkalmazás?
              </span>
            </div>

            <div className="rounded-xl bg-slate-950/70 p-3">
              <span className="text-cyan-300">6 Presentation</span>
              <span className="ml-4 text-slate-500">
                → milyen formában?
              </span>
            </div>

            <div className="rounded-xl bg-slate-950/70 p-3">
              <span className="text-cyan-300">5 Session</span>
              <span className="ml-4 text-slate-500">
                → milyen kommunikációs viszonyban?
              </span>
            </div>

            <div className="rounded-xl bg-slate-950/70 p-3">
              <span className="text-cyan-300">4 Transport</span>
              <span className="ml-4 text-slate-500">
                → melyik alkalmazásnak?
              </span>
            </div>

            <div className="rounded-xl bg-slate-950/70 p-3">
              <span className="text-cyan-300">3 Network</span>
              <span className="ml-4 text-slate-500">
                → melyik hálózatba?
              </span>
            </div>

            <div className="rounded-xl bg-slate-950/70 p-3">
              <span className="text-cyan-300">2 Data Link</span>
              <span className="ml-4 text-slate-500">
                → melyik közvetlen eszköznek?
              </span>
            </div>

            <div className="rounded-xl bg-slate-950/70 p-3">
              <span className="text-cyan-300">1 Physical</span>
              <span className="ml-4 text-slate-500">
                → hogyan lesz ebből fizikai jel?
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}