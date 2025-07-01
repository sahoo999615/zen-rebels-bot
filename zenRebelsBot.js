const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
require('dotenv').config();

const token = process.env.BOT_TOKEN;

if (!token) {
  console.error("❌ BOT_TOKEN not found in environment variables.");
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

console.log("Zen Rebels Bot is running and will send reminders every 2 hours.");

// Dummy express server to keep Render service alive
const app = express();
const PORT = process.env.PORT || 10000;
app.get('/', (req, res) => res.send('Zen Rebels Bot is live!'));
app.listen(PORT, () => {
  console.log(`Dummy Express server running on port ${PORT}`);
});

// Reminder messages (one per day format or rotate from here)
const messages = [
  "🚀 Stay focused, Zen Rebel. Every moment matters.",
  "💥 Time to crush your goals. No more distractions!",
  "🧠 Discipline beats motivation. Stay on track.",
  "🔥 You're not alone. Your tribe is with you.",
  "📵 Break the scroll. Build the soul.",
  "🌱 Small wins daily = huge growth long-term.",
  "⏳ Choose purpose over passive consumption."
];

// Send reminder every 2 hours
const sendReminder = () => {
  const chatId = process.env.CHAT_ID;
  if (!chatId) {
    console.error("❌ CHAT_ID not set. Cannot send reminders.");
    return;
  }

  const randomIndex = Math.floor(Math.random() * messages.length);
  const message = messages[randomIndex];

  bot.sendMessage(chatId, message)
    .then(() => {
      console.log(`[✔] Reminder sent at ${new Date().toLocaleTimeString()}`);
    })
    .catch((error) => {
      console.error(`[✖] Failed to send reminder: ${error.message}`);
    });
};

// Start 2-hour interval reminders
setInterval(sendReminder, 2 * 60 * 60 * 1000);

// 🔁 Optional immediate test message on startup
// sendReminder();

// Handle user commands
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text?.toLowerCase();

  if (text === '/start') {
    bot.sendMessage(chatId, `👋 Welcome to Zen Rebels, ${msg.chat.first_name}! You will get reminders every 2 hours.`);
  }

  // ✅ Test reminder instantly
  else if (text === '/test') {
    bot.sendMessage(chatId, '✅ This is your test reminder! Stay strong, Zen Rebel 🔥');
  }

  // Optional fallback for unknown commands
  else if (text.startsWith('/')) {
    bot.sendMessage(chatId, '🤖 Unknown command. Try /test');
  }
});
