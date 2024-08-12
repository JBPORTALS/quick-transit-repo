import React from "react";
import { View } from "react-native";
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

const SignUpSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export default function SignUp() {
  const form = useForm({
    schema: SignUpSchema,
  });

  async function onSubmit(values: z.infer<typeof SignUpSchema>) {}

  return (
    <View className="flex-1 items-center px-4 py-2">
      <Stack.Screen
        options={{
          title: "Create Account",
          headerTitleAlign: "center",
        }}
      />
      <Text className="px-12 text-center text-muted-foreground">
        Start your first pick-up with by creating new account.
      </Text>
      <Form {...form}>
        <View className="w-full gap-4 py-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
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
