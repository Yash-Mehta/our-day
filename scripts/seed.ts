// Run with: npx ts-node scripts/seed.ts
// Requires GOOGLE_APPLICATION_CREDENTIALS env var pointing to a service account JSON
import * as admin from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  projectId: process.env.FIREBASE_PROJECT_ID,
});
const db = admin.firestore();

async function seed() {
  await db.doc('config/inviteCode').set({ code: 'OURDAY2026' });
  console.log('Seeded invite code: OURDAY2026');
}

seed().then(() => process.exit(0));
