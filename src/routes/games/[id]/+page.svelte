<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import HeaderComponent from '$lib/components/Header.svelte';
	import Loader from '$lib/components/Loader.svelte';
	import type { Game } from '$lib/types/Game'; // Import as a type

	export let data; // Receive data from the load function in +page.server.ts

	$: game = data.game as Game | null; // Assign data.game to the game variable.

	let displayedGameName = '';
	let clientOnly = false; // Flag to indicate if the component is mounted in the client
	let gameNameIndex = 0;
	let showImage = false; // Flag to control image visibility

	const showGameImage = (game: Game) => {
		return `https://www.vgchartz.com${game.img}`;
	};

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

	// Set clientOnly to true when the component is mounted on the client
	onMount(() => {
		clientOnly = true;
		setTimeout(() => {
			showImage = true; // Show the image after 1 second
		}, 1000);
	});
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
	<section class="bg-gradient-to-b from-blue-500 via-purple-600 to-pink-500 py-4 px-2">
		<div class="max-w-2xl text-center mx-auto text-white p-6 rounded-lg bg-opacity-50 bg-black">
			<h1 class="mb-6 text-5xl font-extrabold tracking-wide md:text-7xl" in:fly={{ x: 300, duration: 500 }}>
				{displayedGameName}
			</h1>
			{#if clientOnly && showImage}
				<img
					class="mx-auto mb-6 rounded-lg h-64 w-128 shadow-lg"
					src={showGameImage(game)}
					alt={game.title}
					in:fade={{ duration: 1000 }}
				/>
			{/if}
			<p class="text-lg">
				<strong>Genre:</strong> {game.genre}
			</p>
			<p class="text-lg">
				<strong>Publisher:</strong> {game.publisher}
			</p>
			<p class="text-lg">
				<strong>Console:</strong> {game.console}
			</p>
			<p class="text-lg">
				<strong>Year Released:</strong> {game.release_date}
			</p>
			<p class="text-lg">
				<strong>Critic Score:</strong> {game.critic_score}
			</p>
			<p class="text-lg">
				<strong>Total Sales:</strong> {game.total_sales}
			</p>
		</div>
	</section>
{/if}
