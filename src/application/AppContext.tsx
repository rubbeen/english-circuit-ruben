import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Profile, SyncStatus } from '../domain/models';
import { createDefaultProfile } from '../domain/models';
import { createIndexedDbRepositories } from '../infrastructure/indexeddb/repositories';
import { StudyService } from './studyService';
import { SyncService } from './syncService';

const repositories = createIndexedDbRepositories();
export const studyService = new StudyService(repositories);
export const syncService = new SyncService(repositories);

interface AppState {
  profile: Profile; setProfile: (profile: Profile) => Promise<void>; refreshProfile: () => Promise<void>;
  syncStatus: SyncStatus; setSyncStatus: (status: SyncStatus) => void; online: boolean;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [profile, setProfileState] = useState(createDefaultProfile());
  const [syncStatus, setSyncStatus] = useState<SyncStatus>(navigator.onLine ? 'synced' : 'offline');
  const [online, setOnline] = useState(navigator.onLine);
  const refreshProfile = async () => setProfileState(await studyService.getProfile());
  useEffect(() => { void refreshProfile(); }, []);
  useEffect(() => {
    const update = () => { setOnline(navigator.onLine); setSyncStatus(navigator.onLine ? 'pending' : 'offline'); };
    window.addEventListener('online', update); window.addEventListener('offline', update);
    return () => { window.removeEventListener('online', update); window.removeEventListener('offline', update); };
  }, []);
  useEffect(() => { document.documentElement.dataset.theme = profile.theme; }, [profile.theme]);
  const value = useMemo<AppState>(() => ({ profile, setProfile: async (next) => setProfileState(await studyService.saveProfile(next)), refreshProfile, syncStatus, setSyncStatus, online }), [profile, syncStatus, online]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() { const value = useContext(AppContext); if (!value) throw new Error('AppProvider ausente'); return value; }

