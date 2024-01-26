import { type NextRequest } from 'next/server';
import { getToken, processToken } from '@/app/utils/actions';

export async function GET(request: NextRequest) {
    console.log(`refresh_token route hit, refreshing access token...`);
    // const refresh_token = request.nextUrl.searchParams.get('refresh_token');
    let token = request.headers.get('cookie')?.split(';').find((c: string) => c.trim().startsWith('token='));
    if (token) {
        let refresh_token = await processToken(token, 'refresh');
        let { access_token } = await getToken('refresh_token', '', refresh_token);
        let encoded = await processToken(access_token, 'encode');
        let client_token = encoded + '%' + token.split('%')[1];
        return new Response(null, {
            status: 200,
            headers: {
                'Set-Cookie': `token=${client_token};`,
                'Location': '/dashboard'
            },
        })
    } else {
        return new Response('no refresh token provided', {
            status: 400
        })
    }
}