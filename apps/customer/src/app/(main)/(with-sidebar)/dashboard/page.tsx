import { CalendarDays } from "lucide-react";

import Requests, {
  RequestBody,
  RequestButton,
  RequestImage,
  RequestLabel,
  RequestTimeLabel,
  RequestWeightLabel,
} from "@qt/ui/request";
import Rightbar from "@qt/ui/rightbar";
import { HStack, VStack } from "@qt/ui/stack";
import { Text } from "@qt/ui/text";

export default function page() {
  return (
    <div className="grid grid-cols-3 gap-5">
      <div className="col-span-2">
        <Text
          styles={"p_ui_medium"}
          className="font-medium text-muted-foreground "
        >
          Your Recent Requests
        </Text>
      </div>
      <Rightbar />
    </div>
  );
}
