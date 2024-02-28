'use client'

import { useState, useEffect } from 'react';
import NavBar from '../ui/NavBar';
import Dashboard from '../ui/Dashboard';
import Events from '../ui/Events';
import { useTopArtists } from '@/app/utils/hooks';
import Footer from '../ui/Footer';

export default function Page() {
    console.log('dashboard page');
    useEffect(() => {
        console.log('Component mounted');
        return () => {
            console.log('Component will unmount');
        };
    }, []);
    

    const { topArtists, isLoading: artistsLoading, isError: artistsError } = useTopArtists();

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