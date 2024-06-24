import { UseFormRegister } from 'react-hook-form'
import z from 'zod'

import { STYLES, TYPES } from './playground-architecture-2'

const MAX_FILE_SIZE = 1024 * 1024 * 5
const ACCEPTED_IMAGE_MIME_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
]
const imageUploadValidation = z
    .any()
    .refine((files) => {
        return files?.[0]?.size <= MAX_FILE_SIZE
    }, `Max image size is 5MB.`)
    .refine(
        (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
        'Only .jpg, .jpeg, .png and .webp formats are supported.',
    )

export const commonPart = {
    type: z.string().refine((val) => {
        console.log(val)
        return TYPES.map((type) => type.keyword).includes(val)
    }),
    style: z.string().refine((val) => {
        return STYLES.map((style) => style.keyword).includes(val)
    }),
}

export function CommonPart({
    register,
    typeOfArchitectValue,
}: {
    register: UseFormRegister<any>
    typeOfArchitectValue: string
}) {
    return (
        <div>
            <label
                className={`rounded-lg border-1 ${typeOfArchitectValue === 'exterior' ? 'border-black' : 'border-green'
                    }`}
            >
                <input
                    {...register('type')}
                    type="radio"
                    id="exterior"
                    value="exterior"
                    className="hidden"
                />
                Exterior
            </label>

            <label
                className={`rounded-lg border-1 ${typeOfArchitectValue === 'interior' ? 'border-black' : 'border-green'
                    }`}
            >
                <input
                    {...register('type')}
                    type="radio"
                    id="interior"
                    value="interior"
                    className="hidden"
                />
                Interior
            </label>
        </div>
    )
}
