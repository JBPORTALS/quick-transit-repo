import React from "react";
import { KeyboardAvoidingView, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { z } from "zod";

import { api } from "~/lib/trpc/api";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from "./ui/form";
import { Input } from "./ui/input";
import { Text } from "./ui/text";

const schema = z.object({
  otp: z
    .string()
    .min(6, "OTP must be six digit code")
    .max(6, "OTP must not exceed more than 6 digit"),
});
export default function VerifyPakcage() {
  const form = useForm({
    schema,
    mode: "onChange",
  });
  const { id } = useLocalSearchParams<{ id: string }>();
  const utils = api.useUtils();
  const { mutateAsync, error } = api.packages.verify.useMutation({
    onSuccess() {
      utils.packages.getById.invalidate();
    },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    await mutateAsync({ package_id: id, otp: values.otp });
  }

  return (
    <Form {...form}>
      <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
        <View className="gap-3">
          <FormField
            disabled={form.formState.isSubmitting}
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{"One Time Password (OTP)"}</FormLabel>
                <FormControl>
                  <Input
                    keyboardType="numeric"
                    textContentType="oneTimeCode"
                    textAlign="center"
                    placeholder="######"
                    className="native:h-14"
                    onChangeText={field.onChange}
                    {...field}
                  />
                </FormControl>
                <FormMessage children={error?.message} />
                <FormDescription>
                  Ask customer for their 6 digit code.
                </FormDescription>
              </FormItem>
            )}
          />
          <Button
            onPress={form.handleSubmit(onSubmit)}
            isLoading={form.formState.isSubmitting}
            size={"lg"}
          >
            <Text>Verify</Text>
          </Button>
        </View>
      </KeyboardAvoidingView>
    </Form>
  );
}
