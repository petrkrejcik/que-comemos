/* eslint-disable @typescript-eslint/no-unused-vars */
import admin = require('firebase-admin');
import { CreateRequest } from 'firebase-admin/lib/auth/auth-config';

import * as serviceAccount from '../lib/adminsdk.json';

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: serviceAccount.project_id,
    clientEmail: serviceAccount.client_email,
    privateKey: serviceAccount.private_key,
  }),
  databaseURL: 'https://que-comemos-hoy-5febf.firebaseio.com',
});

const getUser = async (uid: string) => {
  const user = await admin.auth().getUser(uid);
  console.log('🛎 ', 'user', user);
};

const setUserClaims = async (uid: string, claims: Record<string, string>) => {
  try {
    await admin.auth().setCustomUserClaims(uid, claims);
    console.log('🛎 ', '✅ User claims set');
  } catch (e) {
    console.log('🛎 ', '❌ Error setting user claims', e);
  }
};

const createUser = async (user: CreateRequest) => {
  try {
    await admin.auth().createUser(user);
    console.log('🛎 ', '✅ User created');
  } catch (e) {
    console.log('🛎 ', '❌ Error creating the user', e);
  }
};

const petrUid = 'zBvIhyMDwtWQ65Y98CXGYXYnQaq2';
const elenaUid = 'L8hBOOjzcSPcZrn2sg3wIgqueOh2';
// getUser('fMir1DOkKYagFQb7GImgreQvMKH2');
// setUserClaims(elenaUid, { groupId: 'mojeI6fi9GdeWywMEn9Yr' });
// createUser({ email: 'c.brito@stuart.com', emailVerified: true });
// createUser({ email: 'c.geria@stuart.com', emailVerified: true });
// createUser({ email: 'm.karimov@stuart.com', emailVerified: true });
// createUser({ email: 'p.rodriguez@stuart.com', emailVerified: true });
// createUser({ email: 't.akinsanya@stuart.com', emailVerified: true });
