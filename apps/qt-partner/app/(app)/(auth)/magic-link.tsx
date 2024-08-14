import React from "react";
import { View } from "react-native";
import { makeRedirectUri } from "expo-auth-session";
import { Stack, useRouter } from "expo-router";
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
import { Send } from "~/lib/icons/Send";
import { supabase } from "~/lib/supabase";

const MagicLinkSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const redirectTo = makeRedirectUri();

console.log({ redirectTo });

const sendMagicLink = async (email: string) => {
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: redirectTo,
    },
  });

  return { data, error };
};

export default function MagicLink() {
  const form = useForm({
    schema: MagicLinkSchema,
  });
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof MagicLinkSchema>) {
    const { error } = await sendMagicLink(values.email);

    if (error) console.log(error);

    form.reset();
    router.push("/email-sent");
  }

  return (
    <View className="flex-1 items-center px-4 py-2">
      <Stack.Screen
        options={{
          title: "Magic Link",
          headerTitleAlign: "center",
        }}
      />
      <Text className="native:text-center native:px-12 text-muted-foreground">
        Just verify your email, rest of the things we'll take care of it.
      </Text>
      <Form {...form}>
        <View className="native:gap-3 native:py-5 w-full">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoFocus
                    className="native:h-14"
                    keyboardType="email-address"
                    placeholder="joe@gmail.com"
                    onChangeText={field.onChange}
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  We'll send an link to this email to verify.
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
            <Text>Send</Text>
            <Send size={18} className="text-primary-foreground" />
          </Button>
        </View>
      </Form>
    </View>
  );
}
