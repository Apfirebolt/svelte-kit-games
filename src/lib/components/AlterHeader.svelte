<script lang="ts">
	import Icon from '@iconify/svelte';
	let menuItems = [
		{ name: 'Home', url: '/' },
		{ name: 'About', url: '/about' },
		{ name: 'Contact', url: '/contact' },
		{ name: 'Games', url: '/games' }
	];
	export let title: string = 'Svelte Kit Games';
	let isMenuOpen = false;
	let selectedUrl = '/'; // Track the currently selected URL

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function selectMenuItem(url: string) {
		selectedUrl = url;
		isMenuOpen = false; // Close the menu on selection (for mobile)
	}
</script>

<header class="bg-midnight text-white">
	<div class="container mx-auto flex items-center justify-between px-6 py-4">
		<h1 class="text-3xl font-bold text-center bg-accent text-gray-800 py-4">{title}
            <Icon icon="mdi:play-circle" class="inline-block text-midnight text-4xl ml-2 align-middle" />
        </h1>
		<button
			class="lg:hidden text-white focus:outline-none"
			on:click={toggleMenu}
			aria-label="Toggle menu"
		>
			<Icon icon="mdi:menu" class="text-3xl" />
		</button>
		<nav class="hidden lg:block">
			<ul class="flex space-x-6">
				{#each menuItems as item}
					<li class="relative group w-32">
						<a 
							href={item.url} 
							data-sveltekit-prefetch 
							class="py-2 px-4 border-2 rounded transition-all duration-300 ease-in-out group-hover:bg-bermuda group-hover:scale-105 {selectedUrl === item.url ? 'bg-amber-500 text-black' : 'text-white'}"
							on:click={() => selectMenuItem(item.url)}
						>
							{item.name}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</div>

	<!-- Mobile Menu -->
	<div
		class="fixed top-0 right-0 bg-midnight text-white z-40 h-full w-1/2 transform transition-transform duration-300 ease-in-out"
		class:translate-x-0={isMenuOpen}
		class:translate-x-full={!isMenuOpen}
	>
		<div class="flex justify-end p-4">
			<button
				class="text-white focus:outline-none"
				on:click={toggleMenu}
				aria-label="Close menu"
			>
				<Icon icon="mdi:close" class="text-3xl" />
			</button>
		</div>
		<ul class="space-y-4 px-6">
			{#each menuItems as item}
				<li class="bg-bermuda text-white px-2 py-3 text-center shadow-xl rounded hover:bg-amber-500 transition-colors duration-300">
					<a 
						href={item.url} 
						data-sveltekit-prefetch 
						class="{selectedUrl === item.url ? 'bg-amber-500 text-black' : ''}"
						on:click={() => selectMenuItem(item.url)}
					>
						{item.name}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</header>

<style>
	.translate-x-0 {
		transform: translateX(0);
	}
	.translate-x-full {
		transform: translateX(100%);
	}
</style>
