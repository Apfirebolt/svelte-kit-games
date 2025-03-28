<script lang="ts">
    import { writable } from 'svelte/store';
    import { count, name } from '$lib/store';

    // Local store
    const localCount = writable(0);

    // Functions for global store
    function incrementGlobal() {
        count.update(n => n + 1);
    }

    function decrementGlobal() {
        count.update(n => n - 1);
    }

    function changeName(newName : string) {
        name.set(newName);
    }

    // Functions for local store
    function incrementLocal() {
        localCount.update(n => n + 1);
    }

    function decrementLocal() {
        localCount.update(n => n - 1);
    }
</script>

<div class="container mx-auto my-3 px-2 py-4 bg-gray-100 rounded-lg" data-aos="fade-up">
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
    <p>Name: {$name}</p>
    <input 
        type="text" 
        placeholder="Change Name" 
        on:input={(e) => changeName(e.target.value)} 
        class="border border-gray-300 rounded px-2 py-1 w-full mt-2"
    />
</div>

<div class="container mx-auto my-3 px-2 py-4 bg-gray-100 rounded-lg" data-aos="zoom-in-left">
    <h2>Local Store</h2>
    <p>Count: {$localCount}</p>
    <button 
        on:click={incrementLocal} 
        class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
        Increment Local
    </button>
    <button 
        on:click={decrementLocal} 
        class="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition">
        Decrement Local
    </button>
</div>