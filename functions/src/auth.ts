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
      name: 'Comida 1',
      eatFor: 'lunch',
      forChild: true,
    });
  } catch (e) {
    console.log('🛎 ', 'error adding default meal', getErrorMessage(e));
    return;
  }
  // Add default week plan
});
