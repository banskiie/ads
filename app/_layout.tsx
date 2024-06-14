import { Stack } from "expo-router"
import { useEffect } from "react"
import { BackHandler } from "react-native"
import { useKeepAwake } from "expo-keep-awake"

export default () => {
  useKeepAwake()
  
  useEffect(() => {
    const backAction = () => {
      return true
    }

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    )

    return () => backHandler.remove()
  }, [])

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  )
}
