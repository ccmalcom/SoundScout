import { nunito } from "@/app/ui/fonts";
import Link from 'next/link';
import { Button } from "./ui/button";

export default function Home() {
  return (
    <main className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col min-h-[500px] min-w-[500px]">
        <p className={`${nunito.className} flex-1 min-h-[30%] flex items-center justify-center`}>
          this is where the user will log in
        </p>
        <Link href="/login" className="flex-1 min-h-[30%] flex items-center justify-center">
          {/* <span className="border-solid border-2 border-red-500">click to go to dashboard</span> */}
          <Button>click to login</Button>
        </Link>
      </div>
    </main>
  );
}
