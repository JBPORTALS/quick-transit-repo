import Rightbar from "@qt/ui/rightbar";
import { Text } from "@qt/ui/text";

export default function page() {
  return (
    <div className="flex gap-10">
      <div className="flex-1  rounded-radius border bg-card p-6 shadow-sm dark:bg-secondary">
        <Text styles={"large"} className="text-secondary-foreground">
          Your Recent Requests
        </Text>
      </div>
      <Rightbar />
    </div>
  );
}
