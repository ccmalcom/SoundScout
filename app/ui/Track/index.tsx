'use client'
import Image from "next/image";
import { useTrack, useTrackFeatures } from "@/app/utils/hooks";
import { Button } from "@/app/ui/button";
import Link from "next/link";
import InfoTable from "./InfoTable";
import TrackRadarChart from "./TrackRadarChart";
import { PropagateLoader } from "react-spinners";


export default function Track({ trackId }: { trackId: string }) {

    const { track, isLoading, isError } = useTrack(trackId);
    const { trackFeatures, isLoading: featuresLoading, isError: featuresError } = useTrackFeatures(trackId);

    if (isLoading) return(
        <div className="flex align-center justify-center pt-[20vh]">
            <PropagateLoader color='#1BD760' size={15}/>
        </div>
    )
    else {
        const thisTrack = {
            name: track.name,
            artist_name: track.artists[0].name,
            album_name: track.album.name,
            release_year: (track.album.release_date).split('-')[0],
            album_cover: track.album.images[0].url,
            url: track.external_urls.spotify
        }
        return (
            <div className='track-container grid grid-rows-3 md:grid-rows-2 grid-cols-1 md:grid-cols-2 p-8'>
                <div className='track-header flex flex-col md:flex-row justify-evenly align-center text-center md:col-span-1 col-span-2'>
                    <div className="track-header-img flex justify-center">
                        <Image src={thisTrack.album_cover} alt='album-cover' width={300} height={300} />
                    </div>
                    <div className="track-header-details flex flex-col justify-evenly">
                        <div>
                            <h1 className="text-2xl">{thisTrack.name}</h1>
                            <h2>{thisTrack.artist_name}</h2>
                            <h3>{thisTrack.album_name} | {thisTrack.release_year}</h3>
                        </div>
                        <Link href={thisTrack.url} target="_blank" rel="noreferrer noopener">
                            <Button>Play on Spotify</Button>
                        </Link>
                    </div>
                </div>
                <TrackRadarChart trackFeatures={trackFeatures} featuresLoading={featuresLoading} featuresError={featuresError}/>
                <InfoTable track={track} trackFeatures={trackFeatures} featuresLoading={featuresLoading} featuresError={featuresError} />
            </div>
        )
    }

}