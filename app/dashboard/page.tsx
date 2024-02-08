'use client'

import { useState, useEffect } from 'react';
import { Button } from "@/app/ui/button";
import Image from 'next/image';
import { handleLogout } from '@/app/utils/auth';
import { getTop, mapArtists } from '@/app/utils/spotify';
import { Artist, Event } from '@/app/utils/types';
import { getEventsForTopArtists, mapEvents } from '@/app/utils/ticketmaster';
import { get } from 'http';

export default function Page() {
    const [name, setName] = useState('')
    const [img, setImg] = useState('')
    const [topArtists, setTopArtists] = useState(Array<Artist>);
    const [events, setEvents] = useState(Array<Event>);


    const getProfile = async () => {
        try {
            fetch('/profile')
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setName(data.display_name)
                    setImg(data.images[1].url)
                })
        } catch (err) {
            console.log(err)
        }
    }

    const getArtists = async () => {
        console.log('getting top artists...');
        let res = await getTop('artists')
        let artists = await mapArtists(res.items);
        console.log('artists', artists);
        setTopArtists(artists);
    }

    const getEvents = async () => {
        console.log('getting events for top artists...');
        let events = await getEventsForTopArtists(topArtists);
        console.log('events', events);
        setEvents(events);
    }


    const logout = async () => {
        try {
            'trying to log out'
            await handleLogout()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <div className='flex flex-row justify-between'>
                <Button onClick={getProfile}>Click me to fetch profile</Button>
                <Button onClick={getArtists}>Click me to fetch top artists</Button>
                {/* <Button onClick={getEvents}>Click me to fetch events</Button> */}
                {topArtists.length > 0 ? <Button onClick={getEvents}>Click me to fetch events for top artist</Button> : null}

                <Button color='secondary' onClick={logout}> Log out </Button>
            </div>
            <p>Hey, {name}</p>
            {img ?
                <Image src={img} alt="profile pic" width={300} height={300} />
                : null}
            <div className='flex '>
                <div>
                    <h2>Top Artists</h2>
                    <ul>
                        {topArtists.map((artist: Artist) => {
                            return (
                                <li key={artist.id}>
                                    <h3 className='text-xl'>{artist.name}</h3>
                                    <p>Popularity: {artist.popularity}</p>
                                    {/* <Image src={artist.images[1].url} alt={artist.name} width={100} height={100} /> */}
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div>
                    <h2>Events</h2>
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
            </div>
        </div>
    );
}