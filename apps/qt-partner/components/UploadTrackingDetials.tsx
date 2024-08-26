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
  franchise_tracking_id: z.string().min(1),
});

export default function UploadTrackingDetails() {
  const form = useForm({
    schema,
    mode: "onChange",
  });
  const { id } = useLocalSearchParams<{ id: string }>();
  const utils = api.useUtils();
  const { mutateAsync, error } = api.packages.updateTrackingDetails.useMutation(
    {
      onSuccess() {
        utils.packages.getById.invalidate();
        utils.packages.getAllAssignedPackages.invalidate();
      },
    },
  );

  async function onSubmit(values: z.infer<typeof schema>) {
    await mutateAsync({
      package_id: id,
      tracking_id: values.franchise_tracking_id,
    });
  }

  return (
    <Form {...form}>
      <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
        <View className="gap-3">
          <FormField
            disabled={form.formState.isSubmitting}
            control={form.control}
            name="franchise_tracking_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{"Tracking ID"}</FormLabel>
                <FormControl>
                  <Input
                    className="native:h-14"
                    onChangeText={field.onChange}
                    {...field}
                  />
                </FormControl>
                <FormMessage children={error?.message} />
                <FormDescription>
                  Get the tracking ID from the franchise.
                </FormDescription>
              </FormItem>
            )}
          />

          <Button
            onPress={form.handleSubmit(onSubmit)}
            isLoading={form.formState.isSubmitting}
            size={"lg"}
          >
            <Text>Complete Request</Text>
          </Button>
        </View>
      </KeyboardAvoidingView>
    </Form>
  );
}
