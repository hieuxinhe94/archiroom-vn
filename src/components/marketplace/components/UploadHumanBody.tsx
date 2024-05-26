

import { Spinner } from '@nextui-org/react'
import * as cocoSsd from '@tensorflow-models/coco-ssd'
import * as ImageJS from 'image-js'
import Image from 'next/image'
import { FC, useCallback, useEffect, useRef, useState } from 'react'

import upload from './background-images/upload.svg'
 

interface UploadHumanBodyProps {
  active: boolean,
  checkMultiHuman: boolean,
  onBodyDetected: (bodyDetectedImages: string[], originalImages: string) => void
  class?: 'person'
}

const UploadHumanBody: FC<UploadHumanBodyProps> = ({
  active,
  checkMultiHuman,
  onBodyDetected,
  class: type = 'person',
}) => {
  const [model, setModel] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)
  const fileInputRef = useRef<any>()
  const uploadTrigger = () => {

    setLoading(true)
    fileInputRef?.current.click()
  }

  // const loadModel = useCallback(async () => {
  //   if (!checkMultiHuman) return;
  //   
  //   const model = await cocoSsd.load()
  //   setModel(model)
  // }, [checkMultiHuman])


  // useEffect(() => {
  //   if (active) {
  //     loadModel()
  //   }
  // }, [loadModel, active])

  const cropImage = useCallback(
    async (bbox: any[], imageUrl) => {
      const img = await ImageJS.Image.load(imageUrl)

      const images: string[] = []
      bbox.map((box) => {
        const croppedImage = img?.crop({
          x: box[0],
          y: box[1],
          width: box[2],
          height: box[3],
        })
        images.push(croppedImage.toDataURL())
      })
      
      onBodyDetected(images, img.toDataURL())
      setLoading(false)
    },
    [onBodyDetected],
  )

  const handleImageUpload = useCallback(
    async (event: any) => {
      const file = event.target.files[0]

      if (file) {
        const imageUrl = URL.createObjectURL(file)

        // Load the Coco-SSD model
        // const model = await cocoSsd.load()
        // Perform object detection on the image
        const image = document.createElement('img')
        image.src = imageUrl

        image.onload = async () => {
          if (!checkMultiHuman) return cropImage([], imageUrl);

          
          // cocoSsd.load().then(async model => {
          //   if (model) {
          //     
          //     const predictions = await model.detect(image)
          //     const bbox = predictions
          //       .filter((i) => i.class === type && i.score > 0.5)
          //       .map((b) => b.bbox)
          //     cropImage(bbox, imageUrl)
          //     return
          //   }

          // })

        }
      }
    },

    [cropImage, checkMultiHuman],
  )

  return (
    <div className="cursor-pointer">
      {loading ? (
        <Spinner color="secondary" />
      ) : (
        <>
          <Image
            onClick={uploadTrigger}
            src={upload}
            width={49}
            height={47}
            alt="upload image"
            className="w-[36px] h-[36px] lg:w-[49px] lg:h-[47px]"
          />
        </>
      )}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
        onBlur={() => setLoading(false)}
        ref={fileInputRef}
      />
    </div>
  )
}
export default UploadHumanBody
