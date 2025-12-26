export type Rarity = 'common' | 'uncommon' | 'rare' | 'legendary';

export interface SymbolDef {
    id: string;
    icon: string; // The emoji char
    name: string;
    rarity: Rarity;
    value: number;
    description: string;
    // Future: effects/synergies
}

// Instance of a symbol on the grid (in case we need unique IDs per instance later)
export interface GridSymbol extends SymbolDef {
    instanceId: string;
}

export type GridState = (GridSymbol | null)[][]; // 4 rows x 5 cols

export enum GamePhase {
    IDLE = 'idle',
    SPINNING = 'spinning',
    PAYOUT = 'payout',
    DRAFTING = 'drafting',
    GAME_OVER = 'game_over',
}
