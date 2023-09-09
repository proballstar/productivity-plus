"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { app } from '@/app/src/firebase';
import { getAnalytics, initializeAnalytics, isSupported, logEvent,  } from 'firebase/analytics';
import Nav from '@/app/src/nav';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import axios from 'axios';





export default function Home() {

  const [auth, setAuth] = useState(false);
  
  const baseUrl = "https://cataas.com";
  const randomCatUrl = `${baseUrl}/cat`;

  onAuthStateChanged(getAuth(), (user) => {
    if(user) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  })
  useEffect(() => {
    isSupported()
      .then((isSupported: boolean) => {
        if(isSupported) {
          initializeAnalytics(app);

          logEvent(getAnalytics(app), 'page_view')
        }
      })
  })
  
  const handleDownload = async () => {
    try {
      const response = await axios.get(randomCatUrl, { responseType: 'blob' });
      const catImageData = response.data;

      const blobUrl = window.URL.createObjectURL(catImageData);

      // Create an <a> element to trigger the download
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = 'random_cat.jpg';

      // Programmatically click the <a> element to start the download
      a.click();

      // Clean up the URL and remove the <a> element
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Failed to download the cat image:", error);
    }
  };
  

  


  return (
    <main className="flex min-h-screen flex-col bg-[#BACAE3] w-screen">
      <Nav page='Image Downloader' auth={auth} />
      <div className="flex-grow flex flex-col items-center justify-start">
        <h1>Image Downloader</h1>
        <button onClick={handleDownload}>Download Cat Image</button>
      </div>
    </main>
  );
}