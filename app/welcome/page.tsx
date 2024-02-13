'use client'

import { useState, useEffect } from 'react';
import { figtree } from "../ui/fonts";

export default function Page() {
    const name = 'user';

    const messageArray = [
        `Hey ${name}, nice to meet you.`,
        'SpotiFind was created to quickly connect you to concerts you actually want to see.',
        `We've integrated data from your Spotify history with Ticketmaster's events service`,
        `Looks like you've been listening to a lot of <top artist>. That's a great song.`,
        `No way... you listen to <artist name> too?`,
        `We like your style, ${name}. Welcome to SpotiFind.`
    ];

    const [activeMessage, setActiveMessage] = useState(messageArray[0]);
    const [previousMessages, setPreviousMessages] = useState<string[]>([]);
    const [messageIndex, setMessageIndex] = useState(1);

    useEffect(() => {
        const messageInterval = setInterval(() => {
            if (messageIndex < messageArray.length) {
                let newMessageArray = [...previousMessages, activeMessage];
                setPreviousMessages(newMessageArray);
                setActiveMessage(messageArray[messageIndex]);
                setMessageIndex(prevIndex => prevIndex + 1);
            } else {
                clearInterval(messageInterval);
                console.log('redirecting to dashboard...');
                // Here, you would add your logic to redirect to the dashboard
                return new Promise((resolve) => {
                    resolve(
                        (window.location.href = "/dashboard")
                    );
                }
                );
            }
        }, 3000);

        // Cleanup function to clear interval when component unmounts or updates
        return () => clearInterval(messageInterval);
    }, [messageIndex, messageArray, activeMessage, previousMessages]);

    // Display logic for previous messages (e.g., rendering them with grey text) goes here


    return (
        <main className="flex justify-center items-center min-h-screen">
            <div className="flex flex-col min-h-[60vh] min-w-[50vw] max-w-[800px] justify-between pt-10 p-5">
                {previousMessages.map((message, index) => (
                    <p key={index} className="text-gray-500">{message}</p>
                ))}
                <h1 className={`${figtree.className} text-3xl text-white p-5 text-left`}>{activeMessage}</h1>
            </div>
        </main>
    );
}
