export const GENSHIN_THEME = {
  bg: "#0E1015",
  cardBg: "#151820",
  cardBorder: "#272D3B",
  primaryAccent: "#D4A359", // Warm Gold
  secondaryAccent: "#C7B8E5", // Celestial Violet
  textMain: "#F1F1F1",
  textMuted: "#9BA2AF",
};

export interface GenshinServiceItem {
  id: string;
  category:
    | "explore"
    | "rawat_akun"
    | "quest"
    | "intertwined_fate"
    | "primogems"
    | "talent"
    | "aranara"
    | "level_character"
    | "level_weapon";
  name: string;
  displayPrice: string; // Notasi harga asli bisnis (misal: "500p / 1%", "25k", "5k / End")
  basePrice: number; // Harga dalam IDR
  isPercentageRate?: boolean; // Jika true, harga dihitung per % progres
  ratePerPercent?: number; // Nilai harga per 1%
  unitNotation?: string;
  regionGroup?: string;
}

export const GENSHIN_CATEGORIES: { id: GenshinServiceItem["category"]; label: string }[] = [
  { id: "explore", label: "Explore Map" },
  { id: "rawat_akun", label: "Rawat Akun" },
  { id: "quest", label: "Quest" },
  { id: "intertwined_fate", label: "Intertwined Fate" },
  { id: "primogems", label: "Primogems" },
  { id: "talent", label: "Talent Karakter" },
  { id: "aranara", label: "Aranara" },
  { id: "level_character", label: "Level Up Character" },
  { id: "level_weapon", label: "Level Up Weapon" },
];

export const GENSHIN_SERVICES: GenshinServiceItem[] = [
  // 1. EXPLORE MAP
  // Mondstadt
  {
    id: "exp_mondstadt_full",
    category: "explore",
    regionGroup: "Mondstadt",
    name: "Mondstadt (Full Region)",
    displayPrice: "500p / 1%",
    basePrice: 50000,
    isPercentageRate: true,
    ratePerPercent: 500,
    unitNotation: "% Eksplorasi",
  },
  {
    id: "exp_mondstadt_area",
    category: "explore",
    regionGroup: "Mondstadt",
    name: "Mondstadt - Per Area",
    displayPrice: "25k",
    basePrice: 25000,
  },
  {
    id: "exp_dragonspine",
    category: "explore",
    regionGroup: "Mondstadt",
    name: "Dragonspine",
    displayPrice: "25k",
    basePrice: 25000,
  },

  // Liyue
  {
    id: "exp_liyue_full",
    category: "explore",
    regionGroup: "Liyue",
    name: "Liyue (Full Region)",
    displayPrice: "900p / 1%",
    basePrice: 90000,
    isPercentageRate: true,
    ratePerPercent: 900,
    unitNotation: "% Eksplorasi",
  },
  {
    id: "exp_liyue_area",
    category: "explore",
    regionGroup: "Liyue",
    name: "Liyue - Per Area",
    displayPrice: "20k",
    basePrice: 20000,
  },
  {
    id: "exp_chasm",
    category: "explore",
    regionGroup: "Liyue",
    name: "Chasm & Under",
    displayPrice: "25k",
    basePrice: 25000,
  },
  {
    id: "exp_chenyu",
    category: "explore",
    regionGroup: "Liyue",
    name: "Chenyu Vale",
    displayPrice: "25k",
    basePrice: 25000,
  },

  // Inazuma
  {
    id: "exp_inazuma_full",
    category: "explore",
    regionGroup: "Inazuma",
    name: "Inazuma (Full Region)",
    displayPrice: "1k / 1%",
    basePrice: 100000,
    isPercentageRate: true,
    ratePerPercent: 1000,
    unitNotation: "% Eksplorasi",
  },
  {
    id: "exp_inazuma_area",
    category: "explore",
    regionGroup: "Inazuma",
    name: "Inazuma - Per Area",
    displayPrice: "25k",
    basePrice: 25000,
  },
  {
    id: "exp_enkanomiya",
    category: "explore",
    regionGroup: "Inazuma",
    name: "Enkanomiya",
    displayPrice: "35k",
    basePrice: 35000,
  },

  // Sumeru
  {
    id: "exp_sumeru_full",
    category: "explore",
    regionGroup: "Sumeru",
    name: "Sumeru (Full Region)",
    displayPrice: "1k / 1%",
    basePrice: 100000,
    isPercentageRate: true,
    ratePerPercent: 1000,
    unitNotation: "% Eksplorasi",
  },
  {
    id: "exp_sumeru_forest",
    category: "explore",
    regionGroup: "Sumeru",
    name: "Sumeru - Forest / Area",
    displayPrice: "35k",
    basePrice: 35000,
  },
  {
    id: "exp_sumeru_desert",
    category: "explore",
    regionGroup: "Sumeru",
    name: "Sumeru - Desert / Area",
    displayPrice: "35k",
    basePrice: 35000,
  },

  // Fontaine
  {
    id: "exp_fontaine_full",
    category: "explore",
    regionGroup: "Fontaine",
    name: "Fontaine (Full Region)",
    displayPrice: "1k / 1%",
    basePrice: 100000,
    isPercentageRate: true,
    ratePerPercent: 1000,
    unitNotation: "% Eksplorasi",
  },
  {
    id: "exp_fontaine_area",
    category: "explore",
    regionGroup: "Fontaine",
    name: "Fontaine - Per Area",
    displayPrice: "30k",
    basePrice: 30000,
  },
  {
    id: "exp_sea_bygone",
    category: "explore",
    regionGroup: "Fontaine",
    name: "Sea of Bygone",
    displayPrice: "25k",
    basePrice: 25000,
  },

  // Natlan
  {
    id: "exp_natlan_full",
    category: "explore",
    regionGroup: "Natlan",
    name: "Natlan (Full Region)",
    displayPrice: "1k / 1%",
    basePrice: 100000,
    isPercentageRate: true,
    ratePerPercent: 1000,
    unitNotation: "% Eksplorasi",
  },
  {
    id: "exp_natlan_area",
    category: "explore",
    regionGroup: "Natlan",
    name: "Natlan - Per Area",
    displayPrice: "35k",
    basePrice: 35000,
  },
  {
    id: "exp_ancient_sacred",
    category: "explore",
    regionGroup: "Natlan",
    name: "Ancient Sacred",
    displayPrice: "35k",
    basePrice: 35000,
  },

  // Nod Krai
  {
    id: "exp_nodkrai_full",
    category: "explore",
    regionGroup: "Nod Krai",
    name: "Nod Krai (Full Region)",
    displayPrice: "1k / 1%",
    basePrice: 100000,
    isPercentageRate: true,
    ratePerPercent: 1000,
    unitNotation: "% Eksplorasi",
  },
  {
    id: "exp_nodkrai_area",
    category: "explore",
    regionGroup: "Nod Krai",
    name: "Nod Krai - Per Area",
    displayPrice: "30k",
    basePrice: 30000,
  },

  // Snezhnaya
  {
    id: "exp_snezhnaya_full",
    category: "explore",
    regionGroup: "Snezhnaya",
    name: "Snezhnaya  (Full Region)",
    displayPrice: "1k / 1%",
    basePrice: 100000,
    isPercentageRate: true,
    ratePerPercent: 1000,
    unitNotation: "% Eksplorasi",
  },
  {
    id: "exp_snezhnaya__area",
    category: "explore",
    regionGroup: "Snezhnaya",
    name: "Snezhnaya - Per Area",
    displayPrice: "30k",
    basePrice: 30000,
  },

  // 2. RAWAT AKUN
  {
    id: "rawat_daily",
    category: "rawat_akun",
    name: "Daily",
    displayPrice: "5k",
    basePrice: 5000,
  },
  {
    id: "rawat_weekly",
    category: "rawat_akun",
    name: "Weekly",
    displayPrice: "25k",
    basePrice: 25000,
  },
  {
    id: "rawat_monthly",
    category: "rawat_akun",
    name: "Monthly",
    displayPrice: "45k",
    basePrice: 45000,
  },
  {
    id: "rawat_patch",
    category: "rawat_akun",
    name: "1 Patch",
    displayPrice: "50k",
    basePrice: 50000,
  },
  {
    id: "rawat_versi",
    category: "rawat_akun",
    name: "1 Versi",
    displayPrice: "200k",
    basePrice: 200000,
  },

  // 3. QUEST
  {
    id: "quest_archon",
    category: "quest",
    name: "Archon / Story",
    displayPrice: "20k",
    basePrice: 20000,
  },
  {
    id: "quest_world",
    category: "quest",
    name: "World Quest",
    displayPrice: "25k",
    basePrice: 25000,
  },
  {
    id: "quest_hangout",
    category: "quest",
    name: "Hangout",
    displayPrice: "5k / End",
    basePrice: 5000,
    unitNotation: "Ending",
  },
  {
    id: "quest_event_kecil",
    category: "quest",
    name: "Event Kecil",
    displayPrice: "15k",
    basePrice: 15000,
  },
  {
    id: "quest_event_besar",
    category: "quest",
    name: "Event Besar",
    displayPrice: "20k",
    basePrice: 20000,
  },

  // 4. INTERTWINED FATE
  {
    id: "fate_10",
    category: "intertwined_fate",
    name: "10 IF",
    displayPrice: "30k",
    basePrice: 30000,
  },
  {
    id: "fate_20",
    category: "intertwined_fate",
    name: "20 IF",
    displayPrice: "60k",
    basePrice: 60000,
  },
  {
    id: "fate_30",
    category: "intertwined_fate",
    name: "30 IF",
    displayPrice: "90k",
    basePrice: 90000,
  },

  // 5. PRIMOGEMS
  {
    id: "primo_160",
    category: "primogems",
    name: "160 Primo",
    displayPrice: "3k",
    basePrice: 3000,
  },
  {
    id: "primo_1600",
    category: "primogems",
    name: "1600 Primo",
    displayPrice: "30k",
    basePrice: 30000,
  },
  {
    id: "primo_3200",
    category: "primogems",
    name: "3200 Primo",
    displayPrice: "60k",
    basePrice: 60000,
  },
  {
    id: "primo_4800",
    category: "primogems",
    name: "4800 Primo",
    displayPrice: "90k",
    basePrice: 90000,
  },

  // 6. TALENT
  {
    id: "talent_666",
    category: "talent",
    name: "Talent 6-6-6",
    displayPrice: "16k",
    basePrice: 16000,
  },
  {
    id: "talent_999",
    category: "talent",
    name: "Talent 9-9-9",
    displayPrice: "26k",
    basePrice: 26000,
  },
  {
    id: "talent_101010",
    category: "talent",
    name: "Talent 10-10-10",
    displayPrice: "36k",
    basePrice: 36000,
  },

  // 7. ARANARA
  {
    id: "aranara_76",
    category: "aranara",
    name: "76 Aranara",
    displayPrice: "60k",
    basePrice: 60000,
  },
  {
    id: "aranara_full",
    category: "aranara",
    name: "Full Aranara",
    displayPrice: "110k",
    basePrice: 110000,
  },

  // 8. LEVEL UP CHARACTER
  {
    id: "lvl_char_1_60",
    category: "level_character",
    name: "Character 1-60 Level",
    displayPrice: "10k",
    basePrice: 10000,
  },
  {
    id: "lvl_char_60_90",
    category: "level_character",
    name: "Character 60-90 Level",
    displayPrice: "32k",
    basePrice: 32000,
  },

  // 9. LEVEL UP WEAPON
  {
    id: "lvl_weap_1_60",
    category: "level_weapon",
    name: "Weapon 1-60 Level",
    displayPrice: "10k",
    basePrice: 10000,
  },
  {
    id: "lvl_weap_60_90",
    category: "level_weapon",
    name: "Weapon 60-90 Level",
    displayPrice: "32k",
    basePrice: 32000,
  },
];
