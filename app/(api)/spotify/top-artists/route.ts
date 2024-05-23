import { cookies } from 'next/headers';
import { processToken } from '@/app/utils/actions';
import { Artist } from '@/app/utils/types';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest): Promise<Response>{
    console.log('getTopArtists function hit');
    const token = cookies().get('token')?.value;
    const mapArtists=(artists: Array<Object>)=> {
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
        // artistMap.sort((a: any, b: any) => b.popularity - a.popularity);
        return artistMap;
    }

    if (token) {
        let access_token = await processToken(token, 'access');
        const term = request.nextUrl.searchParams.get('term') || 'short_term';
        try {
            let request = await fetch(`https://api.spotify.com/v1/me/top/artists?time_range=${term}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });
            const result = await request.json();
            const artists = mapArtists(result.items);
            return new Response(JSON.stringify(artists), {
                status: 200
            });
        }
        catch (err) {
            return new Response(`Error getting top artists: ${err}`, {
                status: 500
            });
        }
    }
    else {
        console.error('no token provided');
        return new Response('no token provided', {
            status: 400
        })
    }
}