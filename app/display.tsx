import { Image as ExpoImage } from "expo-image"
import { Image as NativeImage } from "react-native"
import { StyleSheet, View, Pressable, Text } from "react-native"
import { useImageStore } from "@/store/images"
import { router } from "expo-router"
import { Media } from "@/store/images"
import { ResizeMode, Video } from "expo-av"
import Clock from "react-live-clock"
import { StatusBar } from "expo-status-bar"

const Display = () => {
  const { primary, side, bottom } = useImageStore()

  const renderMedia = (media: Media) => {
    if (media.uri) {
      if (media.type === "video") {
        return (
          <Video
            source={{ uri: media.uri }}
            style={styles.media}
            resizeMode={ResizeMode.COVER}
            shouldPlay
            isLooping
            volume={0}
          />
        )
      } else if (media.type === "image") {
        return (
          <ExpoImage
            source={{ uri: media.uri }}
            style={styles.media}
            contentFit="cover"
            transition={1000}
          />
        )
      }
    }
    return null
  }

  return (
    <>
      <StatusBar hidden={true} />
      <Pressable
        style={styles.container}
        onLongPress={() => router.push("/pass")}
      >
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
        <View style={styles.upper} pointerEvents="none">
          <View style={styles.primary}>{renderMedia(primary)}</View>
          <View style={styles.side}>{renderMedia(side)}</View>
        </View>
        <View style={styles.bottom} pointerEvents="none">
          {renderMedia(bottom)}
        </View>
      </Pressable>
    </>
  )
}

export default Display

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    display: "flex",
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
