import { describe, expect, it } from 'vitest';
import { calculateStreak } from './streaks';

describe('calculateStreak', () => {
  it('allows today or yesterday as the streak edge', () => {
    expect(calculateStreak([new Date(2026, 0, 8), new Date(2026, 0, 9)], new Date(2026, 0, 10))).toBe(2);
  });
});
