import React, { useRef, useState } from "react"
import {
  FlatList,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { BleManager, Device } from "react-native-ble-plx"

const manager = new BleManager()

// Calculate distance from RSSI (approximate)
const calculateDistance = (rssi: number): number => {
  // Simple distance estimation formula
  // Distance (m) = 10^((Tx Power - RSSI) / (10 * n))
  // Assuming Tx Power = -59 dBm at 1m, n = 2 (free space)
  const txPower = -59
  const pathLoss = 2
  const distance = Math.pow(10, (txPower - rssi) / (10 * pathLoss))
  return Math.max(0.1, Math.round(distance * 10) / 10) // Round to 1 decimal, min 0.1m
}

export default function App() {
  const [devices, setDevices] = useState<Device[]>([])
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null)
  const [distance, setDistance] = useState<number | null>(null)
  const [scanning, setScanning] = useState(false)
  const [scanFinished, setScanFinished] = useState(false)
  const rssiIntervalRef = useRef<NodeJS.Timeout | null>(null)

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

  const scan = async () => {
    const ok = await requestBlePermissions()
    if (!ok) {
      console.warn("Permissions denied")
      return
    }

    setDevices([])
    setScanFinished(false)
    setScanning(true)

    console.log("🔍 Starting scan...")

    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log("Scan error:", error)
        return
      }

      if (device) {
        console.log("FOUND:", device.name || "(no name)", device.id)

        setDevices((prev) => {
          const exists = prev.find((d) => d.id === device.id)
          return exists ? prev : [...prev, device]
        })
      }
    })

    setTimeout(() => {
      manager.stopDeviceScan()
      setScanning(false)
      setScanFinished(true)
    }, 5000)
  }

  const connectToDevice = async (device: Device) => {
    try {
      console.log("Connecting to:", device.id)
      const connected = await manager.connectToDevice(device.id)
      await connected.discoverAllServicesAndCharacteristics()

      setConnectedDevice(connected)
      console.log("Connected to:", connected.name)

      // Start monitoring RSSI for distance calculation
      const startRSSIMonitoring = () => {
        connected
          .readRSSI()
          .then((deviceWithRSSI) => {
            const rssi = deviceWithRSSI.rssi || -100
            const dist = calculateDistance(rssi)
            setDistance(dist)
            console.log(`RSSI: ${rssi} dBm, Distance: ~${dist}m`)
          })
          .catch((error) => {
            console.log("RSSI read error:", error)
          })
      }

      // Read RSSI immediately
      startRSSIMonitoring()

      // Set up interval to read RSSI every 2 seconds
      rssiIntervalRef.current = setInterval(startRSSIMonitoring, 2000) as any
    } catch (err) {
      console.log("Connection error:", err)
    }
  }

  const disconnect = async () => {
    // Clear the RSSI monitoring interval first
    if (rssiIntervalRef.current) {
      clearInterval(rssiIntervalRef.current)
      rssiIntervalRef.current = null
    }
    
    // Properly disconnect from the BLE device
    if (connectedDevice) {
      try {
        await connectedDevice.cancelConnection()
        console.log("Disconnected from device")
      } catch (error) {
        console.log("Disconnect error:", error)
      }
    }
    
    setConnectedDevice(null)
    setDistance(null)
    scan() // restart scan
  }

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  const renderDeviceList = () => (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={[styles.scanButton, scanning && styles.scanButtonDisabled]}
        onPress={scan}
        disabled={scanning}
      >
        <Text style={styles.scanButtonText}>
          {scanning ? "🔍 Scanning..." : "🔍 Scan for Devices"}
        </Text>
      </TouchableOpacity>

      {scanFinished && devices.length === 0 && (
        <Text style={styles.noDevicesText}>No devices found 😕</Text>
      )}

      <FlatList
        style={styles.deviceList}
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.deviceItem}>
            <View style={styles.deviceInfo}>
              <Text style={styles.deviceName}>
                {item.name || "Unknown Device"}
              </Text>
              <Text style={styles.deviceId}>{item.id}</Text>
            </View>

            <TouchableOpacity
              style={styles.connectButton}
              onPress={() => connectToDevice(item)}
            >
              <Text style={styles.connectButtonText}>Connect</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  )

  const renderDistanceView = () => (
    <View style={{ flex: 1 }}>
      <Text style={styles.headerText}>
        🔗 Connected to: {connectedDevice?.name || connectedDevice?.id}
      </Text>

      <TouchableOpacity style={styles.disconnectBtn} onPress={disconnect}>
        <Text style={{ color: "white", fontWeight: "bold" }}>
          Disconnect & Scan Again
        </Text>
      </TouchableOpacity>

      {distance !== null && (
        <View style={styles.distanceContainer}>
          <Text style={styles.distanceLabel}>Distance</Text>
          <Text style={styles.distanceValue}>{distance}m</Text>
          <Text style={styles.distanceSubtext}>📡 Estimated distance</Text>
        </View>
      )}

      {distance === null && (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>📡 Calculating distance...</Text>
        </View>
      )}
    </View>
  )

  return (
    <View style={styles.container}>
      {!connectedDevice ? renderDeviceList() : renderDistanceView()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#f5f5f5",
  },

  // Scan button
  scanButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
  },
  scanButtonDisabled: { backgroundColor: "#A0A0A0" },
  scanButtonText: { color: "white", fontSize: 18, fontWeight: "bold" },

  noDevicesText: { marginTop: 20, fontSize: 16, textAlign: "center" },

  // Device list
  deviceList: { marginTop: 20 },
  deviceItem: {
    backgroundColor: "white",
    padding: 15,
    marginVertical: 8,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  deviceInfo: { flex: 1 },
  deviceName: { fontSize: 16, fontWeight: "600" },
  deviceId: { fontSize: 12, color: "#666" },

  connectButton: {
    backgroundColor: "#34C759",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  connectButtonText: { color: "white", fontWeight: "600" },

  // Connected
  headerText: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },

  disconnectBtn: {
    backgroundColor: "#FF3B30",
    padding: 12,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 10,
  },

  // Distance Display
  distanceContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 30,
    borderRadius: 20,
    paddingVertical: 50,
  },
  distanceLabel: {
    fontSize: 24,
    color: "#666",
    fontWeight: "500",
    marginBottom: 20,
  },
  distanceValue: {
    fontSize: 96,
    fontWeight: "bold",
    color: "#007AFF",
    textAlign: "center",
  },
  distanceSubtext: {
    fontSize: 18,
    color: "#888",
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 20,
    color: "#666",
  },
})
