import { type FirebaseApp, initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { connectAuthEmulator, getAuth, type Auth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectStorageEmulator, getStorage } from 'firebase/storage';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

import config from './config';

let initialized = false;
let app: FirebaseApp = null!;
let auth: Auth;
let firestore: ReturnType<typeof getFirestore>;
let storage: ReturnType<typeof getStorage>;
let functions: ReturnType<typeof getFunctions>;

const useEmulator = () => import.meta.env.VITE_FIREBASE_EMULATOR as string;

// init firebase app
const initFirebaseApp = () => {
  if (initialized) {
    return;
  }
  initialized = true;
  try {
    app = initializeApp(config);

    if (import.meta.env.PROD) {
      initializeAppCheck(app, {
        // replace the public key below with your own public key
        provider: new ReCaptchaV3Provider(import.meta.env.VITE_RECAPTCHA_V3_PUBLIC_KEY as string),
        isTokenAutoRefreshEnabled: true,
      });
    }
  } catch (error) {
    console.error({ error });
  }
};

const useAuth = () => {
  if (!auth) {
    auth = getAuth(app);
    if (useEmulator()) {
      connectAuthEmulator(auth, 'http://localhost:9099');
    }
  }
  return auth;
};

const useFirestore = () => {
  if (!firestore) {
    firestore = getFirestore(app);
    if (useEmulator()) {
      connectFirestoreEmulator(firestore, 'localhost', 8080);
    }
  }
  return firestore;
};

const useStorage = () => {
  if (!storage) {
    storage = getStorage(app);
    if (useEmulator()) {
      connectStorageEmulator(storage, 'localhost', 9199);
    }
  }
  return storage;
};

const useFunctions = () => {
  if (!functions) {
    functions = getFunctions(app);
    if (useEmulator()) {
      connectFunctionsEmulator(functions, 'localhost', 5001);
    }
  }
  return functions;
};

export { initFirebaseApp, useAuth, useFirestore, useFunctions, useStorage };
