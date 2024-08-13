import React from "react";
import { View } from "react-native";
import { makeRedirectUri } from "expo-auth-session";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import * as Linking from "expo-linking";
import { Stack } from "expo-router";
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
import { supabase } from "~/lib/supabase";

const SignUpSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const redirectTo = makeRedirectUri({
  path: "/sign-up",
});

console.log({ redirectTo });

const createSessionFromUrl = async (url: string) => {
  const { params, errorCode } = QueryParams.getQueryParams(url);

  if (errorCode) throw new Error(errorCode);
  const { access_token, refresh_token } = params;

  if (!access_token) return;

  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });
  if (error) throw error;
  return data.session;
};

const sendMagicLink = async (email: string) => {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: redirectTo,
    },
  });

  if (error) throw error;
  // Email sent.
};

export default function SignUp() {
  // Handle linking into app from email app.
  const url = Linking.useURL();
  if (url) createSessionFromUrl(url);

  console.log({ url });

  const form = useForm({
    schema: SignUpSchema,
  });

  async function onSubmit(values: z.infer<typeof SignUpSchema>) {
    await sendMagicLink(values.email);
  }

  return (
    <View className="flex-1 items-center px-4 py-2">
      <Stack.Screen
        options={{
          title: "Create Account",
          headerTitleAlign: "center",
        }}
      />
      <Text className="native:text-center native:px-12 text-muted-foreground">
        Start your first pick-up with by creating new account.
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
            <Text>Submit</Text>
          </Button>
        </View>
      </Form>
    </View>
  );
}
