import { processToken } from "@/app/utils/actions";
import { cookies } from "next/headers";

export  async function GET(){
    console.log(`get profile route hit`)
    let token = cookies().get('token')?.value;
    console.log('token: ', token);
    if (token){
        try {
            const access_token = await processToken(token, 'access');
            let request = await fetch('https://api.spotify.com/v1/me/', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });
    
            if (!request.ok) {
                console.warn(`Error getting profile: ${request.status}`);
                throw new Error(`Error getting profile: ${request.statusText}`);
            }
            const result = await request.json();
            return new Response(JSON.stringify(result), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
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