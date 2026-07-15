import { NavLink, Outlet } from 'react-router-dom';
import { Icon } from './Icon';
import { SyncBadge } from './SyncBadge';

const nav = [
  ['/', 'home', 'Inicio'], ['/ruta', 'route', 'Ruta'], ['/repaso', 'review', 'Repaso'], ['/practica-oral', 'mic', 'Práctica'], ['/progreso', 'chart', 'Progreso'], ['/configuracion', 'settings', 'Ajustes'],
] as const;

export function AppShell() {
  return <div className="app-shell">
    <a className="skip-link" href="#main-content" onClick={(event) => { event.preventDefault(); document.getElementById('main-content')?.focus(); }}>Saltar al contenido</a>
    <aside className="side-nav" aria-label="Navegación principal">
      <div className="brand"><span className="brand-mark"><Icon name="bolt" /></span><span><b>English Circuit</b><small>Learn · Connect · Grow</small></span></div>
      <nav>{nav.map(([to, icon, label]) => <NavLink key={to} to={to} end={to === '/'}><Icon name={icon} /><span>{label}</span></NavLink>)}</nav>
      <div className="side-footer"><SyncBadge /><p>Inglés para tu vida y tu ingeniería.</p></div>
    </aside>
    <header className="topbar"><div className="compact-brand"><span className="brand-mark"><Icon name="bolt" /></span><b>English Circuit</b></div><SyncBadge /></header>
    <main id="main-content" className="main-content" tabIndex={-1}><Outlet /></main>
    <nav className="bottom-nav" aria-label="Navegación principal">{nav.slice(0, 5).map(([to, icon, label]) => <NavLink key={to} to={to} end={to === '/'}><Icon name={icon} /><span>{label}</span></NavLink>)}</nav>
  </div>;
}
