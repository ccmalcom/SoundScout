import { Artist } from "@/app/utils/types";
import ArtistCard from "./ArtistCard";
import { useTopArtists } from "@/app/utils/hooks";
import { PropagateLoader } from "react-spinners";

export default function TopArtists() {
    const { topArtists, isLoading, isError } = useTopArtists();
    return (

        <div className="lg:col-span-2 md:col-span-1 sm:col-span-1 text-center min-h-[70vh] min-w-[40vw]">
            <h1>Top Artists</h1>
            {isLoading ? (
                <div className="flex justify-center items-center h-full w-full"> 
                    <PropagateLoader color='#1BD760' size={15} />
                </div>
            ) : isError ? (
                <div>Error loading top artists...</div>
            ) : (
                topArtists.map((artist: Artist, index: number) => (
                    <ArtistCard artist={artist} key={artist.id} index={index}/>
                ))
            )}
        </div>
    );
}