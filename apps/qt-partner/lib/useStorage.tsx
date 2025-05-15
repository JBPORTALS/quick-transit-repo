import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export function useCamera() {
  const [isCameraLoading, setCameraLoading] = useState(false);

  const [file, setFile] = useState();

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
      if (fileAsset) setFile();
    }
    setCameraLoading(false);
  };
}
