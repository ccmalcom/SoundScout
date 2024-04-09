import { PropagateLoader } from "react-spinners";
import TrackCard from "./TrackCard";
import { useTopTracks } from "@/app/utils/hooks";

export default function TopTracks() {
    const { topTracks, isLoading, isError } = useTopTracks();

    return (
        <div className="lg:col-span-3 md:col-span-2 sm:col-span-1  col-span-1 text-center min-h-[70vh] min-w-[60vw]">
            <h1 className="mt-4 sm:mt-0 md:mt-0 lg:mt-0">Top Tracks</h1>

            {isLoading ? (
                <div className="flex justify-center items-center h-full w-full">
                    <PropagateLoader color='#1BD760' size={15} />
                </div>
            ) : isError ? (
                <div>Error loading top tracks...</div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                    {topTracks.map((track: any, index: number) => {
                        // console.log('track:', track);
                        return (
                            <TrackCard track={track} key={track.id} index={index} />
                        )
                    })}
                </div>
            )}


        </div>
    );
}