# TurkEstate — Project Memory

## Архитектура

- Монорепо с npm workspaces
- `backend/` — FastAPI (Python 3.10), Hexagonal Architecture
- `frontend/` — Next.js 14, TypeScript, Tailwind CSS
- `packages/api-client/` — общий TypeScript API-клиент (`@turkestate/api-client`)
- `mobile/` — будущее React Native + Expo приложение (пока не создано)

## Мобильное приложение

### Технологии
- **React Native + Expo** — выбранный стек для мобилки
- Использует тот же бэкенд (FastAPI REST)
- Использует тот же `@turkestate/api-client` пакет

### Запуск для разработки

```bash
# Быстрый старт — Expo Go на телефоне (iOS/Android)
cd mobile
npx expo start          # сканируй QR-код приложением Expo Go

# iOS симулятор (только macOS, нужен Xcode)
npx expo start --ios

# Android эмулятор (нужен Android Studio)
npx expo start --android

# Development build (когда нужны нативные модули)
npx expo run:ios
npx expo run:android
```

### Деплой в App Store и Google Play

Используется **EAS (Expo Application Services)**:

```bash
# Настройка (один раз)
npm install -g eas-cli
eas login
eas build:configure

# Сборка в облаке
eas build --platform ios --profile production
eas build --platform android --profile production

# Публикация
eas submit --platform ios
eas submit --platform android
```

### Аккаунты для сторов
- **Apple Developer Account** — $99/год → developer.apple.com
- **Google Play Developer Account** — $25 разово → play.google.com/console
- Сертификаты и ключи EAS генерирует автоматически

### Как добавить мобилку в монорепо

```bash
npx create-expo-app mobile --template blank-typescript
# Добавить "mobile" в workspaces в корневой package.json
# Добавить "@turkestate/api-client": "*" в mobile/package.json
npm install
```

### Использование API-клиента в мобилке

```typescript
import { createTurkEstateApi } from '@turkestate/api-client';

const api = createTurkEstateApi(process.env.EXPO_PUBLIC_API_URL!);

const session = await api.auth.login({ email, password });
api.client.setToken(session.access_token);
```

## Важные детали

- Auth через JWT токены (не куки) — уже мобильно-совместимо
- Вся бизнес-логика на бэкенде, Next.js не содержит server-only логики
- Фронт работает на порту 3001, бэкенд на 8000

## Правила работы с git

- **При любом коммите и пуше — сразу мерджить все worktree-ветки в main и пушить.** Не оставлять изменения только в worktree.
