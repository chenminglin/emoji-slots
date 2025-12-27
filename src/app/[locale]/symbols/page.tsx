"use client";

import { SYMBOLS } from "@/data/symbols";
import { useTranslations } from 'next-intl';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function SymbolsPage() {
    const params = useParams();
    const locale = params.locale as string;
    const tCommon = useTranslations('common');
    const tUncommon = useTranslations('uncommon');
    const tRare = useTranslations('rare');
    const tLegendary = useTranslations('legendary');
    const tDesc = useTranslations('descriptions');

    const getSymbolName = (id: string, rarity: string) => {
        if (rarity === 'common') return tCommon(id);
        if (rarity === 'uncommon') return tUncommon(id);
        if (rarity === 'rare') return tRare(id);
        return tLegendary(id);
    };

    const getRarityColor = (rarity: string) => {
        switch (rarity) {
            case 'common': return 'text-gray-300 border-gray-600 bg-gray-800/50';
            case 'uncommon': return 'text-green-400 border-green-600 bg-green-900/20';
            case 'rare': return 'text-blue-400 border-blue-600 bg-blue-900/20';
            case 'legendary': return 'text-orange-400 border-orange-600 bg-orange-900/20';
            default: return 'text-gray-300 border-gray-600 bg-gray-800/50';
        }
    };

    const getRarityLabel = (rarity: string) => {
        const labels: Record<string, { zh: string; en: string }> = {
            common: { zh: '普通', en: 'Common' },
            uncommon: { zh: '罕见', en: 'Uncommon' },
            rare: { zh: '稀有', en: 'Rare' },
            legendary: { zh: '传说', en: 'Legendary' }
        };
        return labels[rarity]?.[locale as 'zh' | 'en'] || rarity;
    };

    // 按稀有度分组
    const symbolsByRarity = {
        common: Object.values(SYMBOLS).filter(s => s.rarity === 'common'),
        uncommon: Object.values(SYMBOLS).filter(s => s.rarity === 'uncommon'),
        rare: Object.values(SYMBOLS).filter(s => s.rarity === 'rare'),
        legendary: Object.values(SYMBOLS).filter(s => s.rarity === 'legendary'),
    };

    return (
        <main className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href={`/${locale}`}
                        className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 mb-4 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span>{locale === 'zh' ? '返回游戏' : 'Back to Game'}</span>
                    </Link>
                    <h1 className="text-4xl font-black text-yellow-400 mb-2">
                        {locale === 'zh' ? '符号图鉴' : 'Symbol Guide'}
                    </h1>
                    <p className="text-gray-400">
                        {locale === 'zh'
                            ? '了解每个符号的作用和协同效应'
                            : 'Learn about each symbol and their synergies'}
                    </p>
                </div>

                {/* Symbols by Rarity */}
                {(['legendary', 'rare', 'uncommon', 'common'] as const).map(rarity => (
                    <div key={rarity} className="mb-8">
                        <h2 className={`text-2xl font-bold mb-4 ${getRarityColor(rarity).split(' ')[0]}`}>
                            {getRarityLabel(rarity)} ({symbolsByRarity[rarity].length})
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {symbolsByRarity[rarity].map(symbol => (
                                <div
                                    key={symbol.id}
                                    className={`p-4 rounded-xl border-2 ${getRarityColor(symbol.rarity)} backdrop-blur-sm transition-all hover:scale-105`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="text-5xl flex-shrink-0">
                                            {symbol.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className={`text-xl font-bold mb-1 ${getRarityColor(symbol.rarity).split(' ')[0]}`}>
                                                {getSymbolName(symbol.id, symbol.rarity)}
                                            </h3>
                                            <div className="text-sm text-gray-400 mb-2">
                                                {locale === 'zh' ? '价值' : 'Value'}: {symbol.value} 🪙
                                            </div>
                                            <p className="text-sm text-gray-300">
                                                {tDesc(symbol.id)}
                                            </p>
                                            {symbol.tags && symbol.tags.length > 0 && (
                                                <div className="mt-2 flex flex-wrap gap-1">
                                                    {symbol.tags.map(tag => (
                                                        <span
                                                            key={tag}
                                                            className="text-xs px-2 py-1 rounded-full bg-gray-700 text-gray-300"
                                                        >
                                                            #{tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Footer Tips */}
                <div className="mt-12 p-6 bg-gray-800/50 rounded-xl border-2 border-yellow-500/30">
                    <h3 className="text-xl font-bold text-yellow-400 mb-3">
                        {locale === 'zh' ? '💡 游戏提示' : '💡 Game Tips'}
                    </h3>
                    <ul className="space-y-2 text-gray-300">
                        <li>• {locale === 'zh'
                            ? '符号之间可以产生协同效应，合理搭配能获得更高收益'
                            : 'Symbols can create synergies - smart combinations yield higher rewards'}</li>
                        <li>• {locale === 'zh'
                            ? '某些符号会吞噬相邻符号，被吞噬的符号会永久从卡组移除'
                            : 'Some symbols consume adjacent ones, removing them permanently from your deck'}</li>
                        <li>• {locale === 'zh'
                            ? '传说符号非常稀有（0.3%概率），但效果强大'
                            : 'Legendary symbols are very rare (0.3% chance) but extremely powerful'}</li>
                    </ul>
                </div>
            </div>
        </main>
    );
}
