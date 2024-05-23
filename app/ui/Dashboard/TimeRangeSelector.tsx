'use client'
import React, { useState, useEffect } from 'react';
import DropdownInput from '@/app/ui/DropdownInput';
import { get } from 'http';

const TimeRangeSelector: React.FC = () => {
    const getLocalStorage = () => {
        if (typeof window !== undefined) {
            if (localStorage.getItem('timeRange') !== null) {
                return localStorage.getItem('timeRange') as string;
            }
        }
        return '';
    };
    const [selectedTimeRange, setSelectedTimeRange] = useState(getLocalStorage());
    

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
