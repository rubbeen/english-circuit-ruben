import type { SyncStatus } from '../domain/models';
import type { Repositories } from '../domain/repositories';
import { pushEducationalOperation } from '../infrastructure/firebase/syncRemote';

export class SyncService {
  private running = false;
  constructor(private readonly repositories: Repositories) {}

  async flush(uid: string, onStatus?: (status: SyncStatus) => void) {
    if (this.running || !navigator.onLine) { onStatus?.('offline'); return; }
    this.running = true; onStatus?.('pending');
    try {
      const operations = await this.repositories.syncQueue.listReady(new Date());
      for (const operation of operations) {
        try { await pushEducationalOperation(uid, operation); await this.repositories.syncQueue.delete(operation.id); }
        catch (error) {
          const attempts = operation.attempts + 1;
          await this.repositories.syncQueue.save({ ...operation, attempts, lastError: error instanceof Error ? error.message : 'Error desconocido', nextAttemptAt: new Date(Date.now() + Math.min(300_000, 1000 * 2 ** Math.min(attempts, 8))).toISOString() });
          onStatus?.('error'); return;
        }
      }
      onStatus?.('synced');
    } finally { this.running = false; }
  }
}

