import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { assertFails, assertSucceeds, initializeTestEnvironment, type RulesTestEnvironment } from '@firebase/rules-unit-testing';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import { readFile } from 'node:fs/promises';

let environment: RulesTestEnvironment;
const projectId = 'demo-english-circuit';
const profile = {
  schemaVersion: 1, contentVersion: '1.0.0', displayName: 'Alex', currentLevel: 'A0', currentWeek: 1,
  dailyGoalMinutes: 45, studyDays: [1,2,3,4,5], translationsEnabled: true, preferredVoice: '', speechRate: 0.85,
  theme: 'system', experimentalRecognition: false, currentStreak: 0, bestStreak: 0, totalStudyMinutes: 0,
  createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z',
};

beforeAll(async () => {
  environment = await initializeTestEnvironment({ projectId, firestore: { rules: await readFile('firestore.rules', 'utf8') }, storage: { host: '127.0.0.1', port: 9199, rules: await readFile('storage.rules', 'utf8') } });
  await new Promise((resolve) => setTimeout(resolve, 4_000));
});
beforeEach(async () => environment.clearFirestore());
afterAll(async () => environment.cleanup());

const verified = (uid: string) => environment.authenticatedContext(uid, { email: `${uid}@example.com`, email_verified: true });

describe('namespace educativo aislado', () => {
  it('rechaza usuarios no autenticados', async () => assertFails(getDoc(doc(environment.unauthenticatedContext().firestore(), 'users/a/apps/english'))));
  it('permite al propietario verificado crear y leer su perfil', async () => {
    const db = verified('a').firestore(); const target = doc(db, 'users/a/apps/english');
    await assertSucceeds(setDoc(target, profile)); await assertSucceeds(getDoc(target));
  });
  it('impide que un usuario acceda a otro usuario', async () => assertFails(getDoc(doc(verified('a').firestore(), 'users/b/apps/english'))));
  it('rechaza correos no verificados', async () => assertFails(setDoc(doc(environment.authenticatedContext('a', { email_verified: false }).firestore(), 'users/a/apps/english'), profile)));
  it('rechaza perfiles educativos inválidos', async () => assertFails(setDoc(doc(verified('a').firestore(), 'users/a/apps/english'), { ...profile, currentWeek: 99 })));
  it('acepta documentos educativos válidos con id determinista', async () => assertSucceeds(setDoc(doc(verified('a').firestore(), 'users/a/apps/english/lessonProgress/w01-l01'), { id: 'w01-l01', lessonId: 'w01-l01', schemaVersion: 1, updatedAt: '2026-01-01T00:00:00.000Z' })));
  it('mantiene bloqueadas rutas desconocidas', async () => assertFails(setDoc(doc(verified('a').firestore(), 'users/a/apps/english/unknown/x'), { id: 'x', schemaVersion: 1, updatedAt: '2026-01-01T00:00:00.000Z' })));
  it('no puede escribir datos financieros con payload educativo', async () => assertFails(setDoc(doc(verified('a').firestore(), 'users/a/accounts/english'), { id: 'english', schemaVersion: 1, updatedAt: '2026-01-01T00:00:00.000Z' })));
  it('mantiene protegidas rutas financieras ante usuarios ajenos', async () => assertFails(getDoc(doc(verified('a').firestore(), 'users/b/accounts/1'))));
  it('mantiene Storage completamente bloqueado', async () => {
    const write = uploadBytes(ref(verified('a').storage(`gs://${projectId}.appspot.com`), 'users/a/recordings/test.webm'), new Uint8Array([1,2,3]));
    await expect(write).rejects.toBeDefined();
  });
});
