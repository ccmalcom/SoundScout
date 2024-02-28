'use client'

import { figtree } from "@/app/ui/fonts";
import { Button } from "./ui/button";
import { useState, useEffect, use } from "react";
import { handleLogin } from '@/app/utils/auth';
import { InlineInput } from "./ui/inlineInput";
import { getCityName, getLatLong } from '@/app/utils/actions';
import { SWRConfig } from 'swr';

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export default function Home() {
  console.log('home page');
  useEffect(() => {
    console.log('Home Component mounted');
    return () => {
      console.log('Home Component will unmount');
    };
  });
  // const [session, setSession] = useState(0);
  const [distance, setDistance] = useState(50);
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  
  const handleLocationChange=(lat: string, long: string)=>{
    const newLocation = lat + ',' + long;
    setLocation(newLocation);
    saveUserSettings(distance, city, newLocation);
  }


  useEffect(() => {
    if('geolocation' in navigator){
      navigator.geolocation.getCurrentPosition((position) => {
        handleLocationChange(position.coords.latitude.toString(), position.coords.longitude.toString());
        getCityName(location).then((res) => {
          setCity(res);
        });
      }); 
    }
  }, []);

  const handleDistanceChange = (e: any) => {
    const newDistance = e.target.value;
    setDistance(newDistance);
    saveUserSettings(newDistance, city, location);
  };

  const handleCityChange = (e: any) => {
    const newCity = e.target.value;
    setCity(newCity);
    saveUserSettings(distance, newCity, location);
  };

  // Save user settings to local storage
  const saveUserSettings = (newDistance: any, newCity: any, newLocation: any) => {
    const userSettings = {
      distance: newDistance,
      city: newCity,
      location: newLocation,
    };
    localStorage.setItem('userSettings', JSON.stringify(userSettings));
  };



  const handleClick = () => {
    if(location === "" && city !== ""){
      getLatLong(city).then((res) => {
        handleLocationChange(res.latitude, res.longitude);
      });
    }
    if(city === "" && location !== ""){
      getCityName(location).then((res) => {
        setCity(res);
      });
    }
    if(distance==0){
      setDistance(50);
    }
    saveUserSettings(distance, city, location);
    try {
      handleLogin();
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <SWRConfig value={{
      provider: () => new Map(),
      onLoadingSlow: (key, config) => console.log(`Loading slow: ${key}`, config),
      onSuccess: (data, key, config) => console.log(`Success: ${key}`, data),
      onError: (err, key, config) => console.log(`Error: ${key}`, err),
    }}>

    <main className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col min-h-[60vh] min-w-[50vw] max-w-[800px] justify-between pt-10 p-5">
        <h1 className={`${figtree.className} text-3xl text-white  p-5 text-left`}>Find concerts within

          <InlineInput placeholder=" distance" key='distance' value={distance} onChange={handleDistanceChange} /> miles
          <br />
          of
          <InlineInput placeholder=" city" key='city' value={city} onChange={handleCityChange} />
        </h1>
        <div className="flex items-center justify-end  min-h-[20vh] p-5">
          <Button onClick={handleClick}>click to login to Spotify</Button>
        </div>
      </div>
    </main>
    </SWRConfig>

  );
}
