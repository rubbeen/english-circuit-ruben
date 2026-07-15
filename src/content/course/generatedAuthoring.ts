import { authorLesson } from './authoring';
import { courseWeekSchema, type CourseWeek } from '../schema';

export interface GeneratedTopic { es: string; en: string; objective: string }
export interface GeneratedPlan { week: number; title: string; stage: string; level: 'A0'|'A1'|'A2'; topics: GeneratedTopic[]; words: Array<[string,string]> }

const pronounce = (text: string) => text.toLowerCase().replace(/tion/g,'shon').replace(/th/g,'z').replace(/ee/g,'í').replace(/oo/g,'u').replace(/i/g,'i').replace(/a/g,'a').replace(/e/g,'e').replace(/o/g,'o').replace(/u/g,'u').toUpperCase();
const grammar = (stage: string) => stage === 'Fundamentos' ? ['Patrones básicos con to be','Usamos am, is y are para identificar y describir. Las preguntas invierten el orden del sujeto y el verbo.',['I am ready.','Are you ready?']] : stage === 'Vida cotidiana' ? ['Presente simple y expresiones de tiempo','El presente simple describe rutinas y hechos. En tercera persona singular suele aparecer -s.',['I work every day.','She works at home.']] : stage === 'Comunicación básica' ? ['Conectar tiempo, intención y contexto','La forma verbal cambia según si la acción ocurre ahora, ocurrió antes o es un plan. Las expresiones de tiempo aclaran el mensaje.',['I am working now.','I worked yesterday.']] : stage === 'Inglés profesional' ? ['Instrucciones y lenguaje profesional','Los imperativos dan pasos claros. Can, should y must expresan capacidad, recomendación y obligación.',['Check the connection.','You should report the problem.']] : stage === 'Electrónica' ? ['Describir relaciones técnicas','Usamos presente simple y voz pasiva básica para explicar funciones, mediciones y procesos.',['The sensor detects motion.','The signal is measured in volts.']] : ['Explicar, justificar y recomendar','Conectores como because, therefore y however organizan una explicación técnica clara.',['The fuse opened because the current was high.','Therefore, we should inspect the load.']];

export function createGeneratedWeek(plan: GeneratedPlan): CourseWeek {
  const [grammarTitle, grammarExplanation, grammarExamples] = grammar(plan.stage) as [string,string,string[]];
  return courseWeekSchema.parse({ week: plan.week, title: plan.title, stage: plan.stage, practiceTitles: [`Práctica: ${plan.topics[0].es}`,`Práctica: ${plan.topics[1].es}`], reviewTitle:`Repaso de la semana ${plan.week}`,
    lessons: plan.topics.map((topic,index) => {
      const selected=plan.words.slice(index*10,index*10+10);
      const phrases: Array<[string,string]> = [
        [`Today we practice ${topic.en.toLowerCase()}.`,`Hoy practicamos ${topic.es.toLowerCase()}.`],
        [`I understand “${selected[0][0]}”.`,`Entiendo “${selected[0][1]}”.`],
        [`Please repeat “${selected[1][0]}”.`,`Por favor, repite “${selected[1][1]}”.`],
        [`Can you explain “${selected[2][0]}”?`,`¿Puedes explicar “${selected[2][1]}”?`],
        [`I can use “${selected[3][0]}” in context.`,`Puedo usar “${selected[3][1]}” en contexto.`],
      ];
      return authorLesson({ id:`w${String(plan.week).padStart(2,'0')}-l${String(index+1).padStart(2,'0')}`,week:plan.week,stage:plan.stage,level:plan.level,titleEs:topic.es,titleEn:topic.en,objective:topic.objective,
        vocabulary:selected.map(([term,translation])=>[term,translation,pronounce(term),`In this lesson, “${term}” helps us talk about ${topic.en.toLowerCase()}.`]), phrases,
        dialogue:[['Alex',`Hello. Today we practice ${topic.en.toLowerCase()}.`,`Hola. Hoy practicamos ${topic.es.toLowerCase()}.`],['Jordan',`Great. What does “${selected[0][0]}” mean?`,`Bien. ¿Qué significa “${selected[0][0]}”?`],['Alex',`It means “${selected[0][1]}”.`,`Significa “${selected[0][1]}”.`],['Jordan',`Can you repeat “${selected[1][0]}”, please?`,`¿Puedes repetir “${selected[1][0]}”, por favor?`],['Alex',`${selected[1][0]}. Listen and repeat.`,`${selected[1][0]}. Escucha y repite.`],['Jordan','Thank you. I can use it now.','Gracias. Ahora puedo usarlo.']],
        grammarTitle,grammarExplanation,grammarExamples,speaking:`Explica ${topic.es.toLowerCase()} durante un minuto e incluye cinco expresiones de la lección.`,writing:`Escribe entre seis y ocho frases originales sobre ${topic.es.toLowerCase()}.`,summary:`Ahora puedes comprender y producir mensajes básicos sobre ${topic.es.toLowerCase()}.`,tags:[plan.stage.toLowerCase(),topic.en.toLowerCase().replaceAll(' ','-'),plan.level],
      });
    })
  });
}
