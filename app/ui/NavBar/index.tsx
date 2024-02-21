import Logo from "@/app/ui/NavBar/logo";
import Links from "@/app/ui/NavBar/links";
import { useUser } from "@/app/utils/hooks";


export default function NavBar() {
    const { user, isLoading, isError } = useUser();
    if (isLoading) return <div>Loading...</div>
    if (isError){
        console.log('error loading user, ' + isError);
        return <div>Error loading user...</div>
    } 
    return (
        <nav className="flex items-center justify-between flex-wrap bg-slate p-6">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <Logo />
            </div>

            <div>
                <Links img={user.images[0].url} />
            </div>
        </nav>
    );
}