const express = require('express');
const router = express.Router();
const db = require('../db');

// 書籍一覧の取得
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM books');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ... 他のCRUD操作（GET /:id, PUT /:id, DELETE /:id）も同様に実装

module.exports = router;
