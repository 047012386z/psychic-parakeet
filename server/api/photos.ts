import path from 'path';
import { promises as fs } from 'fs';
import exifReader from 'exif-reader';

// Retrieve image data
const images = files
  .filter((file: string) => imageExtensions.some((ext: string) => file.toLowerCase().endsWith(ext)))
  .map(async (file: string, index: number) => {
    const filePath: string = path.join(imagesDir, file);
    const fileData = await fs.readFile(filePath);
    const exifData = exifReader(fileData);

    return {
      fileName: file,
      filePath,
      exifData
    };
  });

// Wait for all promises to resolve
const resolvedImages = await Promise.all(images);

return resolvedImages;