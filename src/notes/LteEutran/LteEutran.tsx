import EnodebExplorer from "./EnodebExplorer";
import ArchitectureTransition from "./ArchitectureTransition";
import { panelClass } from "./eutranData";

export default function LteEutran() {
  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">
          Informatika / Hálózatok / Mobilhálózatok
        </p>

        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
          E-UTRAN – az LTE rádiós hálózata
        </h1>

        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-400">
          Mit csinál a bázisállomás, és miért lett egyszerűbb
          a rádiós hálózat felépítése a 3G után?
        </p>
      </header>

      <section className={panelClass}>
        <p className="text-xs uppercase tracking-widest text-cyan-400">
          01 / Rádiós hozzáférés
        </p>

        <h2 className="mt-3 text-2xl font-semibold">
          Mi az E-UTRAN?
        </h2>

        <div className="mt-4 space-y-4 leading-8 text-slate-300">
          <p>
            Az <strong>E-UTRAN</strong> teljes neve:
            {" "}
            <strong>
              Evolved Universal Terrestrial Radio Access Network
            </strong>.
            Ez az LTE rádiós hozzáférési hálózata.
          </p>

          <p>
            Feladata, hogy a UE-k, például telefonok és modemek,
            rádiós kapcsolaton keresztül hozzáférjenek a
            szolgáltató hálózatához.
          </p>

          <p>
            Alapvető hálózati eleme az
            {" "}<strong>eNodeB</strong>, röviden
            {" "}<strong>eNB</strong>. Egy eNodeB több készüléket
            szolgálhat ki, és több cellát is kezelhet.
          </p>
        </div>

        <div className="mt-5 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-5">
          <p className="font-semibold text-cyan-200">
            Az eNodeB nem pusztán antenna.
          </p>

          <p className="mt-3 leading-7 text-slate-400">
            Az antenna a rádiós jel kisugárzásában és vételében
            vesz részt. Az eNodeB ezen túl rádiós protokollokat,
            adatfeldolgozást és vezérlési funkciókat is megvalósít.
          </p>
        </div>
      </section>

      <section className={panelClass}>
        <p className="text-xs uppercase tracking-widest text-cyan-400">
          02 / A bázisállomás feladatai
        </p>

        <h2 className="mt-3 text-2xl font-semibold">
          Mit végez az eNodeB?
        </h2>

        <p className="mt-4 mb-6 leading-7 text-slate-400">
          Válassz egy feladatot! A magyarázat megmutatja,
          milyen döntést vagy műveletet végez a bázisállomás.
        </p>

        <EnodebExplorer />

        <p className="mt-5 text-sm leading-7 text-slate-400">
          A scheduling és a packet scheduling szorosan összefügg,
          ezért itt egy közös ütemezési témakörben szerepelnek.
          Ezek nem kizárólag LTE-ben létező fogalmak:
          korábbi rendszerekben is volt ütemezés és rádiós
          erőforrás-kezelés.
        </p>
      </section>

      <section className={panelClass}>
        <p className="text-xs uppercase tracking-widest text-cyan-400">
          03 / Architektúraváltás
        </p>

        <h2 className="mt-3 text-2xl font-semibold">
          Mi változott a 3G után?
        </h2>

        <div className="mt-4 space-y-4 leading-8 text-slate-300">
          <p>
            A hagyományos 3G UTRAN-ban a bázisállomás
            {" "}<strong>NodeB</strong> volt.
            Fölötte egy külön
            {" "}<strong>RNC — Radio Network Controller</strong>
            {" "}végezte a rádiós vezérlési feladatok jelentős részét.
          </p>

          <p>
            Az LTE E-UTRAN-ban nincs ilyen külön RNC-csomópont.
            A rádiós vezérlési funkciók jelentős része az
            eNodeB-be került. Így a rádiós hozzáférési
            hálózat laposabb lett.
          </p>
        </div>

        <div className="mt-6">
          <ArchitectureTransition />
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-700 text-slate-200">
                <th className="p-3">Szempont</th>
                <th className="p-3">Hagyományos 3G UTRAN</th>
                <th className="p-3">LTE E-UTRAN</th>
              </tr>
            </thead>

            <tbody className="text-slate-400">
              <tr className="border-b border-slate-800">
                <td className="p-3">Bázisállomás</td>
                <td className="p-3">NodeB</td>
                <td className="p-3 text-cyan-300">eNodeB</td>
              </tr>

              <tr className="border-b border-slate-800">
                <td className="p-3">Külön rádiós vezérlő</td>
                <td className="p-3">RNC</td>
                <td className="p-3 text-cyan-300">Nincs külön RNC</td>
              </tr>

              <tr className="border-b border-slate-800">
                <td className="p-3">Egyszerűsített felépítés</td>
                <td className="p-3">UE → NodeB → RNC → Core</td>
                <td className="p-3">UE → eNodeB → EPC</td>
              </tr>

              <tr>
                <td className="p-3">Rádiós vezérlés</td>
                <td className="p-3">NodeB és RNC között megosztva</td>
                <td className="p-3">Számos funkció az eNodeB-ben</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className={panelClass}>
        <p className="text-xs uppercase tracking-widest text-cyan-400">
          04 / Mit jelent a laposabb felépítés?
        </p>

        <h2 className="mt-3 text-2xl font-semibold">
          Kevesebb köztes szint, egyszerűbb együttműködés
        </h2>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl bg-slate-950 p-5">
            <h3 className="font-semibold text-cyan-300">
              1. Kevesebb külön vezérlőszint
            </h3>
            <p className="mt-3 leading-7 text-slate-400">
              Az eNodeB és a maghálózat között nincs
              külön RNC-réteg.
            </p>
          </article>

          <article className="rounded-2xl bg-slate-950 p-5">
            <h3 className="font-semibold text-cyan-300">
              2. Helyben végzett funkciók
            </h3>
            <p className="mt-3 leading-7 text-slate-400">
              Több rádiós döntés és feldolgozás ugyanabban
              a logikai bázisállomásban történhet.
            </p>
          </article>

          <article className="rounded-2xl bg-slate-950 p-5">
            <h3 className="font-semibold text-cyan-300">
              3. Kisebb késleltetés lehetősége
            </h3>
            <p className="mt-3 leading-7 text-slate-400">
              Csökkenhet a köztes továbbításból és
              együttműködésből származó többlet.
            </p>
          </article>
        </div>

        <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5">
          <h3 className="font-semibold text-amber-200">
            A funkciók nem tűntek el a dobozzal együtt
          </h3>

          <p className="mt-3 leading-7 text-slate-300">
            Az RNC megszüntetése nem azt jelenti, hogy
            a korábbi feladatait többé nem kell elvégezni.
            A funkciók elosztása és együttműködése változott.
          </p>

          <p className="mt-3 leading-7 text-slate-400">
            A tényleges késleltetésre a rádiós ütemezés,
            a terhelés, az újraküldések, a transzporthálózat,
            a maghálózat és a távoli szerver is hat.
            A csomópontok számából önmagában nem számítható ki.
          </p>
        </div>

        <p className="mt-5 text-sm leading-7 text-slate-400">
          Az eNodeB logikailag közvetlenül kapcsolódik az EPC-hez.
          Ettől még a fizikai útvonalon lehetnek switchek,
          routerek és más transzporthálózati berendezések.
        </p>
      </section>

      <footer className="text-sm leading-7 text-slate-500">
        <a
          href="https://www.etsi.org/deliver/etsi_TS/136300_136399/136300/18.03.00_60/ts_136300v180300p.pdf"
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-4 hover:text-cyan-300"
        >
          Szakmai háttér: 3GPP TS 36.300 – E-UTRA és E-UTRAN
        </a>
      </footer>
    </div>
  );
}