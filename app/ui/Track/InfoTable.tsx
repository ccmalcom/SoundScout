
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

export default function InfoTable({ trackFeatures, featuresLoading, featuresError, track }: { trackFeatures: any, featuresLoading: boolean, featuresError: boolean, track: any}) {

    if (featuresLoading) return <div>Loading...</div>
    else if (featuresError) return <div>Error loading track features</div>
    else {
        const thisTrack = {
            duration: formatDuration(trackFeatures.duration_ms),
            key: translateKey(trackFeatures.key),
            mode: trackFeatures.mode === 1 ? 'Major' : 'Minor',
            time_signature: trackFeatures.time_signature + '/4',
            tempo: trackFeatures.tempo,
            popularity: track.popularity,
        }
        return (
            
            <div className='flex flex-col md:flex-row justify-evenly items-center col-span-2'>
                <div className='flex flex-col justify-evenly items-center h-[60%]'>
                    <div>Popularity</div>
                    <div className="text-yellow">{thisTrack.popularity}</div>
                </div>
                <div className='flex flex-col justify-evenly items-center h-[60%]'>
                    <div>Duration</div>
                    <div className="text-yellow">{thisTrack.duration}</div>
                </div>
                <div className='flex flex-col justify-evenly items-center h-[60%]'>
                    <div>Key</div>
                    <div className="text-yellow"> {thisTrack.key}</div>
                </div>
                <div className='flex flex-col justify-evenly items-center h-[60%]'>
                    <div>Mode</div>
                    <div className="text-yellow">{thisTrack.mode}</div>
                </div>
                <div className='flex flex-col justify-evenly items-center h-[60%]'>
                    <div>Time Signature</div>
                    <div className="text-yellow">{thisTrack.time_signature}</div>
                </div>
                <div className='flex flex-col justify-evenly items-center h-[60%]'>
                    <div>Tempo</div>
                    <div className="text-yellow">{thisTrack.tempo}</div>
                </div>
            </div>
        )
    }
}