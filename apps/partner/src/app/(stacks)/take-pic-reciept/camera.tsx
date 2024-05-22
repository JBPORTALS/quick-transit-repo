import type { ImageType } from "expo-camera";
import React, { useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
  Camera,
  CameraOrientation,
  CameraType,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { CameraIcon, CheckCheck, XIcon } from "lucide-react-native";

export default function CameraScreen() {
  const [type, setType] = useState<CameraType>("back");
  const [isCameraReady, setCameraReady] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const router = useRouter();
  const camera = useRef<CameraView>(null);
  const [data, setData] = useState<string | null>(null);

  if (!permission?.granted) requestPermission();

  async function takePicture() {
    try {
      if (isCameraReady) {
        camera.current?.takePictureAsync({
          imageType: "png",
          onPictureSaved: (pic) => {
            console.log(pic);
            setData(pic.uri);
          },
          quality: 1,
          skipProcessing: true,
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
        <CameraView
          onCameraReady={() => setCameraReady(true)}
          style={styles.camera}
          ref={camera}
          facing={type}
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
        </CameraView>
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
