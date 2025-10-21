# Welcome to your Expo app 👋

# Beskrivning för VG

Du skall i denna uppgift bygga en väderapp med React Native och OpenWeatherMap API:et. Appen skall bestå av 3 sidor: **huvudsidan**, **favoriter** och **inställningar**. Varje sida har olika funktioner.

## Huvudsida:
- [x] Ett textfält där man kan skriva in namn på en stad
- [x] En plats för att visa vädret för staden som står i textfältet
- [x] Värden som skall visas: temperatur, en kort beskrivning och en ikon (sol, moln, regn)
- [x] En knapp för att markera staden som favorit (som finns kvar även efter omstart)
- [x] En knapp för att automatiskt söka upp staden man är i med GPS

## Favoriter sida:
- [x] En lista med favoritstäder 
- [x] Ett sätt att ta bort en favorit
- [x] Man skall kunna trycka på en stad som visar den stadens väder på huvudsidan

## Inställningar sida:
- [x] En inställning för att byta mellan celsius och fahrenheit

## Setup Instructions

### 1. Install dependencies

```bash
npm install
```

### 2. Get OpenWeatherMap API Key

1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Generate an API key
4. Open `app/services/weather-service.ts`
5. Replace `YOUR_API_KEY_HERE` with your actual API key:

```typescript
const API_KEY = "your_actual_api_key_here";
```

### 3. Start the app

```bash
npx expo start
```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Features

- ✅ Search weather by city name
- ✅ Get weather by current GPS location
- ✅ Add cities to favorites (persisted with AsyncStorage)
- ✅ Remove cities from favorites
- ✅ Switch between Celsius and Fahrenheit
- ✅ Beautiful UI with light/dark mode support
- ✅ Weather icons mapped to SF Symbols
- ✅ Additional weather info (humidity, wind speed)

## Tech Stack

- React Native
- Expo
- TypeScript
- Expo Router (file-based routing)
- Context API (state management)
- AsyncStorage (persistent storage)
- OpenWeatherMap API
- Expo Location

## Project Structure

```
app/
├── (tabs)/           # Tab screens
│   ├── index.tsx     # Home screen
│   ├── favourites.tsx # Favorites screen
│   └── settings.tsx  # Settings screen
├── context/          # React Context
│   └── weather-context.tsx
├── services/         # API services
│   └── weather-service.ts
└── _layout.tsx       # Root layout

hooks/
└── use-fetch-weather.ts  # Weather fetching hook

constants/
├── endpoints.ts      # API endpoints
└── theme.ts          # Theme colors
```

## Conventional Commits

This project uses conventional commits:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Test changes
- `chore:` - Build/tooling changes

---

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).
