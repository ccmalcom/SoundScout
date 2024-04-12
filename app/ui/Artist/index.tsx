
import Image from "next/image";
import { Button } from "../button";
import { PropagateLoader } from "react-spinners";
import { useArtist } from "@/app/utils/hooks";
import InfoTable from "./InfoTable";

export default function Artist({ artistId }: { artistId: string }) {
    const { artist, isLoading, isError } = useArtist(artistId);
    if (isLoading) return (
        <div className="flex align-center justify-center pt-[20vh]">
            <PropagateLoader color='#1BD760' size={15} />
        </div>
    )
    else if (isError) return (
        <div>Error occurred when getting artist details</div>
    )
    else {
        const thisArtist = {
            name: artist.name,
            followers: artist.followers.total,
            genres: artist.genres, // array of strings
            popularity: artist.popularity,
            type: artist.type,
            img: artist.images[0].url,
            spotifyUrl: artist.external_urls.spotify
        }
        return (
            <div className="flex flex-col md:flex-row items-center text-center justify-center w-[80vw]">
                <div className="artist-top">
                    <a href={thisArtist.spotifyUrl} target="_blank" rel="noreferrer noopener">
                        <Image src={thisArtist.img} alt='artist-image' width={300} height={300} className="m-4"/>
                    </a>
                </div>
                <div className="artist-footer m-4">
                    <h1 className="text-4xl mb-4">{thisArtist.name}</h1>
                    <InfoTable artist={thisArtist} />
                </div>
            </div>
        )
    }
}