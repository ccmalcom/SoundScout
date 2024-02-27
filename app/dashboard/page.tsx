'use client'

import { Suspense, useEffect, useState } from 'react';
import NavBar from '../ui/NavBar';
import Dashboard from '../ui/Dashboard';
import Events from '../ui/Events';
import { useTopArtists, useTopTracks } from '@/app/utils/hooks';
import Footer from '../ui/Footer';
import { checkSession } from '../utils/actions';

export default function Page() {
    checkSession().then((res) => {
        if (res === 1) {
            console.log('session is valid');
        } else if (res === -1) {
            console.log('session is invalid-token expired');
            window.location.href = '/refresh-token';
        }
        else {
            console.log('no session');
            window.location.href = '/';
        }
    });
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
            <div className='text-white w-[100vw] mt-10'>
                <div className='flex flex-row justify-center'>
                    <button >
                        <h1 className='pr-5 dashboard' onClick={changePage}>Dashboard</h1>
                    </button>
                    <button >
                        <h1 className='pl-5 text-gray-700 events' onClick={changePage}>Events</h1>
                    </button>
                </div>
                <div className='flex justify-center'>
                    {page === 'dashboard' ?
                        <Dashboard />
                        :
                        <Events topArtists={topArtists} />
                    }
                </div>
            </div>
            <Footer />
        </div>
    );
}