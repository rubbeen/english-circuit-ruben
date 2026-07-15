import { Link } from 'react-router-dom';
export default function NotFoundPage() { return <div className="page empty-state"><span className="empty-icon">404</span><h1>Esta conexión no existe</h1><p>Vuelve a la ruta y elige una lección disponible.</p><Link className="button button-primary" to="/ruta">Ir a la ruta</Link></div>; }
