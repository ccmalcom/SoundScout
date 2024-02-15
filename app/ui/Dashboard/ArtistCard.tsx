import { Artist } from '@/app/utils/types';
import Image from 'next/image';

export default function ArtistCard({ artist }: Readonly<{ artist: Artist }>) {

    if(!artist) return (<div>No Artists Found</div>);
    let img = artist.images[2].url? artist.images[2].url : 'https://via.placeholder.com/150';
    return (
        <div className="artist-card grid grid-cols-3 items-center text-center w-[100%]">
            <div className='flex justify-center'>
            <Image src={img} alt={artist.name} width={50} height={50} className='flex align-center'/>
            </div>
            <h3>{artist.name}</h3>
            <h3>{artist.popularity}</h3>
        </div>
    );
}