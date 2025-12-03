// app/components/Guideline.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const palette = { text: '#0F172A', subtext: '#64748B', border: '#E5EFF0' };

const Step = ({ n, icon, title, children, accent = '#10B981' }) => (
  <View style={styles.stepCard}>
    <View style={[styles.stepBadge, { backgroundColor: accent }]}>
      <Text style={styles.stepBadgeText}>{n}</Text>
    </View>
    <View style={{ marginLeft: 10, flex: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
        <View style={styles.stepIcon}>{icon}</View>
        <Text style={styles.stepTitle}>{title}</Text>
      </View>
      <Text style={styles.stepText}>{children}</Text>
    </View>
  </View>
);

const Tip = ({ icon, children }) => (
  <View style={styles.tipRow}>
    <View style={styles.tipIcon}>{icon}</View>
    <Text style={styles.tipText}>{children}</Text>
  </View>
);

export default function Guideline() {
  return (
    <View>
      {/* Intro card */}
      <View style={styles.guideIntro}>
        <Text style={styles.guideHeadline}>নির্দেশিকা</Text>
        <Text style={styles.guideSubtext}>
          প্রথমবার থেকে নিয়মিত ব্যবহারের প্রতিটি ধাপ এখানে দেয়া হল—সেন্সর সংযোগ, ড্যাশবোর্ড পড়া, সতর্কবার্তা বোঝা,
          ফসলের সুপারিশ দেখা এবং ডেটা চার্ট বিশ্লেষণ—সব এক জায়গায়।
        </Text>
      </View>

      {/* Steps */}
      <Step
        n="১"
        icon={<Ionicons name="bluetooth-outline" size={18} color="#10B981" />}
        title="সেন্সর সংযুক্ত করুন"
        accent="#10B981"
      >
        হোমপেজের উপরের <Text style={styles.bold}>“সেন্সর সংযুক্ত করুন”</Text> বোতাম চাপুন → ব্লুটুথ চালু করুন →
        আপনার সেন্সর ডিভাইস সিলেক্ট করুন। সংযুক্ত হলে ড্যাশবোর্ডে pH, আর্দ্রতা, তাপমাত্রা ও NPK মান আপডেট হবে।
      </Step>

      <Step
        n="২"
        icon={<MaterialCommunityIcons name="view-dashboard-outline" size={18} color="#2563EB" />}
        title="ড্যাশবোর্ড বোঝা"
        accent="#2563EB"
      >
        প্রতিটি কার্ডে বর্তমান মান দেখাবে—নিচে ইউনিট (pH, %, °C, ppm)। ডানদিকে স্ট্যাটাস পিল
        (<Text style={styles.bold}>সর্বোত্তম/স্বাভাবিক/বেশি/কম</Text>) দেখে অবস্থা বুঝুন।
      </Step>

      <Step
        n="৩"
        icon={<Ionicons name="alert-circle-outline" size={18} color="#F59E0B" />}
        title="সতর্কবার্তা ও পরামর্শ"
        accent="#F59E0B"
      >
        সেন্সর মান সীমার বাইরে গেলে এখানে শীর্ষ ২–৩টি বার্তা দেখাবে। বার্তাগুলো সমস্যার কারণ ও করণীয় দেয়—
        যেমন pH বেশি হলে গন্ধক/জৈব পদার্থ ব্যবহারের পরামর্শ।
      </Step>

      <Step
        n="৪"
        icon={<MaterialCommunityIcons name="sprout" size={18} color="#059669" />}
        title="ফসলের সুপারিশ"
        accent="#059669"
      >
        আপনার মাটির বর্তমান অবস্থার সাথে সবচেয়ে কাছাকাছি যে ফসল, তা উপরে দেখাবে। ডানদিকে %
        হলো উপযুক্ততার স্কোর; <Text style={styles.bold}>ভাল</Text>, <Text style={styles.bold}>মোটামুটি</Text>,
        <Text style={styles.bold}> খারাপ</Text> ব্যাজ দেখে সিদ্ধান্ত নিন।
      </Step>

      <Step
        n="৫"
        icon={<MaterialCommunityIcons name="chart-line" size={18} color="#10B981" />}
        title="ডেটা চার্ট"
        accent="#10B981"
      >
        নিচের ট্যাব থেকে <Text style={styles.bold}>ডেটা চার্ট</Text> খুলুন। উপরে ২৪ ঘণ্টার গড় দেখাবে;
        চার্টে চলতি মাসের ৬টি সময়বিন্দুতে গড় মান থাকে। ট্যাব বদলে pH/আর্দ্রতা/তাপমাত্রা দেখুন।
      </Step>

      <Step
        n="৬"
        icon={<Ionicons name="book-outline" size={18} color="#7C3AED" />}
        title="ভাল প্র্যাকটিস"
        accent="#7C3AED"
      >
        নমুনা নেওয়ার সময় সেন্সর পরিষ্কার রাখুন, মাটিতে একাধিক জায়গায় মেপে গড় নিন, এবং মাপার সময় গভীরতা
        এক রাখুন—তাহলেই ফল আরো নির্ভুল হবে।
      </Step>

      {/* Tips */}
      <View style={styles.tipsCard}>
        <Text style={styles.tipsTitle}>কিছু টিপস</Text>
        <Tip icon={<Ionicons name="sync-outline" size={16} color="#0EA5E9" />}>
          সেন্সর নতুন করে ক্যালিব্রেট করলে অ্যাপে রিফ্রেশ দিন—গ্রাফ ও সুপারিশ দ্রুত আপডেট হবে।
        </Tip>
        <Tip icon={<Ionicons name="time-outline" size={16} color="#0EA5E9" />}>
          প্রতিদিন একই সময়ে মাপলে চার্টে ট্রেন্ড স্পষ্ট বোঝা যায়।
        </Tip>
        <Tip icon={<Ionicons name="document-text-outline" size={16} color="#0EA5E9" />}>
          ফসল বাছাইয়ের আগে সুপারিশের % স্কোর ও ব্যাজ অবশ্যই দেখুন।
        </Tip>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  guideIntro: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5EFF0',
    padding: 12,
    marginBottom: 12,
  },
  guideHeadline: {
    fontFamily: 'HindSiliguri_700Bold',
    fontSize: 16,
    color: '#0F172A',
    marginBottom: 4,
  },
  guideSubtext: {
    fontFamily: 'HindSiliguri_400Regular',
    fontSize: 13,
    color: '#64748B',
    lineHeight: 20,
  },

  stepCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5EFF0',
    padding: 12,
    marginBottom: 10,
  },
  stepBadge: {
    width: 26, height: 26, borderRadius: 13,
    alignItems: 'center', justifyContent: 'center',
  },
  stepBadgeText: {
    fontFamily: 'HindSiliguri_700Bold',
    fontSize: 13,
    color: '#FFFFFF',
  },
  stepIcon: {
    width: 22, height: 22, borderRadius: 6,
    backgroundColor: '#ECFDF5',
    alignItems: 'center', justifyContent: 'center',
    marginRight: 8,
  },
  stepTitle: {
    fontFamily: 'HindSiliguri_700Bold',
    fontSize: 15,
    color: '#0F172A',
  },
  stepText: {
    fontFamily: 'HindSiliguri_400Regular',
    fontSize: 13,
    color: '#64748B',
    lineHeight: 20,
  },
  bold: { fontFamily: 'HindSiliguri_600SemiBold', color: '#0F172A' },

  tipsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5EFF0',
    padding: 12,
    marginTop: 4,
  },
  tipsTitle: {
    fontFamily: 'HindSiliguri_700Bold',
    fontSize: 14,
    color: '#0F172A',
    marginBottom: 6,
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  tipIcon: {
    width: 20, height: 20, borderRadius: 10,
    backgroundColor: '#E0F2FE',
    alignItems: 'center', justifyContent: 'center',
    marginRight: 8,
  },
  tipText: {
    flex: 1,
    fontFamily: 'HindSiliguri_400Regular',
    fontSize: 13,
    color: '#64748B',
    lineHeight: 20,
  },
});
