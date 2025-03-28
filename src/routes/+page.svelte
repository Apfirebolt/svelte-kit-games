<script>
    import { fly } from 'svelte/transition';
    import { writable } from 'svelte/store';
    import { count } from '$lib/store';
    import HeaderComponent from '$lib/components/Header.svelte';

    let text = "Welcome to Svelte Games";
    let displayedText = "";
    let index = 0;

    // Typewriter effect logic
    const typeWriter = () => {
        if (index < text.length) {
            displayedText += text[index];
            index++;
            setTimeout(typeWriter, 100); // Adjust speed here
        }
    };

    // Functions for global store
    function incrementGlobal() {
        count.update(n => n + 1);
    }

    function decrementGlobal() {
        count.update(n => n - 1);
    }

    // Start the typewriter effect when the component is mounted
    typeWriter();
</script>

<svelte:head>
	<title>Svelte Kit Games - Home</title>
	<meta
		name="description"
		content="Discover the latest games, reviews, and more on Svelte Kit Games. Your ultimate gaming destination."
	/>
</svelte:head>

<HeaderComponent />

<section class="relative bg-cover bg-center h-[500px]" style="background-image: url('https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/03/pokemon-emerald-key-art-rayquaza.jpg');">
    <div class="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black bg-opacity-50 flex items-center justify-center">
        <div class="text-center text-white">
            <h1 class="text-4xl md:text-6xl font-bold mb-4" in:fly={{ y: 50, duration: 500 }}>
                {displayedText}
            </h1>
            <p class="text-lg md:text-xl mb-6" in:fly={{ y: 50, duration: 500, delay: 200 }}>
                Discover your favorite games and more
            </p>
            <button class="px-6 py-3 bg-midnight hover:bg-blue-700 text-white font-semibold rounded-lg" in:fly={{ y: 50, duration: 500, delay: 400 }}>
                Get Started
            </button>
        </div>
    </div>
</section>

<section class="py-12 bg-gray-100">
    <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold text-center mb-8" in:fly={{ y: 50, duration: 500 }}>
            Explore Our Features
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="text-center p-6 bg-white shadow-lg rounded-lg" in:fly={{ y: 50, duration: 500 }}>
                <h3 class="text-xl font-semibold mb-4">Browse Games</h3>
                <p>Find Games by genre, rating, or release date.</p>
            </div>
            <div class="text-center p-6 bg-white shadow-lg rounded-lg" in:fly={{ y: 50, duration: 500, delay: 200 }}>
                <h3 class="text-xl font-semibold mb-4">Create Watchlists</h3>
                <p>Save your favorite Games to play later.</p>
            </div>
            <div class="text-center p-6 bg-white shadow-lg rounded-lg" in:fly={{ y: 50, duration: 500, delay: 400 }}>
                <h3 class="text-xl font-semibold mb-4">Get Recommendations</h3>
                <p>Discover Games tailored to your taste.</p>
            </div>
        </div>
    </div>
</section>

<section class="py-12 bg-gray-100">
    <div class="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Left Column (2/3) -->
        <div class="md:col-span-2">
            <h2 class="text-3xl font-bold text-center mb-8" data-aos="fade-up">
            Explore Our Features
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="text-center p-6 bg-white shadow-lg rounded-lg" data-aos="fade-up">
                <h3 class="text-xl font-semibold mb-4">Browse Games</h3>
                <p>Find Games by genre, rating, or release date.</p>
            </div>
            <div class="text-center p-6 bg-white shadow-lg rounded-lg" data-aos="fade-up" data-aos-delay="200">
                <h3 class="text-xl font-semibold mb-4">Create Watchlists</h3>
                <p>Save your favorite Games to play later.</p>
            </div>
            <div class="text-center p-6 bg-white shadow-lg rounded-lg" data-aos="fade-up" data-aos-delay="400">
                <h3 class="text-xl font-semibold mb-4">Get Recommendations</h3>
                <p>Discover Games tailored to your taste.</p>
            </div>
            </div>
        </div>
        <!-- Right Column (1/3) -->
        <div class="text-center p-6 bg-white shadow-lg rounded-lg" data-aos="fade-left" in:fly={{ y: 50, duration: 500 }}>
            <h3 class="text-xl font-semibold mb-4">Special Feature</h3>
            <p>Highlight a unique feature or promotion here.</p>

            <h2>Global Store</h2>
            <p>Count: {$count}</p>
            <button 
                on:click={incrementGlobal} 
                class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                Increment Global
            </button>
            <button 
                on:click={decrementGlobal} 
                class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
                Decrement Global
            </button>
                </div>
            </div>
</section>