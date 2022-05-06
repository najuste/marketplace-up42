import { ApiReturnType } from './types';

// TODO: env vars
const dataAPI = 'https://api.up42.com/marketplace/blocks';

// provider
async function getData(endpoint: string): Promise<unknown> {
    const response = await fetch(endpoint);
    if (!response.ok) {
        throw new Error(`Network response error: ${response.statusText} with code: ${response.status}`);
    }
    return response.json();
}

// application specific queries
export async function getDataBlocks(): Promise<ApiReturnType | undefined> {
    try {
        const data = await getData(dataAPI);
        return data as ApiReturnType;
    } catch (error) {
        // TODO: error logging and user alert
        console.error(error);
        window.alert(error);
    }
}
