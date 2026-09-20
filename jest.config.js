/**
 * Konfiguracja testów.
 *
 * `ts-jest` zamiast presetu `jest-expo`: testowane są wyłącznie czyste
 * funkcje (postęp, generator zadań, daty, seria), które nie dotykają React
 * Native ani Expo. Preset ciągnie całe środowisko natywne i wydłuża start
 * o kilkanaście sekund bez żadnego zysku dla testów operujących na zwykłych
 * obiektach.
 *
 * Gdy dojdą testy komponentów, `jest-expo` będzie właściwym wyborem.
 */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: { jsx: 'react-jsx', esModuleInterop: true } }],
  },
};
