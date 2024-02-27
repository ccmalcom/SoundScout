import { Artist } from "@/app/utils/types";
import ArtistCard from "./ArtistCard";
import { useTopArtists } from "@/app/utils/hooks";
import { PropagateLoader } from "react-spinners";

export default function TopArtists() {
    const { topArtists, isLoading, isError } = useTopArtists();
    return (
        <div className="col-span-2 text-center">
            <h1>Top Artists</h1>
            {isLoading ? (
                <div className="flex justify-center items-center min-h-[70vh]"> {/* Adjusted height to account for heading */}
                    <PropagateLoader color='#1BD760' size={15} />
                </div>
            ) : isError ? (
                <div>Error loading top artists...</div>
            ) : (
                topArtists.map((artist: Artist) => (
                    <ArtistCard artist={artist} key={artist.id} />
                ))
            )}
            
        </div>
    );
}