"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Nav from "@/app/src/nav";
import axios from "axios";
import React from "react";
import handleDownload from "../src/downloader.ts";

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
      downloadLinkRef.current.style.display = "none";
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col bg-[#BACAE3] w-screen">
      <Nav page="Image Downloader" auth={auth} />
      <div className="flex-grow flex flex-col items-center justify-start">
        <h1>Image Downloader</h1>
        <button
          onClick={() => handleDownload(5, randomCatUrl, downloadLinkRef)}
        >
          Download 5 Cat Images
        </button>
        <a ref={downloadLinkRef} style={{ display: "none" }} />
      </div>
    </main>
  );
}
