import cloudinary from '../config/cloudinary.js';
import { AppError } from '../utils/errorHandler.js';

const uploadToCloudinary = (fileBuffer, folder) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'auto'
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    stream.end(fileBuffer);
  });

export const uploadMedia = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new AppError('No file uploaded', 400);
    }
    const result = await uploadToCloudinary(req.file.buffer, req.body.folder || 'spellman');
    res.status(201).json({ success: true, url: result.secure_url, publicId: result.public_id });
  } catch (error) {
    next(error);
  }
};
