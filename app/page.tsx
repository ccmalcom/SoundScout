'use client'

import { figtree } from "@/app/ui/fonts";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { handleLogin } from '@/app/utils/auth';
import { InlineInput } from "./ui/inlineInput";

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export default function Home() {
  console.log('home page');
  useEffect(() => {
    console.log('home page useEffect');
  });
  // const [session, setSession] = useState(0);
  const [distance, setDistance] = useState(0);
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  
  const handleLocationChange=(lat: string, long: string)=>{
    const newLocation = lat + ',' + long;
    setLocation(newLocation);
    saveUserSettings(distance, city, newLocation);
  }

  const getCityName = async (location: string) => {
    const lat = location.split(',')[0];
    const long = location.split(',')[1];
    const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`);
    const data = await res.json();
    console.log('get city name data:', data);
    return data.city;
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

  //get lat long from city name
  const getLatLong = async (city: string) => {
    const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?localityName=${city}&localityLanguage=en`);
    const data = await res.json();
    console.log('get lat long data:', data);
    return data;
  }

  const handleClick = () => {
    if(location == "" && city != ""){
      getLatLong(city).then((res) => {
        handleLocationChange(res.latitude, res.longitude);
      });
    }
    if(city == "" && location != ""){
      getCityName(location).then((res) => {
        setCity(res);
      });
    }
    if(distance==0){
      setDistance(50);
    }
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

          <InlineInput placeholder=" distance" key='distance' onChangeCapture={handleDistanceChange} /> miles
          <br />
          of
          <InlineInput placeholder=" city" key='city' value={city} onChange={handleCityChange} />
        </h1>
        <div className="flex items-center justify-end  min-h-[20vh] p-5">
          <Button onClick={handleClick}>click to login to Spotify</Button>
        </div>
      </div>
    </main>
  );
}
