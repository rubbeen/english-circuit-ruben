import { authorLesson } from '../authoring';
import { courseWeekSchema } from '../../schema';

export default courseWeekSchema.parse({
  week: 1, title: 'Primer contacto', stage: 'Fundamentos', practiceTitles: ['Práctica: mi primera conversación', 'Práctica: sonidos y ritmo'], reviewTitle: 'Repaso de la semana 1',
  lessons: [
    authorLesson({
      id: 'w01-l01', week: 1, stage: 'Fundamentos', level: 'A0', titleEs: 'Saludar con confianza', titleEn: 'Hello!', objective: 'Saludar, despedirse y responder de forma natural en situaciones cotidianas.',
      vocabulary: [
        ['hello', 'hola', 'jel-ÓU', 'Hello, Ana!'], ['hi', 'hola (informal)', 'JÁI', 'Hi, Carlos!'], ['good morning', 'buenos días', 'gud MÓR-ning', 'Good morning, Ms. Lee.'], ['good afternoon', 'buenas tardes', 'gud af-ter-NÚN', 'Good afternoon, team.'],
        ['good evening', 'buenas noches al saludar', 'gud ÍV-ning', 'Good evening, everyone.'], ['goodbye', 'adiós', 'gud-BÁI', 'Goodbye, see you tomorrow.'], ['please', 'por favor', 'PLÍS', 'Please, come in.'], ['thank you', 'gracias', 'ZÁNK iu', 'Thank you for your help.'],
        ['you’re welcome', 'con gusto', 'ior UÉL-kam', 'You’re welcome, Daniel.'], ['see you', 'nos vemos', 'SÍ iu', 'See you on Monday.'],
      ],
      phrases: [['Hello, how are you?', 'Hola, ¿cómo estás?'], ['I am fine, thank you.', 'Estoy bien, gracias.'], ['Good morning. Nice to meet you.', 'Buenos días. Mucho gusto.'], ['See you tomorrow.', 'Nos vemos mañana.'], ['Have a good day.', 'Que tengas un buen día.']],
      dialogue: [['Maya', 'Good morning! I am Maya.', '¡Buenos días! Soy Maya.'], ['Leo', 'Hello, Maya. I am Leo.', 'Hola, Maya. Soy Leo.'], ['Maya', 'How are you?', '¿Cómo estás?'], ['Leo', 'I am fine, thank you. And you?', 'Estoy bien, gracias. ¿Y tú?'], ['Maya', 'I am good. Nice to meet you.', 'Estoy bien. Mucho gusto.'], ['Leo', 'Nice to meet you too. See you!', 'Mucho gusto también. ¡Nos vemos!']],
      grammarTitle: 'I am / You are', grammarExplanation: 'Usamos I am para hablar de nosotros y you are para hablar con otra persona. En conversación se oyen mucho las contracciones I’m y you’re.', grammarExamples: ['I am Leo. / I’m Leo.', 'You are welcome. / You’re welcome.'],
      speaking: 'Graba un saludo: di tu nombre, pregunta cómo está la otra persona y despídete.', writing: 'Escribe un diálogo original de seis líneas entre dos personas que se conocen.', summary: 'Ya puedes abrir y cerrar una conversación breve con cortesía.', tags: ['greetings', 'daily-life', 'A0'],
    }),
    authorLesson({
      id: 'w01-l02', week: 1, stage: 'Fundamentos', level: 'A0', titleEs: 'Presentarme', titleEn: 'My name is…', objective: 'Decir el nombre, país, ciudad y profesión; preguntar esa información.',
      vocabulary: [
        ['name', 'nombre', 'NÉIM', 'My name is Sara.'], ['from', 'de / desde', 'FROM', 'I am from Colombia.'], ['city', 'ciudad', 'SÍ-ti', 'Bogotá is a city.'], ['country', 'país', 'KÁN-tri', 'My country is Colombia.'],
        ['engineer', 'ingeniero/a', 'en-yi-NÍR', 'I am an engineer.'], ['student', 'estudiante', 'STÚ-dent', 'She is a student.'], ['work', 'trabajar / trabajo', 'UÉRK', 'I work in maintenance.'], ['live', 'vivir', 'LIV', 'I live in Cali.'],
        ['what', 'qué / cuál', 'UAT', 'What is your name?'], ['where', 'dónde', 'UÉR', 'Where are you from?'],
      ],
      phrases: [['My name is Elena.', 'Mi nombre es Elena.'], ['I am from Colombia.', 'Soy de Colombia.'], ['I live in Medellín.', 'Vivo en Medellín.'], ['I am an electronics engineer.', 'Soy ingeniero/a electrónico/a.'], ['What is your name?', '¿Cómo te llamas?']],
      dialogue: [['Sam', 'Hi! What is your name?', '¡Hola! ¿Cómo te llamas?'], ['Elena', 'My name is Elena. What is your name?', 'Me llamo Elena. ¿Cómo te llamas?'], ['Sam', 'I am Sam. Where are you from?', 'Soy Sam. ¿De dónde eres?'], ['Elena', 'I am from Colombia. I live in Medellín.', 'Soy de Colombia. Vivo en Medellín.'], ['Sam', 'What do you do?', '¿A qué te dedicas?'], ['Elena', 'I am an electronics engineer.', 'Soy ingeniera electrónica.']],
      grammarTitle: 'Preguntas con what y where', grammarExplanation: 'What pide información sobre una cosa o nombre. Where pide un lugar. Con el verbo to be usamos What is…? y Where are…?', grammarExamples: ['What is your name?', 'Where are you from?'],
      speaking: 'Preséntate durante treinta segundos: nombre, ciudad, país y profesión.', writing: 'Escribe cinco frases sobre ti sin usar un nombre predefinido por la aplicación.', summary: 'Puedes dar información personal básica y hacer dos preguntas esenciales.', tags: ['introductions', 'work', 'A0'],
    }),
    authorLesson({
      id: 'w01-l03', week: 1, stage: 'Fundamentos', level: 'A0', titleEs: 'El alfabeto y el banco de trabajo', titleEn: 'Spell it, please', objective: 'Deletrear palabras y reconocer elementos básicos de un banco de electrónica.',
      vocabulary: [
        ['letter', 'letra', 'LÉ-ter', 'A is a letter.'], ['spell', 'deletrear', 'SPÉL', 'Please spell your name.'], ['repeat', 'repetir', 'ri-PÍT', 'Please repeat that.'], ['board', 'placa', 'BORD', 'The board is on the bench.'],
        ['wire', 'cable', 'UÁI-er', 'This wire is red.'], ['tool', 'herramienta', 'TUL', 'The meter is a tool.'], ['bench', 'banco de trabajo', 'BENCH', 'The tool is on the bench.'], ['label', 'etiqueta', 'LÉI-bel', 'Read the label.'],
        ['code', 'código', 'KÓUD', 'The code is A33.'], ['again', 'otra vez', 'a-GUÉN', 'Say it again, please.'],
      ],
      phrases: [['How do you spell it?', '¿Cómo se deletrea?'], ['Please repeat that.', 'Por favor, repite eso.'], ['B-O-A-R-D, board.', 'B-O-A-R-D, placa.'], ['The label says A33.', 'La etiqueta dice A33.'], ['Is this your tool?', '¿Esta es tu herramienta?']],
      dialogue: [['Nora', 'What is this tool?', '¿Qué es esta herramienta?'], ['Omar', 'It is a meter.', 'Es un medidor.'], ['Nora', 'How do you spell meter?', '¿Cómo se deletrea meter?'], ['Omar', 'M-E-T-E-R.', 'M-E-T-E-R.'], ['Nora', 'Please repeat that slowly.', 'Por favor, repítelo despacio.'], ['Omar', 'M-E-T-E-R. The meter is on the bench.', 'M-E-T-E-R. El medidor está en el banco.']],
      grammarTitle: 'This is / It is', grammarExplanation: 'This is presenta algo cercano. Después podemos usar it is para referirnos al mismo objeto sin repetir el nombre.', grammarExamples: ['This is a wire. It is red.', 'This is a board. It is new.'],
      speaking: 'Elige tres objetos cercanos, di su nombre en inglés y deletrea cada palabra.', writing: 'Escribe cinco etiquetas bilingües para un banco de trabajo seguro.', summary: 'Puedes pedir repetición, deletrear y nombrar objetos técnicos iniciales.', tags: ['alphabet', 'electronics', 'A0'],
    }),
  ],
});

