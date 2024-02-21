import { Track } from "@/app/utils/types";
import { processToken } from "@/app/utils/actions";
import { cookies } from "next/headers";

export async function GET() {
    console.log('getTopTracks function hit');
    const token = cookies().get('token')?.value;

    const mapTracks = (tracks: Array<Track>) => {
        const trackMap: Array<Track> = [];
        tracks.map((track: any) => {
            let newTrack: Track = {
                name: track.name,
                popularity: track.popularity,
                images: track.album.images,
                id: track.id,
                album: track.album.name,
                // artist: track.artist.name

            }
            trackMap.push(newTrack);
        });
        trackMap.sort((a: any, b: any) => b.popularity - a.popularity);
        return trackMap;
    }

    if (token) {
        let access_token = await processToken(token, 'access');
        try {
            let request = await fetch(`https://api.spotify.com/v1/me/top/tracks`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });
            const result = await request.json();
            const tracks = await mapTracks(result.items);
            return new Response(JSON.stringify(tracks), {
                status: 200
            });
        }
        catch (err) {
            console.log(err);
            return new Response(`Error getting top tracks: ${err}`, {
                status: 500
            });
        }
    }
    else {
        console.error('no token provided');
        return new Response('no token provided', {
            status: 400
        })
    }
}