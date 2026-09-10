import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.PORT || 3001
const groqApiKey = process.env.GROQ_API_KEY

app.use(express.json({ limit: '2mb' }))

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, aiConfigured: Boolean(groqApiKey) })
})

app.post('/api/ai', async (req, res) => {
  if (!groqApiKey) {
    return res.status(500).json({ error: 'GROQ_API_KEY is not configured on the server.' })
  }

  const { messages, temperature = 0.3, model = 'llama-3.3-70b-versatile', response_format } = req.body || {}
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages must be a non-empty array.' })
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ model, messages, temperature, ...(response_format ? { response_format } : {}) }),
    })

    const data = await response.json()
    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || 'Groq API request failed.' })
    }

    return res.json(data)
  } catch (error) {
    console.error('Groq proxy error:', error)
    return res.status(502).json({ error: 'Unable to reach the AI service.' })
  }
})

app.listen(port, () => {
  console.log(`AI Resume API running on http://localhost:${port}`)
})
