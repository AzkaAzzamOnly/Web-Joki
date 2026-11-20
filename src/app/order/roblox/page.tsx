"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ROBLOX_EXPERIENCES,
  ADDONS,
  formatRupiah,
  BRAND,
} from "@/data/games";

export default function RobloxOrderPage() {
  // 1. State Experience Roblox (Default: Blox Fruits)
  const [selectedExpId, setSelectedExpId] = useState<string>("blox-fruits");
  const [searchQuery, setSearchQuery] = useState("");

  const currentExp = useMemo(() => {
    return (
      ROBLOX_EXPERIENCES.find((e) => e.id === selectedExpId) ||
      ROBLOX_EXPERIENCES[0]
    );
  }, [selectedExpId]);

  // 2. State Service dalam Experience Aktif
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    currentExp.services[0].id
  );
  const [quantity, setQuantity] = useState<number>(
    currentExp.services[0].defaultUnits
  );

  const currentService = useMemo(() => {
    return (
      currentExp.services.find((s) => s.id === selectedServiceId) ||
      currentExp.services[0]
    );
  }, [currentExp, selectedServiceId]);

  // Sinkronisasi service default ketika experience diganti
  const handleSelectExperience = (expId: string) => {
    setSelectedExpId(expId);
    const exp = ROBLOX_EXPERIENCES.find((e) => e.id === expId);
    if (exp && exp.services[0]) {
      setSelectedServiceId(exp.services[0].id);
      setQuantity(exp.services[0].defaultUnits);
    }
  };

  // 3. State Add-ons
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  // 4. State Data Akun & Kontak
  const [username, setUsername] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [catatan, setCatatan] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter experiences berdasarkan query pencarian
  const filteredExperiences = ROBLOX_EXPERIENCES.filter(
    (exp) =>
      exp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add-on yang kompatibel dengan Roblox
  const robloxAddons = useMemo(() => {
    return ADDONS.filter((a) => a.games.includes("roblox"));
  }, []);

  const toggleAddon = (addonId: string) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter((id) => id !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  // Kalkulasi Harga Dasar & Add-on
  const basePrice = (currentService?.unitPrice || 15000) * quantity;

  const { addonTotal, sumAddonPercent, addonBreakdown } = useMemo(() => {
    let sumPercent = 0;
    const breakdown: { name: string; amount: number; percent: number }[] = [];

    if (basePrice > 0 && selectedAddons.length > 0) {
      for (const addonId of selectedAddons) {
        const addon = ADDONS.find((a) => a.id === addonId);
        if (addon && addon.games.includes("roblox")) {
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
  const isOrderReady = quantity > 0 && basePrice > 0;

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
              Roblox
            </span>
          </div>
        </div>
      </header>

      {/* Hero Header Khusus Roblox */}
      <section className="border-b border-[#30343B] bg-[#181C22]/50 py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded bg-[#101216] border border-[#30343B] px-2.5 py-1 text-xs text-[#EF4444] mb-2 font-medium">
                <span>Multi-experience sandbox</span>
                <span>•</span>
                <span>Leveling &amp; farming manual</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Pemesanan joki &amp; jasa akun Roblox
              </h1>
              <p className="text-xs sm:text-sm text-[#A5A9B0] mt-1 max-w-2xl">
                Layanan leveling, mastery, raid, rebirth, dan net-win di experience populer Blox Fruits, Pet Simulator 99, dan Blade Ball.
              </p>
            </div>

            <div className="rounded border border-[#30343B] bg-[#101216] p-3 text-right shrink-0">
              <span className="text-xs text-[#A5A9B0] block">Experience aktif</span>
              <span className="text-lg font-bold text-[#EF4444] font-mono">
                {currentExp.name}
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
            
            {/* 1. Pemilih Roblox Experience */}
            <div className="rounded-lg border border-[#30343B] bg-[#181C22] p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#30343B] pb-3 mb-4">
                <div>
                  <span className="text-xs font-semibold text-[#EF4444] block">
                    Langkah 1: Pilih judul experience
                  </span>
                  <h3 className="text-base font-bold text-[#F1F1F1] mt-0.5">
                    Experience Roblox yang tersedia
                  </h3>
                </div>

                <div className="w-full sm:w-56">
                  <input
                    type="text"
                    placeholder="Cari judul..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded border border-[#30343B] bg-[#101216] px-2.5 py-1 text-xs text-[#F1F1F1] placeholder-[#6B7280] focus:border-[#EF4444] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {filteredExperiences.map((exp) => {
                  const isSelected = exp.id === selectedExpId;
                  return (
                    <button
                      key={exp.id}
                      type="button"
                      onClick={() => handleSelectExperience(exp.id)}
                      className={`flex flex-col text-left rounded border p-3 transition-all ${
                        isSelected
                          ? "border-[#EF4444] bg-[#221A1D] shadow ring-1 ring-[#EF4444]"
                          : "border-[#30343B] bg-[#101216] hover:border-[#4E545F]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-[#F1F1F1]">
                          {exp.name}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] text-[#EF4444] font-bold">
                            ✓ Aktif
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-[#A5A9B0] mb-1">
                        {exp.genre}
                      </span>
                      <p className="text-[11px] text-[#A5A9B0] line-clamp-2">
                        {exp.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Pemilih Layanan dalam Experience Aktif */}
            <div className="rounded-lg border border-[#30343B] bg-[#181C22] p-5">
              <div className="border-b border-[#30343B] pb-3 mb-4">
                <span className="text-xs font-semibold text-[#EF4444] block">
                  Langkah 2: Pilih jenis layanan &amp; kuantitas
                </span>
                <h3 className="text-base font-bold text-[#F1F1F1] mt-0.5">
                  Layanan untuk {currentExp.name}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {currentExp.services.map((svc) => {
                  const isSelected = selectedServiceId === svc.id;
                  return (
                    <button
                      key={svc.id}
                      type="button"
                      onClick={() => {
                        setSelectedServiceId(svc.id);
                        setQuantity(svc.defaultUnits);
                      }}
                      className={`p-3 rounded border text-left text-xs transition-all ${
                        isSelected
                          ? "border-[#EF4444] bg-[#221A1D] text-[#F1F1F1] font-bold shadow ring-1 ring-[#EF4444]"
                          : "border-[#30343B] bg-[#101216] text-[#A5A9B0] hover:border-[#4E545F]"
                      }`}
                    >
                      <div className="font-bold text-sm text-[#F1F1F1] mb-0.5">
                        {svc.name}
                      </div>
                      <span className="text-[#A5A9B0]">
                        {formatRupiah(svc.unitPrice)} / {svc.unit}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Slider Kuantitas */}
              <div className="rounded border border-[#30343B] bg-[#101216] p-3.5 text-xs">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[#A5A9B0]">
                    Kuantitas ({currentService.unit}):
                  </span>
                  <span className="text-sm font-bold text-[#EF4444] font-mono">
                    {quantity} × {currentService.unit} = {formatRupiah(basePrice)}
                  </span>
                </div>
                <input
                  type="range"
                  min={currentService.minUnits}
                  max={currentService.maxUnits}
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(
                      Math.max(
                        currentService.minUnits,
                        parseInt(e.target.value) || currentService.minUnits
                      )
                    )
                  }
                  className="w-full accent-[#EF4444]"
                />
                <div className="flex justify-between text-[10px] text-[#A5A9B0] mt-1 font-mono">
                  <span>Min: {currentService.minUnits}</span>
                  <span>Maks: {currentService.maxUnits}</span>
                </div>
              </div>
            </div>

            {/* 3. Opsi Tambahan (Add-ons) */}
            <div className="rounded-lg border border-[#30343B] bg-[#181C22] p-5 text-xs">
              <span className="text-xs font-bold text-white block mb-1">
                Opsi tambahan (add-on layanan)
              </span>
              <p className="text-[11px] text-[#A5A9B0] mb-3">
                Fitur pengerjaan kilat, mode mabar (duo), dan live streaming Discord. Dihitung secara aditif dari tarif dasar.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {robloxAddons.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <label
                      key={addon.id}
                      className={`flex items-start gap-2.5 p-3 rounded border cursor-pointer transition-colors ${
                        isChecked
                          ? "border-[#EF4444] bg-[#221A1D]"
                          : "border-[#30343B] bg-[#101216] hover:border-[#4E545F]"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleAddon(addon.id)}
                        className="mt-0.5 accent-[#EF4444]"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-white">{addon.name}</span>
                          <span className="text-[#EF4444] font-mono font-bold">
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

            {/* 4. Form Kontak & Akun */}
            <div className="rounded-lg border border-[#30343B] bg-[#181C22] p-5 text-xs">
              <span className="text-xs font-bold text-white block mb-3">
                Data pemesan &amp; akun Roblox
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[#A5A9B0] block mb-1">
                    Username akun Roblox:
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: RobloxPlayer123"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full rounded border border-[#30343B] bg-[#101216] p-2 text-xs text-white placeholder-[#6B7280] focus:border-[#EF4444] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[#A5A9B0] block mb-1">
                    Nomor WhatsApp (wajib):
                  </label>
                  <input
                    type="tel"
                    placeholder="Contoh: 081234567890"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full rounded border border-[#30343B] bg-[#101216] p-2 text-xs text-white placeholder-[#6B7280] focus:border-[#EF4444] focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[#A5A9B0] block mb-1">
                    Catatan pengerjaan (opsional):
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Pengerjaan di VIP server atau main bareng mode mabar..."
                    value={catatan}
                    onChange={(e) => setCatatan(e.target.value)}
                    className="w-full rounded border border-[#30343B] bg-[#101216] p-2 text-xs text-white placeholder-[#6B7280] focus:border-[#EF4444] focus:outline-none"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Kolom Kanan: Sticky Order Summary */}
          <div className="lg:col-span-5 lg:sticky lg:top-20">
            <div className="rounded-lg border border-[#30343B] bg-[#181C22] p-5 shadow-xl">
              
              <div className="border-b border-[#30343B] pb-3 mb-4">
                <span className="text-[11px] font-medium text-[#EF4444] block">
                  Ringkasan pesanan transparan
                </span>
                <h3 className="text-lg font-bold text-white">
                  Estimasi biaya Roblox
                </h3>
                <span className="text-xs text-[#A5A9B0]">
                  Experience: <strong className="text-white">{currentExp.name}</strong>
                </span>
              </div>

              {/* Rincian Layanan */}
              <div className="space-y-3 border-b border-[#30343B] pb-4 mb-4 text-xs">
                <div>
                  <div className="font-semibold text-white">
                    {currentService.name}
                  </div>
                  <div className="text-[11px] text-[#A5A9B0] mt-0.5">
                    {quantity} × {currentService.unit} ({formatRupiah(currentService.unitPrice)}/{currentService.unit})
                  </div>
                </div>

                {/* Rincian Add-ons */}
                {addonBreakdown.length > 0 && (
                  <div className="pt-2 border-t border-[#30343B] space-y-1">
                    <span className="text-[11px] text-[#EF4444] font-semibold block">
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
                  <span>Tarif dasar layanan:</span>
                  <span className="font-mono font-semibold text-white">
                    {formatRupiah(basePrice)}
                  </span>
                </div>
                {addonTotal > 0 && (
                  <div className="flex justify-between text-[#A5A9B0]">
                    <span>Biaya add-on (+{Math.round(sumAddonPercent * 100)}%):</span>
                    <span className="font-mono text-[#EF4444]">
                      +{formatRupiah(addonTotal)}
                    </span>
                  </div>
                )}
              </div>

              {/* Total Box */}
              <div className="rounded border border-[#EF4444] bg-[#101216] p-3 text-left mb-4">
                <span className="text-[11px] text-[#A5A9B0] block">
                  Total estimasi akhir:
                </span>
                <span className="text-2xl font-black text-[#EF4444] font-mono block mt-0.5">
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
                    ? "bg-[#EF4444] text-white hover:bg-[#dc2626]"
                    : "bg-[#30343B] text-[#6B7280] cursor-not-allowed"
                }`}
              >
                Konfirmasi pesanan Roblox
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
              Pesanan Roblox dikonfirmasi (simulasi)
            </h4>
            <p className="text-xs text-[#A5A9B0] mb-4">
              Rincian pesanan layanan Roblox telah dicatat:
            </p>

            <div className="rounded border border-[#30343B] bg-[#101216] p-3 text-xs space-y-2 font-mono mb-4">
              <div className="flex justify-between">
                <span className="text-[#A5A9B0]">Experience:</span>
                <span className="text-white font-bold">{currentExp.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A5A9B0]">Layanan:</span>
                <span className="text-white">{currentService.name} ({quantity} unit)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A5A9B0]">Username Roblox:</span>
                <span className="text-white">{username || "(Belum diisi)"}</span>
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
                <span className="text-[#EF4444]">{formatRupiah(finalTotalPrice)}</span>
              </div>
            </div>

            <p className="text-[11px] text-[#A5A9B0] mb-4">
              Ini adalah proyek portofolio siswa RPL Kelas 11 (VANGUARD BOOST). Pengerjaan disimulasikan secara manual tanpa script/exploit.
            </p>

            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="w-full rounded bg-[#EF4444] py-2 text-xs font-bold text-white hover:bg-[#dc2626]"
            >
              Tutup pratinjau
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
