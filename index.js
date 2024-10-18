const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

app.get('/resolve-url', async (req, res) => {
  const shortUrl = req.query.url;
  
  if (!shortUrl) {
    return res.status(400).json({ error: 'You must provide a URL to resolve' });
  }

  try {
    const response = await fetch(shortUrl, {
      method: 'GET',
      redirect: 'follow'
    });

    const resolvedUrl = response.url;
    res.json({ resolvedUrl });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while resolving the URL' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));