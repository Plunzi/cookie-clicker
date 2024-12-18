<script lang="ts">
	import Cookies from '$lib/Cookies.svelte';
	import HSpacer from '$lib/HSpacer.svelte';
	import VSpacer from '$lib/VSpacer.svelte';
    import brick from '$lib/assets/brick.png';
	import { formatCookies } from '$lib/assets/format';

    let cookies = $state(999);
    let bakeryname = $state('Shiny Robot');
    let { formatedCookies, numberType }: { formatedCookies: string, numberType: string } = $derived(formatCookies(cookies));
    let cookieTypes = $state([
        { name: 'Bread', },
        { name: 'Cake', },
        { name: 'Cookie', },
        { name: 'Croissant', },
        { name: 'Pretzel', },
    ]);
</script>

<main class="flex h-[100vh] w-full bg-black">
    <Cookies bind:cookies bind:bakeryname cookieTypes={cookieTypes} formatedCookies={formatedCookies} numberType={numberType} />
	<HSpacer />
	<div class="h-full w-full bg-orange-900">
		<section>Buttons</section>
        <VSpacer />
		<section>Display</section>
	</div>
	<HSpacer />
    <section class="relative flex h-full min-w-[30%] bg-[#2e222f]" style="background-size: 10%; image-rendering: pixelated; background-image: url({brick});">
        <div class="absolute left-0 right-0 top-0 bottom-0 gradient"></div>
        Store
    </section>
</main>
