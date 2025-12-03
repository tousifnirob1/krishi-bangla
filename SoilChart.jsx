// app/components/SoilChart.jsx
import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, Platform, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;
const palette = {
  text: '#0F172A',
  subtext: '#64748B',
  border: '#E5EFF0',
  cardBg: '#FFFFFF',
  chipActiveBg: '#0E9F6E',     // green
  chipInactiveBg: '#E8EEF1',   // gray
  chipInactiveText: '#0F172A',
  line: '#0E8B72',             // teal
};

// Bangla digits + month
const toBn = (v) => String(v).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[d]);
const bnMonths = ['জানুয়ারি','ফেব্রুয়ারি','মার্চ','এপ্রিল','মে','জুন','জুলাই','আগস্ট','সেপ্টেম্বর','অক্টোবর','নভেম্বর','ডিসেম্বর'];
const bnMonthYear = (d = new Date()) => `${bnMonths[d.getMonth()]} ${toBn(d.getFullYear())}`;

// Formatting with units
const fmt = {
  ph: (x) => toBn(x.toFixed(1)),
  moisture: (x) => `${toBn(x.toFixed(1))}%`,
  temp: (x) => `${toBn(x.toFixed(1))}° C`,
};

// tiny helper
const avg = (arr = []) => (arr.length ? arr.reduce((s, v) => s + v, 0) / arr.length : 0);

// Simulate hourly values around a base (for the 24h summary when no history is wired yet)
const simulateHourly = (base, spread, clamp) =>
  Array.from({ length: 24 }, (_, i) => {
    const noise = (Math.sin(i / 3) + Math.cos(i / 5)) * spread * 0.25 + (Math.random() - 0.5) * spread;
    const val = base + noise;
    if (!clamp) return val;
    return Math.max(clamp.min, Math.min(clamp.max, val));
  });

// Build 6 points for current month (days ~ ৫, ১০, ১৫, ২০, ২৫, ৩০)
const buildMonthlySeries = (baseSeries) => {
  // If caller supplied series use it; otherwise shape it around provided bases
  if (baseSeries) return baseSeries;
  return {
    ph:        [6.3, 6.5, 6.9, 7.1, 6.8, 6.6],
    moisture:  [48, 55, 72, 76, 80, 60],
    temp:      [22, 26, 28, 29, 32, 27],
  };
};

function Chip({ active, children, onPress }) {
  return (
    <Text
      onPress={onPress}
      style={[
        styles.chip,
        active ? styles.chipActive : styles.chipInactive,
        active ? { color: '#fff' } : { color: palette.chipInactiveText },
      ]}
    >
      {children}
    </Text>
  );
}

function SummaryCard({ title, value }) {
  return (
    <View style={styles.summaryCard}>
      <Text style={styles.summaryTitle}>{title}</Text>
      <Text style={styles.summaryValue}>{value}</Text>
    </View>
  );
}

export default function SoilChart({
  // If you already have live readings, pass them to anchor the simulation
  readings = { ph: 6.8, moisture: 60, temp: 28 },
  monthlySeries,       // optional: { ph: number[6], moisture: number[6], temp: number[6] }
}) {
  const [tab, setTab] = useState('ph'); // 'ph' | 'moisture' | 'temp'

  // 24h simulated series anchored on current readings
  const hourly = useMemo(() => ({
    ph: simulateHourly(readings.ph ?? 6.8, 0.4, { min: 4.5, max: 8.5 }),
    moisture: simulateHourly(readings.moisture ?? 60, 6, { min: 10, max: 100 }),
    temp: simulateHourly(readings.temp ?? 28, 3, { min: 5, max: 45 }),
  }), [readings]);

  const summary = {
    ph: avg(hourly.ph),
    moisture: avg(hourly.moisture),
    temp: avg(hourly.temp),
  };

  const monthData = useMemo(() => buildMonthlySeries(monthlySeries), [monthlySeries]);
  const selected = monthData[tab] || [];
  const labels = ['৫','১০','১৫','২০','২৫','৩০']; // x-axis in Bangla

  // Configure Y-axis ranges per metric for neat scaling
  const yDomain = {
    ph: { from: 4, to: 9, decimals: 1 },
    moisture: { from: 0, to: 100, decimals: 0 },
    temp: { from: 0, to: 40, decimals: 0 },
  }[tab];

  const chartData = {
    labels,
    datasets: [{ data: selected, color: () => palette.line, strokeWidth: 2 }],
  };

  const chartConfig = {
    backgroundColor: '#FFFFFF',
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    decimalPlaces: yDomain.decimals,
    color: (o) => palette.line,
    labelColor: (o) => '#9CA3AF',
    propsForDots: { r: '2.5' },
    propsForBackgroundLines: { stroke: '#E7EDF0' },
    fillShadowGradientOpacity: 0,
  };

  // Chart width equals container width minus page paddings (16+16)
  const chartWidth = Math.min(screenWidth - 32, 480);

  return (
    <View>
      {/* 24h summary mini-cards */}
      <View style={styles.summaryRow}>
        <SummaryCard title="২৪ ঘণ্টার গড় (pH)"       value={fmt.ph(summary.ph)} />
        <SummaryCard title="২৪ ঘণ্টার গড় (আর্দ্রতা)"  value={fmt.moisture(summary.moisture)} />
        <SummaryCard title="২৪ ঘণ্টার গড় (তাপমাত্রা)" value={fmt.temp(summary.temp)} />
      </View>

      {/* Chart card */}
      <View style={styles.card}>
        <View style={styles.titleRow}>
          <View style={styles.titleIcon}>
            <MaterialCommunityIcons name="chart-line" size={16} color="#E11D48" />
          </View>
          <Text style={styles.title}>ডাটা পর্যবেক্ষণ চার্ট</Text>
        </View>

        <Text style={styles.monthLine}>{bnMonthYear()} — এই মাসের গড়</Text>

        {/* Chips */}
        <View style={styles.chipsRow}>
          <Chip active={tab === 'ph'} onPress={() => setTab('ph')}>pH লেভেল</Chip>
          <Chip active={tab === 'moisture'} onPress={() => setTab('moisture')}>আর্দ্রতা</Chip>
          <Chip active={tab === 'temp'} onPress={() => setTab('temp')}>তাপমাত্রা</Chip>
        </View>

        <LineChart
          data={chartData}
          width={chartWidth}
          height={220}
          yAxisInterval={1}
          withInnerLines
          withOuterLines={false}
          withDots
          withShadow={false}
          fromZero
          segments={5}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
          yAxisSuffix="" // suffix handled in ticks
          yLabelsOffset={8}
          xLabelsOffset={-4}
        />
      </View>

      {/* Explanation */}
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>চার্ট সহায়তা</Text>
        <Text style={styles.infoText}>
          এই চার্টে বর্তমান মাসের {toBn(6)}টি সময়বিন্দু (৫, ১০, ১৫, ২০, ২৫, ৩০) ধরে গড় মান দেখানো হয়েছে।
          উপরের ট্যাব থেকে <Text style={{fontFamily:'HindSiliguri_600SemiBold'}}>pH লেভেল</Text>, <Text style={{fontFamily:'HindSiliguri_600SemiBold'}}>আর্দ্রতা</Text> বা <Text style={{fontFamily:'HindSiliguri_600SemiBold'}}>তাপমাত্রা</Text> বেছে নিন।
          বামদিকের অক্ষ মান নির্দেশ করে এবং নিচের অক্ষ তারিখ নির্দেশ করে।
        </Text>
        <Text style={[styles.infoText, { marginTop: 6 }]}>
          উপরের “২৪ ঘণ্টার গড়” কার্ডগুলোতে আজকের শেষ ২৪ ঘণ্টার গড় মান দেখানো হয়—যা সেন্সরের সাম্প্রতিক আচরণ বুঝতে সাহায্য করে।
          সেন্সর ডেটা সংযুক্ত হলে এগুলো স্বয়ংক্রিয়ভাবে আপডেট হবে।
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryCard: {
    width: '32%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: palette.border,
    paddingVertical: 10,
    paddingHorizontal: 10,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, shadowOffset: { width: 0, height: 2 } },
      android: { elevation: 1 },
    }),
  },
  summaryTitle: {
    fontFamily: 'HindSiliguri_400Regular',
    fontSize: 12.5,
    color: palette.subtext,
    marginBottom: 4,
  },
  summaryValue: {
    fontFamily: 'HindSiliguri_700Bold',
    fontSize: 18,
    color: palette.text,
  },

  card: {
    backgroundColor: palette.cardBg,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: palette.border,
    paddingVertical: 10,
    paddingHorizontal: 12,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } },
      android: { elevation: 1 },
    }),
  },
  titleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  titleIcon: {
    width: 22, height: 22, borderRadius: 6, backgroundColor: '#FFE4E6',
    alignItems: 'center', justifyContent: 'center', marginRight: 8,
  },
  title: {
    fontFamily: 'HindSiliguri_700Bold',
    fontSize: 16,
    color: palette.text,
  },
  monthLine: {
    fontFamily: 'HindSiliguri_400Regular',
    fontSize: 12.5,
    color: palette.subtext,
    marginBottom: 8,
  },
  chipsRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  chip: {
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    fontFamily: 'HindSiliguri_600SemiBold',
    fontSize: 13,
  },
  chipActive: { backgroundColor: palette.chipActiveBg, color: '#fff' },
  chipInactive: { backgroundColor: palette.chipInactiveBg },
  chart: { borderRadius: 12, marginTop: 4 },

  infoBox: {
    marginTop: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: palette.border,
    padding: 12,
  },
  infoTitle: {
    fontFamily: 'HindSiliguri_700Bold',
    fontSize: 14,
    color: palette.text,
    marginBottom: 4,
  },
  infoText: {
    fontFamily: 'HindSiliguri_400Regular',
    fontSize: 13,
    color: palette.subtext,
    lineHeight: 20,
  },
});
