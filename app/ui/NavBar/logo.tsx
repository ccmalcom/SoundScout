// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"; // Fix the import
import  Image from "next/image";

export default function Logo() {
  // logo is green circle 64x64 with white 'SpotiFind' text next to it
  return (
    <div className="flex items-center">
      <div className="relative">
        {/* <div className="h-12 w-12 bg-green rounded-full flex justify-center items-center">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute text-white text-2xl" /> 
        </div> */}
        <Image src="/logo.png" height={64} width={64} alt="logo" className="h-12 w-12 rounded-full" />
      </div>
      <h1 className="text-2xl font-bold ml-4">SpotiFind</h1>
    </div>
  );
}