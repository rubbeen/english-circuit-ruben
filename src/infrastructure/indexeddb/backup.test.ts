import { describe, expect, it } from 'vitest';
import { backupDataSchema } from './repositories';
import { createDefaultProfile } from '../../domain/models';

describe('backup validation', () => {
  it('rejects data from another application shape', () => { expect(() => backupDataSchema.parse({ accounts: [] })).toThrow(); });
  it('accepts a complete empty educational backup', () => { expect(backupDataSchema.parse({ profile: createDefaultProfile(new Date('2026-01-01T00:00:00Z')), lessonProgress: [], reviewCards: [], statistics: [], studySessions: [] })).toBeTruthy(); });
});

