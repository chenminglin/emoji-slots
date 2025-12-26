"use client";

import { GridState } from "@/types/game";
import { SlotSymbol } from "./SlotSymbol";

interface SlotGridProps {
    grid: GridState;
}

export function SlotGrid({ grid, isSpinning }: SlotGridProps & { isSpinning: boolean }) {
    return (
        <div className="grid grid-cols-5 gap-2 p-4 bg-gray-900 rounded-xl border-4 border-yellow-600 shadow-2xl w-full max-w-md mx-auto aspect-[5/4]">
            {grid.map((row, rowIndex) =>
                row.map((symbol, colIndex) => (
                    <SlotSymbol
                        key={`${rowIndex}-${colIndex}-${symbol ? symbol.instanceId : 'empty'}`}
                        symbol={symbol}
                        isSpinning={isSpinning}
                        delay={colIndex * 0.1 + rowIndex * 0.05}
                    />
                ))
            )}
        </div>
    );
}
