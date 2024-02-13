'use client'

import { useState, useEffect } from 'react';
import { Button } from "@/app/ui/button";
import Image from 'next/image';
import { handleLogout } from '@/app/utils/auth';
import { getTop, mapArtists, getProfile } from '@/app/utils/spotify';
import { Artist, Event } from '@/app/utils/types';
import { getEventsForTopArtists, mapEvents } from '@/app/utils/ticketmaster';
import NavBar from '../ui/NavBar';
import Dashboard from '../ui/Dashboard';
import Events from '../ui/Events';

export default function Page() {
    const [name, setName] = useState('')
    const [img, setImg] = useState('')
    const [topArtists, setTopArtists] = useState(Array<Artist>);
    const [events, setEvents] = useState(Array<Event>);

    const click = async (type: string) => {
        console.log('clicking');
        if (type === 'events') {
            try {
                console.log('getting events for top artists...');
                let events = await getEventsForTopArtists(topArtists);
                setEvents(events);
            }
            catch (err) {
                console.log(err)
            }
        }
        if (type === 'logout') {
            try {
                console.log('logging out');
                await handleLogout()
            } catch (err) {
                console.log(err)
            }
        }

    }

    let renderCount = 0;
    useEffect(() => {
        console.log('useEffect hit');
        renderCount++;
        console.log('render count:', renderCount);
        if (renderCount > 1) {
            getProfile().then(profile => {
                setName(profile.display_name);
                setImg(profile.images[1].url);
            }).catch(err => {
                console.log(err);
            });

            getTop('artists').then(artist => {
                setTopArtists(artist);
            }).catch(err => {
                console.log(err);
            });
        }
    }, [renderCount]);

    return (
        <div>
            <NavBar />
            <Dashboard />
            <Events />
        </div>
    );
}