"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GameItem } from "@/data/games";

interface GameSelectorProps {
  games: GameItem[];
}

export default function GameSelector({ games }: GameSelectorProps) {
  // Mapping rute dan info khusus tiap game
  const getGameRouteInfo = (gameId: string) => {
    switch (gameId) {
      case "mlbb":
        return {
          href: "/order/mobile-legends",
          btnText: "Buka katalog MLBB →",
          btnColor: "bg-[#08A832] text-[#071B12] hover:bg-[#07952c]",
          features: [
            "Kalkulator rank fleksibel",
            "9 paket rank boost",
            "Tarif per bintang Rp2.000 — Rp5.000",
            "Opsi mabar duo queue",
          ],
          badgeText: "Populer",
          badgeColor: "bg-[#08A832]/20 text-[#08A832] border-[#08A832]/40",
        };
      case "genshin":
        return {
          href: "/order/genshin-impact",
          btnText: "Buka katalog Genshin →",
          btnColor: "bg-[#D4A359] text-[#0E1015] hover:bg-[#c49349]",
          features: [
            "9 kategori layanan lengkap",
            "Eksplorasi map 7 wilayah",
            "Rawat akun, quest & primogems",
            "Multi-layanan dalam satu order",
          ],
          badgeText: "Katalog lengkap",
          badgeColor: "bg-[#D4A359]/20 text-[#D4A359] border-[#D4A359]/40",
        };
      case "roblox":
        return {
          href: "/order/roblox",
          btnText: "Buka katalog Roblox →",
          btnColor: "bg-[#EF4444] text-white hover:bg-[#dc2626]",
          features: [
            "Blox Fruits (leveling, mastery, raid)",
            "Pet Simulator 99 (rebirth & area)",
            "Blade Ball (net win matches)",
            "Slider kuantitas interaktif",
          ],
          badgeText: "Multi-experience",
          badgeColor: "bg-[#EF4444]/20 text-[#EF4444] border-[#EF4444]/40",
        };
      default:
        return {
          href: "/",
          btnText: "Buka katalog →",
          btnColor: "bg-[#E5A93B] text-[#101216]",
          features: [],
          badgeText: "Game",
          badgeColor: "bg-[#30343B] text-[#F1F1F1]",
        };
    }
  };

  return (
    <section id="game-list" className="border-b border-[#30343B] bg-[#101216] py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        
        {/* Header Seksi */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded bg-[#181C22] border border-[#30343B] px-2.5 py-0.5 text-xs text-[#E5A93B] mb-1.5 font-medium">
            Daftar Game
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#F1F1F1]">
            Pilih game untuk melihat layanan &amp; pemesanan
          </h2>
          <p className="text-xs sm:text-sm text-[#A5A9B0] mt-1 max-w-2xl">
            Setiap game memiliki halaman pemesanan tersendiri dengan identitas visual, kalkulator harga, dan opsi yang disesuaikan secara khusus.
          </p>
        </div>

        {/* Grid 3 Kartu Game */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {games.map((game) => {
            const info = getGameRouteInfo(game.id);

            return (
              <Link
                key={game.id}
                href={info.href}
                className="group flex flex-col justify-between rounded-lg border border-[#30343B] bg-[#14171D] p-5 text-left transition-all hover:border-[#4E545F] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#E5A93B]/50 cursor-pointer"
              >
                <div>
                  {/* Banner / Ilustrasi Artwork Game */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded bg-[#101216] border border-[#30343B] mb-4">
                    <Image
                      src={game.image}
                      alt={game.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      style={{ objectPosition: game.imagePosition || "center" }}
                      priority={game.id === "mlbb" || game.id === "genshin"}
                    />
                  </div>

                  {/* Header Kartu: Genre & Badge */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#A5A9B0]">
                      {game.genre}
                    </span>
                    <span
                      className={`rounded px-2 py-0.5 text-[11px] font-semibold border ${info.badgeColor}`}
                    >
                      {info.badgeText}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#F1F1F1] group-hover:text-white transition-colors">
                    {game.name}
                  </h3>

                  <p className="mt-2 text-xs text-[#A5A9B0] leading-relaxed">
                    {game.tagline}
                  </p>

                  {/* Daftar Fitur Layanan */}
                  <div className="mt-4 pt-4 border-t border-[#30343B]/60 space-y-1.5">
                    <span className="text-[11px] text-[#A5A9B0] block mb-1 font-medium">
                      Fitur &amp; pilihan layanan:
                    </span>
                    {info.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-[#F1F1F1]">
                        <span style={{ color: game.accentColor }} className="font-bold">
                          •
                        </span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tombol Menuju Halaman Order Spesifik */}
                <div className="mt-6 pt-4 border-t border-[#30343B]">
                  <span
                    className={`block w-full text-center py-2.5 rounded text-xs font-bold transition-all shadow ${info.btnColor}`}
                  >
                    {info.btnText}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
