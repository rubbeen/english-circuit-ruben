import { lessonSchema, type Lesson } from '../schema';

interface Seed {
  id: string; week: number; stage: string; level: 'A0' | 'A1' | 'A2'; titleEs: string; titleEn: string; objective: string;
  vocabulary: Array<[string, string, string, string]>; phrases: Array<[string, string]>; dialogue: Array<[string, string, string]>;
  grammarTitle: string; grammarExplanation: string; grammarExamples: string[]; speaking: string; writing: string; summary: string; tags: string[];
}

export function authorLesson(seed: Seed): Lesson {
  const [a, b, c, d, e, f, g, h] = seed.vocabulary;
  const choices = (...items: string[]) => { const values = [...new Set(items)]; let index = 1; while (values.length < 3) values.push(`Alternativa ${index++}`); return values; };
  const exercises: Lesson['exercises'] = [
    { id: `${seed.id}-e01`, type: 'multiple-choice', prompt: `¿Qué significa “${a[0]}”?`, options: choices(a[1], b[1], c[1]), answer: a[1], feedback: `“${a[0]}” significa “${a[1]}”.` },
    { id: `${seed.id}-e02`, type: 'fill', prompt: `Completa con la palabra inglesa para “${b[1]}”.`, options: [], answer: b[0], feedback: `La respuesta es “${b[0]}”.` },
    { id: `${seed.id}-e03`, type: 'match', prompt: `Relaciona “${c[0]}” con su significado.`, options: choices(c[1], d[1], e[1]), answer: c[1], feedback: `${c[0]} = ${c[1]}.` },
    { id: `${seed.id}-e04`, type: 'true-false', prompt: `“${d[0]}” significa “${d[1]}”.`, options: ['Verdadero', 'Falso'], answer: 'Verdadero', feedback: 'La relación es correcta.' },
    { id: `${seed.id}-e05`, type: 'listen-select', prompt: `Escucha “${e[0]}” y elige la traducción.`, options: choices(e[1], f[1], g[1]), answer: e[1], feedback: `Oíste “${e[0]}”.` },
    { id: `${seed.id}-e06`, type: 'dictation', prompt: `Escribe en inglés: “${f[1]}”.`, options: [], answer: f[0], feedback: `Se escribe “${f[0]}”.` },
    { id: `${seed.id}-e07`, type: 'context-translation', prompt: `Traduce al español: “${seed.phrases[0][0]}”.`, options: [], answer: seed.phrases[0][1], feedback: `Traducción sugerida: “${seed.phrases[0][1]}”.` },
    { id: `${seed.id}-e08`, type: 'dialogue-comprehension', prompt: `En el diálogo, ¿qué expresión clave aparece?`, options: choices(g[0], h[0], a[0]), answer: g[0], feedback: `La expresión usada es “${g[0]}”.` },
  ];
  return lessonSchema.parse({
    id: seed.id, week: seed.week, stage: seed.stage, level: seed.level, titleEs: seed.titleEs, titleEn: seed.titleEn, durationMinutes: 50,
    objectives: [seed.objective, 'Escuchar, pronunciar, leer y escribir expresiones completas con confianza.'],
    vocabulary: seed.vocabulary.map(([term, translation, pronunciation, example]) => ({ term, translation, pronunciation, example })),
    phrases: seed.phrases.map(([en, es]) => ({ en, es })), dialogue: seed.dialogue.map(([speaker, text, translation]) => ({ speaker, text, translation })),
    grammar: { title: seed.grammarTitle, explanation: seed.grammarExplanation, examples: seed.grammarExamples }, exercises,
    listening: { text: seed.dialogue.map((line) => line[1]).join(' '), question: 'Escucha dos veces: primero identifica la situación y después las palabras conocidas.' },
    shadowing: seed.phrases.slice(0, 3).map(([en]) => en), speakingPrompt: seed.speaking, writingPrompt: seed.writing, summary: seed.summary,
    reviewCards: seed.vocabulary.slice(0, 6).map(([front, back]) => ({ front, back })), tags: seed.tags,
  });
}
