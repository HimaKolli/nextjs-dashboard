// 'use client'

// import React, { useRef, useState, ChangeEvent } from 'react'

// import { Chart as ChartJS } from 'chart.js/auto'
// import { Chart }            from 'react-chartjs-2'
// import { Line } from 'react-chartjs-2'
// import * as d3 from 'd3'

// var csvDataG;
// export default function Page() {
    
//     //   const UploadButton = () => {
//     //     const [uploadError, setUploadError] = useState('')
//     //     const uploadRef = useRef<HTMLInputElement>(null)
      
//     //     const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
//     //       if (e.target.files === null) {
//     //         return
//     //       }
//     //       const file = e.target.files[0]
      
//     //       if (file) {
//     //         if (file.type !== 'text/csv') {
//     //           setUploadError('Please upload a .csv file')
//     //         }
            
//     //         const fileReader = new FileReader()
//     //         fileReader.onload = (event) => {
//     //           const contents = event?.target?.result
//     //           // do something with the file contents here
              
              
//     //         }
      
//     //         e.target.value = ''
//     //         fileReader.readAsText(file)
//     //       } else {
//     //         setUploadError('File could not be uploaded. Please try again.')
//     //       }
//     //     }
      
//     //     return (
//     //       <>
//     //         {/* style this however you like */}
//     //         <button onClick={() => uploadRef.current?.click()}>Upload file</button>
      
//     //         <input
//     //           type="file"
//     //           ref={uploadRef}
//     //           onChange={handleUpload}
//     //           style={{ display: 'none' }}
//     //         />
      
//     //         {uploadError ? <p>{uploadError}</p> : null}
//     //       </>
//     //     )
//     // }
//     // function makeChart(sampledata) {
//     //     var sampledataLabels = sampledata?.map(function(d) {
//     //           return d.timestamp;
//     //             });
//     //      var weeksData = sampledata?.map(function(d) {
//     //            return +d.power_out;
//     //              });
//     //      var chart;
//     //      sampledata? (       
//     //         chart = new Chart('chart', {
//     //             type: "line",
//     //                 data: {
//     //                     labels: sampledataLabels,
//     //                     datasets: [
//     //                         {
//     //                             data: weeksData
//     //                         }
//     //                     ]
//     //                     }
//     //                 })
//     //         ) :
//     //         (
//     //           chart = null 
//     //         )
//     //     return chart;
//     //    }
//     // const ChartG = () => {
//     //     const labels = csvDataG.timestamp;
//     //     const data = {
//     //     labels: labels,
//     //     datasets: [{
//     //         label: 'Power_out',
//     //         data: csvDataG.power_out,
//     //         fill: false,
//     //         borderColor: 'rgb(75, 192, 192)',
//     //         tension: 0.1
//     //     }]
//     //     };
//     //     const config = {
//     //         type: 'line',
//     //         data: data,
//     //         };
//     //     return config;
//     // }
//     const Chart = ({ csvDataG }) => {
//         const labels = csvDataG.timestamp;
//         const data = {
//             labels: labels,
//             datasets: [
//                 {
//                     label: 'Power_out',
//                     data: +csvDataG.power_out,
//                     fill: false,
//                     borderColor: 'rgb(75, 192, 192)',
//                     tension: 0.1,
//                 },
//             ],
//         };
    
//         return <Line data={data} />;
//     };
//     const UploadButton2 = () => {
//         const [csvData, setCsvData] = useState([]);
//         const [errorMessage, setErrorMessage] = useState('');
//         const [isLoading, setIsLoading] = useState(false);
//         var csvData2;
//         const handleFileUpload = (event) => {
//             const file = event.target.files[0];
//             csvDataG = d3.csv(file);
//             //csvData2 = d3.csv(file);
//             if (!file) {
//                 setErrorMessage('Please select a file.');
//                 return;
//             }
//             if (!file.name.endsWith('.csv')) {
//                 setErrorMessage('Please upload a CSV file.');
//                 return;
//             }
//             setIsLoading(true);
//             const reader = new FileReader();
//             reader.onload = (e) => {
//                 const text = e.target.result;
//                 const rows = text.split('\n').map((row) => row.split(','));
//                 setCsvData(rows);
//                 setErrorMessage('');
//                 setIsLoading(false);
//             };
//             reader.readAsText(file);
            
//         };
//         // const chartD = makeChart(csvData);
//         return (
//             <div style={{ padding:'20px', maxWidth:'800px', margin:'0 auto' }}>
//             <h1 style={{marginBottom: '20px' }}>
//                 Generate Plot from Data
//             </h1>
//             <input type="file" onChange={handleFileUpload} 
//                     accept=".csv" style={{ marginBottom: '10px' }} 
//             />
//             { errorMessage && <div style={{color:'red', marginBottom:'10px' }}>
//                 { errorMessage }</div> 
//             }
           
//             { isLoading ? 
//                 (
//                     <div style={{ textAlign:'center', marginTop:'20px' }}>
//                         Loading...
//                     </div>
//                 ) : 
//                 (
//                     csvData.length > 0 && ( 
                        
//                         <div>
//                             <Chart csvDataG={csvDataG}/>
//                         </div>
//                         // <div> 
//                         //     chartD
//                         // </div>
//                         // var sampledataLabels = csvData.map(function(d) {return d.timestamp;});
//                         // var powerData = csvData.map(function(d) {return +d.power_out;});
                        
//                         // var chart = new Chart('chart', {
//                         //         type: "line",
//                         //             data: {
//                         //             labels: sampledataLabels,
//                         //             datasets: [
//                         //                 {
//                         //                     data: powerData
//                         //                 }
//                         //                 ]
//                         //             }
//                         //         });
//                         // <table style={{ borderCollapse:'collapse', 
//                         //     width:'100%', marginTop:'20px' }}>
//                         //     <tbody>
//                         //     { csvData.map((row, index) => (
//                         //         <tr key={index}>
//                         //         { row.map((cell, cellIndex) => (
//                         //             <td key={cellIndex} 
//                         //                 style={{ border:'1px solid #ccc', padding:'8px' }}>
//                         //                 {cell}
//                         //             </td>
//                         //         ))}
//                         //         </tr>
//                         //         ))
//                         //     }
//                         //     </tbody>
//                         // </table>
                        
                        
                                    
                       
                        
                        
                       


//                     )
//                 )
//             }
//             </div>
//         );
//     }

//     return (
//         // <div className="flex items-center gap-4 self-start rounded-lg bg-blue-950 lg:w-32 md:px-50 px-6 py-3 text-sm font-medium text-yellow-400 transition-colors hover:bg-blue-400 ">
          
//         //   <UploadButton />
          
//         // </div>
//         <div>
//             <UploadButton2 />
//         </div>
        
//       );



// }

'use client';

import React, { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import * as d3 from 'd3';

// Register required components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

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

    return <Line data={data} />;
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
