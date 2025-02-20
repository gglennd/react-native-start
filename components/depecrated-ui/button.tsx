import * as Slot from '@rn-primitives/slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import {
  Platform,
  Pressable,
  type PressableStateCallbackType,
  Text,
  View
} from 'react-native';
import { useColorScheme } from '~/hooks';
import { cn } from '~/utils';

export function isTextChildren(
  children:
    | React.ReactNode
    | ((state: PressableStateCallbackType) => React.ReactNode)
) {
  return Array.isArray(children)
    ? children.every((child) => typeof child === 'string')
    : typeof children === 'string';
}

const buttonVariants = cva(
  'flex-row items-center justify-center rounded-md web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-primary',
        destructive: 'bg-destructive',
        outline: 'border border-input bg-background',
        secondary: 'bg-secondary',
        ghost: '',
        link: ''
      },
      size: {
        default: 'px-4 py-2 native:px-6 native:py-3.5',
        sm: 'px-3 py-1 native:py-2',
        lg: 'px-8 py-1.5 native:py-4'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

const buttonTextVariants = cva('font-medium', {
  variants: {
    variant: {
      default: 'text-primary-foreground',
      destructive: 'text-destructive-foreground',
      outline: 'text-foreground',
      secondary: 'text-secondary-foreground',
      ghost: 'text-foreground',
      link: 'text-primary underline'
    },
    size: {
      default: 'text-sm native:text-xl',
      sm: 'text-xs native:text-lg',
      lg: 'text-base native:text-2xl'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'default'
  }
});

const rippleColor = (isThemeDark: boolean) => {
  const secondary = isThemeDark ? 'hsl(240 4% 16%)' : 'hsl(240 5% 96%)';
  return {
    default: isThemeDark ? '#d4d4d8' : '#3f3f46',
    destructive: isThemeDark ? '#b91c1c' : '#f87171',
    outline: secondary,
    secondary: isThemeDark ? '#3f3f46' : '#e4e4e7',
    ghost: secondary,
    link: secondary
  };
};

const Button = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> &
    VariantProps<typeof buttonVariants> & {
      textClass?: string;
      androidRootClass?: string;
    }
>(
  (
    {
      className,
      textClass,
      variant = 'default',
      size,
      children,
      androidRootClass,
      disabled,
      ...props
    },
    ref
  ) => {
    const { isDarkColorScheme } = useColorScheme();
    const Root = Platform.OS === 'android' ? View : Slot.Pressable;
    return (
      <Root
        className={cn(
          Platform.OS === 'android' && 'flex-row overflow-hidden rounded-md',
          Platform.OS === 'android' && androidRootClass
        )}
      >
        <Pressable
          className={cn(
            buttonVariants({
              variant,
              size,
              className: cn(
                className,
                disabled && 'opacity-50 web:cursor-default'
              )
            })
          )}
          ref={ref}
          android_ripple={{
            color: rippleColor(isDarkColorScheme)[variant as 'default'],
            borderless: false
          }}
          disabled={disabled}
          {...props}
        >
          {isTextChildren(children)
            ? ({ pressed }) => (
                <Text
                  className={cn(
                    'web:hover:opacity-90',
                    pressed && 'opacity-70',
                    buttonTextVariants({ variant, size, className: textClass }),
                    disabled && 'opacity-100'
                  )}
                >
                  {children as string | string[]}
                </Text>
              )
            : children}
        </Pressable>
      </Root>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonTextVariants, buttonVariants };
