import { Appearance } from "react-native";

export function useColorScheme() {
  const { setColorScheme, getColorScheme } = Appearance;
  const colorScheme = getColorScheme();

  function toggleColorScheme() {
    if (colorScheme === "dark") setColorScheme("light");
    else setColorScheme("dark");
  }

  return {
    colorScheme: colorScheme ?? "dark",
    isDarkColorScheme: colorScheme === "dark",
    setColorScheme,
    toggleColorScheme,
  };
}
