'use server'

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

async function generateRandomString() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 16; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};
export async function handleLogin() {
    console.log(`login route hit, begining authentication...`);
    const state = await generateRandomString();
    const scope = 'user-read-private user-read-email user-top-read user-read-recently-played user-read-playback-state';
    const stateKey = 'spotify_auth_state';
    cookies().set(stateKey, state);
    
    redirect(`https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.SPOTIFY_CLIENT_ID}&scope=${scope}&redirect_uri=${process.env.REDIRECT_URI}&state=${state}`)
    // return new Response(null, {
    //     status: 302,
    //     headers: {
    //         'Location': `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.SPOTIFY_CLIENT_ID}&scope=${scope}&redirect_uri=${process.env.REDIRECT_URI}&state=${state}`,
    //         'Set-Cookie': `${stateKey}=${state};`
    //     }
    // })
}


export async function handleLogout() { }