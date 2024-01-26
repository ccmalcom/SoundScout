'use client'

import { useState } from 'react';
import { Button } from "@/app/ui/button";
import Link from 'next/link';
import Image from 'next/image';

export default function Page() {
    const [name, setName] = useState('')
    const [img, setImg] = useState('')

    const handleClick = async () => {
        try {
            fetch('/profile')
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setName(data.display_name)
                    setImg(data.images[1].url)
                })
        } catch (err) {
        }
    }
    return (
        <div>
            <h1>Dashboard</h1>
            <Button onClick={handleClick}>Click me</Button>
            <p>Hey, {name}</p>
            <Image src={img} alt="profile pic" width={300} height={300} />
        </div>
    );
}