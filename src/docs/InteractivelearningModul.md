# Interaktív tananyagmodul – alapértelmezett felépítés

## A dokumentum célja

Ez a dokumentum meghatározza az interaktív tananyagmodulok egységes felépítését és működését. Minden modul egy konkrét matematikai vagy fizikai témát dolgoz fel, közérthető magyarázattal, vizuális szemléltetéssel, interaktív gyakorlással és tudásellenőrzéssel.

A tanulási folyamat sorrendje:

**Megértés → kipróbálás → önálló megoldás.**

## Elhelyezés a projektben

- `src/notes/`: a tananyagmodulok oldalai.
- `docs/InteractivelearningModul.md`: a modulok közös felépítését és működését leíró dokumentáció.

## 1. Magyarázó összefoglaló és bemutató animáció

A modul első része bemutatja, miről szól az adott téma, mi a művelet vagy feladat célja, és milyen gondolatmenettel jutunk el a megoldáshoz.

### Szöveges magyarázat

A bevezető legyen rövid, közérthető és konkrét. Térjen ki a következőkre:

- Mit szeretnénk kiszámítani vagy megérteni?
- Milyen adatokból indulunk ki?
- Mi a megoldás alapötlete?
- Mit jelent a kapott eredmény?

Az új jelöléseket és szakkifejezéseket az első előfordulásukkor meg kell magyarázni. Fizikai mennyiségeknél a mértékegységet is fel kell tüntetni.

A magyarázat ne feltételezze, hogy a tanuló minden korábbi matematikai vagy fizikai alapfogalmat biztosan ismer.

### Rövid bemutató animáció

A szöveget egy rövid animáció egészíti ki, amely vizuálisan bemutatja a művelet lényegét.

Alapértelmezett formátuma egy folyamatosan ismétlődő MP4-videó. Más megoldás is használható, ha az adott téma szemléltetéséhez jobban illik.

Az animáció követelményei:

- Egy egyszerű, konkrét példán vezesse végig a nézőt.
- Jól követhető tempóban mutassa be a változásokat.
- Kiemelésekkel és mozgással tegye láthatóvá az elemek közötti kapcsolatokat.
- Hagyjon rövid időt a fontos köztes állapotok és a végeredmény megfigyelésére.
- Legyen megállítható, újraindítható és előre-hátra tekerhető.
- Hang nélkül is teljesen érthető legyen.

A bemutató célja az alapötlet megértetése. A részletes levezetés a következő szakaszban történik.

## 2. Lépésenkénti magyarázat és interaktív gyakorlófelület

A második részben a tanuló részletesen végigkövetheti a megoldást, és saját bemeneti értékekkel is kipróbálhatja a műveletet.

### Lépésenkénti szöveges magyarázat

A megoldást kis, önállóan is érthető lépésekre kell bontani.

Minden lépésnél derüljön ki:

- Mit csinálunk éppen?
- Melyik adatokat használjuk?
- Miért ezt a műveletet végezzük?
- Milyen köztes eredményt kaptunk, és hogyan haladunk tovább?

A képletátalakítások és számítások köztes lépései legyenek láthatók. A magyarázat ne csak megnevezze a műveletet, hanem az okát is érthetővé tegye.

### Animált szemléltetés

Az interaktív felület mindig az aktuális magyarázathoz tartozó állapotot mutassa.

- Emelje ki az éppen használt adatokat és elemeket.
- Mutassa meg a műveletet és annak eredményét.
- Tartsa láthatóan a megértéshez szükséges köztes eredményeket.
- Ugyanazokat a színeket és jelöléseket használja, mint a bevezető bemutató.

Az animáció a gondolatmenetet támogassa: minden mozgásnak vagy kiemelésnek legyen tanulási szerepe.

### Állítható paraméterek

A tanuló módosíthassa a feladat szempontjából releváns bemeneti adatokat, például:

- mátrixok elemeit;
- egyenletek együtthatóit;
- fizikai mennyiségek értékeit;
- geometriai méreteket.

A megengedett értékeket és korlátokat egyértelműen jelezni kell. Hibás vagy hiányos bemenet esetén a felület adjon érthető visszajelzést.

Érvényes paramétermódosításkor a megoldás számolódjon újra, a lejátszás álljon meg, és a léptető térjen vissza az első lépéshez.

### Lejátszás és léptetés

A felület biztosítsa az alábbi vezérlőket:

- Lejátszás és szünet.
- Előző és következő lépés.
- Visszatérés az első lépéshez.
- Húzható lépéscsúszka.

A csúszka mellett látszódjon az aktuális lépés és az összes lépés száma, például: **5 / 16. lépés**.

A csúszka mozgatása állítsa meg az automatikus lejátszást. Bármelyik lépés kiválasztásakor azonnal a hozzá tartozó teljes állapot jelenjen meg, a szöveggel, kiemelésekkel és köztes eredményekkel együtt. Ez előre- és visszaléptetéskor is működjön.

## 3. Kvíz és tudásellenőrzés

A modul végén egy rövid tesztfeladat vagy feladatsor ellenőrzi, hogy a tanuló megértette-e a bemutatott elvet, és képes-e önállóan alkalmazni.

### Feladattípusok

A témától függően használható:

- feleletválasztós kérdés;
- számszerű eredmény megadása;
- hiányzó érték vagy műveleti lépés kitöltése;
- a következő helyes lépés kiválasztása.

A feladat kapcsolódjon a bemutatott tananyaghoz. A megértést és az alkalmazást ellenőrizze, ne kizárólag a példában látott eredmény felidézését.

### Visszajelzés

A válasz ellenőrzése után a tanuló kapjon egyértelmű visszajelzést.

- Helyes válasznál jelenjen meg rövid indoklás.
- Hibás válasznál jelenjen meg segítő magyarázat vagy rávezetés.
- Legyen lehetőség újrapróbálkozásra.
- A megoldás és annak levezetése legyen elérhető az ellenőrzést követően.

A teljes megoldás ne jelenjen meg automatikusan a válaszadás előtt.

## Közös megjelenési és működési elvek

- **Sötét felület:** egységes sötét háttér, jól olvasható szövegek és megfelelő kontraszt.
- **Következetes jelölések:** ugyanaz a szín és szimbólum a teljes modulban ugyanazt jelentse.
- **Érthető nyelvezet:** az új fogalmak, jelölések és szükséges alaplépések kapjanak magyarázatot.
- **Reszponzív elrendezés:** a tananyag asztali gépen és mobilon is használható legyen.
- **Hozzáférhető vezérlés:** a kezelőszervek billentyűzettel is működjenek, és legyen egyértelmű feliratuk.
- **Színen túli jelölés:** a fontos különbségeket felirat vagy más vizuális jel is mutassa.
- **Szabályozható mozgás:** az animációk legyenek megállíthatók; csökkentett mozgást kérő beállítás esetén a tartalom mozgás nélkül is érthető maradjon.

## Technológiai alapok

| Technológia | Szerepe |
| --- | --- |
| React és TypeScript | Tananyagoldalak, komponensek és interaktív állapotok |
| Vite | Fejlesztői környezet és build |
| Tailwind CSS | Megjelenés és reszponzív elrendezés |
| Motion | Az interaktív felület animációi |
| KaTeX | Matematikai képletek megjelenítése |
| MP4 és HTML-videólejátszó | Rövid, ismételhető és vezérelhető bemutatók |

## Elkészültségi feltételek

Egy tananyagmodul akkor tekinthető késznek, ha:

- Tartalmaz közérthető bevezetőt és rövid vizuális bemutatót.
- A megoldást követhető részlépésekben magyarázza el.
- A bemeneti paraméterek módosíthatók, és a hibás értékek kezelése egyértelmű.
- A szöveg, a számítás és az animáció minden lépésnél összhangban van.
- A lejátszás, a megállítás és az előre-hátra léptetés működik.
- Tartalmaz önállóan megoldható tesztfeladatot és magyarázó visszajelzést.
- A számítások és a megjelenített eredmények helyesek.