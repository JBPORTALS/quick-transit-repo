import { useState } from "react";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { decode } from "base64-arraybuffer";

import { supabase } from "./supabase";

export function useCamera(
  bucket: string,
  path: string,
  options: {
    onSuccess: (res: { id: string; path: string; fullPath: string }) => void;
    onError: () => void;
  },
) {
  const [isUploading, setIsUploading] = useState(false);

  const openCamera = async () => {
    setIsUploading(true);
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

      if (fileAsset) {
        const body = await FileSystem.readAsStringAsync(fileAsset.uri, {
          encoding: "base64",
        });

        const res = await supabase.storage
          .from(bucket)
          .upload(`${path}`, decode(body), { upsert: true });

        if (res.error) options.onError();
        if (res.data) options.onSuccess(res.data);
      }
    }
    setIsUploading(false);
  };

  return { isUploading, openCamera };
}
