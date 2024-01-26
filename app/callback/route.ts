import { type NextRequest } from 'next/server';
import { getToken } from '@/app/utils/actions';

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
        let { access_token, refresh_token } = await getToken('authorization_code', code || '');

        return new Response(null, {
            status: 302,
            headers: {
                'Location': '/dashboard',
                'Set-Cookie': `spotify_auth_state=; access_token=${access_token}; refresh_token=${refresh_token};`
            }
        });
    }

}