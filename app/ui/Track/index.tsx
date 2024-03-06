'use client'
import Image from "next/image";
import { Track } from "@/app/utils/types";
import { useTrack, useTrackFeatures, useTrackAnalysis } from "@/app/utils/hooks";
import { Button } from "@/app/ui/button";
import Link from "next/link";
import InfoTable from "./InfoTable";
import AudioFeaturesWeb from "./AudioFeaturesWeb";


export default function Track({ trackId }: { trackId: string }) {

    const { track, isLoading, isError } = useTrack(trackId);

    // layout will be:
    // top row: 
    //- album cover|track name, artist name, album name * year|play on spotify
    //- audio features web graph
    // bottom row:
    // track info table
    if (isLoading ) return <div>Loading...</div>
    else{
        const thisTrack = {
            name: track.name,
            artist_name: track.artists[0].name,
            album_name: track.album.name,
            release_date: track.album.release_date,
            album_cover: track.album.images[0].url,
            url: track.external_urls.spotify
        }
        return (
            <div className='track-container grid grid-rows-2 grid-cols-2 p-8'>
                <div className='track-header flex flex-row justify-between'>
                    <div className="track-header-img">
                        <Image src={thisTrack.album_cover} alt='album-cover' width={300} height={300} />
                    </div>
                    <div className="track-header-details flex flex-col justify-evenly">
                        <div>
                            <h1>{thisTrack.name}</h1>
                            <h2>{thisTrack.artist_name}</h2>
                            <h3>{thisTrack.album_name} * {thisTrack.release_date}</h3>
                        </div>
                        <Link href={thisTrack.url} target="_blank" rel="noreferrer noopener">
                            <Button >Play on Spotify</Button>
                        </Link>
                    </div>
                </div>
                <InfoTable trackId={trackId}/>
                <div className="audio-features-container text-center col-span-2">
                    <h2>Audio Features</h2>
                    <div className="audio-features-graph">
                        {/* <AudioFeaturesWeb /> */}
                        coming soon
                    </div>
                </div>
            </div>
        )
    }

}