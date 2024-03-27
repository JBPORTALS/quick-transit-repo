import React, {
  cloneElement,
  ForwardRefExoticComponent,
  ReactComponentElement,
} from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ChevronDown, LucideIcon, UserCheck } from "lucide-react-native";

import { colors } from "~/utils/constants";

interface AccordionProps extends React.ComponentProps<typeof View> {}

export const Accordion = ({ children, ...props }: AccordionProps) => {
  return (
    <View className="gap-2" {...props}>
      {children}
    </View>
  );
};

interface AccordionListProps extends AccordionProps {}

Accordion.List = ({ children, ...props }: AccordionListProps) => {
  return (
    <View
      className="group gap-2 rounded-lg border border-border bg-background p-3"
      {...props}
    >
      {children}
    </View>
  );
};

interface AccordionHeaderProps {
  Icon: ReactComponentElement<LucideIcon>;
  title: string;
}

Accordion.Header = ({ Icon, title }: AccordionHeaderProps) => {
  return (
    <View className="w-full flex-row items-center justify-between">
      <View className="flex-row items-center gap-3">
        <View className="h-14 w-14 items-center justify-center rounded-full border border-primary bg-primary/20 p-3">
          {Icon}
        </View>
        <Text className="font-medium">{title}</Text>
      </View>
      <TouchableOpacity className="items-center justify-center rounded-full border border-border p-1">
        <ChevronDown size={24} color={colors.accentForeground} />
      </TouchableOpacity>
    </View>
  );
};

interface AccordionBodyProps extends React.ComponentProps<typeof View> {}

Accordion.Body = ({ children, ...props }: AccordionBodyProps) => {
  return (
    <View className="gap-3 border-l border-primary/20 p-3 group-last:border-l-0">
      {children}
    </View>
  );
};
