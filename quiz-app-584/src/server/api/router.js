const express = require('express');
const { OpenAI } = require('openai');
const axios = require('axios');
const router = express.Router();
const bodyParser = require('body-parser');
require('dotenv').config();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Initializing the OpenAI API client
const openai = new OpenAI({
  key: process.env.OPENAI_API_KEY,
  // Add other configuration options if needed
});

// Defining a conversation context prompt
const conversationContextPrompt =
  " You are a teacher for a class. Please come up with 10 quiz questions for the human based on the information after the colon:";

router.use((req, res, next) => {
  console.log(`Request received at ${new Date()}`);
  next();
});

router.post('/chat', async (req, res) => {
  // Extracting the user's message from the request body
  const message = req.body.message;

  // Calling the OpenAI API to complete the message
  await openai.completions.create({
    model: 'text-davinci-003',
    prompt: conversationContextPrompt + message,
    max_tokens: 1024,
    
  })
  .then((response) => {
    // Sending the response data back to the client
    res.send(response.choices);
  })
  .catch((error) => {
    // Handle errors
    console.error('OpenAI API Error:', error);
    res.status(500).send('Internal Server Error');
  });
});

module.exports = router;
