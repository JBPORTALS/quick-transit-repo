import { RefreshControl } from "react-native";
import { cssInterop } from "nativewind";

function indicatorWithClassName(indicator: typeof RefreshControl) {
  cssInterop(indicator, {
    className: {
      target: "colors",
      nativeStyleToProp: {
        color: "colors",
      },
    },
  });
}

indicatorWithClassName(RefreshControl);

export { RefreshControl };
