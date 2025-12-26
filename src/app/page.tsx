"use client";

import { useState } from "react";
import { useGameStore } from "@/store/gameStore";
import { SlotGrid } from "@/components/SlotGrid";
import { DraftingPhase } from "@/components/DraftingPhase";
import { DeckView } from "@/components/DeckView";
import { GamePhase } from "@/types/game";
import { motion, AnimatePresence } from "framer-motion";
import { Backpack } from "lucide-react";

export default function Home() {
  const { coins, rent, spinsUntilRent, phase, grid, spin } = useGameStore();
  const [showDeck, setShowDeck] = useState(false);

  const isSpinning = phase === GamePhase.SPINNING;
  const isDrafting = phase === GamePhase.DRAFTING;
  const isGameOver = phase === GamePhase.GAME_OVER;
  const isPayout = phase === GamePhase.PAYOUT;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-gray-900 text-white relative overflow-hidden">
      {/* Header Info */}
      <header className="w-full max-w-md p-4 flex flex-col gap-2 z-10">
        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <span className="text-gray-400 text-xs uppercase tracking-wider">Balance</span>
            <span className="text-4xl font-bold text-yellow-400">🪙 {coins}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-gray-400 text-xs uppercase tracking-wider">Rent Due</span>
            <span className="text-xl font-bold text-red-400">{rent} 🪙</span>
            <span className="text-sm text-gray-400">in {spinsUntilRent} spins</span>
          </div>
        </div>

        {/* Progress Bar for Rent (Visual flair) */}
        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden mt-1">
          <div
            className="h-full bg-gradient-to-r from-green-500 to-yellow-500 transition-all duration-500"
            style={{ width: `${Math.min((coins / rent) * 100, 100)}%` }}
          />
        </div>
      </header>

      {/* Game Board */}
      <div className="flex-1 flex items-center justify-center w-full p-4 z-10">
        <SlotGrid grid={grid} isSpinning={isSpinning} />
      </div>

      {/* Controls */}
      <footer className="w-full max-w-md p-6 pb-12 bg-gray-900/90 z-10 flex gap-4">
        <button
          onClick={() => setShowDeck(true)}
          className="p-4 rounded-2xl bg-gray-800 border-2 border-gray-700 text-gray-300 shadow-[0_5px_0_rgb(55,65,81)] active:shadow-none active:translate-y-[5px] transition-all flex items-center justify-center hover:bg-gray-700 hover:text-white"
          title="View Symbols"
        >
          <Backpack size={24} />
        </button>
        <button
          onClick={spin}
          disabled={isSpinning || isDrafting || isGameOver || isPayout}
          className="flex-1 py-4 text-2xl font-black rounded-2xl bg-gradient-to-b from-yellow-400 to-orange-600 text-white shadow-[0_5px_0_rgb(180,83,9)] active:shadow-none active:translate-y-[5px] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:translate-y-0 disabled:active:shadow-[0_5px_0_rgb(180,83,9)] transition-all uppercase tracking-widest border-2 border-yellow-300"
        >
          {isSpinning || isPayout ? "Spinning..." : "SPIN!"}
        </button>
      </footer>

      {/* Overlays */}
      <AnimatePresence>
        {showDeck && (
          <DeckView onClose={() => setShowDeck(false)} />
        )}

        {isDrafting && (
          <div className="absolute inset-0 z-20 flex items-end pointer-events-none">
            <div className="pointer-events-auto w-full">
              <DraftingPhase />
            </div>
          </div>
        )}

        {isGameOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-8 text-center"
          >
            <h1 className="text-6xl font-black text-red-500 mb-4">GAME OVER</h1>
            <p className="text-2xl text-white mb-8">You couldn't pay the rent.</p>
            <div className="text-xl text-gray-400 mb-8">Final Coins: {coins}</div>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200"
            >
              Try Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Decor */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900 via-gray-900 to-black"></div>
    </main>
  );
}

