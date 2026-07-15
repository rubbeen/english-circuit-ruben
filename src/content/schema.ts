import { z } from 'zod';

export const exerciseSchema = z.object({
  id: z.string().min(1),
  type: z.enum(['multiple-choice', 'fill', 'order', 'match', 'true-false', 'listen-select', 'dictation', 'sentence-build', 'context-translation', 'dialogue-comprehension']),
  prompt: z.string().min(1), options: z.array(z.string().min(1)).default([]), answer: z.string().min(1), feedback: z.string().min(1),
}).superRefine((value, ctx) => { if (new Set(value.options).size !== value.options.length) ctx.addIssue({ code: 'custom', message: 'Opciones duplicadas' }); if (value.options.length && !value.options.includes(value.answer)) ctx.addIssue({ code: 'custom', message: 'Respuesta fuera de opciones' }); });

export const vocabularyItemSchema = z.object({ term: z.string().min(1), translation: z.string().min(1), pronunciation: z.string().min(1), example: z.string().min(1) });
export const dialogueLineSchema = z.object({ speaker: z.string().min(1), text: z.string().min(1), translation: z.string().min(1) });

export const lessonSchema = z.object({
  id: z.string().regex(/^w\d{2}-l\d{2}$/), week: z.number().int().min(1).max(24), stage: z.string().min(1), level: z.enum(['A0', 'A1', 'A2']),
  titleEs: z.string().min(1), titleEn: z.string().min(1), durationMinutes: z.number().int().min(15).max(90), objectives: z.array(z.string().min(1)).min(2),
  vocabulary: z.array(vocabularyItemSchema).min(8).max(12), phrases: z.array(z.object({ en: z.string().min(1), es: z.string().min(1) })).min(5),
  dialogue: z.array(dialogueLineSchema).min(6).max(10), grammar: z.object({ title: z.string().min(1), explanation: z.string().min(1), examples: z.array(z.string().min(1)).min(2) }),
  exercises: z.array(exerciseSchema).min(8), listening: z.object({ text: z.string().min(1), question: z.string().min(1) }), shadowing: z.array(z.string().min(1)).min(2),
  speakingPrompt: z.string().min(1), writingPrompt: z.string().min(1), summary: z.string().min(1), reviewCards: z.array(z.object({ front: z.string().min(1), back: z.string().min(1) })).min(4), tags: z.array(z.string().min(1)).min(1),
});

export const courseWeekSchema = z.object({ week: z.number().int().min(1).max(24), title: z.string().min(1), stage: z.string().min(1), lessons: z.array(lessonSchema).length(3), practiceTitles: z.array(z.string()).length(2), reviewTitle: z.string().min(1) });

export type Lesson = z.infer<typeof lessonSchema>;
export type Exercise = z.infer<typeof exerciseSchema>;
export type CourseWeek = z.infer<typeof courseWeekSchema>;
export type VocabularyItem = z.infer<typeof vocabularyItemSchema>;
export type DialogueLine = z.infer<typeof dialogueLineSchema>;
export type CourseStage = 'Fundamentos' | 'Vida cotidiana' | 'Comunicación básica' | 'Inglés profesional' | 'Electrónica' | 'Integración';
export type LessonSection = 'warmup' | 'vocabulary' | 'phrases' | 'dialogue' | 'grammar' | 'exercises' | 'listening' | 'shadowing' | 'speaking' | 'writing' | 'summary';
export type ExerciseOption = string;
export type SpeakingPrompt = string;
export type ReviewCard = Lesson['reviewCards'][number];
export type EngineeringTerm = VocabularyItem;

