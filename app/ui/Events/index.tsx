import { Event, Artist } from "@/app/utils/types";
import EventCard from "./EventCard";
import {  useEvents } from "@/app/utils/hooks";
import { PropagateLoader } from "react-spinners";

export default function Events( {topArtists}: {topArtists: Array<Artist>}) {
    const artistNames = topArtists.map((artist: Artist) => artist.name);
    const { events, isLoading: eventsLoading, isError: eventsError} = useEvents(artistNames);

    return (
        <div className="col-span-3 flex flex-col text-center justify-start mt-10 w-[90vw] min-h-[80vh]">
            <h1 className="mb-10">  Events</h1>
            {eventsLoading ? (
                <div className="flex justify-center items-start "> {/* Adjusted height to account for heading */}
                    <PropagateLoader color='#1BD760' size={15} />
                </div>
            ) : eventsError ? (
                <div>Error loading events...</div>
            ) : (
                <ul>
                    {events.map((event: Event) => (
                        <EventCard event={event} key={event.id} />
                    ))}
                </ul>
            )}
        </div>
    );
}