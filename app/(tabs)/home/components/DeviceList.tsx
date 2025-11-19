import { View, Text, StyleSheet, FlatList } from "react-native"
import React from "react"
import { COLORS } from "@/constants/colors"
import DeviceCard from "./DeviceCard"
import Device from "@/types/device"

const DeviceList = ({ devices }: { devices: Device[] }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detected Devices ({devices.length})</Text>
      <FlatList
        data={devices}
        renderItem={({ item }) => <DeviceCard device={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.lightText,
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 16,
    gap: 16,
  },
})

export default DeviceList
