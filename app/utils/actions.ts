'use server' //default as of v14
import { Buffer } from "buffer";
import { cookies } from "next/headers";

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
        let request = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64') as string}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body,
        });

        if (!request.ok) {
            console.warn(`Error getting access token: ${request.status}`);
            throw new Error(`Error getting access token: ${request.statusText}`);
        }
        const result = await request.json();
        return result;

    } catch (error) {
        // Handle the error appropriately
        throw new Error(`Error getting access token: ${error}`);
    }

}

export async function processToken(token: string, method: string){
    let result;
    function decodeToken(token: string){
        let buff = Buffer.from(token, 'base64');
        let text = buff.toString('ascii');
        return text;
    }
    function encodeToken(token: string){
        let buff = Buffer.from(token);
        let text = buff.toString('base64');
        return text;
    }

    function retrieveRefreshToken(token: string){
        let text= token.split('%')[1];
        return text;
    }

    if(method === 'decode'){
        result = decodeToken(token).toString();
    } else if(method === 'encode'){
        result = encodeToken(token).toString();
    } else if(method === 'refresh'){
        let text = await retrieveRefreshToken(token);
        result = decodeToken(text).toString();
    } else {
        throw new Error(`Invalid method: ${method}`);
    }
    return result;

}