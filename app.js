const express = require('express');
const getUserToken = require('./get-user-token');
const decodeToken = require('./decode-token');
require('dotenv').config();

const app = express();


const PORT = 3000;
const X_API_KEY = process.env.X_API_KEY;
const SOURCE_ID = process.env.SOURCE_ID;

const userAccessToken = getUserToken();

const link = `https://aca.so/redirect?src_id=${SOURCE_ID}&token=${userAccessToken}`;

app.post('/auth/acaso', (req, res) => {
  if (req.headers['x-api-key'] != X_API_KEY) {
    return res.status(400).send('Invalid API Key');
  }
  const userData = decodeToken(req.headers.authorization);
  res.send(userData);
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
