'use client';

import { Event, Artist } from "@/app/utils/types";
import EventCard from "./EventCard";
import { useEvents } from "@/app/utils/hooks";
import { PropagateLoader } from "react-spinners";
import { useTopArtists } from "@/app/utils/hooks";
import { useState } from "react";
import { InlineInput } from "../inlineInput";

export default function Events() {
    // Initialize state from localStorage or use defaults
    const [userSettings, setUserSettings] = useState(() => {
        const savedSettings = localStorage.getItem('userSettings');
        return savedSettings ? JSON.parse(savedSettings) : {};
    });
    const [distance, setDistance] = useState(userSettings.distance);
    const [location, setLocation] = useState(userSettings.location);
    const [city, setCity] = useState(userSettings.city);
    console.log('###Events-index### distance: ', distance);
    console.log('###Events-index### location: ', location);
    console.log('###Events-index### city: ', city);

    
    const { topArtists, isLoading: artistsLoading, isError: artistsError } = useTopArtists();
    const artistNames = topArtists.map((artist: Artist) => artist.name);
    const { events, isLoading: eventsLoading, isError: eventsError } = useEvents(artistNames);
    // console.log(events);

    return (
        <div className="col-span-3 flex flex-col text-center justify-start mt-10 w-[90vw] min-h-[80vh]">
            <h1 className="mb-10"> Events</h1>
            <p className="text-xs">within <InlineInput placeholder="50" key='distance' value={distance} onChange={setDistance}/> miles of <InlineInput placeholder="city" key='city' value={city} onChange={setCity}/></p>
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