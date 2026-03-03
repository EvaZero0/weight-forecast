<div align="left">
  <p>
    <a href="#-english-version">🇬🇧 English</a> | 
    <a href="#-deutsche-version">🇩🇪 Deutsch</a>
  </p>
</div>

---

<a name="english-version"></a>
# 🇬🇧 English Version

# Weight Forecast
**Weight Goal Calculator**

A simple and intuitive web application to help understand the relationship between caloric intake and weight goals. This is the online version of a Python tool I originally built — rewritten from scratch in HTML, CSS, and JavaScript, and deployed via GitHub Pages.

## 📖 About the Project

Enter your body metrics and daily calorie intake — the app estimates how long it will take to reach your target weight. Unlike simple calculators, it recalculates your metabolic rate every single day as your weight changes, making the forecast progressively more accurate over time.

It uses the Mifflin-St Jeor equation for basal metabolic rate, and a NEAT/EAT split for activity level — but please always take the results with a grain of salt.

## ✨ Features

- **Body metrics:** Enter sex, height, weight, and age.
- **Activity level:** Split into daily lifestyle (NEAT) and structured exercise (EAT) for a more realistic estimate than a single activity dropdown.
- **Live BMI:** Calculated instantly as you type, using the Trefethen formula. Shows current and target BMI side by side, with a warning if the target falls into the underweight range.
- **Weight forecast:** Estimates how long it will take to reach your target weight at a given daily calorie intake.
- **Adaptive calculation:** TDEE is recalculated daily as weight changes — the lighter you get, the fewer calories you burn.
- **Convergence detection:** If your intake is too close to your TDEE to ever reach the target, the app tells you where your weight will stabilise instead.
- **Visual graph:** Weight progression over time, with a target line.
- **Dark mode:** Follows system preference automatically.

## ⚠️ Important Disclaimers & Health Warnings

**Please read this before using the application.**

### 1. Developer Disclaimer
I am a software developer, **I am not a nutritionist, doctor, or health expert.** The algorithms used here are standard mathematical approximations and should be viewed as rough estimates only. They do not account for individual metabolic differences, medical conditions, or body composition.

### 2. Health & Safety
- **Consult a professional** before starting any weight loss journey or significantly changing your diet.
- **Calorie deficits:** A high calorie deficit is not suitable for everyone and can be dangerous. Sustainable weight management looks different for each person.
- **Accuracy:** The numbers provided are mathematical estimates, not biological facts.

### 3. A Note on Mental Health ❤️
If you have a history of eating disorders, or if tracking numbers, weight, or calories negatively affects your mental health or causes anxiety — **please do not use this app.** Your well-being is more important than any number on a scale. If you are struggling, please reach out to a professional or a support hotline in your country.

## 🚀 Roadmap

- [ ] Calculation by target date → required daily calorie budget
- [ ] Save user profile locally
- [ ] Macro-nutrient breakdown (Protein, Carbs, Fats)

## 🛠️ Tech Stack

- **HTML / CSS / JavaScript** — no framework, no build step
- **Chart.js** — weight progression graph

---
<br>

<a name="deutsche-version"></a>
# 🇩🇪 Deutsche Version

# Weight Forecast
**Zielgewichts-Rechner**

Eine einfache und intuitive Web-App, die dabei hilft, den Zusammenhang zwischen Kalorienzufuhr und Gewichtszielen zu verstehen. Dies ist die Online-Version eines Python-Tools, das ich ursprünglich entwickelt habe — neu geschrieben in HTML, CSS und JavaScript und über GitHub Pages bereitgestellt.

## 📖 Über das Projekt

Körperdaten und tägliche Kalorienzufuhr eingeben — die App schätzt, wie lange es dauert, das Zielgewicht zu erreichen. Anders als einfache Rechner wird der Grundumsatz täglich neu berechnet, während das Gewicht sinkt, was die Prognose mit der Zeit genauer macht.

Die App verwendet die Mifflin-St Jeor-Gleichung für den Grundumsatz und eine NEAT/EAT-Aufteilung für das Aktivitätslevel — die Ergebnisse sind jedoch immer mit Vorsicht zu genießen.

## ✨ Funktionen

- **Körperdaten:** Eingabe von biologischem Geschlecht, Größe, Gewicht und Alter.
- **Aktivitätslevel:** Aufgeteilt in Alltagsbewegung (NEAT) und gezieltes Training (EAT) — realistischer als ein einzelnes Aktivitäts-Dropdown.
- **Live-BMI:** Wird direkt beim Tippen berechnet, nach der Trefethen-Formel. Zeigt aktuellen und Ziel-BMI nebeneinander, mit Warnung bei Untergewicht.
- **Gewichtsprognose:** Schätzt, wie lange es bei einer bestimmten Kalorienzufuhr dauert, das Zielgewicht zu erreichen.
- **Adaptive Berechnung:** Der Gesamtumsatz wird täglich neu berechnet — je leichter, desto weniger Kalorien werden verbrannt.
- **Konvergenzerkennung:** Wenn die Kalorienzufuhr zu nah am Gesamtumsatz liegt, zeigt die App, bei welchem Gewicht sich das Gewicht stabilisieren würde.
- **Visueller Graph:** Gewichtsverlauf über die Zeit mit Ziellinie.
- **Darkmode:** Folgt automatisch der Systemeinstellung.

## ⚠️ Wichtige Haftungsausschlüsse & Gesundheitswarnungen

**Bitte lies dies, bevor du die Anwendung nutzt.**

### 1. Entwickler-Hinweis
Ich bin Softwareentwicklerin, **ich bin keine Ernährungsberaterin, Ärztin oder Gesundheitsexpertin.** Die hier verwendeten Algorithmen sind mathematische Standardnäherungen und sollten nur als grobe Schätzungen betrachtet werden. Sie berücksichtigen keine individuellen Stoffwechselunterschiede, Vorerkrankungen oder Körperzusammensetzung.

### 2. Gesundheit & Sicherheit
- **Konsultiere einen Profi**, bevor du eine Gewichtsabnahme beginnst oder deine Ernährung stark umstellst.
- **Kaloriendefizite:** Ein hohes Kaloriendefizit ist nicht für jeden geeignet und kann gefährlich sein. Nachhaltiges Gewichtsmanagement sieht für jeden anders aus.
- **Genauigkeit:** Die Zahlen dieser App sind mathematische Schätzungen, keine biologischen Fakten.

### 3. Hinweis zur psychischen Gesundheit ❤️
Wenn du eine Vorgeschichte von Essstörungen hast oder merkst, dass das Tracken von Zahlen, Gewicht oder Kalorien deine psychische Gesundheit negativ beeinflusst oder Ängste auslöst — **nutze diese App bitte nicht.** Dein Wohlbefinden ist wichtiger als jede Zahl auf der Waage. Wenn du Hilfe brauchst, wende dich bitte an eine Fachperson oder Beratungsstelle in deiner Nähe.

## 🚀 Roadmap

- [ ] Berechnung nach Zieldatum → benötigtes tägliches Kalorienbudget
- [ ] Lokales Speichern von Nutzerprofilen
- [ ] Makronährstoff-Aufschlüsselung (Protein, Kohlenhydrate, Fette)

## 🛠️ Tech Stack

- **HTML / CSS / JavaScript** — kein Framework, kein Build-Schritt
- **Chart.js** — Gewichtsverlauf-Graph