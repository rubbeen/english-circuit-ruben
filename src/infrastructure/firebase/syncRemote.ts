import type { SyncOperation } from '../../domain/models';
import { getFirebaseServices } from './config';

const allowedEntities = new Set<SyncOperation['entity']>(['profile', 'lessonProgress', 'reviewCards', 'studySessions', 'statistics']);

export async function pushEducationalOperation(uid: string, operation: SyncOperation) {
  if (!allowedEntities.has(operation.entity)) throw new Error('Entidad de sincronización no permitida.');
  const { firestore } = await getFirebaseServices();
  const { doc, serverTimestamp, setDoc, deleteDoc } = await import('firebase/firestore');
  const base = `users/${uid}/apps/english`;
  const reference = operation.entity === 'profile' ? doc(firestore, base) : doc(firestore, `${base}/${operation.entity}/${operation.entityId}`);
  if (operation.kind === 'delete') await deleteDoc(reference);
  else await setDoc(reference, { ...(operation.payload as object), updatedAt: serverTimestamp() }, { merge: true });
}
