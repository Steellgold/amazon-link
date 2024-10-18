const express = require('express');

const app = express();

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

app.get('/resolve-url', async (req, res) => {
  const { url } = req.query;
  try {
    const response = await fetch(url, { method: 'HEAD', redirect: 'follow' });
    res.json({ resolvedUrl: response.url });
  } catch (err) {
    res.status(500).json({ error: 'Unable to resolve the URL' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));