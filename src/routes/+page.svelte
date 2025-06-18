<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet/index.js';

	let open = $state(false);

	import Cookies from '$lib/Cookies.svelte';
	import HSpacer from '$lib/HSpacer.svelte';
	import VSpacer from '$lib/VSpacer.svelte';
	import brick from '$lib/assets/brick.png';
	import Store from '$lib/store/Store.svelte';
	import Display from '$lib/store/Display.svelte';
	import { formatCookies } from '$lib/assets/format';
	import { initialStoreItems } from '$lib/store/store';

	import { loadGameState } from '$lib/store/storage';

	let savedState = loadGameState();

	let bakeryname = $state('Shiny Robot');
	let cookies = $state(savedState?.cookies ?? 0);
	let { formatedCookies, numberType }: { formatedCookies: string; numberType: string } = $derived(
		formatCookies(cookies)
	);
	
	let storeItems = $state(savedState?.storeItems ?? structuredClone(initialStoreItems));

	let cookieTypes = $state([
		{ name: 'Bread' },
		{ name: 'Cake' },
		{ name: 'Cookie' },
		{ name: 'Croissant' },
		{ name: 'Pretzel' }
	]);
</script>

<main class="flex h-[100vh] w-full bg-black">
	<Cookies bind:cookies bind:bakeryname {cookieTypes} {formatedCookies} {numberType} />

	<!-- Desktop Layout -->
	<div class="hidden xl:contents">
		<HSpacer />

		<div class="flex h-full w-full flex-col bg-[#150f15]">
			<section class="h-16">Buttons</section>
			<VSpacer />
			<section class="flex-1 p-4">
				<Display {storeItems} />
			</section>
		</div>

		<HSpacer />

		<section
			class="relative hidden h-full min-w-[30%] bg-[#2e222f] xl:flex"
			style="background-size: 10%; image-rendering: pixelated; background-image: url({brick});"
		>
			<div class="gradient absolute bottom-0 left-0 right-0 top-0"></div>
			<Store bind:cookies bind:storeItems />
		</section>
	</div>

	<!-- Mobile Layout -->
	<div class="contents xl:hidden">
		<div class="fixed right-4 top-16 z-20 flex flex-col gap-2 pt-2 xl:hidden">
			<button onclick={() => (open = true)} class="h-10 w-10 bg-red-500 hover:bg-green-500"
				>store</button
			>
			<button class="h-10 w-10 bg-red-500 hover:bg-green-500">list</button>
		</div>

		<Sheet.Root bind:open>
			<Sheet.Content class="h-full w-full !max-w-none border-neutral-800 p-0">
				<section
					class="relative flex h-full w-full bg-[#2e222f]"
					style="background-size: 10%; image-rendering: pixelated; background-image: url({brick});"
				>
					<div class="gradient absolute bottom-0 left-0 right-0 top-0"></div>
					<Store bind:cookies bind:storeItems />
				</section>
			</Sheet.Content>
		</Sheet.Root>
	</div>
</main>
