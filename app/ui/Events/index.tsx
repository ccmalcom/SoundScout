import { Event, Artist } from "@/app/utils/types";
import EventCard from "./EventCard";
import {  useEvents } from "@/app/utils/hooks";

export default function Events( {topArtists}: {topArtists: Array<Artist>}) {
    const artistNames = topArtists.map((artist: Artist) => artist.name);

    const { events, isLoading: eventsLoading, isError: eventsError} = useEvents(artistNames);
    if (eventsLoading) return <div>Loading...</div>
    if (eventsError){
        console.log('error loading events, ' + eventsError);
        return <div>Error loading events...</div>
    }
    return (
        <div className="col-span-3 flex justify-center">
            <h1>Events</h1>
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