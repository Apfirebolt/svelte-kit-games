import type { PageServerLoad } from './$types';
import httpClient from '$lib/plugins/interceptor';
import type { Game } from '$lib/types/Game';


export const load: PageServerLoad = async ({ params }) => {
    const { id } = params;

    try {
        const response = await httpClient.get<Game>(`${id}`);
        const game = response.data;
        return { game }; // Return game details to the page
    } catch (error) {
        console.error('API Error:', error);
        return { game: null }; // Handle errors gracefully
    }
};
