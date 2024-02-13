import { Event } from "@/app/utils/types";

export default function Events( {events}: {events: Array<Event>}) {

    return (
        <div className="col-span-3 flex justify-center">
            <h1>Events</h1>
            <ul>
                {events.map((event: Event) => {
                    return (
                        <li key={event.id}>
                            <h3 className='text-xl'>{event.name}</h3>
                            <p>Date: {event.date}</p>
                            <p>Venue: {event.location.venueName}</p>
                            <p>City: {event.location.city}</p>
                            <p>State: {event.location.state}</p>
                            <p>Address: {event.location.addressLines}</p>
                            <p>Postal Code: {event.location.postalCode}</p>
                            {/* <Image src={event.images[1].url} alt={event.name} width={100} height={100} /> */}
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}