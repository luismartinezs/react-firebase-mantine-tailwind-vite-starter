import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { CallableContext } from "firebase-functions/v1/https";

import { USERS } from "../constants";

const handleGetCurrentUserData = async (auth: CallableContext["auth"]) => {
  const docRef = admin.firestore().collection(USERS).doc(auth!.uid);
  return await docRef.get();
};

const isProd = process.env.NODE_ENV === "production";

export const appCheckGuard = (context: CallableContext) => {
  if (isProd && context.app == undefined) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called from an App Check verified app."
    );
  }
};

export const authGuard = (context: CallableContext) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called " + "while authenticated."
    );
  }
};

export const adminGuard = async (context: CallableContext) => {
  const currentUserData = await handleGetCurrentUserData(context.auth);

  // check that the calling user is an admin
  if (!currentUserData.data()?.isAdmin) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called by a admin."
    );
  }
};
