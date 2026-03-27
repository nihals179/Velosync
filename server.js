import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 4000;
const DATA_PATH = path.resolve('./public/data/siteContent.json');

app.use(cors());
// Increase body size limits to accommodate large SVGs or data-URI images from the admin UI.
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.get('/api/content', (req, res) => {
  fs.readFile(DATA_PATH, 'utf8', (err, data) => {
    if (err) {
      console.error('Failed to read content file', err);
      return res.status(500).json({ error: 'Failed to read content' });
    }
    try {
      const json = JSON.parse(data);
      res.json(json);
    } catch (e) {
      console.error('Invalid JSON in content file', e);
      res.status(500).json({ error: 'Invalid content JSON' });
    }
  });
});

app.post('/api/content', (req, res) => {
  const content = req.body;
  if (!content || typeof content !== 'object') {
    return res.status(400).json({ error: 'Invalid content' });
  }
  fs.writeFile(DATA_PATH, JSON.stringify(content, null, 2), 'utf8', (err) => {
    if (err) {
      console.error('Failed to write content file', err);
      return res.status(500).json({ error: 'Failed to write content' });
    }
    res.json({ ok: true });
  });
});

app.listen(PORT, () => {
  console.log(`Content API server listening on port ${PORT}`);
});
