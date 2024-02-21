import eventSearch from "./eventSearch";
// import mapEvents from "./mapEvents";
import {Artist, Event} from "@/app/utils/types";

function mapEvents(events: Array<Object>) {
    // console.log('mapping events: ', events);
    const eventMap: Array<Event> = [];
    events.map((event: any) => {
        let newEvent: Event = {
            name: event.name,
            date: event.dates.start.localDate,
            images: event.images,
            id: event.id,
            location: {
                venueName: event._embedded.venues[0].name,
                city: event._embedded.venues[0].city.name,
                state: event._embedded.venues[0].state.name,
                addressLines: event._embedded.venues[0].address.line1,
                postalCode: event._embedded.venues[0].postalCode
            },
            // artist: event.
        }
        eventMap.push(newEvent);
    });
    return eventMap;
}

export async function POST(request: Request): Promise<Response> {
    console.log('getting events for top artists...');
    let req = await request.json();
    const artistNames = req['artistNames'];
    console.log('artistNames', artistNames);
    const eventList = [];
    const now = new Date(Date.now()).toISOString();
    let formattedNow = now.split('T')[0] + 'T00:00:00Z';
    for (const artist of artistNames) {
        let params = {
            keyword: artist,
            latlong: '39.791000,-86.148003',
            startDateTime: formattedNow,
            radius: '100',
            unit: 'miles'
        }
        try {
            const res = await eventSearch(params);
            // const res = await response.json();

            if (res._embedded) {
                const events = await mapEvents(res._embedded.events);
                console.log('events found for ', artist);
                eventList.push(...events);

            } else {
                console.log('no events found for ', artist);
            }
        } catch (error) {
            console.warn(`Error getting events for ${artist}: ${error}`);
            return new Response(`Error getting events for ${artist}: ${error}`, {
                status: 500
            });
        }
    }
    // console.log('eventList', eventList);
    return new Response(JSON.stringify(eventList), {
        status: 200
    });
}