import { Artist } from "@/app/utils/types";
import ArtistCard from "./ArtistCard";
import { useTopArtists } from "@/app/utils/hooks";
import { PropagateLoader } from "react-spinners";

export default function TopArtists() {
    const { topArtists, isLoading, isError } = useTopArtists();
    if (isLoading) return <div className="min-h-[80vh] flex items-start">
    <PropagateLoader color='#1BD760' size={15} className="mt-[10vh]"/>
</div>
    if (isError){
        console.log('error loading top artists, ' + isError);
        return <div>Error loading top artists...</div>
    }
    return (
        <div className="col-span-2 text-center">
            <h1>Top Artists</h1>
            {/* <ArtistCard artist={topArtists[0]} /> */}
            { topArtists.map((artist: Artist) => {
                // console.log('artist:', artist);
                return (
                    <ArtistCard artist={artist} key={artist.id} />
                )
            })}
            
        </div>
    );
}