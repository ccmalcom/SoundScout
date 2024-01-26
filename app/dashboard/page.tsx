'use client'

import { useState } from 'react';
import { Button } from "@/app/ui/button";
import Link from 'next/link';
import Image from 'next/image';
import { handleLogout } from '@/app/utils/auth';
export default function Page() {
    const [name, setName] = useState('')
    const [img, setImg] = useState('')

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
                <Button color='secondary' onClick={logout}> Log out </Button>
            </div>
            <p>Hey, {name}</p>
            {img ?
                <Image src={img} alt="profile pic" width={300} height={300} />
                : null}
        </div>
    );
}