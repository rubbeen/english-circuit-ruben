import { describe, expect, it } from 'vitest';
import type { ReviewCardState } from './models';
import { scheduleReview } from './spacedRepetition';

const card: ReviewCardState = { id: 'c1', lessonId: 'w01-l01', front: 'Hello', back: 'Hola', intervalDays: 0, easeFactor: 2.5, repetitions: 0, lapses: 0, dueAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z', schemaVersion: 1 };

describe('scheduleReview', () => {
  it('is deterministic and schedules good ratings', () => {
    const now = new Date('2026-01-10T12:00:00.000Z');
    expect(scheduleReview(card, 'good', now)).toEqual(scheduleReview(card, 'good', now));
    expect(scheduleReview(card, 'good', now).intervalDays).toBe(1);
  });
  it('protects values and counts lapses', () => {
    const result = scheduleReview({ ...card, intervalDays: -5, easeFactor: -1, repetitions: -2 }, 'again', new Date('2026-01-10T00:00:00Z'));
    expect(result.lapses).toBe(1);
    expect(result.easeFactor).toBeGreaterThanOrEqual(1.3);
    expect(result.intervalDays).toBe(0);
  });
});

