

export default function TopTracks( {topTracks}: {topTracks: any[]}) {
    return (
        <div className="col-span-3  text-center">
            <h1>Top Tracks</h1>
            <div>
                {/* <h2>Track</h2> */}
                <ul>
                    {topTracks.map((track: any) => {
                        return (
                            <li key={track.id}>
                                {track.name}
                            </li>
                        )
                    })}
                </ul>
            </div>
            
        </div>
    );
}