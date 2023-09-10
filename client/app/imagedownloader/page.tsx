"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react';
import Nav from '@/app/src/nav';
import axios from 'axios';
import React from 'react';
import handleDownload from '../src/downloader';

export default function ImageDownloader() {
    const baseUrl = "https://cataas.com";
    const randomCatUrl = `${baseUrl}/cat`;
    const downloadLinkRef = useRef<null | any>(null);

    const [auth, setAuth] = useState(false);
    const [data, setdata] = useState({
      address: "",
      Balance: null,
    });
    
  
  useEffect(() => {
      // Ensure that the ref is available before setting its properties
    if (downloadLinkRef.current) {
      downloadLinkRef.current.style.display = 'none';
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col bg-[#BACAE3] w-screen">
      <Nav page='Image Downloader' auth={auth} />
      <div className="space-y-6 items-center justify-center flex flex-col">
        <h1 className='text-4xl font-bold'>Image Downloader</h1>
        <button className='inline-flex items-center bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded' onClick={() => handleDownload(5, randomCatUrl, downloadLinkRef)}>
          <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
          Download 5 Cat Images
        </button>
        <a ref={downloadLinkRef} style={{ display: 'none' }} />
      </div>
    </main>
  );
}