import eventSearch from "./eventSearch";
// import mapEvents from "./mapEvents";
import { getLatLong } from "@/app/utils/actions";
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
            url: event.url,
            location: {
                venueName: event._embedded.venues[0].name,
                city: event._embedded.venues[0].city.name,
                state: event._embedded.venues[0].state.name,
                addressLines: event._embedded.venues[0].address.line1,
                postalCode: event._embedded.venues[0].postalCode
            },
            
        }
        eventMap.push(newEvent);
    });
    return eventMap;
}

export async function POST(request: Request): Promise<Response> {
    // console.log('###TM ROUTE### top of post request, getting events for top artists...');
    let req = await request.json();
    const artistNames = req['artistNames'];
    const userSettings = req['userSettings'];
    // console.log('###TM ROUTE### artistNames', artistNames);
    // console.log('###TM ROUTE### userSettings', userSettings);
    const city = userSettings.city;
    const radius = userSettings.distance;
    const eventList = [];
    const now = new Date(Date.now()).toISOString();
    let formattedNow = now.split('T')[0] + 'T00:00:00Z';
    const latLong = userSettings.location;
    if (!latLong) {
        return new Response('no location provided', {
            status: 400
        })
    }
    
   


    for (const artist of artistNames) {
        let params = {
            keyword: artist,
            latlong: latLong,
            startDateTime: formattedNow,
            radius: radius,
            unit: 'miles'
        }
        try {
            const res = await eventSearch(params);
            if (res._embedded) {
                const events = await mapEvents(res._embedded.events);
                console.log('events found for ', artist);
                eventList.push(...events);

            } else {
                console.log('no events found for ', artist);
                continue;
            }
        } catch (error) {
            console.warn(`Error getting events for ${artist}: ${error}`);
            return new Response(`Error getting events for ${artist}: ${error}`, {
                status: 500
            });
        }
    }
    // console.log('###TM ROUTE### exit for loop');
    // console.log('###TM ROUTE### eventList length', eventList.length);
    return new Response(JSON.stringify(eventList), {
        status: 200
    });
}