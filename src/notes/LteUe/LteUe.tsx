import UeArchitecture from "./UeArchitecture";
import SimTransfer from "./SimTransfer";
import { modemFunctions, panelClass } from "./ueData";

export default function LteUe() {
  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">
          Informatika / Hálózatok / Mobilhálózatok
        </p>

        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
          UE – User Equipment
        </h1>

        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-400">
          Mi dolgozik a telefon belsejében, és hogyan válik
          külön a készülék és az előfizetés azonosítása?
        </p>
      </header>

      <section className={panelClass}>
        <p className="text-xs uppercase tracking-widest text-cyan-400">
          01 / A végberendezés felépítése
        </p>

        <h2 className="mt-3 text-2xl font-semibold">
          A UE több, mint egy alkalmazásokat futtató telefon
        </h2>

        <div className="mt-4 space-y-4 leading-8 text-slate-300">
          <p>
            A <strong>User Equipment</strong> a mobilhálózat
            végberendezése: lehet okostelefon, LTE-modem vagy
            például mobilhálózatra kapcsolódó router.
          </p>

          <p>
            Hálózati szempontból több együttműködő funkciót
            különböztetünk meg. Az alkalmazás adatot szeretne
            küldeni, a hálózati protokollok előkészítik,
            a modem és a rádiós hardver pedig lehetővé teszi
            a mobilhálózati továbbítást.
          </p>

          <p>
            Az előfizetőhöz tartozó azonosítási és hitelesítési
            funkciót a <strong>USIM</strong> biztosítja.
            Ez kapcsolódik a készülék működéséhez, de nem
            azonos magával a készülékkel.
          </p>
        </div>

        <div className="mt-6">
          <UeArchitecture />
        </div>
      </section>

      <section className={panelClass}>
        <p className="text-xs uppercase tracking-widest text-cyan-400">
          02 / A modem feladatai
        </p>

        <h2 className="mt-3 text-2xl font-semibold">
          Mit csinál az LTE modem?
        </h2>

        <p className="mt-4 leading-7 text-slate-400">
          A modem a rádiós protokollokat és a kommunikáció
          digitális feldolgozását is kezeli. Működése
          szorosan együttműködik az RF hardverrel és a USIM-mel.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {modemFunctions.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-slate-800 bg-slate-950 p-5"
            >
              <h3 className="font-semibold text-violet-300">
                {item.title}
              </h3>

              <p className="mt-3 leading-7 text-slate-400">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-700 text-slate-200">
                <th className="p-3">Jelzés</th>
                <th className="p-3">Logikai végpontok</th>
                <th className="p-3">Miről szól?</th>
              </tr>
            </thead>

            <tbody className="text-slate-400">
              <tr className="border-b border-slate-800">
                <td className="p-3 font-semibold text-cyan-300">RRC</td>
                <td className="p-3">UE ↔ eNodeB</td>
                <td className="p-3">
                  Rádiós kapcsolat, erőforrások és mérések.
                </td>
              </tr>

              <tr>
                <td className="p-3 font-semibold text-amber-300">NAS</td>
                <td className="p-3">UE ↔ MME</td>
                <td className="p-3">
                  Regisztráció, mobilitás és EPS-kapcsolatok kezelése.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-sm leading-7 text-slate-400">
          A NAS-üzenet fizikailag az eNodeB-n keresztül jut az MME-hez.
          A logikai végpont tehát nem azt jelenti, hogy közvetlen
          rádiós kapcsolat van a telefon és az MME között.
        </p>

        <p className="mt-4 text-sm leading-7 text-slate-400">
          A mobilhálózati titkosítás nem helyettesíti az alkalmazás
          végpontok közötti védelmét. Például a HTTPS külön
          biztonsági réteget ad a böngésző és a szerver között.
        </p>
      </section>

      <section className={panelClass}>
        <p className="text-xs uppercase tracking-widest text-cyan-400">
          03 / Előfizetői identitás
        </p>

        <h2 className="mt-3 text-2xl font-semibold">
          Mit tartalmaz és mit végez a USIM?
        </h2>

        <p className="mt-4 leading-8 text-slate-300">
          A <strong>USIM — Universal Subscriber Identity Module</strong>
          {" "}egy biztonságos alkalmazás. A hagyományos,
          kivehető kártya technikai neve <strong>UICC</strong>;
          ezen működik a USIM.
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl bg-slate-950 p-5">
            <h3 className="font-semibold text-amber-300">IMSI</h3>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              International Mobile Subscriber Identity:
              a mobil-előfizetés hálózati azonosítója.
              Nem azonos a telefonszámmal.
            </p>
          </article>

          <article className="rounded-2xl bg-slate-950 p-5">
            <h3 className="font-semibold text-amber-300">
              Hitelesítési titok
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              A hosszú távú K kulcs a hitelesítés alapja.
              Nem egyszerűen elküldjük a rádión: a USIM
              hitelesítési számításokban vesz részt.
            </p>
          </article>

          <article className="rounded-2xl bg-slate-950 p-5">
            <h3 className="font-semibold text-amber-300">
              Szolgáltatói adatok
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              Hálózatválasztási és szolgáltatói információk,
              valamint a szolgáltatásokhoz kapcsolódó beállítások.
            </p>
          </article>
        </div>

        <p className="mt-5 text-sm leading-7 text-slate-400">
          A USIM nem csak adattároló: biztonsági műveleteket is
          végez. A felhasználói internetforgalom titkosítását
          viszont ne úgy képzeld el, hogy minden adatcsomagot
          átküldünk a kártyán.
        </p>
      </section>

      <section className={panelClass}>
        <p className="text-xs uppercase tracking-widest text-cyan-400">
          04 / Készülék vagy előfizetés?
        </p>

        <h2 className="mt-3 text-2xl font-semibold">
          IMEI és IMSI: két külön azonosító
        </h2>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-violet-400/20 bg-violet-400/5 p-5">
            <h3 className="text-xl font-semibold text-violet-300">
              IMEI → készülék
            </h3>
            <p className="mt-3 leading-7 text-slate-400">
              International Mobile Equipment Identity.
              A mobilkészülékhez tartozó azonosító.
            </p>
          </div>

          <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5">
            <h3 className="text-xl font-semibold text-amber-300">
              IMSI → előfizetés
            </h3>
            <p className="mt-3 leading-7 text-slate-400">
              Az előfizetői identitást jelöli. Ugyanannak
              a fizikai kártyának az áthelyezésekor megmarad.
            </p>
          </div>
        </div>

        <div className="mt-6">
          <SimTransfer />
        </div>

        <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-5">
          <h3 className="font-semibold text-cyan-200">
            Pontosan mi változott?
          </h3>

          <p className="mt-3 leading-7 text-slate-300">
            Az A telefon továbbra is IMEI-A, a B telefon
            továbbra is IMEI-B. Az IMSI-X előfizetés került
            át egyik készülékből a másikba.
          </p>

          <p className="mt-3 leading-7 text-slate-400">
            Ezért az előfizetéshez éppen használt készülék
            azonosítója más lett, miközben az előfizetői
            azonosító ugyanaz maradt.
          </p>
        </div>
      </section>
    </div>
  );
}