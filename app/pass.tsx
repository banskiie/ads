import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native"
import React, { useEffect, useState } from "react"
import { router } from "expo-router"
import { useAuthStore } from "@/store/auth"
import { StatusBar } from "expo-status-bar"

const password = () => {
  const { password: correct } = useAuthStore()
  const [password, setPassword] = useState<string>("")

  useEffect(() => {
    if (correct == password) {
      router.push("/")
    }
  }, [password, correct])

  const add = (value: string) => {
    if (password.length <= 7) setPassword(password + value)
  }

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <StatusBar hidden={true} />
      <View style={{ gap: 10 }}>
        <View pointerEvents="none">
          <TextInput
            secureTextEntry={true}
            style={{
              width: "100%",
              height: 90,
              backgroundColor: "#E8E4C9",
              borderRadius: 10,
              fontSize: 60,
              paddingHorizontal: 20,
              fontWeight: "bold",
              color: "black",
            }}
            value={password}
            editable={false}
          />
        </View>
        <View style={styles.keypad}>
          <TouchableOpacity style={styles.btn} onPress={() => add("1")}>
            <Text style={styles.text}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => add("2")}>
            <Text style={styles.text}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => add("3")}>
            <Text style={styles.text}>3</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.keypad}>
          <TouchableOpacity style={styles.btn} onPress={() => add("4")}>
            <Text style={styles.text}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => setPassword(password + "5")}
          >
            <Text style={styles.text}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => setPassword(password + "6")}
          >
            <Text style={styles.text}>6</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.keypad}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => setPassword(password + "7")}
          >
            <Text style={styles.text}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => setPassword(password + "8")}
          >
            <Text style={styles.text}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => setPassword(password + "9")}
          >
            <Text style={styles.text}>9</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.keypad}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => setPassword((prev) => prev.slice(0, -1))}
          >
            <Text style={styles.text}>DEL</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => setPassword(password + "0")}
          >
            <Text style={styles.text}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => router.back()}>
            <Text style={styles.text}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default password

const styles = StyleSheet.create({
  keypad: { display: "flex", flexDirection: "row", gap: 10 },
  btn: {
    backgroundColor: "#91B2BE",
    width: 140,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  text: {
    fontWeight: "bold",
    fontSize: 60,
    color: "white",
  },
})
