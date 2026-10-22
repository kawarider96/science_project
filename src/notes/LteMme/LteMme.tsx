import MmeResponsibilities from "./MmeResponsibilities";
import MmeAttachPlayer from "./MmeAttachPlayer";
import { panelClass } from "./mmeData";

const glossary = [
  ["NAS", "A UE és az MME közötti maghálózati vezérlés."],
  ["S1AP", "Az eNodeB és az MME közötti vezérlési protokoll."],
  ["Diameter", "Az MME és HSS közötti S6a kommunikáció alapjául szolgáló protokoll."],
  ["RAND", "A hitelesítéshez használt véletlen kihívás."],
  ["AUTN", "A hálózati oldal hitelességének ellenőrzéséhez használt token."],
  ["RES", "A UE által visszaküldött hitelesítési válasz."],
  ["XRES", "A hálózati oldalon rendelkezésre álló várt válasz."],
];

export default function LteMme() {
  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">
          Informatika / Hálózatok / Mobilhálózatok
        </p>

        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
          MME – Mobility Management Entity
        </h1>

        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-400">
          Az LTE-kapcsolat egyik fő szervezője:
          hitelesítés, mobilitás és kapcsolatvezérlés.
        </p>
      </header>

      <section className={panelClass}>
        <p className="text-xs uppercase tracking-widest text-amber-300">
          01 / Az MME szerepe
        </p>

        <h2 className="mt-3 text-2xl font-semibold">
          A kapcsolat karmestere
        </h2>

        <div className="mt-4 space-y-4 leading-8 text-slate-300">
          <p>
            Az <strong>MME</strong> az LTE maghálózatának
            egyik legfontosabb <strong>Control Plane</strong>
            {" "}eleme. A kapcsolat működését szervezi,
            miközben a felhasználói adat más útvonalon halad.
          </p>

          <p>
            A „karmester” hasonlat azért hasznos, mert az MME
            több szereplő együttműködésében vesz részt:
            kommunikál a UE-vel, az eNodeB-vel, a HSS-sel
            és az átjárók vezérlésében is szerepet kap.
          </p>
        </div>

        <div className="mt-6">
          <MmeResponsibilities />
        </div>

        <p className="mt-5 text-sm leading-7 text-slate-400">
          Az MME nem irányít önállóan minden hálózati részletet.
          A rádiós ütemezés például az eNodeB feladata,
          az adatforgalom továbbítását pedig az átjárók végzik.
        </p>
      </section>

      <section className={panelClass}>
        <p className="text-xs uppercase tracking-widest text-amber-300">
          02 / Üzenetek mozgásban
        </p>

        <h2 className="mt-3 text-2xl font-semibold">
          Az Attach Requesttől a hitelesítésig
        </h2>

        <p className="mt-4 leading-8 text-slate-300">
          Az <strong>attach</strong> a készülék EPS-hálózati
          regisztrációjának eljárása. Most ennek egy egyszerűsített,
          sikeres hitelesítési részét követjük végig.
        </p>

        <div className="mt-5 mb-6 rounded-2xl border border-slate-700 bg-slate-950 p-5">
          <h3 className="font-semibold text-slate-200">
            A bemutató feltételezései
          </h3>

          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-400">
            <li>
              A rádiós kapcsolatfelépítés előkészítő lépéseit kihagyjuk.
            </li>
            <li>
              Az MME számára ismert az IMSI; külön identitáslekérést
              nem mutatunk.
            </li>
            <li>
              Az MME új hitelesítési vektort kér a HSS-től.
            </li>
            <li>
              A USIM ellenőrzése és az MME válaszellenőrzése sikeres.
            </li>
          </ul>
        </div>

        <MmeAttachPlayer />
      </section>

      <section className={panelClass}>
        <p className="text-xs uppercase tracking-widest text-cyan-400">
          03 / Az üzenetek jelentése
        </p>

        <h2 className="mt-3 text-2xl font-semibold">
          NAS, S1AP és Diameter nem ugyanaz
        </h2>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl bg-slate-950 p-5">
            <h3 className="font-semibold text-cyan-300">
              UE → eNodeB
            </h3>
            <p className="mt-3 leading-7 text-slate-400">
              A NAS Attach Request rádiós vezérlési üzenetben
              jut az eNodeB-hez.
            </p>
          </article>

          <article className="rounded-2xl bg-slate-950 p-5">
            <h3 className="font-semibold text-violet-300">
              eNodeB → MME
            </h3>
            <p className="mt-3 leading-7 text-slate-400">
              Az eNodeB S1AP üzenetbe helyezve továbbítja
              ugyanazt a NAS-kérést.
            </p>
          </article>

          <article className="rounded-2xl bg-slate-950 p-5">
            <h3 className="font-semibold text-amber-300">
              MME → HSS
            </h3>
            <p className="mt-3 leading-7 text-slate-400">
              Az MME már saját Diameter-kérést készít.
              Nem az Attach Requestet küldi tovább a HSS-nek.
            </p>
          </article>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="p-3">Jelölés</th>
                <th className="p-3">Mit jelent itt?</th>
              </tr>
            </thead>

            <tbody className="text-slate-400">
              {glossary.map(([term, meaning]) => (
                <tr key={term} className="border-b border-slate-800">
                  <td className="p-3 font-semibold text-slate-200">
                    {term}
                  </td>
                  <td className="p-3 leading-7">{meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-5 text-sm leading-7 text-slate-400">
          A hitelesítés során az MME a kapott RES-t hasonlítja
          a várt XRES-hez. A hosszú távú előfizetői K kulcsot
          nem kell továbbítani a telefonból az MME-hez.
        </p>
      </section>

      <section className={panelClass}>
        <p className="text-xs uppercase tracking-widest text-cyan-400">
          04 / És hol megy a videó?
        </p>

        <h2 className="mt-3 text-2xl font-semibold">
          A felhasználói adatút kihagyja az MME-t
        </h2>

        <ol
          aria-label="Felhasználói adatút feltöltési irányban"
          className="mt-6 grid gap-3 sm:grid-cols-5"
        >
          {["UE", "eNodeB", "S-GW", "P-GW", "Internet"].map(
            (node, index) => (
              <li
                key={node}
                className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4 text-center"
              >
                <p className="text-xs text-slate-500">
                  {index + 1}. állomás
                </p>
                <p className="mt-2 font-semibold text-cyan-200">
                  {node}
                </p>
              </li>
            ),
          )}
        </ol>

        <p className="mt-5 leading-8 text-slate-300">
          Letöltéskor az irány fordított. A videóadat az
          átjárókon és az eNodeB-n keresztül érkezik meg a UE-hez.
          Az MME-ben közben megvan a kapcsolat kezeléséhez
          szükséges állapot, de a videó bájtjai nem rajta haladnak át.
        </p>

        <div className="mt-5 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5">
          <p className="font-semibold text-amber-200">
            A kapcsolat vezérlése nem azonos az adat továbbításával.
          </p>

          <p className="mt-3 leading-7 text-slate-400">
            Attól, hogy az MME kezeli a kapcsolat egyes állapotait,
            nem válik a felhasználói forgalom következő
            útválasztási állomásává.
          </p>
        </div>
      </section>

      <footer className="text-sm leading-7 text-slate-500">
        <p>
          A hagyományos LTE/EPC mobil-szélessávú működés
          egyszerűsített bemutatója.
        </p>

        <a
          href="https://www.etsi.org/deliver/etsi_ts/123400_123499/123401/17.11.00_60/ts_123401v171100p.pdf"
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-block underline underline-offset-4 hover:text-cyan-300"
        >
          Szakmai háttér: 3GPP TS 23.401 – EPS és attach
        </a>
      </footer>
    </div>
  );
}