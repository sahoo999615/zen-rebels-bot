// zenRebelsBot.js
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Basic test route
app.get('/ping', (req, res) => {
  res.send('Zen Rebels Bot is alive ✨');
});

// Example AI bot route (placeholder)
app.post('/ask', (req, res) => {
  const userMessage = req.body.message;

  // Very basic response for now
  const botResponse = `You said: "${userMessage}". Zen Rebels hears you. 🧘‍♂️`;

  res.json({ response: botResponse });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Zen Rebels Bot running on port ${PORT}`);
});
