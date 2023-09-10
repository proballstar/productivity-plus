// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { app } from "@/app/src/firebase";
// import {
//   getAnalytics,
//   initializeAnalytics,
//   isSupported,
//   logEvent,
// } from "firebase/analytics";
// import Nav from "@/app/src/nav";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import axios from "axios";

// export default function Home() {
//   const [auth, setAuth] = useState(false);

//   const baseUrl = "https://cataas.com";
//   const randomCatUrl = `${baseUrl}/cat`;

//   onAuthStateChanged(getAuth(), (user) => {
//     if (user) {
//       setAuth(true);
//     } else {
//       setAuth(false);
//     }
//   });
//   useEffect(() => {
//     isSupported().then((isSupported: boolean) => {
//       if (isSupported) {
//         initializeAnalytics(app);

//         logEvent(getAnalytics(app), "page_view");
//       }
//     });
//   });

//   const handleDownload = async () => {
//     try {
//       const response = await axios.get(randomCatUrl, { responseType: "blob" });
//       const catImageData = response.data;

//       // Create a Blob object from the image data
//       const blobUrl = new Blob([catImageData], { type: 'image/jpeg' });

//       // Create an <a> element to trigger the download
//       const a = document.createElement("a");
//       a.href = blobUrl.toString();
//       a.download = "random_cat.jpg";

//       // Set the download link's href and click it programmatically
//       if (downloadLinkRef.current) {
//         downloadLinkRef.current.href = blobUrl;
//         downloadLinkRef.current.download = `random_cat_${i + 1}.jpg`;
//         downloadLinkRef.current.click();
//       }

//       // Clean up the temporary URL
//       window.URL.revokeObjectURL(blobUrl);
//     }
//     } catch (error) {
//     console.error("Failed to download cat images:", error);
//   }

//   return (
//     <main className="flex min-h-screen flex-col bg-[#BACAE3] w-screen">
//       <Nav page="Image Downloader" auth={auth} />
//       <div className="items-center flex-grow flex flex-col justify-center gap-24">
//         <h1 className="text-6xl font-bold">Image Downloader</h1>
//         <button onClick={handleDownload} className="inline-flex bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 items-center rounded">
//           <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
//           <span>Download Cat Image</span>
//         </button>
//       </div>
//     </main>
//   );
// }
