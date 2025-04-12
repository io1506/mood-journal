// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// In-memory store (use a database in production)
let journalEntries = [];

app.post('/save-entry', (req, res) => {
  const { mood, journal, timestamp } = req.body;

  if (!mood || !journal) {
    return res.status(400).json({ error: 'Mood and Journal entry are required!' });
  }

  const newEntry = { mood, journal, timestamp: new Date().toLocaleString() };
  journalEntries.push(newEntry); // Save to memory (or database)

  res.status(200).json({ message: 'Entry saved successfully!', entry: newEntry });
});

app.get('/entries', (req, res) => {
  res.status(200).json({ entries: journalEntries });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
