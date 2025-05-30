import React, { useState } from "react";
import { View } from "react-native";
import * as FileSystem from "expo-file-system";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams } from "expo-router";
import { decode } from "base64-arraybuffer";
import { z } from "zod";

import { Camera } from "~/lib/icons/Camera";
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
    defaultValues: {
      invoice_uri: undefined,
      franchise_tracking_id: "",
    },
  });
  const [isCameraLoading, setCameraLoading] = useState(false);
  const { id } = useLocalSearchParams<{ id: string }>();
  const utils = api.useUtils();
  const { mutateAsync: updateTrackingDetails, error } =
    api.packages.updateTrackingDetails.useMutation({
      onSuccess() {
        utils.packages.getById.invalidate();
        utils.packages.getAllAssignedPackages.invalidate();
      },
    });

  async function onSubmit(values: z.infer<typeof schema>) {
    try {
      if (values.invoice_uri.uri) {
        const base64 = await FileSystem.readAsStringAsync(
          values.invoice_uri.uri,
          { encoding: "base64" },
        );

        const fileName = `/invoices/${id}.png`;
        const contentType = "image/png";

        const { data, error } = await supabase.storage
          .from("images")
          .upload(fileName, decode(base64), {
            upsert: true,
            contentType,
          });

        if (error)
          form.setError("franchise_tracking_id", { message: error.message });

        await updateTrackingDetails({
          package_id: id,
          image_url: fileName,
          tracking_id: form.getValues().franchise_tracking_id,
        });
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
        {/* <Text>{JSON.stringify(form.getValues(), undefined, 2)}</Text> */}
        <FormField
          disabled={form.formState.isSubmitting}
          control={form.control}
          name="franchise_tracking_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{"Tracking Link"}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="native:h-14"
                  keyboardType="url"
                  onChangeText={field.onChange}
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
