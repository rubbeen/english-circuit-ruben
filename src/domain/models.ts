export type Theme = 'system' | 'light' | 'dark';
export type SyncStatus = 'synced' | 'pending' | 'offline' | 'error';
export type ReviewRating = 'again' | 'hard' | 'good' | 'easy';

export interface Profile {
  id: 'profile';
  schemaVersion: 1;
  contentVersion: string;
  displayName: string;
  currentLevel: 'A0' | 'A1' | 'A2';
  currentWeek: number;
  dailyGoalMinutes: number;
  studyDays: number[];
  translationsEnabled: boolean;
  preferredVoice: string;
  speechRate: number;
  theme: Theme;
  experimentalRecognition: boolean;
  currentStreak: number;
  bestStreak: number;
  totalStudyMinutes: number;
  createdAt: string;
  updatedAt: string;
}

export interface LessonProgress {
  id: string;
  lessonId: string;
  completed: boolean;
  score: number;
  answers: Record<string, string>;
  draft: string;
  elapsedMinutes: number;
  updatedAt: string;
  schemaVersion: 1;
}

export interface ReviewCardState {
  id: string;
  lessonId: string;
  front: string;
  back: string;
  intervalDays: number;
  easeFactor: number;
  repetitions: number;
  lapses: number;
  dueAt: string;
  lastReviewedAt?: string;
  updatedAt: string;
  schemaVersion: 1;
}

export interface StudySession {
  id: string;
  lessonId?: string;
  startedAt: string;
  endedAt: string;
  minutes: number;
  correct: number;
  total: number;
  updatedAt: string;
  schemaVersion: 1;
}

export interface StatisticSnapshot {
  id: string;
  week: string;
  lessonsCompleted: number;
  wordsLearned: number;
  accuracy: number;
  minutes: number;
  generalMinutes: number;
  engineeringMinutes: number;
  updatedAt: string;
  schemaVersion: 1;
}

export interface LocalRecording {
  id: string;
  lessonId: string;
  mimeType: string;
  blob: Blob;
  size: number;
  createdAt: string;
}

export interface SyncOperation {
  id: string;
  entity: 'profile' | 'lessonProgress' | 'reviewCards' | 'studySessions' | 'statistics';
  entityId: string;
  kind: 'upsert' | 'delete';
  payload?: unknown;
  attempts: number;
  createdAt: string;
  nextAttemptAt: string;
  lastError?: string;
}

export interface SyncConflict {
  id: string;
  entity: SyncOperation['entity'];
  local: unknown;
  remote: unknown;
  detectedAt: string;
  reason: string;
}

export function createDefaultProfile(now = new Date()): Profile {
  const timestamp = now.toISOString();
  return {
    id: 'profile', schemaVersion: 1, contentVersion: '1.0.0', displayName: '', currentLevel: 'A0',
    currentWeek: 1, dailyGoalMinutes: 45, studyDays: [1, 2, 3, 4, 5, 6], translationsEnabled: true,
    preferredVoice: '', speechRate: 0.85, theme: 'system', experimentalRecognition: false,
    currentStreak: 0, bestStreak: 0, totalStudyMinutes: 0, createdAt: timestamp, updatedAt: timestamp,
  };
}

