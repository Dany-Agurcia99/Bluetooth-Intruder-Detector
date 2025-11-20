import ScreenWrapper from "@/components/ScreenWrapper"
import React from "react"
import { Text, View } from "react-native"
import TrustedDeviceCard from "./components/TrustedDeviceCard"

const TrustedDevicesScreenLayout = () => {
  return (
    <ScreenWrapper>
      <TrustedDeviceCard device={{ id: "1", name: "Device 1", rssi: -50 }} />
    </ScreenWrapper>
  )
}

export default TrustedDevicesScreenLayout
