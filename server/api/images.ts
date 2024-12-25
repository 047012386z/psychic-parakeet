import { promises as fs } from 'fs';
import path from 'path';
import { readBuffer } from '@wrote/read';
import { handleBinaryFile } from '@metadata/exif';

export default defineEventHandler(async (event) => {
    const imagesDir = path.join(process.cwd(), 'public/images');

    try {
        const files = await fs.readdir(imagesDir);
        const images = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));

        const info = await Promise.all(images.map(async (image) => {
            const imagePath = path.join(imagesDir, image);
            const imageUrl = `/images/${image}`; // เพิ่ม URL ของรูปภาพ

            try {
                const imageInfo = await readImageInfo(imagePath);
                return { fileName: image, imageUrl, ...imageInfo }; // ส่ง imageUrl กลับไปด้วย
            } catch (error) {
                console.error(`Error processing image ${image}:`, error);
                return { fileName: image, imageUrl, error: 'Failed to read EXIF data' };
            }
        }));

        return info;
    } catch (error) {
        console.error('Error reading images directory:', error);
        throw new Error('Failed to load images');
    }
});

async function readImageInfo(imagePath: string) {
    const { buffer: photo } = await readBuffer(imagePath);
    const res = handleBinaryFile(photo, {
        parseData: true,
        coordinates: 'dms',
    });

    return {
        DateTimeOriginal: res.data.DateTimeOriginal || 'Unknown',
    };
}
