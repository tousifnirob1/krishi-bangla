// app/components/CropRecommendation.jsx
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { recommendCrops } from '../logic/fuzzyEngine';
import cropKnowledgeBase from '../logic/cropKnowledgeBase';
import { attachIconsToKB } from '../logic/iconTags';

// Bangla digits
const toBn = (v) => String(v).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[d]);

const palette = {
  text: '#0F172A',
  subtext: '#64748B',
  border: '#E5EFF0',
  cardBg: '#FFFFFF',

  good: '#3B82F6',       // blue
  goodBg: '#E8F1FF',
  goodText: '#1E40AF',

  mid: '#F59E0B',        // amber
  midBg: '#FEF3C7',
  midText: '#92400E',

  bad: '#EF4444',        // red
  badBg: '#FEE2E2',
  badText: '#991B1B',
};

// Map icon tag → actual icon component
function iconFromTag(tag) {
  switch (tag) {
    case 'rice':         return <MaterialCommunityIcons name="rice" size={20} color="#1B5E20" />;
    case 'wheat':        return <MaterialCommunityIcons name="wheat" size={20} color="#1B5E20" />;
    case 'corn':         return <MaterialCommunityIcons name="corn" size={20} color="#1B5E20" />;
    case 'barley':       return <MaterialCommunityIcons name="barley" size={20} color="#1B5E20" />;
    case 'sorghum':      return <MaterialCommunityIcons name="grain" size={20} color="#1B5E20" />;
    case 'jute':         return <MaterialCommunityIcons name="string-lights" size={20} color="#1B5E20" />; // placeholder
    case 'potato':       return <MaterialCommunityIcons name="fruit-cherries" size={20} color="#1B5E20" />; // placeholder
    case 'sweet-potato': return <MaterialCommunityIcons name="fruit-cherries" size={20} color="#1B5E20" />;
    case 'taro':         return <MaterialCommunityIcons name="leaf" size={20} color="#1B5E20" />;

    case 'tomato':       return <MaterialCommunityIcons name="food-apple" size={20} color="#1B5E20" />;
    case 'eggplant':     return <MaterialCommunityIcons name="food-apple-outline" size={20} color="#1B5E20" />; // placeholder
    case 'chili':        return <MaterialCommunityIcons name="chili-mild" size={20} color="#1B5E20" />;
    case 'onion':        return <MaterialCommunityIcons name="food-variant" size={20} color="#1B5E20" />;
    case 'garlic':       return <MaterialCommunityIcons name="food-variant" size={20} color="#1B5E20" />;
    case 'okra':         return <MaterialCommunityIcons name="leaf" size={20} color="#1B5E20" />;
    case 'cabbage':      return <MaterialCommunityIcons name="leaf" size={20} color="#1B5E20" />;
    case 'cauliflower':  return <MaterialCommunityIcons name="leaf" size={20} color="#1B5E20" />;
    case 'cucumber':     return <MaterialCommunityIcons name="cactus" size={20} color="#1B5E20" />;
    case 'pumpkin':      return <MaterialCommunityIcons name="pumpkin" size={20} color="#1B5E20" />;

    case 'lentil':       return <MaterialCommunityIcons name="sprout" size={20} color="#1B5E20" />;
    case 'grass-pea':    return <MaterialCommunityIcons name="sprout" size={20} color="#1B5E20" />;
    case 'chickpea':     return <MaterialCommunityIcons name="sprout" size={20} color="#1B5E20" />;
    case 'mung':         return <MaterialCommunityIcons name="sprout" size={20} color="#1B5E20" />;
    case 'urd':          return <MaterialCommunityIcons name="sprout" size={20} color="#1B5E20" />;
    case 'mustard':      return <MaterialCommunityIcons name="flower" size={20} color="#1B5E20" />;
    case 'sesame':       return <MaterialCommunityIcons name="flower" size={20} color="#1B5E20" />;
    case 'peanut':       return <MaterialCommunityIcons name="peanut" size={20} color="#1B5E20" />;
    case 'sunflower':    return <MaterialCommunityIcons name="flower-sunflower" size={20} color="#1B5E20" />;

    case 'mango':        return <MaterialCommunityIcons name="fruit-grapes" size={20} color="#1B5E20" />; // placeholder
    case 'banana':       return <MaterialCommunityIcons name="fruit-pineapple" size={20} color="#1B5E20" />; // placeholder
    case 'papaya':       return <MaterialCommunityIcons name="fruit-pineapple" size={20} color="#1B5E20" />; // placeholder
    case 'watermelon':   return <MaterialCommunityIcons name="watermelon" size={20} color="#1B5E20" />;

    default:             return <Ionicons name="leaf-outline" size={20} color="#1B5E20" />;
  }
}

function Badge({ label }) {
  let bg = '#E8F1FF', color = '#1E40AF';
  if (label === 'মোটামুটি') { bg = '#FEF3C7'; color = '#92400E'; }
  if (label === 'খারাপ')     { bg = '#FEE2E2'; color = '#991B1B'; }
  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <Text style={[styles.badgeText, { color }]}>{label}</Text>
    </View>
  );
}

function Progress({ pct, label }) {
  let bar = '#3B82F6', track = '#E6ECFF';
  if (label === 'মোটামুটি') { bar = '#F59E0B'; track = '#FFF4DB'; }
  if (label === 'খারাপ')     { bar = '#EF4444'; track = '#FADADA'; }
  return (
    <View style={[styles.progressTrack, { backgroundColor: track }]}>
      <View style={[styles.progressBar, { width: `${Math.max(0, Math.min(100, pct))}%`, backgroundColor: bar }]} />
    </View>
  );
}

function Row({ crop }) {
  const pct = Math.round(crop.score * 100);
  return (
    <View style={styles.row}>
      <View style={styles.leftGroup}>
        <View style={styles.thumb}>{iconFromTag(crop.icon)}</View>
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.cropName}>{crop.name}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3 }}>
            <Text style={styles.sublabel}>উপযুক্ততা: </Text>
            <Badge label={crop.label} />
          </View>
        </View>
      </View>

      <View style={styles.rightGroup}>
        <Text style={styles.percentText}>{toBn(pct)}%</Text>
        <Progress pct={pct} label={crop.label} />
      </View>
    </View>
  );
}

export default function CropRecommendation({
  readings,
  topN = 4,
  kb = cropKnowledgeBase,
}) {
  // Enrich the KB with icon tags derived from Bangla names
  const kbWithIcons = useMemo(() => attachIconsToKB(kb), [kb]);
  const results = useMemo(() => recommendCrops(readings, kbWithIcons, topN), [readings, kbWithIcons, topN]);

  return (
    <View style={{ marginTop: 14 }}>
      <View style={styles.titleRow}>
        <View style={styles.titleIcon}>
          <MaterialCommunityIcons name="sprout" size={16} color="#2E7D32" />
        </View>
        <Text style={styles.title}>ফসলের সুপারিশ</Text>
      </View>
      <Text style={styles.subtitle}>বর্তমান মাটির অবস্থার উপর ভিত্তি করে</Text>

      <View style={styles.box}>
        {results.map((c, i) => (
          <View key={c.name + i}>
            {i > 0 && <View style={styles.divider} />}
            <Row crop={c} />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  titleIcon: {
    width: 22, height: 22, borderRadius: 6, backgroundColor: '#E6F4EA',
    alignItems: 'center', justifyContent: 'center', marginRight: 8,
  },
  title: {
    fontFamily: 'HindSiliguri_700Bold',
    fontSize: 16,
    color: '#0F172A',
  },
  subtitle: {
    fontFamily: 'HindSiliguri_400Regular',
    fontSize: 13,
    color: '#64748B',
    marginBottom: 8,
  },
  box: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5EFF0',
    paddingVertical: 6,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, shadowOffset: { width: 0, height: 2 } },
      android: { elevation: 1 },
    }),
  },
  divider: { height: 1, backgroundColor: '#E5EFF0' },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: 'center',
  },
  leftGroup: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  thumb: {
    width: 40, height: 40, borderRadius: 10,
    backgroundColor: '#F2FAF5', alignItems: 'center', justifyContent: 'center',
  },
  cropName: {
    fontFamily: 'HindSiliguri_600SemiBold',
    fontSize: 15,
    color: '#0F172A',
  },
  sublabel: {
    fontFamily: 'HindSiliguri_400Regular',
    fontSize: 12.5,
    color: '#64748B',
  },
  rightGroup: { width: 96, alignItems: 'flex-end' },
  percentText: {
    fontFamily: 'HindSiliguri_700Bold',
    fontSize: 14,
    color: '#0F172A',
    marginBottom: 4,
  },
  progressTrack: {
    width: '100%',
    height: 6,
    borderRadius: 999,
  },
  progressBar: {
    height: 6,
    borderRadius: 999,
  },
  badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 999 },
  badgeText: { fontFamily: 'HindSiliguri_600SemiBold', fontSize: 12 },
});
