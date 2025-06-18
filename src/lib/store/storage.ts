import type { StoreItem } from './store';

interface GameState {
    cookies: number;
    storeItems: StoreItem[];
}

export function saveGameState(cookies: number, storeItems: StoreItem[]): void {
    console.log(cookies, storeItems);

    const gameState: GameState = {
        cookies,
        storeItems: structuredClone(storeItems)
    };

    const stateString = JSON.stringify(gameState);
    const base64State = btoa(stateString);

    console.log(base64State);

    localStorage.setItem('cookieClickerState', base64State);
}

export function loadGameState(): GameState | null {
    const base64State = localStorage.getItem('cookieClickerState');
    if (!base64State) return null;

    try {
        const stateString = atob(base64State);
        const gameState: GameState = JSON.parse(stateString);
        return {
            cookies: gameState.cookies,
            storeItems: structuredClone(gameState.storeItems)
        };
    } catch (error) {
        console.error('Failed to load game state:', error);
        return null;
    }
}