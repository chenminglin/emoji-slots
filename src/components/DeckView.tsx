import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { SYMBOLS } from '../data/symbols';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface DeckViewProps {
    onClose: () => void;
}

export const DeckView: React.FC<DeckViewProps> = ({ onClose }) => {
    const { deck } = useGameStore();
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

    // Group symbols by ID and count them
    const symbolCounts = deck.reduce((acc, id) => {
        acc[id] = (acc[id] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const uniqueSymbolIds = objectKeys(symbolCounts);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-4"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-full max-w-2xl bg-gray-900 border border-gray-700 rounded-2xl flex flex-col max-h-[80vh] shadow-2xl"
            >
                <div className="p-6 border-b border-gray-800 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-white">{tUI('yourSymbols')}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-800 transition-colors text-gray-400 hover:text-white"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                    {uniqueSymbolIds.map(id => {
                        const symbol = SYMBOLS[id];
                        const count = symbolCounts[id];

                        if (!symbol) return null;

                        return (
                            <div key={id} className="relative bg-gray-800/50 rounded-xl p-4 flex flex-col items-center gap-2 border border-white/5 hover:border-white/10 transition-colors group">
                                <div className="text-4xl filter drop-shadow-md group-hover:scale-110 transition-transform duration-200">
                                    {symbol.icon}
                                </div>
                                <div className="text-lg font-bold text-white">{getSymbolName(symbol.id, symbol.rarity)}</div>
                                <div className="text-xs text-center text-gray-400">{tDesc(symbol.id)}</div>
                                <div className="mt-2 text-sm font-semibold text-yellow-400">
                                    {tUI('coins')}: {symbol.value}
                                </div>

                                <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[24px] text-center">
                                    x{count}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="p-6 border-t border-gray-800 bg-gray-900/50 rounded-b-2xl">
                    <div className="text-center text-gray-400 text-sm">
                        {tUI('totalSymbols')}: <span className="text-white font-bold">{deck.length}</span>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

// Helper to make TS happy with Object.keys on a Record
function objectKeys<K extends string>(obj: Record<K, any>): K[] {
    return Object.keys(obj) as K[];
}
