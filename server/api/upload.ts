import path from 'path';
import { promises as fs } from 'fs';

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event);
  if (!formData) {
    throw createError({ statusCode: 400, statusMessage: 'No file uploaded' });
  }

  const file = formData.find((field) => field.name === 'file');
  if (!file) {
    throw createError({ statusCode: 400, statusMessage: 'No file uploaded' });
  }

  const imagesDir = path.resolve('./public/images');
  const filePath = path.join(imagesDir, file.filename);

  await fs.writeFile(filePath, file.data);

  return { url: `/images/${file.filename}`, name: file.filename };
});