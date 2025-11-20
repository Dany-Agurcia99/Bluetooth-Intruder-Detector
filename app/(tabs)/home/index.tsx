import ScreenWrapper from "@/components/ScreenWrapper"
import ScanButton from "./components/ScanButton"
import DeviceList from "./components/DeviceList"
import { useState } from "react"
import Device from "@/types/device"
import { BleManager } from "react-native-ble-plx"
import { Platform, PermissionsAndroid } from "react-native"

const manager = new BleManager()

const HomeScreenLayout = () => {
  const [isScanning, setIsScanning] = useState(false)
  const [devices, setDevices] = useState<Device[]>([])

  async function requestBlePermissions() {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      ])

      const allGranted = Object.values(granted).every(
        (result) => result === PermissionsAndroid.RESULTS.GRANTED
      )

      return allGranted
    }
    return true
  }

  const handleScan = async () => {
    if (isScanning) return
    const ok = await requestBlePermissions()
    if (!ok) {
      console.warn("Permissions denied")
      return
    }
    setDevices([])
    setIsScanning(true)

    console.log("Scanning...")

    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log("Scan error:", error)
        return
      }

      if (device) {
        setDevices((prev) => {
          const exists = prev.find((d) => d.id === device.id)
          if (exists) return prev

          const deviceData: Device = {
            id: device.id,
            name: device.name || "Unknown Device",
            rssi: device.rssi || -100,
          }
          return [...prev, deviceData]
        })
      }
    })

    setTimeout(() => {
      manager.stopDeviceScan()
      setIsScanning(false)
      console.log("Stopped Scanning")
    }, 3000)
  }

  return (
    <ScreenWrapper>
      <DeviceList devices={devices} />
      <ScanButton onScan={handleScan} isScanning={isScanning} />
    </ScreenWrapper>
  )
}

export default HomeScreenLayout
