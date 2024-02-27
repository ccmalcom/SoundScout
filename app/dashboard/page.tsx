'use client'

import { useState } from 'react';
import NavBar from '../ui/NavBar';
import Dashboard from '../ui/Dashboard';
import Events from '../ui/Events';
import { Event } from '@/app/utils/types';
import { useTopArtists, useTopTracks, useEvents } from '@/app/utils/hooks';
import { getEventsForTopArtists } from '../utils/ticketmaster';

export default function Page() {
    const { topArtists, isLoading: artistsLoading, isError: artistsError } = useTopArtists();
    const { topTracks, isLoading: tracksLoading, isError: tracksError } = useTopTracks();
    let artistNames = topArtists?.map((artist: any) => artist.name);
    // const { events, isLoading: eventsLoading, isError: eventsError} = useEvents(artistNames);


    const [page, setPage] = useState('dashboard');


    const changePage = async () => {
        console.log('changing page');
        let eventSection = document.querySelector('.events');
        let dashboard = document.querySelector('.dashboard');
        if (page === 'dashboard') {
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
            <NavBar />
            <div className='text-white w-[100vw] h-[100vh] mt-10'>
                <div className='flex flex-row justify-center'>
                    <button >
                        <h1 className='pr-5 dashboard' onClick={changePage}>Dashboard</h1>
                    </button>
                    <button >
                        <h1 className='pl-5 text-gray-700 events' onClick={changePage}>Events</h1>
                    </button>
                </div>
                <div className='flex justify-center'>
                    {page === 'dashboard' ? <Dashboard /> : <Events topArtists={topArtists} />}
                </div>
            </div>
        </div>
    );
}