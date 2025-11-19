import { View, Text, StyleSheet } from "react-native"
import React from "react"
import { COLORS } from "@/constants/colors"
import Device from "@/types/device"

type DeviceCardProps = {
  device: Device
}

const DeviceCard = ({ device }: DeviceCardProps) => {
  const getSignalStrength = (rssi: number) => {
    if (rssi > -50) return "Excellent"
    if (rssi > -60) return "Good"
    if (rssi > -70) return "Fair"
    return "Poor"
  }

  const getSignalColor = (rssi: number) => {
    if (rssi > -50) return "#306a32ff" // Green
    if (rssi > -60) return "#e2aa00ff" // Amber
    if (rssi > -70) return "#d85e20ff" // Orange
    return "#F44336" // Red
  }

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.deviceName}>{device.name}</Text>
        <View
          style={[
            styles.signalBadge,
            { backgroundColor: getSignalColor(device.rssi) },
          ]}
        >
          <Text style={styles.signalText}>
            {getSignalStrength(device.rssi)}
          </Text>
        </View>
      </View>

      <Text style={styles.deviceId}>ID: {device.id}</Text>

      <View style={styles.rssiContainer}>
        <Text style={styles.rssiLabel}>Signal Strength:</Text>
        <Text
          style={[styles.rssiValue, { color: getSignalColor(device.rssi) }]}
        >
          {device.rssi} dBm
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.accent || "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.lightText,
    flex: 1,
  },
  signalBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  signalText: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
  },
  deviceId: {
    fontSize: 14,
    color: COLORS.gray || "#666",
    fontFamily: "monospace",
    marginBottom: 8,
  },
  rssiContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rssiLabel: {
    fontSize: 14,
    color: COLORS.lightText,
  },
  rssiValue: {
    fontSize: 14,
    fontWeight: "600",
  },
})

export default DeviceCard
