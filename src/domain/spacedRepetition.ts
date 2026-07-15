import type { ReviewCardState, ReviewRating } from './models';

const DAY = 86_400_000;

export function scheduleReview(card: ReviewCardState, rating: ReviewRating, now = new Date()): ReviewCardState {
  let repetitions = Math.max(0, card.repetitions);
  let intervalDays = Math.max(0, card.intervalDays);
  let easeFactor = Math.max(1.3, card.easeFactor);
  let lapses = Math.max(0, card.lapses);

  if (rating === 'again') {
    repetitions = 0; intervalDays = 0; easeFactor = Math.max(1.3, easeFactor - 0.2); lapses += 1;
  } else if (rating === 'hard') {
    repetitions += 1; intervalDays = Math.max(1, Math.round((intervalDays || 1) * 1.2)); easeFactor = Math.max(1.3, easeFactor - 0.15);
  } else if (rating === 'good') {
    repetitions += 1; intervalDays = repetitions === 1 ? 1 : repetitions === 2 ? 3 : Math.max(4, Math.round(intervalDays * easeFactor));
  } else {
    repetitions += 1; easeFactor = Math.min(3, easeFactor + 0.15); intervalDays = repetitions === 1 ? 3 : Math.max(5, Math.round((intervalDays || 2) * easeFactor * 1.3));
  }

  const reviewedAt = now.toISOString();
  return { ...card, repetitions, intervalDays, easeFactor, lapses, lastReviewedAt: reviewedAt, dueAt: new Date(now.getTime() + intervalDays * DAY).toISOString(), updatedAt: reviewedAt };
}

