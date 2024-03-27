import React, {
  createContext,
  forwardRef,
  ReactComponentElement,
  useContext,
  useState,
} from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { cx } from "class-variance-authority";
import { ChevronDown, ChevronUp, LucideIcon } from "lucide-react-native";

import { useColorsTheme } from "~/utils/constants";

//Animation Context
const AccordionContext = createContext<{
  toggle: () => void;
  style: {};
  // setLayoutHeight: React.Dispatch<React.SetStateAction<number>>;
  isOpened: boolean;
}>({
  style: {},
  toggle: () => {},
  // setLayoutHeight: () => {},
  isOpened: false,
});

interface AccordionContextProviderProps {
  children: React.ReactNode;
}

const AccordionContextProvider = ({
  children,
}: AccordionContextProviderProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const animatedValue = useSharedValue(0);

  React.useEffect(() => {
    console.log(isOpened);
    if (!isOpened) {
      animatedValue.value = 0;
    } else {
      animatedValue.value = 100;
    }
  }, [isOpened]);

  const toggle = () => {
    if (isOpened) setIsOpened(false);
    else setIsOpened(true);
  };

  const style = useAnimatedStyle(() => {
    return {
      height: isOpened ? "auto" : 0,
      padding: isOpened ? 8 : 0,
    };
  });

  return (
    <AccordionContext.Provider value={{ style, toggle, isOpened }}>
      {children}
    </AccordionContext.Provider>
  );
};

interface AccordionProps extends React.ComponentProps<typeof View> {}

export const Accordion = ({ children, ...props }: AccordionProps) => {
  return (
    <View className="h-fit gap-2" {...props}>
      {children}
    </View>
  );
};

interface AccordionListProps extends AccordionProps {}

Accordion.List = ({ children, className, ...props }: AccordionListProps) => {
  return (
    <AccordionContextProvider>
      <View
        style={{ height: "auto" }}
        className={cx(
          "gap-2 overflow-hidden rounded-lg border border-border bg-card p-3",
          className,
        )}
        {...props}
      >
        {children}
      </View>
    </AccordionContextProvider>
  );
};

interface AccordionHeaderProps
  extends React.ComponentProps<typeof TouchableOpacity> {
  Icon: ReactComponentElement<LucideIcon>;
  title: string;
}

Accordion.Header = ({ Icon, title, ...props }: AccordionHeaderProps) => {
  const colors = useColorsTheme();
  const { toggle, isOpened } = useContext(AccordionContext);

  return (
    <TouchableOpacity
      {...props}
      onPress={() => toggle()}
      className="disabled:opacity-60"
    >
      <View className="w-full flex-row items-center justify-between ">
        <View className="flex-row items-center gap-3">
          <View className="h-14 w-14 items-center justify-center rounded-full border border-primary/40 bg-primary/10 p-3">
            {Icon}
          </View>
          <Text className="font-medium text-card-foreground">{title}</Text>
        </View>
        <View className="items-center justify-center rounded-full border border-border p-1">
          {isOpened ? (
            <ChevronUp size={24} color={colors.accentForeground} />
          ) : (
            <ChevronDown size={24} color={colors.accentForeground} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

interface AccordionBodyProps extends React.ComponentProps<typeof View> {}

Accordion.Body = forwardRef<
  React.ComponentRef<typeof View>,
  AccordionBodyProps
>(({ children, className, ...props }: AccordionBodyProps, ref) => {
  const { style } = useContext(AccordionContext);
  return (
    <Animated.View
      ref={ref}
      {...props}
      style={[style]}
      className={cx("gap-3 overflow-hidden bg-red-200", className)}
    >
      {children}
    </Animated.View>
  );
});

Accordion.Body.displayName = "AccordionBody";
