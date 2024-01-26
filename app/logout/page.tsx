'use client'

import { Button } from "@/app/ui/button";
import { nunito } from "@/app/ui/fonts";
import { handleLogin } from "@/app/utils/auth";


export default function Page() {
    const handleClick = () => {
        try {
            handleLogin();
        }
        catch (err) {
            console.log(err);
        }
    }


    return (
            <div className="flex flex-col min-h-[500px] min-w-[500px]">
                <p className={`${nunito.className} flex-1 min-h-[30%] flex items-center justify-center`}>
                    you have successfully logged out. goodbye!
                </p>
                <div className="flex-1 min-h-[30%] flex items-center justify-center">
                    {/* <span className="border-solid border-2 border-red-500">click to go to dashboard</span> */}
                    <Button onClick={handleClick}>click to log back in</Button>
                </div>
            </div>
    );
}