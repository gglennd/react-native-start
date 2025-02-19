import { ViewRef } from '@rn-primitives/types';
import { useNavigationContainerRef } from 'expo-router';
import { forwardRef, useEffect, useState } from 'react';
import { ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { cn } from '~/utils';
import { View } from './ui/view';

type NavigationOptions = {
  headerShown?: boolean;
};

const SafeAreaView = forwardRef<ViewRef, ViewProps>(
  ({ className, style, ...props }, ref) => {
    const navigation = useNavigationContainerRef();
    const [isHeaderShown, setIsHeaderShown] = useState<boolean>(false);

    useEffect(() => {
      const updateHeaderVisibility = () => {
        const options = navigation.getCurrentOptions?.() as NavigationOptions;
        if (options) {
          setIsHeaderShown(options.headerShown ?? false);
        }
      };

      updateHeaderVisibility();

      navigation.addListener('state', updateHeaderVisibility);

      return () => {
        navigation.removeListener('state', updateHeaderVisibility);
      };
    }, [navigation]);

    const inset = useSafeAreaInsets();
    return (
      <View
        ref={ref}
        className={cn('bg-background', className)}
        style={[
          {
            flex: 1,
            paddingTop: isHeaderShown ? null : inset.top,
            paddingBottom: inset.bottom
          },
          style
        ]}
        {...props}
      />
    );
  }
);
SafeAreaView.displayName = 'ThemeView';

export { SafeAreaView };
