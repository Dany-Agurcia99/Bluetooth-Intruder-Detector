import { View, Text } from "react-native"
import ScreenWrapper from "@/components/ScreenWrapper"
import ScanButton from "./components/ScanButton"
import DeviceCard from "./components/DeviceCard"

const HomeScreenLayout = () => {
  return (
    <ScreenWrapper>
      <DeviceCard device={{ id: "1", name: "Device 1", rssi: -45 }} />
      <ScanButton />
    </ScreenWrapper>
  )
}

export default HomeScreenLayout
