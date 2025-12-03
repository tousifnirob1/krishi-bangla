// app/logic/iconTags.js

// Detect a semantic icon tag from a Bangla crop name.
// Return a string like 'rice' | 'wheat' | 'corn' | 'potato' | 'tomato' | 'eggplant' | ...
export function iconTagForBanglaName(name = '') {
  const n = String(name).toLowerCase();

  // cereals / grains
  if (n.includes('ধান') || n.includes('বোরো') || n.includes('আমন') || n.includes('আউশ')) return 'rice';
  if (n.includes('গম')) return 'wheat';
  if (n.includes('ভুট্টা') || n.includes('মেইজ')) return 'corn';
  if (n.includes('জোয়ার') || n.includes('জওয়ার')) return 'sorghum';
  if (n.includes('বার্লি') || n.includes('যব')) return 'barley';
  if (n.includes('পাট')) return 'jute';

  // tubers / roots
  if (n.includes('আলু')) return 'potato';
  if (n.includes('মিষ্টি আলু')) return 'sweet-potato';
  if (n.includes('কচু')) return 'taro';

  // vegetables
  if (n.includes('টমেটো')) return 'tomato';
  if (n.includes('বেগুন')) return 'eggplant';
  if (n.includes('মরিচ')) return 'chili';
  if (n.includes('পেঁয়াজ') || n.includes('পেঁয়াজ')) return 'onion';
  if (n.includes('রসুন')) return 'garlic';
  if (n.includes('ঢেঁড়স') || n.includes('ঢেঁড়স') || n.includes('ভেন্ডি') || n.includes('ভেন্ডা')) return 'okra';
  if (n.includes('কপি') || n.includes('বাঁধাকপি')) return 'cabbage';
  if (n.includes('ফুলকপি')) return 'cauliflower';
  if (n.includes('শসা')) return 'cucumber';
  if (n.includes('কুমড়া') || n.includes('কুমড়া')) return 'pumpkin';

  // pulses / oilseeds
  if (n.includes('মসুর')) return 'lentil';
  if (n.includes('খেসারি')) return 'grass-pea';
  if (n.includes('ছোলা')) return 'chickpea';
  if (n.includes('মুগ') || n.includes('মুগডাল')) return 'mung';
  if (n.includes('মাসকলাই')) return 'urd';
  if (n.includes('সরিষা')) return 'mustard';
  if (n.includes('তিল')) return 'sesame';
  if (n.includes('চিনাবাদাম') || n.includes('বাদাম')) return 'peanut';
  if (n.includes('সূর্যমুখী')) return 'sunflower';

  // fruits
  if (n.includes('আম')) return 'mango';
  if (n.includes('কলা')) return 'banana';
  if (n.includes('পেঁপে')) return 'papaya';
  if (n.includes('তরমুজ')) return 'watermelon';

  // default
  return 'leaf';
}

// Return a **new** array where each crop has an `icon` tag.
// Does not mutate the original dataset.
export function attachIconsToKB(knowledgeBase = []) {
  return knowledgeBase.map((c) => ({
    ...c,
    icon: c.icon || iconTagForBanglaName(c.name),
  }));
}
