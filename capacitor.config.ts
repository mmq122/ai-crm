import { CapacitorConfig } from '@capacitor/cli';
const config: CapacitorConfig = {
  appId: 'com.aicrm.app',
  appName: 'AI CRM',
  webDir: 'dist',
  plugins: { PushNotifications: { presentationOptions: ["badge", "sound", "alert"] } }
};
export default config;
