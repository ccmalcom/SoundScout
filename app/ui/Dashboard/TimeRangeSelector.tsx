// 'use client'
import React from 'react';
import DropdownInput from '@/app/ui/DropdownInput';

const TimeRangeSelector: React.FC = () => {
    // const [selectedTimeRange, setSelectedTimeRange] = useState('');
    if (typeof window !== undefined) {
        const timeRange = localStorage.getItem('timeRange');
        let selectedTimeRange = timeRange ? timeRange : 'short_term';
        const timeRanges = [
            { value: 'short_term', label: 'Month' },
            { value: 'medium_term', label: '6 Months' },
            { value: 'long_term', label: 'Year' },
        ];
        
        const handleChange = (value: string) => {
            selectedTimeRange = value;
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
};

export default TimeRangeSelector;
