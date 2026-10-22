import { useId, useState } from "react";
import { buttonClass, panelClass } from "./lteData";

const questions = [
  {
    text: "Melyik útvonalon halad egy internetes adatcsomag a bemutatott LTE-hálózatban?",
    options: [
      "UE → eNodeB → MME → HSS → internet",
      "UE → eNodeB → S-GW → P-GW → PDN",
      "UE → PCRF → HSS → PDN",
    ],
    correct: 1,
    explanation:
      "A felhasználói adatút az eNodeB és az átjárók felé vezet. Az MME és a HSS vezérlési, illetve előfizető-kezelési funkció.",
  },
  {
    text: "Mit jelent az LTE csomagkapcsolt megközelítése?",
    options: [
      "Minden telefonhoz külön fizikai vezeték tartozik.",
      "A hangot nem lehet továbbítani.",
      "Az adatok csomagokra bontva jutnak át a hálózaton.",
    ],
    correct: 2,
    explanation:
      "Az IP-alapú szolgáltatások csomagokban kommunikálnak. Ez hangszolgáltatásra is használható, például VoLTE esetén.",
  },
  {
    text: "Melyik állítás igaz a VoLTE-re?",
    options: [
      "IMS-alapú telefonszolgáltatás LTE-hozzáférésen.",
      "Minden LTE-kapcsolat automatikusan VoLTE-hívás is.",
      "A beszédcsomagoknak a HSS-en kell áthaladniuk.",
    ],
    correct: 0,
    explanation:
      "A VoLTE-hez megfelelő készülék- és hálózati támogatás, valamint IMS-szolgáltatás szükséges. Az LTE-adatkapcsolat önmagában nem azonos a VoLTE-vel.",
  },
  {
    text: "Mi a különbség az S1-U és az S1-MME között?",
    options: [
      "Az egyik kizárólag Wi-Fi, a másik Bluetooth.",
      "Az S1-U adatforgalmat visz az S-GW felé, az S1-MME vezérlést az MME felé.",
      "Ugyanannak a fizikai szervernek két neve.",
    ],
    correct: 1,
    explanation:
      "Az eNodeB külön logikai kapcsolatot használ a felhasználói adat és a mobilitásvezérlés számára.",
  },
];

export default function LteQuiz() {
  const groupId = useId();

  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const question = questions[index];
  const correct = answer === question.correct;
  const canContinue = checked && (correct || showSolution);

  function next() {
    setIndex((current) => (current + 1) % questions.length);
    setAnswer(null);
    setChecked(false);
    setShowSolution(false);
  }

  return (
    <section className={panelClass}>
      <p className="text-xs uppercase tracking-widest text-cyan-400">
        03 / Tudásellenőrzés
      </p>

      <h2 className="mt-3 text-2xl font-semibold">Nézzük, összeállt-e!</h2>

      <form
        className="mt-6"
        onSubmit={(event) => {
          event.preventDefault();
          if (answer !== null) setChecked(true);
        }}
      >
        <fieldset>
          <legend className="mb-4 font-medium leading-7">
            {index + 1} / {questions.length}. {question.text}
          </legend>

          <div className="space-y-3">
            {question.options.map((option, optionIndex) => (
              <label
                key={`${index}-${optionIndex}`}
                className={[
                  "flex cursor-pointer items-start gap-3 rounded-xl",
                  "border p-4 leading-7",
                  answer === optionIndex
                    ? "border-cyan-400/60 bg-cyan-400/5"
                    : "border-slate-700 bg-slate-950",
                ].join(" ")}
              >
                <input
                  type="radio"
                  name={groupId}
                  checked={answer === optionIndex}
                  onChange={() => {
                    setAnswer(optionIndex);
                    setChecked(false);
                    setShowSolution(false);
                  }}
                  className="mt-2 accent-cyan-400"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={answer === null}
          className={`${buttonClass} mt-4`}
        >
          Ellenőrzés
        </button>
      </form>

      <div aria-live="polite">
        {checked && (
          <div
            className={`mt-5 rounded-xl p-4 leading-7 ${
              correct
                ? "bg-emerald-400/10 text-emerald-200"
                : "bg-amber-400/10 text-amber-200"
            }`}
          >
            <p>
              {correct
                ? `Helyes! ${question.explanation}`
                : "Ez még nem jó. Próbáld újra, vagy nézd meg a magyarázatot."}
            </p>

            {!correct && !showSolution && (
              <button
                type="button"
                onClick={() => setShowSolution(true)}
                className="mt-2 underline underline-offset-4"
              >
                Megoldás és magyarázat
              </button>
            )}

            {!correct && showSolution && (
              <p className="mt-3">
                <strong>{question.options[question.correct]}</strong>
                <br />
                {question.explanation}
              </p>
            )}

            {canContinue && (
              <button
                type="button"
                onClick={next}
                className={`${buttonClass} mt-4 block`}
              >
                {index === questions.length - 1
                  ? "Kvíz újrakezdése"
                  : "Következő kérdés →"}
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}