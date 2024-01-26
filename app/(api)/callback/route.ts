import { type NextRequest } from 'next/server';
import { getNewToken, processToken } from '@/app/utils/actions';
import { redirect } from 'next/navigation';

export async function GET(request: NextRequest) {
    console.log(`callback route hit, getting access token...`);
    const code = request.nextUrl.searchParams.get('code');
    const state = request.nextUrl.searchParams.get('state');
    const storedState = request.cookies.get('spotify_auth_state')?.value;
    // console.log(`code: ${code}, state: ${state}, storedState: ${storedState}`);

    if (state === null || state !== storedState) {
        return new Response('state_mismatch', {
            status: 401, headers: {
                'Location': '/'
            }
        });
    } else {
        try {
            let response = await getNewToken('authorization_code', code || '', '');
            console.log('access token before encoding: ', response.access_token)
            let access_token = await processToken(response.access_token, 'encode');
            let refresh_token = await processToken(response.refresh_token, 'encode');
            let client_token = access_token + '%' + refresh_token;
            
            return new Response(null, {
                status: 302,
                headers: {
                    'Location': '/dashboard',
                    'Set-Cookie': `token=${client_token};`
                }
            });
        } catch (error) {
            console.error(`Error setting tokens: ${error}`);
            return new Response(null, {
                status: 500,
            });
        }
    }

}