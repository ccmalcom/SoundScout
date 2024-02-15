'use server'

import { cookies } from "next/headers";
import { processToken } from '@/app/utils/actions'
import { Artist } from '@/app/utils/types';
import { Track } from '@/app/utils/types';

const token = cookies().get('token')?.value;

export async function getTopArtists() {
    console.log('getTopArtists function hit');
    if (token) {
        let access_token = await processToken(token, 'access');
        try {
            let request = await fetch(`https://api.spotify.com/v1/me/top/artists`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });
            const result = await request.json();
            const artists = await mapArtists(result.items);
            return artists;
        }
        catch (err) {
            console.log(err);
        }
    }
    else {
        console.error('no token provided');
        return;
    }
}

export async function getTopTracks() {
    console.log('getTopTracks function hit');
    if (token) {
        let access_token = await processToken(token, 'access');
        try {
            let request = await fetch(`https://api.spotify.com/v1/me/top/tracks`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });
            const result = await request.json();
            const tracks = await mapTracks(result.items);
            return tracks;
        }
        catch (err) {
            console.log(err);
            return [];
        }
    }
    else {
        console.error('no token provided');
        return [];
    }
}



export async function getProfile() {
    console.log('getProfile function hit');
    let token = cookies().get('token')?.value;
    if (token) {
        let access_token = await processToken(token, 'access');
        try {
            let request = await fetch('https://api.spotify.com/v1/me/', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });

            const result = await request.json();
            return result;

        } catch (error) {
            // Handle the error appropriately
            throw new Error(`Error getting profile: ${error}`);
        }

    } else {
        return new Response('no token provided', {
            status: 400
        })
    }
}

export async function testGetProfile() {
    try {
        let profile = await getProfile();
        return profile;
    }
    catch (err) {
        console.log(err);
    }
}

export async function mapArtists(artists: Array<Object>) {
    const artistMap: Array<Artist> = [];
    artists.map((artist: any) => {
        let newArtist: Artist = {
            name: artist.name,
            popularity: artist.popularity,
            images: artist.images,
            id: artist.id
        }
        artistMap.push(newArtist);
    });
    artistMap.sort((a: any, b: any) => b.popularity - a.popularity);
    return artistMap;
}

async function mapTracks(tracks: Array<Track>) {
    const trackMap: Array<Track> = [];
    tracks.map((track: any) => {
        let newTrack: Track = {
            name: track.name,
            popularity: track.popularity,
            images: track.album.images,
            id: track.id,
            album: track.album.name
        }
        trackMap.push(newTrack);
    });
    trackMap.sort((a: any, b: any) => b.popularity - a.popularity);
    return trackMap;
}

// export async function getTopArtists() {
//     console.log('getTopArtists function hit');
//     let res = await getTop('artists');
//     let artists = await mapArtists(res.items);
//     return artists;
// }