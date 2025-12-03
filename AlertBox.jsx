// app/components/AlertBox.jsx
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THRESHOLDS, MESSAGES } from '../logic/thresholds';

// Bangla digits
const toBn = (v) => String(v).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[d]);

// Classify a single metric against thresholds -> low | normal | high + severity score
function classify(metric, value, t) {
  if (value == null || Number.isNaN(+value)) return { state: 'normal', severity: 0 };
  const low = t.low, high = t.high;
  const width = Math.max(1, (high - low)); // avoid /0
  if (value < low)  return { state: 'low',  severity: (low - value) / width };
  if (value > high) return { state: 'high', severity: (value - high) / width };
  return { state: 'normal', severity: 0 };
}

// Rank issues by severity & return up to maxMessages
function makeMessages(readings, limits, texts, maxMessages) {
  const order = ['ph', 'moisture', 'temp', 'nitrogen', 'phosphorus', 'potassium'];
  const issues = [];

  order.forEach((m) => {
    const t = limits[m];
    const v = readings?.[m];
    const c = classify(m, v, t);
    if (c.state !== 'normal') {
      const msg = texts[m][c.state];
      issues.push({
        key: m + '-' + c.state,
        icon: 'warning-outline',
        title: msg.title,
        advice: msg.advice,
        severity: c.severity,
        current: { value: v, unit: t.unit || '' },
      });
    }
  });

  if (issues.length === 0) {
    // Everything normal -> single info message
    return [{
      key: 'all-normal',
      icon: 'checkmark-circle-outline',
      title: texts.allNormal.title,
      advice: texts.allNormal.advice,
      severity: 0,
    }];
  }

  issues.sort((a, b) => b.severity - a.severity);
  return issues.slice(0, Math.min(maxMessages, 3)); // never more than 3
}

export default function AlertBox({
  readings = { ph: 7.2, moisture: 68.1, temp: 28, nitrogen: 113, phosphorus: 62, potassium: 30 },
  thresholds = THRESHOLDS,
  messages = MESSAGES,
  maxMessages = 2, // show 2 by default (pass 3 if you want three)
  showTitle = true,
}) {
  const items = useMemo(
    () => makeMessages(readings, thresholds, messages, maxMessages),
    [readings, thresholds, messages, maxMessages]
  );

  return (
    <View style={{ marginTop: 8 }}>
      {showTitle && <Text style={styles.sectionTitle}>সতর্কবার্তা ও পরামর্শ</Text>}
      <View style={styles.box}>
        {items.map((it, idx) => (
          <View key={it.key} style={[styles.row, idx > 0 && styles.rowDivider]}>
            <Ionicons
              name={it.icon}
              size={18}
              color={it.icon === 'warning-outline' ? '#F59E0B' : '#22C55E'}
              style={{ marginRight: 8, marginTop: 2 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.rowTitle}>{it.title}</Text>
              <Text style={styles.rowAdvice}>{it.advice}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const palette = {
  border: '#E5EFF0',
  text: '#0F172A',
  subtext: '#64748B',
  cardBg: '#FFFFFF',
};

const styles = StyleSheet.create({
  sectionTitle: {
    marginBottom: 8,
    fontFamily: 'HindSiliguri_700Bold',
    fontSize: 16,
    color: palette.text,
  },
  box: {
    backgroundColor: palette.cardBg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: palette.border,
    paddingVertical: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
      },
      android: { elevation: 1 },
    }),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  rowDivider: {
    borderTopWidth: 1,
    borderTopColor: palette.border,
  },
  rowTitle: {
    fontFamily: 'HindSiliguri_600SemiBold',
    fontSize: 14,
    color: palette.text,
    marginBottom: 2,
  },
  rowAdvice: {
    fontFamily: 'HindSiliguri_400Regular',
    fontSize: 13,
    color: palette.subtext,
    lineHeight: 19,
  },
});
