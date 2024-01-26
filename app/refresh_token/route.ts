import { type NextRequest } from 'next/server';
import { getToken } from '@/app/utils/actions';

export async function GET(request: NextRequest) {
    console.log(`refresh_token route hit, refreshing access token...`);
    const refresh_token = request.nextUrl.searchParams.get('refresh_token');
    if (refresh_token) {
        let { access_token } = await getToken('refresh_token', '', refresh_token || '');
        return new Response('token refreshed', {
            status: 200,
            headers: {
                'Set-Cookie': `access_token=${access_token};`
            }
        })
    } else {
        return new Response('no refresh token provided', {
            status: 400
        })
    }
}