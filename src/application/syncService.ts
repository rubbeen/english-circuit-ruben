import type { SyncStatus } from '../domain/models';
import type { Repositories } from '../domain/repositories';
import { pullEducationalSnapshot, pushEducationalOperation } from '../infrastructure/firebase/syncRemote';

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
      if (await this.repositories.syncQueue.count() > 0) { onStatus?.('pending'); return; }
      await this.mergeRemote(uid);
      onStatus?.('synced');
    } catch { onStatus?.('error'); }
    finally { this.running = false; }
  }

  private async mergeRemote(uid: string) {
    const snapshot = await pullEducationalSnapshot(uid);
    if (snapshot.profile) await this.repositories.profile.save(snapshot.profile);
    for (const value of snapshot.lessonProgress) {
      const local = await this.repositories.lessonProgress.get(value.id);
      if (!local || value.updatedAt >= local.updatedAt) await this.repositories.lessonProgress.save(value);
    }
    for (const value of snapshot.reviewCards) {
      const local = await this.repositories.reviews.get(value.id);
      if (!local || value.updatedAt >= local.updatedAt) await this.repositories.reviews.save(value);
    }
    const localSessions = new Map((await this.repositories.sessions.list(Number.MAX_SAFE_INTEGER)).map((value) => [value.id, value]));
    for (const value of snapshot.studySessions) {
      const local = localSessions.get(value.id);
      if (!local || value.updatedAt >= local.updatedAt) await this.repositories.sessions.save(value);
    }
    const localStatistics = new Map((await this.repositories.statistics.list()).map((value) => [value.id, value]));
    for (const value of snapshot.statistics) {
      const local = localStatistics.get(value.id);
      if (!local || value.updatedAt >= local.updatedAt) await this.repositories.statistics.save(value);
    }
  }
}
