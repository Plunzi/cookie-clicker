<script lang="ts">
	interface Props {
		open: boolean;
		animateMilk: boolean,
		animateFallingCookies: boolean,
		lockFPS: boolean,
		fpsCap: number
	}

	let { animateMilk = $bindable(), animateFallingCookies = $bindable(), fpsCap = $bindable(), lockFPS = $bindable(), open = $bindable() }: Props = $props();

	// let newBakeryname = $state(structuredClone(bakeryname));

	function closeMenu(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			open = false;
			// bakeryname = newBakeryname;
		}
	}
</script>

<svelte:window
	on:keydown={(e) => {
		if (e.key === 'Escape') {
			open = false;
			// bakeryname = newBakeryname;
		}
	}}
/>

{#if open}
	<div
		class="absolute left-0 right-0 z-20 flex h-full cursor-default flex-col justify-center bg-[#00000050] p-8 drop-shadow-2xl backdrop-blur-sm"
		onclick={closeMenu}
		onkeydown={(e) => e.key === 'Escape' && (open = false)}
		role="button"
		tabindex="-1"
	>
		<div
			role="button"
			tabindex="-1"
			class="w-full cursor-default rounded-lg bg-neutral-950 p-4"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.key === 'Escape' && (open = false)}
		>
			<div class="text-center text-white">
				<p class="font-pixel-tiny text-neutral-300">Change game settings</p>
				<h1 class="font-pixel-regular text-2xl text-white">
					Define your bakery's rules!
				</h1>
				<hr class="mb-4 mt-2 border border-neutral-800" />

				<div class="mx-auto flex rounded-lg bg-black">
					<input
						bind:value={fpsCap}
						class="w-full text-black rounded-l-md px-2 py-1 font-pixel-regular text-lg"
						type="text"
						name="rename bakery"
					/>
					<p class="w-fit rounded-r-md bg-neutral-500 px-4 font-pixel-tiny text-xl text-white flex items-center">
						FPS
					</p>
				</div>
				Animate Milk: <input type="checkbox" bind:checked={animateMilk} name="" id="" />
				Animate Falling Cookies: <input type="checkbox" bind:checked={animateFallingCookies} name="" id="" />
				LockFPS: <input type="checkbox" bind:checked={lockFPS} name="" id="" />
			</div>
		</div>
		<div class="mt-2 flex justify-end gap-2 px-4">
			<button
				class="h-8 rounded-lg bg-[#00000050] px-4 font-pixel-tiny text-xl text-white"
				onclick={() => {
					open = false;
					// newBakeryname = bakeryname;
				}}>Cancel</button
			>
			<button
				class="h-8 rounded-lg bg-neutral-500 px-4 font-pixel-tiny text-xl text-white"
				onclick={closeMenu}>Confirm</button
			>
		</div>
	</div>
{/if}
