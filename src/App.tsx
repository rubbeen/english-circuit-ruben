import { lazy, Suspense } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { AppProvider } from './application/AppContext';
import { AppShell } from './ui/AppShell';

const DashboardPage = lazy(() => import('./pages/DashboardPage')); const RoadmapPage = lazy(() => import('./pages/RoadmapPage')); const LessonPage = lazy(() => import('./pages/LessonPage')); const ReviewPage = lazy(() => import('./pages/ReviewPage')); const SpeakingPage = lazy(() => import('./pages/SpeakingPage')); const ProgressPage = lazy(() => import('./pages/ProgressPage')); const SettingsPage = lazy(() => import('./pages/SettingsPage')); const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

export default function App() { return <AppProvider><HashRouter><Suspense fallback={<div className="app-loading" role="status">Preparando tu circuito…</div>}><Routes><Route element={<AppShell/>}><Route index element={<DashboardPage/>}/><Route path="ruta" element={<RoadmapPage/>}/><Route path="leccion/:lessonId" element={<LessonPage/>}/><Route path="repaso" element={<ReviewPage/>}/><Route path="practica-oral" element={<SpeakingPage/>}/><Route path="progreso" element={<ProgressPage/>}/><Route path="configuracion" element={<SettingsPage/>}/><Route path="*" element={<NotFoundPage/>}/></Route></Routes></Suspense></HashRouter></AppProvider>; }

