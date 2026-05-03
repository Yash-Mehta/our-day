"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onMemberUpdated = exports.onCommentDeleted = exports.onLikeDeleted = exports.onLikeCreated = exports.onCommentCreated = exports.onPostCreated = exports.sendResetEmail = void 0;
const app_1 = require("firebase-admin/app");
const firestore_1 = require("firebase-admin/firestore");
const messaging_1 = require("firebase-admin/messaging");
const auth_1 = require("firebase-admin/auth");
const firestore_2 = require("firebase-admin/firestore");
const firestore_3 = require("firebase-functions/v2/firestore");
const https_1 = require("firebase-functions/v2/https");
const params_1 = require("firebase-functions/params");
const nodemailer = require("nodemailer");
(0, app_1.initializeApp)();
const db = (0, firestore_1.getFirestore)();
const messaging = (0, messaging_1.getMessaging)();
const gmailUser = (0, params_1.defineSecret)('GMAIL_USER');
const gmailPass = (0, params_1.defineSecret)('GMAIL_APP_PASS');
// ── Email template ────────────────────────────────────────────────────────────
function resetEmailHtml(resetLink) {
    return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F4ECE2;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F4ECE2;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:480px;background:#FAF6F1;border-radius:22px;padding:48px 40px;font-family:Georgia,serif;">
        <tr><td align="center" style="padding-bottom:36px;">
          <div style="font-size:44px;color:#7A4A3F;font-style:italic;letter-spacing:-2px;">Our Day</div>
          <p style="font-family:Arial,sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#8C7064;margin:8px 0 0;">Wedding &amp; Celebration App</p>
        </td></tr>
        <tr><td style="padding-bottom:12px;">
          <h1 style="font-size:28px;font-weight:normal;color:#2A1D17;margin:0;line-height:1.2;">Reset your password</h1>
        </td></tr>
        <tr><td style="padding-bottom:32px;">
          <p style="font-family:Arial,sans-serif;font-size:15px;color:#5C463C;line-height:1.7;margin:0;">
            Someone requested a password reset for your <strong>Our Day</strong> account. Tap the button below to choose a new password.
          </p>
        </td></tr>
        <tr><td align="center" style="padding-bottom:32px;">
          <a href="${resetLink}"
             style="display:inline-block;background:#7A4A3F;color:#FAF6F1;text-decoration:none;font-family:Arial,sans-serif;font-size:15px;font-weight:600;padding:14px 36px;border-radius:9999px;letter-spacing:0.3px;">
            Reset my password
          </a>
        </td></tr>
        <tr><td style="padding-bottom:36px;">
          <p style="font-family:Arial,sans-serif;font-size:12px;color:#8C7064;line-height:1.7;margin:0;">
            If you didn't request this, you can safely ignore this email — your password won't change.
            This link expires in <strong>1 hour</strong>.
          </p>
        </td></tr>
        <tr><td style="padding-bottom:36px;">
          <p style="font-family:Arial,sans-serif;font-size:11px;color:#B59E91;line-height:1.7;margin:0;">
            Button not working? Copy and paste this link into your browser:<br>
            <a href="${resetLink}" style="color:#7A4A3F;word-break:break-all;">${resetLink}</a>
          </p>
        </td></tr>
        <tr><td align="center" style="border-top:0.5px solid rgba(122,74,63,0.14);padding-top:24px;">
          <p style="font-family:Arial,sans-serif;font-size:11px;color:#B59E91;margin:0;">Our Day · Wedding &amp; Celebration App</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
// ── Send password reset email ─────────────────────────────────────────────────
exports.sendResetEmail = (0, https_1.onCall)({ secrets: [gmailUser, gmailPass] }, async (request) => {
    var _a, _b;
    const email = (_b = (_a = request.data) === null || _a === void 0 ? void 0 : _a.email) === null || _b === void 0 ? void 0 : _b.trim().toLowerCase();
    if (!email)
        throw new https_1.HttpsError('invalid-argument', 'Email is required.');
    let resetLink;
    try {
        resetLink = await (0, auth_1.getAuth)().generatePasswordResetLink(email);
    }
    catch (e) {
        if (e.code === 'auth/user-not-found') {
            return { success: true };
        }
        throw new https_1.HttpsError('internal', 'Could not generate reset link.');
    }
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: gmailUser.value(), pass: gmailPass.value() },
    });
    await transporter.sendMail({
        from: `"Our Day" <${gmailUser.value()}>`,
        to: email,
        subject: 'Reset your Our Day password',
        html: resetEmailHtml(resetLink),
    });
    return { success: true };
});
// ── Push notifications ────────────────────────────────────────────────────────
async function getWeddingFcmTokens(weddingId) {
    const snap = await db.collection('weddings').doc(weddingId).collection('members').get();
    return snap.docs
        .map((d) => d.data().fcmToken)
        .filter((t) => !!t);
}
exports.onPostCreated = (0, firestore_3.onDocumentCreated)('weddings/{weddingId}/posts/{postId}', async (event) => {
    var _a, _b, _c;
    const post = (_a = event.data) === null || _a === void 0 ? void 0 : _a.data();
    if (!post)
        return;
    const { weddingId } = event.params;
    const tokens = await getWeddingFcmTokens(weddingId);
    if (tokens.length === 0)
        return;
    const isAnnouncement = post.type === 'announcement';
    const title = isAnnouncement ? 'New announcement' : `${post.authorName} posted a photo`;
    const body = (_c = (_b = post.caption) === null || _b === void 0 ? void 0 : _b.slice(0, 120)) !== null && _c !== void 0 ? _c : '';
    await messaging.sendEachForMulticast({
        tokens,
        notification: { title, body },
        apns: { payload: { aps: { sound: 'default' } } },
    });
});
exports.onCommentCreated = (0, firestore_3.onDocumentCreated)('weddings/{weddingId}/posts/{postId}/comments/{commentId}', async (event) => {
    var _a, _b, _c, _d;
    const comment = (_a = event.data) === null || _a === void 0 ? void 0 : _a.data();
    if (!comment)
        return;
    const { weddingId, postId } = event.params;
    const postRef = db.doc(`weddings/${weddingId}/posts/${postId}`);
    const postSnap = await postRef.get();
    if (!postSnap.exists)
        return;
    const post = postSnap.data();
    await postRef.update({ commentCount: firestore_2.FieldValue.increment(1) });
    if (post.authorId === comment.authorId)
        return;
    const authorSnap = await db.doc(`weddings/${weddingId}/members/${post.authorId}`).get();
    if (!authorSnap.exists)
        return;
    const token = (_b = authorSnap.data()) === null || _b === void 0 ? void 0 : _b.fcmToken;
    if (!token)
        return;
    await messaging.send({
        token,
        notification: {
            title: `${comment.authorName} commented on your post`,
            body: (_d = (_c = comment.text) === null || _c === void 0 ? void 0 : _c.slice(0, 120)) !== null && _d !== void 0 ? _d : '',
        },
        apns: { payload: { aps: { sound: 'default' } } },
    });
});
exports.onLikeCreated = (0, firestore_3.onDocumentCreated)('weddings/{weddingId}/posts/{postId}/likes/{uid}', async (event) => {
    const { weddingId, postId } = event.params;
    await db.doc(`weddings/${weddingId}/posts/${postId}`).update({
        likeCount: firestore_2.FieldValue.increment(1),
    });
});
exports.onLikeDeleted = (0, firestore_3.onDocumentDeleted)('weddings/{weddingId}/posts/{postId}/likes/{uid}', async (event) => {
    const { weddingId, postId } = event.params;
    await db.doc(`weddings/${weddingId}/posts/${postId}`).update({
        likeCount: firestore_2.FieldValue.increment(-1),
    });
});
exports.onCommentDeleted = (0, firestore_3.onDocumentDeleted)('weddings/{weddingId}/posts/{postId}/comments/{commentId}', async (event) => {
    const { weddingId, postId } = event.params;
    await db.doc(`weddings/${weddingId}/posts/${postId}`).update({
        commentCount: firestore_2.FieldValue.increment(-1),
    });
});
exports.onMemberUpdated = (0, firestore_3.onDocumentUpdated)('weddings/{weddingId}/members/{uid}', async (event) => {
    var _a, _b, _c;
    const before = (_a = event.data) === null || _a === void 0 ? void 0 : _a.before.data();
    const after = (_b = event.data) === null || _b === void 0 ? void 0 : _b.after.data();
    if (!before || !after)
        return;
    const nameChanged = before.displayName !== after.displayName;
    const photoChanged = before.photoURL !== after.photoURL;
    if (!nameChanged && !photoChanged)
        return;
    const { weddingId, uid } = event.params;
    const update = {};
    if (nameChanged)
        update.authorName = after.displayName;
    if (photoChanged)
        update.authorPhotoURL = (_c = after.photoURL) !== null && _c !== void 0 ? _c : null;
    // Update all posts by this author in this wedding
    const postsSnap = await db
        .collection(`weddings/${weddingId}/posts`)
        .where('authorId', '==', uid)
        .get();
    if (postsSnap.size > 0) {
        const batch = db.batch();
        postsSnap.docs.forEach((d) => batch.update(d.ref, update));
        await batch.commit();
    }
    // Update all comments by this author in this wedding
    const commentsSnap = await db
        .collectionGroup('comments')
        .where('authorId', '==', uid)
        .get();
    const weddingPrefix = `weddings/${weddingId}/`;
    const toUpdate = commentsSnap.docs.filter((d) => d.ref.path.startsWith(weddingPrefix));
    if (toUpdate.length > 0) {
        const batch = db.batch();
        toUpdate.forEach((d) => batch.update(d.ref, update));
        await batch.commit();
    }
});
//# sourceMappingURL=index.js.map