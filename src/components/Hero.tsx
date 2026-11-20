"use client";

import React from "react";
import Link from "next/link";

interface HeroProps {
  onScrollToGames?: () => void;
}

export default function Hero({ onScrollToGames }: HeroProps) {
  return (
    <section className="border-b border-[#30343B] bg-[#101216] py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        
        <div className="max-w-3xl">
          <div className="inline-flex px-3 py-1 mb-4">
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#F1F1F1] leading-tight">
            Naikkan rank &amp; progres akun game dengan aman dan cepat
          </h1>

          {/* Tombol CTA */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            {onScrollToGames ? (
              <button
                type="button"
                onClick={onScrollToGames}
                className="rounded bg-[#E5A93B] px-5 py-3 text-xs sm:text-sm font-bold text-[#101216] hover:bg-[#d89d31] transition-colors shadow-lg"
              >
                Pilih game &amp; buka katalog →
              </button>
            ) : (
              <Link
                href="/#game-list"
                className="rounded bg-[#E5A93B] px-5 py-3 text-xs sm:text-sm font-bold text-[#101216] hover:bg-[#d89d31] transition-colors shadow-lg"
              >
                Pilih game &amp; buka katalog →
              </Link>
            )}

            <Link
              href="/#cara-pesan"
              className="rounded border border-[#30343B] bg-[#181C22] px-4 py-3 text-xs sm:text-sm text-[#A5A9B0] hover:text-[#F1F1F1] hover:border-[#4E545F] transition-colors"
            >
              Pelajari cara pesan
            </Link>
          </div>

          {/* 3 Keunggulan */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-[#30343B] pt-6 text-xs text-[#A5A9B0]">
            <div className="flex items-center gap-2.5">
              <span className="text-[#E5A93B] font-bold text-base">✓</span>
              <div>
                <strong className="text-white block">100% pengerjaan manual</strong>
                <span className="text-[11px]">Bebas bot, cheat, atau script berbahaya</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="text-[#E5A93B] font-bold text-base">✓</span>
              <div>
                <strong className="text-white block">Tersedia mode mabar</strong>
                <span className="text-[11px]">Bermain duo tanpa perlu serahkan password</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="text-[#E5A93B] font-bold text-base">✓</span>
              <div>
                <strong className="text-white block">Harga terbuka &amp; pasti</strong>
                <span className="text-[11px]">Rincian kalkulasi transparan sebelum bayar</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
