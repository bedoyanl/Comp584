// Importing necessary modules for the code
const express = require("express"); // Express is a web application framework for Node.js
const { OpenAI } = require("openai"); // Importing OpenAI module to interact with the OpenAI API
const axios = require("axios"); // Axios is a promise-based HTTP client for the browser and Node.js
const router = express.Router(); // Creating an Express router to handle routes
const bodyParser = require("body-parser"); // Body-parser is used to parse incoming request bodies
require("dotenv").config(); // Loading environment variables from a .env file

router.use(bodyParser.json()); // Using body-parser middleware to parse JSON requests
router.use(bodyParser.urlencoded({ extended: true })); // Parsing URL-encoded requests

// Initializing the OpenAI API client with the provided API key
const openai = new OpenAI({
    key: process.env.OPENAI_API_KEY,
});

// Defining a conversation context prompt
const conversationContextPrompt =
    "You are a teacher for a class. Please come up with 10 quiz questions with 4 options and the correct answer marked for the human based on the information I provided. ";

// Additional context prompt with instructions for generating quiz questions in JSON format
const additionalContextPrompt =
    'Return it as a JSON array having fields "question", "options" and "answerIndex", spelled exactly as quoted and only with lowercase characters. "question" will contain the question in a string format. ' +
    '"options" will be an array of strings containing 4 different possible answers to the question. "answerIndex" is the index in the "options" array that contains the correct answer. ' +
    "Ensure the JSON array format is correct. Every open { should have an associated closing }. The arrays must start with the bracket [ and end with the bracket ]. Use the following information for the quiz: ";

// Function to clean up the formatting of a JSON string
function cleanUpJsonString(jsonString) {
    jsonString = jsonString.replace(/(\w+)\s*:/g, '"$1":');
    return jsonString;
}

// Middleware function to log the timestamp of incoming requests
router.use((req, res, next) => {
    console.log(`Request received at ${new Date()}`);
    next();
});

// Endpoint to handle POST requests to "/chat"
router.post("/chat", async (req, res) => {
    // Extracting the user's message from the request body
    const message = req.body.message;

   // Calling the OpenAI API to complete the message using the text-davinci-003 model
    await openai.completions
        .create({
            model: "text-davinci-003",
            prompt: conversationContextPrompt + message + additionalContextPrompt,
            max_tokens: 1024, // Limiting the number of tokens in the response
        })
        .then((response) => {
           // Extracting and cleaning up the JSON text from the OpenAI API response
            rawText = response.choices[0].text;
            console.log("rawText:", rawText); // Logging the raw response for debugging
            jsonText = rawText.substring(rawText.indexOf("["));
            jsonText = cleanUpJsonString(jsonText); // Remove whitespace
            console.log("jsonText:", jsonText); // Logging the cleaned JSON text for debugging
            try {
                // Parsing the JSON text into a JavaScript array
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
                  // Sending the validated JSON array back to the client
                  res.send(jsonArray);
             } else {
                // Invalid JSON array format
                   console.error("Invalid JSON array format");
                   res.status(500).send("Internal Server Error");
              }
                } catch (error) {
                // Handling JSON parsing errors
                console.error("JSON Parsing Error:", error);
                res.status(500).send("Internal Server Error");
            }


        })
        .catch((error) => {
            // Handling errors from the OpenAI API
            console.error("OpenAI API Error:", error);
            res.status(500).send("Internal Server Error");
        });
});
// Exporting the router module for use in other files
module.exports = router;
