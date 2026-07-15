import type { CourseWeek } from '../schema';

export const weekMetadata = [
  ['Primer contacto', 'Fundamentos'], ['Números y datos básicos', 'Fundamentos'], ['Personas y familia', 'Fundamentos'], ['Preguntas esenciales', 'Fundamentos'],
  ['Rutinas', 'Vida cotidiana'], ['Horas y fechas', 'Vida cotidiana'], ['Casa y ciudad', 'Vida cotidiana'], ['Transporte y capacidad', 'Vida cotidiana'],
  ['Acciones en progreso', 'Comunicación básica'], ['El pasado básico', 'Comunicación básica'], ['Planes y preferencias', 'Comunicación básica'], ['Compras, ayuda y llamadas', 'Comunicación básica'],
  ['Profesiones y responsabilidades', 'Inglés profesional'], ['Herramientas y seguridad', 'Inglés profesional'], ['Procedimientos y problemas', 'Inglés profesional'], ['Mensajes y reuniones', 'Inglés profesional'],
  ['Electricidad y componentes', 'Electrónica'], ['Mediciones y circuitos', 'Electrónica'], ['Señales, sensores y actuadores', 'Electrónica'], ['Fallas, mantenimiento y datasheets', 'Electrónica'],
  ['Explicar circuitos', 'Integración'], ['Inspecciones y recomendaciones', 'Integración'], ['Entrevistas y experiencia', 'Integración'], ['Proyecto técnico final', 'Integración'],
].map(([title, stage], index) => ({ week: index + 1, title, stage }));

const loaders: Partial<Record<number, () => Promise<{ default: CourseWeek }>>> = {
  1: () => import('./week-01'),
};

export async function loadWeek(week: number): Promise<CourseWeek> {
  const loader = loaders[week];
  if (!loader) throw new Error(`La semana ${week} aún no está instalada en esta compilación.`);
  return (await loader()).default;
}

export function availableWeeks() { return Object.keys(loaders).map(Number); }
