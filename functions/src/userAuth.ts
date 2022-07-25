import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import { appCheckGuard, authGuard } from "./util";

export const handleDeleteUser = async (uid: string) => {
  const user = await admin.auth().getUser(uid);

  if (!user) {
    throw new Error(`User with id ${uid} does not exist.`);
  }

  await admin.auth().deleteUser(uid);

  return {
    message: `User with id ${uid} deleted.`,
  };
};

export const deleteUser = functions.https.onCall((data, context) => {
  appCheckGuard(context);
  authGuard(context);

  const uid = context.auth!.uid;

  if (!(typeof uid === "string") || uid.length === 0) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "The function must be called with " +
        'one arguments "uid" containing a user id.'
    );
  }

  return handleDeleteUser(uid).catch((err) => {
    throw new functions.https.HttpsError("unavailable", err.message);
  });
});
