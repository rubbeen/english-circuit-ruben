import { z } from 'zod';
import type { BackupData, Repositories } from '../../domain/repositories';
import type { LessonProgress, LocalRecording, Profile, ReviewCardState, StatisticSnapshot, StudySession, SyncConflict, SyncOperation } from '../../domain/models';
import { createDefaultProfile } from '../../domain/models';
import { getDatabase } from './database';

const iso = z.string().datetime();
export const backupDataSchema = z.object({
  profile: z.object({ id: z.literal('profile'), schemaVersion: z.literal(1), displayName: z.string(), currentWeek: z.number().int().min(1).max(24), updatedAt: iso }).passthrough(),
  lessonProgress: z.array(z.object({ id: z.string(), lessonId: z.string(), schemaVersion: z.literal(1), updatedAt: iso }).passthrough()),
  reviewCards: z.array(z.object({ id: z.string(), lessonId: z.string(), schemaVersion: z.literal(1), updatedAt: iso }).passthrough()),
  statistics: z.array(z.object({ id: z.string(), schemaVersion: z.literal(1), updatedAt: iso }).passthrough()),
  studySessions: z.array(z.object({ id: z.string(), schemaVersion: z.literal(1), updatedAt: iso }).passthrough()),
});

async function clearStores() {
  const db = await getDatabase();
  const tx = db.transaction(['profile', 'lessonProgress', 'reviewCards', 'studySessions', 'statistics', 'syncQueue', 'conflicts'], 'readwrite');
  await Promise.all([...tx.objectStoreNames].map((name) => tx.objectStore(name).clear()));
  await tx.done;
}

export function createIndexedDbRepositories(): Repositories {
  const profile = {
    async get() { return (await (await getDatabase()).get('profile', 'profile')) ?? createDefaultProfile(); },
    async save(value: Profile) { await (await getDatabase()).put('profile', value); },
  };
  const lessonProgress = {
    async get(id: string) { return (await getDatabase()).get('lessonProgress', id); },
    async list() { return (await getDatabase()).getAll('lessonProgress'); },
    async save(value: LessonProgress) { await (await getDatabase()).put('lessonProgress', value); },
    async clear() { await (await getDatabase()).clear('lessonProgress'); },
  };
  const reviews = {
    async get(id: string) { return (await getDatabase()).get('reviewCards', id); },
    async list() { return (await getDatabase()).getAll('reviewCards'); },
    async listDue(now: Date) { return (await getDatabase()).getAllFromIndex('reviewCards', 'dueAt', IDBKeyRange.upperBound(now.toISOString())); },
    async save(value: ReviewCardState) { await (await getDatabase()).put('reviewCards', value); },
    async clear() { await (await getDatabase()).clear('reviewCards'); },
  };
  const sessions = {
    async list(limit = 50) { const values = await (await getDatabase()).getAllFromIndex('studySessions', 'startedAt'); return values.reverse().slice(0, limit); },
    async save(value: StudySession) { await (await getDatabase()).put('studySessions', value); },
    async clear() { await (await getDatabase()).clear('studySessions'); },
  };
  const statistics = {
    async list() { return (await getDatabase()).getAll('statistics'); },
    async save(value: StatisticSnapshot) { await (await getDatabase()).put('statistics', value); },
    async clear() { await (await getDatabase()).clear('statistics'); },
  };
  const recordings = {
    async list(lessonId?: string) { const db = await getDatabase(); return lessonId ? db.getAllFromIndex('recordings', 'lessonId', lessonId) : db.getAll('recordings'); },
    async save(value: LocalRecording) { await (await getDatabase()).put('recordings', value); },
    async delete(id: string) { await (await getDatabase()).delete('recordings', id); },
    async clear() { await (await getDatabase()).clear('recordings'); },
    async usage() { return (await (await getDatabase()).getAll('recordings')).reduce((sum, item) => sum + item.size, 0); },
  };
  const syncQueue = {
    async listReady(now: Date) { return (await getDatabase()).getAllFromIndex('syncQueue', 'nextAttemptAt', IDBKeyRange.upperBound(now.toISOString())); },
    async count() { return (await getDatabase()).count('syncQueue'); },
    async enqueue(value: SyncOperation) { const db = await getDatabase(); const previous = await db.get('syncQueue', value.id); await db.put('syncQueue', previous ? { ...value, createdAt: previous.createdAt, attempts: previous.attempts } : value); },
    async save(value: SyncOperation) { await (await getDatabase()).put('syncQueue', value); },
    async delete(id: string) { await (await getDatabase()).delete('syncQueue', id); },
  };
  const conflicts = {
    async list() { return (await getDatabase()).getAll('conflicts'); },
    async save(value: SyncConflict) { await (await getDatabase()).put('conflicts', value); },
    async delete(id: string) { await (await getDatabase()).delete('conflicts', id); },
  };
  const backup = {
    async exportData(): Promise<BackupData> { return { profile: await profile.get(), lessonProgress: await lessonProgress.list(), reviewCards: await reviews.list(), statistics: await statistics.list(), studySessions: await sessions.list(Number.MAX_SAFE_INTEGER) }; },
    async importData(data: BackupData) {
      const parsed = backupDataSchema.parse(data) as unknown as BackupData;
      await clearStores();
      await profile.save(parsed.profile);
      await Promise.all(parsed.lessonProgress.map((v) => lessonProgress.save(v)));
      await Promise.all(parsed.reviewCards.map((v) => reviews.save(v)));
      await Promise.all(parsed.statistics.map((v) => statistics.save(v)));
      await Promise.all(parsed.studySessions.map((v) => sessions.save(v)));
    },
    async clearAll() { await clearStores(); },
  };
  return { profile, lessonProgress, reviews, sessions, statistics, recordings, syncQueue, conflicts, backup };
}
