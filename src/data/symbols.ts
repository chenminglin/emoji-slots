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
    rainbow: { id: 'rainbow', icon: '🌈', name: 'Rainbow', rarity: 'legendary', value: 5, description: 'Each unique tag +3.', tags: [] },
    slotmachine: { id: 'slotmachine', icon: '🎰', name: 'Slot Machine', rarity: 'legendary', value: 0, description: 'Random 0-50 coins.', tags: [] },
    genie: { id: 'genie', icon: '🧞', name: 'Genie', rarity: 'legendary', value: 10, description: 'Adjacent x2.', tags: [] },
    wishingstar: { id: 'wishingstar', icon: '⭐', name: 'Wishing Star', rarity: 'legendary', value: 8, description: 'Copy best effect.', tags: [] },

    // === NEW SYMBOLS (Common) ===
    seed: { id: 'seed', icon: '🌱', name: 'Seed', rarity: 'common', value: 0, description: '+3 if near Sun/Rain.', tags: ['plant'] },
    carrot: { id: 'carrot', icon: '🥕', name: 'Carrot', rarity: 'common', value: 1, description: 'Rabbit food.', tags: ['plant', 'food'] },
    rabbit: { id: 'rabbit', icon: '🐰', name: 'Rabbit', rarity: 'common', value: 1, description: 'Eats Carrot +8.', tags: ['animal'] },
    apple: { id: 'apple', icon: '🍎', name: 'Apple', rarity: 'common', value: 1, description: 'A fruit.', tags: ['fruit', 'food'] },
    bee: { id: 'bee', icon: '🐝', name: 'Bee', rarity: 'common', value: 1, description: 'Each Blossom +1.', tags: ['animal'] },
    blossom: { id: 'blossom', icon: '🌸', name: 'Blossom', rarity: 'common', value: 1, description: 'A flower.', tags: ['plant'] },

    // === NEW SYMBOLS (Uncommon) ===
    farmer: { id: 'farmer', icon: '👨‍🌾', name: 'Farmer', rarity: 'uncommon', value: 2, description: 'Adjacent Plants +2.', tags: ['human'] },
    mushroom: { id: 'mushroom', icon: '🍄', name: 'Mushroom', rarity: 'uncommon', value: 2, description: 'x3 if near Rain.', tags: ['plant'] },
    fish: { id: 'fish', icon: '🐟', name: 'Fish', rarity: 'uncommon', value: 2, description: '+3 if near Water.', tags: ['animal', 'food'] },
    water: { id: 'water', icon: '💧', name: 'Water', rarity: 'uncommon', value: 1, description: 'Adjacent Plants +1, Fish +3.', tags: [] },
    fire: { id: 'fire', icon: '🔥', name: 'Fire', rarity: 'uncommon', value: 1, description: 'Burns Tree for x5.', tags: [] },
    tree: { id: 'tree', icon: '🌲', name: 'Tree', rarity: 'uncommon', value: 3, description: 'A tree.', tags: ['plant'] },

    // === NEW SYMBOLS (Rare) ===
    fox: { id: 'fox', icon: '🦊', name: 'Fox', rarity: 'rare', value: 3, description: 'Eats Rabbit x8.', tags: ['animal'] },
    moon: { id: 'moon', icon: '🌙', name: 'Moon', rarity: 'rare', value: 3, description: 'Adjacent +2.', tags: [] },
    lightning: { id: 'lightning', icon: '⚡', name: 'Lightning', rarity: 'rare', value: 2, description: 'Burns Tree, AOE +5.', tags: [] },
    vase: { id: 'vase', icon: '🏺', name: 'Antique Vase', rarity: 'rare', value: 5, description: 'Breaks if near Fire/Lightning.', tags: ['treasure'] },
    fisherman: { id: 'fisherman', icon: '🎣', name: 'Fisherman', rarity: 'rare', value: 3, description: 'Catches Fish x6.', tags: ['human'] },
    wizard: { id: 'wizard', icon: '🧙', name: 'Wizard', rarity: 'rare', value: 4, description: 'Random adjacent x2.', tags: ['human'] },
};

export const STARTING_DECK: string[] = [
    'coin', 'coin',
    'cherry',
    'flower',
    'mouse',
]; // Total 5
