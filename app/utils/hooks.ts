'use client'
import useSWR from 'swr';
import { Artist } from './types';

const fetcher = (url: string) => fetch(url).then(res => res.json());
const fetcherWithArtists = async ([url, artistNames]: [string, string[]]) => {
    // Your fetching logic here, using `url` and `artistNames`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ artistNames }), // Ensure this matches the expected format on the server
    });
    if (!response.ok) throw new Error('Failed to fetch');
    return response.json();
};
const fetcherWithArtist = async ([url, artistName]: [string, string]) => {
    // Your fetching logic here, using `url` and `artistNames`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ artistName }), // Ensure this matches the expected format on the server
    });
    if (!response.ok) throw new Error('Failed to fetch');
    return response.json();
};

export function useUser() {
    console.log('###HOOK### useUser function hit');
    const { data, error, isLoading } = useSWR('/spotify/user', fetcher);
    return {
        user: data,
        isLoading,
        isError: error
    }
}

export function useTopArtists() {
    console.log('###HOOK### useTopArtists function hit');
    const { data, error, isLoading } = useSWR('/spotify/top-artists', fetcher);
    return {
        topArtists: data,
        isLoading,
        isError: error
    }
}

export function useTopTracks() {
    console.log('###HOOK### useTopTracks function hit');
    const { data, error, isLoading } = useSWR('/spotify/top-tracks', fetcher);
    return {
        topTracks: data,
        isLoading,
        isError: error
    }
}

export function useEvents(artistNames: string[]) {
    console.log('###HOOK### useEvents function hit');
    // const { data: orders } = useSWR(user ? ['/api/orders', user] : null, fetchWithUser)
    // const artistNames = topArtists.map(artist => artist.name);

    const { data, error, isLoading } = useSWR(artistNames.length > 0 ? ['/ticketmaster/events', artistNames] : null, fetcherWithArtists);
    return {
        events: data,
        isLoading,
        isError: error
    }
}


export function useEvent(artistName: string) {
    console.log('###HOOK### useEvent function hit');
    const { data, error, isLoading } = useSWR(  ['/ticketmaster/events', artistName], fetcherWithArtist);
    return {
        event: data,
        isLoading,
        isError: error
    }
}