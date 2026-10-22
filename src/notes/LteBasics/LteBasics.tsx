import LtePlayer from "./LtePlayer";
import LteQuiz from "./LteQuiz";
import { panelClass } from "./lteData";

const voiceLayers = [
  ["Beszéd", "A mikrofon által felvett hang."],
  ["Kodek", "A hangot digitálisan kódolja és tömöríti."],
  ["RTP", "A médiához időbélyeget és sorszámot rendel."],
  ["UDP", "A média szállítására használt transzportprotokoll."],
  ["IP", "Címzett csomagok továbbítását teszi lehetővé."],
  ["LTE", "A rádiós és hálózati továbbítást biztosítja."],
];

export default function LteBasics() {
  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">
          Informatika / Hálózatok / Mobilhálózatok
        </p>

        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
          LTE alapok és architektúra
        </h1>

        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-400">
          Hogyan jut el egy adatcsomag a telefonodtól az internetig,
          és melyik hálózati elem mit csinál közben?
        </p>
      </header>

      <section className={panelClass}>
        <p className="text-xs uppercase tracking-widest text-cyan-400">
          01 / Értsd meg
        </p>

        <h2 className="mt-3 text-2xl font-semibold">Mi az LTE?</h2>

        <div className="mt-4 space-y-4 leading-8 text-slate-300">
          <p>
            Az <strong>LTE — Long Term Evolution</strong> a 3GPP
            által szabványosított mobilkommunikációs technológia.
            Tervezési céljai között szerepelt a nagyobb adatsebesség,
            az alacsonyabb késleltetés és az egyszerűbb,
            csomagkapcsolt hálózati felépítés.
          </p>

          <p>
            A <strong>csomagkapcsolás</strong> azt jelenti, hogy
            az adatokat kisebb egységekben továbbítjuk.
            Az alkalmazásod IP-csomagjai a rádiós hozzáférésen
            és a szolgáltató maghálózatán keresztül jutnak célba.
          </p>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <article className="rounded-2xl border border-slate-700 bg-slate-950 p-5">
            <h3 className="font-semibold text-amber-300">
              Hagyományos GSM / UMTS
            </h3>

            <p className="mt-3 leading-7 text-slate-400">
              A hagyományos telefonhívás és az internetes adatforgalom
              eltérő maghálózati tartományt használhatott.
            </p>

            <ul className="mt-4 space-y-3 text-sm">
              <li className="rounded-xl bg-slate-800 p-3">
                Beszédhívás → CS, azaz áramkörkapcsolt tartomány
              </li>
              <li className="rounded-xl bg-slate-800 p-3">
                Internet → PS, azaz csomagkapcsolt tartomány
              </li>
            </ul>
          </article>

          <article className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-5">
            <h3 className="font-semibold text-cyan-300">
              LTE / EPS
            </h3>

            <p className="mt-3 leading-7 text-slate-400">
              Csomagkapcsolt alap. Az internet és az IP-alapú
              hangszolgáltatás is ezen a hálózaton működhet.
              Ezt nevezzük all-IP megközelítésnek.
            </p>

            <ul className="mt-4 space-y-3 text-sm">
              <li className="rounded-xl bg-slate-950 p-3">
                Internet → IP-alapú adatforgalom
              </li>
              <li className="rounded-xl bg-slate-950 p-3">
                VoLTE → IMS-alapú telefonszolgáltatás IP felett
              </li>
            </ul>
          </article>
        </div>

        <h3 className="mt-8 text-xl font-semibold">
          Hogyan lehet a beszédből IP-forgalom?
        </h3>

        <p className="mt-3 leading-7 text-slate-400">
          A következő lista a beszédmédia egyszerűsített feldolgozását
          és becsomagolását mutatja. Ezek nem egymás után álló
          hálózati berendezések.
        </p>

        <ol className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {voiceLayers.map(([title, description], index) => (
            <li
              key={title}
              className="rounded-2xl border border-slate-800 bg-slate-950 p-4"
            >
              <p className="font-semibold text-cyan-300">
                {index + 1}. {title}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                {description}
              </p>
            </li>
          ))}
        </ol>

        <p className="mt-4 text-sm leading-7 text-slate-400">
          A média tipikusan RTP/UDP/IP formában halad.
          A hívás felépítését az IMS és SIP-jelzés kezeli.
          Az IMS-t ne úgy képzeld el, mint egyetlen dobozt,
          amelyen minden beszédcsomagnak sorban át kell mennie.
          A VoLTE megfelelő készülék- és hálózati támogatást igényel.
        </p>
      </section>

      <section className={panelClass}>
        <h2 className="text-2xl font-semibold">
          A teljes rendszer felépítése
        </h2>

        <p className="mt-4 leading-8 text-slate-300">
          A készülék a rádiós hozzáférési hálózaton keresztül
          kapcsolódik a maghálózathoz, onnan pedig egy külső
          IP-hálózat érhető el. A teljes rendszer pontosabb neve
          <strong> EPS — Evolved Packet System</strong>.
          Az LTE elnevezést a hétköznapokban gyakran tágabb
          értelemben használjuk.
        </p>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-slate-200">
              <tr className="border-b border-slate-700">
                <th className="p-3">Rész</th>
                <th className="p-3">Jelentés</th>
                <th className="p-3">Szerep</th>
              </tr>
            </thead>
            <tbody className="text-slate-400">
              <tr className="border-b border-slate-800">
                <td className="p-3 font-semibold text-cyan-300">UE</td>
                <td className="p-3">User Equipment</td>
                <td className="p-3">Telefon, modem, végberendezés.</td>
              </tr>
              <tr className="border-b border-slate-800">
                <td className="p-3 font-semibold text-cyan-300">E-UTRAN</td>
                <td className="p-3">Evolved Universal Terrestrial Radio Access Network</td>
                <td className="p-3">Rádiós hozzáférés, eNodeB bázisállomások.</td>
              </tr>
              <tr className="border-b border-slate-800">
                <td className="p-3 font-semibold text-cyan-300">EPC</td>
                <td className="p-3">Evolved Packet Core</td>
                <td className="p-3">Csomagkapcsolt maghálózat.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-cyan-300">PDN</td>
                <td className="p-3">Packet Data Network</td>
                <td className="p-3">Külső adathálózat, például internet.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-7">
          <LtePlayer demo />
        </div>

        <p className="mt-4 text-sm leading-7 text-slate-500">
          A példa már létrehozott adatkapcsolatot feltételez.
          A mozgó jel az adat logikai útját szemlélteti.
          Nem mutatja a rádiós darabolást, a teljes kapszulázást,
          a transzporthálózat routereit vagy a kapcsolatfelépítést.
        </p>
      </section>

      <section className={panelClass}>
        <p className="text-xs uppercase tracking-widest text-cyan-400">
          02 / Vizsgáld meg
        </p>

        <h2 className="mt-3 text-2xl font-semibold">
          Adatforgalom és vezérlés
        </h2>

        <p className="mt-3 mb-6 leading-7 text-slate-400">
          Válts feltöltés és letöltés között, állítsd meg a csomagot,
          majd nézd meg a vezérlési kapcsolatokat.
          A hálózati elemek gombjaira kattintva elolvashatod a szerepüket.
        </p>

        <LtePlayer />
      </section>

      <LteQuiz />

      <footer className="text-sm leading-7 text-slate-500">
        <p>Szakmai háttér:</p>
        <ul className="mt-2 space-y-1">
          <li>
            <a
              href="https://www.rfc-editor.org/rfc/rfc6459.html"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 hover:text-cyan-300"
            >
              IETF RFC 6459 – EPS-architektúra és IP-kapcsolatok
            </a>
          </li>
          <li>
            <a
              href="https://www.3gpp.org/images/PDF/lte_advanced_SAI_paper.pdf"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 hover:text-cyan-300"
            >
              3GPP – LTE / LTE-Advanced architektúra
            </a>
          </li>
          <li>
            <a
              href="https://www.gsma.com/solutions-and-impact/technologies/networks/ip_services/volte/"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 hover:text-cyan-300"
            >
              GSMA – VoLTE és IMS
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}