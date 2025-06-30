require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

// Load environment variables
const token = process.env.BOT_TOKEN;
const chatId = process.env.CHAT_ID;

// Create a new bot instance
const bot = new TelegramBot(token);

// Function to send a reminder message
function sendReminder() {
  const message = "⏰ Time to check in with yourself. Are you staying mindful and off distractions?";
  bot.sendMessage(chatId, message)
    .then(() => console.log(`[✔] Reminder sent at ${new Date().toLocaleTimeString()}`))
    .catch((err) => console.error(`[✖] Failed to send reminder:`, err.message));
}

// Send reminder every 2 hours (2 * 60 * 60 * 1000 milliseconds)
const TWO_HOURS = 2 * 60 * 60 * 1000;

// Send the first reminder immediately
sendReminder();

// Then repeat every 2 hours
setInterval(sendReminder, TWO_HOURS);

console.log("Zen Rebels Bot is running and will send reminders every 2 hours.");
