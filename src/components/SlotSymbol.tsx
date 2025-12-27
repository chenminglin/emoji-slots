"use client";

import { motion, AnimatePresence } from "framer-motion";
import { GridSymbol } from "@/types/game";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface SlotSymbolProps {
    symbol: GridSymbol | null;
    className?: string;
    isSpinning: boolean;
    isScoring: boolean;
    delay: number;
    colIndex: number;
    rowIndex: number;
}

export function SlotSymbol({ symbol, className, isSpinning, isScoring, delay, colIndex, rowIndex }: SlotSymbolProps) {
    const [visualSpinning, setVisualSpinning] = useState(isSpinning);

    useEffect(() => {
        if (isSpinning) {
            setVisualSpinning(true);
        } else {
            const timeout = setTimeout(() => {
                setVisualSpinning(false);
            }, delay * 1000);
            return () => clearTimeout(timeout);
        }
    }, [isSpinning, delay]);

    return (
        <div
            className={cn(
                "flex items-center justify-center aspect-square bg-gray-800 rounded-lg text-4xl select-none shadow-inner border border-gray-700 relative",
                className
            )}
        >
            {/* Inner Content Clipper - Clips spinning elements but allows flying numbers to stay outside if placed outside this */}
            <div className="absolute inset-0 overflow-hidden rounded-lg flex items-center justify-center">
                <AnimatePresence mode="wait">
                    {visualSpinning ? (
                        <motion.div
                            key="blur"
                            initial={{ y: -20, filter: "blur(2px)", opacity: 0.8 }}
                            animate={{ y: 20 }}
                            exit={{ y: 50, opacity: 0, transition: { duration: 0.1 } }}
                            transition={{
                                repeat: Infinity,
                                duration: 0.1,
                                ease: "linear",
                                repeatType: "loop"
                            }}
                            className="absolute inset-0 flex flex-col items-center justify-center gap-8"
                        >
                            {/* Fake moving strip */}
                            <span>🍒</span>
                            <span>💎</span>
                            <span>🪙</span>
                        </motion.div>
                    ) : (
                        symbol ? (
                            <motion.div
                                key={symbol!.instanceId} // Triggers animation on new symbol
                                initial={{ y: -50, scale: 0.5, opacity: 0 }}
                                animate={{ y: 0, scale: 1, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                                {symbol!.icon}
                            </motion.div>
                        ) : (
                            <div className="text-gray-700 text-sm"></div>
                        )
                    )}
                </AnimatePresence>

                {/* Eaten Animation (Red X) - Inside clipper to match symbol bounds */}
                <AnimatePresence>
                    {symbol?.isEaten && !isSpinning && (
                        <motion.div
                            key="eaten-x"
                            className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
                            initial={{ opacity: 0, scale: 2, rotate: -45 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 20
                            }}
                        >
                            <X className="text-red-600 w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" strokeWidth={3} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Flying Number - Outside Clipper so it can fly off grid */}
            <AnimatePresence>
                {!visualSpinning && isScoring && symbol && !symbol.isEaten && (
                    <motion.div
                        key="payout"
                        initial={{ y: 0, x: 0, opacity: 0, scale: 0.5 }}
                        animate={{
                            // Accurately converge to balance position
                            // Header is above the grid. Distance depends on vertical centering.
                            // Horizontal: Target left edge. col 0 is left, col 4 is right. 
                            // Vertical: Target header. Row 0 is top, row 3 is bottom.
                            y: [0, -30, -350 - (rowIndex * 80)],
                            x: [0, 0, -(colIndex * 85 + 20)],
                            opacity: [0, 1, 1, 0.5, 0],
                            scale: [0.5, 1.3, 1, 0.3, 0]
                        }}
                        transition={{
                            duration: 1.6, // User tweaked this to 1.6 in the previous turn's manual edit
                            times: [0, 0.1, 0.7, 0.9, 1],
                            ease: "easeInOut"
                        }}
                        className={cn(
                            "absolute font-black text-3xl z-50 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] pointer-events-none",
                            symbol!.isModified ? "text-red-500" : "text-yellow-400"
                        )}
                        style={{ textShadow: symbol!.isModified ? "0 0 10px rgba(239, 68, 68, 0.5)" : "0 0 10px rgba(250, 204, 21, 0.5)" }}
                    >
                        +{symbol!.value}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
