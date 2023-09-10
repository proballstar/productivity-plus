import axios from 'axios'
import { MutableRefObject } from 'react'

const handleDownload = async (count: number, url: string, dref: MutableRefObject<any>) => {
    try {
      for (let i = 0; i < count; i++) {
        const response = await axios.get(url, { responseType: 'blob' });
        const catImageData = response.data;

        // Create a Blob object from the image data
        const blob = new Blob([catImageData], { type: 'image/jpeg' });

        // Create a temporary URL for the Blob
        const blobUrl = window.URL.createObjectURL(blob);

        // Set the download link's href and click it programmatically
        if (dref.current) {
            dref.current.href = blobUrl;
            dref.current.download = `random_cat_${i + 1}.jpg`;
            dref.current.click();
        }

        // Clean up the temporary URL
        window.URL.revokeObjectURL(blobUrl);
      }
    } catch (error) {
      console.error("Failed to download cat images:", error);
    }
};

export default handleDownload