import React from "react";
import { ActivityIndicator, View } from "react-native";
import { useRouter } from "expo-router";
import { Loader } from "lucide-react-native";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from "~/components/form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import { NAV_THEME } from "~/lib/constants";
import { supabase } from "~/utils/supabase";

const SignUpSchema = z.object({
  fullName: z.string().min(3, "Invalid name"),
  email: z.string().min(1, "Required"),
  password: z.string().min(1, "Required"),
});

export default function SignUp() {
  const form = useForm({
    schema: SignUpSchema,
    mode: "onChange",
  });

  const router = useRouter();
  const colors = NAV_THEME.light;

  async function onSubmit(values: z.infer<typeof SignUpSchema>) {
    try {
      const user = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            fullName: values.fullName,
          },
        },
      });

      router.replace("/(tabs)");
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Form {...form}>
      <View className="flex-1 gap-6 bg-secondary px-4 pt-10">
        <FormField
          disabled={form.formState.isSubmitting}
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  editable={!field.disabled}
                  selectTextOnFocus={!field.disabled}
                  onChangeText={field.onChange}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
              <FormDescription>This will be your display name.</FormDescription>
            </FormItem>
          )}
        />
        <FormField
          disabled={form.formState.isSubmitting}
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  editable={!field.disabled}
                  selectTextOnFocus={!field.disabled}
                  onChangeText={field.onChange}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={form.formState.isSubmitting}
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  editable={!field.disabled}
                  selectTextOnFocus={!field.disabled}
                  onChangeText={field.onChange}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          isLoading
          onPress={form.handleSubmit(onSubmit)}
          size={"lg"}
          loadingText={<Text>Creating...</Text>}
          className="w-full gap-2"
        >
          <Text>Create Account</Text>
        </Button>
      </View>
    </Form>
  );
}
