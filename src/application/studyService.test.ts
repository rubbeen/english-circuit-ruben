import { describe, expect, it, vi } from 'vitest';
import { StudyService } from './studyService';
import { createDefaultProfile } from '../domain/models';

describe('StudyService backup', () => {
  it('emits the application boundary without recordings or credentials', async () => {
    const data = { profile: createDefaultProfile(), lessonProgress: [], reviewCards: [], statistics: [], studySessions: [] };
    const repositories = { profile: { get: vi.fn(), save: vi.fn() }, lessonProgress: {}, reviews: {}, sessions: {}, statistics: {}, recordings: {}, syncQueue: {}, conflicts: {}, backup: { exportData: vi.fn().mockResolvedValue(data) } };
    const backup = await new StudyService(repositories as never).exportBackup();
    expect(backup.application).toBe('english-circuit');
    expect(JSON.stringify(backup)).not.toContain('recording');
  });
});
