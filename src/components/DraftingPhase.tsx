"use client";

import { SYMBOLS } from "@/data/symbols";
import { useGameStore } from "@/store/gameStore";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function DraftingPhase() {
    const draftSymbol = useGameStore((state) => state.draftSymbol);
    const [options, setOptions] = useState<string[]>([]);

    useEffect(() => {
        // Pick 3 random symbols to offer
        // In a real game, this would be weighted by rarity
        const allIds = Object.keys(SYMBOLS);
        const randomPicks = [];
        for (let i = 0; i < 3; i++) {
            const randomId = allIds[Math.floor(Math.random() * allIds.length)];
            randomPicks.push(randomId);
        }
        setOptions(randomPicks);
    }, []);

    return (
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="absolute bottom-0 left-0 right-0 bg-gray-800 p-6 rounded-t-2xl border-t-2 border-yellow-500 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-20"
        >
            <h2 className="text-center text-xl font-bold mb-4 text-white">Choose a Symbol</h2>
            <div className="flex justify-around gap-2">
                {options.map((id, idx) => {
                    const sym = SYMBOLS[id];
                    return (
                        <button
                            key={idx}
                            onClick={() => draftSymbol(id)}
                            className="flex flex-col items-center p-3 bg-gray-700 rounded-xl hover:bg-gray-600 active:scale-95 transition-all w-1/3"
                        >
                            <span className="text-4xl mb-2">{sym.icon}</span>
                            <span className="font-bold text-sm text-yellow-300">{sym.name}</span>
                            <span className="text-xs text-gray-400 mt-1">{sym.value} Coin{sym.value !== 1 ? 's' : ''}</span>
                            <span className="text-[10px] text-gray-500 mt-1 text-center leading-tight">{sym.description}</span>
                        </button>
                    );
                })}
            </div>
            <button
                onClick={() => draftSymbol('poop')} // Skip button (basic impl, maybe gives 1 coin or literally nothing)
                className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-white"
            >
                Skip
            </button>
        </motion.div>
    );
}
