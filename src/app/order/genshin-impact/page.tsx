"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import GenshinCatalog, { GenshinCartItem } from "@/components/GenshinCatalog";
import { ADDONS, formatRupiah, BRAND } from "@/data/games";
import { GENSHIN_THEME } from "@/data/genshin-services";

export default function GenshinImpactOrderPage() {
  // 1. State Keranjang Layanan Genshin (Multi-Item)
  const [cartItems, setCartItems] = useState<GenshinCartItem[]>([
    {
      id: "init_exp_fontaine",
      serviceId: "exp_fontaine_full",
      name: "Fontaine (Full Region)",
      category: "explore",
      displayPrice: "1k / 1%",
      calculatedPrice: 100000,
      percentage: 100,
      note: "100% eksplorasi (1k / 1%)",
    },
  ]);

  // 2. State Add-ons
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  // 3. State Data Kontak & Akun
  const [uid, setUid] = useState("");
  const [server, setServer] = useState("Asia");
  const [whatsapp, setWhatsapp] = useState("");
  const [catatan, setCatatan] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Add-on yang kompatibel dengan Genshin Impact
  const genshinAddons = useMemo(() => {
    return ADDONS.filter((a) => a.games.includes("genshin"));
  }, []);

  const toggleAddon = (addonId: string) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter((id) => id !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  const handleAddToCart = (item: GenshinCartItem) => {
    setCartItems((prev) => [...prev, item]);
  };

  const handleRemoveFromCart = (cartEntryId: string) => {
    setCartItems((prev) => prev.filter((it) => it.id !== cartEntryId));
  };

  // Kalkulasi Harga Dasar & Add-on
  const basePrice = useMemo(() => {
    return cartItems.reduce((acc, it) => acc + it.calculatedPrice, 0);
  }, [cartItems]);

  const { addonTotal, sumAddonPercent, addonBreakdown } = useMemo(() => {
    let sumPercent = 0;
    const breakdown: { name: string; amount: number; percent: number }[] = [];

    if (basePrice > 0 && selectedAddons.length > 0) {
      for (const addonId of selectedAddons) {
        const addon = ADDONS.find((a) => a.id === addonId);
        if (addon && addon.games.includes("genshin")) {
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
  const isOrderReady = cartItems.length > 0 && basePrice > 0;

  return (
    <main
      style={{ backgroundColor: GENSHIN_THEME.bg, color: GENSHIN_THEME.textMain }}
      className="min-h-screen pb-16"
    >
      {/* Top Bar Navigasi */}
      <header className="border-b border-[#272D3B] bg-[#0E1015]/95 backdrop-blur sticky top-0 z-40">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-semibold text-[#9BA2AF] hover:text-white transition-colors"
          >
            <span>←</span>
            <span>Kembali ke beranda</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="font-bold text-xs tracking-wide text-white">
              Genshin Impact
            </span>
          </div>
        </div>
      </header>

      {/* Hero Header Khusus Genshin */}
      <section className="border-b border-[#272D3B] bg-[#151820]/60 py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded bg-[#0E1015] border border-[#272D3B] px-2.5 py-1 text-xs text-[#D4A359] mb-2 font-medium">
                <span>Action RPG open world</span>
                <span>•</span>
                <span>100% pengerjaan manual</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Pemesanan jasa akun Genshin Impact
              </h1>
              <p className="text-xs sm:text-sm text-[#9BA2AF] mt-1 max-w-2xl">
                Katalog resmi 9 kategori layanan: Explore Map, Rawat Akun, Quest, Intertwined Fate, Primogems, Talent, Aranara, Level Up Karakter &amp; Senjata.
              </p>
            </div>

            <div className="rounded border border-[#272D3B] bg-[#0E1015] p-3 text-right shrink-0">
              <span className="text-xs text-[#9BA2AF] block">Tarif explore mulai dari</span>
              <span className="text-lg font-bold text-[#D4A359] font-mono">
                500p / 1% (Mondstadt)
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
            {/* 1. Katalog Genshin Impact (9 Kategori) */}
            <GenshinCatalog
              cartItems={cartItems}
              onAddToCart={handleAddToCart}
              onRemoveFromCart={handleRemoveFromCart}
            />

            {/* 2. Opsi Tambahan (Add-ons) */}
            <div className="rounded-lg border border-[#272D3B] bg-[#151820] p-5 text-xs">
              <span className="text-xs font-bold text-white block mb-1">
                Opsi tambahan (add-on layanan)
              </span>
              <p className="text-[11px] text-[#9BA2AF] mb-3">
                Fitur pengerjaan kilat dan live streaming Discord. Dihitung secara aditif dari total tarif dasar.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {genshinAddons.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <label
                      key={addon.id}
                      className={`flex items-start gap-2.5 p-3 rounded border cursor-pointer transition-colors ${
                        isChecked
                          ? "border-[#D4A359] bg-[#0E1015]"
                          : "border-[#272D3B] bg-[#0E1015]/60 hover:border-[#3D4558]"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleAddon(addon.id)}
                        className="mt-0.5 accent-[#D4A359]"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-white">{addon.name}</span>
                          <span className="text-[#D4A359] font-mono font-bold">
                            +{Math.round(addon.percent * 100)}%
                          </span>
                        </div>
                        <p className="text-[11px] text-[#9BA2AF] mt-0.5">
                          {addon.description}
                        </p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* 3. Form Kontak & Akun */}
            <div className="rounded-lg border border-[#272D3B] bg-[#151820] p-5 text-xs">
              <span className="text-xs font-bold text-white block mb-3">
                Data pemesan &amp; akun Genshin Impact
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[#9BA2AF] block mb-1">
                    UID in-game (9 digit):
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: 812345678"
                    value={uid}
                    onChange={(e) => setUid(e.target.value)}
                    className="w-full rounded border border-[#272D3B] bg-[#0E1015] p-2 text-xs text-white placeholder-[#5A6273] focus:border-[#D4A359] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[#9BA2AF] block mb-1">
                    Server akun:
                  </label>
                  <select
                    value={server}
                    onChange={(e) => setServer(e.target.value)}
                    className="w-full rounded border border-[#272D3B] bg-[#0E1015] p-2 text-xs text-white focus:border-[#D4A359] focus:outline-none"
                  >
                    <option value="Asia">Server Asia</option>
                    <option value="America">Server America</option>
                    <option value="Europe">Server Europe</option>
                    <option value="TW/HK/MO">Server TW/HK/MO</option>
                  </select>
                </div>

                <div>
                  <label className="text-[#9BA2AF] block mb-1">
                    Nomor WhatsApp (wajib):
                  </label>
                  <input
                    type="tel"
                    placeholder="Contoh: 081234567890"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full rounded border border-[#272D3B] bg-[#0E1015] p-2 text-xs text-white placeholder-[#5A6273] focus:border-[#D4A359] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[#9BA2AF] block mb-1">
                    Catatan pengerjaan (opsional):
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Jam resin malam, jangan gunakan fragile resin..."
                    value={catatan}
                    onChange={(e) => setCatatan(e.target.value)}
                    className="w-full rounded border border-[#272D3B] bg-[#0E1015] p-2 text-xs text-white placeholder-[#5A6273] focus:border-[#D4A359] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Sticky Order Summary */}
          <div className="lg:col-span-5 lg:sticky lg:top-20">
            <div className="rounded-lg border border-[#272D3B] bg-[#151820] p-5 shadow-xl">
              
              <div className="border-b border-[#272D3B] pb-3 mb-4">
                <span className="text-[11px] font-medium text-[#D4A359] block">
                  Ringkasan pesanan transparan
                </span>
                <h3 className="text-lg font-bold text-white">
                  Estimasi biaya Genshin Impact
                </h3>
                <span className="text-xs text-[#9BA2AF]">
                  Total layanan: <strong className="text-white">{cartItems.length} item terpilih</strong>
                </span>
              </div>

              {/* Status Error jika keranjang kosong */}
              {cartItems.length === 0 && (
                <div className="rounded bg-red-950/50 border border-red-500/40 p-3 mb-4 text-xs text-red-200">
                  ⚠️ Silakan pilih minimal 1 layanan dari katalog Genshin di sebelah kiri.
                </div>
              )}

              {/* Rincian Item di Keranjang */}
              <div className="space-y-2 border-b border-[#272D3B] pb-4 mb-4 text-xs">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center group">
                    <div>
                      <div className="text-white font-medium">{item.name}</div>
                      <div className="text-[11px] text-[#9BA2AF]">
                        [{item.displayPrice}] {item.note ? `• ${item.note}` : ""}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-white font-semibold">
                        {formatRupiah(item.calculatedPrice)}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFromCart(item.id)}
                        className="text-red-400 hover:text-red-300 font-bold px-1 text-xs"
                        title="Hapus item"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}

                {/* Rincian Add-ons */}
                {addonBreakdown.length > 0 && (
                  <div className="pt-2 border-t border-[#272D3B] space-y-1">
                    <span className="text-[11px] text-[#D4A359] font-semibold block">
                      Add-on terpilih:
                    </span>
                    {addonBreakdown.map((addon, idx) => (
                      <div key={idx} className="flex justify-between text-[#9BA2AF]">
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
                <div className="flex justify-between text-[#9BA2AF]">
                  <span>Tarif dasar layanan:</span>
                  <span className="font-mono font-semibold text-white">
                    {formatRupiah(basePrice)}
                  </span>
                </div>
                {addonTotal > 0 && (
                  <div className="flex justify-between text-[#9BA2AF]">
                    <span>Biaya add-on (+{Math.round(sumAddonPercent * 100)}%):</span>
                    <span className="font-mono text-[#D4A359]">
                      +{formatRupiah(addonTotal)}
                    </span>
                  </div>
                )}
              </div>

              {/* Total Box */}
              <div className="rounded border border-[#D4A359] bg-[#0E1015] p-3 text-left mb-4">
                <span className="text-[11px] text-[#9BA2AF] block">
                  Total estimasi akhir:
                </span>
                <span className="text-2xl font-black text-[#D4A359] font-mono block mt-0.5">
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
                    ? "bg-[#D4A359] text-[#0E1015] hover:bg-[#c49349]"
                    : "bg-[#272D3B] text-[#5A6273] cursor-not-allowed"
                }`}
              >
                Konfirmasi pesanan Genshin Impact
              </button>

              <p className="text-[11px] text-[#5A6273] text-center mt-2">
                Simulasi pengerjaan manual tanpa transaksi uang riil.
              </p>

            </div>
          </div>

        </div>
      </div>

      {/* Modal Simulasi Konfirmasi */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-md rounded-lg border border-[#272D3B] bg-[#151820] p-6 shadow-2xl">
            <h4 className="text-lg font-bold text-white mb-2">
              Pesanan Genshin Impact dikonfirmasi (simulasi)
            </h4>
            <p className="text-xs text-[#9BA2AF] mb-4">
              Rincian pesanan layanan Genshin Impact telah dicatat:
            </p>

            <div className="rounded border border-[#272D3B] bg-[#0E1015] p-3 text-xs space-y-2 font-mono mb-4">
              <div className="flex justify-between">
                <span className="text-[#9BA2AF]">Total item:</span>
                <span className="text-white font-bold">{cartItems.length} layanan</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9BA2AF]">UID / server:</span>
                <span className="text-white">{uid || "(Belum diisi)"} ({server})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9BA2AF]">WhatsApp:</span>
                <span className="text-white">{whatsapp || "(Belum diisi)"}</span>
              </div>
              {catatan && (
                <div className="flex justify-between">
                  <span className="text-[#9BA2AF]">Catatan:</span>
                  <span className="text-white">{catatan}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-[#272D3B] pt-2 text-sm font-bold">
                <span className="text-[#9BA2AF]">Total estimasi:</span>
                <span className="text-[#D4A359]">{formatRupiah(finalTotalPrice)}</span>
              </div>
            </div>

            <p className="text-[11px] text-[#9BA2AF] mb-4">
              Ini adalah proyek portofolio siswa RPL Kelas 11 (VANGUARD BOOST). Pengerjaan disimulasikan sesuai standar pengerjaan manual tanpa cheat.
            </p>

            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="w-full rounded bg-[#D4A359] py-2 text-xs font-bold text-[#0E1015] hover:bg-[#c49349]"
            >
              Tutup pratinjau
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
