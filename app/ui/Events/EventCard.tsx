import { Event } from "@/app/utils/types";
import { Button } from "../button";
import Image from "next/image";
import Link from "next/link";

export default function EventCard({ event }: Readonly<{ event: Event }>) {
    if (!event) return (<div>No Events Found</div>);

    return (
        <div className="event-card grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 items-center text-center w-full gap-y-4">
            {/* Image always stays as the first item */}
            <div className="flex justify-center sm:col-span-1 md:col-span-1">
                <Image src={event.images[1].url} alt={event.name} width={100} height={150} />
            </div>
            {/* Event Details, adjust for md and lg to be the second item */}
            <div className="sm:col-span-1 md:col-span-1 sm:row-start-2 md:row-start-auto">
                <h3>{event.name}</h3>
                <h3>{event.date}</h3>
                <h3>{event.location.venueName}</h3>
            </div>
            {/* Location Details, adjust for md and lg to be the third item */}
            <div className="sm:col-span-1 md:col-span-1">
                <h3>{event.location.city}, {event.location.state}</h3>
                <h3>{event.location.addressLines}</h3>
                <h3>{event.location.postalCode}</h3>
            </div>
            {/* Button, adjust for md and lg to be the fourth item */}
            <div className="sm:col-span-1 md:col-span-1">
                <Link href={event.url} target="_blank" rel="noopener noreferrer">
                    <Button variant="ticketmaster">View on Ticketmaster</Button>
                </Link>
            </div>
        </div>
    );
}
