export const WEDDING = {
  coupleName: 'Yash & Vaani',
  coupleNameFull: 'Yash and Vaani',
  date: 'Saturday, December 12, 2026',
  shortDate: 'Dec 12, 2026',
  dateStamp: '12 · 12 · 26',
  venue: 'Anantara Villa · Goa, India',
  venueShort: 'Anantara Villa · Goa',
  hashtag: '#YashLovesVaani',
  registryUrl: 'https://withjoy.com/yash-and-vaani/registry',
  inviteCode: 'OURDAY2026',
  weddingDate: new Date('2026-12-12T16:30:00+05:30'),
};

export function getDaysUntilWedding(): number {
  const now = new Date();
  const diff = WEDDING.weddingDate.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}
