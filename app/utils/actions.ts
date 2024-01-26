'use server' //default as of v14
import { Buffer } from "buffer";
import { json } from "stream/consumers";

export async function generateRandomString() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 16; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

export async function getToken(type: string, code?: string, refresh_token?: string) {
    const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
    const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
    const REDIRECT_URI = process.env.REDIRECT_URI;
    let body = '';

    if (type === 'refresh_token') {
        const params = new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refresh_token || '',
        });
        body = params.toString();
    } else {
        const params = new URLSearchParams({
            code: code || '',
            redirect_uri: REDIRECT_URI || '',
            grant_type: 'authorization_code',
        });
        body = params.toString();
    }


    try {
        let response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64') as string}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body,
        });

        if (!response.ok) {
            console.warn(`Error getting access token: ${response.status}`);
            throw new Error(`Error getting access token: ${response.statusText}`);
        }

        const result = await response.json();
        const access_token = result.access_token;
        const refresh_token = result.refresh_token;

        console.log(`Access token received: ${access_token}`);
        console.log(`Refresh token received: ${refresh_token}`);
        // Handle the tokens as needed
        return { access_token, refresh_token };

    } catch (error) {
        // Handle the error appropriately
        throw new Error(`Error getting access token: ${error}`);

    }

}
