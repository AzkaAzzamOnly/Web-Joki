"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BRAND } from "@/data/games";

interface NavbarProps {
  onScrollToGames?: () => void;
}

export default function Navbar({ onScrollToGames }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#30343B] bg-[#101216]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        
        {/* Logo / Nama Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-9 w-9 items-center justify-center rounded bg-[#181C22] border border-[#30343B] font-bold text-[#E5A93B] group-hover:border-[#E5A93B] transition-colors">
            ZS
          </div>
          <div>
            <span className="font-bold tracking-tight text-[#F1F1F1] text-base group-hover:text-white transition-colors">
              {BRAND.name}
            </span>
          </div>
        </Link>

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center gap-6 text-sm text-[#A5A9B0]">
          <div className="h-4 w-px bg-[#30343B]" />

          <Link
            href="/order/mobile-legends"
            className="hover:text-[#08A832] transition-colors text-xs font-semibold"
          >
            MLBB
          </Link>
          <Link
            href="/order/genshin-impact"
            className="hover:text-[#D4A359] transition-colors text-xs font-semibold"
          >
            Genshin
          </Link>
          <Link
            href="/order/roblox"
            className="hover:text-[#EF4444] transition-colors text-xs font-semibold"
          >
            Roblox
          </Link>

          <Link
            href="/#game-list"
            className="rounded bg-[#E5A93B] px-3.5 py-1.5 font-bold text-[#101216] hover:bg-[#d89d31] transition-colors text-xs"
          >
            Order Joki Sekarang
          </Link>
        </div>

        {/* Tombol Hamburger Mobile */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href="/#game-list"
            className="rounded bg-[#E5A93B] px-3 py-1.5 text-xs font-bold text-[#101216]"
          >
            Pilih Game
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded p-2 text-[#A5A9B0] hover:text-[#F1F1F1] border border-[#30343B] bg-[#181C22]"
            aria-label="Toggle menu"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Menu Dropdown Mobile */}
      {isOpen && (
        <div className="border-t border-[#30343B] bg-[#181C22] px-4 py-3 md:hidden flex flex-col gap-3 text-sm">

          <div className="border-t border-[#30343B] pt-2 flex flex-col gap-2 text-xs">
            <span className="text-[11px] font-mono text-[#A5A9B0] ">
              Daftar Game:
            </span>
            <Link
              href="/order/mobile-legends"
              onClick={() => setIsOpen(false)}
              className="text-[#08A832] font-semibold"
            >
              Mobile Legends: Bang Bang
            </Link>
            <Link
              href="/order/genshin-impact"
              onClick={() => setIsOpen(false)}
              className="text-[#D4A359] font-semibold"
            >
              Genshin Impact
            </Link>
            <Link
              href="/order/roblox"
              onClick={() => setIsOpen(false)}
              className="text-[#EF4444] font-semibold"
            >
              Roblox
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
