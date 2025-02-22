/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useColorScheme } from '~/hooks/useColorScheme';
import { COLORS } from '~/lib/constants';

export function useColors() {
  const { colorScheme } = useColorScheme();
  return COLORS[colorScheme];
}
