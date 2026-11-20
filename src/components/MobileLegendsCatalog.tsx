"use client";

import React, { useState, useEffect } from "react";
import {
  MLBB_RANK_TIERS,
  MLBB_PACKAGES,
  MLBBPackage,
} from "@/data/mobile-legends";
import {
  calculateMLBBProgression,
  MLBBProgressionResult,
} from "@/lib/price-calculator";
import { formatRupiah } from "@/data/games";

export interface MLBBSelection {
  serviceMode: "star" | "package";
  // Star/Progression mode fields
  startTierId: string;
  startStars: number;
  targetTierId: string;
  targetStars: number;
  progressionResult?: MLBBProgressionResult;
  // Package mode fields
  selectedPackage: MLBBPackage | null;
  // Common calculation
  basePrice: number;
  description: string;
  isValid: boolean;
  errorMessage?: string;
}

interface MobileLegendsCatalogProps {
  onSelectionChange: (selection: MLBBSelection) => void;
}

export default function MobileLegendsCatalog({
  onSelectionChange,
}: MobileLegendsCatalogProps) {
  // Mode: "star" (Kalkulator fleksibel per bintang) atau "package" (9 paket rank boost)
  const [serviceMode, setServiceMode] = useState<"star" | "package">("star");

  // State untuk Star/Progression Mode (Default: Epic 1★ ke Mythic 0★)
  const [startTierId, setStartTierId] = useState<string>("epic");
  const [startStars, setStartStars] = useState<number>(1);
  const [targetTierId, setTargetTierId] = useState<string>("mythic");
  const [targetStars, setTargetStars] = useState<number>(0);

  // State untuk Package Mode
  const [selectedPkgId, setSelectedPkgId] = useState<string>(MLBB_PACKAGES[0].id);

  // Helper tier aktif
  const currentStartTier =
    MLBB_RANK_TIERS.find((t) => t.id === startTierId) || MLBB_RANK_TIERS[4];
  const currentTargetTier =
    MLBB_RANK_TIERS.find((t) => t.id === targetTierId) || MLBB_RANK_TIERS[6];

  // Helper kalkulasi hasil
  const progressionResult = calculateMLBBProgression(
    startTierId,
    startStars,
    targetTierId,
    targetStars
  );

  // Sinkronisasi pilihan ke parent component
  useEffect(() => {
    if (serviceMode === "star") {
      const desc =
        currentStartTier.id === currentTargetTier.id
          ? `${currentStartTier.name} (${startStars}★ → ${targetStars}★)`
          : `${currentStartTier.name} (${startStars}★) → ${currentTargetTier.name} (${targetStars}★)`;

      onSelectionChange({
        serviceMode: "star",
        startTierId,
        startStars,
        targetTierId,
        targetStars,
        progressionResult,
        selectedPackage: null,
        basePrice: progressionResult.isValid ? progressionResult.totalPrice : 0,
        description: desc,
        isValid: progressionResult.isValid,
        errorMessage: progressionResult.errorMessage,
      });
    } else {
      const pkg = MLBB_PACKAGES.find((p) => p.id === selectedPkgId) || MLBB_PACKAGES[0];
      onSelectionChange({
        serviceMode: "package",
        startTierId: "",
        startStars: 0,
        targetTierId: "",
        targetStars: 0,
        selectedPackage: pkg,
        basePrice: pkg.price,
        description: `${pkg.packageName}: ${pkg.startRank} → ${pkg.targetRank}`,
        isValid: true,
      });
    }
  }, [
    serviceMode,
    startTierId,
    startStars,
    targetTierId,
    targetStars,
    selectedPkgId,
    onSelectionChange,
  ]);

  // Handler pergantian rank awal
  const handleStartTierChange = (newTierId: string) => {
    const newTier = MLBB_RANK_TIERS.find((t) => t.id === newTierId);
    if (!newTier) return;

    setStartTierId(newTier.id);

    // Pastikan startStars berada dalam batas tier baru
    let clampedStart = startStars;
    if (clampedStart < newTier.minStars || clampedStart > newTier.maxStars) {
      clampedStart = newTier.defaultStars;
      setStartStars(clampedStart);
    }

    // Jika target tier berada di bawah rank awal baru, sesuaikan rank tujuan
    const targetTier = MLBB_RANK_TIERS.find((t) => t.id === targetTierId);
    if (targetTier && targetTier.order < newTier.order) {
      setTargetTierId(newTier.id);
      // Atur targetStars setidaknya 1 bintang di atas startStars
      setTargetStars(
        Math.min(newTier.maxStars, Math.max(newTier.minStars, clampedStart + 1))
      );
    } else if (targetTier && targetTier.order === newTier.order) {
      if (targetStars <= clampedStart) {
        setTargetStars(Math.min(newTier.maxStars, clampedStart + 1));
      }
    }
  };

  // Handler pergantian rank tujuan
  const handleTargetTierChange = (newTierId: string) => {
    const newTier = MLBB_RANK_TIERS.find((t) => t.id === newTierId);
    if (!newTier) return;

    setTargetTierId(newTier.id);

    if (newTier.order === currentStartTier.order) {
      setTargetStars(
        Math.min(newTier.maxStars, Math.max(startStars + 1, newTier.defaultStars))
      );
    } else if (targetStars < newTier.minStars || targetStars > newTier.maxStars) {
      setTargetStars(newTier.defaultStars);
    }
  };

  // Stepper handlers untuk Bintang Saat Ini
  const handleDecrementStartStars = () => {
    if (startStars > currentStartTier.minStars) {
      setStartStars(startStars - 1);
    }
  };

  const handleIncrementStartStars = () => {
    if (startStars < currentStartTier.maxStars) {
      const nextVal = startStars + 1;
      setStartStars(nextVal);
      // Jika dalam tier yang sama dan targetStars tersusul, dorong targetStars
      if (startTierId === targetTierId && targetStars <= nextVal) {
        if (nextVal < currentStartTier.maxStars) {
          setTargetStars(nextVal + 1);
        }
      }
    }
  };

  const handleStartStarDirectInput = (valStr: string) => {
    const val = parseInt(valStr, 10);
    if (isNaN(val)) return;
    const clamped = Math.max(
      currentStartTier.minStars,
      Math.min(currentStartTier.maxStars, val)
    );
    setStartStars(clamped);
  };

  // Stepper handlers untuk Bintang Tujuan
  const handleDecrementTargetStars = () => {
    if (targetStars > currentTargetTier.minStars) {
      setTargetStars(targetStars - 1);
    }
  };

  const handleIncrementTargetStars = () => {
    if (targetStars < currentTargetTier.maxStars) {
      setTargetStars(targetStars + 1);
    }
  };

  const handleTargetStarDirectInput = (valStr: string) => {
    const val = parseInt(valStr, 10);
    if (isNaN(val)) return;
    const clamped = Math.max(
      currentTargetTier.minStars,
      Math.min(currentTargetTier.maxStars, val)
    );
    setTargetStars(clamped);
  };

  // Helper warna badge rank
  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "WAR":
        return "bg-stone-800 text-stone-300 border-stone-600";
      case "ELT":
        return "bg-cyan-950 text-cyan-300 border-cyan-700/60";
      case "MST":
        return "bg-orange-950 text-orange-300 border-orange-700/60";
      case "GM":
        return "bg-slate-800 text-slate-200 border-slate-600";
      case "EPIC":
        return "bg-teal-900/60 text-teal-300 border-teal-600/50";
      case "LGD":
        return "bg-amber-900/60 text-amber-300 border-amber-600/50";
      case "MYT":
        return "bg-purple-900/60 text-purple-300 border-purple-600/50";
      case "HNR":
        return "bg-blue-900/60 text-blue-300 border-blue-600/50";
      case "GLY":
        return "bg-red-900/60 text-red-300 border-red-600/50";
      case "IMT":
        return "bg-yellow-900/60 text-yellow-300 border-yellow-500/60";
      default:
        return "bg-[#181C22] text-[#F1F1F1] border-[#30343B]";
    }
  };

  return (
    <div className="rounded-lg border border-[#30343B] bg-[#181C22] p-5 shadow-lg space-y-5">
      {/* Header Katalog */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#30343B] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-[#08A832]/20 border border-[#08A832]/40 px-2 py-0.5 text-xs font-semibold text-[#08A832]">
              Joki MLBB
            </span>
            <span className="text-xs text-[#A5A9B0]">Pengerjaan 100% manual</span>
          </div>
          <h3 className="text-xl font-bold text-white mt-1">
            Katalog &amp; kalkulator joki Mobile Legends
          </h3>
          <p className="text-xs text-[#A5A9B0]">
            Hitung fleksibel dari rank apa pun ke rank impianmu tanpa batasan harga.
          </p>
        </div>

        {/* Tab Switcher Layanan */}
        <div className="flex rounded bg-[#101216] border border-[#30343B] p-1 text-xs">
          <button
            type="button"
            onClick={() => setServiceMode("star")}
            className={`px-3 py-1.5 rounded font-semibold transition-all ${
              serviceMode === "star"
                ? "bg-[#08A832] text-[#071B12] shadow font-bold"
                : "text-[#A5A9B0] hover:text-white"
            }`}
          >
            Kalkulator fleksibel
          </button>
          <button
            type="button"
            onClick={() => setServiceMode("package")}
            className={`px-3 py-1.5 rounded font-semibold transition-all ${
              serviceMode === "package"
                ? "bg-[#08A832] text-[#071B12] shadow font-bold"
                : "text-[#A5A9B0] hover:text-white"
            }`}
          >
            Paket rank boost (9 paket)
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 1. KATEGORI A: KALKULATOR FLEKSIBEL MULTI-TIER           */}
      {/* ======================================================== */}
      {serviceMode === "star" && (
        <div className="space-y-6">
          {/* Ringkasan Tarif per Bintang (Daftar Harga Resmi) */}
          <div>
            <span className="text-xs font-semibold text-[#F1F1F1] block mb-2">
              Daftar tarif per bintang (tier Epic — Immortal)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {MLBB_RANK_TIERS.filter((t) => t.order >= 5).map((tier) => {
                const isSelected =
                  tier.id === startTierId || tier.id === targetTierId;
                return (
                  <div
                    key={tier.id}
                    className={`rounded border p-2.5 text-center transition-all ${
                      isSelected
                        ? "border-[#08A832] bg-[#08A832]/10 shadow ring-1 ring-[#08A832]"
                        : "border-[#30343B] bg-[#101216]"
                    }`}
                  >
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border mb-1 ${getBadgeColor(
                        tier.badge
                      )}`}
                    >
                      {tier.name}
                    </span>
                    <div className="text-xs font-bold text-white font-mono">
                      {tier.displayPrice}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form Konfigurasi Rank Awal & Target */}
          <div className="rounded border border-[#30343B] bg-[#14171D] p-4 space-y-4">
            <span className="text-xs font-bold text-[#F1F1F1] block">
              Atur posisi awal dan target tujuan
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Kolom 1: Posisi Rank Saat Ini (Awal) */}
              <div className="rounded border border-[#30343B] bg-[#101216] p-4 space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">
                    Rank saat ini
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getBadgeColor(
                      currentStartTier.badge
                    )}`}
                  >
                    {currentStartTier.badge}
                  </span>
                </div>

                <div>
                  <label className="text-xs text-[#A5A9B0] block mb-1.5 font-medium">
                    Pilih rank saat ini
                  </label>
                  <select
                    value={startTierId}
                    onChange={(e) => handleStartTierChange(e.target.value)}
                    className="w-full rounded border border-[#30343B] bg-[#181C22] p-2.5 text-xs text-white focus:outline-none focus:border-[#08A832] transition-colors"
                  >
                    {MLBB_RANK_TIERS.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name} ({t.displayPrice})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Kontrol Stepper Bintang Saat Ini */}
                <div>
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <label className="text-[#A5A9B0] font-medium">
                      Bintang saat ini
                    </label>
                    <span className="text-[11px] text-[#6B7280]">
                      Rentang: {currentStartTier.minStars} – {currentStartTier.maxStars} bintang
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleDecrementStartStars}
                      disabled={startStars <= currentStartTier.minStars}
                      className={`h-10 w-11 flex items-center justify-center rounded border text-lg font-bold transition-all ${
                        startStars <= currentStartTier.minStars
                          ? "border-[#30343B] bg-[#181C22]/40 text-[#6B7280] cursor-not-allowed"
                          : "border-[#30343B] bg-[#181C22] text-white hover:border-[#08A832] hover:text-[#08A832] active:scale-95"
                      }`}
                      aria-label="Kurangi bintang saat ini"
                    >
                      −
                    </button>

                    <div className="flex-1 flex items-center justify-center rounded border border-[#30343B] bg-[#181C22] h-10 px-3">
                      <input
                        type="number"
                        min={currentStartTier.minStars}
                        max={currentStartTier.maxStars}
                        value={startStars}
                        onChange={(e) => handleStartStarDirectInput(e.target.value)}
                        className="w-16 bg-transparent text-center font-mono font-bold text-base text-[#08A832] focus:outline-none"
                      />
                      <span className="text-xs text-[#A5A9B0] ml-1">Bintang</span>
                    </div>

                    <button
                      type="button"
                      onClick={handleIncrementStartStars}
                      disabled={startStars >= currentStartTier.maxStars}
                      className={`h-10 w-11 flex items-center justify-center rounded border text-lg font-bold transition-all ${
                        startStars >= currentStartTier.maxStars
                          ? "border-[#30343B] bg-[#181C22]/40 text-[#6B7280] cursor-not-allowed"
                          : "border-[#30343B] bg-[#181C22] text-white hover:border-[#08A832] hover:text-[#08A832] active:scale-95"
                      }`}
                      aria-label="Tambah bintang saat ini"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Kolom 2: Posisi Rank Target (Tujuan) */}
              <div className="rounded border border-[#30343B] bg-[#101216] p-4 space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">
                    Rank tujuan
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getBadgeColor(
                      currentTargetTier.badge
                    )}`}
                  >
                    {currentTargetTier.badge}
                  </span>
                </div>

                <div>
                  <label className="text-xs text-[#A5A9B0] block mb-1.5 font-medium">
                    Pilih rank tujuan
                  </label>
                  <select
                    value={targetTierId}
                    onChange={(e) => handleTargetTierChange(e.target.value)}
                    className="w-full rounded border border-[#30343B] bg-[#181C22] p-2.5 text-xs text-white focus:outline-none focus:border-[#08A832] transition-colors"
                  >
                    {MLBB_RANK_TIERS.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name} ({t.displayPrice})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Kontrol Stepper Bintang Tujuan */}
                <div>
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <label className="text-[#A5A9B0] font-medium">
                      Bintang tujuan
                    </label>
                    <span className="text-[11px] text-[#6B7280]">
                      Rentang: {currentTargetTier.minStars} – {currentTargetTier.maxStars} bintang
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleDecrementTargetStars}
                      disabled={targetStars <= currentTargetTier.minStars}
                      className={`h-10 w-11 flex items-center justify-center rounded border text-lg font-bold transition-all ${
                        targetStars <= currentTargetTier.minStars
                          ? "border-[#30343B] bg-[#181C22]/40 text-[#6B7280] cursor-not-allowed"
                          : "border-[#30343B] bg-[#181C22] text-white hover:border-[#08A832] hover:text-[#08A832] active:scale-95"
                      }`}
                      aria-label="Kurangi bintang tujuan"
                    >
                      −
                    </button>

                    <div className="flex-1 flex items-center justify-center rounded border border-[#30343B] bg-[#181C22] h-10 px-3">
                      <input
                        type="number"
                        min={currentTargetTier.minStars}
                        max={currentTargetTier.maxStars}
                        value={targetStars}
                        onChange={(e) => handleTargetStarDirectInput(e.target.value)}
                        className="w-16 bg-transparent text-center font-mono font-bold text-base text-[#08A832] focus:outline-none"
                      />
                      <span className="text-xs text-[#A5A9B0] ml-1">Bintang</span>
                    </div>

                    <button
                      type="button"
                      onClick={handleIncrementTargetStars}
                      disabled={targetStars >= currentTargetTier.maxStars}
                      className={`h-10 w-11 flex items-center justify-center rounded border text-lg font-bold transition-all ${
                        targetStars >= currentTargetTier.maxStars
                          ? "border-[#30343B] bg-[#181C22]/40 text-[#6B7280] cursor-not-allowed"
                          : "border-[#30343B] bg-[#181C22] text-white hover:border-[#08A832] hover:text-[#08A832] active:scale-95"
                      }`}
                      aria-label="Tambah bintang tujuan"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Alert Error jika konfigurasi tidak valid */}
            {!progressionResult.isValid && (
              <div className="rounded border border-red-500/40 bg-red-950/40 p-3 text-xs text-red-200">
                ⚠️ {progressionResult.errorMessage}
              </div>
            )}

            {/* Rincian Kalkulasi Tiap Tier (Transparent Breakdown) */}
            {progressionResult.isValid && (
              <div className="border-t border-[#30343B] pt-4">
                <span className="text-xs font-bold text-[#F1F1F1] block mb-2">
                  Rincian pengerjaan per tier
                </span>

                <div className="space-y-1.5">
                  {progressionResult.breakdown.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded bg-[#101216] border border-[#30343B] px-3.5 py-2 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[#08A832] font-bold">•</span>
                        <span className="font-semibold text-white">
                          {item.tierName}
                        </span>
                        <span className="text-[#A5A9B0] text-[11px]">
                          ({item.stars} bintang × {formatRupiah(item.pricePerStar)})
                        </span>
                      </div>
                      <span className="font-mono font-bold text-white">
                        {formatRupiah(item.subtotal)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Total Baris Bawah */}
                <div className="mt-3 flex items-center justify-between rounded bg-[#101216] border border-[#08A832] p-3 text-xs">
                  <div>
                    <span className="text-[#A5A9B0] block text-[11px]">
                      Total bintang yang dikerjakan:
                    </span>
                    <span className="font-mono font-bold text-sm text-white">
                      {progressionResult.totalStars} bintang
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[#A5A9B0] block text-[11px]">
                      Tarif dasar joki:
                    </span>
                    <span className="font-mono font-black text-base text-[#08A832]">
                      {formatRupiah(progressionResult.totalPrice)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. KATEGORI B: RANK BOOST PACKAGES (9 PAKET)             */}
      {/* ======================================================== */}
      {serviceMode === "package" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#F1F1F1]">
              Pilih paket rank boost
            </span>
            <span className="text-[11px] text-[#A5A9B0]">
              9 paket resmi sesuai daftar harga
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {MLBB_PACKAGES.map((pkg) => {
              const isSelected = selectedPkgId === pkg.id;
              return (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedPkgId(pkg.id)}
                  className={`rounded border p-3.5 cursor-pointer text-left transition-all ${
                    isSelected
                      ? "border-[#08A832] bg-[#08A832]/10 shadow-md ring-1 ring-[#08A832]"
                      : "border-[#30343B] bg-[#101216] hover:border-[#4E545F]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white">
                      {pkg.packageName}
                    </span>
                    <span className="rounded bg-[#08A832] px-2 py-0.5 text-[11px] font-mono font-bold text-[#071B12]">
                      {pkg.displayPrice}
                    </span>
                  </div>

                  {/* Visual Transisi Rank */}
                  <div className="flex items-center justify-between rounded bg-[#181C22] border border-[#30343B] p-2 my-2 text-xs">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getBadgeColor(
                        pkg.startBadge
                      )}`}
                    >
                      {pkg.startRank}
                    </span>
                    <span className="text-[#08A832] font-bold">→</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getBadgeColor(
                        pkg.targetBadge
                      )}`}
                    >
                      {pkg.targetRank}
                    </span>
                  </div>

                  {pkg.notes && (
                    <p className="text-[11px] text-[#A5A9B0] line-clamp-1 mt-1">
                      {pkg.notes}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
