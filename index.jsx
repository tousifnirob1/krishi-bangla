// app/index.jsx
import React from 'react';
import { ScrollView, View, StyleSheet, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import {
  useFonts,
  HindSiliguri_400Regular,
  HindSiliguri_600SemiBold,
  HindSiliguri_700Bold,
} from '@expo-google-fonts/hind-siliguri';

// Components
import Header from './components/Header';
import ConnectBar from './components/ConnectBar';
import MetricCard from './components/MetricCard';
import AlertBox from './components/AlertBox';
import CropRecommendation from './components/CropRecommendation';
import Footer from './components/Footer';
import SoilChart from './components/SoilChart';
import Guideline from './components/Guideline';

const palette = { appBg: '#F3F8F5' };
const FOOTER_HEIGHT = 86;

// 👇 CHANGE THIS to your ESP32 address (same network as phone)
const ESP32_BASE_URL = 'http://192.168.4.1'; // e.g. 'http://192.168.1.123'

// derive status pill quickly (simple bands; tweak as you like)
const pillFrom = (metric, v) => {
  switch (metric) {
    case 'ph':
      if (v >= 5.5 && v <= 7.0) return { text: 'সর্বোত্তম', tone: 'ok' };
      if (v >= 4.5 && v <= 8.0) return { text: 'স্বাভাবিক', tone: 'normal' };
      return { text: v > 8 ? 'বেশি' : 'কম', tone: v > 8 ? 'high' : 'low' };
    case 'moisture':
      if (v >= 50 && v <= 75) return { text: 'স্বাভাবিক', tone: 'normal' };
      if (v >= 55 && v <= 70) return { text: 'সর্বোত্তম', tone: 'ok' };
      return { text: v > 75 ? 'বেশি' : 'কম', tone: v > 75 ? 'high' : 'low' };
    case 'temp':
      if (v >= 20 && v <= 32) return { text: 'সর্বোত্তম', tone: 'ok' };
      if (v >= 15 && v <= 36) return { text: 'স্বাভাবিক', tone: 'normal' };
      return { text: v > 36 ? 'বেশি' : 'কম', tone: v > 36 ? 'high' : 'low' };
    default:
      // npk (ppm): loose general band
      if (v >= 40 && v <= 120) return { text: 'সর্বোত্তম', tone: 'ok' };
      if (v >= 30 && v <= 150) return { text: 'স্বাভাবিক', tone: 'normal' };
      return { text: v > 150 ? 'বেশি' : 'কম', tone: v > 150 ? 'high' : 'low' };
  }
};

// build a metrics array from base readings
const makeMetrics = (r) => ([
  {
    id: 'ph',
    metric: 'ph',
    label: 'pH লেভেল',
    value: r.ph,
    pill: pillFrom('ph', r.ph),
    icon: <MaterialCommunityIcons name="beaker-outline" size={26} color="#4AA3A1" />,
  },
  {
    id: 'moisture',
    metric: 'moisture',
    label: 'আর্দ্রতা',
    value: r.moisture,
    pill: pillFrom('moisture', r.moisture),
    icon: <MaterialCommunityIcons name="water-percent" size={26} color="#4AA3A1" />,
  },
  {
    id: 'temp',
    metric: 'temp',
    label: 'তাপমাত্রা',
    value: r.temp,
    pill: pillFrom('temp', r.temp),
    icon: <MaterialCommunityIcons name="thermometer" size={26} color="#4AA3A1" />,
  },
  {
    id: 'nitrogen',
    metric: 'nitrogen',
    label: 'নাইট্রোজেন',
    value: r.nitrogen,
    pill: pillFrom('nitrogen', r.nitrogen),
    icon: <Ionicons name="flask-outline" size={24} color="#4AA3A1" />,
  },
  {
    id: 'phosphorus',
    metric: 'phosphorus',
    label: 'ফসফরাস',
    value: r.phosphorus,
    pill: pillFrom('phosphorus', r.phosphorus),
    icon: <Ionicons name="flask-outline" size={24} color="#4AA3A1" />,
  },
  {
    id: 'potassium',
    metric: 'potassium',
    label: 'পটাশিয়াম',
    value: r.potassium,
    pill: pillFrom('potassium', r.potassium),
    icon: <Ionicons name="flask-outline" size={24} color="#4AA3A1" />,
  },
]);

export default function IndexScreen() {
  const [loaded] = useFonts({
    HindSiliguri_400Regular,
    HindSiliguri_600SemiBold,
    HindSiliguri_700Bold,
  });
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const [refreshing, setRefreshing] = React.useState(false);

  // initial fallback readings (will be replaced by ESP32 values)
  const [readings, setReadings] = React.useState({
    ph: 6.8,
    moisture: 60,
    temp: 28,
    nitrogen: 80,
    phosphorus: 70,
    potassium: 80,
  });

  const [metrics, setMetrics] = React.useState(() => makeMetrics(readings));

  // 🔌 Fetch sensor data from ESP32 over Wi‑Fi
  const doRefresh = React.useCallback(async () => {
    try {
      setRefreshing(true);

      const response = await fetch(`${ESP32_BASE_URL}/sensor`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const json = await response.json();

      const next = {
        ph: Number(json.ph),
        moisture: Number(json.moisture),
        temp: Number(json.temp),
        nitrogen: Number(json.nitrogen),
        phosphorus: Number(json.phosphorus),
        potassium: Number(json.potassium),
      };

      // Basic sanity check – keep old values if everything is NaN
      const values = Object.values(next);
      if (values.every((v) => Number.isNaN(v))) {
        throw new Error('Invalid sensor payload');
      }

      setReadings(next);
      setMetrics(makeMetrics(next));
    } catch (err) {
      console.warn('Error fetching sensor data from ESP32:', err);
      Alert.alert(
        'সেন্সর ত্রুটি',
        'ESP32 সেন্সর থেকে ডেটা পাওয়া যায়নি। নিশ্চিত করুন যে মোবাইল আর ESP32 একই Wi‑Fi-তে আছে এবং ESP32 চালু আছে।'
      );
    } finally {
      setRefreshing(false);
    }
  }, []);

  // Auto‑fetch once when fonts are loaded
  React.useEffect(() => {
    if (loaded) {
      doRefresh();
    }
  }, [loaded, doRefresh]);

  if (!loaded) return null;

  const renderDashboard = () => (
    <>
      <ConnectBar
        onPress={doRefresh}
        text="ওয়াই-ফাই সেন্সর থেকে ডেটা নিন"
      />
      <View style={styles.grid}>
        {metrics.map((m) => (
          <MetricCard
            key={m.id}
            metric={m.metric}
            icon={m.icon}
            value={m.value}
            label={m.label}
            pill={m.pill}
          />
        ))}
      </View>
      <AlertBox readings={readings} maxMessages={3} />
      <CropRecommendation readings={readings} topN={4} />
    </>
  );

  const renderChart = () => (
    <SoilChart readings={{ ph: readings.ph, moisture: readings.moisture, temp: readings.temp }} />
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right', 'bottom']}>
      <StatusBar style="dark" backgroundColor={palette.appBg} />
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={[
            styles.container,
            { paddingBottom: FOOTER_HEIGHT + 36 + insets.bottom },
          ]}
        >
          {/* HEADER with refresh */}
          <Header refreshing={refreshing} onRefresh={doRefresh} />

          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'chart' && renderChart()}
          {activeTab === 'guide' && <Guideline />}
        </ScrollView>

        {/* Fixed Footer with dock background */}
        <View style={[styles.footerDock, { paddingBottom: 12 + insets.bottom }]}>
          <View style={styles.footerInner}>
            <Footer active={activeTab} onChange={setActiveTab} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: palette.appBg },
  container: { padding: 16 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  footerDock: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: palette.appBg,
    paddingTop: 10,
    zIndex: 10,
  },
  footerInner: { marginHorizontal: 16 },
});
