import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Card,
  cn,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Progress,
  RadioGroup,
  Select,
  SelectItem,
  Skeleton,
  Tab,
  Tabs,
  useRadio,
  VisuallyHidden,
} from '@nextui-org/react'
import { Image as Image2 } from '@nextui-org/react'
import { StreamingTextResponse, streamText } from 'ai'
import axios from 'axios'
import * as ImageJS from 'image-js'
import Image from 'next/image'
import Link from 'next/link'
import { NextRequest } from 'next/server'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Webcam from 'react-webcam'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import z from 'zod'

import UploadHumanBody from '../UploadHumanBody'
import checked from './components/background-images/checked.svg'
import closeIcon from './components/background-images/closeIcon.svg'
import combineIcon from './components/background-images/combineIcon.svg'
import modalLogo from './components/background-images/modal-logo.svg'
import resultIcon from './components/background-images/resultIcon.svg'
import upload from './components/background-images/upload.svg'
import { imageKitService } from './components/ImageKitService'

const styles = ['Tự động', 'Ngoại thất', 'Nội thất'] as const

const MAX_FILE_SIZE = 1024 * 1024 * 5
const ACCEPTED_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]
const ACCEPTED_IMAGE_TYPES = ['jpeg', 'jpg', 'png', 'webp']

const schema = z.object({
  prompt: z.string(),
  negative_prompt: z.string(),
  style: z.enum(styles),
  image: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE
    }, `Max image size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.',
    ),
})

type schemaType = z.infer<typeof schema>

export default function PlayGroundArchitecture({ config, onCloseEvent }) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [resultImage, setResultImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      image: undefined,
    },
  })

  async function getImageBase64(file: File) {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        resolve(reader.result)
      }
    })
  }

  async function onSubmit(data) {
    // console.log(data.prompt)
    ;(async function () {
      setLoading(true)
      const base64Encode = await getImageBase64(data.image[0])
      try {
        const res = await axios.post(
          'http://localhost:3000/api/stable-diffusion-txt2img',
          {
            prompt: data.prompt,
            negative_prompt: data.negative_prompt,
            image: base64Encode,
          },
        )
        // console.log(res.data.result)
        setResultImage(res.data.result)
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    })()
  }

  return (
    <div className="w-full h-full flex flex-row px-4 hover:opacity-100  rounded-xl  ">
      <div className="flex h-[calc(100vh_-40px)] w-full gap-x-2">
        <div className="flex h-full flex-row gap-y-8 rounded-large  px-8 py-6  lg:flex">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-2"
          >
            <label>Prompt</label>
            <textarea {...register('prompt')} className="border-2" rows={5} />
            <p>{errors.prompt?.message}</p>

            <label>Negative Prompt</label>
            <textarea
              {...register('negative_prompt')}
              className="border-2"
              rows={5}
            />
            <p>{errors.negative_prompt?.message}</p>

            <label>Style</label>
            <select {...register('style')}>
              {styles.map(function (style) {
                return (
                  <option key={style} value={style}>
                    {style}
                  </option>
                )
              })}
            </select>

            {selectedImage ? (
              <div className="md:max-w-[200px]">
                <img src={URL.createObjectURL(selectedImage)} alt="Selected" />
              </div>
            ) : (
              <div className="inline-flex items-center justify-between">
                <div className="p-3 bg-slate-200  justify-center items-center flex">
                  No image selected
                </div>
              </div>
            )}

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

            <input type="submit" className="border-2 rounded-large" />
          </form>
        </div>
      </div>
      {loading && <p>Generating Image...</p>}
      <div className="h-full w-full flex items-center">
        {!loading && resultImage && (
          <div className=" md:max-w-[500px] h-full align-middle">
            <img src={`data:image/png;base64, ${resultImage}`} alt="Selected" />
          </div>
        )}
      </div>
    </div>
  )
}
// export default function PlayGroundArchitecture({ config, onCloseEvent }) {
//   const fileInputRef = useRef<any>()
//   const [step, setStep] = useState(0)
//   const [counter, setCounter] = useState(0)
//   const [isFirstTime, setIsFirstTime] = useState(true)
//   const [isLoading, setIsLoading] = useState(false)
//   const [isUploadingImage, setIsUploadingImage] = useState(false)
//   const [imageUploadedUrl, setImageUploadedUrl] = useState('')
//   const [outputImageUploadedUrl, setOutputImageUploadedUrl] = useState(
//     './services/architecture-ai-step-3.jpg',
//   )
//   const [isPlayingAround, setIsPlayingAround] = useState(true)
//   const uploadTrigger = () => {
//     fileInputRef?.current.click()
//   }
//   const [genType, setGenType] = React.useState<any>(new Set(['Chính xác']))
//
//   // upload clothes photo
//   const handleImageUpload = useCallback(async (event: any) => {
//     const file = event.target.files[0]
//
//     if (file) {
//       setIsUploadingImage(true)
//       setIsPlayingAround(true)
//       setIsLoading(true)
//       setStep(1)
//       const imageUrl = URL.createObjectURL(file)
//       const img = await ImageJS.Image.load(imageUrl)
//       imageKitService
//         .upload({
//           file: img.toDataURL(),
//           fileName: 'architecture.jpg',
//         })
//         .then((uploaded) => {
//           setImageUploadedUrl(uploaded.url + '?tr=w-768,h-1024') // using imagekit auto resize
//           setIsUploadingImage(false)
//
//           // temp
//           setTimeout(() => {
//             setCounter((v) => (v >= 100 ? 0 : v + 1))
//           }, 1000)
//         })
//     }
//   }, [])
//   return (
//     <div className="w-full px-4 hover:opacity-100  rounded-xl  text-white ">
//       <div className="flex h-[calc(100vh_-_40px)] w-full gap-x-2">
//         <div className="flex hidden bg-slate-800 text-white h-full w-[344px] flex-shrink-0 flex-col items-start gap-y-8 rounded-large  px-8 py-6 shadow-small lg:flex">
//           <button
//             onClick={() => onCloseEvent()}
//             className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-4 min-w-20 h-10 gap-2 rounded-full [&>svg]:max-w-[theme(spacing.8)] data-[pressed=true]:scale-[0.97] transition-transform-colors-opacity motion-reduce:transition-none data-[hover=true]:opacity-hover bg-default-50 text-small font-medium text-default-500 shadow-lg"
//             type="button"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               xmlnsXlink="http://www.w3.org/1999/xlink"
//               aria-hidden="true"
//               role="img"
//               className="iconify iconify--solar"
//               width={18}
//               height={18}
//               viewBox="0 0 24 24"
//             >
//               <path
//                 fill="currentColor"
//                 fillRule="evenodd"
//                 d="M10.53 5.47a.75.75 0 0 1 0 1.06l-4.72 4.72H20a.75.75 0 0 1 0 1.5H5.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0"
//                 clipRule="evenodd"
//               />
//             </svg>
//             Back
//           </button>
//           <div>
//             <div className="text-xl font-medium leading-7 ">
//               Sketch to Image
//             </div>
//           </div>
//           <div className="w-full text-white text-sm">
//             <RadioGroup label="Chọn đối tượng Gen ảnh:">
//               <CustomRadio value="Tự động">Tự động</CustomRadio>
//               <CustomRadio value="Ngoại thất">Ngoại thất</CustomRadio>
//               <CustomRadio value="Nội thất">Nội thất</CustomRadio>
//             </RadioGroup>
//           </div>
//
//           <div className="w-full  font-bold">
//             <Select
//               label="Chế độ Gen ảnh"
//               placeholder="Chọn một loại"
//               startContent={
//                 <div className="w-full flex text-sm">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth={1.5}
//                     stroke="currentColor"
//                     className="size-6 w-4 h-4 mx-2 my-1 text-slate-800"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
//                     />
//                   </svg>
//                   <span className="text-slate-800">{genType}</span>
//                 </div>
//               }
//               defaultSelectedKeys={genType}
//               className="max-w-xs "
//               isOpen={isFirstTime}
//               onOpenChange={setIsFirstTime}
//               onSelectionChange={setGenType}
//             >
//               <SelectItem
//                 className=""
//                 key={'Chính xác'}
//                 value={'architecture.precise'}
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth={1.5}
//                   stroke="currentColor"
//                   className="size-6"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
//                   />
//                 </svg>
//                 <span className="text-slate-800">Chính xác</span>
//               </SelectItem>
//
//               <SelectItem
//                 className=""
//                 key={'Tương đối'}
//                 value={'architecture.balanced'}
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth={1.5}
//                   stroke="currentColor"
//                   className="size-6"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
//                   />
//                 </svg>
//                 <span className="text-slate-800">Tương đối</span>
//               </SelectItem>
//
//               <SelectItem
//                 className=""
//                 key={'Sáng tạo'}
//                 value={'architecture.creative'}
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth={1.5}
//                   stroke="currentColor"
//                   className="size-6"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
//                   />
//                 </svg>
//                 <span className="text-slate-800">Sáng tạo</span>
//               </SelectItem>
//             </Select>
//           </div>
//         </div>
//
//         <div className="flex h-full w-full flex-col items-center gap-4 md:p-4 ">
//           {step === 0 ? (
//             <>
//               <h2 className="text-slate-800 text-base lg:text-[30px] font-bold mb-[60px] flex items-center gap-[10px]">
//                 <Image
//                   src="./logo-s.png"
//                   width={42}
//                   height={42}
//                   alt="Try On Step Image"
//                   className="w-[30px] h-[30px] lg:w-[42px] lg:h-[42px]"
//                 />
//                 Xin chào, đây là những bước để tạo ra thiết kế ấn tượng.
//               </h2>
//               <div className="try-on-steps justify-between items-center mb-[60px] hidden lg:flex">
//                 <div
//                   className="try-on-step flex flex-col items-center shrink-0"
//                   data-aos="fade-right"
//                   data-aos-easing="ease-in-out"
//                   data-aos-delay={200}
//                   data-aos-duraion={1000}
//                 >
//                   <Image
//                     src="./services/architecture-ai-step-1.jpg"
//                     width={418}
//                     height={334}
//                     alt="Try On Step Image"
//                   />
//                   <p className="step-description text-[18px] font-bold mt-[24px] text-center text-slate-800">
//                     Tải lên thiết kế (Sketch)
//                   </p>
//                 </div>
//
//                 <Image
//                   src={combineIcon}
//                   width={32}
//                   height={32}
//                   alt="Try On Step Image"
//                   className="relative left-[20px]  shrink-0"
//                   data-aos="fade-right"
//                   data-aos-easing="ease-in-out"
//                   data-aos-delay={500}
//                   data-aos-duraion={1000}
//                 />
//
//                 <div
//                   className="try-on-step flex flex-col items-center shrink-0"
//                   data-aos="fade-right"
//                   data-aos-easing="ease-in-out"
//                   data-aos-delay={800}
//                   data-aos-duraion={1000}
//                 >
//                   <nav aria-label="Progress" className="px-12 max-w-fit py-4">
//                     <ol className="flex flex-row flex-nowrap gap-x-3 [--step-color:hsl(var(--nextui-primary))] [--step-fg-color:hsl(var(--nextui-primary-foreground))] [--active-fg-color:var(--step-fg-color)] [--active-border-color:var(--step-color)] [--active-color:var(--step-color)] [--complete-background-color:var(--step-color)] [--complete-border-color:var(--step-color)] [--inactive-border-color:hsl(var(--nextui-default-300))] [--inactive-color:hsl(var(--nextui-default-300))] [--inactive-bar-color:hsl(var(--nextui-default-300))] max-w-md">
//                       <li className="relative flex w-full items-center pr-12">
//                         <button className="group flex w-full cursor-pointer flex-row items-center justify-center gap-x-3 rounded-large py-2.5">
//                           <div className="max-w-full flex-1 text-start">
//                             <div className="text-small font-medium text-default-foreground transition-[color,opacity] duration-300 group-active:opacity-80 lg:text-medium">
//                               Chọn bối cảnh
//                             </div>
//                           </div>
//                           <Image
//                             src={combineIcon}
//                             width={32}
//                             height={32}
//                             alt="Try On Step Image"
//                             className="relative left-[20px]  shrink-0"
//                             data-aos="fade-right"
//                             data-aos-easing="ease-in-out"
//                             data-aos-delay={500}
//                             data-aos-duraion={1000}
//                           />
//                         </button>
//                       </li>
//                       <li className="relative flex w-full items-center ">
//                         <button className="group flex w-full cursor-pointer flex-row items-center justify-center gap-x-3 rounded-large py-2.5">
//                           <div className="max-w-full flex-1 text-start">
//                             <div className="text-small font-medium text-default-foreground transition-[color,opacity] duration-300 group-active:opacity-80 lg:text-medium">
//                               Chọn style Gen
//                             </div>
//                           </div>
//                         </button>
//                       </li>
//                     </ol>
//                   </nav>
//                 </div>
//
//                 <Image
//                   src={resultIcon}
//                   width={39}
//                   height={29}
//                   alt="Try On Step Image"
//                   className="relative right-[40px] shrink-0"
//                   data-aos="fade-right"
//                   data-aos-easing="ease-in-out"
//                   data-aos-delay={1100}
//                   data-aos-duraion={1000}
//                 />
//
//                 <div
//                   className="try-on-step flex flex-col items-center shrink-0"
//                   data-aos="fade-right"
//                   data-aos-easing="ease-in-out"
//                   data-aos-delay={1400}
//                   data-aos-duraion={1000}
//                 >
//                   <Image
//                     src="./services/architecture-ai-step-3.jpg"
//                     width={418}
//                     height={334}
//                     alt="Try On Step Image"
//                   />
//                   <p className="step-description text-slate-800 text-[18px] font-bold mt-[24px] text-center">
//                     Nhận kết quả
//                   </p>
//                 </div>
//               </div>
//               <div className="try-on-steps-mobile text-slate-800 lg:hidden">
//                 <Swiper
//                   pagination={{
//                     dynamicBullets: true,
//                     bulletClass: 'normal-swiper-slide-grey',
//                     bulletActiveClass: 'active-swiper-slide-gradient',
//                   }}
//                   loop={true}
//                   modules={[Autoplay, Pagination]}
//                   autoplay={{
//                     delay: 3000,
//                     disableOnInteraction: false,
//                   }}
//                   spaceBetween={0}
//                   slidesPerView={1}
//                 >
//                   <SwiperSlide>
//                     <div className="try-on-step flex flex-col items-center shrink-0 mb-[50px]">
//                       <Image
//                         src="./services/architecture-ai-step-1.jpg"
//                         width={230}
//                         height={260}
//                         alt="Step Image"
//                       />
//                       <p className="step-description text-[18px] font-bold mt-[24px] text-center">
//                         Tải lên ảnh Sketch
//                       </p>
//                     </div>
//                   </SwiperSlide>
//
//                   <SwiperSlide>
//                     <div className="try-on-step flex flex-col items-center shrink-0 mb-[50px]">
//                       <div
//                         className="try-on-step flex flex-col items-center shrink-0"
//                         data-aos="fade-right"
//                         data-aos-easing="ease-in-out"
//                         data-aos-delay={800}
//                         data-aos-duraion={1000}
//                       >
//                         <nav
//                           aria-label="Progress"
//                           className="px-12 max-w-fit py-4"
//                         >
//                           <ol className="flex flex-row flex-nowrap gap-x-3 [--step-color:hsl(var(--nextui-primary))] [--step-fg-color:hsl(var(--nextui-primary-foreground))] [--active-fg-color:var(--step-fg-color)] [--active-border-color:var(--step-color)] [--active-color:var(--step-color)] [--complete-background-color:var(--step-color)] [--complete-border-color:var(--step-color)] [--inactive-border-color:hsl(var(--nextui-default-300))] [--inactive-color:hsl(var(--nextui-default-300))] [--inactive-bar-color:hsl(var(--nextui-default-300))] max-w-md">
//                             <li className="relative flex w-full items-center pr-12">
//                               <button className="group flex w-full cursor-pointer flex-row items-center justify-center gap-x-3 rounded-large py-2.5">
//                                 <div className="max-w-full flex-1 text-start">
//                                   <div className="text-small font-medium text-default-foreground transition-[color,opacity] duration-300 group-active:opacity-80 lg:text-medium">
//                                     Chọn bối cảnh
//                                   </div>
//                                 </div>
//                                 <div
//                                   aria-hidden="true"
//                                   className="pointer-events-none absolute right-0 w-10 flex-none items-center"
//                                 >
//                                   <div className="relative h-0.5 w-full bg-[var(--inactive-bar-color)] transition-colors duration-300 after:absolute after:block after:h-full after:bg-[var(--active-border-color)] after:transition-[width] after:duration-300 after:content-[''] after:w-full" />
//                                 </div>
//                               </button>
//                             </li>
//                             <li className="relative flex w-full items-center pr-12">
//                               <button className="group flex w-full cursor-pointer flex-row items-center justify-center gap-x-3 rounded-large py-2.5">
//                                 <div className="max-w-full flex-1 text-start">
//                                   <div className="text-small font-medium text-default-foreground transition-[color,opacity] duration-300 group-active:opacity-80 lg:text-medium">
//                                     Chọn style Gen
//                                   </div>
//                                 </div>
//                               </button>
//                             </li>
//                           </ol>
//                         </nav>
//                       </div>
//                     </div>
//                   </SwiperSlide>
//
//                   <SwiperSlide>
//                     <div className="try-on-step flex flex-col items-center shrink-0 mb-[50px]">
//                       <Image
//                         src="./services/architecture-ai-step-3.jpg"
//                         width={230}
//                         height={260}
//                         alt="Try On Step Image"
//                       />
//                       <p className="step-description text-[18px] font-bold mt-[24px] text-center">
//                         Nhận kết quả
//                       </p>
//                     </div>
//                   </SwiperSlide>
//                 </Swiper>
//               </div>
//             </>
//           ) : null}
//
//           {step === 1 ? (
//             <>
//               <h2 className="text-slate-800 text-base lg:text-[30px] font-bold mb-[20px] lg:mb-[30px] flex items-center mt-12">
//                 Đang tải ảnh lên
//               </h2>
//               <div className="w-full flex">
//                 <div className="w-1/2 flex">
//                   <Card
//                     className="w-full h-[70vh] space-y-12 mx-12 p-8 "
//                     radius="lg"
//                   >
//                     <Skeleton isLoaded={isLoading} className="rounded-lg">
//                       {!isUploadingImage && (
//                         <div className="h-auto w-full flex justify-center rounded-lg bg-slate-800/20 pb-10">
//                           <Image2
//                             width={520}
//                             height={580}
//                             src={imageUploadedUrl}
//                             alt="user uploaded cover"
//                             className=" w-full p-5 justify-center mx-auto "
//                             fallbackSrc="https://via.placeholder.com/300x500"
//                           />
//                         </div>
//                       )}
//
//                       {isUploadingImage && (
//                         <div className="h-[154px] w-full rounded-lg bg-slate-800/20"></div>
//                       )}
//                     </Skeleton>
//                     {isUploadingImage && (
//                       <div className="space-y-3 ">
//                         <span className="my-1">Đang phân tích bối cảnh</span>
//                         <Skeleton
//                           isLoaded={isLoading}
//                           className="w-3/5 rounded-lg"
//                         >
//                           <div className="h-3 w-full rounded-lg bg-secondary"></div>
//                         </Skeleton>
//                         <Skeleton
//                           isLoaded={isLoading}
//                           className="w-4/5 rounded-lg"
//                         >
//                           <div className="h-3 w-full rounded-lg bg-secondary-300"></div>
//                         </Skeleton>
//                         <Skeleton
//                           isLoaded={isLoading}
//                           className="w-2/5 rounded-lg"
//                         >
//                           <div className="h-3 w-full rounded-lg bg-secondary-200"></div>
//                         </Skeleton>
//                       </div>
//                     )}
//                   </Card>{' '}
//                 </div>
//                 <div className="w-1/2 flex">
//                   <Card
//                     className="w-full h-[70vh] space-y-12 mx-12 p-8 "
//                     radius="lg"
//                   >
//                     <Skeleton isLoaded={isLoading} className="rounded-lg">
//                       {isLoading && (
//                         <div className="h-auto w-full flex justify-center rounded-lg bg-slate-800/20">
//                           <Image2
//                             width={520}
//                             height={580}
//                             isZoomed
//                             src={outputImageUploadedUrl}
//                             alt="user uploaded cover"
//                             className=" w-full h-auto p-5 justify-center mx-auto"
//                             fallbackSrc="https://via.placeholder.com/300x500"
//                           />
//                         </div>
//                       )}
//
//                       {isLoading && (
//                         <Progress
//                           aria-label={counter + 'seconds left'}
//                           size="md"
//                           value={counter}
//                           color="secondary"
//                           showValueLabel={true}
//                           className=" my-2 w-full"
//                         />
//                       )}
//                     </Skeleton>
//
//                     <div className="space-y-3 ">
//                       <div className="flex gap-4 items-center">
//                         <Button
//                           className="bg-slate-800 text-white"
//                           endContent={
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               fill="none"
//                               viewBox="0 0 24 24"
//                               strokeWidth={1.5}
//                               stroke="currentColor"
//                               className="size-6"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
//                               />
//                             </svg>
//                           }
//                         >
//                           Tải xuống định dạng ảnh
//                         </Button>
//                         <Button
//                           onPress={() => {
//                             setStep(1)
//                           }}
//                           startContent={
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               fill="none"
//                               viewBox="0 0 24 24"
//                               strokeWidth={1.5}
//                               stroke="currentColor"
//                               className="size-6 text-white"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
//                               />
//                             </svg>
//                           }
//                           className="bg-gradient-to-r font-bold from-purple-gd to-blue-gd rounded-full h-[38px] w-full hover:shadow-purple-300 hover:shadow-[0_0_20px_5px_rgba(0,0,0,0.1)] duration-300 lg:w-auto"
//                         >
//                           <span className="text-white">Retry</span>
//                         </Button>
//                       </div>
//                     </div>
//                   </Card>
//                 </div>
//               </div>
//             </>
//           ) : null}
//
//           {/* Footer */}
//
//           {step === 0 ? (
//             <>
//               <div className="w-full lg:w-auto h-[40px] box-border rounded-full hover:bg-white  to-blue-gd p-[1px]">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={handleImageUpload}
//                   ref={fileInputRef}
//                 />
//                 <Button
//                   onClick={uploadTrigger}
//                   className="w-full lg:w-auto text-white font-medium rounded-full py-1 bg-gradient-to-r from-purple-gd to-blue-gd px-[50px] hover:shadow-purple-300 hover:shadow-[0_0_20px_5px_rgba(0,0,0,0.1)] duration-300"
//                 >
//                   Tải ảnh Sketch lên
//                 </Button>
//               </div>
//             </>
//           ) : null}
//         </div>
//       </div>
//     </div>
//   )
// }
//
// export const CustomRadio = (props) => {
//   const {
//     Component,
//     children,
//     isSelected,
//     description,
//     getBaseProps,
//     getWrapperProps,
//     getInputProps,
//     getLabelProps,
//     getLabelWrapperProps,
//     getControlProps,
//   } = useRadio(props)
//
//   return (
//     <Component
//       {...getBaseProps()}
//       className={cn(
//         'group inline-flex items-center hover:opacity-70 active:opacity-50 justify-between flex-row-reverse tap-highlight-transparent',
//         'max-w-[300px] cursor-pointer border-1 border-slate-100 rounded-lg gap-4 p-4',
//         'data-[selected=true]:border-green-400 data-[selected=true]:border-2 text-white',
//       )}
//     >
//       <VisuallyHidden>
//         <input {...getInputProps()} />
//       </VisuallyHidden>
//       <span {...getWrapperProps()}>
//         <span {...getControlProps()} />
//       </span>
//       <div {...getLabelWrapperProps()}>
//         {children && <span className="text-white">{children}</span>}
//         {description && (
//           <span className="text-small  opacity-70">{description}</span>
//         )}
//       </div>
//     </Component>
//   )
// }
