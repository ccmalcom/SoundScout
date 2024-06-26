'use server' //default as of v14
import { Buffer } from "buffer";
import { cookies } from "next/headers";
import { Event, Artist } from '@/app/utils/types';


export async function generateRandomString() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 16; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

export async function getNewToken(type: string, code?: string, refresh_token?: string) {
    console.log('###actions-getNewToken### TOP OF FUNCTION');

    const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
    const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
    const REDIRECT_URI = process.env.REDIRECT_URI;
    let body = '';
    // add debug logs for server logs to see why failing in prod (not in dev)
    // console.log('###actions-getNewToken### type: ', type);
    // console.log('###actions-getNewToken### code: ', code);
    // console.log('###actions-getNewToken### refresh_token: ', refresh_token);

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

    // console.log('###actions-getNewToken### body: ', body); 


    try {
        console.log('###actions-getNewToken### fetching token...');
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

export async function processToken(token: string, method: string) {
    let result;
    function decodeToken(token: string) {
        // console.log('decoding token');
        let buff = Buffer.from(token, 'base64');
        let text = buff.toString('ascii');
        return text;
    }
    function encodeToken(token: string) {
        // console.log('encoding token');
        let buff = Buffer.from(token);
        let text = buff.toString('base64');
        return text;
    }
    //full encrpypted token passed in
    function retrieveRefreshToken(token: string) {
        console.log('retrieving refresh token');
        let t = token.split('$')[1];
        let text = t.split('exp=')[0];
        return text;
    }

    function retrieveAccessToken(token: string) {
        console.log('retrieving access token');
        let text = token.split('$')[0];
        return text;
    }


    if (method === 'decode') {
        result = await decodeToken(token).toString();
    } else if (method === 'encode') {
        result = await encodeToken(token).toString();
    } else if (method === 'refresh') {
        let text = await retrieveRefreshToken(token);
        result = await decodeToken(text).toString();
    } else if (method === 'access') {
        let text = await retrieveAccessToken(token);
        result = await decodeToken(text).toString();
    } else {
        throw new Error(`Invalid method: ${method}`);
    }
    return result;

}

export async function checkSession() {
    let token = cookies().get('token')?.value;
    if (token) {
        let expiration = token.split('exp=')[1];
        let date = new Date(expiration);
        let now = new Date(Date.now());
        // console.log('expDate: ', date);
        // console.log('now: ', now);
        if (date > now) {
            return 1;
        } else {
            return -1;
        }
    } else {
        return 0;
    }
}

export async function hourFromNow() {
    let now = new Date(Date.now());
    let hour = now.getTime();
    let addHour = (hour + 3600 * 1000);
    let timeInOneHourDate = new Date(addHour);
    return timeInOneHourDate;
}

export async function getCityName(location: string) {
    const lat = location.split(',')[0];
    const long = location.split(',')[1];
    const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`);
    const data = await res.json();
    console.log('get city name :', data.city);
    return data.city;
};

export async function getLatLong (city: string) {
    console.log('getting lat long for city:', city);
    const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?localityName=${city}&localityLanguage=en`);
    const data = await res.json();
    console.log('get lat long data:', data);
    return data;
}

export async function translateKey(key: number){
    // 0-11
    let result = '';
    switch(key){
        case 0:
            result = 'C';
            break;
        case 1:
            result = 'C#';
            break;
        case 2:
            result = 'D';
            break;
        case 3:
            result = 'D#';
            break;
        case 4:
            result = 'E';
            break;
        case 5:
            result = 'F';
            break;
        case 6:
            result = 'F#';
            break;
        case 7:
            result = 'G';
            break;
        case 8:
            result = 'G#';
            break;
        case 9:
            result = 'A';
            break;
        case 10:
            result = 'A#';
            break;
        case 11:
            result = 'B';
            break;
        default:
            result = 'C';
            break;
    }
    return result;
}