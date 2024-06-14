import React, { useState } from "react"
import {
  StyleSheet,
  View,
  Button,
  Image,
  Alert,
  Text,
  StatusBar,
} from "react-native"
import * as ImagePicker from "expo-image-picker"
import * as FileSystem from "expo-file-system"
import { Video, ResizeMode } from "expo-av"
import { useRouter } from "expo-router"
import { useImageStore } from "@/store/images"
import { Image as NativeImage } from "react-native"
import Clock from "react-live-clock"

interface Media {
  uri: string | null
  type: string | null
}

const Upload = () => {
  const [selectedPrimary, setSelectedPrimary] = useState<Media>({
    uri: null,
    type: null,
  })
  const [selectedSide, setSelectedSide] = useState<Media>({
    uri: null,
    type: null,
  })
  const [selectedBottom, setSelectedBottom] = useState<Media>({
    uri: null,
    type: null,
  })

  const { primary, side, bottom, setPrimary, setSide, setBottom } =
    useImageStore()
  const router = useRouter()

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== "granted") {
      Alert.alert("Permission to access media is required!")
      return false
    }
    return true
  }

  const pickMedia = async (setMedia: any, type: string) => {
    const hasPermission = await requestPermissions()
    if (!hasPermission) return
    let aspect: [number, number] = [16, 9]

    switch (type) {
      case "primary":
        aspect = [4.25, 2.31]
        break
      case "side":
        aspect = [1, 2.31]
        break
      case "bottom":
        aspect = [50, 7.5]
        break
      default:
        aspect = [16, 9]
        break
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
      aspect: aspect,
    })

    if (!pickerResult.canceled) {
      setMedia({
        uri: pickerResult.assets[0].uri,
        type: pickerResult.assets[0].type,
      })
    }
  }

  const pickPrimaryMedia = () => pickMedia(setSelectedPrimary, "primary")
  const pickSideMedia = () => pickMedia(setSelectedSide, "side")
  const pickBottomMedia = () => pickMedia(setSelectedBottom, "bottom")

  const uploadMedia = async (
    selectedMedia: Media,
    setMedia: any,
    position: string
  ) => {
    if (selectedMedia.uri) {
      const mediaExtension = selectedMedia.type === "video" ? ".mp4" : ".jpg"
      const mediaUri = `${
        FileSystem.documentDirectory
      }images/${position}-${Date.now()}${mediaExtension}`
      await FileSystem.makeDirectoryAsync(
        FileSystem.documentDirectory + "images",
        { intermediates: true }
      )
      await FileSystem.copyAsync({ from: selectedMedia.uri, to: mediaUri })
      setMedia(selectedMedia)
    }
  }

  const uploadImage = async () => {
    try {
      await uploadMedia(selectedPrimary, setPrimary, "primary")
      await uploadMedia(selectedSide, setSide, "side")
      await uploadMedia(selectedBottom, setBottom, "bottom")

      router.push("/")
      Alert.alert("Media uploaded successfully!")
    } catch (error) {
      Alert.alert("Error uploading media", (error as Error).message)
    }
  }

  const renderMedia = (media: Media) => {
    if (media.uri) {
      if (media.type === "video") {
        return (
          <Video
            source={{ uri: media.uri }}
            style={styles.media}
            useNativeControls
            resizeMode={ResizeMode.COVER}
            shouldPlay
            isLooping
            volume={0}
          />
        )
      } else if (media.type === "image") {
        return <Image source={{ uri: media.uri }} style={styles.media} />
      }
    }
    return null
  }

  const clear = () => {
    setSelectedPrimary({
      uri: null,
      type: null,
    })
    setSelectedSide({
      uri: null,
      type: null,
    })
    setSelectedBottom({
      uri: null,
      type: null,
    })
    setPrimary({
      uri: null,
      type: null,
    })
    setSide({
      uri: null,
      type: null,
    })
    setBottom({
      uri: null,
      type: null,
    })
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={{ display: "flex", gap: 10, flexDirection: "row" }}>
        <Button title="Go Back" color="green" onPress={() => router.back()} />
        <Button title="Pick a Primary Media" onPress={pickPrimaryMedia} />
        <Button title="Pick a Side Media" onPress={pickSideMedia} />
        <Button title="Pick a Bottom Media" onPress={pickBottomMedia} />
        {(selectedPrimary.uri || selectedSide.uri || selectedBottom.uri) && (
          <Button title="Upload Media" color="orange" onPress={uploadImage} />
        )}
        <Button title="Clear" color="red" onPress={clear} />
      </View>
      <View style={{ width: "85%", height: "85%" }}>
        <View style={styles.header}>
          <NativeImage
            source={require("../assets/images/logo.png")}
            style={{ height: "100%", objectFit: "contain", marginRight: "-4%" }}
          />
          <View
            style={{
              position: "absolute",
              right: 0,
              width: 100,
              alignItems: "center",
            }}
          >
            <Clock
              style={{
                fontWeight: "bold",
                fontSize: 21,
                color: "white",
              }}
              element={Text}
              format={"h:mm A"}
              ticking={true}
              timezone={"Asia/Manila"}
            />
            <Clock
              element={Text}
              style={{
                fontWeight: "bold",
                fontSize: 10,
                color: "white",
                marginTop: -5,
                textTransform: "uppercase",
              }}
              format={"MMM DD yyyy"}
              ticking={true}
              timezone={"Asia/Manila"}
            />
          </View>
        </View>
        <View style={styles.upper}>
          <View style={styles.primary}>
            {renderMedia(selectedPrimary) || renderMedia(primary)}
          </View>
          <View style={styles.side}>
            {renderMedia(selectedSide) || renderMedia(side)}
          </View>
        </View>
        <View style={styles.bottom}>
          {renderMedia(selectedBottom) || renderMedia(bottom)}
        </View>
      </View>
    </View>
  )
}

export default Upload

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  header: {
    height: "8%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    backgroundColor: "black",
  },
  upper: {
    height: "77%",
    display: "flex",
    flexDirection: "row",
  },
  primary: {
    height: "100%",
    width: "80%",
    backgroundColor: "#808080",
  },
  side: {
    height: "100%",
    width: "20%",
    backgroundColor: "#696969",
  },
  bottom: {
    height: "15%",
    backgroundColor: "#C0C0C0",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  media: {
    width: "100%",
    height: "100%",
  },
})
