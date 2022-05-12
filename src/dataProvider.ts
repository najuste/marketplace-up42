import { ApiReturnType } from './types';

// TODO: env vars
export const dataAPI = 'https://api.up42.com/marketplace/blocks';

const dataAPIwithCORSproxy = 'https://fierce-garden-89288.herokuapp.com/' + dataAPI;

// provider
async function getData(endpoint: string): Promise<unknown> {
    const response = await fetch(endpoint);
    if (!response.ok) {
        throw new Error(`Network response error: ${response.statusText} with code: ${response.status}`);
    }
    return response.json();
}

// application specific queries
export async function getDataBlocks(): Promise<ApiReturnType | string> {
    try {
        const data = await getData(dataAPIwithCORSproxy);
        return data as ApiReturnType;
    } catch (error) {
        // TODO: error logging and user alert
        console.error(error);
        return String(error);
    }
}
