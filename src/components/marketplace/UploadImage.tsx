import { Button } from '@nextui-org/button'
import { Controller } from 'react-hook-form'

export default function UploadImage({ control, setSelectedImage }) {
    return (
        <Controller
            control={control}
            name="image"
            render={({ field }) => (
                <Button size="lg" type="button">
                    <input
                        type="file"
                        className="hidden"
                        id="fileInput"
                        accept="image/*"
                        onBlur={field.onBlur}
                        name={field.name}
                        onChange={(e) => {
                            field.onChange(e.target.files)
                            setSelectedImage(e.target.files?.[0] || null)
                        }}
                        ref={field.ref}
                    />
                    <label
                        htmlFor="fileInput"
                        className="bg-blue-500 hover:bg-blue-600 text-neutral-90  rounded-md cursor-pointer inline-flex items-center"
                    >
                        <span className="whitespace-nowrap">choose your image</span>
                    </label>
                </Button>
            )}
        />
    )
}
