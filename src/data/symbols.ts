import { SymbolDef } from '../types/game';

export const SYMBOLS: Record<string, SymbolDef> = {
    coin: {
        id: 'coin',
        icon: '🪙',
        name: 'Coin',
        rarity: 'common',
        value: 1,
        description: 'Pays 1.',
    },
    cherry: {
        id: 'cherry',
        icon: '🍒',
        name: 'Cherry',
        rarity: 'common',
        value: 1,
        description: 'Pays 1.',
    },
    flower: {
        id: 'flower',
        icon: '🌻',
        name: 'Flower',
        rarity: 'common',
        value: 1,
        description: 'Pays 1.',
    },
    mouse: {
        id: 'mouse',
        icon: '🐭',
        name: 'Mouse',
        rarity: 'common',
        value: 1,
        description: 'Pays 1. Tasty for cats.',
    },
    poop: {
        id: 'poop',
        icon: '💩',
        name: 'Poop',
        rarity: 'common',
        value: 0,
        description: 'Pays nothing.',
    },
    cat: {
        id: 'cat',
        icon: '🐱',
        name: 'Cat',
        rarity: 'rare',
        value: 2,
        description: 'Pays 2. Eats nearby types.',
    },
    sun: {
        id: 'sun',
        icon: '☀️',
        name: 'Sun',
        rarity: 'rare',
        value: 2,
        description: 'Pays 2. Buffs flowers.',
    },
};

export const STARTING_DECK: string[] = [
    'coin', 'coin', 'coin', 'coin',
    'cherry', 'cherry',
    'flower',
    'mouse',
    'poop',
]; // Total 9, rest empty
