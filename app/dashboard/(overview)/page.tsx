'use client';

import React, { useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';
import * as d3 from 'd3';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, Filler, zoomPlugin);

let csvDataG;

const ChartComponent = ({ csvDataG }) => {
    if (!csvDataG || !csvDataG.timestamp || !csvDataG.power_out) {
        return <div>No data available to render chart.</div>;
    }

    const data = {
        labels: csvDataG.timestamp,
        datasets: [
            {
                label: 'Power_out',
                data: csvDataG.power_out.map(Number),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Power Output Over Time',
            },
            zoom: {
                pan: {
                    enabled: true, 
                    mode: 'x', 
                },
                zoom: {
                    wheel: {
                        enabled: true, 
                    },
                    pinch: {
                        enabled: true, 
                    },
                    mode: 'x', 
                },
            },
        },
    };

    const customStyles = {
        width: '800px',
        height: '600px',
    };

    return (
        <div style={customStyles}>
            <Line data={data} options={options} />
        </div>
    );
};

const UploadButton = () => {
    const [csvData, setCsvData] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];

        if (!file) {
            setErrorMessage('Please select a file.');
            return;
        }
        if (!file.name.endsWith('.csv')) {
            setErrorMessage('Please upload a CSV file.');
            return;
        }

        setIsLoading(true);
        const reader = new FileReader();
        reader.onload = async (e) => {
            const text = e.target.result;
            const parsedData = d3.csvParse(text);
            csvDataG = {
                timestamp: parsedData.map((row) => row.timestamp),
                power_out: parsedData.map((row) => row.power_out),
            };
            setCsvData(parsedData);
            setErrorMessage('');
            setIsLoading(false);
        };
        reader.readAsText(file);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ marginBottom: '20px' }}>Generate Plot from Data</h1>
            <input
                type="file"
                onChange={handleFileUpload}
                accept=".csv"
                style={{ marginBottom: '10px' }}
            />
            {errorMessage && <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>}
            {isLoading ? (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>Loading...</div>
            ) : (
                csvData.length > 0 && (
                    <div>
                        <ChartComponent csvDataG={csvDataG} />
                    </div>
                )
            )}
        </div>
    );
};

export default function Page() {
    return (
        <div>
            <UploadButton />
        </div>
    );
}
