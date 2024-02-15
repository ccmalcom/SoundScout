import { Event } from "@/app/utils/types";
import { Button } from "../button";
import Image from "next/image"

export default function EventCard({ event }: Readonly<{ event: Event }>) {

    if (!event) return (<div>No Events Found</div>);
    return (
        <div className="event-card grid grid-cols-4 items-center text-center w-[100%]">
            <div>
                <Image src={event.images[1].url} alt={event.name} width={100} height={150} className='flex align-center' />
            </div>
            <div>
                <h3>{event.name}</h3>
                <h3>{event.date}</h3>
                <h3>{event.location.venueName}</h3>
            </div>
            <div>
                <h3>{event.location.city}, {event.location.state}</h3>
                <h3>{event.location.addressLines}</h3>
                <h3>{event.location.postalCode}</h3>
            </div>
            <Button >Click to buy tickets</Button>
        </div>
    );
}