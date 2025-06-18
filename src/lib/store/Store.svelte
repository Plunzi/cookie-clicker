<script lang="ts">
    import { initialStoreItems, type StoreItem, calculatePrice, calculateProduction } from './store';
    import { formatCookies } from '../assets/format';
    import { loadGameState, saveGameState } from './storage';
    import { onMount } from 'svelte';

    interface Props {
        cookies: number;
        storeItems?: StoreItem[];
    }

    let { cookies = $bindable(), storeItems = $bindable(structuredClone(initialStoreItems)) }: Props = $props();

    // Load saved game state on mount
    $effect(() => {
        const savedState = loadGameState();
        if (savedState) {
            cookies = savedState.cookies;
            storeItems = structuredClone(savedState.storeItems);
        }
    });

    // Start auto-save every 5 seconds
    onMount(() => {
        const saveInterval = setInterval(() => {
            saveGameState(cookies, storeItems);
        }, 5000);

        return () => clearInterval(saveInterval);
    });

    function buyItem(item: StoreItem) {
        const price = calculatePrice(item);
        if (cookies >= price) {
            cookies -= price;
            const itemIndex = storeItems.findIndex(i => i.id === item.id);
            if (itemIndex !== -1) {
                storeItems[itemIndex] = { ...storeItems[itemIndex], owned: storeItems[itemIndex].owned + 1 };
            }
        }

        // Save game state after buying an item
        saveGameState(cookies, storeItems);
    }

    // Calculate total cookies per second
    $effect(() => {
        const interval = setInterval(() => {
            let production = 0;
            storeItems.forEach(item => {
                production += calculateProduction(item);
            });
            cookies += production;
        }, 1000);

        return () => clearInterval(interval);
    });
</script>

<div class="flex flex-col gap-4 p-4 text-white w-full relative z-10">
    <h2 class="font-pixel-regular text-2xl">Store</h2>
    
    {#each storeItems as item}
        {@const price = calculatePrice(item)}
        {@const { formatedCookies: formattedPrice } = formatCookies(price)}
        {@const production = calculateProduction(item)}

        <button
            class="flex w-full flex-col gap-2 p-4 rounded-lg transition-colors"
            class:bg-neutral-800={cookies >= price}
            class:bg-neutral-900={cookies < price}
            class:cursor-not-allowed={cookies < price}
            onclick={() => buyItem(item)}
        >
            <div class="flex justify-between items-center">
                <p class="font-pixel-tiny text-xl">{item.name} <span class="font-pixel-tiny text-sm text-neutral-400">Producing: {production} 🍪/s</span></p>
                <span class="font-pixel-tiny flex gap-2 text-xl">{formattedPrice} <img class="w-7 h-7" src="/cookies/cookie.png" alt="cookie"></span>
            </div>
            <div class="flex justify-between items-center text-neutral-400">
                <span class="font-pixel-tiny text-sm">{item.description}</span>
                <span class="font-pixel-tiny text-sm">Owned: {item.owned}</span>
            </div>
        </button>
    {/each}
</div>