// ZenRebelsBot.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN || '7900890098:AAGsVPYjHEuF1PlOKPwsl9-1Q35D2vSFEaA';
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;

app.use(express.json());

// Health check route
app.get('/ping', (req, res) => {
  res.send('Zen Rebels Bot is alive ✨');
});

// Telegram webhook route
app.post(`/webhook/${TELEGRAM_TOKEN}`, async (req, res) => {
  const message = req.body.message;

  if (message && message.text) {
    const chatId = message.chat.id;
    const userText = message.text;

    // Bot reply
    const reply = `🧠 Zen Rebels hears you: "${userText}"`;

    // Send message back
    await axios.post(`${TELEGRAM_API}/sendMessage`, {
      chat_id: chatId,
      text: reply
    });
  }

  res.sendStatus(200);
});

// Start server
app.listen(PORT, () => {
  console.log(`Zen Rebels Bot running on port ${PORT}`);
});
