"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import GameSelector from "@/components/GameSelector";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import { GAMES } from "@/data/games";

export default function Home() {
  // Helper fungsi scroll halus ke daftar game
  const scrollToGames = () => {
    const el = document.getElementById("game-list");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-[#101216] text-[#F1F1F1]">
      {/* 1. Navigasi Atas */}
      <Navbar onScrollToGames={scrollToGames} />

      {/* 2. Hero Section */}
      <Hero onScrollToGames={scrollToGames} />

      {/* 3. Daftar Kartu Game Utama (Menghubungkan ke Halaman Pemesanan Khusus) */}
      <GameSelector games={GAMES} />

      {/* 4. Alur Pemesanan & Jaminan Keamanan */}
      <HowItWorks />

      {/* 5. Footer Brand */}
      <Footer />
    </main>
  );
}
