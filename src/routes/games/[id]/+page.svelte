<script lang="ts">
	import { fly } from 'svelte/transition';
	import HeaderComponent from '$lib/components/Header.svelte';
	import FooterComponent from '$lib/components/Footer.svelte';
	import Loader from '$lib/components/Loader.svelte';
	import type { Game } from '$lib/types/Game'; // Import as a type

	export let data; // Receive data from the load function in +page.server.ts

	$: game = data.game as Game | null; // Assign data.game to the game variable.

	let displayedGameName = '';
	let gameNameIndex = 0;

	// Typewriter effect logic for game name
	const typeWriterGameName = () => {
		if (game && gameNameIndex < game.title.length) {
			displayedGameName += game.title[gameNameIndex];
			gameNameIndex++;
			setTimeout(typeWriterGameName, 100); // Adjust speed here
		}
	};

	// Start the typewriter effect when the game data is available
	$: if (game) {
		displayedGameName = ''; // Reset displayed name
		gameNameIndex = 0; // Reset index
		typeWriterGameName();
	}
</script>

<svelte:head>
	<title>{game ? game.title : 'Loading...'}</title>
	<meta
		name="description"
		content={game ? `${game.title} is a ${game.genre} game published by ${game.publisher} in ${game.publisher}.` : 'Loading game details...'}
	/>
</svelte:head>

<HeaderComponent title="Game Details" />

{#if !game}
	<Loader />
{:else}
	<section
		class="relative h-[600px] bg-cover bg-center shadow-lg rounded-lg overflow-hidden"
		style="background-image: url('https://plus.unsplash.com/premium_photo-1710409625244-e9ed7e98f67b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');"
	>
		<div
			class="bg-opacity-60 absolute inset-0 flex items-center justify-center bg-gradient-to-r from-purple-800 via-transparent to-purple-800"
		>
			<div class="max-w-2xl text-center text-white p-6 rounded-lg bg-opacity-50 bg-black">
				<h1 class="mb-6 text-5xl font-extrabold tracking-wide md:text-7xl" in:fly={{ x: 300, duration: 500 }}>
					{displayedGameName}
				</h1>
			</div>
		</div>
		<div class="grid grid-cols-1 gap-6 p-8 md:grid-cols-2 lg:grid-cols-3">
			{#each Object.entries(game) as [key, value]}
				<div class="rounded-xl bg-white shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
					<p class="font-bold text-gray-700 uppercase tracking-wide">{key.replace('_', ' ')}:</p>
					<p class="text-gray-900 mt-2">{value}</p>
				</div>
			{/each}
		</div>
	</section>
{/if}

<FooterComponent />
