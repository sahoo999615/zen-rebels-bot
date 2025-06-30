const TelegramBot = require('node-telegram-bot-api');
const schedule = require('node-schedule');

// ✅ Paste your regenerated bot token here
const token = '7900890098:AAFz4qYeabiZYHTAugZK7bLcA9YDIRPhuOQ';

// ✅ Your Telegram User ID
const chatId = '6076833198';

// 🧠 Initialize bot in polling mode
const bot = new TelegramBot(token, {
  polling: true,
});

// 🕙 Schedule daily message at 10:00 AM
schedule.scheduleJob('0 10 * * *', () => {
  bot.sendMessage(chatId, `🛡️ Hey rebel, did you touch Zen Rebels code today?\n\nReply with "yes" or "no".`);
});

// 💬 Listen for replies and respond accordingly
bot.on('message', (msg) => {
  const userMessage = msg.text?.toLowerCase() ?? '';

  if (msg.chat.id != chatId) return; // Prevent others from triggering the bot

  if (userMessage === 'yes') {
    bot.sendMessage(chatId, `🔥 That’s the spirit, Sukumar. Let’s make Zen Rebels unshakable.`);
  } else if (userMessage === 'no') {
    bot.sendMessage(chatId, `⚠️ The rebellion waits for no one.\nDo 20 minutes now—open your code editor, rebel.`);
  } else if (userMessage === '/start') {
    bot.sendMessage(chatId, `👋 I'm your Zen Rebels Accountability Bot.\nI'll check on you every day at 10 AM.`);
  } else {
    bot.sendMessage(chatId, `🤖 Just reply with "yes" or "no" when I ask.\nFocus on building, not talking 😉`);
  }
});

// 🚫 Handle polling errors silently
bot.on("polling_error", (error) => {
  console.error("Polling Error:", error.message);
});
