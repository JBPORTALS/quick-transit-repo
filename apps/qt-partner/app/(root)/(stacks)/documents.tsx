import React from "react";
import { View } from "react-native";
import { Image } from "expo-image";
import { Stack } from "expo-router";

import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import { Text } from "~/components/ui/text";
import { Lead, Muted } from "~/components/ui/typography";
import { useGetPublicUrl, useStorage } from "~/lib/useStorage";
import { useSupabase } from "~/lib/useSupabase";

function AadharCardPlaceHolder() {
  const { session } = useSupabase();

  const path = `documents/${session?.user.id}-aadhar.png`;

  const { publicUrl, reload, isLoading } = useGetPublicUrl({
    bucket: "images",
    path,
  });

  const { openCamera, isUploading } = useStorage(
    {
      bucket: "images",
      path,
    },
    {
      onSuccess(res) {
        reload(); //Reload the content
      },
    },
  );

  if (isLoading) return <Skeleton className={"h-52 w-full rounded-md"} />;

  if (publicUrl)
    return (
      <>
        <Image
          source={{ uri: publicUrl }}
          style={{ width: "100%", height: 208, borderRadius: 8 }}
        />
        <Muted>It's only used for address proof and indentity purpose</Muted>
        <Button
          isLoading={isUploading}
          onPress={() => openCamera()}
          variant={"secondary"}
        >
          <Text>Re-Upload Aadhar</Text>
        </Button>
      </>
    );

  return (
    <Button
      isLoading={isUploading}
      onPress={() => openCamera()}
      variant={"secondary"}
    >
      <Text>Upload Aadhar</Text>
    </Button>
  );
}

function DrivingLicensePlaceHolder() {
  const { session } = useSupabase();

  const path = `documents/${session?.user.id}-driving-licence.png`;

  const { publicUrl, reload, isLoading } = useGetPublicUrl({
    bucket: "images",
    path,
  });

  const { openCamera, isUploading } = useStorage(
    {
      bucket: "images",
      path,
    },
    {
      onSuccess(res) {
        reload(); //Reload the content
      },
    },
  );

  if (isLoading) return <Skeleton className={"h-52 w-full rounded-md"} />;

  if (publicUrl)
    return (
      <>
        <Image
          source={{ uri: publicUrl }}
          style={{ width: "100%", height: 208, borderRadius: 8 }}
        />
        <Muted>
          It's only used to verify that you officialy drive a vehicle
        </Muted>
        <Button
          isLoading={isUploading}
          onPress={() => openCamera()}
          variant={"secondary"}
        >
          <Text>Re-Upload Driving Licence</Text>
        </Button>
      </>
    );

  return (
    <>
      <View className="h-52 rounded-lg border border-dashed border-border bg-accent/20"></View>
      <Button
        isLoading={isUploading}
        onPress={() => openCamera()}
        variant={"secondary"}
      >
        <Text>Upload Driving Licence</Text>
      </Button>
    </>
  );
}

export default function Documents() {
  return (
    <View className="gap-3 p-5">
      <Stack screenOptions={{ title: "Documents" }} />

      <Lead>Aadhar Card</Lead>
      <AadharCardPlaceHolder />

      <Lead>Driving Licence</Lead>
      <DrivingLicensePlaceHolder />
    </View>
  );
}
