# Our Day

A private, invite-only wedding app for couples and their guests.

Couples create their wedding in minutes and share invite codes with guests. Guests join and get access to a live photo feed, the weekend schedule, and the registry. Hosts get an admin panel to post announcements, manage the schedule, and moderate guests.

---

## Features

- **Invite-only access** — guest and host roles via separate invite codes
- **Live feed** — photo posts and announcements with likes, comments, and host pin/delete controls
- **Countdown** — live days · hours · minutes banner counting down to the ceremony
- **Schedule** — full wedding weekend itinerary with event icons, dress codes, and live countdown to the next event
- **Host admin panel** — add/edit/reorder schedule events, promote/demote guests, upload wedding logo
- **Push notifications** — new posts and comments via FCM
- **Multi-tenant** — each wedding is fully isolated; one app serves many couples

---

## Tech Stack

| Layer | Technology |
|---|---|
| App | React Native · Expo SDK 54 · expo-router |
| Backend | Firebase (Auth · Firestore · Storage · Cloud Functions v2) |
| State | Zustand |
| Notifications | Firebase Cloud Messaging |

---

## Getting Started

### Prerequisites

- Node 18+
- Expo Go app or iOS/Android simulator
- Firebase project with Auth, Firestore, Storage, and Functions enabled

### Install

```bash
npm install
```

### Environment

Copy `.env.example` to `.env` and fill in your Firebase config values:

```bash
cp .env.example .env
```

### Run

```bash
npx expo start
```

Scan the QR code with Expo Go.

---

## Project Structure

```
app/
  (auth)/          invite, login, register, profile-setup, forgot-password
  (onboarding)/    host onboarding flow (4 steps: account → names → date/venue → codes)
  (tabs)/          feed, schedule, guests, profile, manage (host only)
  compose.tsx      host post composer
  privacy.tsx      privacy policy
components/        shared UI (PostCard, CommentSheet, ScheduleEventCard, …)
constants/
  theme.ts         colors, fonts, radii, shadows
functions/src/     Cloud Functions — notifications, like/comment counters
lib/               Firebase init, Firestore helpers, notifications
store/             Zustand stores (auth, wedding, onboarding)
```

---

## Deploying

### Firestore + Storage Rules

```bash
firebase deploy --only firestore:rules,storage
```

### Cloud Functions

```bash
cd functions && npm run build
firebase deploy --only functions
```

### App (EAS Build)

```bash
eas build --platform ios
eas submit --platform ios
```
