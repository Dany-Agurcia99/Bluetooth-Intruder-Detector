import { View, Text } from "react-native"
import ScreenWrapper from "@/components/ScreenWrapper"
import ScanButton from "./components/ScanButton"
import DeviceCard from "./components/DeviceCard"
import DeviceList from "./components/DeviceList"

const HomeScreenLayout = () => {
  return (
    <ScreenWrapper>
      <DeviceList />
      <ScanButton />
    </ScreenWrapper>
  )
}

export default HomeScreenLayout
