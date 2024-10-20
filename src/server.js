const express = require('express');
const cors = require('cors');
const app = express();
const booksRouter = require('./routes/books');
const axios = require('axios');

app.use(cors());  // この行が重要です
app.use(express.json());
app.use('/api/books', booksRouter);

// Zapier Webhook URL
const ZAPIER_WEBHOOK_URL = 'あなたのZapier WebhookのURL';

// 新しい書籍を追加するエンドポイント
app.post('/api/books', async (req, res) => {
  try {
    const { title, author, url, category } = req.body;
    
    // データベースに書籍を追加する処理（ここでは省略）

    // Zapier Webhookに通知を送信
    await axios.post(ZAPIER_WEBHOOK_URL, {
      title,
      author,
      url,
      category
    });

    res.status(201).json({ message: '書籍が追加されました' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'サーバーエラーが発生しました' });
  }
});

app.post('/api/slack/add-book', async (req, res) => {
  try {
    const { text } = req.body;
    const [url, category] = text.split(' ');

    // URLからタイトルと著者を取得する処理（ここでは省略）
    const { title, author } = await fetchBookInfoFromUrl(url);

    // データベースに書籍を追加
    // Zapier Webhookに通知を送信

    res.json({ text: '書籍が正常に追加されました。' });
  } catch (error) {
    console.error('Error:', error);
    res.json({ text: 'エラーが発生しました。' });
  }
});

const port = process.env.PORT || 5000;  // 3000 から 5000 に変更

app.listen(port, () => {
  console.log(`サーバーが${port}番ポートで起動しました`);
});
