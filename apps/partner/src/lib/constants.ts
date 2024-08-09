import { Theme } from "@react-navigation/native";

interface NavTheme {
  dark: Theme["colors"];
  light: Theme["colors"];
}

export const NAV_THEME: NavTheme = {
  light: {
    background: "hsl(0 0% 100%)",
    text: "hsl(224 71.4% 4.1%)",
    card: "hsl(0 0% 100%)",
    primary: "hsl(262.1 83.3% 57.8%)",
    notification: "hsl(0 84.2% 60.2%)",
    border: "hsl(220 13% 91%)",
  },
  dark: {
    background: "hsl(224 71.4% 4.1%)",
    text: "hsl(210 20% 98%)",
    card: "hsl(224 71.4% 4.1%)",
    primary: "hsl(263.4 70% 50.4%)",
    notification: "hsl(0 84.2% 60.2%)",
    border: "hsl(215 27.9% 16.9%)",
  },
};
