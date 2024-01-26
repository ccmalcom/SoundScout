import { generateRandomString } from '@/app/utils/actions';

export async function GET(){
    console.log(`login route hit, redirecting to spotify login...`);

    const state = await generateRandomString();
    const scope = 'user-read-private user-read-email user-top-read user-read-recently-played user-read-playback-state';
    const stateKey = 'spotify_auth_state';

    return new Response(null, {
        status: 302,
        headers: {
            'Location': `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.SPOTIFY_CLIENT_ID}&scope=${scope}&redirect_uri=${process.env.REDIRECT_URI}&state=${state}`,
            'Set-Cookie': `${stateKey}=${state};`
            }
        })
    
}