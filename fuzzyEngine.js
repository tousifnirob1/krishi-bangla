// app/logic/fuzzyEngine.js

// Triangular-style closeness to a target range.
// If value is inside [min,max] => 1
// If outside, linearly decays; 1 range-width away => 0
export function membership(value, min, max) {
  const v = Number(value);
  const w = Math.max(1e-6, max - min);
  if (v >= min && v <= max) return 1;
  if (v < min) return Math.max(0, 1 - (min - v) / w);
  return Math.max(0, 1 - (v - max) / w);
}

// Map our internal metric keys to dataset keys
const KEYMAP = {
  ph: 'pH',
  moisture: 'Moisture',
  temp: 'Temperature',
  nitrogen: 'N',
  phosphorus: 'P',
  potassium: 'K',
};

// Suitability label from overall score
export function suitabilityLabel(score) {
  if (score >= 0.7) return 'ভাল';
  if (score >= 0.45) return 'মোটামুটি';
  return 'খারাপ';
}

// Score a single crop against readings
export function scoreCrop(readings, crop) {
  const metrics = Object.keys(KEYMAP);
  const parts = [];

  metrics.forEach((k) => {
    const dsKey = KEYMAP[k];
    const range = crop[dsKey] || (crop.ranges && crop.ranges[dsKey]);
    const val = readings[k];
    if (!range || val == null) return;

    const m = membership(Number(val), Number(range.min), Number(range.max));
    parts.push({ metric: k, score: m, min: range.min, max: range.max, value: val });
  });

  const score =
    parts.length > 0
      ? parts.reduce((s, p) => s + p.score, 0) / parts.length
      : 0;

  return { score, parts, label: suitabilityLabel(score) };
}

// Recommend top-N crops, sorted by score desc
export function recommendCrops(readings, knowledgeBase, topN = 4) {
  const results = (knowledgeBase || []).map((crop) => {
    const r = scoreCrop(readings, crop);
    return {
      name: crop.name || crop.title || 'অজানা',
      icon: crop.icon || null, // optional (if you store an icon key)
      score: r.score,
      label: r.label,
      breakdown: r.parts,
    };
  });

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, topN);
}
