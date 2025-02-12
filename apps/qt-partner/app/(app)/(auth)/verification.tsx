import { View } from "react-native";
import Animated, { ZoomIn } from "react-native-reanimated";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { MailCheckIcon } from "lucide-react-native";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import { CheckCircle } from "~/lib/icons/CheckCircle";
import { supabase } from "~/lib/supabase";

const AnimatedEmailSent = Animated.createAnimatedComponent(MailCheckIcon);

const verifyOtp = async (email: string, otp: string) => {
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token: otp,
    type: "email",
  });

  console.log("auth error", error?.code);

  return { data, error };
};

const verificationSchema = z.object({
  otp: z
    .string()
    .trim()
    .min(6, "OTP should 6 digit")
    .max(6, "OTP should be 6 digit"),
});

export default function EmailSent() {
  const form = useForm({
    schema: verificationSchema,
  });

  const searchParams = useLocalSearchParams();
  const email = searchParams.email as string;

  async function onSubmit(values: z.infer<typeof verificationSchema>) {
    if (!email) {
      router.replace("/magic-link");
      return;
    }
    const { data, error } = await verifyOtp(email, values.otp);
    if (error) {
      form.setError("otp", {
        message: error.message,
      });
      return null;
    }

    form.reset();
  }
  return (
    <View className="native:gap-3 flex-1 px-4 py-2">
      <Stack.Screen
        options={{
          title: "Verification",
          headerTitleAlign: "center",
        }}
      />
      <Form {...form}>
        <View className="native:gap-3 native:py-5 w-full">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>6 digit OTP</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoFocus
                    className="native:h-14"
                    keyboardType="number-pad"
                    onChangeText={(value) => field.onChange(value)}
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  Email sent to{" "}
                  <Text className="text-sm text-primary">{email}</Text>
                </FormDescription>
              </FormItem>
            )}
          />
          <Button
            isLoading={form.formState.isSubmitting}
            loadingText="Submitting..."
            onPress={form.handleSubmit(onSubmit)}
            size={"lg"}
            className="w-full"
          >
            <Text>Confirm</Text>
            <CheckCircle size={18} className="text-primary-foreground" />
          </Button>
        </View>
      </Form>
    </View>
  );
}
