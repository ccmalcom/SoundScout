import { cookies } from "next/headers";
import { processToken } from "@/app/utils/actions";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest): Promise<Response> {

    const token = cookies().get('token')?.value;
    if (token) {
        const searchParams = request.nextUrl.searchParams;
        const trackId = searchParams.get('trackId');
        const access_token = await processToken(token, 'access');
        const url = `https://api.spotify.com/v1/tracks/${trackId}`;

        try {
            console.log('###API-SPOTIFY-TRACK-ROUTE### getting track...');
            console.log('###API-SPOTIFY-TRACK-ROUTE### trackId: ', trackId);
            let request = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });
            const result = await request.json();
            // console.log('###API-SPOTIFY-TRACK-ROUTE### result: ', result);
            return new Response(JSON.stringify(result), {
                status: 200
            });
        }
        catch (err) {
            console.warn(`Error getting track: ${err}`);
            return new Response(`Error getting track: ${err}`, {
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