import { describe, expect, it } from 'vitest';
import type { LessonProgress } from './models';
import { mergeLessonProgress } from './conflicts';

const base: LessonProgress = { id: 'x', lessonId: 'x', completed: false, score: 50, answers: { a: '1' }, draft: 'local', elapsedMinutes: 5, updatedAt: '2026-01-02T00:00:00Z', schemaVersion: 1 };

describe('mergeLessonProgress', () => {
  it('never loses completion or the best score', () => {
    const result = mergeLessonProgress(base, { ...base, completed: true, score: 80, draft: 'remote', updatedAt: '2026-01-01T00:00:00Z' });
    expect(result.completed).toBe(true);
    expect(result.score).toBe(80);
    expect(result.draft).toBe('local');
  });
});

