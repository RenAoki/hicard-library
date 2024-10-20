import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/books')  // 3000 から 5000 に変更
      .then(response => {
        console.log('Response:', response.data);  // レスポンスをログに出力
        setBooks(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error details:', error);  // エラーの詳細をログに出力
        setError(`書籍データの取得に失敗しました。エラー: ${error.message}`);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>読み込み中...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>書籍一覧</h2>
      {books.length === 0 ? (
        <p>書籍がありません。</p>
      ) : (
        <ul>
          {books.map(book => (
            <li key={book.id}>
              {book.title} by {book.author}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookList;
