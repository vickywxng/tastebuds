import { Slot, SplashScreen } from 'expo-router';

import { AppProvider } from '../providers/AppProvider';
import Chat from './Chat.js';

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <AppProvider onInitialized={() => SplashScreen.hideAsync()}>
      <Slot />
    </AppProvider>
  );
}
