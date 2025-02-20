import * as React from 'react';
import { Pressable, TextInput, View, type TextInputProps } from 'react-native';
import { IconCircleX } from '~/lib/icons';

import { cn } from '~/utils';

const Input = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  TextInputProps & { clearable?: boolean; onClear?: () => void }
>(({ className, placeholderClassName, clearable, onClear, ...props }, ref) => {
  return (
    <View className='relative'>
      <TextInput
        ref={ref}
        className={cn(
          'native:h-12 native:text-lg native:leading-[1.25] h-10 rounded-md border border-input bg-background px-3 text-base text-foreground file:border-0 file:bg-transparent file:font-medium web:flex web:w-full web:py-2 web:ring-offset-background web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 lg:text-sm',
          props.editable === false && 'opacity-50 web:cursor-not-allowed',
          className
        )}
        placeholderClassName={cn('text-muted-foreground', placeholderClassName)}
        {...props}
      />
      {clearable && props.value && (
        <Pressable
          className='absolute inset-y-0 right-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70'
          aria-label='Clear input'
          onPress={onClear}
        >
          <IconCircleX size={16} className='text-foreground/80' />
        </Pressable>
      )}
    </View>
  );
});

Input.displayName = 'Input';

export { Input };
