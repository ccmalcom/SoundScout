import { Artist } from "@/app/utils/types";
import ArtistCard from "./ArtistCard";

export default function TopArtists( {topArtists}: {topArtists: Array<Artist>}) {
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
            
            {/* <div className="grid grid-cols-2">
                <div>
                    <h2>Artist</h2>
                    <ul>
                        {topArtists.map((artist: Artist) => {
                            return (
                                <li key={artist.id}>
                                    {artist.name}
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div>
                    <h2>Popularity</h2>
                    <ul>
                        {topArtists.map((artist: Artist) => {
                            return (
                                <li key={artist.id}>
                                    {artist.popularity}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div> */}
        </div>
    );
}