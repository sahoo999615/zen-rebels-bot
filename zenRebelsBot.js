// zenRebelsBot.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cron = require('node-cron');

const app = express();
const PORT = process.env.PORT || 3000;
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = '6076833198'; // your chat ID

// Middleware to parse JSON
app.use(express.json());

// Basic test route
app.get('/ping', (req, res) => {
  res.send('Zen Rebels Bot is alive ✨');
});

// Placeholder AI route
app.post('/ask', (req, res) => {
  const userMessage = req.body.message;
  const botResponse = `You said: "${userMessage}". Zen Rebels hears you. 🧘‍♂️`;
  res.json({ response: botResponse });
});

// Reminder function
function sendDailyReminder() {
  const message = '🧘‍♂️ Zen check-in: Stay off social media and win today. 🔥 Let’s go, rebel!';
  axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    chat_id: CHAT_ID,
    text: message
  }).then(() => {
    console.log('✅ Daily reminder sent!');
  }).catch(err => {
    console.error('❌ Reminder error:', err.response ? err.response.data : err.message);
  });
}

// Schedule at 8:00 AM server time
cron.schedule('0 8 * * *', sendDailyReminder);

// Start server
app.listen(PORT, () => {
  console.log(`Zen Rebels Bot running on port ${PORT}`);
});
