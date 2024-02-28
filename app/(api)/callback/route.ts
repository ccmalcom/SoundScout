import { type NextRequest } from 'next/server';
import { getNewToken, processToken, hourFromNow } from '@/app/utils/actions';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
    console.log(`callback route hit, getting access token...`);
    const code = request.nextUrl.searchParams.get('code');
    const state = request.nextUrl.searchParams.get('state');
    const storedState = request.cookies.get('spotify_auth_state')?.value;

    if (state === null || state !== storedState) {
        return new Response('state_mismatch', {
            status: 401, headers: {
                'Location': '/'
            }
        });
    } else {
        try {
            let timeInOneHour = await hourFromNow();
            let response = await getNewToken('authorization_code', code || '', '');
            let access_token = await processToken(response.access_token, 'encode');
            let refresh_token = await processToken(response.refresh_token, 'encode');
            let encryptedToken = access_token + '$' + refresh_token + '&exp=' + timeInOneHour;

            cookies().set('token', encryptedToken.toString(), {
                httpOnly: true,
                // maxAge: 3600 * 1000,
                // expires: timeInOneHour,
                path: '/',
            });

            return new Response(null, {
                status: 302,
                headers: {
                    // 'Location': '/welcome',
                    'Location': '/dashboard',
                },
            });
        } catch (error) {
            console.error(`Error setting tokens: ${error}`);
            return new Response(null, {
                status: 500,
            });
        }
    }
}