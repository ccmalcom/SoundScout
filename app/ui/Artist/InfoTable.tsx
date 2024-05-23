
export default function InfoTable({artist}: {artist: any}) {
    return (
        <div className='info-table flex text-center justify-center m-2'>
            <div className='info-row mr-2'>
                <h3>Followers</h3>
                <h3 className="text-yellow">{artist.followers}</h3>
            </div>
            <div className='info-row mr-2'>
                <h3>Genres</h3>
                {artist.genres.map((genre: string) => (
                    <h3 key={genre} className="text-yellow">{genre}</h3>
                ))}
            </div>
            <div className='info-row'>
                <h3>Popularity</h3>
                <h3 className="text-yellow">{artist.popularity}</h3>
            </div>
        </div>
    )
}