// Kalkulator Harga dan Validasi untuk VANGUARD BOOST
// Dibuat sederhana dan mudah dipahami untuk siswa RPL Kelas 11

import { MLBB_RANK_TIERS, MLBBTierConfig } from "@/data/mobile-legends";

export interface MLBBTierBreakdown {
  tierName: string;
  stars: number;
  pricePerStar: number;
  subtotal: number;
}

export interface MLBBProgressionResult {
  isValid: boolean;
  errorMessage?: string;
  totalStars: number;
  totalPrice: number;
  breakdown: MLBBTierBreakdown[];
}

/**
 * Menghitung harga joki Mobile Legends dari Rank Awal (dan Bintang Awal) ke Rank Target (dan Bintang Target).
 * Tanpa batasan harga maksimal (no price limit).
 */
export function calculateMLBBProgression(
  startTierId: string,
  startStars: number,
  targetTierId: string,
  targetStars: number
): MLBBProgressionResult {
  const startTier = MLBB_RANK_TIERS.find((t) => t.id === startTierId);
  const targetTier = MLBB_RANK_TIERS.find((t) => t.id === targetTierId);

  if (!startTier || !targetTier) {
    return {
      isValid: false,
      errorMessage: "Pilihan rank tidak valid.",
      totalStars: 0,
      totalPrice: 0,
      breakdown: [],
    };
  }

  // 1. Validasi: Target rank tidak boleh lebih rendah dari starting rank
  if (targetTier.order < startTier.order) {
    return {
      isValid: false,
      errorMessage: `Rank target (${targetTier.name}) tidak boleh lebih rendah dari rank awal (${startTier.name}).`,
      totalStars: 0,
      totalPrice: 0,
      breakdown: [],
    };
  }

  // 2. Validasi jika dalam tier yang sama
  if (startTier.order === targetTier.order) {
    if (targetStars <= startStars) {
      return {
        isValid: false,
        errorMessage: `Bintang target (${targetStars}★) harus lebih besar dari bintang awal (${startStars}★).`,
        totalStars: 0,
        totalPrice: 0,
        breakdown: [],
      };
    }

    const neededStars = targetStars - startStars;
    const subtotal = neededStars * startTier.pricePerStar;

    return {
      isValid: true,
      totalStars: neededStars,
      totalPrice: subtotal,
      breakdown: [
        {
          tierName: startTier.name,
          stars: neededStars,
          pricePerStar: startTier.pricePerStar,
          subtotal: subtotal,
        },
      ],
    };
  }

  // 3. Perhitungan Lintas Tier (Multi-tier progression)
  const breakdown: MLBBTierBreakdown[] = [];
  let totalStars = 0;
  let totalPrice = 0;

  for (let order = startTier.order; order <= targetTier.order; order++) {
    const currentTier = MLBB_RANK_TIERS.find((t) => t.order === order);
    if (!currentTier) continue;

    // A. Tier Awal: Bintang yang dibutuhkan untuk menyelesaikan tier ini
    if (order === startTier.order) {
      let tierCeiling = currentTier.maxStars;
      if (currentTier.order === 7) {
        tierCeiling = 25; // Mythic (0-24) to reach Honor (25)
      } else if (currentTier.order === 8) {
        tierCeiling = 50; // Honor (25-49) to reach Glory (50)
      } else if (currentTier.order === 9) {
        tierCeiling = 100; // Glory (50-99) to reach Immortal (100)
      }

      const starsInStart = Math.max(0, tierCeiling - startStars);
      if (starsInStart > 0) {
        const subtotal = starsInStart * currentTier.pricePerStar;
        breakdown.push({
          tierName: currentTier.name,
          stars: starsInStart,
          pricePerStar: currentTier.pricePerStar,
          subtotal: subtotal,
        });
        totalStars += starsInStart;
        totalPrice += subtotal;
      }
    }
    // B. Tier Target: Bintang yang dicapai di tier tujuan
    else if (order === targetTier.order) {
      let starsInTarget = targetStars;
      if (targetTier.order >= 8 && targetStars >= targetTier.minStars) {
        // Honor (25+), Glory (50+), Immortal (100+)
        starsInTarget = targetStars - targetTier.minStars;
      }
      starsInTarget = Math.max(0, starsInTarget);

      if (starsInTarget > 0) {
        const subtotal = starsInTarget * targetTier.pricePerStar;
        breakdown.push({
          tierName: targetTier.name,
          stars: starsInTarget,
          pricePerStar: targetTier.pricePerStar,
          subtotal: subtotal,
        });
        totalStars += starsInTarget;
        totalPrice += subtotal;
      }
    }
    // C. Tier Perantara: Penuh 1 tier penuh
    else {
      const starsInMiddle = currentTier.totalStarsInTier;
      const subtotal = starsInMiddle * currentTier.pricePerStar;

      breakdown.push({
        tierName: currentTier.name,
        stars: starsInMiddle,
        pricePerStar: currentTier.pricePerStar,
        subtotal: subtotal,
      });

      totalStars += starsInMiddle;
      totalPrice += subtotal;
    }
  }

  return {
    isValid: true,
    totalStars,
    totalPrice,
    breakdown,
  };
}
