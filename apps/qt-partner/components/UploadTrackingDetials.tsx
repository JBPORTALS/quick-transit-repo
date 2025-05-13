import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { Link, useLocalSearchParams } from "expo-router";
import { decode } from "base64-arraybuffer";
import { z } from "zod";

import { Camera } from "~/lib/icons/Camera";
import { ActivityIndicator } from "~/lib/native/activity-indicator";
import { supabase } from "~/lib/supabase";
import { api } from "~/lib/trpc/api";
import { AspectRatio } from "./ui/aspect-ratio";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
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

const imagePickerAssetSchema = z.object({
  uri: z
    .string()
    .url()
    .refine((val) => val.startsWith("https://") || val.startsWith("file://"), {
      message: "URI must be a valid https:// or file:// URL",
    }),
  type: z.string().optional(),
  base64: z.string().optional(),
  name: z.string().optional(),
});

const schema = z.object({
  franchise_tracking_id: z
    .string()
    .url()
    .min(1)
    .refine(
      (val) => val.startsWith("https://"),
      "Link must start with https://",
    ),
  invoice_uri: imagePickerAssetSchema,
});

export default function UploadTrackingDetails() {
  const form = useForm({
    schema,
    mode: "onChange",
  });
  const [isCameraLoading, setCameraLoading] = useState(false);
  const [asset, setAsset] = useState<
    ImagePicker.ImagePickerAsset | undefined | null
  >(null);
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
    try {
      if (values.invoice_uri) {
        const response = await fetch(values.invoice_uri.uri);
        const blob = await response.blob();

        const { data, error } = await supabase.storage
          .from("partners")
          .upload(`/invoices/${id}-${values.invoice_uri.name}.png`, blob, {
            upsert: true,
          });

        if (error)
          form.setError("franchise_tracking_id", { message: error.message });
        console.log(data);
      }
    } catch (e) {
      console.log("Uploading error", e);
    }
  }

  const openCamera = async () => {
    setCameraLoading(true);
    // Request camera permissions
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera permissions to make this work!");
      return;
    }

    // Launch camera
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const fileAsset = result.assets.at(0);
      if (fileAsset)
        form.setValue("invoice_uri", {
          uri: fileAsset.uri,
          base64: fileAsset.base64 ?? "",
          type: fileAsset.type,
          name: fileAsset.fileName ?? "",
        });
    }
    setCameraLoading(false);
  };

  return (
    <Form {...form}>
      <View className="gap-3">
        <FormField
          control={form.control}
          name="invoice_uri"
          render={({ field }) => (
            <FormItem>
              {field.value ? (
                <Card className="w-full flex-row items-center  justify-between">
                  <CardContent className="w-full flex-1 flex-row gap-2 p-2 ">
                    <View>
                      <AspectRatio
                        style={{ width: 20, height: 40 }}
                        className="mt-auto "
                        ratio={1 / 1}
                      >
                        <Image
                          style={{ width: "100%", height: "100%" }}
                          source={{
                            uri: field.value.uri,
                          }}
                          contentPosition={"center"}
                          contentFit="contain"
                        />
                      </AspectRatio>
                    </View>
                    <CardHeader className=" flex-shrink flex-grow-0 flex-wrap  p-0">
                      <CardTitle className="text-base">
                        Invoice Reciept
                      </CardTitle>
                      <CardDescription className="w-full text-xs">
                        You can't change the picture once request completed
                      </CardDescription>
                    </CardHeader>
                  </CardContent>
                  <CardFooter className="w-full flex-[0.5]  p-0 px-3">
                    <Button
                      onPress={() => field.onChange("")}
                      size={"sm"}
                      variant={"destructive"}
                      className="w-full"
                    >
                      <Text>Remove</Text>
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <>
                  <FormDescription>
                    Capture clear picture of final franchise invoice reciept
                  </FormDescription>
                  <FormControl>
                    <Button
                      onPress={() => openCamera()}
                      size={"lg"}
                      variant={"secondary"}
                      isLoading={isCameraLoading}
                    >
                      <Camera size={18} className="text-secondary-foreground" />
                      <Text>Upload Invoice</Text>
                    </Button>
                  </FormControl>
                </>
              )}
              <FormMessage children={error?.message} />
            </FormItem>
          )}
        />
        <FormField
          disabled={form.formState.isSubmitting}
          control={form.control}
          name="franchise_tracking_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{"Tracking Link"}</FormLabel>
              <FormControl>
                <Input
                  className="native:h-14"
                  onChangeText={field.onChange}
                  keyboardType="url"
                  {...field}
                />
              </FormControl>
              <FormMessage children={error?.message} />
              <FormDescription>
                Get the tracking link from the franchise.
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
    </Form>
  );
}
