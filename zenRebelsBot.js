// zenRebelsBot.js

require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

const botToken = process.env.BOT_TOKEN;

if (!botToken) {
  console.error('❌ Telegram Bot Token not provided!');
  process.exit(1);
}

const bot = new TelegramBot(botToken, { polling: true });

console.log('Zen Rebels Bot is running and will send reminders every 2 hours.');

// Send a reminder every 2 hours
setInterval(() => {
  const chatId = process.env.CHAT_ID;
  if (chatId) {
    const message = '🔥 Your Zen Rebels reminder: Time to stay focused and disciplined.';
    bot.sendMessage(chatId, message)
      .then(() => console.log(`[✔] Reminder sent at ${new Date().toLocaleTimeString()}`))
      .catch(err => console.error('[✖] Failed to send reminder:', err.message));
  } else {
    console.error('❌ CHAT_ID not defined in environment variables.');
  }
}, 2 * 60 * 60 * 1000); // Every 2 hours

// Dummy Express server to keep Render service alive
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Zen Rebels Bot is running.'));

app.listen(PORT, () => {
  console.log(`Dummy Express server running on port ${PORT}`);
});
