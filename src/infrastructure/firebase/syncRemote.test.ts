import { describe, expect, it } from 'vitest';
import type { SyncOperation } from '../../domain/models';
import { serializeEducationalPayload } from './syncRemote';

describe('serializeEducationalPayload', () => {
  it('does not send the local-only profile id to the root Firestore document', () => {
    const operation = { entity: 'profile', payload: { id: 'profile', schemaVersion: 1, displayName: 'Alex' } } as SyncOperation;

    expect(serializeEducationalPayload(operation, 'server-time')).toEqual({ schemaVersion: 1, displayName: 'Alex', updatedAt: 'server-time' });
  });
});
