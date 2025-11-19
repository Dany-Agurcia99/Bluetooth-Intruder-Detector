import React from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { COLORS } from "@/constants/colors"

type ScreenWrapperProps = {
  children: React.ReactNode
  scrollable?: boolean
  padding?: number
  backgroundColor?: string
}

export default function ScreenWrapper({
  children,
  scrollable = false,
  padding = 20,
  backgroundColor = COLORS.background,
}: ScreenWrapperProps) {
  const insets = useSafeAreaInsets()
  const Container = scrollable ? ScrollView : View

  return (
    <View
      style={{
        flex: 1,
        backgroundColor,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <Container style={{ flex: 1, padding }}>{children}</Container>
    </View>
  )
}
