import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import React from "react"
import { COLORS } from "@/constants/colors"
import Device from "@/types/device"

type DeviceCardProps = {
  device: Device
}

const DeviceCard = ({ device }: DeviceCardProps) => {
  const getSignalStrength = (rssi: number) => {
    if (rssi > -50) return "Very Near"
    if (rssi > -60) return "Near"
    if (rssi > -70) return "Far"
    return "Very Far"
  }

  const getSignalColor = (rssi: number, trusted?: boolean) => {
    if (trusted) return "#4CAF50" // Green
    if (rssi > -50) return "#F44336" // Red
    if (rssi > -60) return "#d85e20ff" // Orange
    if (rssi > -70) return "#e2aa00ff" // Yellow
    return "#306a32ff" // Dark Green
  }

  const handleTrust = () => {
    console.log("Trusting " + device.id)
  }

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.deviceName}>{device.name}</Text>
        <View
          style={[
            styles.signalBadge,
            { backgroundColor: getSignalColor(device.rssi, device.trusted) },
          ]}
        >
          <Text style={styles.signalText}>
            {getSignalStrength(device.rssi)}
          </Text>
        </View>
      </View>

      <Text style={styles.deviceId}>ID: {device.id}</Text>

      <View style={styles.bottomRow}>
        <View style={styles.rssiContainer}>
          <Text style={styles.rssiLabel}>Signal Strength:</Text>
          <Text
            style={[styles.rssiValue, { color: getSignalColor(device.rssi) }]}
          >
            {device.rssi} dBm
          </Text>
        </View>

        <TouchableOpacity style={styles.trustButton} onPress={handleTrust}>
          <Text style={styles.trustButtonText}>Trust</Text>
        </TouchableOpacity>
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
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rssiContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rssiLabel: {
    fontSize: 14,
    color: COLORS.lightText,
  },
  rssiValue: {
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 12,
  },
  trustButton: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 8,
  },
  trustButtonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "600",
  },
})

export default DeviceCard
