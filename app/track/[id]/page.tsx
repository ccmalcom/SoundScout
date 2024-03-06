
'use client'
import NavBar from "@/app/ui/NavBar";
import { useRouter } from 'next/navigation';
import { useTrack, useTrackFeatures, useTrackAnalysis } from "@/app/utils/hooks";
import { Button } from "@/app/ui/button";
import  Track  from "@/app/ui/Track"

export default function Page({ params }: { params: { id: string } }) {
    const router = useRouter();
    // const { track, isLoading, isError } = useTrack(params.id);
    // const { trackFeatures, isLoading: featuresLoading, isError: featuresError } = useTrackFeatures(params.id);
    // const { trackAnalysis, isLoading: analysisLoading, isError: analysisError } = useTrackAnalysis(params.id);
    const handleClick = async() => {
        console.log('back button clicked');
        router.push('/dashboard');
    }

    return (
        <div>
            <NavBar /> {/* externalize this to layout */}
            <Track trackId={params.id}/>
            <Button onClick={handleClick} >Go Back</Button>
        </div>)
}
