import { Artist, Event } from '@/app/utils/types';

export default async function mapEvents(events: Array<Object>, artist?: Artist) {
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