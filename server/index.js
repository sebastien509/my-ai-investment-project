require('dotenv').config();
const express = require('express');
const OpenAI = require('openai');

const app = express();
const port = process.env.PORT || 3000;

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
console.log("API Key:", process.env.OPENAI_API_KEY); // This should print your key

// Sample route to handle requests
app.get('/api/test', async (req, res) => {
    try {
      const completion = await openai.completions.create({
        model: "gpt-3.5-turbo", // or  if available in your plan
        prompt: "Say this is a test.",
        max_tokens: 7,
        temperature: 0,
      });
      res.json(completion.data);
    } catch (error) {
      console.error("Error with OpenAI API request:", error);
      res.status(500).send("Error with OpenAI API request");
    }
  });
  

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
