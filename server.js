/**
 * server.js — Tiny Express API that sits alongside Vite
 *
 * In development : run with `node server.js` (separate terminal from `npm run dev`)
 * In production  : run with `node server.js` after `npm run build`, then also serve
 *                  the built `dist/` folder from the same Express app (see bottom).
 *
 * Endpoints
 *   GET  /api/section-services          → return public/data/section-services.json
 *   POST /api/section-services          → add a new card  { title, imageData (base64) }
 *   DELETE /api/section-services/:id    → remove a card by id
 */

import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app  = express();
const PORT = process.env.PORT || 3001;

// ── paths ──────────────────────────────────────────────────────────────────
const DATA_DIR    = path.join(__dirname, 'public', 'data');
const IMAGES_DIR  = path.join(DATA_DIR, 'images');
const DATA_FILE   = path.join(DATA_DIR, 'section-services.json');

// Ensure folders + seed file exist on first run
fs.mkdirSync(IMAGES_DIR, { recursive: true });
if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]', 'utf8');

// ── middleware ─────────────────────────────────────────────────────────────
app.use(cors());                         // allow requests from Vite dev server
app.use(express.json({ limit: '10mb' })); // images arrive as base64 strings

// Serve public/ folder statically so /data/images/*.jpg are publicly accessible
app.use(express.static(path.join(__dirname, 'public')));

// ── helpers ────────────────────────────────────────────────────────────────
const readData  = () => JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
const writeData = (arr) => fs.writeFileSync(DATA_FILE, JSON.stringify(arr, null, 2), 'utf8');

/** Strip data-URL prefix and return { ext, buffer } */
const parseBase64 = (dataUrl) => {
  const match = dataUrl.match(/^data:image\/([\w+]+);base64,(.+)$/);
  if (!match) throw new Error('Invalid image data');
  const ext    = match[1] === 'jpeg' ? 'jpg' : match[1];
  const buffer = Buffer.from(match[2], 'base64');
  return { ext, buffer };
};

// ── routes ─────────────────────────────────────────────────────────────────

// GET all section-service cards
app.get('/api/section-services', (_req, res) => {
  res.json(readData());
});

// POST — add a new card
app.post('/api/section-services', (req, res) => {
  const { title, imageData } = req.body;

  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ error: 'title is required' });
  }
  if (!imageData || typeof imageData !== 'string') {
    return res.status(400).json({ error: 'imageData is required' });
  }

  let ext, buffer;
  try {
    ({ ext, buffer } = parseBase64(imageData));
  } catch {
    return res.status(400).json({ error: 'Invalid image format' });
  }

  const id        = Date.now();
  const filename  = `${id}.${ext}`;
  const imagePath = path.join(IMAGES_DIR, filename);
  const imageUrl  = `/data/images/${filename}`;   // public URL

  fs.writeFileSync(imagePath, buffer);

  const card = { id, title: title.trim(), image: imageUrl };
  const list = readData();
  list.push(card);
  writeData(list);

  res.status(201).json(card);
});

// DELETE — remove a card and its image file
app.delete('/api/section-services/:id', (req, res) => {
  const id   = Number(req.params.id);
  const list = readData();
  const card = list.find(c => c.id === id);

  if (!card) return res.status(404).json({ error: 'Not found' });

  // Delete the physical image file
  const imagePath = path.join(__dirname, 'public', card.image);
  if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

  writeData(list.filter(c => c.id !== id));
  res.json({ deleted: id });
});

// ── production: serve built React app ─────────────────────────────────────
const distDir = path.join(__dirname, 'dist');
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.get('*', (_req, res) =>
    res.sendFile(path.join(distDir, 'index.html'))
  );
}

app.listen(PORT, () =>
  console.log(`\n  ✅  API server running at http://localhost:${PORT}\n`)
);
