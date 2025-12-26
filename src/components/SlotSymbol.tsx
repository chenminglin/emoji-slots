"use client";

import { motion, AnimatePresence } from "framer-motion";
import { GridSymbol } from "@/types/game";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface SlotSymbolProps {
    symbol: GridSymbol | null;
    className?: string;
    isSpinning: boolean;
    delay: number;
}

export function SlotSymbol({ symbol, className, isSpinning, delay }: SlotSymbolProps) {
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
                "flex items-center justify-center aspect-square bg-gray-800 rounded-lg text-4xl select-none shadow-inner border border-gray-700 overflow-hidden relative",
                className
            )}
        >
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
                        <span>❓</span>
                        <span>💎</span>
                        <span>🪙</span>
                    </motion.div>
                ) : (
                    symbol ? (
                        <motion.div
                            key={symbol.instanceId} // Triggers animation on new symbol
                            initial={{ y: -50, scale: 0.5, opacity: 0 }}
                            animate={{ y: 0, scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        >
                            {symbol.icon}
                        </motion.div>
                    ) : (
                        <div className="text-gray-700 text-sm"></div>
                    )
                )}
            </AnimatePresence>
        </div>
    );
}
