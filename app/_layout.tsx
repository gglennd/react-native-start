import '~/global.css';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider
} from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';

import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { useColorScheme } from '~/hooks/useColorScheme';
import { useIsomorphicLayoutEffect } from '~/hooks/useIsomorphicLayoutEffect';
import { COLORS } from '~/lib/constants';

SplashScreen.preventAutoHideAsync();

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: COLORS.light
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: COLORS.dark
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router';

const RootStackNavigator = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name='index' />
      <Stack.Screen name='+not-found' />
    </Stack>
  );
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font
  });
  const { isDarkColorScheme } = useColorScheme();

  useIsomorphicLayoutEffect(() => {
    if (Platform.OS === 'web') {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add('bg-background');
    }
    // setAndroidNavigationBar(colorScheme);
  }, []);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={isDarkColorScheme ? 'dark' : 'dark'} />
      <RootStackNavigator />
      <PortalHost />
    </ThemeProvider>
  );
}
