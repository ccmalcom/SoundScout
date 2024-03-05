'use client'
import useSWR from 'swr';
import { Artist } from './types';

const fetcher = (url: string) => fetch(url).then(res => res.json());
const fetcherWithArtists = async ([url, artistNames, userSettings]: [string, string[], object]) => {
    // Your fetching logic here, using `url` and `artistNames`
    let stringifiedArtists = JSON.stringify(artistNames);
    let stringifiedUserSettings = JSON.stringify(userSettings);
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ artistNames, userSettings }), // Ensure this matches the expected format on the server
    });
    if (!response.ok) throw new Error('Failed to fetch');
    return response.json();
};


export function useUser() {
    console.log('###HOOK### useUser function hit');
    const { data, error, isLoading } = useSWR('/spotify/user', fetcher,{
        dedupingInterval: 60000, 
        revalidateOnFocus: false, 
        revalidateOnReconnect: false, 
    });
    return {
        user: data,
        isLoading,
        isError: error
    }
}

export function useTopArtists() {
    console.log('###HOOK### useTopArtists function hit');
    const { data, error, isLoading } = useSWR('/spotify/top-artists', fetcher,{
        dedupingInterval: 60000, 
        revalidateOnFocus: false, 
        revalidateOnReconnect: false, 
    });
    return {
        topArtists: data,
        isLoading,
        isError: error
    }
}

export function useTopTracks() {
    console.log('###HOOK### useTopTracks function hit');
    const { data, error, isLoading } = useSWR('/spotify/top-tracks', fetcher,{
        dedupingInterval: 60000, 
        revalidateOnFocus: false, 
        revalidateOnReconnect: false, 
    });
    return {
        topTracks: data,
        isLoading,
        isError: error
    }
}

export function useEvents(artistNames: string[], userSettings: { location: string, city: string, distance: string }) {
    console.log('###HOOK### useEvents function hit');
    // const { data: orders } = useSWR(user ? ['/api/orders', user] : null, fetchWithUser)
    // const artistNames = topArtists.map(artist => artist.name);
    const { data, error, isLoading } = useSWR(['/ticketmaster/events', artistNames, userSettings], fetcherWithArtists,{
        dedupingInterval: 60000, 
        revalidateOnFocus: false, 
        revalidateOnReconnect: false, 
    });
    return {
        events: data,
        isLoading,
        isError: error
    }
}

