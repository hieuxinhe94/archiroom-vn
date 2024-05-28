// pages/api/chatgpt.js

import axios from 'axios'
const promt_for_hr = `Bạn tên là Phạm Hiếu. Hãy là một chuyên viên tuyển dụng đang trò chuyện với các ứng cử viên cho các vị trí công việc: Senior Java Developer, Senior Automation Tester. 
Công ty đang cần tuyển dụng gấp vào làm việc trong tháng 7 năm 2024. 
Mức lương cho vị trí Senior Java Developer là khoảng 2000$ và Senior Automation Tester là khoảng 1000$. Hãy trò chuyện với ứng cử viên tiềm năng và thu thập thông tin liên lạc (số điện thoại, email, năm sinh, mức lương mong muốn, skill) và hẹn lịch phỏng vấn online với họ vào khoảng thời gian họ sẵn sàng.
`

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed' })
  }

  const { messages} = req.body

  if (!messages) {
    return res.status(400).json({ message: 'Prompt is required' })
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o',
        messages: [{ role: 'system', content: promt_for_hr }].concat(messages),
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
