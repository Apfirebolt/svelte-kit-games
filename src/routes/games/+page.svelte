<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import HeaderComponent from '$lib/components/Header.svelte';
	import Loader from '$lib/components/Loader.svelte';
	import Icon from '@iconify/svelte';
	import httpClient from '$lib/plugins/interceptor';
	import type { Game, ApiResponse } from '$lib/types/Game';

	let games: Game[] = [];
	let searchQuery: string = '';
	let loading: boolean = true;
	let error: Error | null = null;
	let next: string | null = null;
	let previous: string | null = null;

	async function fetchGames(url: string = '') {
		try {
			loading = true;
			let response;
			if (url) {
				response = await httpClient.get(url);	
			} else {
				response = await httpClient.get();
			}
			const data: ApiResponse = response.data;
			games = data.results;
			next = data.next;
			previous = data.previous;
		} catch (err) {
			error = err instanceof Error ? err : new Error('An unknown error occurred');
		} finally {
			loading = false;
		}
	}

	async function searchGame(query: string) {
		try {
			loading = true;
			const response = await httpClient.get(`https://softgenie.org/api/games?search=${query}`);
			const data: ApiResponse = response.data;
			games = data.results;
			next = data.next;
			previous = data.previous;
		} catch (err) {
			error = err instanceof Error ? err : new Error('An unknown error occurred');
		} finally {
			loading = false;
		}
	}

	function goToNextPage() {
		if (next) {
			fetchGames(next);
		}
	}

	function goToPreviousPage() {
		if (previous) {
			fetchGames(previous);
		}
	}

	const goToMovieDetails = (game: Game) => {
		goto(`/games/${game.id}`);
	};

	let text = 'Welcome to Svelte Games';
	let displayedText = '';
	let index = 0;

	const showGameImage = (game: Game) => {
		return `https://www.vgchartz.com${game.img}`;
	}

	// Typewriter effect logic
	const typeWriter = () => {
		if (index < text.length) {
			displayedText += text[index];
			index++;
			setTimeout(typeWriter, 100); // Adjust speed here
		}
	};

	// Start the typewriter effect when the component is mounted
	typeWriter();

	onMount(() => {
		fetchGames();
	});
</script>

<svelte:head>
	<title>Games - Browse Latest Games</title>
	<meta
		name="description"
		content="Explore a collection of the latest games, including genres, ratings, and more. Find your next favorite game here!"
	/>
</svelte:head>

<HeaderComponent title="Games" />
{#if loading}
	<Loader />
{:else if error}
	<p class="text-red-500">Error loading games: {error.message}</p>
{:else}
	<div class="bg-accent-dark">
		<section
			class="relative h-[500px] bg-cover bg-center"
			style="background-image: url('https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/03/pokemon-emerald-key-art-rayquaza.jpg');"
		>
			<div
				class="bg-opacity-50 absolute inset-0 flex items-center justify-center bg-gradient-to-b from-black via-transparent to-black"
			>
				<div class="text-center text-white">
					<h1 class="mb-4 text-4xl font-bold md:text-6xl">
						{displayedText}
					</h1>
					<p class="mb-6 text-lg md:text-xl">Discover your favorite games and more</p>
					<div class="mx-auto flex justify-center items-center">
						<div class="relative w-full">
							<input
								type="text"
								placeholder="Search for games..."
								bind:value={searchQuery}
								class="text-midnight w-full rounded-lg border border-gray-300 px-4 py-2 pl-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
							/>
							<Icon
								icon="mdi:magnify"
								class="absolute text-midnight left-3 top-1/2 text-2xl transform -translate-y-1/2"
							/>
						</div>
						<button
							class="bg-midnight rounded-lg px-6 py-3 font-semibold mx-2 text-white hover:bg-blue-700 flex items-center"
							on:click={() => searchGame(searchQuery)}
						>
							Search
						</button>
					</div>
				</div>
			</div>
		</section>
		<div class="container mx-auto py-2">
			<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{#each games as game (game.id)}
					<div class="relative group bg-accent rounded-lg overflow-hidden shadow-md">
						<img
							src={showGameImage(game)}
							alt={game.title}
							class="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
						/>
						<div
							class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
						>
							<div class="p-4 text-white">
								<h2 class="mb-2 text-xl font-bold">{game.title}</h2>
								<p class="text-sm">Release Date: {game.release_date}</p>
								<p class="text-sm">Genre: {game.genre}</p>
								<p class="text-sm">Console: {game.console}</p>
								<button
									class="mt-2 rounded bg-bermuda px-4 py-2 text-white hover:bg-green-600"
									on:click={() => goToMovieDetails(game)}
								>
									<Icon icon="mdi:eye" class="mr-2 inline-block" />
									View Details
								</button>
							</div>
						</div>
					</div>
				{/each}
			</div>
			<div class="mt-4 mb-3 flex justify-center">
				<button
					class="bg-midnight hover:bg-midnight flex items-center rounded px-4 py-2 text-white disabled:opacity-50"
					on:click={goToPreviousPage}
					disabled={!previous}
				>
					<Icon icon="mdi:arrow-left" class="mr-2" />
					Previous
				</button>
				<button
					class="bg-midnight hover:bg-midnight mx-2 flex items-center rounded px-4 py-2 text-white disabled:opacity-50"
					on:click={goToNextPage}
					disabled={!next}
				>
					Next
					<Icon icon="mdi:arrow-right" class="ml-2" />
				</button>
			</div>
		</div>
	</div>
{/if}
