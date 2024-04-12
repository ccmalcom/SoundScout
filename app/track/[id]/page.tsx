
'use client'
import NavBar from "@/app/ui/NavBar";
import { useRouter } from 'next/navigation';
import { Button } from "@/app/ui/button";
import  Track  from "@/app/ui/Track"

export default function Page({ params }: { params: { id: string } }) {
    const router = useRouter();
    const handleClick = async() => {
        console.log('back button clicked');
        router.push('/dashboard');
    }

    return (
        <div className="flex flex-col min-h-screen">
            <NavBar /> 
            <div className="flex justify-between items-start p-4">
                <div></div>
                <Button onClick={handleClick} className="mt-4 mr-16 self-end" >Go Back</Button>
            </div>
            <div className="flex-1">
                <Track trackId={params.id}/>
            </div>
        </div>
    );
}
