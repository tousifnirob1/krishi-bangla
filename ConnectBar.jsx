// app/components/ConnectBar.jsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const palette = {
  text: '#0F172A',
  accent: '#2E7D32',
  connectBg: '#F0FAF4',
  connectBorder: '#CBEBD6',
};

export default function ConnectBar({
  onPress = () => {},
  text = 'ওয়াই-ফাই সেন্সর থেকে ডেটা নিন',
}) {
  return (
    <TouchableOpacity style={styles.connectBar} activeOpacity={0.85} onPress={onPress}>
      <View style={styles.dot} />
      <Text style={styles.connectText}>{text}</Text>
      {/* 🔁 Changed from bluetooth-outline to wifi-outline */}
      <Ionicons name="wifi-outline" size={22} color={palette.accent} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  connectBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.connectBg,
    borderColor: palette.connectBorder,
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginTop: 4,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.03,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
      },
      android: { elevation: 1 },
    }),
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: palette.accent,
    marginRight: 10,
  },
  connectText: {
    flex: 1,
    fontFamily: 'HindSiliguri_600SemiBold',
    fontSize: 15,
    color: palette.text,
  },
});
