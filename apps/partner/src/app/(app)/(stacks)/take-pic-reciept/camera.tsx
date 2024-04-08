import React, { useRef, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Camera,
  CameraCapturedPicture,
  CameraProps,
  CameraType,
  ImageType,
} from "expo-camera";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { CameraIcon, CheckCheck, CrossIcon, XIcon } from "lucide-react-native";

import Button from "~/components/button";
import { useColorsTheme } from "~/utils/constants";

export default function CameraScreen() {
  const [type, setType] = useState(CameraType.back);
  const [isCameraReady, setCameraReady] = useState(false);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const router = useRouter();
  const camera = useRef<Camera>(null);
  const [ratio, setRatio] = useState<string[] | undefined>(undefined);
  const [data, setData] = useState<string | null>(null);

  if (!permission?.granted) requestPermission();

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back,
    );
  }

  React.useEffect(() => {
    (async () => {
      if (isCameraReady) {
        setRatio(await camera.current?.getSupportedRatiosAsync());
      }
    })();
    console.log(ratio);
  }, [isCameraReady]);

  async function takePicture() {
    try {
      if (isCameraReady) {
        camera.current?.takePictureAsync({
          imageType: ImageType.png,
          onPictureSaved: (pic) => {
            console.log(pic);
            setData(pic.uri);
          },
        });
      }
    } catch (e) {}
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent style="light" />

      {data ? (
        <View className="relative flex-1">
          <Image
            source={{ uri: data }}
            style={{ height: "auto", width: "auto", flex: 1 }}
          ></Image>
          <View className="absolute bottom-5 w-full flex-row justify-center gap-28 p-5">
            <TouchableOpacity onPress={() => setData(null)}>
              <View className="h-20 w-20 items-center justify-center rounded-full border-2 border-white">
                <XIcon size={32} color={"white"} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <View className="h-20 w-20 items-center justify-center rounded-full border-2 border-white">
                <CheckCheck size={32} color={"white"} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Camera
          onCameraReady={() => setCameraReady(true)}
          ratio={ratio?.[ratio?.length - 1]} // Default to the highest resolution
          style={styles.camera}
          type={type}
          ref={camera}
        >
          <View className="h-full w-fit items-center justify-between p-6">
            <TouchableOpacity
              className="self-start"
              onPress={() => router.back()}
            >
              <View className="mt-5 h-14 w-14 items-center justify-center rounded-full border-2 border-white">
                <XIcon size={32} color={"white"} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={takePicture}>
              <View className="h-20 w-20 items-center justify-center rounded-full border-2 border-white">
                <CameraIcon size={32} color={"white"} />
              </View>
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
});
