import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createDefaultProfile, type LessonProgress } from '../domain/models';
import type { Repositories } from '../domain/repositories';
import { SyncService } from './syncService';

const remote = vi.hoisted(() => ({
  pushEducationalOperation: vi.fn(),
  pullEducationalSnapshot: vi.fn(),
}));

vi.mock('../infrastructure/firebase/syncRemote', () => remote);

function repositories(options: { pending?: number; localProgress?: LessonProgress } = {}) {
  const saves = { profile: vi.fn(), progress: vi.fn() };
  const value = {
    profile: { get: vi.fn().mockResolvedValue(createDefaultProfile()), save: saves.profile },
    lessonProgress: { get: vi.fn().mockResolvedValue(options.localProgress), list: vi.fn().mockResolvedValue([]), save: saves.progress, clear: vi.fn() },
    reviews: { get: vi.fn(), list: vi.fn().mockResolvedValue([]), listDue: vi.fn(), save: vi.fn(), clear: vi.fn() },
    sessions: { list: vi.fn().mockResolvedValue([]), save: vi.fn(), clear: vi.fn() },
    statistics: { list: vi.fn().mockResolvedValue([]), save: vi.fn(), clear: vi.fn() },
    recordings: {},
    syncQueue: { listReady: vi.fn().mockResolvedValue([]), count: vi.fn().mockResolvedValue(options.pending ?? 0), enqueue: vi.fn(), save: vi.fn(), delete: vi.fn() },
    conflicts: {}, backup: {},
  } as unknown as Repositories;
  return { value, saves };
}

describe('SyncService', () => {
  beforeEach(() => vi.clearAllMocks());

  it('pulls educational progress into a fresh browser after the queue is empty', async () => {
    const { value, saves } = repositories();
    const progress: LessonProgress = { id: 'w01-l01', lessonId: 'w01-l01', completed: false, score: 0, answers: { greeting: 'hi' }, draft: 'remote draft', elapsedMinutes: 2, updatedAt: '2026-07-15T02:00:00.000Z', schemaVersion: 1 };
    remote.pullEducationalSnapshot.mockResolvedValueOnce({ profile: createDefaultProfile(), lessonProgress: [progress], reviewCards: [], studySessions: [], statistics: [] });
    const statuses: string[] = [];

    await new SyncService(value).flush('verified-user', (status) => statuses.push(status));

    expect(saves.progress).toHaveBeenCalledWith(progress);
    expect(statuses).toEqual(['pending', 'synced']);
  });

  it('does not pull while deferred local operations remain queued', async () => {
    const { value } = repositories({ pending: 1 });
    const statuses: string[] = [];

    await new SyncService(value).flush('verified-user', (status) => statuses.push(status));

    expect(remote.pullEducationalSnapshot).not.toHaveBeenCalled();
    expect(statuses).toEqual(['pending', 'pending']);
  });
});
