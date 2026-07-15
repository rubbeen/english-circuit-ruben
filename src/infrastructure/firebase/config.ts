import { z } from 'zod';

const firebaseEnvSchema = z.object({
  apiKey: z.string().min(1), authDomain: z.string().min(1), projectId: z.literal('control-financiero-ruben'),
  storageBucket: z.string().min(1), messagingSenderId: z.literal('459907047052'), appId: z.string().min(1),
});

export type FirebaseServices = Awaited<ReturnType<typeof getFirebaseServices>>;
let services: Promise<{ auth: import('firebase/auth').Auth; firestore: import('firebase/firestore').Firestore }> | undefined;

export function firebaseConfigurationState(): { ready: boolean; message: string } {
  const ready = Boolean(import.meta.env.VITE_FIREBASE_API_KEY && import.meta.env.VITE_FIREBASE_APP_ID);
  return { ready, message: ready ? 'Firebase configurado' : 'Modo local: falta configurar la Web App de English Circuit' };
}

export async function getFirebaseServices() {
  if (services) return services;
  services = (async () => {
    const config = firebaseEnvSchema.parse({
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY, authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID, storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID, appId: import.meta.env.VITE_FIREBASE_APP_ID,
    });
    const [{ initializeApp }, { browserLocalPersistence, getAuth, setPersistence }, { getFirestore }] = await Promise.all([import('firebase/app'), import('firebase/auth'), import('firebase/firestore')]);
    const app = initializeApp(config, 'english-circuit');
    const auth = getAuth(app); await setPersistence(auth, browserLocalPersistence);
    return { auth, firestore: getFirestore(app) };
  })();
  return services;
}

