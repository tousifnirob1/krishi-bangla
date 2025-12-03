// app/logic/thresholds.js
// Default threshold band (placeholder). Replace later with your dataset.
export const THRESHOLDS = {
  ph:         { low: 5.5,  high: 7.5,  unit: ''     }, // optimal ~ 5.5–7.5
  moisture:   { low: 40,   high: 70,   unit: '%'    }, // %
  temp:       { low: 18,   high: 34,   unit: '° C'  }, // Celsius
  nitrogen:   { low: 50,   high: 100,  unit: 'ppm'  },
  phosphorus: { low: 40,   high: 90,   unit: 'ppm'  },
  potassium:  { low: 50,   high: 100,  unit: 'ppm'  },
};

// Bangla messages (warning + advice). These mirror your prompt’s table.
// You can override any entry later from local JSON/DB. :contentReference[oaicite:1]{index=1}
export const MESSAGES = {
  ph: {
    low:  { title: 'pH কম',    advice: 'মাটির pH স্তর খুব কম। চুন প্রয়োগ করুন বা জৈব সার ব্যবহার করুন।' },
    high: { title: 'pH বেশি',   advice: 'মাটির pH স্তর খুব বেশি। গন্ধক বা জৈব পদার্থ ব্যবহার করুন।' },
  },
  moisture: {
    low:  { title: 'আর্দ্রতা কম',  advice: 'মাটিতে আর্দ্রতার ঘাটতি রয়েছে। সেচ দিন।' },
    high: { title: 'আর্দ্রতা বেশি', advice: 'মাটিতে অতিরিক্ত আর্দ্রতা রয়েছে। অতিরিক্ত জল নিষ্কাশন করুন।' },
  },
  temp: {
    low:  { title: 'তাপমাত্রা কম',  advice: 'তাপমাত্রা খুব কম। গ্রীনহাউস/ঢেকে রাখুন বা উষ্ণতার ব্যবস্থা করুন।' },
    high: { title: 'তাপমাত্রা বেশি', advice: 'তাপমাত্রা খুব বেশি। ছায়া ও সেচের ব্যবস্থা করুন।' },
  },
  nitrogen: {
    low:  { title: 'নাইট্রোজেন কম',  advice: 'নাইট্রোজেনের ঘাটতি রয়েছে। ইউরিয়া বা জৈব সার প্রয়োগ করুন।' },
    high: { title: 'নাইট্রোজেন বেশি', advice: 'নাইট্রোজেন মাত্রা বেশি। নাইট্রোজেন সার কমান, কার্বনসমৃদ্ধ জৈব পদার্থ মেশান।' },
  },
  phosphorus: {
    low:  { title: 'ফসফরাস কম',  advice: 'ফসফরাসের ঘাটতি রয়েছে। TSP বা DAP সার প্রয়োগ করুন।' },
    high: { title: 'ফসফরাস বেশি', advice: 'ফসফরাস মাত্রা বেশি। ফসফরাস সার বন্ধ/কমান এবং জৈব সার ব্যবহার করুন।' },
  },
  potassium: {
    low:  { title: 'পটাশিয়াম কম',  advice: 'পটাশিয়ামের ঘাটতি রয়েছে। MOP বা জৈব সার প্রয়োগ করুন।' },
    high: { title: 'পটাশিয়াম বেশি', advice: 'পটাশিয়ামের মাত্রা বেশি। পটাশ সার কমান এবং জৈব পদার্থ যোগ করুন।' },
  },
  allNormal: {
    title: 'সব স্বাভাবিক',
    advice: 'মাটির অবস্থা ভালো আছে। এই অবস্থায় ফসল ভালোভাবে বেড়ে উঠবে।',
  },
};
