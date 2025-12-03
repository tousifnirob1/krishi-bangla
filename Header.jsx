// app/components/Header.jsx
import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const palette = {
  text: '#0F172A',
  subtext: '#64748B',
  accent: '#2E7D32',
};

export default function Header({
  title = 'কৃষি বাংলা',
  subtitle = 'একটি কৃষি বিশেষক',
  onRefresh,           // <-- new prop
  refreshing = false,  // <-- optional spinner state
}) {
  // simple spin for the refresh icon
  const spinAnim = useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    if (refreshing) {
      Animated.loop(
        Animated.timing(spinAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    } else {
      spinAnim.stopAnimation();
      spinAnim.setValue(0);
    }
  }, [refreshing, spinAnim]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.headerRow}>
      <View style={styles.leftWrap}>
        <View style={styles.logo}>
          <MaterialCommunityIcons name="sprout" size={22} color={palette.accent} />
        </View>
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>

      <TouchableOpacity
        accessibilityLabel="Refresh sensor values"
        onPress={onRefresh}
        activeOpacity={0.85}
        style={styles.refreshBtn}
      >
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          <MaterialCommunityIcons
            name="refresh"
            size={20}
            color="#0F5132"
          />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    justifyContent: 'space-between',
  },
  leftWrap: { flexDirection: 'row', alignItems: 'center', flexShrink: 1 },
  logo: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: '#E6F4EA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'HindSiliguri_700Bold',
    fontSize: 22,
    color: palette.text,
    lineHeight: 26,
  },
  subtitle: {
    fontFamily: 'HindSiliguri_400Regular',
    fontSize: 13,
    color: palette.subtext,
    marginTop: 2,
  },
  refreshBtn: {
    backgroundColor: '#DFF5E3',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#BEE3C4',
  },
});
