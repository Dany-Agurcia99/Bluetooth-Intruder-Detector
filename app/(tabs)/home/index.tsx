import ScreenWrapper from "@/components/ScreenWrapper"
import ScanButton from "./components/ScanButton"
import DeviceList from "./components/DeviceList"
import { useState } from "react"
import Device from "@/types/device"

const mockDevices: Device[] = [
  { id: "AA:BB:CC:DD:EE:01", name: "iPhone 13", rssi: -45 },
  { id: "AA:BB:CC:DD:EE:02", name: "Samsung Galaxy", rssi: -67 },
  { id: "AA:BB:CC:DD:EE:03", name: "MacBook Pro", rssi: -32 },
  { id: "AA:BB:CC:DD:EE:04", name: "AirPods Pro", rssi: -78 },
  { id: "AA:BB:CC:DD:EE:05", name: "Unknown Device", rssi: -89 },
  { id: "AA:BB:CC:DD:EE:06", name: "Apple Watch", rssi: -56 },
]

const HomeScreenLayout = () => {
  const [isScanning, setIsScanning] = useState(false)

  const handleScan = async () => {
    if (isScanning) return
    console.log("Scanning...")
    setIsScanning(true)
    setTimeout(() => {
      setIsScanning(false)
    }, 3000)
  }

  return (
    <ScreenWrapper>
      <DeviceList devices={mockDevices} />
      <ScanButton onScan={handleScan} isScanning={isScanning} />
    </ScreenWrapper>
  )
}

export default HomeScreenLayout
