import { create } from 'zustand';
import { SYMBOLS, STARTING_DECK } from '../data/symbols';
import { GamePhase, GridState, GridSymbol } from '../types/game';

// actually simple random string is enough for instanceId

const ROWS = 4;
const COLS = 5;

interface GameState {
    coins: number;
    rent: number;
    spinsUntilRent: number;
    deck: string[]; // List of Symbol IDs
    grid: GridState;
    phase: GamePhase;

    // Actions
    spin: () => void;
    draftSymbol: (symbolId: string) => void;
    payout: () => void;
    payRent: () => void;
}

const generateInstanceId = () => Math.random().toString(36).substr(2, 9);

export const useGameStore = create<GameState>((set, get) => ({
    coins: 10, // Starting coins
    rent: 25,
    spinsUntilRent: 5,
    deck: [...STARTING_DECK],
    grid: Array(ROWS).fill(Array(COLS).fill(null)),
    phase: GamePhase.IDLE,

    spin: () => {
        const { deck, coins, spinsUntilRent } = get();

        if (coins <= 0 && spinsUntilRent <= 0) {
            // Game Over check usually happens at rent payment, but if you can't spin...
            // For now, let's just spin.
        }

        // Deduct spin cost? Usually 1 coin to spin? Or free spin but rent is the cost?
        // Luck be a Landlord: Spin is free, Rent is the pressure.
        // We deduct 1 coin per spin? No, "Rent" is the mechanism.

        // 1. Select symbols from deck
        // Shuffle deck
        const shuffledDeck = [...deck].sort(() => 0.5 - Math.random());
        const selectedSymbolIds = shuffledDeck.slice(0, ROWS * COLS);

        // 2. Map to GridSymbols
        const symbols: GridSymbol[] = selectedSymbolIds.map(id => ({
            ...SYMBOLS[id],
            instanceId: generateInstanceId(),
        }));

        // 3. Fill with nulls if not enough
        const totalSlots = ROWS * COLS;
        while (symbols.length < totalSlots) {
            // We can add "null" implicitly by not pushing, but we need an array of 20 for the grid structure
            // Actually we need to explicitly have them to shuffle empty spots positions
            // But wait, if we shuffle the deck first, we basically picked N items.
            // Now we need to place them in 20 slots randomly.
            break;
        }

        // Create a flat array of 20 items (symbols + nulls)
        const flatGrid: (GridSymbol | null)[] = [...symbols];
        while (flatGrid.length < totalSlots) {
            flatGrid.push(null);
        }

        // Shuffle the grid positions so empty spots aren't always at the end
        flatGrid.sort(() => 0.5 - Math.random());

        // 4. Transform to 2D array
        const newGrid: GridState = [];
        for (let i = 0; i < ROWS; i++) {
            newGrid.push(flatGrid.slice(i * COLS, (i + 1) * COLS));
        }

        set({ phase: GamePhase.SPINNING, grid: newGrid });

        // Transition to Payout after delay (simulated here, but usually triggered by animation completion)
        // For now we set it, but UI will likely trigger the "End Spin" -> "Payout" logic.
        setTimeout(() => {
            get().payout();
        }, 1500); // 1.5s spin time to let staggered animations finish
    },

    payout: () => {
        const { grid, coins, deck } = get();

        const ROWS = 4;
        const COLS = 5;

        let framePayout = 0;
        const instancesToRemove: string[] = []; // ID of symbols to remove from deck

        // Helper to get neighbors
        const getNeighbors = (r: number, c: number) => {
            const neighbors = [];
            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                    if (dr === 0 && dc === 0) continue;
                    const nr = r + dr;
                    const nc = c + dc;
                    if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
                        const sym = grid[nr][nc];
                        if (sym) neighbors.push({ r: nr, c: nc, sym });
                    }
                }
            }
            return neighbors;
        };

        // 1. Calculate Score & Interactions
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                const s = grid[r][c];
                if (!s) continue;
                if (instancesToRemove.includes(s.instanceId)) continue; // Already eaten

                let itemValue = s.value;
                let multiplier = 1;
                let adder = 0;

                const neighbors = getNeighbors(r, c);

                // --- BUFFS (Multipliers / Additions) ---

                // Rain -> +1 to Plants (This needs to be checked from Rain's perspective? 
                // Or better: Plant checks for Rain. GDD: Rain buffs adjacent plants. 
                // Implementation: Plant checks neighbor Rains.)
                if (s.tags?.includes('plant')) {
                    neighbors.forEach(n => {
                        if (n.sym.id === 'rain') adder += 1;
                        if (n.sym.id === 'sun') multiplier *= 2;
                    });
                }

                // Human checks (Dog, King)
                if (s.tags?.includes('human')) {
                    neighbors.forEach(n => {
                        if (n.sym.id === 'dog') adder += 2;
                        if (n.sym.id === 'king') multiplier *= 2;
                    });
                }

                // Food checks (Chef)
                if (s.tags?.includes('food')) {
                    neighbors.forEach(n => {
                        if (n.sym.id === 'chef') adder += 2;
                    });
                }

                // Joker (Buffs everything)
                neighbors.forEach(n => {
                    if (n.sym.id === 'joker') multiplier *= 2;
                });


                // --- CONSUMPTION / ACTIONS (Active Triggers) ---

                // Cat eats Mouse/Milk
                if (s.id === 'cat') {
                    const food = neighbors.find(n => !instancesToRemove.includes(n.sym.instanceId) && (n.sym.id === 'mouse' || n.sym.id === 'milk'));
                    if (food) {
                        instancesToRemove.push(food.sym.instanceId);
                        itemValue += 20;
                    }
                }

                // Monkey eats Fruit
                if (s.id === 'monkey') {
                    const fruit = neighbors.find(n => !instancesToRemove.includes(n.sym.instanceId) && n.sym.tags?.includes('fruit') && n.sym.id !== 'monkey');
                    if (fruit) {
                        instancesToRemove.push(fruit.sym.instanceId);
                        itemValue += (fruit.sym.value * 6);
                    }
                }

                // Miner mines Rock/Diamond
                if (s.id === 'miner') {
                    const ore = neighbors.find(n => !instancesToRemove.includes(n.sym.instanceId) && n.sym.tags?.includes('mineral'));
                    if (ore) {
                        instancesToRemove.push(ore.sym.instanceId);
                        itemValue += (ore.sym.value * 10);
                    }
                }

                // Key opens Lockbox/Safe
                if (s.id === 'key') {
                    const box = neighbors.find(n => !instancesToRemove.includes(n.sym.instanceId) && (n.sym.id === 'lockbox' || n.sym.id === 'safe'));
                    if (box) {
                        instancesToRemove.push(box.sym.instanceId);
                        if (box.sym.id === 'lockbox') itemValue += 20;
                        if (box.sym.id === 'safe') itemValue += 50;
                    }
                }

                // Dog acts as human buff, but simplified above.

                // Final Score for this symbol
                const finalValue = (itemValue + adder) * multiplier;
                framePayout += finalValue;

                // Update grid value for UI Popup
                if (finalValue !== s.value) {
                    s.value = finalValue;
                }
            }
        }

        // 2. Remove Eaten Items from Deck & Grid
        let newDeck = [...deck];
        // Clone grid for state update
        const newGrid = grid.map(row => row.map(s => s ? { ...s } : null));

        if (instancesToRemove.length > 0) {
            instancesToRemove.forEach(instanceId => {
                for (let r = 0; r < ROWS; r++) {
                    for (let c = 0; c < COLS; c++) {
                        if (newGrid[r][c]?.instanceId === instanceId) {
                            const symId = newGrid[r][c]!.id;
                            // Remove from Deck (Find first matching ID)
                            const idx = newDeck.indexOf(symId);
                            if (idx > -1) newDeck.splice(idx, 1);

                            // Clear from Grid (Set to null or maybe a specialized "Empty" state?)
                            // Setting to null currently renders nothing.
                            // But we might want to keep it visible for the "Payout" phase so we see it WAS there?
                            // If we remove it now, the player won't see what was eaten if the animation is fast.
                            // LbaL approach: The eaten item stays for the turn, but plays a specific animation.
                            // For this MVP, let's keep it in the GRID for visuals, but mark it as 0 value?
                            // Or just remove it from DECK (permanent) but leave on GRID (temporary).

                            // Actually, if we leave it on grid, it might be confusing if we don't zero its value.
                            // But it was "Eaten", so it shouldn't produce value? 
                            // Wait, we already calculated payout. 
                            // So leaving it on grid is fine for visuals.

                            // Let's just remove from DECK so it doesn't appear NEXT time.
                        }
                    }
                }
            });
        }

        // Show Interaction visuals (Eating/Consuming)
        // Mark eaten items in grid
        instancesToRemove.forEach(id => {
            for (let r = 0; r < ROWS; r++) {
                for (let c = 0; c < COLS; c++) {
                    if (newGrid[r][c]?.instanceId === id) {
                        newGrid[r][c]!.isEaten = true;
                    }
                }
            }
        });

        // 1. INTERACTION PHASE (Animation of eating)
        set({ phase: GamePhase.INTERACTION, grid: newGrid, deck: newDeck });

        setTimeout(() => {
            // 2. SCORING PHASE (Popups fly up)
            set({ phase: GamePhase.SCORING });

            // 3. Update Money (after flight time)
            setTimeout(() => {
                set(state => ({
                    coins: state.coins + framePayout,
                    spinsUntilRent: state.spinsUntilRent - 1
                }));
            }, 1200);

            // 4. Move to Draft
            setTimeout(() => {
                set({ phase: GamePhase.DRAFTING });
            }, 2000);

        }, 1000); // 1s for eating animation
    },

    draftSymbol: (symbolId: string) => {
        set(state => {
            // Only add to deck if it's not a skip action
            const newDeck = (symbolId === 'skip') ? state.deck : [...state.deck, symbolId];
            let { coins, rent, spinsUntilRent, phase } = state;

            // Logic: Draft happens, then we prepare for next spin.
            // If spinsUntilRent was 1 (now 0 after spin? No, usually decrement at start or end of spin).
            // Let's say we decrement at Payout.

            if (spinsUntilRent <= 0) {
                if (coins >= rent) {
                    // Pay rent
                    coins -= rent;
                    rent += 25; // Increase rent
                    spinsUntilRent = 5; // Reset cycle
                    // Maybe show a "Rent Paid!" notification
                } else {
                    phase = GamePhase.GAME_OVER;
                }
            }

            if (phase !== GamePhase.GAME_OVER) {
                phase = GamePhase.IDLE;
            }

            return {
                deck: newDeck,
                coins,
                rent,
                spinsUntilRent,
                phase
            };
        });
    },

    payRent: () => {
        // Manual pay not needed if auto
    }
}));
