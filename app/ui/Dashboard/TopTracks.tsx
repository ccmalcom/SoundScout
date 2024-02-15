import TrackCard from "./TrackCard";

export default function TopTracks( {topTracks}: {topTracks: any[]}) {
    return (
        <div className="col-span-3  text-center">
            <h1>Top Tracks</h1>
            <div className="grid grid-cols-3">

                    {topTracks.map((track: any) => {
                        console.log('track:', track);
                        return (
                            <TrackCard track={track} key={track.id} />
                        )
                    })}
            </div>

            
        </div>
    );
}