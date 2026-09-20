# OrbitMentor

OrbitMentor is an Android-first Expo mobile app for aspiring developers. It turns a chosen career goal into a gamified learning loop with onboarding, a personalized roadmap, daily quests, XP, streaks, quizzes, mentor-style guidance, achievements, and portfolio project ideas.

The app is built as a polished first GitHub mobile portfolio project. It runs fully offline with realistic mock content for every career path, so no backend or API key is required.

## Features

- Premium dark mobile UI with gradients, cards, badges, and touch feedback
- Onboarding for career goal, current level, and daily focus time
- Personalized dashboard with XP, streaks, roadmap progress, daily quest, and mentor insight
- Structured roadmap with modules, task completion, milestones, and automatic progress
- Daily quests generated from the selected roadmap
- XP and streak updates when quests are completed
- Mini quiz system with at least five questions per career path
- Portfolio project ideas with skills practiced and README-style summaries
- Profile and stats screen with achievements and reset confirmation
- Local persistence with Zustand and AsyncStorage

## Career Paths

- Frontend Developer
- Backend Developer
- Mobile Developer
- Python Developer
- Cybersecurity
- Data Analyst

## Tech Stack

- Expo SDK 55
- React Native
- TypeScript
- Expo Router
- Zustand
- AsyncStorage
- React Hook Form
- Zod
- Expo Linear Gradient
- Lucide React Native

## Screenshots

Katalog `docs/screenshots/` jest pusty — aplikacja jest natywna, a tu nie ma
emulatora. Instrukcja jak je zrobić (aplikacja działa offline, więc nie
trzeba niczego konfigurować): [docs/screenshots/README.md](docs/screenshots/README.md).

Docelowe nazwy plików:

| Onboarding | Dashboard | Roadmap |
| --- | --- | --- |
| `docs/screenshots/onboarding.png` | `docs/screenshots/dashboard.png` | `docs/screenshots/roadmap.png` |

| Quests | Quiz | Profile |
| --- | --- | --- |
| `docs/screenshots/quests.png` | `docs/screenshots/quiz.png` | `docs/screenshots/profile.png` |

## Installation

```bash
npm install
```

Aplikacja działa **w całości offline na danych wbudowanych** — nie ma
żadnych zmiennych środowiskowych do ustawienia. W repozytorium był plik
`.env.example` deklarujący `EXPO_PUBLIC_API_URL`, ale żaden plik w `src/`
ani `app/` nie czytał jakiejkolwiek zmiennej środowiskowej; został usunięty,
bo obiecywał konfigurację, której nie ma.

## Testy, lint i CI

```bash
npm run lint        # expo lint
npm run typecheck   # tsc --noEmit
npm test            # 56 testów
```

CI uruchamia wszystkie trzy plus audyt zależności na każdej gałęzi.

Testy pokrywają logikę, w której błąd nie wywala aplikacji, tylko po cichu
pokazuje nieprawdę:

| Obszar | Co jest sprawdzane |
|---|---|
| Postęp ścieżki | wynik zawsze w zakresie 0–100, zadania z **innej** ścieżki nie liczą się do bieżącej (store trzyma jedną wspólną listę ukończonych), nieznane identyfikatory ignorowane |
| Rangi i XP | wszystkie progi wraz z wartościami granicznymi, ranga nigdy nie spada przy rosnącym XP |
| Dane ścieżek | identyfikatory zadań unikalne w całej aplikacji — powtórka sprawiłaby, że ukończenie zadania w jednej ścieżce zaliczałoby je w drugiej |
| Zadania dnia | liczba zależna od czasu dziennego, czas zadania nigdy nie przekracza deklarowanego, zadanie ukończone dziś zostaje na liście |
| Seria | ten sam dzień nie podbija serii, przerwa resetuje do 1 (nie 0), granice miesiąca, roku i 29 lutego |

Reguła serii została przy okazji przeniesiona ze store'a do `src/utils/date.ts`.
To czysta funkcja o datach — w store nie dało się jej przetestować bez
stawiania zustanda z warstwą trwałości na AsyncStorage, która w środowisku
node w ogóle się nie uruchamia.

## Run Locally

Start the Expo development server:

```bash
npx expo start
```

Run on Android:

```bash
npx expo start --android
```

The same scripts are available through npm:

```bash
npm run start
npm run android
npm run ios
npm run web
```

## Project Structure

```text
app/
  _layout.tsx
  index.tsx
  onboarding.tsx
  portfolio.tsx
  (tabs)/
    dashboard.tsx
    roadmap.tsx
    quests.tsx
    quiz.tsx
    profile.tsx
src/
  components/
  constants/
  data/
  store/
  types/
  utils/
```

## State Model

OrbitMentor persists:

- onboarding completion and profile choices
- XP and streak count
- completed roadmap tasks
- completed daily quests
- quiz attempts and scores
- explored portfolio ideas

Progress can be reset from the Profile screen while keeping the selected onboarding path.

## Future Improvements

- Real AI mentor endpoint with safe prompt templates
- Calendar reminders and push notifications
- Cloud sync and account login
- More quiz modes and spaced repetition
- Screenshot automation for README assets
- EAS Build setup and Play Store release checklist

## Licencja

MIT — patrz [LICENSE](LICENSE).
