// app/logic/cropKnowledgeBase.js

const cropKnowledgeBase = [
  {
    "name": "ধান (বোরো)",
    "pH": { "min": 5.0, "max": 6.5 },
    "Moisture": { "min": 60, "max": 80 },
    "Temperature": { "min": 20, "max": 30 },
    "N": { "min": 60, "max": 120 },
    "P": { "min": 20, "max": 40 },
    "K": { "min": 40, "max": 80 }
  },
  {
    "name": "ধান (আমান)",
    "pH": { "min": 5.5, "max": 7.0 },
    "Moisture": { "min": 55, "max": 75 },
    "Temperature": { "min": 22, "max": 32 },
    "N": { "min": 50, "max": 110 },
    "P": { "min": 18, "max": 38 },
    "K": { "min": 35, "max": 75 }
  },
  {
    "name": "ধান (আউশ)",
    "pH": { "min": 5.0, "max": 6.8 },
    "Moisture": { "min": 55, "max": 70 },
    "Temperature": { "min": 24, "max": 34 },
    "N": { "min": 55, "max": 115 },
    "P": { "min": 20, "max": 35 },
    "K": { "min": 35, "max": 70 }
  },
  {
    "name": "গম",
    "pH": { "min": 6.0, "max": 7.5 },
    "Moisture": { "min": 50, "max": 65 },
    "Temperature": { "min": 15, "max": 25 },
    "N": { "min": 80, "max": 120 },
    "P": { "min": 25, "max": 40 },
    "K": { "min": 30, "max": 60 }
  },
  {
    "name": "ভুট্টা",
    "pH": { "min": 5.5, "max": 7.5 },
    "Moisture": { "min": 55, "max": 70 },
    "Temperature": { "min": 18, "max": 27 },
    "N": { "min": 100, "max": 150 },
    "P": { "min": 30, "max": 50 },
    "K": { "min": 40, "max": 90 }
  },
  {
    "name": "পাট",
    "pH": { "min": 6.0, "max": 7.5 },
    "Moisture": { "min": 60, "max": 80 },
    "Temperature": { "min": 24, "max": 34 },
    "N": { "min": 40, "max": 80 },
    "P": { "min": 20, "max": 40 },
    "K": { "min": 30, "max": 70 }
  },
  {
    "name": "আখ",
    "pH": { "min": 6.0, "max": 7.5 },
    "Moisture": { "min": 65, "max": 85 },
    "Temperature": { "min": 20, "max": 30 },
    "N": { "min": 150, "max": 250 },
    "P": { "min": 60, "max": 100 },
    "K": { "min": 100, "max": 150 }
  },
  {
    "name": "আলু",
    "pH": { "min": 5.0, "max": 6.5 },
    "Moisture": { "min": 60, "max": 80 },
    "Temperature": { "min": 15, "max": 20 },
    "N": { "min": 100, "max": 150 },
    "P": { "min": 60, "max": 90 },
    "K": { "min": 120, "max": 150 }
  },
  {
    "name": "পেঁয়াজ",
    "pH": { "min": 6.0, "max": 7.5 },
    "Moisture": { "min": 55, "max": 70 },
    "Temperature": { "min": 13, "max": 24 },
    "N": { "min": 80, "max": 120 },
    "P": { "min": 40, "max": 60 },
    "K": { "min": 60, "max": 100 }
  },
  {
    "name": "রসুন",
    "pH": { "min": 6.0, "max": 7.5 },
    "Moisture": { "min": 55, "max": 70 },
    "Temperature": { "min": 12, "max": 20 },
    "N": { "min": 60, "max": 100 },
    "P": { "min": 30, "max": 50 },
    "K": { "min": 40, "max": 80 }
  },
  {
    "name": "মসুর",
    "pH": { "min": 6.0, "max": 7.5 },
    "Moisture": { "min": 40, "max": 60 },
    "Temperature": { "min": 15, "max": 25 },
    "N": { "min": 20, "max": 40 },
    "P": { "min": 15, "max": 30 },
    "K": { "min": 20, "max": 40 }
  },
  {
    "name": "ছোলা",
    "pH": { "min": 6.0, "max": 8.0 },
    "Moisture": { "min": 35, "max": 55 },
    "Temperature": { "min": 10, "max": 25 },
    "N": { "min": 20, "max": 40 },
    "P": { "min": 20, "max": 35 },
    "K": { "min": 20, "max": 40 }
  },
  {
    "name": "সরিষা",
    "pH": { "min": 5.5, "max": 7.0 },
    "Moisture": { "min": 45, "max": 65 },
    "Temperature": { "min": 10, "max": 25 },
    "N": { "min": 60, "max": 100 },
    "P": { "min": 40, "max": 60 },
    "K": { "min": 40, "max": 80 }
  },
  {
    "name": "টমেটো",
    "pH": { "min": 6.0, "max": 7.0 },
    "Moisture": { "min": 60, "max": 80 },
    "Temperature": { "min": 20, "max": 25 },
    "N": { "min": 80, "max": 120 },
    "P": { "min": 50, "max": 80 },
    "K": { "min": 80, "max": 120 }
  },
  {
    "name": "বেগুন",
    "pH": { "min": 5.5, "max": 7.0 },
    "Moisture": { "min": 60, "max": 80 },
    "Temperature": { "min": 22, "max": 30 },
    "N": { "min": 80, "max": 120 },
    "P": { "min": 40, "max": 60 },
    "K": { "min": 70, "max": 100 }
  },
  {
    "name": "বাঁধাকপি",
    "pH": { "min": 6.0, "max": 7.5 },
    "Moisture": { "min": 65, "max": 80 },
    "Temperature": { "min": 15, "max": 20 },
    "N": { "min": 100, "max": 150 },
    "P": { "min": 60, "max": 90 },
    "K": { "min": 80, "max": 120 }
  },
  {
    "name": "ফুলকপি",
    "pH": { "min": 6.0, "max": 7.5 },
    "Moisture": { "min": 65, "max": 80 },
    "Temperature": { "min": 15, "max": 20 },
    "N": { "min": 100, "max": 150 },
    "P": { "min": 60, "max": 90 },
    "K": { "min": 80, "max": 120 }
  },
  {
    "name": "সয়াবিন",
    "pH": { "min": 6.0, "max": 7.5 },
    "Moisture": { "min": 55, "max": 70 },
    "Temperature": { "min": 20, "max": 30 },
    "N": { "min": 20, "max": 40 },
    "P": { "min": 40, "max": 60 },
    "K": { "min": 60, "max": 100 }
  },
  {
    "name": "মটরশুটি",
    "pH": { "min": 6.0, "max": 7.5 },
    "Moisture": { "min": 50, "max": 65 },
    "Temperature": { "min": 13, "max": 20 },
    "N": { "min": 20, "max": 40 },
    "P": { "min": 20, "max": 40 },
    "K": { "min": 30, "max": 50 }
  },
  {
    "name": "তিল",
    "pH": { "min": 5.5, "max": 7.5 },
    "Moisture": { "min": 40, "max": 60 },
    "Temperature": { "min": 20, "max": 30 },
    "N": { "min": 50, "max": 80 },
    "P": { "min": 30, "max": 50 },
    "K": { "min": 30, "max": 60 }
  }
];

export default cropKnowledgeBase;
