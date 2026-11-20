"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import MobileLegendsCatalog, { MLBBSelection } from "@/components/MobileLegendsCatalog";
import { ADDONS, formatRupiah, BRAND } from "@/data/games";

export default function MobileLegendsOrderPage() {
  // 1. State Pilihan MLBB
  const [mlbbSelection, setMlbbSelection] = useState<MLBBSelection>({
    serviceMode: "star",
    startTierId: "epic",
    startStars: 1,
    targetTierId: "mythic",
    targetStars: 0,
    selectedPackage: null,
    basePrice: 122500,
    description: "Epic (1★) → Mythic (0★)",
    isValid: true,
  });

  // 2. State Add-ons
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  // 3. State Data Kontak Pelanggan
  const [nickname, setNickname] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [catatan, setCatatan] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Add-on yang kompatibel dengan Mobile Legends
  const mlbbAddons = useMemo(() => {
    return ADDONS.filter((a) => a.games.includes("mlbb"));
  }, []);

  const toggleAddon = (addonId: string) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter((id) => id !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  // Kalkulasi Harga Dasar & Add-on
  const basePrice = mlbbSelection.isValid ? mlbbSelection.basePrice : 0;

  const { addonTotal, sumAddonPercent, addonBreakdown } = useMemo(() => {
    let sumPercent = 0;
    const breakdown: { name: string; amount: number; percent: number }[] = [];

    if (basePrice > 0 && selectedAddons.length > 0) {
      for (const addonId of selectedAddons) {
        const addon = ADDONS.find((a) => a.id === addonId);
        if (addon && addon.games.includes("mlbb")) {
          sumPercent += addon.percent;
          const cost = Math.round(basePrice * addon.percent);
          breakdown.push({
            name: addon.name,
            amount: cost,
            percent: addon.percent,
          });
        }
      }
    }

    const total = Math.round(basePrice * sumPercent);
    return { addonTotal: total, sumAddonPercent: sumPercent, addonBreakdown: breakdown };
  }, [basePrice, selectedAddons]);

  const finalTotalPrice = basePrice + addonTotal;
  const isOrderReady = mlbbSelection.isValid && basePrice > 0;

  return (
    <main className="min-h-screen bg-[#101216] text-[#F1F1F1] pb-16">
      {/* Top Bar Navigasi */}
      <header className="border-b border-[#30343B] bg-[#181C22]/95 backdrop-blur sticky top-0 z-40">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-semibold text-[#A5A9B0] hover:text-white transition-colors"
          >
            <span>←</span>
            <span>Kembali ke beranda</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="font-bold text-xs tracking-wide text-white">
              Mobile Legends
            </span>
          </div>
        </div>
      </header>

      {/* Hero Header Khusus MLBB */}
      <section className="border-b border-[#30343B] bg-[#181C22]/50 py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded bg-[#101216] border border-[#30343B] px-2.5 py-1 text-xs text-[#08A832] mb-2 font-medium">
                <span>MLBB</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Pemesanan joki Mobile Legends: Bang Bang
              </h1>
              <p className="text-xs sm:text-sm text-[#A5A9B0] mt-1 max-w-2xl">
                Kalkulator rank fleksibel multi-tier tanpa batasan harga &amp; 9 pilihan paket rank boost resmi. Pengerjaan 100% manual tanpa cheat atau bot.
              </p>
            </div>

            <div className="rounded border border-[#30343B] bg-[#181C22] p-3 text-right shrink-0">
              <span className="text-xs text-[#A5A9B0] block">Tarif mulai dari</span>
              <span className="text-lg font-bold text-[#08A832] font-mono">
                Rp 2.000 / star
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Konten Pemesanan: 2 Kolom */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Kolom Kiri: Katalog & Opsi Pemesanan */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Katalog Mobile Legends */}
            <MobileLegendsCatalog onSelectionChange={setMlbbSelection} />

            {/* 2. Opsi Tambahan (Add-ons) */}
            <div className="rounded-lg border border-[#30343B] bg-[#181C22] p-5 text-xs">
              <span className="text-xs font-bold text-white block mb-1">
                Opsi tambahan (add-on layanan)
              </span>
              <p className="text-[11px] text-[#A5A9B0] mb-3">
                Fitur proteksi dan kenyamanan tambahan. Dihitung secara aditif dari tarif dasar.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {mlbbAddons.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <label
                      key={addon.id}
                      className={`flex items-start gap-2.5 p-3 rounded border cursor-pointer transition-colors ${
                        isChecked
                          ? "border-[#08A832] bg-[#08A832]/10 ring-1 ring-[#08A832]"
                          : "border-[#30343B] bg-[#101216] hover:border-[#4E545F]"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleAddon(addon.id)}
                        className="mt-0.5 accent-[#08A832]"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-white">{addon.name}</span>
                          <span className="text-[#08A832] font-mono font-bold">
                            +{Math.round(addon.percent * 100)}%
                          </span>
                        </div>
                        <p className="text-[11px] text-[#A5A9B0] mt-0.5">
                          {addon.description}
                        </p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* 3. Form Kontak & Akun */}
            <div className="rounded-lg border border-[#30343B] bg-[#181C22] p-5 text-xs">
              <span className="text-xs font-bold text-white block mb-3">
                Data pemesan &amp; akun Mobile Legends
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[#A5A9B0] block mb-1">
                    Nickname &amp; server ID in-game:
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: VanguardUser (1234)"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="w-full rounded border border-[#30343B] bg-[#101216] p-2 text-xs text-white placeholder-[#6B7280] focus:border-[#08A832] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[#A5A9B0] block mb-1">
                    Nomor WhatsApp (wajib untuk koordinasi):
                  </label>
                  <input
                    type="tel"
                    placeholder="Contoh: 081234567890"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full rounded border border-[#30343B] bg-[#101216] p-2 text-xs text-white placeholder-[#6B7280] focus:border-[#08A832] focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[#A5A9B0] block mb-1">
                    Catatan pengerjaan / request hero (opsional):
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Utamakan hero Mage/Assassin, jam main setelah pukul 20.00 WIB..."
                    value={catatan}
                    onChange={(e) => setCatatan(e.target.value)}
                    className="w-full rounded border border-[#30343B] bg-[#101216] p-2 text-xs text-white placeholder-[#6B7280] focus:border-[#08A832] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Sticky Order Summary */}
          <div className="lg:col-span-5 lg:sticky lg:top-20">
            <div className="rounded-lg border border-[#30343B] bg-[#181C22] p-5 shadow-xl">
              
              <div className="border-b border-[#30343B] pb-3 mb-4">
                <span className="text-[11px] font-medium text-[#08A832] block">
                  Ringkasan pesanan transparan
                </span>
                <h3 className="text-lg font-bold text-white">
                  Estimasi biaya Mobile Legends
                </h3>
                <span className="text-xs text-[#A5A9B0]">
                  Mode: <strong className="text-white">{mlbbSelection.serviceMode === "star" ? "Kalkulator fleksibel" : "Paket rank boost"}</strong>
                </span>
              </div>

              {/* Status Error jika konfigurasi belum valid */}
              {!mlbbSelection.isValid && (
                <div className="rounded bg-red-950/50 border border-red-500/40 p-3 mb-4 text-xs text-red-200">
                  ⚠️ {mlbbSelection.errorMessage || "Konfigurasi rank belum valid."}
                </div>
              )}

              {/* Rincian Layanan */}
              <div className="space-y-3 border-b border-[#30343B] pb-4 mb-4 text-xs">
                <div>
                  <div className="font-semibold text-white">
                    {mlbbSelection.serviceMode === "star"
                      ? "Joki rank Mobile Legends (perhitungan per tier)"
                      : mlbbSelection.selectedPackage?.packageName || "Paket rank boost"}
                  </div>
                  <div className="text-[11px] text-[#A5A9B0] mt-0.5">
                    {mlbbSelection.description}
                  </div>
                </div>

                {/* Sub-breakdown per tier untuk mode star */}
                {mlbbSelection.serviceMode === "star" &&
                  mlbbSelection.progressionResult &&
                  mlbbSelection.progressionResult.breakdown.length > 0 && (
                    <div className="space-y-1 rounded bg-[#101216] border border-[#30343B] p-2.5 text-[11px]">
                      <span className="text-[#A5A9B0] font-semibold block mb-1">
                        Rincian biaya per tier:
                      </span>
                      {mlbbSelection.progressionResult.breakdown.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-[#F1F1F1]">
                          <span>
                            {item.tierName} ({item.stars}★ × {formatRupiah(item.pricePerStar)})
                          </span>
                          <span className="font-mono text-white">
                            {formatRupiah(item.subtotal)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                {/* Rincian Add-ons */}
                {addonBreakdown.length > 0 && (
                  <div className="pt-2 border-t border-[#30343B] space-y-1">
                    <span className="text-[11px] text-[#08A832] font-semibold block">
                      Add-on terpilih:
                    </span>
                    {addonBreakdown.map((addon, idx) => (
                      <div key={idx} className="flex justify-between text-[#A5A9B0]">
                        <span>
                          {addon.name} (+{Math.round(addon.percent * 100)}%)
                        </span>
                        <span className="font-mono text-white">
                          +{formatRupiah(addon.amount)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Subtotal & Add-on Summary */}
              <div className="space-y-1.5 text-xs mb-4">
                <div className="flex justify-between text-[#A5A9B0]">
                  <span>Tarif dasar:</span>
                  <span className="font-mono font-semibold text-white">
                    {formatRupiah(basePrice)}
                  </span>
                </div>
                {addonTotal > 0 && (
                  <div className="flex justify-between text-[#A5A9B0]">
                    <span>Biaya add-on (+{Math.round(sumAddonPercent * 100)}%):</span>
                    <span className="font-mono text-[#08A832]">
                      +{formatRupiah(addonTotal)}
                    </span>
                  </div>
                )}
              </div>

              {/* Total Box */}
              <div className="rounded border border-[#08A832] bg-[#101216] p-3 text-left mb-4">
                <span className="text-[11px] text-[#A5A9B0] block">
                  Total estimasi akhir:
                </span>
                <span className="text-2xl font-black text-[#08A832] font-mono block mt-0.5">
                  {formatRupiah(finalTotalPrice)}
                </span>
              </div>

              {/* Tombol Konfirmasi */}
              <button
                type="button"
                disabled={!isOrderReady}
                onClick={() => setIsModalOpen(true)}
                className={`w-full py-2.5 rounded text-xs font-bold transition-colors ${
                  isOrderReady
                    ? "bg-[#08A832] text-[#071B12] hover:bg-[#07952c]"
                    : "bg-[#30343B] text-[#6B7280] cursor-not-allowed"
                }`}
              >
                Konfirmasi pesanan Mobile Legends
              </button>

              <p className="text-[11px] text-[#6B7280] text-center mt-2">
                Simulasi pengerjaan manual tanpa transaksi uang riil.
              </p>

            </div>
          </div>

        </div>
      </div>

      {/* Modal Simulasi Konfirmasi */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-md rounded-lg border border-[#30343B] bg-[#181C22] p-6 shadow-2xl">
            <h4 className="text-lg font-bold text-white mb-2">
              Pesanan Mobile Legends dikonfirmasi (simulasi)
            </h4>
            <p className="text-xs text-[#A5A9B0] mb-4">
              Rincian joki akun Mobile Legends telah dicatat:
            </p>

            <div className="rounded border border-[#30343B] bg-[#101216] p-3 text-xs space-y-2 font-mono mb-4">
              <div className="flex justify-between">
                <span className="text-[#A5A9B0]">Layanan:</span>
                <span className="text-white font-bold">{mlbbSelection.description}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A5A9B0]">ID in-game:</span>
                <span className="text-white">{nickname || "(Belum diisi)"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A5A9B0]">WhatsApp:</span>
                <span className="text-white">{whatsapp || "(Belum diisi)"}</span>
              </div>
              {catatan && (
                <div className="flex justify-between">
                  <span className="text-[#A5A9B0]">Catatan:</span>
                  <span className="text-white">{catatan}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-[#30343B] pt-2 text-sm font-bold">
                <span className="text-[#A5A9B0]">Total estimasi:</span>
                <span className="text-[#08A832]">{formatRupiah(finalTotalPrice)}</span>
              </div>
            </div>

            <p className="text-[11px] text-[#A5A9B0] mb-4">
              Ini adalah proyek portofolio siswa RPL Kelas 11 (VANGUARD BOOST). Pengerjaan disimulasikan sesuai standar joki manual.
            </p>

            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="w-full rounded bg-[#08A832] py-2 text-xs font-bold text-[#071B12] hover:bg-[#07952c]"
            >
              Tutup pratinjau
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
