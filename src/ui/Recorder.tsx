import { useEffect, useRef, useState } from 'react';
import { studyService } from '../application/AppContext';
import type { LocalRecording } from '../domain/models';
import { Icon } from './Icon';

export function Recorder({ lessonId }: { lessonId: string }) {
  const recorder = useRef<MediaRecorder | null>(null); const chunks = useRef<Blob[]>([]);
  const [recordings, setRecordings] = useState<LocalRecording[]>([]); const [active, setActive] = useState(false); const [error, setError] = useState(''); const [usage, setUsage] = useState(0);
  const load = async () => { setRecordings(await studyService.recordings().list(lessonId)); setUsage(await studyService.recordings().usage()); };
  useEffect(() => { void load(); return () => recorder.current?.stream.getTracks().forEach((track) => track.stop()); }, [lessonId]); // eslint-disable-line react-hooks/exhaustive-deps
  const start = async () => {
    setError('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true }); const next = new MediaRecorder(stream); chunks.current = [];
      next.ondataavailable = (event) => { if (event.data.size) chunks.current.push(event.data); };
      next.onstop = async () => { const blob = new Blob(chunks.current, { type: next.mimeType }); const value: LocalRecording = { id: crypto.randomUUID(), lessonId, mimeType: next.mimeType, blob, size: blob.size, createdAt: new Date().toISOString() }; await studyService.recordings().save(value); next.stream.getTracks().forEach((track) => track.stop()); setActive(false); await load(); };
      recorder.current = next; next.start(); setActive(true);
    } catch { setError('No fue posible usar el micrófono. Revisa el permiso del navegador.'); }
  };
  return <section className="recorder" aria-labelledby="recorder-title"><div><h3 id="recorder-title">Mi grabación local</h3><p>Se guarda solo en este dispositivo. Nunca se sube a Firebase.</p></div>
    <button type="button" className={`button ${active ? 'button-danger' : 'button-primary'}`} onClick={() => active ? recorder.current?.stop() : void start()}><Icon name="mic" />{active ? 'Detener' : 'Grabar ahora'}</button>
    {error && <p className="form-error" role="alert">{error}</p>}{usage > 40 * 1024 * 1024 && <p className="notice">Tus grabaciones usan más de 40 MB. Considera eliminar algunas.</p>}
    <div className="recording-list">{recordings.map((item) => <div key={item.id}><audio controls src={URL.createObjectURL(item.blob)} aria-label={`Grabación del ${new Date(item.createdAt).toLocaleString('es-CO')}`} /><button type="button" className="icon-button" aria-label="Eliminar grabación" onClick={async () => { await studyService.recordings().delete(item.id); await load(); }}><Icon name="trash" /></button></div>)}</div>
  </section>;
}
