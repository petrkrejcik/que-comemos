import { auth } from 'firebase-functions';
import admin = require('firebase-admin');
import { getErrorMessage } from './utils';

export const onUserCreate = auth.user().onCreate(async (user) => {
  let groupRef;
  try {
    groupRef = await admin
      .firestore()
      .collection('groups')
      .add({ owner: { uid: user.uid } });
    console.log('🛎 ', 'groupRef.id', groupRef.id);
  } catch (e) {
    console.log('🛎 ', 'error creating group', getErrorMessage(e));
    return;
  }
  try {
    await admin.auth().setCustomUserClaims(user.uid, { groupId: groupRef.id });
  } catch (e) {
    console.log('🛎 ', 'error settings claims', getErrorMessage(e));
    return;
  }
  try {
    await admin.firestore().collection(`groups/${groupRef.id}/meals`).add({
      name: 'Lasaña',
      eatFor: 'lunch',
      forChild: true,
    });
    await admin.firestore().collection(`groups/${groupRef.id}/meals`).add({
      name: 'Paella',
      eatFor: 'lunch',
      forChild: true,
    });
    await admin.firestore().collection(`groups/${groupRef.id}/meals`).add({
      name: 'Chilli con carne',
      eatFor: 'lunch',
      forChild: true,
    });
    await admin.firestore().collection(`groups/${groupRef.id}/meals`).add({
      name: 'Improvisada',
      eatFor: 'lunch',
      forChild: true,
    });
    await admin.firestore().collection(`groups/${groupRef.id}/meals`).add({
      name: 'Pescado',
      eatFor: 'lunch',
      forChild: true,
      withSideDish: true,
    });
    await admin.firestore().collection(`groups/${groupRef.id}/meals`).add({
      name: 'Patatas',
      eatFor: 'side-dish',
      forChild: true,
    });
    await admin.firestore().collection(`groups/${groupRef.id}/meals`).add({
      name: 'Verdura',
      eatFor: 'side-dish',
      forChild: true,
    });
    await admin.firestore().collection(`groups/${groupRef.id}/meals`).add({
      name: 'Bocadillo',
      eatFor: 'dinner',
      forChild: true,
    });
    await admin.firestore().collection(`groups/${groupRef.id}/meals`).add({
      name: 'Jamón y queso',
      eatFor: 'dinner',
      forChild: true,
    });
  } catch (e) {
    console.log('🛎 ', 'error adding default meal', getErrorMessage(e));
    return;
  }
  // Add default week plan
});
