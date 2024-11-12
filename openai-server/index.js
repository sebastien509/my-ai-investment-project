const express = require('express');
const OpenAI = require('openai');
const dotenv = require('dotenv');
const cors = require('cors'); // Import cors

dotenv.config();

const app = express();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Enable CORS for all requests (or you can restrict to a specific origin)
app.use(cors());
app.use(express.json()); // Allow JSON payloads

// Optional: Root route
app.get('/', (req, res) => {
  res.send('Server is running');
});


// POST route to generate completions from OpenAI API
app.post('/api/generate', async (req, res) => {
  try {
    const { prompt } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt }
      ],
      max_tokens: 50,
    });

    res.json({ completion: completion.choices[0].message.content });
  } catch (error) {
    console.error("Error with OpenAI API request:", error);
    res.status(500).json({ error: 'Error with OpenAI API request' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
