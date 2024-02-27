import { Event, Artist } from "@/app/utils/types";
import EventCard from "./EventCard";
import {  useEvents } from "@/app/utils/hooks";
import { PropagateLoader } from "react-spinners";

export default function Events( {topArtists}: {topArtists: Array<Artist>}) {
    const artistNames = topArtists.map((artist: Artist) => artist.name);
    const { events, isLoading: eventsLoading, isError: eventsError} = useEvents(artistNames);

    if (eventsLoading) return <div className="min-h-[80vh] flex items-start">
        <PropagateLoader color='#1BD760' size={15} className="mt-[10vh]"/>
    </div>
    if (eventsError){
        console.log('error loading events, ' + eventsError);
        return <div>Error loading events...</div>
    }
    return (
        <div className="col-span-3 flex flex-col text-center justify-start mt-10 w-[90vw] min-h-[80vh]">
            <h1 className="mb-10">Events</h1>
            <ul>
                {events.map((event: Event) => {
                    return (
                        <EventCard event={event} key={event.id} />
                    )
                })}
            </ul>
        </div>
    );
}