import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import React, { useState } from "react"
import { COLORS } from "@/constants/colors"

const ScanButton = ({
  onScan,
  isScanning,
}: {
  onScan: () => void
  isScanning: boolean
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: isScanning ? COLORS.gray : COLORS.primary },
      ]}
      onPress={onScan}
      disabled={isScanning}
      activeOpacity={0.8}
    >
      <Text style={styles.buttonText}>
        {isScanning ? "Scanning..." : "Scan"}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: COLORS.darkText,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
})

export default ScanButton
