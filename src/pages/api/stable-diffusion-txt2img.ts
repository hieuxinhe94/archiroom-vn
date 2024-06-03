import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import z from 'zod'

const requestSchema = z.object({
  prompt: z.string().min(1),
  negative_prompt: z.string(),
  image: z.string(),
})

const STABLE_DIFFUSION_SERVER_URL = process.env.SD_URL

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed' })
  }

  const validatedSchema = requestSchema.safeParse(req.body)

  if (!validatedSchema.success) {
    return res.status(400).json({ message: 'Invalid request' })
  }

  try {
    const response = await axios.post(
      `${STABLE_DIFFUSION_SERVER_URL}/sdapi/v1/img2img`,
      {
        prompt: validatedSchema.data.prompt,
        negative_prompt: validatedSchema.data.negative_prompt,
        scheduler: 'Karras',
        seed: -1,
        steps: 20,
        width: 512,
        height: 512,
        denoising_strength: 0.5,
        n_iter: 1,
        init_images: [validatedSchema.data.image],
        alwayson_scripts: {
          controlnet: {
            args: [
              {
                module: 'canny',
                model: 'control_canny-fp16 [e3fe7712]',
              },
            ],
          },
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const data = response.data

    res.status(200).json({ result: data.images[0] })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ message: 'Error generating response', error: error.message })
  }
}
