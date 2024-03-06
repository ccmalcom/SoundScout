import { AudioFeatures } from '@/app/utils/types';
import ApexChart from './ApexChart';


export default function AudioFeaturesWeb(){

    return (
        <div className="audio-features-container text-center">
            <h2>Audio Features</h2>
            <div className="audio-features-graph">
                <ApexChart />
            </div>
        </div>
    )

}