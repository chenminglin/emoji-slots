"use client";

import { GridState } from "@/types/game";
import { SlotSymbol } from "./SlotSymbol";

interface SlotGridProps {
    grid: GridState;
}

export function SlotGrid({ grid, isSpinning, isScoring }: SlotGridProps & { isSpinning: boolean; isScoring: boolean }) {
    return (
        <div className="grid grid-cols-5 gap-2 lg:gap-3 p-4 lg:p-6 bg-gray-900 rounded-xl border-4 border-yellow-600 shadow-2xl w-full max-w-md lg:max-w-2xl mx-auto aspect-[5/4]">
            {grid.flatMap((row, rowIndex) =>
                row.map((symbol, colIndex) => (
                    <SlotSymbol
                        key={`${rowIndex}-${colIndex}-${symbol?.instanceId || 'empty'}`}
                        symbol={symbol}
                        isSpinning={isSpinning}
                        isScoring={isScoring}
                        colIndex={colIndex}
                        rowIndex={rowIndex}
                        delay={colIndex * 0.1 + rowIndex * 0.05}
                    />
                ))
            )}
        </div>
    );
}
