import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { ScreenLayout } from '~/components/screen-layout';

import '~/global.css';

export { ErrorBoundary } from 'expo-router';

function RootStackNavigationLayout() {
  return (
    <Stack
      screenLayout={(props) => <ScreenLayout {...props} />}
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name='index' />
      <Stack.Screen name='+not-found' />
    </Stack>
  );
}

export default RootStackNavigationLayout;
