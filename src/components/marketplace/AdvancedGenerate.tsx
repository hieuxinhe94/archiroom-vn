import { zodResolver } from '@hookform/resolvers/zod'
import { Textarea } from '@nextui-org/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { CommonPart, commonPart } from './commonPart'
import { GenerateButton, getImageBase64 } from './playground-architecture-2'

const advancedGenerateFormSchema = z.object({
  ...commonPart,
  prompt: z.string(),
  negative_prompt: z.string(),
})

export function AdvanceGenerateForm({
  setLoading,
}: {
  setLoading: (value: boolean) => void
}) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(advancedGenerateFormSchema),
    defaultValues: {
      type: 'exterior',
      negative_prompt: '',
      prompt: '',
      image: undefined,
    },
  })
  const typeOfArchitectValue = watch('type')

  function onSubmit(data) {
    ;(async function () {
      setLoading(true)
      const base64Encode = await getImageBase64(data.image[0])
      const payload = {
        prompt: data.prompt,
        negative_prompt: data.negative_prompt,
        scheduler: 'Karras',
        seed: -1,
        steps: 20,
        width: 512,
        height: 512,
        denoising_strength: 0.5,
        n_iter: 1,
        init_images: [base64Encode],
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
      }
      console.log(payload)

      // try {
      //   const res = await axios.post(
      //     `${serviceUrl}/sdapi/v1/img2img`,
      //     payload,
      //     {
      //       headers: {
      //         'Content-Type': 'application/json',
      //       },
      //     },
      //   )
      //   setResultImage(res.data.result)
      // } catch (e) {
      //   console.log(e)
      // } finally {
      //   setLoading(false)
      // }
    })()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
      <CommonPart
        register={register}
        typeOfArchitectValue={typeOfArchitectValue}
      />
      {/* <UploadImage control={control} setSelectedImage={setSelectedImage} /> */}

      <label>Prompt</label>
      <Textarea {...register('prompt')} label="Prompt" />
      <p>{errors.prompt?.message}</p>

      <label>Negative Prompt</label>
      <Textarea {...register('negative_prompt')} label="Negative Prompt" />
      <p>{errors.negative_prompt?.message}</p>

      <GenerateButton />
    </form>
  )
}
