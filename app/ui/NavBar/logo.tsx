import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <div className="flex items-center">
      <h1 className="text-4xl font-bold ml-4">SoundScout</h1>
      <h2 className="text-xl text-gray-600 ml-3 hidden md:block">for</h2>
      <Link href="https://www.spotify.com" target="_blank" rel="noopener noreferrer" className="hidden md:block">
      <Image src="/spotifyLogoFullWhite.png" alt="spotify-icon" width={75} height={50} className="ml-3"/>
      </Link>
    </div>
  );
}
