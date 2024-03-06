'use client'

import { Chart } from 'chart.js/auto';
import { useRef, useEffect } from 'react';

export default function TrackRadarChart() {
    const chartRef = useRef(null);
    useEffect(() => {
        if (chartRef.current) {
            if(chartRef.current.chart){
                chartRef.current.destroy();
            }
        

        const context = chartRef.current.getContext('2d');

    const newChart = new Chart(context, {
        type: 'radar',
        data: {
            labels: ['Danceability', 'Energy', 'Speechiness', 'Acousticness', 'Instrumentalness', 'Liveness', 'Valence'],
            datasets: [{
                label: 'Audio Features',
                data: [0.5, 0.7, 0.6, 0.8, 0.9, 0.4, 0.6],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        }
    });

    chartRef.current = newChart;
    }
}, []);

return (
    <div >
        <canvas ref={chartRef} />
    </div>
);

    
}