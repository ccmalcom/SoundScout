
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
        <div className="flex flex-col min-h-screen">
            <NavBar /> {/* Assume NavBar is full-width */}
            <div className="flex justify-between items-start p-4">
                {/* Empty div for spacing if needed */}
                <div></div>
                <Button onClick={handleClick} className="mt-4 mr-4 self-end">Go Back</Button>
            </div>
            <div className="flex-1">
                <Track trackId={params.id}/>
            </div>
        </div>
    );
}
