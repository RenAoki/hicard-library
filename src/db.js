const { Pool } = require('pg');

const pool = new Pool({
  user: 'aokiren',
  host: 'localhost',
  database: 'company_books',
  password: '',  // パスワードがある場合は設定してください
  port: 5432,
});

async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('データベース接続成功');
    const res = await client.query('SELECT NOW()');
    console.log('クエリ結果:', res.rows[0]);
    client.release();
  } catch (err) {
    console.error('データベース接続エラー:', err);
  }
}

module.exports = {
  query: (text, params) => pool.query(text, params),
  testConnection,
};
