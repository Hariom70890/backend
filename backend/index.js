const express = require('express');
const axios = require('axios');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const app = express();
app.use(express.json());
require('dotenv').config(); 
const cors=require("cors");
app.use(cors());
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post('/', async (req, res) => {
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
                max_tokens: 50
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
