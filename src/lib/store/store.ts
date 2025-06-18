export interface StoreItem {
    id: string;
    name: string;
    description: string;
    baseCost: number;
    baseProduction: number;
    owned: number;
    unlocked: boolean;
}

export const initialStoreItems: StoreItem[] = [
    {
        id: 'grandma',
        name: 'Grandma',
        description: 'A nice grandma to bake more cookies.',
        baseCost: 15,
        baseProduction: 1,
        owned: 0,
        unlocked: true
    },
    {
        id: 'factory',
        name: 'Factory',
        description: 'Mass produces cookies at industrial scale.',
        baseCost: 100,
        baseProduction: 5,
        owned: 0,
        unlocked: true
    },
    {
        id: 'farm',
        name: 'Cookie Farm',
        description: 'Grows cookie plants with questionable agricultural science.',
        baseCost: 500,
        baseProduction: 15,
        owned: 0,
        unlocked: false
    },
    {
        id: 'mine',
        name: 'Cookie Mine',
        description: 'Digs deep into the earth to unearth ancient cookie dough.',
        baseCost: 1200,
        baseProduction: 30,
        owned: 0,
        unlocked: false
    },
    {
        id: 'temple',
        name: 'Cookie Temple',
        description: 'Summons cookies through ancient rituals and chanting.',
        baseCost: 3000,
        baseProduction: 75,
        owned: 0,
        unlocked: false
    },
    {
        id: 'wizardTower',
        name: 'Wizard Tower',
        description: 'Magic users conjuring cookies from thin air.',
        baseCost: 10000,
        baseProduction: 150,
        owned: 0,
        unlocked: false
    },
    {
        id: 'timeMachine',
        name: 'Time Machine',
        description: 'Travels back in time to harvest cookies from the past.',
        baseCost: 40000,
        baseProduction: 500,
        owned: 0,
        unlocked: false
    },
    {
        id: 'galacticBakery',
        name: 'Galactic Bakery',
        description: 'Bakes cookies using the heat of stars.',
        baseCost: 150000,
        baseProduction: 1500,
        owned: 0,
        unlocked: false
    },
    {
        id: 'cookieAI',
        name: 'Cookie AI',
        description: 'Artificial intelligence optimized for cookie production.',
        baseCost: 500000,
        baseProduction: 4000,
        owned: 0,
        unlocked: false
    },
    {
        id: 'blackHoleOven',
        name: 'Black Hole Oven',
        description: 'Harnesses the power of singularities to bake infinite cookies.',
        baseCost: 2000000,
        baseProduction: 12000,
        owned: 0,
        unlocked: false
    }
];

export function calculatePrice(item: StoreItem): number {
    return Math.floor(item.baseCost * Math.pow(1.15, item.owned));
}

export function calculateProduction(item: StoreItem): number {
    return item.baseProduction * item.owned;
}