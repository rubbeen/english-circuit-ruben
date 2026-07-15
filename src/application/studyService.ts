import { z } from 'zod';
import type { Lesson } from '../content/schema';
import type { LessonProgress, Profile, ReviewCardState, ReviewRating, StudySession, SyncStatus } from '../domain/models';
import type { BackupData, Repositories } from '../domain/repositories';
import { scheduleReview } from '../domain/spacedRepetition';

const backupEnvelopeSchema = z.object({ application: z.literal('english-circuit'), schemaVersion: z.literal(1), exportedAt: z.string().datetime(), data: z.unknown() });

export class StudyService {
  constructor(private readonly repositories: Repositories) {}

  getProfile() { return this.repositories.profile.get(); }
  async saveProfile(profile: Profile) { const value = { ...profile, updatedAt: new Date().toISOString() }; await this.repositories.profile.save(value); await this.enqueue('profile', 'profile', value); return value; }
  listProgress() { return this.repositories.lessonProgress.list(); }
  getProgress(lessonId: string) { return this.repositories.lessonProgress.get(lessonId); }
  listReviews() { return this.repositories.reviews.list(); }
  listDueReviews(now = new Date()) { return this.repositories.reviews.listDue(now); }
  listSessions(limit = 50) { return this.repositories.sessions.list(limit); }
  getSyncStatus = async (): Promise<SyncStatus> => !navigator.onLine ? 'offline' : (await this.repositories.syncQueue.count()) > 0 ? 'pending' : 'synced';

  async saveProgress(lessonId: string, patch: Partial<LessonProgress>) {
    const now = new Date().toISOString();
    const current = await this.repositories.lessonProgress.get(lessonId);
    const value: LessonProgress = { id: lessonId, lessonId, completed: false, score: 0, answers: {}, draft: '', elapsedMinutes: 0, schemaVersion: 1, ...current, ...patch, updatedAt: now };
    await this.repositories.lessonProgress.save(value); await this.enqueue('lessonProgress', lessonId, value); return value;
  }

  async completeLesson(lesson: Lesson, answers: Record<string, string>, minutes: number) {
    const correct = lesson.exercises.filter((exercise) => answers[exercise.id]?.trim().toLocaleLowerCase() === exercise.answer.trim().toLocaleLowerCase()).length;
    const score = Math.round((correct / lesson.exercises.length) * 100);
    const now = new Date();
    const progress = await this.saveProgress(lesson.id, { answers, completed: true, score, elapsedMinutes: Math.max(1, Math.round(minutes)) });
    for (const [index, item] of lesson.reviewCards.entries()) {
      const id = `${lesson.id}-card-${index + 1}`;
      const existing = await this.repositories.reviews.get(id);
      const card: ReviewCardState = existing ?? { id, lessonId: lesson.id, front: item.front, back: item.back, intervalDays: 0, easeFactor: 2.5, repetitions: 0, lapses: 0, dueAt: now.toISOString(), updatedAt: now.toISOString(), schemaVersion: 1 };
      await this.repositories.reviews.save(card); await this.enqueue('reviewCards', id, card);
    }
    const session: StudySession = { id: crypto.randomUUID(), lessonId: lesson.id, startedAt: new Date(now.getTime() - minutes * 60_000).toISOString(), endedAt: now.toISOString(), minutes: Math.max(1, Math.round(minutes)), correct, total: lesson.exercises.length, updatedAt: now.toISOString(), schemaVersion: 1 };
    await this.repositories.sessions.save(session); await this.enqueue('studySessions', session.id, session);
    const profile = await this.getProfile(); await this.saveProfile({ ...profile, currentWeek: Math.max(profile.currentWeek, lesson.week), totalStudyMinutes: profile.totalStudyMinutes + session.minutes });
    return progress;
  }

  async rateReview(card: ReviewCardState, rating: ReviewRating, now = new Date()) { const next = scheduleReview(card, rating, now); await this.repositories.reviews.save(next); await this.enqueue('reviewCards', next.id, next); return next; }

  async exportBackup() {
    const data = await this.repositories.backup.exportData();
    return { application: 'english-circuit' as const, schemaVersion: 1 as const, exportedAt: new Date().toISOString(), data };
  }

  async importBackup(input: unknown) {
    const envelope = backupEnvelopeSchema.parse(input);
    await this.repositories.backup.importData(envelope.data as BackupData);
  }

  clearAll() { return this.repositories.backup.clearAll(); }
  recordings() { return this.repositories.recordings; }
  queue() { return this.repositories.syncQueue; }

  private async enqueue(entity: Parameters<Repositories['syncQueue']['enqueue']>[0]['entity'], entityId: string, payload: unknown) {
    const timestamp = new Date().toISOString();
    await this.repositories.syncQueue.enqueue({ id: `${entity}:${entityId}`, entity, entityId, kind: 'upsert', payload, attempts: 0, createdAt: timestamp, nextAttemptAt: timestamp });
  }
}
