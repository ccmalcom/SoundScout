import Logo from "@/app/ui/NavBar/logo";
import Links from "@/app/ui/NavBar/links";
import { useUser } from "@/app/utils/hooks";


export default function NavBar() {
    const { user, isLoading, isError } = useUser();
    let img = 'https://via.placeholder.com/150';
    if (!isLoading) img = user.images[0].url;
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
                <Links img={img} />
            </div>
        </nav>
    );
}