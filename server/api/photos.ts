import fs from 'fs';
import path from 'path';
import exifReader from 'exif-reader';

export default defineEventHandler(() => {
  // Define the path to the images folder
  const imagesDir: string = path.resolve('./public/images'); 
  const files: string[] = fs.readdirSync(imagesDir);

  // Define the image file extensions to look for
  const imageExtensions: string[] = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];

  // Retrieve image data
  const images = files
    .filter((file: string) => imageExtensions.some((ext: string) => file.toLowerCase().endsWith(ext)))
    .map((file: string, index: number) => {
      const filePath: string = path.join(imagesDir, file);
      const stats = fs.statSync(filePath);

      // Read EXIF data
      const buffer = fs.readFileSync(filePath);
      let exifData = {};
      try {
        exifData = exifReader(buffer);
      } catch (error) {
        console.error(`Error reading EXIF data from ${file}:`, error);
      }

      return {
        id: index + 1,
        url: `/images/${file}`,
        name: file,
        dateTime: exifData?.exif?.DateTimeOriginal || stats.birthtime // File creation time or EXIF data
      };
    });

  return images;
});