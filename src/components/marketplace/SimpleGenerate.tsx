import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Select, SelectItem, Slider } from '@nextui-org/react'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { commonPart } from './commonPart'
import { GenerateButton, getImageBase64 } from './playground-architecture-2'

const TYPE_OF_ARCHITECT = [
    { keyword: 'townhouse', label: 'Nhà phố' },
    { keyword: 'villa', label: 'Biệt thự' },
    { keyword: 'office', label: 'Văn phòng' },
]

const STYLES = [
    { label: 'Cổ điển', keyword: 'classical' },
    {
        label: 'Tân cổ điển',
        keyword: 'neo-classical',
    },
    { label: 'Hiện đại', keyword: 'modern' },
    { label: 'Tối giản', keyword: 'simplified' },
]

const RENDER_TYPES = [
    {
        keyword: 'precise',
        label: 'Chính xác',
    },
    {
        keyword: 'relative',
        label: 'Tương đối',
    },
    {
        keyword: 'creative',
        label: 'Sáng tạo',
    },
] as const

const MATERIALS = [{ keyword: 'wood', label: 'Gỗ' }] as const

const simpleGenerateFormSchema = z.object({
    // ...commonPart,
    // numberOfReturnImages: z.number(),
    // creativity: z.nativeEnum(CREATIVITY),
    type_of_architect: z.string().refine((v) => {
        return TYPE_OF_ARCHITECT.map((t) => t.keyword).includes(v)
    }),
    number_of_return_images: z.number().int().min(1).max(7),
    render_type: z.string().refine((v) => {
        console.log(v)
        return RENDER_TYPES.map((t) => t.keyword).includes(v)
    }),
    material: z.string().refine((v) => {
        console.log(v)
        return MATERIALS.map((t) => t.keyword).includes(v)
    }),
})

export function SimpleGenerate({
    setLoading,
}: {
    setLoading: (value: boolean) => void
}) {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        setValue,
        watch,
    } = useForm({
        resolver: zodResolver(simpleGenerateFormSchema),
        defaultValues: {
            image: undefined,
        },
    })
    const numberOfReturnImages = watch('number_of_return_images')

    function onSubmit(data) {
        ; (async function() {
            setLoading(true)
            const base64Encode = await getImageBase64(data.image[0])
            const payload = {
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
            <Select label="Kiểu kiến trúc" {...register('type_of_architect')}>
                {TYPE_OF_ARCHITECT.map(function(type) {
                    return (
                        <SelectItem key={type.value} value={type.value}>
                            {type.label}
                        </SelectItem>
                    )
                })}
            </Select>

            <Select label="Phong cách" {...register('style')}>
                {STYLES.map(function(style) {
                    return (
                        <SelectItem key={style.value} value={style.value}>
                            {style.label}
                        </SelectItem>
                    )
                })}
            </Select>

            <Select
                className="max-w-xs"
                label="Độ kết xuất"
                {...register('render_type')}
            >
                {RENDER_TYPES.map((type) => (
                    <SelectItem key={type.keyword} value={type.keyword}>
                        {type.label}
                    </SelectItem>
                ))}
            </Select>

            <Select className="max-w-xs" label="Vật liệu" {...register('material')}>
                {MATERIALS.map((material) => (
                    <SelectItem key={material.keyword} value={material.keyword}>
                        {material.label}
                    </SelectItem>
                ))}
            </Select>

            <Slider
                label="Số lượng ảnh trả về"
                value={numberOfReturnImages}
                step={1}
                minValue={1}
                maxValue={7}
                defaultValue={1}
                onChange={(val) => setValue('number_of_return_images', val)}
            />

            <GenerateButton />
        </form>
    )
}
