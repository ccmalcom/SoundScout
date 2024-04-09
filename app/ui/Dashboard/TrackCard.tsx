import { Track } from '@/app/utils/types';
import Image from 'next/image';
import Link from 'next/link';

export default function TrackCard({ track, index }: { track: Track, index: number }) {

    if (!track) return (<div>No Tracks Found</div>);
    let trackPersonalRank = index + 1;

    return (
        <Link href={`/track/${track.id}`}>
            <div className="track-card w-full flex justify-center p-5">
                <div className='track-card-content text-center w-4/5 bg-gray-900 p-1 relative'>
                    <h3 className='text-start pl-5 pt-5'>#{trackPersonalRank}</h3>
                    <div className='flex flex-col items-center justify-center p-1'>
                        <div className='relative w-28 h-28'>
                            {/* Album Image */}
                            <Image src={track.images[1].url} alt={track.name} layout='fill' className='rounded-full border-2 border-black' />
                            {/* Vinyl Center */}
                            <div className="absolute inset-0 flex justify-center items-center">
                                <div className="vinyl-center w-[25%] h-[25%] bg-slate border-8 border-black rounded-full">
                                </div>
                            </div>
                        </div>
                        <div className=''>
                            <h3 className="mt-2">{track.name}</h3>
                            <p className='text-100 text-gray-500'>{track.album}</p>
                            <p className='text-100 text-gray-500'>{track.artist}</p>
                            <p className='text-100 text-gray-500'>Popularity: {track.popularity}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )

}