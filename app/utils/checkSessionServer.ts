import { cookies } from "next/headers";
import { NextApiRequest } from 'next';
import { IncomingMessage } from 'http';


export function checkSessionServer() {

    const token = cookies().get('token')?.value;
    if (token) {
        let expiration = token.split('exp=')[1];
        let date = new Date(expiration);
        let now = new Date();
        if (date > now) {
            return 1; // Session is valid
        } else {
            return -1; // Session has expired
        }
    } else {
        return 0; // No session
    }
}
