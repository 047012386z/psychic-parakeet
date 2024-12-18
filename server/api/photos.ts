import fs from 'fs';
import path from 'path';

export default defineEventHandler(() => {
  // กำหนดเส้นทางโฟลเดอร์รูปภาพ
  const imagesDir: string = path.resolve('./public/images'); 
  const files: string[] = fs.readdirSync(imagesDir);

  // นามสกุลไฟล์รูปภาพที่ต้องการ
  const imageExtensions: string[] = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];

  // ดึงข้อมูลรูปภาพ
  const images = files
    .filter((file: string) => imageExtensions.some((ext: string) => file.toLowerCase().endsWith(ext)))
    .map((file: string, index: number) => {
      const filePath: string = path.join(imagesDir, file);
      const stats = fs.statSync(filePath);
      
      return {
        id: index + 1,
        url: `/images/${file}`,
        name: file,
        dateTime: stats.birthtime, // เวลาไฟล์ถูกสร้าง
      };
    });

  return images;
});