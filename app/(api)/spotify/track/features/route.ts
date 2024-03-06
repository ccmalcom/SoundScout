import { processToken } from "@/app/utils/actions";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest): Promise<Response> {
    const token = cookies().get('token')?.value;
    if (token) {
        const searchParams = request.nextUrl.searchParams;
        const trackId = searchParams.get('trackId');
        const access_token = await processToken(token, 'access');
        // https://api.spotify.com/v1/audio-features/{id}
        const url = `https://api.spotify.com/v1/audio-features/${trackId}`;
        try {
            console.log('###API-SPOTIFY-TRACK-FEATURES-ROUTE### getting track features...');
            console.log('###API-SPOTIFY-TRACK-FEATURES-ROUTE### trackId: ', trackId);
            console.log('###API-SPOTIFY-TRACK-FEATURES-ROUTE### url: ', url);
            let request = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });
            const result = await request.json();
            console.log('###API-SPOTIFY-TRACK-FEATURES-ROUTE### result: ', result);
            return new Response(JSON.stringify(result), {
                status: 200
            });
        }
        catch (err) {
            console.warn(`Error getting track features: ${err}`);
            return new Response(`Error getting track features: ${err}`, {
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