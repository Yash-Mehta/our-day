# Our Day

A private wedding app for Yash & Vaani — Hard Rock Hotel & Casino, Punta Cana · December 5, 2026.

Guests join with an invite code and get access to the live photo feed, wedding weekend schedule, and registry. Hosts get an admin panel to post announcements, manage the schedule, and moderate guests.

---

## Features

- **Invite-only access** — guest and host roles via separate invite codes
- **Live feed** — photo posts and announcements with likes, comments, and host pin/delete controls
- **Countdown** — live days · hours · minutes banner counting down to the ceremony
- **Schedule** — full weekend itinerary (Dec 2–5) with event icons, dress codes, and countdown to next event
- **Host admin panel** — add/edit/reorder schedule events, promote/demote guests
- **Push notifications** — new posts and comments via FCM
- **Password reset** — custom branded email via Gmail + Cloud Functions

---

## Tech Stack

| Layer | Technology |
|---|---|
| App | React Native · Expo SDK 54 · expo-router |
| Backend | Firebase (Auth · Firestore · Storage · Cloud Functions v2) |
| State | Zustand |
| Notifications | Firebase Cloud Messaging |
| Email | Nodemailer via Gmail SMTP |

---

## Getting Started

### Prerequisites

- Node 18+
- Expo Go app on your phone, or an iOS/Android simulator
- Firebase project with Auth, Firestore, Storage, and Functions enabled

### Install

```bash
npm install
```

### Environment

Create `lib/firebase.ts` with your Firebase config (already gitignored if you store secrets there).

### Run

```bash
npx expo start
```

Scan the QR code with Expo Go.

### Seed Firestore

```bash
npx ts-node scripts/seed.ts
```

Creates the guest and host invite codes, and sample schedule events.

---

## Project Structure

```
app/
  (auth)/          invite, login, register, profile-setup, forgot-password
  (tabs)/          feed, schedule, profile, manage (host only)
  compose.tsx      host post composer
components/        shared UI (PostCard, CommentSheet, ScheduleEventCard, …)
constants/
  WEDDING.ts       single source of truth for all wedding details + countdown helpers
  theme.ts         colors, fonts, radii, shadows
functions/src/     Cloud Functions — notifications, email, like/comment counters
lib/               Firebase init, Firestore helpers, notifications
store/             Zustand auth store
scripts/
  seed.ts          Firestore seed data
  generate-icon.mjs  regenerate app icons from SVG source
```

---

## Regenerating the App Icon

```bash
node scripts/generate-icon.mjs
```

Outputs `icon.png`, `splash-icon.png`, `adaptive-icon.png`, and `favicon.png` to `assets/`.

---

## Deploying Cloud Functions

```bash
cd functions
npm run build
firebase deploy --only functions
```

Set Gmail secrets before deploying:

```bash
firebase functions:secrets:set GMAIL_USER
firebase functions:secrets:set GMAIL_APP_PASS
```

---

## Firestore Rules

Rules live in `firestore.rules`. Deploy with:

```bash
firebase deploy --only firestore:rules
```

Guests can read posts and write to their own likes/comments subcollections. Only hosts can create or update posts and schedule events.
