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
        const { grid, coins } = get();
        let totalPayout = 0;

        // Simple sum for now. Synergies come later.
        grid.flat().forEach(symbol => {
            if (symbol) {
                totalPayout += symbol.value;
            }
        });

        // Create a delay before drafting so player can see the results
        set(state => ({
            coins: state.coins + totalPayout,
            spinsUntilRent: state.spinsUntilRent - 1
        }));

        set({ phase: GamePhase.PAYOUT });

        setTimeout(() => {
            set({ phase: GamePhase.DRAFTING });
        }, 1500); // 1.5s delay to view results
    },

    draftSymbol: (symbolId: string) => {
        set(state => {
            const newDeck = [...state.deck, symbolId];
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
