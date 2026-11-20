export const BRAND = {
  name: "Zyra Store",
  tagline: "Jasa Joki & Pendampingan Akun Game",
  description:
    "Platform layanan joki game terpercaya dengan pengerjaan 100% manual tanpa bot atau cheat. Harga transparan dan rincian jelas sebelum order.",
  supportHours: "09.00 - 23.00 WIB",
  disclaimer:
    "Zyra Store adalah proyek layanan game independen dan tidak berafiliasi resmi dengan Moonton, HoYoverse, maupun Roblox Corporation.",
};

// 1. Kategori Game Utama
export interface GameItem {
  id: "mlbb" | "genshin" | "roblox";
  name: string;
  genre: string;
  tagline: string;
  accentColor: string;
  image: string;
  imagePosition?: string;
}

export const GAMES: GameItem[] = [
  {
    id: "mlbb",
    name: "Mobile Legends: Bang Bang",
    genre: "MOBA 5v5 Mobile",
    tagline: "Layanan joki rank per bintang & 9 paket rank boost MLBB manual terverifikasi.",
    accentColor: "#08A832",
    image: "/images/games/mobile-legends.jpg",
    imagePosition: "center 28%",
  },
  {
    id: "genshin",
    name: "Genshin Impact",
    genre: "Action RPG Open World",
    tagline: "Katalog lengkap eksplorasi map, rawat akun, quest, primogems, dan leveling.",
    accentColor: "#D4A359",
    image: "/images/games/genshin.jpg",
    imagePosition: "center 25%",
  },
  {
    id: "roblox",
    name: "Roblox",
    genre: "Multi-Experience Sandbox",
    tagline: "Jasa leveling & farming di experience populer seperti Blox Fruits dan Blade Ball.",
    accentColor: "#EF4444",
    image: "/images/games/roblox-hero.svg",
    imagePosition: "center",
  },
];

// 2. Data Roblox Experiences
export interface RobloxExperience {
  id: string;
  name: string;
  genre: string;
  description: string;
  image: string;
  services: {
    id: string;
    name: string;
    unit: string;
    unitPrice: number;
    minUnits: number;
    maxUnits: number;
    defaultUnits: number;
  }[];
}

export const ROBLOX_EXPERIENCES: RobloxExperience[] = [
  {
    id: "blox-fruits",
    name: "Blox Fruits",
    genre: "Action Adventure",
    description: "Leveling karakter Sea 1 - 3, mastery skill buah, dan awakening raid.",
    image: "/images/roblox/blox-fruits.svg",
    services: [
      {
        id: "bf_level",
        name: "Leveling Karakter",
        unit: "x 100 Level",
        unitPrice: 15000,
        minUnits: 1,
        maxUnits: 25,
        defaultUnits: 5,
      },
      {
        id: "bf_mastery",
        name: "Mastery Buah / Melee",
        unit: "Paket Mastery",
        unitPrice: 35000,
        minUnits: 1,
        maxUnits: 5,
        defaultUnits: 1,
      },
      {
        id: "bf_raid",
        name: "Awakening Raid Full Chip",
        unit: "Sesi Raid",
        unitPrice: 50000,
        minUnits: 1,
        maxUnits: 5,
        defaultUnits: 1,
      },
    ],
  },
  {
    id: "pet-sim-99",
    name: "Pet Simulator 99",
    genre: "Collecting Simulator",
    description: "Bantuan rebirth progression dan pembukaan area baru dengan koin optimal.",
    image: "/images/roblox/ps99.svg",
    services: [
      {
        id: "ps99_rebirth",
        name: "Rebirth Progression",
        unit: "Tier Rebirth",
        unitPrice: 25000,
        minUnits: 1,
        maxUnits: 8,
        defaultUnits: 2,
      },
      {
        id: "ps99_area",
        name: "Unlock Area Baru",
        unit: "Paket 10 Area",
        unitPrice: 30000,
        minUnits: 1,
        maxUnits: 10,
        defaultUnits: 2,
      },
    ],
  },
  {
    id: "blade-ball",
    name: "Blade Ball",
    genre: "Competitive Action",
    description: "Net-win matches dan penaikan rank rating mode kompetitif.",
    image: "/images/roblox/blade-ball.svg",
    services: [
      {
        id: "bb_win",
        name: "Paket Net Win",
        unit: "Kemenangan Bersih",
        unitPrice: 6000,
        minUnits: 5,
        maxUnits: 50,
        defaultUnits: 10,
      },
    ],
  },
];

// 3. Opsi Tambahan (Add-on)
export interface AddonItem {
  id: string;
  name: string;
  description: string;
  percent: number; // 0.30 = +30%
  games: ("mlbb" | "genshin" | "roblox")[];
}

export const ADDONS: AddonItem[] = [
  {
    id: "addon_mabar",
    name: "Mode Mabar (Duo Queue)",
    description: "Main bareng joki pro tanpa perlu berikan akses login akun.",
    percent: 0.3,
    games: ["mlbb", "roblox"],
  },
  {
    id: "addon_express",
    name: "Prioritas Express",
    description: "Pengerjaan didahulukan langsung oleh booster inti (~40% lebih cepat).",
    percent: 0.2,
    games: ["mlbb", "genshin", "roblox"],
  },
  {
    id: "addon_hero",
    name: "Request Hero / Karakter",
    description: "Tentukan hero atau karakter spesifik yang ingin dimainkan booster.",
    percent: 0.1,
    games: ["mlbb", "genshin"],
  },
  {
    id: "addon_stream",
    name: "Live Stream Discord",
    description: "Saksikan pengerjaan akun Anda secara live streaming privat.",
    percent: 0.15,
    games: ["mlbb", "genshin", "roblox"],
  },
];

// Helper: Format Rupiah Indonesia
export function formatRupiah(amount: number): string {
  if (isNaN(amount) || amount <= 0) return "Rp 0";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
