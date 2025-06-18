<script lang="ts">
    import type { StoreItem } from './store';
    import { formatCookies } from '../assets/format';

    interface Props {
        storeItems: StoreItem[];
    }

    let { storeItems }: Props = $props();
</script>

<div class="flex flex-col gap-2 rounded-lg">
    {#each storeItems.filter(item => item.owned > 0) as item}
        <div class="flex items-center gap-4 p-2 bg-[#2a2a2a] rounded hover:bg-[#3a3a3a] transition-colors cursor-pointer">
            <div class="w-12 h-12 bg-[#3a3a3a] rounded flex items-center justify-center">
                {#if item.id === 'grandma'}
                    👵
                {:else if item.id === 'factory'}
                    🏭
                {:else if item.id === 'mine'}
                    🏭
                {:else if item.id === 'shipment'}
                    🚢
                {:else if item.id === 'alchemy lab'}
                    🧪
                {:else if item.id === 'time machine'}
                    ⏰
                {:else if item.id === 'portal'}
                    🌌
                {/if}
            </div>
            <div class="flex-1">
                <div class="flex justify-between items-center">
                    <span class="font-pixel-tiny text-xl text-white">{item.name}</span>
                    <span class="font-pixel-tiny text-lg text-neutral-400">{item.owned}</span>
                </div>
                <div class="text-sm text-neutral-500 font-pixel-tiny">
                    Producing {item.baseProduction * item.owned} cookies per second
                </div>
            </div>
        </div>
    {/each}
</div>