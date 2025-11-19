import { View, Text, StyleSheet, FlatList } from "react-native"
import React from "react"
import { COLORS } from "@/constants/colors"
import DeviceCard from "./DeviceCard"

type Device = {
  id: string
  name: string
  rssi: number
}

const mockDevices: Device[] = [
  { id: "AA:BB:CC:DD:EE:01", name: "iPhone 13", rssi: -45 },
  { id: "AA:BB:CC:DD:EE:02", name: "Samsung Galaxy", rssi: -67 },
  { id: "AA:BB:CC:DD:EE:03", name: "MacBook Pro", rssi: -32 },
  { id: "AA:BB:CC:DD:EE:04", name: "AirPods Pro", rssi: -78 },
  { id: "AA:BB:CC:DD:EE:05", name: "Unknown Device", rssi: -89 },
  { id: "AA:BB:CC:DD:EE:06", name: "Apple Watch", rssi: -56 },
]

const DeviceList = () => {
  const renderDevice = ({ item }: { item: Device }) => {
    return <DeviceCard device={item} />
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detected Devices ({mockDevices.length})</Text>
      <FlatList
        data={mockDevices}
        renderItem={renderDevice}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.lightText,
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
  separator: {
    height: 12,
  },
})

export default DeviceList
