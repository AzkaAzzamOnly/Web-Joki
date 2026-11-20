"use client";

import React from "react";
import Link from "next/link";
import { BRAND } from "@/data/games";

export default function HowItWorks() {
  const steps = [
    {
      no: "01",
      title: "Pilih game & buka katalog",
      desc: "Tentukan game yang ingin kamu joki (Mobile Legends, Genshin Impact, atau Roblox). Klik untuk membuka halaman pemesanan khusus dengan tema dan kalkulator resmi masing-masing game.",
    },
    {
      no: "02",
      title: "Atur target & tambah fitur",
      desc: "Gunakan kalkulator fleksibel untuk menghitung biaya per rank/star atau tambahkan layanan multi-kategori. Tambahkan add-on seperti Mode Mabar atau Prioritas Express jika dibutuhkan.",
    },
    {
      no: "03",
      title: "Konfirmasi & koordinasi booster",
      desc: "Masukkan ID akun in-game dan nomor WhatsApp. Jadwal pengerjaan dikoordinasikan secara transparan tanpa perlu khawatir dengan keamanan akun.",
    },
  ];

  const benefits = [
    {
      title: "100% pengerjaan manual",
      desc: "Semua order dikerjakan langsung secara manual oleh pemain berpengalaman. Tanpa bot, tanpa cheat, dan tanpa exploit yang merugikan akun.",
    },
    {
      title: "Mode mabar (duo queue)",
      desc: "Tersedia opsi bermain bersama booster dalam satu tim. Kamu tetap memegang kendali penuh akunmu tanpa perlu memberikan data login.",
    },
    {
      title: "Kalkulator harga terbuka",
      desc: "Semua rumus dan breakdown biaya per tier dihitung otomatis secara jujur tanpa mark-up tersembunyi.",
    },
    {
      title: "Layanan multi-game lengkap",
      desc: "Mencakup penembusan tier rank MLBB, eksplorasi & rawat akun Genshin 7 wilayah, hingga farming experience Roblox populer.",
    },
  ];

  return (
    <>
      {/* Seksi Alur Pemesanan */}
      <section id="cara-pesan" className="border-b border-[#30343B] bg-[#101216] py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          
          <div className="mb-8">
            <span className="text-xs font-semibold text-[#E5A93B] block mb-1">
              Alur pemesanan praktis
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F1F1F1]">
              Cara pesan joki di {BRAND.name}
            </h2>
            <p className="text-xs sm:text-sm text-[#A5A9B0] mt-1 max-w-2xl">
              Proses pemesanan mudah dan cepat dalam 3 langkah sederhana.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {steps.map((step) => (
              <div
                key={step.no}
                className="rounded-lg border border-[#30343B] bg-[#181C22] p-5 flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl font-mono font-black text-[#E5A93B] block mb-3">
                    {step.no}
                  </span>
                  <h3 className="text-base font-bold text-[#F1F1F1] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#A5A9B0] leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#30343B] text-xs text-[#A5A9B0]">
                  Langkah {step.no} dari 03
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Seksi Keunggulan & Jaminan Keamanan */}
      <section id="keunggulan" className="border-b border-[#30343B] bg-[#14171D] py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          
          <div className="mb-8">
            <span className="text-xs font-semibold text-[#E5A93B] block mb-1">
              Jaminan kualitas &amp; keamanan
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F1F1F1]">
              Mengapa memilih {BRAND.name}?
            </h2>
            <p className="text-xs sm:text-sm text-[#A5A9B0] mt-1 max-w-2xl">
              Prinsip integritas gaming dan transparansi yang kami terapkan untuk setiap pelanggan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((b, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-[#30343B] bg-[#181C22] p-4 text-left"
              >
                <h3 className="text-sm font-bold text-[#F1F1F1] mb-1">
                  {b.title}
                </h3>
                <p className="text-xs text-[#A5A9B0] leading-relaxed">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Banner Ajakan Memesan */}
          <div className="mt-10 rounded-lg border border-[#E5A93B]/40 bg-[#181C22] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white">
                Siap meningkatkan performa akunmu?
              </h3>
              <p className="text-xs text-[#A5A9B0] mt-0.5">
                Pilih game favoritmu dan konsultasikan kebutuhan joki sekarang juga.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 shrink-0">
              <Link
                href="/order/mobile-legends"
                className="rounded bg-[#08A832] px-3.5 py-2 text-xs font-bold text-[#071B12] hover:bg-[#07952c] transition-colors"
              >
                Order MLBB
              </Link>
              <Link
                href="/order/genshin-impact"
                className="rounded bg-[#D4A359] px-3.5 py-2 text-xs font-bold text-[#0E1015] hover:bg-[#c49349] transition-colors"
              >
                Order Genshin
              </Link>
              <Link
                href="/order/roblox"
                className="rounded bg-[#EF4444] px-3.5 py-2 text-xs font-bold text-white hover:bg-[#dc2626] transition-colors"
              >
                Order Roblox
              </Link>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
