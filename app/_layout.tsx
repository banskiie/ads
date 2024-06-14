import { Stack } from "expo-router"
import { useEffect } from "react"
import { Alert, BackHandler } from "react-native"

export default () => {
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
