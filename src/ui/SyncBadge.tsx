import { Icon } from './Icon';
import { useApp } from '../application/AppContext';

const labels = { synced: 'Sincronizado', pending: 'Pendiente', offline: 'Sin conexión', error: 'Error de sincronización' };
export function SyncBadge() { const { syncStatus } = useApp(); return <span className={`sync-badge status-${syncStatus}`} role="status"><Icon name="sync" size={16} />{labels[syncStatus]}</span>; }

