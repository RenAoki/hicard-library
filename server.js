require('dotenv').config();

const express = require('express');
const app = express();
const { Pool } = require('pg');
const path = require('path');
const cors = require('cors');
const db = require('./src/db');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
});

// データベース接続テスト
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('データベース接続エラー:', err);
  } else {
    console.log('データベース接続成功:', res.rows[0]);
  }
});

// データベース名の確認
pool.query('SELECT current_database()', (err, res) => {
  if (err) {
    console.error('データベース名の取得に失敗しました:', err);
  } else {
    console.log('接続中のデータベース名:', res.rows[0].current_database);
  }
});

// テーブルの存在確認
pool.query('SELECT to_regclass(\'public.books\')', (err, res) => {
  if (err) {
    console.error('テーブル確認エラー:', err);
  } else {
    if (res.rows[0].to_regclass) {
      console.log('booksテーブルが存在します');
    } else {
      console.log('booksテーブルが存在しません');
    }
  }
});

app.get('/', (req, res) => {
  res.send('Welcome to hicard Library API');
});

const booksRouter = require('./routes/books');
app.use('/api/books', booksRouter);

// ルートパスのハンドラー（静的ファイルがない場合のフォールバック）
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// 静的ファイルの提供
// app.use(express.static(path.join(__dirname, 'public')));

// ルートの設定など

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  db.testConnection();
});

app.use(cors());

// 他のルートの後に追加
app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});
