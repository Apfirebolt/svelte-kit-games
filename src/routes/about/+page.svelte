<script lang="ts">
    import { fly } from 'svelte/transition';
    import HeaderComponent from '$lib/components/Header.svelte';
    import FooterComponent from '$lib/components/Footer.svelte';
    import StoreComponent from '$lib/components/Store.svelte';

    let text = "Welcome to Svelte Games";
    let openModal: Boolean = false;
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

    // Start the typewriter effect when the component is mounted
    typeWriter();
</script>

<HeaderComponent title="About" />

<section class="relative bg-cover bg-center h-[500px]" style="background-image: url('https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/03/pokemon-emerald-key-art-rayquaza.jpg');">
    <div class="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black bg-opacity-50 flex items-center justify-center">
        <div class="text-center text-white">
            <h1 class="text-4xl md:text-6xl font-bold mb-4" in:fly="{{ x: -200, duration: 500 }}">
                {displayedText}
            </h1>
            <p class="text-lg md:text-xl mb-6" in:fly="{{ x: -200, duration: 500, delay: 200 }}">
                Discover your favorite movies and more
            </p>
            <button type="button" class="btn preset-filled-primary-500">Get Started</button>
        </div>
    </div>
</section>

<StoreComponent />

<FooterComponent />
