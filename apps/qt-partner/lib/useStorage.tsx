import { useCallback, useEffect, useState } from "react";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { decode } from "base64-arraybuffer";

import { supabase } from "./supabase";

export function useStorage(
  input: {
    bucket: string;
    path: string;
    contentType?: "image/png" | "image/jpeg" | "image/jpg";
  },
  options?: {
    onSuccess?: (res: { id: string; path: string; fullPath: string }) => void;
    onError?: () => void;
  },
) {
  const { bucket, path, contentType = "image/png" } = input;
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
          .upload(`${path}`, decode(body), {
            upsert: true,
            contentType,
            cacheControl: "0",
          });

        if (res.error) options?.onError?.();
        if (res.data) options?.onSuccess?.(res.data);
      }
    }
    setIsUploading(false);
  };

  return { isUploading, openCamera };
}

export function useGetPublicUrl(input: { bucket: string; path: string }) {
  const { bucket, path } = input;
  const [isLoading, setIsLoading] = useState(false);
  const [publicUrl, setPublicUrl] = useState<string | null>(null);
  const [reloadCount, setReloadCount] = useState(0);

  const getFilePath = useCallback(async () => {
    setIsLoading(true);

    const { data: isExists } = await supabase.storage.from(bucket).exists(path);

    if (!isExists) {
      setPublicUrl(null);
      setIsLoading(false);
      return;
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(path);

    setPublicUrl(`${data.publicUrl}?t=${new Date().toUTCString()}`);

    setIsLoading(false);
  }, [bucket, path]);

  useEffect(() => {
    getFilePath();
  }, [reloadCount]);

  const reload = () => setReloadCount((prev) => prev + 1);

  return { isLoading, publicUrl, reload };
}
