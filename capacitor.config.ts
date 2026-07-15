import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ruben.englishcircuit', appName: 'English Circuit', webDir: 'dist',
  server: { androidScheme: 'https' },
  plugins: { App: { launchShowDuration: 1200 } },
};
export default config;

