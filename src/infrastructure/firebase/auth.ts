import { getFirebaseServices } from './config';

export async function signInWithEmail(email: string, password: string) {
  const { auth } = await getFirebaseServices();
  const { signInWithEmailAndPassword, signOut } = await import('firebase/auth');
  const credential = await signInWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
  if (!credential.user.emailVerified) { await signOut(auth); throw new Error('Debes verificar tu correo antes de sincronizar.'); }
  return credential.user;
}

export async function signOutFromFirebase() { const { auth } = await getFirebaseServices(); const { signOut } = await import('firebase/auth'); await signOut(auth); }

export async function observeAuth(callback: (user: import('firebase/auth').User | null) => void) {
  const { auth } = await getFirebaseServices(); const { onAuthStateChanged } = await import('firebase/auth');
  return onAuthStateChanged(auth, (user) => callback(user?.emailVerified ? user : null));
}

