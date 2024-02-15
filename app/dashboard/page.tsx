'use client'

import { useState, useEffect } from 'react';
import { getProfile, getTopArtists, getTopTracks } from '@/app/utils/spotify';
import { Artist, Event, Track } from '@/app/utils/types';
import { getEventsForTopArtists, mapEvents } from '@/app/utils/ticketmaster';
import NavBar from '../ui/NavBar';
import Dashboard from '../ui/Dashboard';
import Events from '../ui/Events';

export default function Page() {
    const [name, setName] = useState('')
    const [img, setImg] = useState('')
    const [topArtists, setTopArtists] = useState(Array<Artist>);
    const [events, setEvents] = useState(Array<Event>);
    const [page, setPage] = useState('dashboard');
    const [topTracks, setTopTracks] = useState(Array<Track>);

    const getEvents = async () => {
        try {
            console.log('getting events for top artists...');
            let events = await getEventsForTopArtists(topArtists);
            setEvents(events);
        }
        catch (err) {
            console.log(err)
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

            getTopArtists().then(artist => {
                if (artist)
                    setTopArtists(artist);
            }).catch(err => {
                console.log(err);
            });

            getTopTracks().then(track => {
                if (track)
                    setTopTracks(track);
            }
            ).catch(err => {
                console.log(err);
            });

        }
    }, [renderCount]);

    const changePage = async () => {
        console.log('changing page');
        let eventSection = document.querySelector('.events');
        let dashboard = document.querySelector('.dashboard');
        if (page === 'dashboard') {
            if (events.length === 0) {

                getEvents();
            }
            dashboard?.classList.add('text-gray-700');
            eventSection?.classList.remove('text-gray-700');
            setPage('events');

        } else {
            eventSection?.classList.add('text-gray-700');
            dashboard?.classList.remove('text-gray-700');
            setPage('dashboard');
        }
    }
    // img = String(img)
    return (
        <div>
            <NavBar profileImg={img}/>
            <div className='text-white w-[100vw] h-[100vh] mt-10'>
                <div className='flex flex-row justify-center'>
                    <button >
                        <h1 className='pr-5 dashboard' onClick={changePage}>Dashboard</h1>
                    </button>
                    <button >
                        <h1 className='pl-5 text-gray-700 events' onClick={changePage}>Events</h1>
                    </button>
                </div>
                <div>
                    {page === 'dashboard' ? <Dashboard topArtists={topArtists} topTracks={topTracks} /> : <Events events={events} />}
                </div>
            </div>
        </div>
    );
}