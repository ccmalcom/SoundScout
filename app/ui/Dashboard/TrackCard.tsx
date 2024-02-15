import { Track } from '@/app/utils/types';
import Image from 'next/image';

export default function TrackCard({ track }: Readonly<{ track: Track }>) {

    if (!track) return (<div>No Tracks Found</div>);

    return (
        //card will be rectangle, have gray background, image at top, track name, album name, popularity
        // album image, track name, album name, popularity
        <div className="track-card  w-full flex justify-center p-5 ">
            <div className='track-card-content  text-center w-[80%] bg-gray-900 p-1'>
                <div className=' flex flex-col items-center justify-center'>
                    <Image src={track.images[1].url} alt={track.name} width={100} height={100}  />
                    <h3>{track.name}</h3>
                </div>
                {/* <br /> */}
                {/* <div className='row-span-2'>
                    <p className='text-100'>{track.album}</p>
                    <p className='text-100'>Popularity: {track.popularity}</p>
                </div> */}
                
            </div>
        </div>
    )

}