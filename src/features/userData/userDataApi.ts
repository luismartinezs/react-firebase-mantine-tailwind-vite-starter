import { collection, query, where, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import type { Query, DocumentData, DocumentReference } from 'firebase/firestore';
import type { User } from 'firebase/auth';
import pRetry from 'p-retry';

import { useAuth, useFirestore } from '@/services/firebase';
import type { IUserData } from './userDataTypes';

const USERS = 'users';

interface IGetUserDataRefByUid<T> {
  (uid?: string): DocumentReference<T> | null;
}

// single user
export const getUserDataRefByUid: IGetUserDataRefByUid<IUserData> = (uid) => {
  if (!uid) {
    return null;
  }
  return doc(useFirestore(), USERS, uid) as DocumentReference<IUserData>;
};

export const getUserData = async (uid: string): Promise<IUserData | null> => {
  if (useAuth().currentUser === null) {
    return null;
  }

  const docRef = getUserDataRefByUid(uid);

  if (!docRef) {
    return null;
  }

  // need to retry this call because when a new user is created we need to wait for it to be added to firestore
  const docSnap = await pRetry(async () => getDoc(docRef), { retries: 3 });

  if (docSnap.exists()) {
    return docSnap.data();
  }

  return null;
};

// query multiple users
export const getUserDataByUid = async (uid: string): Promise<IUserData | null> => {
  const userData = await getUserDataByKey('uid', uid);

  // uids are unique so this shouldn't be an array, but handling this case just in case
  if (Array.isArray(userData)) {
    return userData[0];
  }

  return userData;
};

export const getQueryByKey = <K extends keyof IUserData>(key: K, value: IUserData[K]): Query<DocumentData> => {
  return query(collection(useFirestore(), USERS), where(key, '==', value));
};

const getUserDataByKey = async <K extends keyof IUserData>(
  key: K,
  value: IUserData[K]
): Promise<IUserData | IUserData[] | null> => {
  if (useAuth().currentUser === null) {
    return null;
  }

  const q = getQueryByKey(key, value);
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return null;
  }

  if (querySnapshot.size === 1) {
    return querySnapshot.docs[0].data() as IUserData;
  }

  return querySnapshot.docs.map((doc) => doc.data() as IUserData);
};

export const createUserData = (
  user: User,
  { authProvider = 'google', isAdmin = false } = {}
): ReturnType<typeof setDoc> => {
  const userPayload = {
    uid: user.uid,
    name: user.displayName,
    authProvider: authProvider || 'google',
    email: user.email,
    isAdmin,
  };

  return setDoc(doc(useFirestore(), USERS, user.uid), userPayload);
};

// creates user data if it doesn't exist
export const initUserData = async (user: User | null) => {
  if (user === null) {
    return;
  }

  const userData = await getUserDataByUid(user.uid);

  if (userData) {
    return;
  }

  await createUserData(user);
};

const userDataAPI = {
  getUserData,
  initUserData,
};

export default userDataAPI;
