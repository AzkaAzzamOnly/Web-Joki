"use client";

import React from "react";
import Link from "next/link";
import { BRAND, GAMES } from "@/data/games";

export default function Footer() {
  const getGamePath = (id: string) => {
    switch (id) {
      case "mlbb":
        return "/order/mobile-legends";
      case "genshin":
        return "/order/genshin-impact";
      case "roblox":
        return "/order/roblox";
      default:
        return "/";
    }
  };

  return (
    <footer id="kontak" className="bg-[#101216] border-t border-[#30343B] py-12 text-xs text-[#A5A9B0]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-[#30343B]">
          
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded bg-[#181C22] border border-[#30343B] text-[#E5A93B] font-bold text-xs">
                ZS
              </span>
              <div>
                <span className="font-bold text-base text-[#F1F1F1] block leading-none">
                  {BRAND.name}
                </span>
                <span className="text-[11px] text-[#A5A9B0]">
                  {BRAND.tagline}
                </span>
              </div>
            </div>

            <p className="text-xs text-[#A5A9B0] leading-relaxed max-w-sm mt-3">
              {BRAND.description}
            </p>

            <div className="mt-4 rounded border border-[#30343B] bg-[#14171D] p-3 text-[11px] space-y-1">
              <div>
                <span className="text-[#A5A9B0]">Jam operasional: </span>
                <span className="text-white font-semibold">{BRAND.supportHours}</span>
              </div>
              <div>
                <span className="text-[#A5A9B0]">Koordinasi Whatsapp: </span>
                <span className="text-[#E5A93B] font-mono font-semibold">Tersedia di form checkout</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-4">
            <h4 className="font-bold text-[#F1F1F1] mb-3 text-xs">
              Halaman pemesanan khusus
            </h4>
            <ul className="space-y-2">
              {GAMES.map((g) => (
                <li key={g.id}>
                  <Link
                    href={getGamePath(g.id)}
                    className="hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: g.accentColor }}
                    />
                    <span className="group-hover:translate-x-0.5 transition-transform">
                      {g.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-bold text-[#F1F1F1] mb-3 text-xs">
              Informasi &amp; panduan
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#game-list" className="hover:text-white transition-colors">
                  • Daftar game &amp; pricelist
                </Link>
              </li>
              <li>
                <Link href="/#cara-pesan" className="hover:text-white transition-colors">
                  • Cara pemesanan joki
                </Link>
              </li>
              <li>
                <Link href="/#keunggulan" className="hover:text-white transition-colors">
                  • Jaminan keamanan &amp; anti-cheat
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] text-[#6B7280]">
          <p className="max-w-2xl leading-relaxed">
            {BRAND.disclaimer}
          </p>
          <div className="font-mono shrink-0">
            &copy; {new Date().getFullYear()} {BRAND.name}. Student Portfolio RPL SMK.
          </div>
        </div>

      </div>
    </footer>
  );
}
