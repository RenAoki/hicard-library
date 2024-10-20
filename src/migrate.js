const { query } = require('./db');
const fs = require('fs');
const path = require('path');

async function runMigration() {
  const sql = fs.readFileSync(path.join(__dirname, '../migrations/001_create_books_table.sql'), 'utf8');
  await query(sql);
  console.log('マイグレーションが完了しました');
}

runMigration().catch(console.error);
