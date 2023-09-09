"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react';
import { app } from '@/app/src/firebase';
import { getAnalytics, initializeAnalytics, isSupported, logEvent } from 'firebase/analytics';
import Nav from '@/app/src/nav';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import axios from 'axios';





export default function Home() {

  const [auth, setAuth] = useState(false);
  const [data, setdata] = useState({
    address: "",
    Balance: null,
  });
  

  function ImageDownloader({}) {
    const baseUrl = "https://cataas.com";
    const randomCatUrl = `${baseUrl}/cat`;
    const downloadLinkRef = useRef<null | any>(null);
  
    useEffect(() => {
      // Ensure that the ref is available before setting its properties
      if (downloadLinkRef.current) {
        downloadLinkRef.current.style.display = 'none';
      }
    }, []);
  
  
  const handleDownload = async (count: number) => {
    try {
      for (let i = 0; i < count; i++) {
        const response = await axios.get(randomCatUrl, { responseType: 'blob' });
        const catImageData = response.data;

        // Create a Blob object from the image data
        const blob = new Blob([catImageData], { type: 'image/jpeg' });

        // Create a temporary URL for the Blob
        const blobUrl = window.URL.createObjectURL(blob);

        // Set the download link's href and click it programmatically
        if (downloadLinkRef.current) {
          downloadLinkRef.current.href = blobUrl;
          downloadLinkRef.current.download = `random_cat_${i + 1}.jpg`;
          downloadLinkRef.current.click();
        }

        // Clean up the temporary URL
        window.URL.revokeObjectURL(blobUrl);
      }
    } catch (error) {
      console.error("Failed to download cat images:", error);
    }
  };

 
  


  return (
    <main className="flex min-h-screen flex-col bg-[#BACAE3] w-screen">
      <Nav page='Image Downloader' auth={auth} />
      <div className="flex-grow flex flex-col items-center justify-start">
        <h1>Image Downloader</h1>
        <button onClick={() => handleDownload(5)}>Download 5 Cat Images</button>
        <a ref={downloadLinkRef} style={{ display: 'none' }} />
      </div>
    </main>
  );
}
}