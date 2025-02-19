import { ViewRef } from '@rn-primitives/types';
import { forwardRef } from 'react';
import { View as RNView, ViewProps } from 'react-native';
import { cn } from '~/utils/cn';

const View = forwardRef<ViewRef, ViewProps>(({ className, ...props }, ref) => {
  return (
    <RNView ref={ref} className={cn('bg-background', className)} {...props} />
  );
});
View.displayName = 'View';

export { View };
