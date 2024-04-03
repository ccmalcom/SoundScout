import { useTrackFeatures } from "@/app/utils/hooks";

function translateKey(key: number) {
    let result = '';
    switch (key) {
        case 0:
            result = 'C';
            break;
        case 1:
            result = 'C#';
            break;
        case 2:
            result = 'D';
            break;
        case 3:
            result = 'D#';
            break;
        case 4:
            result = 'E';
            break;
        case 5:
            result = 'F';
            break;
        case 6:
            result = 'F#';
            break;
        case 7:
            result = 'G';
            break;
        case 8:
            result = 'G#';
            break;
        case 9:
            result = 'A';
            break;
        case 10:
            result = 'A#';
            break;
        case 11:
            result = 'B';
            break;
        default:
            result = 'C';
            break;
    }
    return result;
}

function formatDuration(duration: number) {
    const minutes = Math.floor(duration / 60000);
    const seconds = ((duration % 60000) / 1000).toFixed(0);
    return minutes + ':' + (parseInt(seconds) < 10 ? '0' : '') + seconds;
}

export default function InfoTable({ trackFeatures, featuresLoading, featuresError }: { trackFeatures: any, featuresLoading: boolean, featuresError: boolean}) {

    // const { trackFeatures, isLoading: featuresLoading, isError: featuresError } = useTrackFeatures(trackId);

    if (featuresLoading) return <div>Loading...</div>
    else if (featuresError) return <div>Error loading track features</div>
    else {
        const thisTrack = {
            duration: formatDuration(trackFeatures.duration_ms),
            key: translateKey(trackFeatures.key),
            mode: trackFeatures.mode === 1 ? 'Major' : 'Minor',
            time_signature: trackFeatures.time_signature + '/4',
            tempo: trackFeatures.tempo,
            // popularity: trackFeatures.popularity,
            // bars: trackFeatures.bars,
            // beats: trackFeatures.beats,
            // sections: trackFeatures.sections,
            // segments: trackFeatures.segments
        }
        return (
            // <div className='track-info-table flex justify-evenly text-center '>
            //     <table>
            //         <thead>
            //             <tr>
            //                 <th>Feature</th>
            //                 <th>Value</th>
            //             </tr>
            //         </thead>
            //         <tbody>
            //             <tr>
            //                 <td>Duration</td>
            //                 <td>{thisTrack.duration}</td>
            //             </tr>
            //             <tr>
            //                 <td>Key</td>
            //                 <td>{thisTrack.key}</td>
            //             </tr>
            //             <tr>
            //                 <td>Mode</td>
            //                 <td>{thisTrack.mode}</td>
            //             </tr>
            //             <tr>
            //                 <td>Time Signature</td>
            //                 <td>{thisTrack.time_signature}</td>
            //             </tr>
            //             <tr>
            //                 <td>Tempo</td>
            //                 <td>{thisTrack.tempo}</td>
            //             </tr>
            //         </tbody>
            //     </table>
            // </div>
            <div className='flex justify-evenly items-center col-span-2'>
                <div className='flex flex-col justify-evenly items-center h-[60%]'>
                    <div>Duration</div>
                    <div>{thisTrack.duration}</div>
                </div>
                <div className='flex flex-col justify-evenly items-center h-[60%]'>
                    <div>Key</div>
                    <div>{thisTrack.key}</div>
                </div>
                <div className='flex flex-col justify-evenly items-center h-[60%]'>
                    <div>Mode</div>
                    <div>{thisTrack.mode}</div>
                </div>
                <div className='flex flex-col justify-evenly items-center h-[60%]'>
                    <div>Time Signature</div>
                    <div>{thisTrack.time_signature}</div>
                </div>
                <div className='flex flex-col justify-evenly items-center h-[60%]'>
                    <div>Tempo</div>
                    <div>{thisTrack.tempo}</div>
                </div>
            </div>
        )
    }
}