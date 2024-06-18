import { Image as ExpoImage } from "expo-image"
import { StyleSheet, View, Pressable, Text } from "react-native"
import { useImageStore } from "@/store/images"
import { router, useFocusEffect } from "expo-router"
import { Media } from "@/store/images"
import { ResizeMode, Video } from "expo-av"
import Clock from "react-live-clock"
import { StatusBar } from "expo-status-bar"
import { useCallback, useState } from "react"
import { Ionicons } from "@expo/vector-icons"

const Display = () => {
  const { primary, side, bottom } = useImageStore()
  const [shouldPlay, setShouldPlay] = useState<boolean>(false)
  const [isPrimaryMute, setIsPrimaryMute] = useState<boolean>(false)
  const [isSideMute, setIsSideMute] = useState<boolean>(false)
  const [isBottomMute, setIsBottomMute] = useState<boolean>(false)

  useFocusEffect(
    useCallback(() => {
      setShouldPlay(true)
      return () => setShouldPlay(false)
    }, [])
  )

  const renderMedia = (media: Media, type: string) => {
    if (media.uri) {
      if (media.type === "video") {
        let isMute

        switch (type) {
          case "primary":
            isMute = isPrimaryMute
            break
          case "side":
            isMute = isSideMute
            break
          case "bottom":
            isMute = isBottomMute
            break
        }

        return (
          <Pressable
            onPress={() => {
              switch (type) {
                case "primary":
                  setIsPrimaryMute((prev) => !prev)
                  break
                case "side":
                  setIsSideMute((prev) => !prev)
                  break
                case "bottom":
                  setIsBottomMute((prev) => !prev)
                  break
              }
            }}
          >
            <Video
              source={{ uri: media.uri }}
              style={styles.media}
              resizeMode={ResizeMode.COVER}
              shouldPlay={shouldPlay}
              isLooping
              volume={isMute ? 0 : 0.4}
            />
            {isMute && (
              <Ionicons
                name="volume-mute"
                size={12}
                style={{
                  zIndex: 100,
                  position: "absolute",
                  color: "white",
                  backgroundColor: "black",
                  bottom: 0,
                  right: 0,
                  margin: 3,
                  padding: 3,
                }}
              />
            )}
          </Pressable>
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
      <View style={styles.container}>
        <Pressable
          onLongPress={() => router.push("/pass")}
          style={styles.header}
        >
          <View
            style={{
              paddingHorizontal: 10,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 12,
                color: "white",
                textTransform: "uppercase",
              }}
            >
              Want to advertise?
            </Text>
            <Text
              style={{
                color: "white",
                textTransform: "uppercase",
                fontSize: 19,
                marginTop: -5,
                fontWeight: "bold",
              }}
            >
              09176292457
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: 10,
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
        </Pressable>
        <View style={styles.upper}>
          <Pressable style={styles.primary}>
            {renderMedia(primary, "primary")}
          </Pressable>
          <View style={styles.side}>{renderMedia(side, "side")}</View>
        </View>
        <Pressable style={styles.bottom}>
          {renderMedia(bottom, "bottom")}
        </Pressable>
      </View>
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
    justifyContent: "space-between",
    paddingVertical: 10,
    backgroundColor: "black",
    flexDirection: "row",
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
