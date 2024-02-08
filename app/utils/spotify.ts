'use server'

import { cookies } from "next/headers";
import { processToken } from '@/app/utils/actions'
import { Artist } from '@/app/utils/types';

export async function getTop(type: string){
    console.log('getTop function hit, getting top ',type);
    let token = cookies().get('token')?.value;
    if(token){
        let access_token = await processToken(token, 'access');
        try{
            let request = await fetch(`https://api.spotify.com/v1/me/top/${type}`,{
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });

            if (!request.ok) {
                console.warn(`Error getting access token: ${request.status}`);
                throw new Error(`Error getting access token: ${request.statusText}`);
            }
            const result = await request.json();
            // console.log('result from fetch:', result);
            return result;
    
        } catch (error) {
            // Handle the error appropriately
            throw new Error(`Error getting access token: ${error}`);
        }
        
    } else {
        return new Response('no token provided', {
            status: 400
        })
    }
}

export async function mapArtists(artists: Array<Object>){
    const artistMap: Array<Artist> = [];
    artists.map((artist:any) => {
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