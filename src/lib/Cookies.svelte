<script lang="ts">
	interface Props {
		cookies: number;
		formatedCookies: string;
		numberType: string;
		bakeryname: string;
		cookieTypes: { name: string }[];
	}

	import brick from '$lib/assets/brick.png';
	import { summonCookie, summonText } from './assets/summons';
	import CookieCanvas from './CookieCanvas.svelte';
	import RenameBakery from './RenameBakery.svelte';
	import Settings from './Settings.svelte';

	let {
		cookies = $bindable(),
		formatedCookies,
		numberType,
		bakeryname = $bindable(),
		cookieTypes
	}: Props = $props();

	let currentCookie = $state(cookieTypes[0].name);
	let renameBackeryOpen = $state(false);
	let settingsOpen = $state(false);

	const handleCookieClick = (e: MouseEvent) => {
		e.preventDefault();

		const cursorX = e.clientX;
		const cursorY = e.clientY;

		cookies += 1;

		document.title = `${cookies} Cookies - Pixel Clicker`;
		const randomCookie = cookieTypes[Math.floor(Math.random() * cookieTypes.length)].name;

		currentCookie = randomCookie;
		document
			.getElementById('cookie')!
			.animate(
				[{ transform: 'scale(1)' }, { transform: 'scale(1.2)' }, { transform: 'scale(1)' }],
				{
					duration: 200,
					easing: 'ease-in-out'
				}
			);

		summonCookie(cursorX, cursorY, randomCookie);
		summonText(cursorX, cursorY);
	};

	let animateMilk: boolean = $state(true);
	let animateFallingCookies: boolean = $state(true);
	let lockFPS: boolean = $state(true);
	let fpsCap: number = $state(60);
</script>

<section
	class="relative flex h-full bg-[#2e222f] w-full xl:min-w-[30rem] xl:max-w-[30rem]"
	style="background-size: 10%; image-rendering: pixelated; background-image: url({brick});"
>
	<RenameBakery bind:bakeryname bind:open={renameBackeryOpen} />
	<Settings bind:animateMilk bind:animateFallingCookies bind:lockFPS bind:fpsCap bind:open={settingsOpen} />
	<div
		class="absolute left-0 right-0 top-0 z-10 mx-auto flex h-16 items-center bg-[#00000050] text-center text-white"
	>
		<button
			onclick={() => {
				renameBackeryOpen = true;
				// @ts-ignore
				document.activeElement!.blur();
			}}
			class="mx-auto rounded-lg border border-transparent bg-black px-4 py-2 font-pixel-tiny text-neutral-300 transition-all hover:scale-95 hover:border-neutral-700"
			><b class="text-neutral-100">{bakeryname}</b>'s backery</button
		>
		<button
			onclick={() => {
				settingsOpen = true;
				// @ts-ignore
				document.activeElement!.blur();
			}}
			class="absolute right-4 mx-auto rounded-lg border border-transparent bg-black w-10 h-10 font-pixel-tiny text-neutral-300 transition-all hover:scale-95 hover:border-neutral-700"
			>
			<b class="text-neutral-100">⚙️</b>
		</button>
	</div>
	<div class="relative z-10 m-auto flex flex-col items-center">
		<p class="-mb-4 text-center font-pixel-tiny text-4xl font-bold text-white">{formatedCookies}</p>
		<p class="text-center font-pixel-regular text-6xl text-white">{numberType} cookies</p>
		<p class="-m-2 text-center font-pixel-tiny text-2xl text-white">per second: {0}</p>
		<br />
		<button
			oncontextmenu={handleCookieClick}
			class="cookie-gradient mx-auto h-64 w-64 rounded-full transition-all focus:scale-100"
			onmousedown={handleCookieClick}
			id="cookie"
		>
			<img
				src="/cookies/{currentCookie.toLowerCase()}.png"
				style="image-rendering: pixelated;"
				class="h-full w-full"
				alt=""
			/>
		</button>
	</div>
	<div class="gradient absolute bottom-0 left-0 right-0 top-0"></div>
	<CookieCanvas {cookieTypes} {animateFallingCookies} {animateMilk} {fpsCap} {lockFPS} />
</section>

<style>
	.cookie-gradient {
		background: radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 80%);
	}
</style>
