// app/components/MetricCard.jsx
import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

const palette = {
  cardBg: '#FFFFFF',
  border: '#E5EFF0',
  text: '#0F172A',
  subtext: '#64748B',
  unit: '#94A3B8', // ash gray for unit text

  okBg: '#E8F5E9', okText: '#1B5E20',
  normalBg: '#E7F5FF', normalText: '#0C4A6E',
  highBg: '#FFE8E8', highText: '#B91C1C',
  lowBg: '#FFF1E6', lowText: '#C2410C',
};

// Convert digits to Bangla
const toBn = (v) => String(v).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[d]);

// Split value + unit
const splitValueAndUnit = (metric, value) => {
  const bn = toBn(value);
  switch (metric) {
    case 'moisture':
      return { val: bn, unit: '%' };
    case 'temp':
      return { val: bn, unit: '°C' };
    case 'nitrogen':
    case 'phosphorus':
    case 'potassium':
      return { val: bn, unit: 'ppm' };
    default:
      return { val: bn, unit: '' };
  }
};

export default function MetricCard({
  metric = 'ph',
  icon,
  value,
  label,
  pill = { text: 'স্বাভাবিক', tone: 'normal' },
}) {
  const styleMap = {
    ok: { bg: palette.okBg, color: palette.okText },
    normal: { bg: palette.normalBg, color: palette.normalText },
    high: { bg: palette.highBg, color: palette.highText },
    low: { bg: palette.lowBg, color: palette.lowText },
  }[pill?.tone || 'normal'];

  const { val, unit } = splitValueAndUnit(metric, value);

  return (
    <View style={styles.card}>
      {/* top row */}
      <View style={styles.cardTopRow}>
        <View style={styles.cardIcon}>{icon}</View>
        <View style={[styles.pill, { backgroundColor: styleMap.bg }]}>
          <Text style={[styles.pillText, { color: styleMap.color }]}>{pill.text}</Text>
        </View>
      </View>

      {/* value + unit + label */}
      <View style={styles.centerBox}>
        <View style={styles.valueRow}>
          <Text style={styles.cardValue}>{val}</Text>
          {unit ? <Text style={styles.unitText}> {unit}</Text> : null}
        </View>
        <Text style={styles.cardLabel}>{label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '31.5%', // 3 per row
    backgroundColor: palette.cardBg,
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: palette.border,
    minHeight: 128,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
      },
      android: { elevation: 2 },
    }),
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  cardIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E9F5F6',
  },
  pill: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 999,
  },
  pillText: {
    fontFamily: 'HindSiliguri_600SemiBold',
    fontSize: 11.5,
  },
  centerBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 4,
    paddingBottom: 2,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  cardValue: {
    fontFamily: 'HindSiliguri_700Bold',
    fontSize: 26,
    color: palette.text,
  },
  unitText: {
    fontFamily: 'HindSiliguri_600SemiBold',
    fontSize: 16, // smaller than value
    color: palette.unit, // ash color
    marginLeft: 2,
    marginBottom: 3,
  },
  cardLabel: {
    marginTop: 3,
    fontFamily: 'HindSiliguri_600SemiBold',
    fontSize: 14,
    color: palette.subtext,
    textAlign: 'center',
  },
});
