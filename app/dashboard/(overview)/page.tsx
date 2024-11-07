'use client'

import React, { useRef, useState, ChangeEvent } from 'react'


export default function Page() {
    
      const UploadButton = () => {
        const [uploadError, setUploadError] = useState('')
        const uploadRef = useRef<HTMLInputElement>(null)
      
        const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
          if (e.target.files === null) {
            return
          }
          const file = e.target.files[0]
      
          if (file) {
            if (file.type !== 'text/csv') {
              setUploadError('Please upload a .csv file')
            }
            
            const fileReader = new FileReader()
            fileReader.onload = (event) => {
              const contents = event?.target?.result
              // do something with the file contents here
              
              
            }
      
            e.target.value = ''
            fileReader.readAsText(file)
          } else {
            setUploadError('File could not be uploaded. Please try again.')
          }
        }
      
        return (
          <>
            {/* style this however you like */}
            <button onClick={() => uploadRef.current?.click()}>Upload file</button>
      
            <input
              type="file"
              ref={uploadRef}
              onChange={handleUpload}
              style={{ display: 'none' }}
            />
      
            {uploadError ? <p>{uploadError}</p> : null}
          </>
        )
    }
    const UploadButton2 = () => {
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
            reader.onload = (e) => {
            const text = e.target.result;
            const rows = text.split('\n').map((row) => row.split(','));
            setCsvData(rows);
            setErrorMessage('');
            setIsLoading(false);
            };
            reader.readAsText(file);
        };
        return (
            <div style={{ padding:'20px', maxWidth:'800px', margin:'0 auto' }}>
            <h1 style={{marginBottom: '20px' }}>
                Loading Data from File
            </h1>
            <input type="file" onChange={handleFileUpload} 
                    accept=".csv" style={{ marginBottom: '10px' }} 
            />
            { errorMessage && <div style={{color:'red', marginBottom:'10px' }}>
                { errorMessage }</div> 
            }
            { isLoading ? 
                (
                <div style={{ textAlign:'center', marginTop:'20px' }}>
                    Loading...
                </div>
                ) : 
                (
                csvData.length > 0 && ( 
                <table style={{ borderCollapse:'collapse', 
                                width:'100%', marginTop:'20px' }}>
                    <tbody>
                    { csvData.map((row, index) => (
                        <tr key={index}>
                        { row.map((cell, cellIndex) => (
                            <td key={cellIndex} 
                                style={{ border:'1px solid #ccc', padding:'8px' }}>
                                {cell}
                            </td>
                        ))}
                        </tr>
                        ))
                    }
                    </tbody>
                </table>
                )
                )
            }
            </div>
        );
    }

    return (
        // <div className="flex items-center gap-4 self-start rounded-lg bg-blue-950 lg:w-32 md:px-50 px-6 py-3 text-sm font-medium text-yellow-400 transition-colors hover:bg-blue-400 ">
          
        //   <UploadButton />
          
        // </div>
        <div>
            <UploadButton2 />
        </div>
        
      );



}