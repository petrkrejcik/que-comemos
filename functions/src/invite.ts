import { https } from 'firebase-functions';
import admin = require('firebase-admin');
import { getErrorMessage } from './utils';

export const invite = https.onRequest(async (req, res) => {
  // Grab the text parameter.
  const email = req.query.email?.toString() || '';
  try {
    const user = await admin.auth().getUserByEmail(email);
    res.json({
      result: {
        user: {
          name: user.displayName,
          email: user.email,
        },
      },
    });
  } catch (e) {
    res.json({ error: { message: getErrorMessage(e) } });
  }
});
