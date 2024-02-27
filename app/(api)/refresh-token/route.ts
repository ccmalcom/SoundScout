import { getNewToken, processToken, hourFromNow } from '@/app/utils/actions';
import { cookies } from 'next/headers';

export async function GET() {
    console.log(`refresh_token route hit, attempting to access token...`);
    // const refresh_token = request.nextUrl.searchParams.get('refresh_token');
    let encryptedToken = cookies().get('token')?.value;
    console.log('encryptedToken: ', encryptedToken);
    if (encryptedToken) {
        try {
            let timeInOneHour = await hourFromNow();
            let decrypt_refresh_token = await processToken(encryptedToken, 'refresh');

            try{

                let response = await getNewToken('refresh_token', '', decrypt_refresh_token);
                let new_access_token = await processToken(response.access_token, 'encode');
                let new_refresh_token = await processToken(decrypt_refresh_token, 'encode');
                let newEncryptedToken = new_access_token+'$'+new_refresh_token+'&exp='+timeInOneHour;
                
                cookies().set('token', newEncryptedToken.toString(), {
                    httpOnly: true,
                    maxAge: 3600 * 1000,
                    path: '/',
                });
                
                return new Response(null, {
                    status: 302,
                    headers: {
                        'Location': '/dashboard',
                    },
                })
            } catch (error) {
                console.error(`Error getting new access token: ${error}`);
                return new Response(null, {
                    status: 500,
                });
            }
        } catch (error) {
            console.error(`Error getting refresh token: ${error}`);
            return new Response(null, {
                status: 500,
            });
        }
    } else {
        return new Response('no token cookie', {
            status: 400
        })
    }
}