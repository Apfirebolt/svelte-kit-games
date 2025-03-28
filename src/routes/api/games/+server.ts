import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import httpClient from '$lib/plugins/interceptor'
import type { ApiResponse } from '$lib/types/Game';

export const GET: RequestHandler = async () => {
  try {
    const response = await httpClient.get();
    if (response.status < 200 || response.status >= 300) {
      return json({ error: 'Failed to fetch data from the API' }, { status: response.status });
    }
    const data: ApiResponse = response.data;
    return json(data);
  } catch (error: any) {
    console.error('API Error:', error);
    return json({ error: error.response?.data?.message || 'Internal Server Error' }, { status: error.response?.status || 500 });
  }
};
