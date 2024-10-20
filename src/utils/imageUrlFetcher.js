const axios = require('axios');
const cheerio = require('cheerio');

async function fetchImageUrl(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const imageUrl = $('meta[property="og:image"]').attr('content');
    return imageUrl || null;
  } catch (error) {
    console.error('画像URL取得エラー:', error);
    return null;
  }
}

module.exports = fetchImageUrl;
