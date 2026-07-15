import type { LessonProgress, LocalRecording, Profile, ReviewCardState, StatisticSnapshot, StudySession, SyncConflict, SyncOperation } from './models';

export interface ProfileRepository { get(): Promise<Profile>; save(profile: Profile): Promise<void>; }
export type SettingsRepository = ProfileRepository;
export interface LessonProgressRepository { get(id: string): Promise<LessonProgress | undefined>; list(): Promise<LessonProgress[]>; save(value: LessonProgress): Promise<void>; clear(): Promise<void>; }
export interface ReviewRepository { get(id: string): Promise<ReviewCardState | undefined>; list(): Promise<ReviewCardState[]>; listDue(now: Date): Promise<ReviewCardState[]>; save(value: ReviewCardState): Promise<void>; clear(): Promise<void>; }
export interface StudySessionRepository { list(limit?: number): Promise<StudySession[]>; save(value: StudySession): Promise<void>; clear(): Promise<void>; }
export interface StatisticsRepository { list(): Promise<StatisticSnapshot[]>; save(value: StatisticSnapshot): Promise<void>; clear(): Promise<void>; }
export interface RecordingRepository { list(lessonId?: string): Promise<LocalRecording[]>; save(value: LocalRecording): Promise<void>; delete(id: string): Promise<void>; clear(): Promise<void>; usage(): Promise<number>; }
export interface SyncQueueRepository { listReady(now: Date): Promise<SyncOperation[]>; count(): Promise<number>; enqueue(value: SyncOperation): Promise<void>; save(value: SyncOperation): Promise<void>; delete(id: string): Promise<void>; }
export interface ConflictRepository { list(): Promise<SyncConflict[]>; save(value: SyncConflict): Promise<void>; delete(id: string): Promise<void>; }

export interface BackupData {
  profile: Profile;
  lessonProgress: LessonProgress[];
  reviewCards: ReviewCardState[];
  statistics: StatisticSnapshot[];
  studySessions: StudySession[];
}

export interface BackupRepository { exportData(): Promise<BackupData>; importData(data: BackupData): Promise<void>; clearAll(): Promise<void>; }

export interface Repositories {
  profile: ProfileRepository;
  lessonProgress: LessonProgressRepository;
  reviews: ReviewRepository;
  sessions: StudySessionRepository;
  statistics: StatisticsRepository;
  recordings: RecordingRepository;
  syncQueue: SyncQueueRepository;
  conflicts: ConflictRepository;
  backup: BackupRepository;
}
