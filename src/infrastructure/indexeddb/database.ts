import { openDB, type DBSchema, type IDBPDatabase } from 'idb';
import type { LessonProgress, LocalRecording, Profile, ReviewCardState, StatisticSnapshot, StudySession, SyncConflict, SyncOperation } from '../../domain/models';

interface EnglishCircuitDb extends DBSchema {
  profile: { key: 'profile'; value: Profile };
  lessonProgress: { key: string; value: LessonProgress; indexes: { updatedAt: string } };
  reviewCards: { key: string; value: ReviewCardState; indexes: { dueAt: string } };
  studySessions: { key: string; value: StudySession; indexes: { startedAt: string } };
  statistics: { key: string; value: StatisticSnapshot };
  recordings: { key: string; value: LocalRecording; indexes: { lessonId: string } };
  syncQueue: { key: string; value: SyncOperation; indexes: { nextAttemptAt: string } };
  conflicts: { key: string; value: SyncConflict };
}

let instance: Promise<IDBPDatabase<EnglishCircuitDb>> | undefined;

export function getDatabase() {
  instance ??= openDB<EnglishCircuitDb>('english-circuit', 1, {
    upgrade(db) {
      db.createObjectStore('profile', { keyPath: 'id' });
      const progress = db.createObjectStore('lessonProgress', { keyPath: 'id' }); progress.createIndex('updatedAt', 'updatedAt');
      const reviews = db.createObjectStore('reviewCards', { keyPath: 'id' }); reviews.createIndex('dueAt', 'dueAt');
      const sessions = db.createObjectStore('studySessions', { keyPath: 'id' }); sessions.createIndex('startedAt', 'startedAt');
      db.createObjectStore('statistics', { keyPath: 'id' });
      const recordings = db.createObjectStore('recordings', { keyPath: 'id' }); recordings.createIndex('lessonId', 'lessonId');
      const queue = db.createObjectStore('syncQueue', { keyPath: 'id' }); queue.createIndex('nextAttemptAt', 'nextAttemptAt');
      db.createObjectStore('conflicts', { keyPath: 'id' });
    },
    blocked() { window.dispatchEvent(new CustomEvent('english-circuit:database-blocked')); },
  });
  return instance;
}

export function resetDatabaseConnectionForTests() { instance = undefined; }

