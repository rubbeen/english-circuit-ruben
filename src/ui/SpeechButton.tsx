import { useEffect, useState } from 'react';
import { useApp } from '../application/AppContext';
import { Icon } from './Icon';

export function SpeechButton({ text, label = 'Escuchar' }: { text: string; label?: string }) {
  const { profile } = useApp(); const [speaking, setSpeaking] = useState(false);
  useEffect(() => () => speechSynthesis?.cancel(), []);
  const speak = () => {
    if (!('speechSynthesis' in window)) return;
    speechSynthesis.cancel(); const utterance = new SpeechSynthesisUtterance(text); const voices = speechSynthesis.getVoices();
    utterance.voice = voices.find((v) => v.name === profile.preferredVoice) ?? voices.find((v) => v.lang.toLowerCase() === 'en-us') ?? voices.find((v) => v.lang.startsWith('en')) ?? null;
    utterance.lang = 'en-US'; utterance.rate = profile.speechRate; utterance.onstart = () => setSpeaking(true); utterance.onend = utterance.onerror = () => setSpeaking(false); speechSynthesis.speak(utterance);
  };
  return <button type="button" className="button button-ghost button-small" onClick={speak} aria-pressed={speaking}><Icon name={speaking ? 'pause' : 'play'} size={17} />{speaking ? 'Reproduciendo' : label}</button>;
}

