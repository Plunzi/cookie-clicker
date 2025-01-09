<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet/index.js';

    let open = $state(false);

	import Cookies from '$lib/Cookies.svelte';
	import HSpacer from '$lib/HSpacer.svelte';
	import VSpacer from '$lib/VSpacer.svelte';
	import brick from '$lib/assets/brick.png';
	import { formatCookies } from '$lib/assets/format';

	let cookies = $state(999);
	let bakeryname = $state('Shiny Robot');
	let { formatedCookies, numberType }: { formatedCookies: string; numberType: string } = $derived(
		formatCookies(cookies)
	);
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
	<div class="xl:contents hidden">
		<HSpacer />
	
		<div class="h-full w-full bg-orange-900">
			<section>Buttons</section>
			<VSpacer />
			<section>Display</section>
		</div>
		
		<HSpacer />
	
		<section
			class="relative xl:flex hidden h-full min-w-[30%] bg-[#2e222f]"
			style="background-size: 10%; image-rendering: pixelated; background-image: url({brick});"
		>
			<div class="gradient absolute bottom-0 left-0 right-0 top-0"></div>
			Store
		</section>
	</div>

	<!-- Mobile Layout -->
	<div class="xl:hidden contents">
		<div class="fixed right-4 flex xl:hidden flex-col gap-2 pt-2 top-16 z-20">
			<button onclick={() => open = true} class="w-10 h-10 bg-red-500 hover:bg-green-500">store</button>
			<button class="w-10 h-10 bg-red-500 hover:bg-green-500">list</button>
		</div>
	
		<Sheet.Root bind:open={open}>
			<Sheet.Content class="h-full w-full !max-w-none p-0 border-neutral-800">
				<section
					class="relative flex h-full w-full bg-[#2e222f]"
					style="background-size: 10%; image-rendering: pixelated; background-image: url({brick});"
				>
					<div class="gradient absolute bottom-0 left-0 right-0 top-0"></div>
					Store
				</section>
			</Sheet.Content>
		</Sheet.Root>
	</div>
</main>
