'use client'

import { figtree } from "@/app/ui/fonts";
import { Button } from "./ui/button";
import { checkSession } from "@/app/utils/actions";
import { useState, useEffect } from "react";
import { handleLogin } from '@/app/utils/auth';
import Image from "next/image";
import { InlineInput } from "./ui/inlineInput";

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export default  function Home() {
  //session management
  const [session, setSession] = useState(0);  
  const [distance, setDistance] = useState(0);
  const [location, setLocation] = useState("");

  useEffect(() => {
    console.log("checking session");
    // console.log(session);
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
  const handleDistanceChange = (e: any) => {
    const newDistance = e.target.value;
    setDistance(newDistance);
    saveUserSettings(newDistance, location);
  };

  const handleLocationChange = (e: any) => {
    const newLocation = e.target.value;
    setLocation(newLocation);
    saveUserSettings(distance, newLocation);
  };

  // Save user settings to local storage
  const saveUserSettings = (newDistance: any, newLocation: any) => {
    const userSettings = {
      distance: newDistance,
      location: newLocation
    };
    localStorage.setItem('userSettings', JSON.stringify(userSettings));
  };

  const handleClick =  () => {
    try {
      handleLogin();
    }
    catch (err) {
      console.log(err);
    }
  }
  
  return (
    <main className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col min-h-[60vh] min-w-[50vw] max-w-[800px] justify-between pt-10 p-5">
        <h1 className={`${figtree.className} text-3xl text-white  p-5 text-left`}>Find concerts within 

        <InlineInput placeholder=" distance" key='distance'/> miles
        <br />
        of
        <InlineInput placeholder=" location" key='location'/>
        </h1>


        <div className="flex items-center justify-end  min-h-[20vh] p-5">
          <Button onClick={handleClick}>click to login to Spotify</Button>
        </div>
      </div>
    </main>
  );
}
