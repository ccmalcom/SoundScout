'use client';

import { Event, Artist } from "@/app/utils/types";
import EventCard from "./EventCard";
import { useEvents } from "@/app/utils/hooks";
import { PropagateLoader } from "react-spinners";
import { useTopArtists } from "@/app/utils/hooks";
import { useState } from "react";
import { InlineInput } from "../inlineInput";
import { getLatLong } from "@/app/utils/actions";

export default function Events() {
    const [userSettings, setUserSettings] = useState(() => {
        const savedSettings = localStorage.getItem('userSettings');
        return savedSettings ? JSON.parse(savedSettings) : {};
    });
    const [distance, setDistance] = useState(userSettings.distance);
    const [city, setCity] = useState(userSettings.city);


    const { topArtists, isLoading: artistsLoading, isError: artistsError } = useTopArtists();
    const artistNames = topArtists.map((artist: Artist) => artist.name);
    const { events, isLoading: eventsLoading, isError: eventsError } = useEvents(artistNames, userSettings);
    // console.log(events);

    const handleDistanceChange = (e: any) => {
        const newDistance = e.target.value;
        setDistance(newDistance);
        // saveUserSettings(newDistance, city, location);
    }
    const handleCityChange = async (e: any) => {
        const newCity = e.target.value;
        setCity(newCity);
    }

    const handleSearch = async () => {
        console.log('handle search clicked');
        const newCity = city
        console.log('newCity: ', newCity);
        const latLong = await getLatLong(newCity);
        console.log('latLong: ', latLong);
        const newLocation = latLong.latitude + ',' + latLong.longitude;
        const newDistance = distance
        console.log('newLocation: ', newLocation);
        console.log('newDistance: ', newDistance);
        saveUserSettings(newDistance, newCity, newLocation);
        setUserSettings({ distance: newDistance, city: newCity, location: newLocation });
    }

    const saveUserSettings = (newDistance: any, newCity: any, newLocation: any) => {
        const userSettings = {
            distance: newDistance,
            city: newCity,
            location: newLocation,
        };
        localStorage.setItem('userSettings', JSON.stringify(userSettings));
    };

    return (
        <div className="col-span-3 flex flex-col text-center justify-start mt-10 w-[90vw] min-h-[80vh]">
            <h1 className="mb-10"> Events</h1>
            {/* <div className="flex flex-row justify-center">
                <p className="text-xs">within <InlineInput placeholder="50" key='distance' value={distance} onChangeCapture={handleDistanceChange} /> miles of <InlineInput placeholder="city" key='city' value={city} onChangeCapture={handleCityChange} /></p>
                <button onClick={handleSearch}>search</button>
            </div> */}
            {eventsLoading ? (
                <div className="flex justify-center items-start "> {/* Adjusted height to account for heading */}
                    <PropagateLoader color='#1BD760' size={15} />
                </div>
            ) : eventsError ? (
                <div>Error loading events...</div>
            ) : events.length === 0 ? (
                <div>No events found...</div>
            ) :
                <ul>
                    {events.map((event: Event) => (
                        <EventCard event={event} key={event.id} />
                    ))}
                </ul>
            }
        </div>
    );
}