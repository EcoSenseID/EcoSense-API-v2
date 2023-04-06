import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

export const TEST_SUPERADMIN: Partial<DecodedIdToken> = {
  name: 'Test Superadmin',
  uid: 'dHjn5QmQor0WtikQWcgFg9VoSGqp',
  role: { superadmin: true },
  user_id: 'dHjn5QmQor0WtikQWcgFg9VoSGqp',
  sub: 'dHjn5QmQor0WtikQWcgFg9VoSGqp',
  email: 'test.superadmin@ecosense.id',
  email_verified: true,
};

export const TEST_ADMIN: Partial<DecodedIdToken> = {
  name: 'Test Admin',
  uid: 'rGDSnOsz8j40pKRnDcjfwSpwAKQC',
  role: { admin: true },
  user_id: 'rGDSnOsz8j40pKRnDcjfwSpwAKQC',
  sub: 'rGDSnOsz8j40pKRnDcjfwSpwAKQC',
  email: 'test.admin@ecosense.id',
  email_verified: true,
};

export const TEST_USER: Partial<DecodedIdToken> = {
  name: 'Test User',
  uid: 'ldyrApQWwYMe2YWOV3X2VJKS0nH2',
  role: { user: true },
  user_id: 'ldyrApQWwYMe2YWOV3X2VJKS0nH2',
  sub: 'ldyrApQWwYMe2YWOV3X2VJKS0nH2',
  email: 'test.user@ecosense.id',
  email_verified: true,
};
