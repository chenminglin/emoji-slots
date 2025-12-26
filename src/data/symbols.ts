import { SymbolDef } from '../types/game';

export const SYMBOLS: Record<string, SymbolDef> = {
    // Common
    coin: { id: 'coin', icon: '🪙', name: 'Coin', rarity: 'common', value: 1, description: 'Pays 1.', tags: [] },
    cherry: { id: 'cherry', icon: '🍒', name: 'Cherry', rarity: 'common', value: 1, description: 'Pays 1.', tags: ['fruit'] },
    flower: { id: 'flower', icon: '🌻', name: 'Flower', rarity: 'common', value: 1, description: 'Pays 1.', tags: ['plant'] },
    mouse: { id: 'mouse', icon: '🐭', name: 'Mouse', rarity: 'common', value: 1, description: 'Pays 1. Cats love it.', tags: ['animal'] },
    milk: { id: 'milk', icon: '🥛', name: 'Milk', rarity: 'common', value: 1, description: 'Pays 1.', tags: ['food', 'drink'] },
    rock: { id: 'rock', icon: '🪨', name: 'Rock', rarity: 'common', value: 0, description: 'Pays 0. Miners break it.', tags: ['mineral'] },

    // Uncommon
    rain: { id: 'rain', icon: '🌧️', name: 'Rain', rarity: 'uncommon', value: 1, description: 'Adjacent Plants +1.', tags: [] },
    dog: { id: 'dog', icon: '🐶', name: 'Dog', rarity: 'uncommon', value: 2, description: 'Adjacent Humans +2.', tags: ['animal'] },
    key: { id: 'key', icon: '🔑', name: 'Key', rarity: 'uncommon', value: 1, description: 'Opens locks/safes.', tags: [] },
    monkey: { id: 'monkey', icon: '🐒', name: 'Monkey', rarity: 'uncommon', value: 1, description: 'Eats Fruits for big bonus.', tags: ['animal'] },
    banana: { id: 'banana', icon: '🍌', name: 'Banana', rarity: 'uncommon', value: 1, description: 'Pays 1.', tags: ['fruit'] },
    lockbox: { id: 'lockbox', icon: '🔒', name: 'Lockbox', rarity: 'uncommon', value: 1, description: 'Pays 20 when opened.', tags: ['box'] },
    beer: { id: 'beer', icon: '🍺', name: 'Beer', rarity: 'uncommon', value: 1, description: 'Pays 1.', tags: ['drink'] },

    // Rare
    cat: { id: 'cat', icon: '🐱', name: 'Cat', rarity: 'rare', value: 2, description: 'Eats Mouse/Milk for +20.', tags: ['animal'] },
    sun: { id: 'sun', icon: '☀️', name: 'Sun', rarity: 'rare', value: 2, description: 'Adjacent Plants x2.', tags: [] },
    miner: { id: 'miner', icon: '⛏️', name: 'Miner', rarity: 'rare', value: 2, description: 'Mines Rock/Diamond for 10x value.', tags: ['human'] },
    diamond: { id: 'diamond', icon: '💎', name: 'Diamond', rarity: 'rare', value: 5, description: 'Pays 5.', tags: ['mineral'] },
    safe: { id: 'safe', icon: '🗝️', name: 'Safe', rarity: 'rare', value: 1, description: 'Pays 50 when opened.', tags: ['box'] },
    chef: { id: 'chef', icon: '👨‍🍳', name: 'Chef', rarity: 'rare', value: 2, description: 'Adjacent Food +2.', tags: ['human'] },

    // Legendary
    joker: { id: 'joker', icon: '🃏', name: 'Joker', rarity: 'legendary', value: 3, description: 'Adjacent x2.', tags: [] },
    king: { id: 'king', icon: '👑', name: 'King', rarity: 'legendary', value: 2, description: 'Adjacent Humans x2.', tags: ['human'] },
    dragon: { id: 'dragon', icon: '🐲', name: 'Dragon', rarity: 'legendary', value: 3, description: 'Symbol of power.', tags: ['animal'] },
};

export const STARTING_DECK: string[] = [
    'coin', 'coin',
    'cherry',
    'flower',
    'mouse',
]; // Total 5
