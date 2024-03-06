import { processToken } from "@/app/utils/actions";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest): Promise<Response> {
    const token = cookies().get('token')?.value;

    if(token){
        const access_token = await processToken(token, 'access');
        const searchParams = request.nextUrl.searchParams;
        const trackId = searchParams.get('trackId');
        const url = `https://api.spotify.com/v1/audio-analysis/${trackId}`;
        try {
            console.log('###API-SPOTIFY-TRACK-ANALYSIS-ROUTE### getting track analysis...');
            console.log('###API-SPOTIFY-TRACK-ANALYSIS-ROUTE### trackId: ', trackId);
            let request = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });
            const result = await request.json();
            console.log('###API-SPOTIFY-TRACK-ANALYSIS-ROUTE### result: ', result);
            return new Response(JSON.stringify(result), {
                status: 200
            });
        }
        catch (err) {
            console.warn(`Error getting track analysis: ${err}`);
            return new Response(`Error getting track analysis: ${err}`, {
                status: 500
            });
        }
    } else {
        console.warn('no token provided');
        return new Response('no token provided', {
            status: 400
        })
    }

}   