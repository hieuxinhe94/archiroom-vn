// pages/api/chatgpt.js

import axios from 'axios' 

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed' })
  }

  const { prompt} = req.body

  if (!prompt) {
    return res.status(400).json({ message: 'Prompt is required' })
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/images/generations',
      {
        model: 'dall-e-3',
        prompt: prompt ,
        n: 1,
        size: "1024x1024"
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
    
    res.status(200).json({ result: data.data[0]})
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ message: 'Error generating response', error: error.message })
  }
}
