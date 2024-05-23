'use client'
import React, { useState } from 'react';
import DropdownInput from '@/app/ui/DropdownInput';

const TimeRangeSelector: React.FC = () => {
    // const [selectedTimeRange, setSelectedTimeRange] = useState(()=>{
    //     let range = 'short_term'
    //     if(typeof window !== undefined) {
    //         if(localStorage.getItem('timeRange') !== null){
    //             range = localStorage.getItem('timeRange') as string;
    //         }
    //     }
    //     return range;
    // });
    const getLocalStorage = () => {
        if (typeof window !== undefined) {
            if (localStorage.getItem('timeRange') !== null) {
                return localStorage.getItem('timeRange') as string;
            }
        } 
        return 'short_term';
    }
    const [selectedTimeRange, setSelectedTimeRange] = useState(getLocalStorage);
    
    const timeRanges = [
        { value: 'short_term', label: 'Month' },
        { value: 'medium_term', label: '6 Months' },
        { value: 'long_term', label: 'Year' },
    ];

    const handleChange = (value: string) => {
        setSelectedTimeRange(value);
        localStorage.setItem('timeRange', value);
        //refresh the page
        window.location.reload();
    };

    return (
        <DropdownInput
            id="time-range-selector"
            label="Time Range:"
            options={timeRanges}
            selectedValue={selectedTimeRange}
            onChange={handleChange}
        />
    );
};

export default TimeRangeSelector;
