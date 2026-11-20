"use client";

import React, { useState } from "react";
import {
  GENSHIN_THEME,
  GENSHIN_CATEGORIES,
  GENSHIN_SERVICES,
  GenshinServiceItem,
} from "@/data/genshin-services";
import { formatRupiah } from "@/data/games";

export interface GenshinCartItem {
  id: string; // unique cart entry id
  serviceId: string;
  name: string;
  category: string;
  displayPrice: string;
  calculatedPrice: number;
  percentage?: number;
  quantity?: number;
  note?: string;
}

interface GenshinCatalogProps {
  cartItems: GenshinCartItem[];
  onAddToCart: (item: GenshinCartItem) => void;
  onRemoveFromCart: (cartEntryId: string) => void;
}

// Daftar Wilayah untuk Explore Map
const EXPLORE_REGIONS = [
  "Semua wilayah",
  "Mondstadt",
  "Liyue",
  "Inazuma",
  "Sumeru",
  "Fontaine",
  "Natlan",
  "Nod Krai",
];

export default function GenshinCatalog({
  cartItems,
  onAddToCart,
  onRemoveFromCart,
}: GenshinCatalogProps) {
  // Kategori aktif yang sedang dibuka (Default: explore)
  const [activeCategory, setActiveCategory] = useState<string>("explore");

  // Filter wilayah jika kategori Explore Map aktif
  const [activeRegion, setActiveRegion] = useState<string>("Semua wilayah");

  // State persentase untuk layanan 1% explore
  const [customPercentages, setCustomPercentages] = useState<{ [serviceId: string]: number }>({
    exp_mondstadt_full: 100,
    exp_liyue_full: 100,
    exp_inazuma_full: 100,
    exp_sumeru_full: 100,
    exp_fontaine_full: 100,
    exp_natlan_full: 100,
    exp_nodkrai_full: 100,
  });

  // State ending untuk hangout
  const [hangoutEnds, setHangoutEnds] = useState<number>(1);

  // Filter layanan berdasarkan kategori & wilayah
  const currentServices = GENSHIN_SERVICES.filter((item) => {
    if (item.category !== activeCategory) return false;
    if (activeCategory === "explore" && activeRegion !== "Semua wilayah") {
      return item.regionGroup === activeRegion;
    }
    return true;
  });

  // Handler menambahkan layanan ke keranjang pesanan
  const handleAddService = (service: GenshinServiceItem) => {
    let finalPrice = service.basePrice;
    let percentage: number | undefined = undefined;
    let quantity: number | undefined = undefined;
    let note = "";

    if (service.isPercentageRate && service.ratePerPercent) {
      const pct = customPercentages[service.id] || 100;
      percentage = pct;
      finalPrice = pct * service.ratePerPercent;
      note = `${pct}% eksplorasi (${service.displayPrice})`;
    } else if (service.id === "quest_hangout") {
      quantity = hangoutEnds;
      finalPrice = hangoutEnds * service.basePrice;
      note = `${hangoutEnds} ending`;
    }

    const newCartItem: GenshinCartItem = {
      id: `${service.id}_${Date.now()}`,
      serviceId: service.id,
      name: service.name,
      category: service.category,
      displayPrice: service.displayPrice,
      calculatedPrice: finalPrice,
      percentage,
      quantity,
      note,
    };

    onAddToCart(newCartItem);
  };

  return (
    <div
      style={{ backgroundColor: GENSHIN_THEME.bg, color: GENSHIN_THEME.textMain }}
      className="rounded-lg border border-[#272D3B] p-5 shadow-lg space-y-5"
    >
      {/* Header Tema Dark Fantasy Genshin */}
      <div className="border-b border-[#272D3B] pb-4">
        <div className="flex items-center gap-2">
          <span className="rounded bg-[#D4A359] px-2 py-0.5 text-xs font-bold text-[#0E1015]">
            Genshin Impact
          </span>
          <span className="text-xs text-[#9BA2AF]">
            9 kategori layanan resmi tanpa bot
          </span>
        </div>
        <h3 className="text-xl font-bold text-white mt-1">
          Katalog layanan &amp; jasa akun Genshin Impact
        </h3>
        <p className="text-xs text-[#9BA2AF]">
          Pilih kategori di bawah untuk melihat rincian harga. Kamu dapat menambahkan beberapa layanan sekaligus ke dalam satu pesanan.
        </p>
      </div>

      {/* Navigasi 9 Kategori (Tabs) */}
      <div className="flex flex-wrap gap-1.5 border-b border-[#272D3B] pb-3">
        {GENSHIN_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded text-xs transition-all ${
                isActive
                  ? "bg-[#D4A359] text-[#0E1015] font-bold shadow"
                  : "bg-[#151820] text-[#9BA2AF] border border-[#272D3B] hover:text-white hover:border-[#3D4558]"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Sub-Navigasi Khusus Kategori "Explore Map" (Filter Wilayah) */}
      {activeCategory === "explore" && (
        <div className="rounded border border-[#272D3B] bg-[#151820] p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#D4A359]">
              Sub-wilayah eksplorasi (regions)
            </span>
            <span className="text-[11px] text-[#9BA2AF]">
              Tersedia 7 wilayah resmi + area spesifik
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {EXPLORE_REGIONS.map((region) => {
              const isRegionActive = activeRegion === region;
              return (
                <button
                  key={region}
                  type="button"
                  onClick={() => setActiveRegion(region)}
                  className={`px-2.5 py-1 rounded text-[11px] transition-all ${
                    isRegionActive
                      ? "bg-[#D4A359]/20 text-[#D4A359] border border-[#D4A359] font-bold"
                      : "bg-[#0E1015] text-[#9BA2AF] border border-[#272D3B] hover:text-white"
                  }`}
                >
                  {region}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Daftar Baris Layanan Compact (Name on Left, Price & Action on Right) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1 text-[11px] text-[#9BA2AF]">
          <span>Daftar layanan ({currentServices.length} item)</span>
          <span>Tarif &amp; aksi</span>
        </div>

        {currentServices.map((svc) => {
          const isPercent = svc.isPercentageRate;
          const currentPct = customPercentages[svc.id] || 100;
          const isHangout = svc.id === "quest_hangout";

          const calculatedSinglePrice = isPercent
            ? currentPct * (svc.ratePerPercent || 1000)
            : isHangout
            ? hangoutEnds * svc.basePrice
            : svc.basePrice;

          return (
            <div
              key={svc.id}
              className="rounded border border-[#272D3B] bg-[#151820] p-3 transition-colors hover:border-[#3D4558]"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                {/* Kolom Kiri: Nama Layanan & Keterangan */}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">
                      {svc.name}
                    </span>
                    {svc.regionGroup && (
                      <span className="rounded bg-[#0E1015] border border-[#272D3B] px-1.5 py-0.2 text-[10px] text-[#9BA2AF]">
                        {svc.regionGroup}
                      </span>
                    )}
                  </div>

                  {/* Keterangan Tambahan untuk Layanan Persen */}
                  {isPercent && (
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                      <span className="text-[#9BA2AF] text-[11px]">
                        Target progres:
                      </span>
                      <input
                        type="range"
                        min={10}
                        max={100}
                        step={5}
                        value={currentPct}
                        onChange={(e) =>
                          setCustomPercentages({
                            ...customPercentages,
                            [svc.id]: parseInt(e.target.value),
                          })
                        }
                        className="w-32 accent-[#D4A359]"
                      />
                      <span className="font-mono text-xs font-bold text-[#D4A359]">
                        {currentPct}% progres
                      </span>
                    </div>
                  )}

                  {/* Keterangan Tambahan untuk Quest Hangout */}
                  {isHangout && (
                    <div className="mt-2 flex items-center gap-2 text-xs">
                      <span className="text-[#9BA2AF] text-[11px]">
                        Ending:
                      </span>
                      <select
                        value={hangoutEnds}
                        onChange={(e) => setHangoutEnds(parseInt(e.target.value))}
                        className="rounded border border-[#272D3B] bg-[#0E1015] px-2 py-0.5 text-xs text-white"
                      >
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <option key={num} value={num}>
                            {num} Ending
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {/* Kolom Kanan: Notasi Harga Asli, Subtotal Rupiah, dan Tombol Tambah */}
                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#272D3B]">
                  <div className="text-right">
                    <span className="rounded bg-[#0E1015] border border-[#272D3B] px-2 py-0.5 text-xs font-mono font-bold text-[#D4A359] block">
                      {svc.displayPrice}
                    </span>
                    <span className="text-[11px] font-mono text-white font-semibold mt-0.5 block">
                      = {formatRupiah(calculatedSinglePrice)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAddService(svc)}
                    className="rounded bg-[#D4A359] px-3 py-1.5 text-xs font-bold text-[#0E1015] hover:bg-[#e4b66d] transition-colors whitespace-nowrap"
                  >
                    + Tambah
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Ringkasan Keranjang Layanan Genshin yang Dipilih */}
      {cartItems.length > 0 && (
        <div className="rounded border border-[#272D3B] bg-[#151820] p-4">
          <div className="flex items-center justify-between border-b border-[#272D3B] pb-2 mb-3">
            <span className="text-xs font-bold text-[#D4A359]">
              Keranjang layanan Genshin ({cartItems.length} dipilih)
            </span>
            <span className="text-xs text-[#9BA2AF]">
              Total layanan:{" "}
              <strong className="text-white font-mono text-sm">
                {formatRupiah(cartItems.reduce((acc, it) => acc + it.calculatedPrice, 0))}
              </strong>
            </span>
          </div>

          <div className="space-y-1.5">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded bg-[#0E1015] border border-[#272D3B] px-3 py-2 text-xs"
              >
                <div>
                  <span className="font-bold text-white">{item.name}</span>
                  {item.note && (
                    <span className="ml-2 text-[11px] text-[#D4A359] font-mono">
                      ({item.note})
                    </span>
                  )}
                  <span className="ml-2 text-[10px] text-[#9BA2AF]">
                    [{item.displayPrice}]
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-mono text-white font-semibold">
                    {formatRupiah(item.calculatedPrice)}
                  </span>
                  <button
                    type="button"
                    onClick={() => onRemoveFromCart(item.id)}
                    className="text-red-400 hover:text-red-300 font-bold px-1.5 py-0.5 rounded border border-red-500/30 bg-red-950/30 text-[11px]"
                    title="Hapus layanan"
                  >
                    ✕ Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
