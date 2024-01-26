'use client'

import { nunito } from "@/app/ui/fonts";
import Link from 'next/link';
import { Button } from "./ui/button";
import { checkSession } from "@/app/utils/actions";
import { useState, useEffect } from "react";
import { handleLogin } from '@/app/utils/auth';

export default  function Home() {
  //session management
  const [session, setSession] = useState(0);  

  useEffect(() => {
    console.log("checking session");
    console.log(session);
    checkSession().then((res) => {
      setSession(res);
    });
  }, [session]);

  if (session == 1){
    //redirect to dashboard
    return new Promise((resolve) => {
      resolve(
        (window.location.href = "/dashboard")
      );
    }
    );
  }

  const handleClick =  () => {
    try {
      console.log("logging in");
      handleLogin();
    }
    catch (err) {
    }
  }
  
  return (
    <main className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col min-h-[500px] min-w-[500px]">
        <p className={`${nunito.className} flex-1 min-h-[30%] flex items-center justify-center`}>
          this is where the user will log in
        </p>
        <div className="flex-1 min-h-[30%] flex items-center justify-center">
          {/* <span className="border-solid border-2 border-red-500">click to go to dashboard</span> */}
          <Button onClick={handleClick}>click to login</Button>
        </div>
      </div>
    </main>
  );
}
