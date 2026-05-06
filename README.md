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

Add screenshots after running the app on an Android emulator or device:

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
