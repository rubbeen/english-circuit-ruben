import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { loadWeek } from '../content/course';
import type { Exercise, Lesson } from '../content/schema';
import { studyService } from '../application/AppContext';
import { SpeechButton } from '../ui/SpeechButton';
import { Recorder } from '../ui/Recorder';
import { Icon } from '../ui/Icon';

const sectionLabels = ['Objetivo', 'Vocabulario', 'Frases', 'Diálogo', 'Gramática', 'Ejercicios', 'Escucha', 'Práctica oral', 'Escritura', 'Resumen'];

function ExerciseView({ exercise, value, onChange, checked }: { exercise: Exercise; value: string; onChange: (value: string) => void; checked: boolean }) {
  const correct = value.trim().toLocaleLowerCase() === exercise.answer.trim().toLocaleLowerCase();
  return <fieldset className={`exercise ${checked ? correct ? 'correct' : 'incorrect' : ''}`}><legend>{exercise.prompt}</legend>
    {exercise.options.length ? <div className="option-list">{exercise.options.map((option) => <label key={option}><input type="radio" name={exercise.id} value={option} checked={value === option} onChange={() => onChange(option)} /><span>{option}</span></label>)}</div> : <label className="field"><span>Tu respuesta</span><input value={value} onChange={(e) => onChange(e.target.value)} autoComplete="off" /></label>}
    {checked && <p className="feedback" role="status"><b>{correct ? '¡Correcto!' : `Respuesta: ${exercise.answer}`}</b> {exercise.feedback}</p>}
  </fieldset>;
}

export default function LessonPage() {
  const { lessonId = '' } = useParams(); const [lesson, setLesson] = useState<Lesson>(); const [error, setError] = useState(''); const [answers, setAnswers] = useState<Record<string, string>>({}); const [draft, setDraft] = useState(''); const [checked, setChecked] = useState(false); const [completed, setCompleted] = useState(false); const started = useRef(Date.now());
  const weekNumber = Number(lessonId.slice(1, 3));
  useEffect(() => { setError(''); setLesson(undefined); void Promise.all([loadWeek(weekNumber), studyService.getProgress(lessonId)]).then(([week, progress]) => { const next = week.lessons.find((item) => item.id === lessonId); if (!next) throw new Error('Lección no encontrada.'); setLesson(next); if (progress) { setAnswers(progress.answers); setDraft(progress.draft); setCompleted(progress.completed); } }).catch((cause) => setError(cause instanceof Error ? cause.message : 'No fue posible cargar la lección.')); }, [lessonId, weekNumber]);
  useEffect(() => { if (!lesson) return; const timer = window.setTimeout(() => { void studyService.saveProgress(lesson.id, { answers, draft }); }, 650); return () => window.clearTimeout(timer); }, [answers, draft, lesson]);
  const score = useMemo(() => lesson ? Math.round(lesson.exercises.filter((e) => answers[e.id]?.trim().toLowerCase() === e.answer.trim().toLowerCase()).length / lesson.exercises.length * 100) : 0, [answers, lesson]);
  if (error) return <div className="page empty-state"><span className="empty-icon">○</span><h1>Semana en preparación</h1><p>{error}</p><Link className="button button-primary" to="/ruta">Volver a la ruta</Link></div>;
  if (!lesson) return <div className="page loading-state" role="status">Cargando lección…</div>;
  const finish = async () => { setChecked(true); if (Object.keys(answers).length < lesson.exercises.length) return; await studyService.completeLesson(lesson, answers, Math.max(1, (Date.now() - started.current) / 60_000)); setCompleted(true); };
  return <div className="lesson-layout"><aside className="lesson-index"><Link to="/ruta" className="text-link">← Ruta</Link><span className="eyebrow">SEMANA {lesson.week}</span><h2>{lesson.titleEs}</h2><nav aria-label="Secciones de la lección">{sectionLabels.map((label, index) => <a key={label} href={`#section-${index + 1}`}><span>{index + 1}</span>{label}</a>)}</nav></aside>
    <article className="lesson-content"><header className="lesson-hero"><div><span className="eyebrow">{lesson.stage} · {lesson.level}</span><h1>{lesson.titleEn}</h1><p>{lesson.titleEs} · ≈ {lesson.durationMinutes} minutos</p></div><span className="lesson-badge">{completed ? '✓ Completada' : 'En curso'}</span></header>
      <section id="section-1" className="lesson-section"><span className="section-step">01</span><div><h2>Tu objetivo</h2>{lesson.objectives.map((item) => <p key={item}>{item}</p>)}</div></section>
      <section id="section-2" className="lesson-section"><span className="section-step">02</span><div className="section-body"><h2>Vocabulario esencial</h2><div className="vocabulary-grid">{lesson.vocabulary.map((item) => <article key={item.term}><div><h3>{item.term}</h3><SpeechButton text={item.term} label="Oír" /></div><p className="translation">{item.translation}</p><p className="pronunciation">/{item.pronunciation}/</p><p>{item.example}</p></article>)}</div></div></section>
      <section id="section-3" className="lesson-section"><span className="section-step">03</span><div className="section-body"><h2>Frases que sí usarás</h2><div className="phrase-list">{lesson.phrases.map((item) => <div key={item.en}><div><b>{item.en}</b><span>{item.es}</span></div><SpeechButton text={item.en} /></div>)}</div></div></section>
      <section id="section-4" className="lesson-section"><span className="section-step">04</span><div className="section-body"><div className="section-heading"><h2>Diálogo</h2><SpeechButton text={lesson.dialogue.map((line) => `${line.speaker}. ${line.text}`).join(' ')} label="Escuchar diálogo" /></div><div className="dialogue">{lesson.dialogue.map((line, index) => <div key={`${line.speaker}-${index}`} className={index % 2 ? 'reply' : ''}><span>{line.speaker}</span><p><b>{line.text}</b><small>{line.translation}</small></p></div>)}</div></div></section>
      <section id="section-5" className="lesson-section"><span className="section-step">05</span><div className="grammar-card"><span className="eyebrow">GRAMÁTICA SIN COMPLICACIONES</span><h2>{lesson.grammar.title}</h2><p>{lesson.grammar.explanation}</p>{lesson.grammar.examples.map((example) => <code key={example}>{example}</code>)}</div></section>
      <section id="section-6" className="lesson-section"><span className="section-step">06</span><div className="section-body"><h2>Conecta lo aprendido</h2><p>Responde las ocho actividades. Puedes girar o redimensionar la pantalla: tus respuestas se guardan localmente.</p>{lesson.exercises.map((exercise) => <ExerciseView key={exercise.id} exercise={exercise} value={answers[exercise.id] ?? ''} onChange={(value) => { setAnswers((current) => ({ ...current, [exercise.id]: value })); setChecked(false); }} checked={checked} />)}<button type="button" className="button button-primary" onClick={() => setChecked(true)}>Comprobar respuestas</button>{checked && <strong className="score-line">Resultado actual: {score}%</strong>}</div></section>
      <section id="section-7" className="lesson-section"><span className="section-step">07</span><div className="listening-card"><h2>Escucha activa</h2><p>{lesson.listening.question}</p><SpeechButton text={lesson.listening.text} label="Reproducir escucha" /></div></section>
      <section id="section-8" className="lesson-section"><span className="section-step">08</span><div className="section-body"><h2>Shadowing y reto oral</h2><p>Escucha, pausa y repite imitando el ritmo. Luego completa el reto.</p>{lesson.shadowing.map((line) => <div className="shadow-line" key={line}><b>{line}</b><SpeechButton text={line} /></div>)}<p className="speaking-prompt">{lesson.speakingPrompt}</p><Recorder lessonId={lesson.id} /></div></section>
      <section id="section-9" className="lesson-section"><span className="section-step">09</span><div className="section-body"><h2>Escribe para fijar la conexión</h2><p>{lesson.writingPrompt}</p><label className="field"><span>Tu borrador (guardado automáticamente)</span><textarea rows={7} value={draft} onChange={(e) => setDraft(e.target.value)} /></label></div></section>
      <section id="section-10" className="lesson-section lesson-finish"><span className="section-step">10</span><div><h2>Circuito completado</h2><p>{lesson.summary}</p><button type="button" className="button button-accent" onClick={() => void finish()}><Icon name="check" />{completed ? 'Progreso guardado' : 'Finalizar lección'}</button>{checked && Object.keys(answers).length < lesson.exercises.length && <p className="form-error" role="alert">Responde las ocho actividades antes de finalizar.</p>}</div></section>
    </article></div>;
}

