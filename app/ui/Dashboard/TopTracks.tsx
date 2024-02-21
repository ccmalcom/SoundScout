import TrackCard from "./TrackCard";
import { useTopTracks } from "@/app/utils/hooks";

export default function TopTracks() {
    const { topTracks, isLoading, isError } = useTopTracks();
    if (isLoading) return <div>Loading...</div>
    if (isError){
        console.log('error loading top tracks, ' + isError);
        return <div>Error loading top tracks...</div>
    }
    return (
        <div className="col-span-3  text-center">
            <h1>Top Tracks</h1>
            <div className="grid grid-cols-3">

                    {topTracks.map((track: any) => {
                        // console.log('track:', track);
                        return (
                            <TrackCard track={track} key={track.id} />
                        )
                    })}
            </div>

            
        </div>
    );
}