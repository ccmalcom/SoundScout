'use client'
import useSWR from 'swr';
import { Artist } from './types';
import { getLatLong } from './actions';

let term = localStorage.getItem('timeRange') || 'short_term';

const fetcher = (url: string) => fetch(url).then(res => res.json());
const fetcherWithArtists = async ([url, artistNames, userSettings]: [string, string[], { location: string, city: string, distance: string }]) => {
    // Your fetching logic here, using `url` and `artistNames`
    if (!userSettings.location) {
        let location = await getLatLong(userSettings.city);
        userSettings.location = location.latitude + ',' + location.longitude;
    }
    if (!userSettings.distance) {
        userSettings.distance = '50';
    }
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

// eventFetcher using get method and trackId as query param
const detailFetcher = async ([url, id]: [string, string]) => {
    if (url.includes('track')) {

        const response = await fetch(url + '?trackId=' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) throw new Error('Failed to fetch');
        return response.json();
    } else if (url.includes('artist')) {
        
        const response = await fetch(url + '?artistId=' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) throw new Error('Failed to fetch');
        return response.json();
    }
}


export function useUser() {
    console.log('###HOOK### useUser function hit');
    const { data, error, isLoading } = useSWR('/spotify/user', fetcher, {
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
    const { data, error, isLoading } = useSWR(`/spotify/top-artists?term=${term}`, fetcher, {
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
    const { data, error, isLoading } = useSWR(`/spotify/top-tracks?term=${term}`, fetcher, {
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
    const { data, error, isLoading } = useSWR(['/ticketmaster/events', artistNames, userSettings], fetcherWithArtists, {
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

export function useTrack(trackId: string) {
    console.log('###HOOK### useTrack function hit');
    const { data, error, isLoading } = useSWR([`/spotify/track/`, trackId], detailFetcher, {
        dedupingInterval: 60000,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });
    return {
        track: data,
        isLoading,
        isError: error
    }
}

export function useTrackFeatures(trackId: string) {
    console.log('###HOOK### useTrackFeatures function hit');
    const { data, error, isLoading } = useSWR([`/spotify/track/features/`, trackId], detailFetcher, {
        dedupingInterval: 60000,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });
    return {
        trackFeatures: data,
        isLoading,
        isError: error
    }
}

export function useTrackAnalysis(trackId: string) {
    console.log('###HOOK### useTrackAnalysis function hit');
    const { data, error, isLoading } = useSWR([`/spotify/track/analysis/`, trackId], detailFetcher, {
        dedupingInterval: 60000,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });
    return {
        trackAnalysis: data,
        isLoading,
        isError: error
    }
}

export function useArtist(artistId: string) {
    console.log('###HOOK### useArtist function hit');
    const { data, error, isLoading } = useSWR([`/spotify/artist/`, artistId], detailFetcher, {
        dedupingInterval: 60000,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });
    return {
        artist: data,
        isLoading,
        isError: error
    }
}
