'use client'

import { Chart } from 'chart.js/auto';
import { useRef, useEffect } from 'react';

export default function TrackRadarChart(props) {

    const { trackFeatures, featuresLoading, featuresError } = props;
    console.log('trackFeatures', trackFeatures);

    let colors = {
        'green': 'rgba(27, 215, 96, 0.5)',
        'evergreen': 'rgba(213, 244, 121, 0.5)',
        'slate': 'rgba(24, 20, 20, 0.5)',
        'blue': 'rgba(100, 154, 237, 0.5)',
        'red': 'rgba(235, 86, 64, 0.5)',
        'babyPink': 'rgba(247, 207, 212, 0.5)',
        'babyBlue': 'rgba(167, 194, 209, 0.5)',
        'hotPink': 'rgba(229, 123, 161, 0.5)',
        'orange': 'rgba(246, 200, 116, 0.5)',
        'yellow': 'rgba(244, 227, 87, 0.5)',
        'white': 'rgba(255, 255, 255, 0.5)',
        'transparent': 'rgba(0, 0, 0, 0)',
        'black': 'rgba(0, 0, 0, 0.5)',
    };
    const chartRef = useRef(null);


    useEffect(() => {
        if (chartRef.current) {
            if (chartRef.current.chart) {
                chartRef.current.destroy();
            }



            const context = chartRef.current.getContext('2d');
            let data = [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5];
            if (trackFeatures) {
                data = [
                    trackFeatures.danceability * 100,
                    trackFeatures.energy * 100,
                    trackFeatures.speechiness * 100,
                    trackFeatures.acousticness * 100,
                    trackFeatures.instrumentalness * 100,
                    trackFeatures.liveness * 100,
                    trackFeatures.valence * 100
                ];
            }


            const newChart = new Chart(context, {
                type: 'bar',
                data: {
                    labels: ['Danceability', 'Energy', 'Speechiness', 'Acousticness', 'Instrumentalness', 'Liveness', 'Valence'],
                    datasets: [{
                        label: 'Audio Features',
                        data: data,
                        backgroundColor: [
                            colors.red,
                            colors.orange,
                            colors.yellow,
                            colors.green,
                            colors.blue,
                            colors.evergreen,
                            colors.hotPink
                        ],
                        borderWidth: 1
                    }],
                },
                options: {
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    responsive: true,
                    maintainAspectRatio: false
                }
            });

            chartRef.current = newChart;
        }
    }, []);
    return (
        <div className='relative m-auto h-[30vh] w-[30vw] text-center'>
            <h1 className='pb-5'>Track Features</h1>
            <canvas ref={chartRef} />
        </div>
    );


}