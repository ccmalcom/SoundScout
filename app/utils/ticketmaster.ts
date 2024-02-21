'use server'
import { Event, Artist } from '@/app/utils/types';


export async function eventSearch(params: { keyword: string, latlong: string, startDateTime: string, radius: string, unit: string }) {
    console.log('###SERVER--getting events...');
    let token = process.env.TM_CLIENT_KEY;
    let { keyword, latlong, startDateTime, radius, unit } = params;
    if (token) {
        const url = `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${keyword}&latlong=${latlong}&startDateTime=${startDateTime}&radius=${radius}&unit=${unit}&apikey=${token}`;
        try {
            let request = await fetch(url, { method: 'GET' });
            const result = await request.json();
            // console.log('result from fetch:', result);
            return result;
        } catch (error) {
            // Handle the error appropriately
            console.warn(`Error getting events: ${error}`);
            throw new Error(`Error getting events: ${error}`);
        }

    } else {
        return new Response('no token provided', {
            status: 400
        })
    }
}

export const getEventsForTopArtists = async (topArtists: Array<Artist>) => {
    console.log('getting events for top artists...');
    const eventList = [];
    const now = new Date(Date.now()).toISOString();
    let formattedNow = now.split('T')[0] + 'T00:00:00Z';
    for (const artist of topArtists) {
        let params = {
            keyword: artist.name,
            latlong: '39.791000,-86.148003',
            startDateTime: formattedNow,
            radius: '100',
            unit: 'miles'
        }
        try {
            const res = await eventSearch(params);
            if (res._embedded) {
                const events = await mapEvents(res._embedded.events, artist);
                console.log('events found for ', artist.name);
                eventList.push(...events);

            } else {
                console.log('no events found for ', artist.name);
            }
        } catch (error) {
            console.warn(`Error getting events for ${artist.name}: ${error}`);
        }
    }
    // console.log('eventList', eventList);
    return eventList;
};

export async function mapEvents(events: Array<Object>, artist?: Artist) {
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


