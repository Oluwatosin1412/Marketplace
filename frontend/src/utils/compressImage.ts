import imageCompression from "browser-image-compression";

export const compressImage = async (file: File) => {
  const options = {
    maxSizeMB: 0.7,
    maxWidthOrHeight: 1024,
    useWebWorker: true,
  };

  return await imageCompression(file, options);
};
