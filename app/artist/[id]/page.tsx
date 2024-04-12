
'use client'
import NavBar from "@/app/ui/NavBar";
import { useRouter } from 'next/navigation';
import { Button } from "@/app/ui/button";
import  Artist  from "@/app/ui/Artist"

export default function Page({ params }: { params: { id: string } }) {
    const router = useRouter();
    const handleClick = async() => {
        console.log('back button clicked');
        router.push('/dashboard');
    }

    return (
        <div className="flex flex-col min-h-screen">
            <NavBar /> 
            <div className="flex justify-center md:justify-between items-start p-4">
                <div></div>
                <Button onClick={handleClick} className="mt-4 md:mr-12 self-end" >Go Back</Button>
            </div>
            <div className="min-w-[100vw] flex justify-center">
                <Artist artistId={params.id}/>
            </div>
        </div>
    );
}
