import { cookies } from "next/headers";
import { processToken } from "@/app/utils/actions";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest){
    const token = cookies().get('token')?.value;
    if (token){
        const searchParams = request.nextUrl.searchParams;
        const artistId = searchParams.get('artistId');
        const access_token = await processToken(token, 'access');
        const url = `https://api.spotify.com/v1/artists/${artistId}`;

        try{
            console.log('###API-SPOTIFY-ARTIST-ROUTE### getting artist...');
            console.log('###API-SPOTIFY-ARTIST-ROUTE### artistId: ', artistId);
            let request = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });
            const result = await request.json();
            return new Response(JSON.stringify(result), {
                status: 200
            });
        } catch (err) {
            console.warn(`Error getting artist: ${err}`);
            return new Response(`Error getting artist: ${err}`, {
                status: 500
            });
        }
    }
    else {
        console.warn('no token provided');
        return new Response('no token provided', {
            status: 400
        })
    }

}