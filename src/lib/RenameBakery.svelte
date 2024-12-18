<script lang="ts">
	interface Props {
		bakeryname: string;
		open: boolean;
	}

	let { bakeryname = $bindable(), open = $bindable() }: Props = $props();

	let newBakeryname = $state(structuredClone(bakeryname));

	function closeMenu(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			open = false;
			bakeryname = newBakeryname;
		}
	}
</script>

<svelte:window
	on:keydown={(e) => {
		if (e.key === 'Escape') {
			open = false;
			bakeryname = newBakeryname;
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
			<div class="text-center">
				<p class="font-pixel-tiny text-neutral-300">Name your bakery</p>
				<h1 class="font-pixel-regular text-2xl text-white">
					How shall guests call your fancy bakery?
				</h1>
				<hr class="mb-4 mt-2 border border-neutral-800" />

				<div class="mx-auto flex rounded-lg bg-black">
					<input
						bind:value={newBakeryname}
						class="w-full rounded-l-md px-2 py-1 font-pixel-regular text-lg"
						type="text"
						name="rename bakery"
					/>
					<button class="w-fit rounded-r-md bg-neutral-500 px-4 font-pixel-tiny text-xl text-white"
						>Random</button
					>
				</div>
			</div>
		</div>
		<div class="mt-2 flex justify-end gap-2 px-4">
			<button
				class="h-8 rounded-lg bg-[#00000050] px-4 font-pixel-tiny text-xl text-white"
				onclick={() => {
					open = false;
					newBakeryname = bakeryname;
				}}>Cancel</button
			>
			<button
				class="h-8 rounded-lg bg-neutral-500 px-4 font-pixel-tiny text-xl text-white"
				onclick={closeMenu}>Confirm</button
			>
		</div>
	</div>
{/if}
