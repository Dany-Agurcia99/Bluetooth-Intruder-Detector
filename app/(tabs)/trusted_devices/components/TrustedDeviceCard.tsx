import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import React from "react"
import { COLORS } from "@/constants/colors"
import Device from "@/types/device"

type TrustedDeviceCardProps = {
  device: Device
  onRemove?: (deviceId: string) => void
}

const TrustedDeviceCard = ({ device, onRemove }: TrustedDeviceCardProps) => {
  const handleRemove = () => {
    if (onRemove) {
      onRemove(device.id)
    }
  }

  const getDateAdded = () => {
    // Simular fecha de cuando se agregó a trusted
    return new Date().toLocaleDateString()
  }

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.deviceInfo}>
          <Text style={styles.deviceName}>{device.name}</Text>
        </View>
      </View>

      <Text style={styles.deviceId}>ID: {device.id}</Text>

      <View style={styles.bottomInfo}>
        <Text style={styles.dateLabel}>Added: {getDateAdded()}</Text>
        <TouchableOpacity style={styles.untrustButton} onPress={handleRemove}>
          <Text style={styles.untrustButtonText}>Untrust</Text>
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
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50", // Verde para indicar trusted
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    marginBottom: 8,
  },
  deviceInfo: {
    flex: 1,
  },
  deviceName: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.lightText,
    marginBottom: 4,
  },
  trustedBadge: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  trustedText: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
  },
  untrustButton: {
    borderWidth: 1,
    borderColor: "#E53935",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  untrustButtonText: {
    color: "#E53935",
    fontSize: 14,
    fontWeight: "600",
  },
  deviceId: {
    fontSize: 14,
    color: COLORS.gray || "#666",
    fontFamily: "monospace",
    marginVertical: 18,
    backgroundColor: "#F5F5F5",
    padding: 8,
    borderRadius: 6,
  },
  bottomInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  dateLabel: {
    fontSize: 14,
    color: COLORS.gray || "#666",
  },
  statusIndicator: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4CAF50",
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    color: "#4CAF50",
    fontWeight: "500",
  },
})

export default TrustedDeviceCard
