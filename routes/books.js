const express = require('express');
const router = express.Router();
const db = require('../src/db');

router.get('/', async (req, res) => {
  console.log('GET request to /api/books received');
  try {
    const { rows } = await db.query('SELECT * FROM books');
    console.log('Query result:', rows);
    res.json(rows);
  } catch (err) {
    console.error('Error in GET /api/books:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

