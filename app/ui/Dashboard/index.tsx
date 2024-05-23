import TopArtists from "./TopArtists";
import TopTracks from "./TopTracks";
import TimeRangeSelector from "./TimeRangeSelector";

export default function Dashboard() {
    return (
        <div>
            <div className='flex flex-row justify-center mt-3'>
                <TimeRangeSelector />
            </div>
            <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 mt-10">
                <TopArtists />
                <TopTracks />
            </div>
        </div>
    );
}