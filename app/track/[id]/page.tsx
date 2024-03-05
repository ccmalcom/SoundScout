
'use client'
import NavBar from "@/app/ui/NavBar";
import { useRouter } from 'next/navigation';

export default function Page({ params }: { params: { id: string } }) {
    const router = useRouter();
    const handleClick = async() => {
        console.log('back button clicked');
        router.push('/dashboard');
    }

    return (
        <div>
            <NavBar /> {/* externalize this to layout */}
            <p>track {params.id}</p>
            <button onClick={handleClick}>Go Back</button>
        </div>)
}
