import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { UserRecord } from "firebase-functions/lib/providers/auth";

import { handleDeleteUser } from "./userAuth";
import { USERS } from "./constants";
import { appCheckGuard, authGuard, adminGuard } from "./util";

const handleCreateUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
  isAdmin: boolean;
}): Promise<UserRecord> => {
  try {
    return await admin.auth().createUser({
      email: email,
      password: password,
    });
  } catch (err) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      (err as Error).message
    );
  }
};

const handleSetUserData = async ({
  userUid,
  newUserData,
  merge = false,
}: {
  userUid: string;
  newUserData: {
    email?: string;
    isAdmin?: boolean;
    authProvider?: string;
    uid?: string;
  };
  merge?: boolean;
}) => {
  return await admin
    .firestore()
    .collection(USERS)
    .doc(userUid)
    .set(newUserData, { merge });
};

const handleCreateUserData = async ({
  user,
  isAdmin,
}: {
  user: UserRecord;
  isAdmin: boolean;
  merge?: boolean;
}) => {
  const newUserData = {
    uid: user.uid,
    authProvider: "local",
    email: user.email,
    isAdmin: isAdmin,
  };

  return await handleSetUserData({
    userUid: user.uid,
    newUserData,
  });
};

const handleEditUserData = async ({
  userUid,
  userData,
}: {
  userUid: string;
  userData: {
    email?: string;
    isAdmin?: boolean;
  };
}) => {
  return await handleSetUserData({
    merge: true,
    userUid,
    newUserData: userData,
  });
};

export const createUserAsAdmin = functions.https.onCall(
  async (data, context) => {
    appCheckGuard(context);
    authGuard(context);
    adminGuard(context);

    const { email, password, isAdmin } = data;

    if (!email || !password || typeof isAdmin !== "boolean") {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "The function must be called with " +
          'three arguments "email", "password" and "isAdmin".'
      );
    }

    const newUser = await handleCreateUser({ email, password, isAdmin });

    if (!newUser) {
      throw new functions.https.HttpsError(
        "internal",
        "Failed to create user."
      );
    }

    await handleCreateUserData({ user: newUser, isAdmin });

    return {
      message: `User with id ${newUser.uid} and email ${newUser.email} created successfully.`,
    };
  }
);

export const editUserAsAdmin = functions.https.onCall(async (data, context) => {
  appCheckGuard(context);
  authGuard(context);
  adminGuard(context);

  const { uid, isAdmin } = data;

  if (!uid) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      `The function must be called with a user "uid".`
    );
  }

  // might implement ability to change password in the future

  await handleEditUserData({
    userUid: uid,
    userData: { isAdmin: !!isAdmin },
  });

  return {
    message: `User updated successfully.`,
  };
});

export const deleteUserAsAdmin = functions.https.onCall(
  async (data, context) => {
    appCheckGuard(context);
    authGuard(context);
    adminGuard(context);

    const { uid } = data;

    if (!uid) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        `The function must be called with a user "uid".`
      );
    }

    await handleDeleteUser(uid);

    return {
      message: `User deleted successfully.`,
    };
  }
);
