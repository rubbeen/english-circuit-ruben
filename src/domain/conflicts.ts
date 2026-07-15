import type { LessonProgress } from './models';

export function mergeLessonProgress(local: LessonProgress, remote: LessonProgress): LessonProgress {
  if (local.schemaVersion !== remote.schemaVersion) return local.schemaVersion > remote.schemaVersion ? local : remote;
  const newest = local.updatedAt >= remote.updatedAt ? local : remote;
  return {
    ...newest,
    completed: local.completed || remote.completed,
    score: Math.max(local.score, remote.score),
    elapsedMinutes: Math.max(local.elapsedMinutes, remote.elapsedMinutes),
    answers: { ...remote.answers, ...local.answers },
    draft: newest.draft,
  };
}

