"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  GameItem,
  ROBLOX_EXPERIENCES,
  ADDONS,
  formatRupiah,
} from "@/data/games";
import MobileLegendsCatalog, { MLBBSelection } from "./MobileLegendsCatalog";
import GenshinCatalog, { GenshinCartItem } from "./GenshinCatalog";

interface ServicesProps {
  selectedGame: GameItem;
  selectedRobloxExperienceId: string;
}

export default function Services({
  selectedGame,
  selectedRobloxExperienceId,
}: ServicesProps) {
  // 1. State Mobile Legends Selection
  const [mlbbSelection, setMlbbSelection] = useState<MLBBSelection>({
    serviceMode: "star",
    startTierId: "epic",
    startStars: 1,
    targetTierId: "legend",
    targetStars: 5,
    selectedPackage: null,
    basePrice: 50000,
    description: "Epic (1★) → Legend (5★)",
    isValid: true,
  });

  // 2. State Genshin Impact Cart (Multi-Selection)
  const [genshinCart, setGenshinCart] = useState<GenshinCartItem[]>([
    {
      id: "init_exp_fontaine",
      serviceId: "exp_fontaine_full",
      name: "Fontaine (Full Region)",
      category: "explore",
      displayPrice: "1k / 1%",
      calculatedPrice: 100000,
      percentage: 100,
      note: "100% Progres",
    },
    {
      id: "init_quest_world",
      serviceId: "quest_world",
      name: "World Quest",
      category: "quest",
      displayPrice: "25k",
      calculatedPrice: 25000,
    },
  ]);

  // 3. State Roblox Experience Service
  const [robloxServiceId, setRobloxServiceId] = useState<string>("bf_level");
  const [robloxQuantity, setRobloxQuantity] = useState<number>(5);

  // 4. State Shared Add-ons
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  // 5. State Data Kontak Pelanggan
  const [nickname, setNickname] = useState<string>("");
  const [whatsapp, setWhatsapp] = useState<string>("");
  const [catatan, setCatatan] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Roblox Experience yang sedang aktif
  const currentRobloxExp = useMemo(() => {
    return (
      ROBLOX_EXPERIENCES.find((e) => e.id === selectedRobloxExperienceId) ||
      ROBLOX_EXPERIENCES[0]
    );
  }, [selectedRobloxExperienceId]);

  // Sinkronisasi default service jika berganti game
  useEffect(() => {
    if (selectedGame.id === "roblox" && currentRobloxExp?.services[0]) {
      setRobloxServiceId(currentRobloxExp.services[0].id);
      setRobloxQuantity(currentRobloxExp.services[0].defaultUnits);
    }

    // Bersihkan add-on yang tidak kompatibel dengan game yang baru dipilih
    setSelectedAddons((prev) =>
      prev.filter((id) => {
        const addon = ADDONS.find((a) => a.id === id);
        return addon && addon.games.includes(selectedGame.id);
      })
    );
  }, [selectedGame.id, currentRobloxExp]);

  // Handler Add to Cart Genshin
  const handleAddGenshinItem = (item: GenshinCartItem) => {
    setGenshinCart((prev) => [...prev, item]);
  };

  // Handler Remove from Cart Genshin
  const handleRemoveGenshinItem = (cartEntryId: string) => {
    setGenshinCart((prev) => prev.filter((it) => it.id !== cartEntryId));
  };

  // Handler Toggle Addon
  const toggleAddon = (addonId: string) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter((id) => id !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  // Addons yang relevan untuk game aktif
  const applicableAddons = useMemo(() => {
    return ADDONS.filter((a) => a.games.includes(selectedGame.id));
  }, [selectedGame.id]);

  // 6. Kalkulasi Harga Dasar (Base Price) berdasarkan game
  const basePrice = useMemo(() => {
    if (selectedGame.id === "mlbb") {
      return mlbbSelection.isValid ? mlbbSelection.basePrice : 0;
    }
    if (selectedGame.id === "genshin") {
      return genshinCart.reduce((sum, item) => sum + item.calculatedPrice, 0);
    }
    if (selectedGame.id === "roblox") {
      const svc =
        currentRobloxExp?.services.find((s) => s.id === robloxServiceId) ||
        currentRobloxExp?.services[0];
      return (svc?.unitPrice || 15000) * robloxQuantity;
    }
    return 0;
  }, [
    selectedGame.id,
    mlbbSelection,
    genshinCart,
    currentRobloxExp,
    robloxServiceId,
    robloxQuantity,
  ]);

  // 7. Kalkulasi Add-ons (Formula Aditif: Total = Base * (1 + sum % addons))
  const { addonTotal, sumAddonPercent, addonBreakdown } = useMemo(() => {
    let sumPercent = 0;
    const breakdown: { name: string; amount: number; percent: number }[] = [];

    if (basePrice > 0 && selectedAddons.length > 0) {
      for (const addonId of selectedAddons) {
        const addon = ADDONS.find((a) => a.id === addonId);
        if (addon && addon.games.includes(selectedGame.id)) {
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

    const addonTotal = Math.round(basePrice * sumPercent);
    return { addonTotal, sumAddonPercent: sumPercent, addonBreakdown: breakdown };
  }, [basePrice, selectedAddons, selectedGame.id]);

  const finalTotalPrice = basePrice + addonTotal;

  // Status Validitas Order
  const isOrderValid = useMemo(() => {
    if (selectedGame.id === "mlbb") {
      return mlbbSelection.isValid && mlbbSelection.basePrice > 0;
    }
    if (selectedGame.id === "genshin") {
      return genshinCart.length > 0 && basePrice > 0;
    }
    if (selectedGame.id === "roblox") {
      return robloxQuantity > 0 && basePrice > 0;
    }
    return false;
  }, [selectedGame.id, mlbbSelection, genshinCart, robloxQuantity, basePrice]);

  return (
    <section id="kalkulator" className="border-b border-[#30343B] bg-[#101216] py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        
        {/* Header Seksi */}
        <div className="border-b border-[#30343B] pb-4 mb-6">
          <span
            className="text-xs font-mono font-bold  tracking-wider"
            style={{ color: selectedGame.accentColor }}
          >
            Katalog Layanan &amp; Pemesanan
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#F1F1F1] mt-0.5">
            Layanan Aktif: {selectedGame.name}
          </h2>
          <p className="text-xs sm:text-sm text-[#A5A9B0] mt-1">
            Konfigurasi kebutuhan joki akun kamu di bawah ini. Semua harga ditampilkan secara terbuka dan otomatis terhitung pada ringkasan pesanan.
          </p>
        </div>

        {/* Layout 2 Kolom: Katalog Game (Kiri) + Order Summary (Kanan) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* KOLOM KIRI: KATALOG SESUAI GAME YANG DIPILIH             */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. KATALOG MOBILE LEGENDS (Identitas Hijau & Gelap) */}
            {selectedGame.id === "mlbb" && (
              <MobileLegendsCatalog onSelectionChange={setMlbbSelection} />
            )}

            {/* 2. KATALOG GENSHIN IMPACT (Identitas Dark Fantasy & Multi-Category) */}
            {selectedGame.id === "genshin" && (
              <GenshinCatalog
                cartItems={genshinCart}
                onAddToCart={handleAddGenshinItem}
                onRemoveFromCart={handleRemoveGenshinItem}
              />
            )}

            {/* 3. KATALOG ROBLOX EXPERIENCE */}
            {selectedGame.id === "roblox" && (
              <div className="rounded-lg border border-[#30343B] bg-[#181C22] p-5">
                <div className="border-b border-[#30343B] pb-3 mb-4">
                  <span className="text-xs font-mono font-bold text-[#EF4444] ">
                    Experience: {currentRobloxExp.name}
                  </span>
                  <h3 className="text-lg font-bold text-[#F1F1F1] mt-0.5">
                    Pilih Layanan Roblox
                  </h3>
                  <p className="text-xs text-[#A5A9B0]">
                    Pilih paket pengerjaan untuk {currentRobloxExp.name}.
                  </p>
                </div>

                {/* Pilihan Layanan */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                  {currentRobloxExp.services.map((svc) => {
                    const isSelected = robloxServiceId === svc.id;
                    return (
                      <button
                        key={svc.id}
                        type="button"
                        onClick={() => {
                          setRobloxServiceId(svc.id);
                          setRobloxQuantity(svc.defaultUnits);
                        }}
                        className={`p-3 rounded border text-left text-xs transition-all ${
                          isSelected
                            ? "border-[#EF4444] bg-[#221A1D] text-[#F1F1F1] font-bold"
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

                {/* Input Kuantitas */}
                <div className="rounded border border-[#30343B] bg-[#101216] p-3 text-xs">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[#A5A9B0]">Kuantitas Pengerjaan:</span>
                    <span className="text-sm font-bold text-[#EF4444] font-mono">
                      {robloxQuantity} Unit
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={25}
                    value={robloxQuantity}
                    onChange={(e) => setRobloxQuantity(parseInt(e.target.value) || 1)}
                    className="w-full accent-[#EF4444]"
                  />
                </div>
              </div>
            )}

            {/* OPSI TAMBAHAN (ADD-ONS) */}
            <div className="rounded-lg border border-[#30343B] bg-[#181C22] p-4 text-xs">
              <span className="text-xs font-bold text-[#F1F1F1]  block mb-1 font-mono">
                Opsi Tambahan (Add-on)
              </span>
              <p className="text-[11px] text-[#A5A9B0] mb-3">
                Pilihan fitur tambahan dengan persentase harga aditif dihitung dari tarif dasar.
              </p>

              {applicableAddons.length === 0 ? (
                <p className="text-[#A5A9B0]">Tidak ada add-on untuk game ini.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {applicableAddons.map((addon) => {
                    const isChecked = selectedAddons.includes(addon.id);
                    return (
                      <label
                        key={addon.id}
                        className={`flex items-start gap-2.5 p-3 rounded border cursor-pointer transition-colors ${
                          isChecked
                            ? "border-[#E5A93B] bg-[#221C16]"
                            : "border-[#30343B] bg-[#101216] hover:border-[#4E545F]"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleAddon(addon.id)}
                          className="mt-0.5 accent-[#E5A93B]"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-[#F1F1F1]">{addon.name}</span>
                            <span className="text-[#E5A93B] font-mono font-bold">
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
              )}
            </div>

            {/* FORM DATA PEMESAN */}
            <div className="rounded-lg border border-[#30343B] bg-[#181C22] p-4 text-xs">
              <span className="text-xs font-bold text-[#F1F1F1]  block mb-3 font-mono">
                Data Pemesan &amp; Koordinasi
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[#A5A9B0] block mb-1">
                    Nickname / ID Akun In-Game:
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: User#1234"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="w-full rounded border border-[#30343B] bg-[#101216] p-2 text-xs text-[#F1F1F1] placeholder-[#6B7280] focus:border-[#E5A93B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[#A5A9B0] block mb-1">
                    Nomor WhatsApp (Wajib):
                  </label>
                  <input
                    type="tel"
                    placeholder="Contoh: 081234567890"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full rounded border border-[#30343B] bg-[#101216] p-2 text-xs text-[#F1F1F1] placeholder-[#6B7280] focus:border-[#E5A93B] focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[#A5A9B0] block mb-1">
                    Catatan Pengerjaan (Opsional):
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Jam main malam saja, utamakan karakter tertentu..."
                    value={catatan}
                    onChange={(e) => setCatatan(e.target.value)}
                    className="w-full rounded border border-[#30343B] bg-[#101216] p-2 text-xs text-[#F1F1F1] placeholder-[#6B7280] focus:border-[#E5A93B] focus:outline-none"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* ======================================================== */}
          {/* KOLOM KANAN: SHARED ORDER SUMMARY (INVOICE RINGKASAN)     */}
          {/* ======================================================== */}
          <div className="lg:col-span-5 lg:sticky lg:top-20">
            <div className="rounded-lg border border-[#30343B] bg-[#181C22] p-5 shadow-xl">
              
              <div className="border-b border-[#30343B] pb-3 mb-4">
                <span className="text-[11px] font-mono text-[#E5A93B] ">
                  Ringkasan Pesanan Transparan
                </span>
                <h3 className="text-lg font-bold text-[#F1F1F1]">Estimasi Biaya</h3>
                <span className="text-xs text-[#A5A9B0]">
                  Game: <strong className="text-white">{selectedGame.name}</strong>
                </span>
              </div>

              {/* Status Error Jika Tidak Valid */}
              {!isOrderValid && (
                <div className="rounded bg-red-950/40 border border-red-500/40 p-3 mb-4 text-xs text-red-200">
                  ⚠️{" "}
                  {selectedGame.id === "mlbb"
                    ? mlbbSelection.errorMessage || "Konfigurasi rank belum valid."
                    : selectedGame.id === "genshin"
                    ? "Pilih minimal 1 layanan Genshin Impact dari katalog."
                    : "Pilih kuantitas layanan Roblox yang valid."}
                </div>
              )}

              {/* Daftar Rincian Layanan (Itemized Breakdown) */}
              <div className="space-y-2 border-b border-[#30343B] pb-4 mb-4 text-xs">
                
                {/* 1. Mobile Legends Breakdown */}
                {selectedGame.id === "mlbb" && (
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-white">
                        {mlbbSelection.serviceMode === "star"
                          ? "Joki Rank MLBB (per Star)"
                          : mlbbSelection.selectedPackage?.packageName || "Paket Joki MLBB"}
                      </div>
                      <div className="text-[11px] text-[#A5A9B0]">
                        {mlbbSelection.description}
                      </div>
                    </div>
                    <span className="font-mono text-white font-bold shrink-0 ml-2">
                      {formatRupiah(mlbbSelection.basePrice)}
                    </span>
                  </div>
                )}

                {/* 2. Genshin Impact Multi-Item Breakdown */}
                {selectedGame.id === "genshin" && (
                  <div className="space-y-2">
                    {genshinCart.length === 0 ? (
                      <p className="text-[#6B7280] italic">
                        Belum ada layanan yang ditambahkan. Silakan klik &quot;+ Tambah Layanan&quot; pada katalog di sebelah kiri.
                      </p>
                    ) : (
                      genshinCart.map((item) => (
                        <div key={item.id} className="flex justify-between items-center group">
                          <div>
                            <div className="text-white font-medium">{item.name}</div>
                            {item.note && (
                              <div className="text-[11px] text-[#D4A359]">{item.note}</div>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-white">
                              {formatRupiah(item.calculatedPrice)}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRemoveGenshinItem(item.id)}
                              className="text-red-400 hover:text-red-300 font-bold px-1"
                              title="Hapus"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* 3. Roblox Breakdown */}
                {selectedGame.id === "roblox" && (
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-white">
                        {currentRobloxExp.name}
                      </div>
                      <div className="text-[11px] text-[#A5A9B0]">
                        {currentRobloxExp.services.find((s) => s.id === robloxServiceId)?.name} ({robloxQuantity} Unit)
                      </div>
                    </div>
                    <span className="font-mono text-white font-bold">
                      {formatRupiah(basePrice)}
                    </span>
                  </div>
                )}

                {/* Rincian Add-ons */}
                {addonBreakdown.length > 0 && (
                  <div className="pt-2 border-t border-[#30343B]/60 space-y-1">
                    <span className="text-[11px] text-[#E5A93B] font-bold block">
                      Opsi Tambahan:
                    </span>
                    {addonBreakdown.map((addon, idx) => (
                      <div key={idx} className="flex justify-between text-[#A5A9B0]">
                        <span>
                          {addon.name} (+{Math.round(addon.percent * 100)}%)
                        </span>
                        <span className="font-mono">
                          +{formatRupiah(addon.amount)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Subtotal & Total Akhir */}
              <div className="space-y-1.5 text-xs mb-4">
                <div className="flex justify-between text-[#A5A9B0]">
                  <span>Tarif Dasar:</span>
                  <span className="font-mono font-semibold text-white">
                    {formatRupiah(basePrice)}
                  </span>
                </div>
                {addonTotal > 0 && (
                  <div className="flex justify-between text-[#A5A9B0]">
                    <span>Biaya Add-on (+{Math.round(sumAddonPercent * 100)}%):</span>
                    <span className="font-mono text-[#E5A93B]">
                      +{formatRupiah(addonTotal)}
                    </span>
                  </div>
                )}
              </div>

              {/* Total Box */}
              <div className="rounded border border-[#30343B] bg-[#101216] p-3 text-left mb-4">
                <span className="text-[11px] text-[#A5A9B0] block">
                  Total Estimasi Akhir:
                </span>
                <span className="text-2xl font-black text-[#E5A93B] font-mono block mt-0.5">
                  {formatRupiah(finalTotalPrice)}
                </span>
              </div>

              {/* Tombol Konfirmasi Pesanan */}
              <button
                type="button"
                disabled={!isOrderValid}
                onClick={() => setIsModalOpen(true)}
                className={`w-full py-2.5 rounded text-xs font-bold  tracking-wider transition-colors ${
                  isOrderValid
                    ? "bg-[#E5A93B] text-[#101216] hover:bg-[#d89d31]"
                    : "bg-[#30343B] text-[#6B7280] cursor-not-allowed"
                }`}
              >
                Konfirmasi Pesanan (Simulasi)
              </button>

              <p className="text-[11px] text-[#6B7280] text-center mt-2">
                Simulasi pengerjaan manual tanpa transaksi uang riil.
              </p>

            </div>
          </div>

        </div>

      </div>

      {/* MODAL SIMULASI KONFIRMASI ORDER */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-md rounded-lg border border-[#30343B] bg-[#181C22] p-6 shadow-2xl">
            <h4 className="text-lg font-bold text-[#F1F1F1] mb-2">
              Pesanan Telah Dikonfirmasi (Simulasi)
            </h4>
            <p className="text-xs text-[#A5A9B0] mb-4">
              Rincian pesanan telah tercatat dalam sistem demonstrasi Zyra Store:
            </p>

            <div className="rounded border border-[#30343B] bg-[#101216] p-3 text-xs space-y-1.5 font-mono mb-4">
              <div className="flex justify-between">
                <span className="text-[#A5A9B0]">Game:</span>
                <span className="text-white font-bold">{selectedGame.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A5A9B0]">ID / Nickname:</span>
                <span className="text-white">{nickname || "(Belum diisi)"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A5A9B0]">WhatsApp:</span>
                <span className="text-white">{whatsapp || "(Belum diisi)"}</span>
              </div>
              <div className="flex justify-between border-t border-[#30343B] pt-1.5 text-sm font-bold">
                <span className="text-[#A5A9B0]">Total Estimasi:</span>
                <span className="text-[#E5A93B]">{formatRupiah(finalTotalPrice)}</span>
              </div>
            </div>

            <p className="text-[11px] text-[#A5A9B0] mb-4">
              Catatan: Ini adalah simulasi frontend siswa RPL. Integrasi sistem pembayaran (Midtrans/Xendit) disiapkan untuk tahap implementasi backend.
            </p>

            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="w-full rounded bg-[#E5A93B] py-2 text-xs font-bold text-[#101216] hover:bg-[#d89d31]"
            >
              Tutup Pratinjau
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
