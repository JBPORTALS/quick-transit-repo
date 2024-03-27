import React, { cloneElement } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { cva, VariantProps } from "class-variance-authority";
import { Loader2Icon } from "lucide-react-native";

import { useColorsTheme } from "~/utils/constants";

const buttonVariants = cva(
  "flex-row items-center justify-center gap-3 rounded-md px-5 py-3 disabled:opacity-60",
  {
    variants: {
      variant: {
        primary: "bg-primary",
        ghost: "border border-border bg-transparent",
      },
      size: {
        sm: "px-4 py-2",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

const buttonTextVariants = cva("text-xl", {
  variants: {
    variant: {
      primary: "text-primary-foreground",
      ghost: "text-secondary-foreground",
    },
    size: {
      sm: "text-lg",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

interface ButtonProps
  extends React.ComponentProps<typeof TouchableOpacity>,
    VariantProps<typeof buttonVariants> {
  textClassName?: string;
  leftIcon?: React.ReactComponentElement<any>;
  rightIcon?: React.ReactComponentElement<any>;
  isLoading?: boolean;
}

export default function Button({
  children,
  className,
  variant,
  textClassName,
  size,
  leftIcon,
  rightIcon,
  isLoading,
  disabled = isLoading,
  ...props
}: ButtonProps) {
  const colors = useColorsTheme();
  const rotation = useSharedValue(0);

  React.useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 700, easing: Easing.linear }),
      -1,
    );
  }, []);

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <TouchableOpacity
      disabled={disabled}
      className={buttonVariants({ className, variant, size })}
      {...props}
    >
      {leftIcon && !isLoading && <View>{cloneElement(leftIcon)}</View>}

      {isLoading ? (
        <Animated.View style={[style]}>
          <Loader2Icon
            size={24}
            color={
              variant == "primary"
                ? colors.primaryForeground
                : colors.foreground
            }
          />
        </Animated.View>
      ) : (
        <Text
          className={buttonTextVariants({
            variant,
            className: textClassName,
            size,
          })}
        >
          {children}
        </Text>
      )}
      {rightIcon && !isLoading && <View>{cloneElement(rightIcon)}</View>}
    </TouchableOpacity>
  );
}
