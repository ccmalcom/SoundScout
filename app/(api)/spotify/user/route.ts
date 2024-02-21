import { cookies } from "next/headers";
import { processToken } from '@/app/utils/actions'


export async function GET() {
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

            // const result = await request.json();
            return new Response(request.body, {
                status: 200
            });

        } catch (error) {
            // Handle the error appropriately
            return new Response(`Error getting profile: ${error}`, {
                status: 500
            });
        }

    } else {
        return new Response('no token provided', {
            status: 400
        })
    }

}