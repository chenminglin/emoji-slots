"use client";

import { SYMBOLS } from "@/data/symbols";
import { useGameStore } from "@/store/gameStore";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslations } from 'next-intl';

export function DraftingPhase() {
    const draftSymbol = useGameStore((state) => state.draftSymbol);
    const [options, setOptions] = useState<string[]>([]);
    const tCommon = useTranslations('common');
    const tUncommon = useTranslations('uncommon');
    const tRare = useTranslations('rare');
    const tLegendary = useTranslations('legendary');
    const tDesc = useTranslations('descriptions');
    const tUI = useTranslations('ui');

    const getSymbolName = (id: string, rarity: string) => {
        if (rarity === 'common') return tCommon(id);
        if (rarity === 'uncommon') return tUncommon(id);
        if (rarity === 'rare') return tRare(id);
        return tLegendary(id);
    };

    useEffect(() => {
        // Weighted random selection based on GDD
        const getWeightedRarity = (): 'common' | 'uncommon' | 'rare' | 'legendary' => {
            const rand = Math.random() * 100;
            if (rand < 75) return 'common';
            if (rand < 93) return 'uncommon'; // 75 + 18
            if (rand < 99.7) return 'rare';   // 93 + 6.7
            return 'legendary';               // Remainder 0.3%
        };

        const getRandomSymbolByRarity = (rarity: string) => {
            const symbolsOfRarity = Object.values(SYMBOLS).filter(s => s.rarity === rarity);
            if (symbolsOfRarity.length === 0) return null;
            return symbolsOfRarity[Math.floor(Math.random() * symbolsOfRarity.length)];
        };

        const newOptions: string[] = [];
        while (newOptions.length < 3) {
            const rarity = getWeightedRarity();
            const symbol = getRandomSymbolByRarity(rarity);

            // Fallback if no symbol found for rarity (shouldn't happen if data is complete)
            // Also avoid duplicates in the same draft? Let's allow duplicates for now or retry.
            // Let's retry if duplicate or null.
            if (symbol && !newOptions.includes(symbol.id)) {
                newOptions.push(symbol.id);
            } else if (!symbol) {
                // Fallback to common if something breaks
                const common = getRandomSymbolByRarity('common');
                if (common && !newOptions.includes(common.id)) newOptions.push(common.id);
            }
        }

        setOptions(newOptions);
    }, []);

    const getRarityColor = (rarity: string) => {
        switch (rarity) {
            case 'common': return 'text-gray-300 border-gray-600';
            case 'uncommon': return 'text-green-400 border-green-600';
            case 'rare': return 'text-blue-400 border-blue-600';
            case 'legendary': return 'text-orange-400 border-orange-600';
            default: return 'text-gray-300 border-gray-600';
        }
    };

    return (
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="absolute bottom-0 left-0 right-0 bg-gray-800 p-6 rounded-t-2xl border-t-2 border-yellow-500 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-20"
        >
            <h2 className="text-center text-xl font-bold mb-4 text-white">{tUI('chooseSymbol')}</h2>
            <div className="flex justify-around gap-2">
                {options.map((id, idx) => {
                    const sym = SYMBOLS[id];
                    const rarityColors = getRarityColor(sym.rarity);

                    return (
                        <button
                            key={idx}
                            onClick={() => draftSymbol(id)}
                            className={`flex flex-col items-center p-3 bg-gray-700 rounded-xl hover:bg-gray-600 active:scale-95 transition-all w-1/3 border-2 ${rarityColors.split(' ')[1]}`}
                        >
                            <span className="text-4xl mb-2">{sym.icon}</span>
                            <span className={`font-bold text-sm ${rarityColors.split(' ')[0]}`}>{getSymbolName(sym.id, sym.rarity)}</span>
                            <span className="text-xs text-gray-500 uppercase tracking-widest scale-75 origin-center">{sym.rarity}</span>
                            <span className="text-xs text-gray-400 mt-1">{sym.value} {tUI('coins')}</span>
                            <span className="text-[10px] text-gray-500 mt-1 text-center leading-tight">{tDesc(sym.id)}</span>
                        </button>
                    );
                })}
            </div>
            <button
                onClick={() => draftSymbol('skip')}
                className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-white"
            >
                {tUI('skip')}
            </button>
        </motion.div>
    );
}
