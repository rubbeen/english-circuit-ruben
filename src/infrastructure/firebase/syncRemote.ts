import type { LessonProgress, Profile, ReviewCardState, StatisticSnapshot, StudySession, SyncOperation } from '../../domain/models';
import { getFirebaseServices } from './config';

const allowedEntities = new Set<SyncOperation['entity']>(['profile', 'lessonProgress', 'reviewCards', 'studySessions', 'statistics']);

export interface EducationalSnapshot {
  profile?: Profile;
  lessonProgress: LessonProgress[];
  reviewCards: ReviewCardState[];
  studySessions: StudySession[];
  statistics: StatisticSnapshot[];
}

function normalizeRemoteRecord<T>(value: unknown, fallbackId: string): T | undefined {
  if (!value || typeof value !== 'object') return undefined;
  const record = value as Record<string, unknown>;
  const timestamp = record.updatedAt;
  let updatedAt: string | undefined;
  if (typeof timestamp === 'string') updatedAt = timestamp;
  else if (timestamp && typeof timestamp === 'object' && 'toDate' in timestamp && typeof timestamp.toDate === 'function') {
    const date = timestamp.toDate();
    if (date instanceof Date && !Number.isNaN(date.getTime())) updatedAt = date.toISOString();
  }
  if (record.schemaVersion !== 1 || !updatedAt) return undefined;
  return { ...record, id: typeof record.id === 'string' ? record.id : fallbackId, updatedAt } as T;
}

export function serializeEducationalPayload(operation: SyncOperation, updatedAt: unknown) {
  const payload = { ...(operation.payload as Record<string, unknown>) };
  if (operation.entity === 'profile') delete payload.id;
  return { ...payload, updatedAt };
}

export async function pushEducationalOperation(uid: string, operation: SyncOperation) {
  if (!allowedEntities.has(operation.entity)) throw new Error('Entidad de sincronización no permitida.');
  const { firestore } = await getFirebaseServices();
  const { doc, serverTimestamp, setDoc, deleteDoc } = await import('firebase/firestore');
  const base = `users/${uid}/apps/english`;
  const reference = operation.entity === 'profile' ? doc(firestore, base) : doc(firestore, `${base}/${operation.entity}/${operation.entityId}`);
  if (operation.kind === 'delete') await deleteDoc(reference);
  else await setDoc(reference, serializeEducationalPayload(operation, serverTimestamp()), { merge: true });
}

export async function pullEducationalSnapshot(uid: string): Promise<EducationalSnapshot> {
  const { firestore } = await getFirebaseServices();
  const { collection, doc, getDoc, getDocs } = await import('firebase/firestore');
  const base = `users/${uid}/apps/english`;
  const [profileDocument, progressDocuments, reviewDocuments, sessionDocuments, statisticDocuments] = await Promise.all([
    getDoc(doc(firestore, base)),
    getDocs(collection(firestore, `${base}/lessonProgress`)),
    getDocs(collection(firestore, `${base}/reviewCards`)),
    getDocs(collection(firestore, `${base}/studySessions`)),
    getDocs(collection(firestore, `${base}/statistics`)),
  ]);
  const profile = profileDocument.exists() ? normalizeRemoteRecord<Profile>(profileDocument.data(), 'profile') : undefined;
  const normalizeDocuments = <T>(documents: typeof progressDocuments) => documents.docs.flatMap((item) => {
    const value = normalizeRemoteRecord<T>(item.data(), item.id);
    return value ? [value] : [];
  });
  return {
    profile,
    lessonProgress: normalizeDocuments<LessonProgress>(progressDocuments),
    reviewCards: normalizeDocuments<ReviewCardState>(reviewDocuments),
    studySessions: normalizeDocuments<StudySession>(sessionDocuments),
    statistics: normalizeDocuments<StatisticSnapshot>(statisticDocuments),
  };
}
