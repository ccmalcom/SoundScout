import TopArtists from "./TopArtists";
import TopTracks from "./TopTracks";
import {Artist, Track} from "@/app/utils/types";


export default function Dashboard() {
    return (
        <div className="grid grid-cols-5 mt-10">
            <TopArtists  />
            <TopTracks  />
        </div>
    );
}