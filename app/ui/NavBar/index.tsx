
import Logo from "@/app/ui/NavBar/logo";
import Links from "@/app/ui/NavBar/links";


export default function NavBar() {
    let img = 'https://via.placeholder.com/150';

    return (
        <nav className="flex items-center justify-center md:justify-between flex-wrap bg-slate p-6">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <Logo />
            </div>

            <div>
                <Links />
            </div>
        </nav>
    );
}