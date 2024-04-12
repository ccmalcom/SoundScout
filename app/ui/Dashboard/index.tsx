import TopArtists from "./TopArtists";
import TopTracks from "./TopTracks";

export default function Dashboard() {
    return (
        <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 mt-10">
            <TopArtists  />
            <TopTracks  />
        </div>
    );
}