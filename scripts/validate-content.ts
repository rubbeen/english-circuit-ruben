import { availableWeeks, loadWeek } from '../src/content/course';
import { courseWeekSchema } from '../src/content/schema';

const weeks = availableWeeks();
const expectedWeeks = process.env.CONTENT_PHASE === 'final' ? 24 : weeks.length;
const errors: string[] = [];
const ids = new Set<string>();

if (weeks.length !== expectedWeeks) errors.push(`Se esperaban ${expectedWeeks} semanas y hay ${weeks.length}.`);
if (weeks.some((week, index) => week !== index + 1)) errors.push('Las semanas no son consecutivas desde la semana 1.');

for (const weekNumber of weeks) {
  try {
    const week = courseWeekSchema.parse(await loadWeek(weekNumber));
    if (week.week !== weekNumber) errors.push(`El módulo week-${weekNumber} declara la semana ${week.week}.`);
    for (const lesson of week.lessons) {
      if (ids.has(lesson.id)) errors.push(`ID duplicado: ${lesson.id}`); ids.add(lesson.id);
      if (lesson.week !== weekNumber) errors.push(`${lesson.id}: semana incoherente.`);
      if (lesson.exercises.length < 8) errors.push(`${lesson.id}: menos de ocho ejercicios.`);
      if (!lesson.speakingPrompt || !lesson.writingPrompt) errors.push(`${lesson.id}: falta práctica oral o escrita.`);
      for (const exercise of lesson.exercises) if (exercise.options.length && !exercise.options.includes(exercise.answer)) errors.push(`${exercise.id}: respuesta inválida.`);
    }
  } catch (error) { errors.push(`Semana ${weekNumber}: ${error instanceof Error ? error.message : String(error)}`); }
}

if (process.env.CONTENT_PHASE === 'final' && ids.size !== 72) errors.push(`Se esperaban 72 lecciones y hay ${ids.size}.`);
if (errors.length) { console.error(errors.map((error) => `- ${error}`).join('\n')); process.exit(1); }
console.log(`Contenido válido: ${weeks.length} semanas, ${ids.size} lecciones, IDs únicos y actividades completas.`);

