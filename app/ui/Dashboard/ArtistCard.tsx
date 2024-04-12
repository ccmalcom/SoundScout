import { Artist } from '@/app/utils/types';
import Image from 'next/image';
import Link from 'next/link';

export default function ArtistCard({ artist, index }:  {artist: Artist, index: number }) {

    if(!artist) return (<div>No Artists Found</div>);
    let artistPersonalRank = index + 1;
    let img = artist.images[2].url? artist.images[2].url : 'https://via.placeholder.com/150';
    return (
        <Link href={`/artist/${artist.id}`}>
        <div className="artist-card grid grid-cols-3 items-center text-center w-[100%] mt-2">
            <div className='flex justify-center'>
            <Image src={img} alt={artist.name} width={75} height={75} className='flex align-center'/>
            </div>
            <h3>{artist.name}</h3>
            <h3>{artistPersonalRank}</h3>
        </div>
        </Link>
    );
}