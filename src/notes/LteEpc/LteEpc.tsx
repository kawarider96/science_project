import EpcExplorer from "./EpcExplorer";
import MmeContext from "./MmeContext";
import { panelClass } from "./epcData";

export default function LteEpc() {
  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">
          Informatika / Hálózatok / Mobilhálózatok
        </p>

        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
          EPC – Evolved Packet Core
        </h1>

        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-400">
          A hálózat irányítása és a tényleges adatforgalom
          két külön feladat. Nézzük meg, hogyan válik szét a kettő!
        </p>
      </header>

      <section className={panelClass}>
        <p className="text-xs uppercase tracking-widest text-cyan-400">
          01 / A maghálózat szerepe
        </p>

        <h2 className="mt-3 text-2xl font-semibold">
          Mi az EPC?
        </h2>

        <div className="mt-4 space-y-4 leading-8 text-slate-300">
          <p>
            Az <strong>Evolved Packet Core</strong> az LTE-rendszer
            csomagkapcsolt maghálózata. A rádiós hozzáférés mögött
            biztosítja a mobil-adatkapcsolatok működését és
            a külső adathálózatok elérését.
          </p>

          <p>
            Két kérdést érdemes különválasztani:
            <strong> hogyan szervezzük meg a kapcsolatot</strong>,
            és <strong>hol továbbítjuk annak adatait</strong>?
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5">
            <p className="text-xs uppercase tracking-widest text-amber-300">
              Control Plane
            </p>

            <h3 className="mt-3 text-xl font-semibold">
              A hálózat irányítása
            </h3>

            <p className="mt-3 leading-7 text-slate-400">
              Előfizetői hozzáférés, kapcsolatok és mobilitás
              kezelése. Vezérlési üzenetekkel egyeztetik,
              milyen kapcsolat működjön és milyen állapotban.
            </p>

            <p className="mt-4 font-medium text-amber-200">
              Példa: UE–MME jelzés, MME–HSS egyeztetés.
            </p>
          </article>

          <article className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-5">
            <p className="text-xs uppercase tracking-widest text-cyan-300">
              User Plane
            </p>

            <h3 className="mt-3 text-xl font-semibold">
              A felhasználó adatforgalma
            </h3>

            <p className="mt-3 leading-7 text-slate-400">
              A böngészéshez, videózáshoz, üzenetküldéshez
              és más alkalmazásokhoz tartozó adatok továbbítása.
            </p>

            <p className="mt-4 font-medium text-cyan-200">
              UE ↔ eNodeB ↔ S-GW ↔ P-GW ↔ külső IP-hálózat
            </p>
          </article>
        </div>

        <p className="mt-5 text-sm leading-7 text-slate-400">
          A két sík logikai elkülönítés. Nem feltétlenül két
          külön kábelhálózatot jelent. Egy hálózati elem,
          például az S-GW vagy a P-GW, vezérlési és
          adattovábbítási feladatokkal is rendelkezhet.
        </p>
      </section>

      <section className={panelClass}>
        <p className="text-xs uppercase tracking-widest text-cyan-400">
          02 / Kövesd az útvonalat
        </p>

        <h2 className="mt-3 text-2xl font-semibold">
          Videócsomag vagy vezérlési üzenet?
        </h2>

        <p className="mt-4 mb-6 leading-7 text-slate-400">
          Először indítsd el a videó letöltésének bemutatóját.
          Utána válts valamelyik vezérlési kapcsolatra.
          A csúszkával a mozgás bármelyik pillanatára visszatekerhetsz.
        </p>

        <EpcExplorer />

        <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-5">
          <h3 className="font-semibold text-cyan-200">
            Az HBO videócsomagja nem megy keresztül az MME-n.
          </h3>

          <p className="mt-3 leading-7 text-slate-300">
            A maghálózatban a bemutatott videóadat
            a P-GW és az S-GW útvonalát használja.
            Az MME a kapcsolat kezelésében vesz részt.
          </p>
        </div>
      </section>

      <section className={panelClass}>
        <p className="text-xs uppercase tracking-widest text-cyan-400">
          03 / Mit tud az MME?
        </p>

        <h2 className="mt-3 text-2xl font-semibold">
          Állapotot kezel, nem videóképkockákat
        </h2>

        <p className="mt-4 mb-6 leading-8 text-slate-300">
          Az MME tárolhat információt az előfizető identitásáról,
          a kapcsolatállapotról, a bearerekről és a kiválasztott
          S-GW-ről. A bearer itt egy meghatározott kiszolgálási
          tulajdonságokkal rendelkező logikai adatkapcsolat.
        </p>

        <MmeContext />

        <p className="mt-5 text-sm leading-7 text-slate-400">
          A „ki a felhasználó?” itt elsősorban előfizetői
          identitást jelent, nem a videószolgáltatásban használt
          profilnevet. A „hol van?” pedig nem feltétlenül
          pontos földrajzi koordinátát.
        </p>
      </section>

      <section className={panelClass}>
        <p className="text-xs uppercase tracking-widest text-cyan-400">
          04 / A legfontosabb különbségek
        </p>

        <h2 className="mt-3 text-2xl font-semibold">
          Melyik elem mihez kell?
        </h2>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="p-3">Elem</th>
                <th className="p-3">Fő szerep ebben a példában</th>
                <th className="p-3">Áthalad rajta a videóadat?</th>
              </tr>
            </thead>

            <tbody className="text-slate-400">
              {[
                ["MME", "Hozzáférés és mobilitás vezérlése", "Nem"],
                ["HSS", "Előfizetői és hitelesítési adatok", "Nem"],
                ["S-GW", "Adattovábbítás az eNodeB és P-GW között", "Igen"],
                ["P-GW", "Kapcsolat a külső adathálózattal", "Igen"],
                ["PCRF", "Forgalmi szabályok meghatározása", "Nem"],
              ].map(([name, role, carriesVideo]) => (
                <tr key={name} className="border-b border-slate-800">
                  <td className="p-3 font-semibold text-slate-200">
                    {name}
                  </td>
                  <td className="p-3">{role}</td>
                  <td
                    className={`p-3 font-semibold ${
                      carriesVideo === "Igen"
                        ? "text-cyan-300"
                        : "text-amber-300"
                    }`}
                  >
                    {carriesVideo}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 rounded-2xl bg-slate-950 p-5">
          <h3 className="font-semibold text-slate-100">
            A Control Plane nem egyetlen sorba kötött útvonal
          </h3>

          <p className="mt-3 leading-7 text-slate-400">
            A UE NAS-üzenetének végpontja lehet az MME.
            Az MME ezután saját, külön üzenettel fordulhat
            a HSS-hez vagy az S-GW-hez. Ez nem ugyanannak
            a csomagnak a folyamatos továbbküldése.
          </p>
        </div>
      </section>

      <footer className="space-y-3 text-sm leading-7 text-slate-500">
        <p>
          A bemutató a hagyományos, GTP-alapú LTE/EPC
          mobil-szélessávú működést szemlélteti.
          Nem teljes protokollábra vagy hálózati szimulátor.
        </p>

        <a
          href="https://www.etsi.org/deliver/etsi_ts/123400_123499/123401/17.11.00_60/ts_123401v171100p.pdf"
          target="_blank"
          rel="noreferrer"
          className="inline-block underline underline-offset-4 hover:text-cyan-300"
        >
          Szakmai háttér: 3GPP TS 23.401 – EPS architektúra
        </a>
      </footer>
    </div>
  );
}