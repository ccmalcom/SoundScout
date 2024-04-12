'use client'
import React, { useState } from 'react';
import DropdownInput from '@/app/ui/DropdownInput';

const TimeRangeSelector: React.FC = () => {
    const [selectedTimeRange, setSelectedTimeRange] = useState<string>(localStorage.getItem('timeRange') || 'short_term');
    const timeRanges = [
        { value: 'short_term', label: 'Last Month' },
        { value: 'medium_term', label: 'Last 6 Months' },
        { value: 'long_term', label: 'Last Year' },
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
            label="Select Time Range:"
            options={timeRanges}
            selectedValue={selectedTimeRange}
            onChange={handleChange}
        />
    );
};

export default TimeRangeSelector;
