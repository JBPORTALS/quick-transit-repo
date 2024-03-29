import { TextInput } from "react-native";
import { cx } from "class-variance-authority";

import { useColorsTheme } from "~/utils/constants";

interface InputProps extends React.ComponentProps<typeof TextInput> {}

export default function Input({ className, ...props }: InputProps) {
  const colors = useColorsTheme();
  return (
    <TextInput
      {...props}
      cursorColor={colors.primary}
      placeholderTextColor={colors.accent}
      className={cx(
        "flex h-14 flex-1 rounded-md border border-input px-3 py-1 text-lg",
        className,
      )}
    />
  );
}
