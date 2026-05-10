# Vowed

A private, invite-only wedding app for couples and their guests.

Couples create their wedding in minutes and share invite codes with guests. Guests join and get access to a live photo feed, the weekend schedule, and the registry. Hosts get an admin panel to post announcements, manage the schedule, and moderate guests. One account can belong to multiple wedding parties.

---

## Features

- **Invite-only access** — guest and host roles via separate invite codes
- **Multi-wedding** — one account can join multiple wedding parties; a party selection screen lets users switch between them
- **Live feed** — photo posts and announcements with likes, comments, and host pin/delete controls
- **Countdown** — live days · hours · minutes banner counting down to the exact ceremony time set by the host (stored UTC, displayed in device local time)
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
| Builds | EAS Build |

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
  (auth)/            invite, login, register, profile-setup, forgot-password, verify-email
  (onboarding)/      host onboarding flow (4 steps: account → names → date/venue → codes → confirm)
  (tabs)/            feed, schedule, guests, profile, manage (host only)
  select-wedding.tsx party selection screen (shown after every sign-in)
  compose.tsx        host post composer
  privacy.tsx        privacy policy
components/          shared UI (PostCard, CommentSheet, ScheduleEventCard, …)
constants/
  theme.ts           colors, fonts, radii, shadows
functions/src/       Cloud Functions — notifications, like/comment counters
lib/                 Firebase init, Firestore helpers, weddingConfig, notifications
store/               Zustand stores (auth, wedding, onboarding)
scripts/             seed.ts, seed2.ts, seed-empty-user.ts, wipe-db.ts
```

---

## Seed Data

Three test accounts are provided for development:

| Account | Email | Password | Weddings |
|---|---|---|---|
| Wedding 1 host | `james.carter@example.com` | `Vowed123!` | James & Olivia · Tuscany |
| Wedding 2 host | `emma.shaw@example.com` | `Vowed123!` | Emma & Ryan · Lake Como |
| Both weddings | `sophia.lane@example.com` | `Vowed123!` | Both (party-switch testing) |
| Empty account | `test.empty@example.com` | `Test123!` | None |

```bash
# Reset and re-seed
npx tsx scripts/wipe-db.ts
npx tsx scripts/seed.ts
npx tsx scripts/seed2.ts
npx tsx scripts/seed-empty-user.ts
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
# Remote (requires available build minutes)
eas build --platform ios --profile production

# Local (requires Xcode)
eas build --platform ios --profile production --local

# Submit to App Store
eas submit --platform ios
```

---

## Versioning

Current version: **v2.0.1**

| Version | Notes |
|---|---|
| v2.0.1 | Ceremony time input, UTC countdown fix, single status label |
| v2.0.0 | Multi-wedding party selection, leave wedding, routing overhaul |
| v1.x | Single-wedding architecture |
