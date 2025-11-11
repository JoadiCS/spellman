import { useState } from 'react';
import { uploadMedia } from '../services/uploadService.js';

const useFileUpload = () => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file, folder, type) => {
    setUploading(true);
    try {
      const response = await uploadMedia(file, folder, type);
      return response.url;
    } finally {
      setUploading(false);
    }
  };

  return { uploading, handleUpload };
};

export default useFileUpload;
