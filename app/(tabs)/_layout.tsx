import { COLORS } from "../../constants/colors"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import Feather from "@expo/vector-icons/Feather"
import Octicons from "@expo/vector-icons/Octicons"
import { Tabs } from "expo-router"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export default function TabsLayout() {
  const tabColor = COLORS.primary
  const tabBarColor = COLORS.accent
  const insets = useSafeAreaInsets()

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: tabBarColor,
          borderTopWidth: 1,
          borderColor: "#333",
          height: 70 + insets.bottom,
          paddingBottom: 6 + insets.bottom,
          paddingTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, size }) => (
            <MaterialCommunityIcons
              name="line-scan"
              size={focused ? size + 3 : size}
              color={focused ? tabColor : "gray"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="trusted_devices"
        options={{
          title: "Trusted",
          tabBarIcon: ({ focused, size }) => (
            <Octicons
              name="verified"
              size={focused ? size + 3 : size}
              color={focused ? tabColor : "gray"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="logs"
        options={{
          title: "Log",
          tabBarIcon: ({ focused, size }) => (
            <MaterialCommunityIcons
              name="clipboard-text-outline"
              size={focused ? size + 3 : size}
              color={focused ? tabColor : "gray"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ focused, size }) => (
            <Feather
              name="settings"
              size={focused ? size + 3 : size}
              color={focused ? tabColor : "gray"}
            />
          ),
        }}
      />
    </Tabs>
  )
}
