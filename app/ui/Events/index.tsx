import { Event } from "@/app/utils/types";
import EventCard from "./EventCard";

export default function Events( {events}: {events: Array<Event>}) {

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