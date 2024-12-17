// filepath: /D:/work/testwork/psychic-parakeet/server/api/photos.ts
import { IncomingMessage, ServerResponse } from 'http';
import fs from 'fs';
import path from 'path';

export default (req: IncomingMessage, res: ServerResponse) => {
  const imagesDir = path.join(process.cwd(), 'public/images');
  fs.readdir(imagesDir, (err, files) => {
    if (err) {
      res.statusCode = 500;
      res.end(JSON.stringify({ error: 'Failed to read images directory' }));
      return;
    }

    const photos = files.map((file, index) => {
      const filePath = path.join(imagesDir, file);
      const stats = fs.statSync(filePath);
      return {
        id: index + 1,
        url: `/images/${file}`,
        description: file,
        createdAt: stats.birthtime // ใช้เวลาที่ไฟล์ถูกสร้างจริงๆ
      };
    });

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ photos }));
  });
};