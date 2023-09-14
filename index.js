const express = require('express');
const axios = require('axios');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const app = express();
app.use(express.json());
require('dotenv').config(); 
const cors=require("cors");
app.use(cors());
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post('/shayari', async (req, res) => {
    try {
        const {topic,query} = req.body;
        
        let response = await fetch(`https://api.openai.com/v1/chat/completions`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENAI_API_KEY}`,
                "Content-Type": "application/json"
            },  
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: `give me a ${topic} on ${query}` }],
                max_tokens: 500
            })
        });
        response = await response.json();
  
        console.log(response)
        // Check if response.choices is defined and not empty
        if (response.choices && response.choices.length > 0) {
            const data = response.choices[0].message.content;
            res.status(200).send({ code: data });
        } else {
            // Handle the case when response.choices is empty
            res.status(500).send({ msg: "No valid response from the API" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: error.message });
    }
  })


  // Endpoint to handle code conversion
app.get("/",(req,res)=>{
    res.send("hello")
  })
  const GPT_API_KEY = process.env.OPENAI_API_KEY;
  app.post('/convert', async (req, res) => {
    const { code, toLanguage } = req.body;
  
    if (!code) {
      return res.status(400).json({ error: 'Invalid request. Please provide code' });
    }
  
    try {
  
      // Call the ChatGPT API to convert code
      const response = await axios.post(
        'https://api.openai.com/v1/engines/text-davinci-003/completions',
        {
          prompt: `Convert this code to ${toLanguage}: ${code}`,
          max_tokens: 150,
        },
        {
          headers: {
            Authorization: `Bearer ${GPT_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
  // console.log(response.data)
      const convertedCode = response.data.choices[0].text.trim();
      res.json({ convertedCode });
    } catch (error) {
      console.error('Error converting code:', error.message);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
      res.status(500).json({ error: 'Failed to convert code' });
    }
  });
  
  app.post('/debug', async (req, res) => {
    const { code } = req.body;
  
    if (!code) {
      return res.status(400).json({ error: 'Invalid request. Please provide code, fromLanguage, and toLanguage.' });
    }
  
    try {
  
      // Call the ChatGPT API to convert code
      const response = await axios.post(
        'https://api.openai.com/v1/engines/text-davinci-003/completions',
        {
          prompt: `${code} debug this code and provide what is write  what we have to change or put`,
          max_tokens: 500,
        },
        {
          headers: {
            Authorization: `Bearer ${GPT_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      const convertedCode = response.data.choices[0].text.trim();
      res.json({ convertedCode });
    } catch (error) {
      console.error('Error converting code:', error.message);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
      res.status(500).json({ error: 'Failed to convert code' });
    }
  });
  app.post('/check', async (req, res) => {
    const { code } = req.body;
  
    if (!code) {
      return res.status(400).json({ error: 'Invalid request. Please provide code, fromLanguage, and toLanguage.' });
    }
  
    try {
  
      // Call the ChatGPT API to convert code
      const response = await axios.post(
        'https://api.openai.com/v1/engines/text-davinci-003/completions',
        {
          prompt: `${code} provide me a quality check for this code with the percentage and some details`,
          max_tokens: 1500,
        },
        {
          headers: {
            Authorization: `Bearer ${GPT_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      const convertedCode = response.data.choices[0].text.trim();
      console.log(convertedCode.split("\n"))
      res.json({ convertedCode });
    } catch (error) {
      console.error('Error converting code:', error.message);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
      res.status(500).json({ error: 'Failed to convert code' });
    }
  });
  
  
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
