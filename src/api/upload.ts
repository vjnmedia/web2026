import { createWriteStream } from 'fs';
import { mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { IncomingMessage, ServerResponse } from 'http';
import formidable from 'formidable';
import { promisify } from 'util';

// Configure formidable
const form = formidable({
  uploadDir: join(process.cwd(), 'public', 'uploads'),
  keepExtensions: true,
  maxFileSize: 5 * 1024 * 1024, // 5MB
  filter: ({ mimetype }) => {
    return mimetype?.startsWith('image/') || false;
  }
});

// Promisify form.parse
const parseForm = promisify(form.parse);

// Ensure upload directory exists
const ensureUploadDir = async () => {
  try {
    await mkdir(join(process.cwd(), 'public', 'uploads'), { recursive: true });
  } catch (error) {
    console.error('Error creating upload directory:', error);
  }
};

export const uploadHandler = async (req: IncomingMessage, res: ServerResponse) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  try {
    // Ensure upload directory exists
    await ensureUploadDir();

    // Parse the incoming form data
    const [fields, files] = await parseForm(req);
    const file = files.file?.[0];

    if (!file) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: 'No file uploaded' }));
      return;
    }

    // Generate a unique filename
    const fileExt = file.originalFilename?.split('.').pop();
    const newFilename = `${uuidv4()}.${fileExt}`;
    const newPath = join(process.cwd(), 'public', 'uploads', newFilename);

    // Move the file to its final location
    const writeStream = createWriteStream(newPath);
    const readStream = createReadStream(file.filepath);

    await new Promise((resolve, reject) => {
      readStream.pipe(writeStream);
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });

    // Return the URL of the uploaded file
    const fileUrl = `/uploads/${newFilename}`;
    res.statusCode = 200;
    res.end(JSON.stringify({ url: fileUrl }));
  } catch (error) {
    console.error('Upload error:', error);
    res.statusCode = 500;
    res.end(JSON.stringify({ error: 'Failed to upload file' }));
  }
}; 