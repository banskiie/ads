import { Pressable, StyleSheet, Text, BackHandler } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { router } from "expo-router"
import { StatusBar } from "expo-status-bar"

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <Pressable
        onPress={() => router.push("/upload")}
        style={{ ...styles.button, backgroundColor: "#91B2BE" }}
      >
        <Text style={styles.text}>Upload</Text>
      </Pressable>
      <Pressable
        onPress={() => router.push("/display")}
        style={{ ...styles.button, backgroundColor: "#59981A" }}
      >
        <Text style={styles.text}>Display Mode</Text>
      </Pressable>
      <Pressable
        onPress={() => BackHandler.exitApp()}
        style={{ ...styles.button, backgroundColor: "#FF6961" }}
      >
        <Text style={styles.text}>Exit</Text>
      </Pressable>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    width: 400,
    borderRadius: 8,
  },
  text: {
    fontWeight: "bold",
    color: "white",
    fontSize: 56,
  },
})
