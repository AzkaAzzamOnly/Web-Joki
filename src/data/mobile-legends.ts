// Data Layanan Mobile Legends: Bang Bang (VANGUARD BOOST)
// Sesuai referensi daftar harga: Joki Rank per Bintang & Paket Rank Boost

export const MLBB_THEME = {
  bg: "#101216",
  cardBg: "#181C22",
  cardBorder: "#30343B",
  primaryAccent: "#08A832",
  secondaryAccent: "#D8F4D9",
  textMain: "#F1F1F1",
  textMuted: "#A5A9B0",
};

// 1. KATEGORI A: JOKI RANK PER BINTANG & PROGRESSION
export interface MLBBTierConfig {
  id: string;
  name: string;
  order: number;
  minStars: number;
  maxStars: number;
  totalStarsInTier: number;
  pricePerStar: number;
  displayPrice: string;
  badge: string;
  defaultStars: number;
  divisions?: number;
}

export const MLBB_RANK_TIERS: MLBBTierConfig[] = [
  {
    id: "warrior",
    name: "Warrior",
    order: 1,
    minStars: 1,
    maxStars: 9,
    totalStarsInTier: 9,
    pricePerStar: 1000,
    displayPrice: "Rp1.000 / Star",
    badge: "WAR",
    defaultStars: 1,
    divisions: 3,
  },
  {
    id: "elite",
    name: "Elite",
    order: 2,
    minStars: 1,
    maxStars: 12,
    totalStarsInTier: 12,
    pricePerStar: 1200,
    displayPrice: "Rp1.200 / Star",
    badge: "ELT",
    defaultStars: 1,
    divisions: 3,
  },
  {
    id: "master",
    name: "Master",
    order: 3,
    minStars: 1,
    maxStars: 16,
    totalStarsInTier: 16,
    pricePerStar: 1500,
    displayPrice: "Rp1.500 / Star",
    badge: "MST",
    defaultStars: 1,
    divisions: 4,
  },
  {
    id: "grandmaster",
    name: "Grandmaster",
    order: 4,
    minStars: 1,
    maxStars: 25,
    totalStarsInTier: 25,
    pricePerStar: 1800,
    displayPrice: "Rp1.800 / Star",
    badge: "GM",
    defaultStars: 1,
    divisions: 5,
  },
  {
    id: "epic",
    name: "Epic",
    order: 5,
    minStars: 1,
    maxStars: 25,
    totalStarsInTier: 25,
    pricePerStar: 2000,
    displayPrice: "Rp2.000 / Star",
    badge: "EPIC",
    defaultStars: 1,
    divisions: 5,
  },
  {
    id: "legend",
    name: "Legend",
    order: 6,
    minStars: 1,
    maxStars: 25,
    totalStarsInTier: 25,
    pricePerStar: 2500,
    displayPrice: "Rp2.500 / Star",
    badge: "LGD",
    defaultStars: 1,
    divisions: 5,
  },
  {
    id: "mythic",
    name: "Mythic",
    order: 7,
    minStars: 0,
    maxStars: 24,
    totalStarsInTier: 25,
    pricePerStar: 3000,
    displayPrice: "Rp3.000 / Star",
    badge: "MYT",
    defaultStars: 0,
    divisions: 1,
  },
  {
    id: "honor",
    name: "Mythical Honor",
    order: 8,
    minStars: 25,
    maxStars: 49,
    totalStarsInTier: 25,
    pricePerStar: 3500,
    displayPrice: "Rp3.500 / Star",
    badge: "HNR",
    defaultStars: 25,
    divisions: 1,
  },
  {
    id: "glory",
    name: "Mythical Glory",
    order: 9,
    minStars: 50,
    maxStars: 99,
    totalStarsInTier: 50,
    pricePerStar: 4000,
    displayPrice: "Rp4.000 / Star",
    badge: "GLY",
    defaultStars: 50,
    divisions: 1,
  },
  {
    id: "immortal",
    name: "Mythic Immortal",
    order: 10,
    minStars: 100,
    maxStars: 500,
    totalStarsInTier: 100,
    pricePerStar: 5000,
    displayPrice: "Rp5.000 / Star",
    badge: "IMT",
    defaultStars: 100,
    divisions: 1,
  },
];

// Alias untuk kompatibilitas
export type MLBBStarTier = MLBBTierConfig;
export const MLBB_STAR_TIERS = MLBB_RANK_TIERS;

// 2. KATEGORI B: RANK BOOST PACKAGES (9 Paket Sesuai Referensi)
export interface MLBBPackage {
  id: string;
  packageName: string;
  startRank: string;
  targetRank: string;
  startBadge: string;
  targetBadge: string;
  price: number;
  displayPrice: string;
  available: boolean;
  notes?: string;
}

export const MLBB_PACKAGES: MLBBPackage[] = [
  {
    id: "pkg_1",
    packageName: "Package 1",
    startRank: "Epic V",
    targetRank: "Mythic (0★)",
    startBadge: "EPIC",
    targetBadge: "MYT",
    price: 160000,
    displayPrice: "Rp160.000",
    available: true,
    notes: "Full Tier: Epic V langsung ke penembusan Mythic",
  },
  {
    id: "pkg_2",
    packageName: "Package 2",
    startRank: "Legend V",
    targetRank: "Mythical Honor (25★)",
    startBadge: "LGD",
    targetBadge: "HNR",
    price: 150000,
    displayPrice: "Rp150.000",
    available: true,
    notes: "Dari Legend V langsung tembus Honor 25 Bintang",
  },
  {
    id: "pkg_3",
    packageName: "Package 3",
    startRank: "Mythic (0★)",
    targetRank: "Mythical Glory (50★)",
    startBadge: "MYT",
    targetBadge: "GLY",
    price: 140000,
    displayPrice: "Rp140.000",
    available: true,
    notes: "Penaikan 50 Bintang Mythic ke Glory",
  },
  {
    id: "pkg_4",
    packageName: "Package 4",
    startRank: "Grandmaster I",
    targetRank: "Legend V",
    startBadge: "GM",
    targetBadge: "LGD",
    price: 130000,
    displayPrice: "Rp130.000",
    available: true,
    notes: "Penaikan melewati seluruh tier Epic",
  },
  {
    id: "pkg_5",
    packageName: "Package 5",
    startRank: "Legend V",
    targetRank: "Mythic (0★)",
    startBadge: "LGD",
    targetBadge: "MYT",
    price: 120000,
    displayPrice: "Rp120.000",
    available: true,
    notes: "Paket kilat Legend V menuju Mythic",
  },
  {
    id: "pkg_6",
    packageName: "Package 6",
    startRank: "Epic I",
    targetRank: "Legend I",
    startBadge: "EPIC",
    targetBadge: "LGD",
    price: 115000,
    displayPrice: "Rp115.000",
    available: true,
    notes: "Transisi percepatan divisi Epic ke pucuk Legend",
  },
  {
    id: "pkg_7",
    packageName: "Package 7",
    startRank: "Mythical Honor (25★)",
    targetRank: "Mythical Glory (50★)",
    startBadge: "HNR",
    targetBadge: "GLY",
    price: 110000,
    displayPrice: "Rp110.000",
    available: true,
    notes: "25 Bintang dari Honor ke Glory",
  },
  {
    id: "pkg_8",
    packageName: "Package 8",
    startRank: "Epic V",
    targetRank: "Legend V",
    startBadge: "EPIC",
    targetBadge: "LGD",
    price: 100000,
    displayPrice: "Rp100.000",
    available: true,
    notes: "Penaikan 5 Divisi Epic penuh ke Legend V",
  },
  {
    id: "pkg_9",
    packageName: "Package 9",
    startRank: "Mythical Glory (50★)",
    targetRank: "Mythic Immortal (100★)",
    startBadge: "GLY",
    targetBadge: "IMT",
    price: 190000,
    displayPrice: "Rp190.000",
    available: true,
    notes: "Penaikan 50 Bintang Glory menuju tier tertinggi Immortal",
  },
];

// Helper kalkulasi harga Joki Bintang MLBB
export function calculateMLBBStarOrder(
  currentTierId: string,
  targetTierId: string,
  starCount: number
): {
  basePrice: number;
  isValid: boolean;
  errorMessage?: string;
  breakdown: string;
} {
  const currentTier = MLBB_STAR_TIERS.find((t) => t.id === currentTierId);
  const targetTier = MLBB_STAR_TIERS.find((t) => t.id === targetTierId);

  if (!currentTier || !targetTier) {
    return {
      basePrice: 0,
      isValid: false,
      errorMessage: "Tier yang dipilih tidak valid.",
      breakdown: "-",
    };
  }

  // Validasi: target tier harus >= current tier
  if (targetTier.order < currentTier.order) {
    return {
      basePrice: 0,
      isValid: false,
      errorMessage: "Rank target harus lebih tinggi dari rank saat ini.",
      breakdown: "-",
    };
  }

  if (starCount <= 0) {
    return {
      basePrice: 0,
      isValid: false,
      errorMessage: "Jumlah bintang harus minimal 1.",
      breakdown: "-",
    };
  }

  // Jika rank sama (misal beli 5 bintang di Epic)
  if (currentTier.order === targetTier.order) {
    const total = starCount * currentTier.pricePerStar;
    return {
      basePrice: total,
      isValid: true,
      breakdown: `${currentTier.name}: ${starCount} Bintang × Rp${currentTier.pricePerStar.toLocaleString("id-ID")}`,
    };
  }

  // Jika lintas rank (antar tier berbeda)
  let calculated = 0;
  let breakdownTexts: string[] = [];

  for (let i = currentTier.order; i <= targetTier.order; i++) {
    const tier = MLBB_STAR_TIERS.find((t) => t.order === i);
    if (!tier) continue;

    if (i === currentTier.order) {
      // Tier awal: menggunakan jumlah bintang input atau default tier
      const stars = Math.min(starCount, 25);
      const subtotal = stars * tier.pricePerStar;
      calculated += subtotal;
      breakdownTexts.push(`${tier.name} (${stars}★)`);
    } else if (i === targetTier.order) {
      const stars = 5;
      const subtotal = stars * tier.pricePerStar;
      calculated += subtotal;
      breakdownTexts.push(`${tier.name} (${stars}★)`);
    } else {
      const stars = 25;
      const subtotal = stars * tier.pricePerStar;
      calculated += subtotal;
      breakdownTexts.push(`${tier.name} (${stars}★)`);
    }
  }

  return {
    basePrice: calculated,
    isValid: true,
    breakdown: `Lintas Tier: ${breakdownTexts.join(" + ")}`,
  };
}
