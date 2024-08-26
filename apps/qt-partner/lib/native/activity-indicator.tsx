import { ActivityIndicator } from "react-native";
import { cssInterop } from "nativewind";

function indicatorWithClassName(indicator: typeof ActivityIndicator) {
  cssInterop(indicator, {
    className: {
      target: "style",
      nativeStyleToProp: {
        color: true,
      },
    },
  });
}

indicatorWithClassName(ActivityIndicator);

export { ActivityIndicator };
