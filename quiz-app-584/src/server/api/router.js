const express = require("express");
const { OpenAI } = require("openai");
const axios = require("axios");
const router = express.Router();
const bodyParser = require("body-parser");
require("dotenv").config();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Initializing the OpenAI API client
const openai = new OpenAI({
    key: process.env.OPENAI_API_KEY,
    // Add other configuration options if needed
});

// Defining a conversation context prompt
const conversationContextPrompt =
    "You are a teacher for a class. Please come up with 10 quiz questions with 4 options and the correct answer marked for the human based on the information I provided. ";

const additionalContextPrompt =
    'Return it as a JSON array having fields "question", "options" and "answerIndex", spelled exactly as quoted and only with lowercase characters. "question" will contain the question in a string format. ' +
    '"options" will be an array of strings containing 4 different possible answers to the question. "answerIndex" is the index in the "options" array that contains the correct answer. ' +
    "Ensure the JSON array format is correct. Every open { should have an associated closing }. The arrays must start with the bracket [ and end with the bracket ]. Use the following information for the quiz: ";

function cleanUpJsonString(jsonString) {
    jsonString = jsonString.replace(/(\w+)\s*:/g, '"$1":');
    return jsonString;
}

router.use((req, res, next) => {
    console.log(`Request received at ${new Date()}`);
    next();
});

router.post("/chat", async (req, res) => {
    // Extracting the user's message from the request body
    const message = req.body.message;

    // Calling the OpenAI API to complete the message
    await openai.completions
        .create({
            model: "text-davinci-003",
            prompt: conversationContextPrompt + message + additionalContextPrompt,
            max_tokens: 1024,
        })
        .then((response) => {
            // Sending the response data back to the client
            rawText = response.choices[0].text;
            console.log("rawText:", rawText); // Add this line for debugging
            jsonText = rawText.substring(rawText.indexOf("["));
            jsonText = cleanUpJsonString(jsonText); // Remove whitespace
            console.log("jsonText:", jsonText); // Add this line for debugging
            try {
                const jsonArray = JSON.parse(jsonText);
    
                // Validate the structure of the parsed JSON
                if (Array.isArray(jsonArray)) {
                    for (const item of jsonArray) {
                        if (
                            typeof item.question === 'string' &&
                            Array.isArray(item.options) &&
                            item.options.length === 4 &&
                            typeof item.answerIndex === 'number' &&
                            Number.isInteger(item.answerIndex) &&
                            item.answerIndex >= 0 &&
                            item.answerIndex < 4
                            ) {
                            // Valid structure for a quiz question
                            console.log("Valid JSON structure:", item);
                     } else {
                            // Invalid structure, handle accordingly
                          console.error("Invalid JSON structure:", item);
                      }
                  }

                  res.send(jsonArray);
             } else {
                  console.error("Invalid JSON array format");
                   res.status(500).send("Internal Server Error");
              }
                } catch (error) {
                console.error("JSON Parsing Error:", error);
                res.status(500).send("Internal Server Error");
            }


        })
        .catch((error) => {
            // Handle errors
            console.error("OpenAI API Error:", error);
            res.status(500).send("Internal Server Error");
        });
});

module.exports = router;
