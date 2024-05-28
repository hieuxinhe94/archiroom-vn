// pages/api/chatgpt.js

import axios from 'axios'
 

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed' })
  }

  const { promt} = req.body

  if (!promt) {
    return res.status(400).json({ message: 'Prompt is required' })
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o',
        messages: [{ role: 'user', content: `Response only answer. Translate the following English text to Vietnamese: "${promt}"` }],
        max_tokens: 100,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'OpenAI-Organization': `org-qsgKCiUO3d4BQSW2OJl3rAZ2`,
        },
      },
    )

    const data = response.data;
    
  
    res.status(200).json({ result: data.choices[0].message.content })
    
  } catch (error) {
     
    res
      .status(500)
      .json({ message: 'Error generating response', error: error.message })
  }
}
