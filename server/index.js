const express = require('express');
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

// In-memory data
const characters = [
  { id: 1, name: 'Dustin', age: 28, occupation: 'Surfer', bio: 'Laid back and friendly.' },
  { id: 2, name: 'Maya', age: 27, occupation: 'Model', bio: 'Confident and ambitious.' },
  { id: 3, name: 'Blake', age: 30, occupation: 'Engineer', bio: 'Tech-savvy and practical.' },
  { id: 4, name: 'Sofia', age: 26, occupation: 'Artist', bio: 'Creative spirit.' },
  { id: 5, name: 'Tyler', age: 29, occupation: 'Chef', bio: 'Loves to cook.' },
  { id: 6, name: 'Ava', age: 24, occupation: 'Dancer', bio: 'Energetic performer.' },
  { id: 7, name: 'Leo', age: 31, occupation: 'Entrepreneur', bio: 'Business minded.' },
  { id: 8, name: 'Nina', age: 25, occupation: 'Teacher', bio: 'Empathetic and patient.' },
  { id: 9, name: 'Raj', age: 28, occupation: 'Doctor', bio: 'Caring and thoughtful.' },
  { id: 10, name: 'Zoe', age: 27, occupation: 'Photographer', bio: 'Sees beauty in everything.' }
];

const locations = [
  { id: 1, name: 'Kitchen', image: '/images/kitchen.jpg' },
  { id: 2, name: 'Backyard', image: '/images/backyard.jpg' },
  { id: 3, name: 'Pool', image: '/images/pool.jpg' }
];

const episodes = [
  { id: 1, title: 'Dustin Intro' },
  { id: 2, title: 'Maya and Blake Intro' },
  { id: 3, title: 'Sofia and Tyler Intro' },
  { id: 4, title: 'Dustin Arrives on the Island' }
];

const scenes = [];

// API Endpoints
app.get('/api/characters', (req, res) => res.json(characters));
app.get('/api/locations', (req, res) => res.json(locations));
app.get('/api/episodes', (req, res) => res.json(episodes));

app.post('/api/scenes', (req, res) => {
  const { characterIds, locationId, description } = req.body;
  if (!Array.isArray(characterIds) || typeof locationId !== 'number') {
    return res.status(400).json({ error: 'Invalid payload' });
  }
  const id = scenes.length + 1;
  const scene = { id, characterIds, locationId, description: description || '' };
  scenes.push(scene);
  res.status(201).json(scene);
});

app.get('/api/scenes', (req, res) => res.json(scenes));

app.use(express.static('public'));

// Serve index.html for client-side routes
app.use((req, res) => {
  res.sendFile(require('path').join(__dirname, '../public/index.html'));
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

module.exports = { app };
