// app/components/Footer.jsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const palette = {
  bg: '#FFFFFF',
  border: '#E5EFF0',
  active: '#2E7D32',     // green pill
  inactive: '#94A3B8',   // gray icons
  text: '#0F172A',
};

function TabItem({ active, label, activeIconName, inactiveIconName, onPress }) {
  if (active) {
    return (
      <TouchableOpacity style={styles.activePill} onPress={onPress} activeOpacity={0.9}>
        <View style={styles.activeIconWrap}>
          <Ionicons name={activeIconName} size={18} color="#fff" />
        </View>
        <Text style={styles.activeText}>{label}</Text>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity style={styles.inactiveBtn} onPress={onPress} activeOpacity={0.85}>
      <Ionicons name={inactiveIconName} size={22} color={palette.inactive} />
    </TouchableOpacity>
  );
}

export default function Footer({ active = 'dashboard', onChange = () => {} }) {
  return (
    <View style={styles.container}>
      <TabItem
        active={active === 'dashboard'}
        label="ড্যাশবোর্ড"
        activeIconName="home-outline"
        inactiveIconName="home-outline"
        onPress={() => onChange('dashboard')}
      />
      <TabItem
        active={active === 'chart'}
        label="ডেটা চার্ট"
        activeIconName="calendar-outline"
        inactiveIconName="calendar-outline"
        onPress={() => onChange('chart')}
      />
      <TabItem
        active={active === 'guide'}
        label="নির্দেশিকা"
        activeIconName="book-outline"        // ✅ guideline-type icon
        inactiveIconName="book-outline"      // was settings-outline
        onPress={() => onChange('guide')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: palette.bg,
    borderColor: palette.border,
    borderWidth: 1,
    borderRadius: 22,              // ⬆️ slightly bigger radius
    paddingHorizontal: 18,         // ⬆️ a bit wider
    paddingVertical: 12,           // ⬆️ a bit taller
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 3 },
      },
      android: { elevation: 4 },
    }),
  },
  activePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.active,
    borderRadius: 999,
    paddingHorizontal: 14,         // ⬆️ slightly bigger pill
    paddingVertical: 8,
  },
  activeIconWrap: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  activeText: {
    fontFamily: 'HindSiliguri_600SemiBold',
    fontSize: 14.5,                // ⬆️ bigger label
    color: '#fff',
  },
  inactiveBtn: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
});
