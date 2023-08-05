import { CloudinaryResponse } from "@/types/globalType";
import { v2 } from "cloudinary";
import { createReadStream } from 'streamifier';

v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export async function uploadFile(file: any) {
  return new Promise<CloudinaryResponse>((resolve, reject) => {
    const uploadStream = v2.uploader.upload_stream((error, result) => {
      if (error) return reject(error);
      resolve(result as any);
    });

    createReadStream(file.buffer).pipe(uploadStream);
  });
}
