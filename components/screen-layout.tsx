import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider
} from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import 'react-native-reanimated';

import { SafeAreaView } from '~/components/safe-area-view';
import { useColorScheme } from '~/hooks/use-color-scheme';
import { useIsomorphicLayoutEffect } from '~/hooks/use-isomorphic-layout-effect';
import { COLORS } from '~/lib/constants';
import { setAndroidNavigationBar } from '~/lib/set-android-navigation-bar';

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: COLORS.light
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: COLORS.dark
};

SplashScreen.preventAutoHideAsync();

export const ScreenLayout: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  const hasMount = useRef<boolean>(false);
  const { colorScheme, isDarkColorScheme } = useColorScheme();

  useIsomorphicLayoutEffect(() => {
    if (hasMount.current) {
      return;
    }

    if (Platform.OS === 'web') {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add('bg-background');
    }

    setAndroidNavigationBar(colorScheme);
    hasMount.current = true;
  }, []);

  useEffect(() => {
    if (hasMount.current) {
      SplashScreen.hideAsync();
    }
  }, [hasMount]);

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
      <SafeAreaView>{children}</SafeAreaView>
    </ThemeProvider>
  );
};
