import { ImgComparisonSlider } from '@img-comparison-slider/react'
import {
  Button,
  Card,
  cn,
  Dropdown,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Progress,
  RadioGroup,
  Select,
  SelectItem,
  Skeleton,
  Spinner,
  Tab,
  Tabs,
  Textarea,
  useDisclosure,
  useRadio,
  VisuallyHidden,
} from '@nextui-org/react'
import { Image as Image2 } from '@nextui-org/react'
import axios from 'axios'
import clsx from 'clsx'
import * as ImageJS from 'image-js'
import Image from 'next/image'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { SlCloudDownload } from 'react-icons/sl'
import Slider from 'react-slick'

import combineIcon from './components/background-images/combineIcon.svg'
import resultIcon from './components/background-images/resultIcon.svg'
import upload from './components/background-images/upload.svg'
import { imageKitService } from './components/ImageKitService'

export const Palette = {
  BASE: '#FD6220',
}
const serviceUrl = 'https://nhathao.top'

const TYPES_OF_GENERATE = [
  {
    keyword: 'interior',
    image: '',
    label: 'Nội thất',
  },
  {
    keyword: 'exterior',
    image: '',
    label: 'Ngoại thất',
  },
]
export default function PlayGroundArchitecture2({ config, onCloseEvent }) {
  const [typeOfGenerate, setTypeOfGenerate] = useState('')
  const [referenceImage, setReferenceImage] = useState<string | null>(null) // image when uploaded is converted to base64 string
  const [resultImages, setResultImages] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [currentImageIdx, setCurrentImageIdx] = useState(0)
  const [numberOfResultImages, setNumberOfResultImages] = useState(1)

  return (
    <div className="w-full px-0 lg:px-4 hover:opacity-100  rounded-xl  text-white ">
      <div className="block lg:flex h-[calc(100vh_-_40px)] w-full gap-x-2">
        <div className="flex  bg-slate-800 text-white h-full w-full lg:w-[344px] flex-shrink-0 flex-col items-start gap-y-8 rounded-large  px-8 py-6 shadow-small lg:flex">
          <button
            onClick={() => onCloseEvent()}
            className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-4 min-w-20 h-10 gap-2 rounded-full [&>svg]:max-w-[theme(spacing.8)] data-[pressed=true]:scale-[0.97] transition-transform-colors-opacity motion-reduce:transition-none data-[hover=true]:opacity-hover bg-default-50 text-small font-medium text-default-500 shadow-lg"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              role="img"
              className="iconify iconify--solar"
              width={18}
              height={18}
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M10.53 5.47a.75.75 0 0 1 0 1.06l-4.72 4.72H20a.75.75 0 0 1 0 1.5H5.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0"
                clipRule="evenodd"
              />
            </svg>
            Back
          </button>
          <div>
            <div className="text-xl font-medium leading-7 ">Tạo thiết kế</div>
          </div>
          <div className="w-full text-white text-sm">
            <Tabs
              key={'success'}
              color="secondary"
              className="w-full "
              aria-label="Render types"
              radius="full"
            >
              <Tab key="basic" title="Cơ bản" className="px-8 py-1">
                <CommonPart
                  typeOfGenerate={typeOfGenerate}
                  referenceImage={referenceImage}
                  setTypeOfGenerate={setTypeOfGenerate}
                  setReferenceImage={setReferenceImage}
                />
                <ChooseNumberOfReturnImages
                  numberOfResultImages={numberOfResultImages}
                  setNumberOfResultImages={setNumberOfResultImages}
                />
                <SimpleGenerate
                  typeOfGenerate={typeOfGenerate}
                  referenceImage={referenceImage}
                  setLoading={setLoading}
                  setResultImages={setResultImages}
                  numberOfResultImages={numberOfResultImages}
                  loading={loading}
                />
              </Tab>
              <Tab key="advanced" title="Nâng cao" className="px-8 py-1">
                <CommonPart
                  typeOfGenerate={typeOfGenerate}
                  referenceImage={referenceImage}
                  setTypeOfGenerate={setTypeOfGenerate}
                  setReferenceImage={setReferenceImage}
                />
                <ChooseNumberOfReturnImages
                  numberOfResultImages={numberOfResultImages}
                  setNumberOfResultImages={setNumberOfResultImages}
                />
                <AdvanceGenerate
                  typeOfGenerate={typeOfGenerate}
                  referenceImage={referenceImage}
                  setLoading={setLoading}
                  setResultImages={setResultImages}
                  numberOfResultImages={numberOfResultImages}
                  loading={loading}
                />
              </Tab>
            </Tabs>
          </div>

          {/**/}
          {/* <div className="w-full text-white text-sm"> */}
          {/*   <RadioGroup */}
          {/*     orientation="horizontal" */}
          {/*     className="w-auto h-auto" */}
          {/*     label="Chọn đối tượng Gen ảnh:" */}
          {/*   > */}
          {/*     <CustomRadio value="Nội thất"> */}
          {/*       <div className="relative"> */}
          {/*         <Image */}
          {/*           src="./services/architecture-ai-step-3.jpg" */}
          {/*           className="rounded" */}
          {/*           width={96} */}
          {/*           height={60} */}
          {/*           alt="Try On Step Image" */}
          {/*         /> */}
          {/*         <span className="p-1 absolute bottom-0 left-0 text-gray-100"> */}
          {/*           {' '} */}
          {/*           Nội thất */}
          {/*         </span> */}
          {/*       </div> */}
          {/*     </CustomRadio> */}
          {/*     <CustomRadio value="Ngoại thất"> */}
          {/*       <div className="relative"> */}
          {/*         <Image */}
          {/*           src="./services/architecture-ai-step-3.jpg" */}
          {/*           className="rounded" */}
          {/*           width={96} */}
          {/*           height={60} */}
          {/*           alt="Try On Step Image" */}
          {/*         /> */}
          {/*         <span className="p-1 absolute bottom-0 left-0 text-gray-100"> */}
          {/*           {' '} */}
          {/*           Ngoại thất */}
          {/*         </span> */}
          {/*       </div> */}
          {/*     </CustomRadio> */}
          {/*   </RadioGroup> */}
          {/* </div> */}
          {/**/}
          {/* <div className="w-full text-white text-sm"> */}
          {/*   <div className="rounded-lg bg-slate-500/50 w-full rounded-[10px] p-[2px]"> */}
          {/*     <div className=""> */}
          {/*       <div className="w-full h-full bg-slate-800/60 rounded-[8px] p-[15px] lg:p-[36px] hover:bg-gradient-to-r hover:from-purple-500/[.05] hover:to-blue-500/[.05] duration-300"> */}
          {/*         <div className="options flex justify-center mb-[15px]"> */}
          {/*           <div className="hover:scale-125 duration-300"> */}
          {/*             <div className="cursor-pointer"> */}
          {/*               {isLoading ? ( */}
          {/*                 <Spinner color="secondary" /> */}
          {/*               ) : ( */}
          {/*                 <> */}
          {/*                   <Image */}
          {/*                     onClick={uploadTrigger} */}
          {/*                     src={upload} */}
          {/*                     width={49} */}
          {/*                     height={47} */}
          {/*                     alt="upload image" */}
          {/*                     className="w-[36px] h-[36px] lg:w-[49px] lg:h-[47px]" */}
          {/*                   /> */}
          {/*                 </> */}
          {/*               )} */}
          {/*               <input */}
          {/*                 type="file" */}
          {/*                 accept="image/*" */}
          {/*                 className="hidden" */}
          {/*                 //onChange={onSubmit} */}
          {/*                 onBlur={() => setIsLoading(false)} */}
          {/*                 ref={fileInputRef} */}
          {/*               /> */}
          {/*             </div> */}
          {/*           </div> */}
          {/*           <div className=""></div> */}
          {/*         </div> */}
          {/*         <p className="text-[12px] lg:text-base text-center font-medium bg-white bg-clip-text text-transparent"> */}
          {/*           Tải lên ảnh thiết kế */}
          {/*         </p> */}
          {/*       </div> */}
          {/*     </div> */}
          {/*   </div> */}
          {/* </div> */}
          {/**/}
          {/* <div className="w-full rounded "> */}
          {/*   <Select */}
          {/*     label="Chế độ Gen ảnh" */}
          {/*     placeholder="Chọn một loại" */}
          {/*     startContent={ */}
          {/*       <div className="w-full flex text-sm"> */}
          {/*         <svg */}
          {/*           xmlns="http://www.w3.org/2000/svg" */}
          {/*           fill="none" */}
          {/*           viewBox="0 0 24 24" */}
          {/*           strokeWidth={1.5} */}
          {/*           stroke="currentColor" */}
          {/*           className="size-6 w-4 h-4 mx-2 my-1 text-slate-800" */}
          {/*         > */}
          {/*           <path */}
          {/*             strokeLinecap="round" */}
          {/*             strokeLinejoin="round" */}
          {/*             d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" */}
          {/*           /> */}
          {/*         </svg> */}
          {/*         <span className="text-slate-800">{genType}</span> */}
          {/*       </div> */}
          {/*     } */}
          {/*     color="primary" */}
          {/*     defaultSelectedKeys={genType} */}
          {/*     className="max-w-xs bg-transparent " */}
          {/*     isOpen={isFirstTime} */}
          {/*     onOpenChange={setIsFirstTime} */}
          {/*     onSelectionChange={setGenType} */}
          {/*   > */}
          {/*     <SelectItem */}
          {/*       className="bg-slate-100 bg-transparent" */}
          {/*       key={'Chính xác'} */}
          {/*       value={'architecture.precise'} */}
          {/*     > */}
          {/*       <svg */}
          {/*         xmlns="http://www.w3.org/2000/svg" */}
          {/*         fill="none" */}
          {/*         viewBox="0 0 24 24" */}
          {/*         strokeWidth={1.5} */}
          {/*         stroke="currentColor" */}
          {/*         className="size-6" */}
          {/*       > */}
          {/*         <path */}
          {/*           strokeLinecap="round" */}
          {/*           strokeLinejoin="round" */}
          {/*           d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" */}
          {/*         /> */}
          {/*       </svg> */}
          {/*       <span className="text-slate-800 text-sm">Chính xác</span> */}
          {/*     </SelectItem> */}
          {/**/}
          {/*     <SelectItem */}
          {/*       className="bg-white" */}
          {/*       key={'Tương đối'} */}
          {/*       value={'architecture.balanced'} */}
          {/*     > */}
          {/*       <svg */}
          {/*         xmlns="http://www.w3.org/2000/svg" */}
          {/*         fill="none" */}
          {/*         viewBox="0 0 24 24" */}
          {/*         strokeWidth={1.5} */}
          {/*         stroke="currentColor" */}
          {/*         className="size-6" */}
          {/*       > */}
          {/*         <path */}
          {/*           strokeLinecap="round" */}
          {/*           strokeLinejoin="round" */}
          {/*           d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" */}
          {/*         /> */}
          {/*       </svg> */}
          {/*       <span className="text-slate-800">Tương đối</span> */}
          {/*     </SelectItem> */}
          {/**/}
          {/*     <SelectItem */}
          {/*       className="bg-white" */}
          {/*       key={'Sáng tạo'} */}
          {/*       value={'architecture.creative'} */}
          {/*     > */}
          {/*       <svg */}
          {/*         xmlns="http://www.w3.org/2000/svg" */}
          {/*         fill="none" */}
          {/*         viewBox="0 0 24 24" */}
          {/*         strokeWidth={1.5} */}
          {/*         stroke="currentColor" */}
          {/*         className="size-6" */}
          {/*       > */}
          {/*         <path */}
          {/*           strokeLinecap="round" */}
          {/*           strokeLinejoin="round" */}
          {/*           d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" */}
          {/*         /> */}
          {/*       </svg> */}
          {/*       <span className="text-slate-800">Sáng tạo</span> */}
          {/*     </SelectItem> */}
          {/*   </Select> */}
          {/* </div> */}

          {/* <div className="w-full absolute bottom-5 left-11 text-white text-sm"> */}
          {/*   <Input */}
          {/*     isRequired */}
          {/*     type="text" */}
          {/*     color={'danger'} */}
          {/*     label="ServiceURL" */}
          {/*     value={serviceUrl} */}
          {/*     onValueChange={setServiceUrl} */}
          {/*     className="max-w-xs bg-slate-800" */}
          {/*   /> */}
          {/* </div> */}
          {/* </div> */}
          {/**/}
          {/* <div className="flex h-auto w-full flex-col items-center gap-4 md:p-4 "> */}
          {/* <div className="flex h-auto w-full flex-col items-center gap-4 md:p-4 "> */}
          {/*   {step === 0 ? ( */}
          {/*     <div className="p-24 text-lg"> */}
          {/*       <h2 className="text-slate-800 text-xl font-bold mb-[60px] hidden lg:flex items-center gap-[10px]"> */}
          {/*         <Image */}
          {/*           src="./logo-s.png" */}
          {/*           width={42} */}
          {/*           height={42} */}
          {/*           alt="Try On Step Image" */}
          {/*           className="w-[30px] h-[30px] lg:w-[42px] lg:h-[42px]" */}
          {/*         /> */}
          {/*         Xin chào, đây là những bước để tạo ra thiết kế ấn tượng. */}
          {/*       </h2> */}
          {/*       <div className="try-on-steps justify-between items-center mb-[60px] hidden lg:flex"> */}
          {/*         <div */}
          {/*           className="try-on-step flex flex-col items-center shrink-0 " */}
          {/*           data-aos="fade-right" */}
          {/*           data-aos-easing="ease-in-out" */}
          {/*           data-aos-delay={200} */}
          {/*           data-aos-duraion={1000} */}
          {/*         > */}
          {/*           <Image */}
          {/*             className="rounded-2xl b-solid b-1 border-slate-100 " */}
          {/*             src="./services/architecture-ai-step-1.jpg" */}
          {/*             width={320} */}
          {/*             height={334} */}
          {/*             alt="Try On Step Image" */}
          {/*           /> */}
          {/*           <p className="step-description text-[18px]  font-bold mt-[24px] text-center text-slate-800"> */}
          {/*             Tải lên thiết kế (Sketch) */}
          {/*           </p> */}
          {/*         </div> */}
          {/**/}
          {/*         <Image */}
          {/*           src={combineIcon} */}
          {/*           width={32} */}
          {/*           height={32} */}
          {/*           alt="Try On Step Image" */}
          {/*           className="relative left-[20px]  shrink-0" */}
          {/*           data-aos="fade-right" */}
          {/*           data-aos-easing="ease-in-out" */}
          {/*           data-aos-delay={500} */}
          {/*           data-aos-duraion={1000} */}
          {/*         /> */}
          {/**/}
          {/*         <div */}
          {/*           className="try-on-step flex flex-col items-center shrink-0" */}
          {/*           data-aos="fade-right" */}
          {/*           data-aos-easing="ease-in-out" */}
          {/*           data-aos-delay={800} */}
          {/*           data-aos-duraion={1000} */}
          {/*         > */}
          {/*           <nav aria-label="Progress" className="px-12 max-w-fit py-4"> */}
          {/*             <ol className="flex flex-row flex-nowrap gap-x-3 [--step-color:hsl(var(--nextui-primary))] [--step-fg-color:hsl(var(--nextui-primary-foreground))] [--active-fg-color:var(--step-fg-color)] [--active-border-color:var(--step-color)] [--active-color:var(--step-color)] [--complete-background-color:var(--step-color)] [--complete-border-color:var(--step-color)] [--inactive-border-color:hsl(var(--nextui-default-300))] [--inactive-color:hsl(var(--nextui-default-300))] [--inactive-bar-color:hsl(var(--nextui-default-300))] max-w-md"> */}
          {/*               <li className="relative flex w-full items-center pr-12"> */}
          {/*                 <button className="group flex w-full cursor-pointer flex-row items-center justify-center gap-x-3 rounded-large py-2.5"> */}
          {/*                   <div className="max-w-full flex-1 text-start"> */}
          {/*                     <div className="text-small font-medium text-default-foreground transition-[color,opacity] duration-300 group-active:opacity-80 lg:text-medium"> */}
          {/*                       Chọn bối cảnh */}
          {/*                     </div> */}
          {/*                   </div> */}
          {/*                   <Image */}
          {/*                     src={combineIcon} */}
          {/*                     width={32} */}
          {/*                     height={32} */}
          {/*                     alt="Try On Step Image" */}
          {/*                     className="relative left-[20px]  shrink-0" */}
          {/*                     data-aos="fade-right" */}
          {/*                     data-aos-easing="ease-in-out" */}
          {/*                     data-aos-delay={500} */}
          {/*                     data-aos-duraion={1000} */}
          {/*                   /> */}
          {/*                 </button> */}
          {/*               </li> */}
          {/*               <li className="relative flex w-full items-center "> */}
          {/*                 <button className="group flex w-full cursor-pointer flex-row items-center justify-center gap-x-3 rounded-large py-2.5"> */}
          {/*                   <div className="max-w-full flex-1 text-start"> */}
          {/*                     <div className="text-small font-medium text-default-foreground transition-[color,opacity] duration-300 group-active:opacity-80 lg:text-medium"> */}
          {/*                       Chọn style Gen */}
          {/*                     </div> */}
          {/*                   </div> */}
          {/*                 </button> */}
          {/*               </li> */}
          {/*             </ol> */}
          {/*           </nav> */}
          {/*         </div> */}
          {/**/}
          {/*         <Image */}
          {/*           src={resultIcon} */}
          {/*           width={39} */}
          {/*           height={29} */}
          {/*           alt="Try On Step Image" */}
          {/*           className="relative right-[40px] shrink-0" */}
          {/*           data-aos="fade-right" */}
          {/*           data-aos-easing="ease-in-out" */}
          {/*           data-aos-delay={1100} */}
          {/*           data-aos-duraion={1000} */}
          {/*         /> */}
          {/**/}
          {/*         <div */}
          {/*           className="try-on-step flex flex-col items-center shrink-0" */}
          {/*           data-aos="fade-right" */}
          {/*           data-aos-easing="ease-in-out" */}
          {/*           data-aos-delay={1400} */}
          {/*           data-aos-duraion={1000} */}
          {/*         > */}
          {/*           <Image */}
          {/*             className="rounded-2xl b-solid b-1 border-slate-100 " */}
          {/*             src="./services/architecture-ai-step-3.jpg" */}
          {/*             width={320} */}
          {/*             height={334} */}
          {/*             alt="Try On Step Image" */}
          {/*           /> */}
          {/*           <p className="step-description text-slate-800 text-[18px] font-bold mt-[24px] text-center"> */}
          {/*             Nhận kết quả */}
          {/*           </p> */}
          {/*         </div> */}
          {/*       </div> */}
          {/*     </div> */}
          {/*   ) : null} */}
          {/**/}
          {/*   {step === 1 ? ( */}
          {/*     <> */}
          {/*       <h2 className="text-slate-800 text-base lg:text-[30px] font-bold mb-[20px] lg:mb-[30px] flex items-center mt-12"> */}
          {/*         Đang tải ảnh lên */}
          {/*       </h2> */}
          {/*       <div className="w-full flex"> */}
          {/*         <div className="w-1/2 flex"> */}
          {/*           <Card */}
          {/*             className="w-full h-[70vh] space-y-12 mx-12 p-8 " */}
          {/*             radius="lg" */}
          {/*           > */}
          {/*             <Skeleton isLoaded={true} className="rounded-lg"> */}
          {/*               {!isUploadingImage && ( */}
          {/*                 <div className="h-auto w-full flex justify-center rounded-lg bg-slate-800/20 pb-10"> */}
          {/*                   <Image2 */}
          {/*                     width={520} */}
          {/*                     height={580} */}
          {/*                     src={imageUploadedUrl} */}
          {/*                     alt="user uploaded cover" */}
          {/*                     className=" w-full p-5 justify-center mx-auto " */}
          {/*                     fallbackSrc="https://via.placeholder.com/300x500" */}
          {/*                   /> */}
          {/*                 </div> */}
          {/*               )} */}
          {/**/}
          {/*               {isUploadingImage && ( */}
          {/*                 <div className="h-[154px] w-full rounded-lg bg-slate-800/20"></div> */}
          {/*               )} */}
          {/*             </Skeleton> */}
          {/*             {isUploadingImage && ( */}
          {/*               <div className="space-y-3 "> */}
          {/*                 <span className="my-1">Đang phân tích bối cảnh</span> */}
          {/*                 <Skeleton */}
          {/*                   isLoaded={isLoading} */}
          {/*                   className="w-3/5 rounded-lg" */}
          {/*                 > */}
          {/*                   <div className="h-3 w-full rounded-lg bg-secondary"></div> */}
          {/*                 </Skeleton> */}
          {/*                 <Skeleton */}
          {/*                   isLoaded={isLoading} */}
          {/*                   className="w-4/5 rounded-lg" */}
          {/*                 > */}
          {/*                   <div className="h-3 w-full rounded-lg bg-secondary-300"></div> */}
          {/*                 </Skeleton> */}
          {/*                 <Skeleton */}
          {/*                   isLoaded={isLoading} */}
          {/*                   className="w-2/5 rounded-lg" */}
          {/*                 > */}
          {/*                   <div className="h-3 w-full rounded-lg bg-secondary-200"></div> */}
          {/*                 </Skeleton> */}
          {/*               </div> */}
          {/*             )} */}
          {/*           </Card>{' '} */}
          {/*         </div> */}
          {/*         <div className="w-1/2 flex"> */}
          {/*           <Card */}
          {/*             className="w-full h-[70vh] space-y-12 mx-12 p-8 " */}
          {/*             radius="lg" */}
          {/*           > */}
          {/*             <Skeleton isLoaded={hasOutput} className="rounded-lg"> */}
          {/*               {hasOutput && ( */}
          {/*                 <div className="h-auto w-full flex justify-center rounded-lg bg-slate-800/20"> */}
          {/*                   <Image2 */}
          {/*                     width={520} */}
          {/*                     height={580} */}
          {/*                     isZoomed */}
          {/*                     src={`data:image/png;base64, ${imageResponseddUrl}`} */}
          {/*                     // src={imageResponseddUrl} */}
          {/*                     alt="user uploaded cover" */}
          {/*                     className=" w-full h-auto p-5 justify-center mx-auto" */}
          {/*                     fallbackSrc="https://via.placeholder.com/300x500" */}
          {/*                   /> */}
          {/*                 </div> */}
          {/*               )} */}
          {/**/}
          {/*               {isLoading && ( */}
          {/*                 <Progress */}
          {/*                   aria-label={counter + 'seconds left'} */}
          {/*                   size="md" */}
          {/*                   value={counter} */}
          {/*                   color="secondary" */}
          {/*                   showValueLabel={true} */}
          {/*                   className=" my-2 w-full" */}
          {/*                 /> */}
          {/*               )} */}
          {/*             </Skeleton> */}
          {/**/}
          {/*             <div className="space-y-3 "> */}
          {/*               <div className="flex gap-4 items-center"> */}
          {/*                 <Button */}
          {/*                   className="bg-slate-800 text-white" */}
          {/*                   endContent={ */}
          {/*                     <svg */}
          {/*                       xmlns="http://www.w3.org/2000/svg" */}
          {/*                       fill="none" */}
          {/*                       viewBox="0 0 24 24" */}
          {/*                       strokeWidth={1.5} */}
          {/*                       stroke="currentColor" */}
          {/*                       className="size-6" */}
          {/*                     > */}
          {/*                       <path */}
          {/*                         strokeLinecap="round" */}
          {/*                         strokeLinejoin="round" */}
          {/*                         d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" */}
          {/*                       /> */}
          {/*                     </svg> */}
          {/*                   } */}
          {/*                 > */}
          {/*                   Tải xuống định dạng ảnh */}
          {/*                 </Button> */}
          {/*                 <Button */}
          {/*                   onPress={() => { */}
          {/*                     setStep(1) */}
          {/*                   }} */}
          {/*                   startContent={ */}
          {/*                     <svg */}
          {/*                       xmlns="http://www.w3.org/2000/svg" */}
          {/*                       fill="none" */}
          {/*                       viewBox="0 0 24 24" */}
          {/*                       strokeWidth={1.5} */}
          {/*                       stroke="currentColor" */}
          {/*                       className="size-6 text-white" */}
          {/*                     > */}
          {/*                       <path */}
          {/*                         strokeLinecap="round" */}
          {/*                         strokeLinejoin="round" */}
          {/*                         d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" */}
          {/*                       /> */}
          {/*                     </svg> */}
          {/*                   } */}
          {/*                   className="bg-gradient-to-r font-bold from-purple-gd to-blue-gd rounded-full h-[38px] w-full hover:shadow-purple-300 hover:shadow-[0_0_20px_5px_rgba(0,0,0,0.1)] duration-300 lg:w-auto" */}
          {/*                 > */}
          {/*                   <span className="text-white">Retry</span> */}
          {/*                 </Button> */}
          {/*               </div> */}
          {/*             </div> */}
          {/*           </Card> */}
          {/*         </div> */}
          {/*       </div> */}
          {/*     </> */}
          {/* ) : null} */}

          {/* Footer */}

          {/* {step === 0 ? ( */}
          {/*   <> */}
          {/*     <div className="w-full lg:w-auto h-[40px] box-border rounded-full hover:bg-white hidden lg:block to-blue-gd p-[1px]"> */}
          {/*       <input */}
          {/*         type="file" */}
          {/*         accept="image/*" */}
          {/*         className="hidden" */}
          {/*         onChange={onSubmit} */}
          {/*         ref={fileInputRef} */}
          {/*       /> */}
          {/*       <Button */}
          {/*         onClick={uploadTrigger} */}
          {/*         className="w-full lg:w-auto text-white font-medium rounded-full py-1 bg-gradient-to-r from-purple-gd to-blue-gd px-[50px] hover:shadow-purple-300 hover:shadow-[0_0_20px_5px_rgba(0,0,0,0.1)] duration-300" */}
          {/*       > */}
          {/*         Tải ảnh Sketch lên */}
          {/*       </Button> */}
          {/*     </div> */}
          {/*   </> */}
          {/* ) : null} */}
        </div>
        {/* <div className=""> */}
        <ResultImages
          loading={loading}
          images={resultImages}
          original={referenceImage}
          currentImageIdx={currentImageIdx}
          setCurrentImageIdx={setCurrentImageIdx}
        />
        {/* </div> */}
      </div>
    </div>
  )
}

export const CustomRadio = (props) => {
  const {
    Component,
    children,
    isSelected,
    description,
    getBaseProps,
    getWrapperProps,
    getInputProps,
    getLabelProps,
    getLabelWrapperProps,
    getControlProps,
  } = useRadio(props)

  return (
    <Component
      {...getBaseProps()}
      className={cn(
        'group inline-flex items-center hover:opacity-70 active:opacity-50 justify-between flex-row-reverse tap-highlight-transparent',
        'max-w-[300px] cursor-pointer border-1 border-slate-100 rounded-lg  p-1 ml-0',
        'data-[selected=true]:border-purple-400 data-[selected=true]:border-2 text-white',
      )}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      {/* <span {...getWrapperProps()}>
        <span {...getControlProps()} />
      </span> */}
      <div {...getLabelWrapperProps()} className="ml-0">
        {children && <span className="text-white">{children}</span>}
        {description && (
          <span className="text-small  opacity-70">{description}</span>
        )}
      </div>
    </Component>
  )
}

function CommonPart({
  typeOfGenerate,
  referenceImage,
  setTypeOfGenerate,
  setReferenceImage,
}: {
  typeOfGenerate: string
  referenceImage: string | null
  setTypeOfGenerate: Function
  setReferenceImage: Function
}) {
  return (
    <div className="flex flex-col">
      <div className="flex">
        {TYPES_OF_GENERATE.map((architect, index) => (
          <Button
            key={index}
            onClick={function() {
              setTypeOfGenerate(architect.keyword)
            }}
            color={typeOfGenerate === architect.keyword ? 'success' : 'default'}
          >
            {architect.label}
          </Button>
        ))}
      </div>

      <ImageUpload
        referenceImage={referenceImage}
        setReferenceImage={setReferenceImage}
      />

      {referenceImage && (
        <DownloadButton base64String={referenceImage} fileName="original.png" />
      )}
    </div>
  )
}

function ImageUpload({
  referenceImage,
  setReferenceImage,
}: {
  referenceImage: string | null
  setReferenceImage: Function
}) {
  function handleImageUpload(e) {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setReferenceImage(reader.result)
      }
      reader.readAsDataURL(file) // Convert image to base64 string
    }
  }

  return (
    <div className="w-full h-full flex flex-col py-[70px] px-[40px] gap-y-[20px]">
      {referenceImage ? (
        <SelectReferenceImageAndRemoveButton
          referenceImage={referenceImage}
          setReferenceImage={setReferenceImage}
        />
      ) : (
        <UploadReferenceImage handleImageUpload={handleImageUpload} />
      )}
    </div>
  )
}

function UploadReferenceImage({
  handleImageUpload,
}: {
  handleImageUpload: Function
}) {
  return (
    <>
      <div className="text-2xl text-center">
        Drag your existing sketch or 3D model
      </div>
      <div className="text-base text-center">
        or click the button below to upload your file
      </div>
      <label
        className={`rounded-[10px] gap-x-[10px] py-[14px] px-[20px] text-center border-1`}
        htmlFor="fileInput"
        style={{
          borderColor: Palette.BASE,
        }}
      >
        <span>Chọn ảnh tham chiếu</span>
        <input
          accept="image/*"
          className="hidden"
          id="fileInput"
          type="file"
          onChange={handleImageUpload}
        />
      </label>
    </>
  )
}

function SelectReferenceImageAndRemoveButton({
  referenceImage,
  setReferenceImage,
}: {
  referenceImage: string
  setReferenceImage: Function
}) {
  return (
    <div>
      <Image alt="Uploaded" src={referenceImage} width={300} height={300} />
      <Button
        onClick={function() {
          setReferenceImage(null)
        }}
      >
        Xóa ảnh
      </Button>
    </div>
  )
}

function AdvanceGenerate({
  typeOfGenerate,
  referenceImage,
  setLoading,
  setResultImages,
  numberOfResultImages,
  loading,
}: {
  typeOfGenerate: string
  referenceImage: string | null
  setLoading: Function
  numberOfResultImages: number
  setResultImages: Function
  loading: boolean
}) {
  const [prompt, setPrompt] = useState('')
  const [negativePrompt, setNegativePrompt] = useState('')

  const generateButtonClick = useCallback(
    async function() {
      setLoading(true)
      const payload = {
        prompt: typeOfGenerate + ',' + basePrompt + prompt,
        negative_prompt: baseNegativePrompt + negativePrompt,
        seed: -1,
        steps: 30,
        width: 512,
        height: 512,
        denoising_strength: 0.5,
        n_iter: 1,
        init_images: [referenceImage],
        batch_size: numberOfResultImages,
        sampler_name: 'DPM++ 2M',
        alwayson_scripts: {
          controlnet: {
            args: [
              {
                module: 'canny',
                model: 'control_canny-fp16 [d14c016b]',
              },
            ],
          },
        },
      }

      console.log(payload)

      try {
        const res = await axios.post(
          `${serviceUrl}/sdapi/v1/img2img`,
          payload,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )

        console.log(res.data)
        let resultImages: string[] = []
        for (const image of res.data.images) {
          resultImages = [...resultImages, `data:image/png;base64,${image}`]
        }
        setResultImages(resultImages)
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    },
    [
      prompt,
      negativePrompt,
      referenceImage,
      numberOfResultImages,
      setLoading,
      setResultImages,
      typeOfGenerate,
    ],
  )

  return (
    <div className="flex flex-col gap-y-2">
      <Textarea
        label="Prompt"
        value={prompt}
        onChange={function(e) {
          setPrompt(e.target.value)
        }}
      />

      <Textarea
        label="Negative Prompt"
        value={negativePrompt}
        onChange={function(e) {
          setNegativePrompt(e.target.value)
        }}
      />

      <Button onClick={generateButtonClick} isDisabled={loading}>
        Generate
      </Button>
    </div>
  )
}

const TYPES_OF_ARCHITECT = [
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
]

const MATERIALS = [{ keyword: 'wood', label: 'Gỗ' }]
const basePrompt =
  'RAW photo, elevation view, day, clear sky, modern minimalist lines, vivid colour, Masterpiece, high quality, best quality, authentic, super detail, (high detailed :1.2), uhd, dslr, soft lighting, high quality, film grain, Fujifilm XT3'
const baseNegativePrompt =
  '(normal quality), (low quality), (worst quality), paintings, sketches,lowres, text, cropped, worst quality, low quality, normal quality, signature, watermark, username, blurry,skech,logo,blurry, drawing, sketch, poor quality, ugly, low resolution, saturated, high contrast, oversharpened,low quality, bad anatomy, worst quality,deformed, disfigured, cropped, jpeg artifacts, error, mutation,noise,UnrealisticDream'

function SimpleGenerate({
  typeOfGenerate,
  referenceImage,
  setLoading,
  setResultImages,
  numberOfResultImages,
  loading,
}: {
  typeOfGenerate: string
  referenceImage: string | null
  setLoading: Function
  numberOfResultImages: number
  setResultImages: Function
  loading: boolean
}) {
  const [typeOfArchitecture, setTypeOfArchitecture] = useState('')
  const [style, setStyle] = useState('')
  const [material, setMaterial] = useState('')

  const generateButtonClick = useCallback(
    async function() {
      setLoading(true)
      const payload = {
        prompt: [
          basePrompt,
          typeOfGenerate,
          typeOfArchitecture,
          style,
          material,
        ].join(','),
        negative_prompt: baseNegativePrompt,
        seed: -1,
        steps: 30,
        width: 512,
        height: 512,
        // denoising_strength: 0.5,
        // n_iter: 1,
        init_images: [referenceImage],
        batch_size: numberOfResultImages,
        sampler_name: 'DPM++ 2M',
        alwayson_scripts: {
          controlnet: {
            args: [
              {
                module: 'canny',
                model: 'control_canny-fp16 [d14c016b]',
              },
            ],
          },
        },
      }

      // console.log(payload)

      try {
        const res = await axios.post(
          `${serviceUrl}/sdapi/v1/img2img`,
          payload,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )

        // console.log(res.data)
        let resultImages: string[] = []
        for (const image of res.data.images) {
          resultImages = [...resultImages, `data:image/png;base64,${image}`]
        }
        setResultImages(resultImages)
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    },
    [
      material,
      typeOfGenerate,
      typeOfArchitecture,
      style,
      referenceImage,
      numberOfResultImages,
      setLoading,
      setResultImages,
    ],
  )

  return (
    <div className="flex flex-col flex-grow">
      <ArchitectSelect
        typeOfArchitect={typeOfArchitecture}
        setTypeOfArchitect={setTypeOfArchitecture}
      />
      <StyleSelect style={style} setStyle={setStyle} />
      <Select
        items={MATERIALS}
        label="Nguyên vật liệu"
        value={material}
        onChange={(e) => {
          setMaterial(e.target.value)
        }}
      >
        {(material) => (
          <SelectItem key={material.keyword}>{material.label}</SelectItem>
        )}
      </Select>

      <Button onPress={generateButtonClick} isDisabled={loading}>
        Generate
      </Button>
    </div>
  )
}

function ArchitectSelect({
  typeOfArchitect,
  setTypeOfArchitect,
}: {
  typeOfArchitect: string
  setTypeOfArchitect: Function
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Select
        value={typeOfArchitect}
        label="Kiểu kiến trúc"
        items={TYPES_OF_ARCHITECT}
        onClick={function() {
          onOpen()
        }}
      >
        {}
      </Select>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {function(onClose) {
            return (
              <>
                <ModalHeader className="flex">
                  <div>Phong cách </div>
                  <Button color="danger" onPress={onClose}>
                    Close
                  </Button>
                </ModalHeader>
                <ModalBody>
                  {TYPES_OF_ARCHITECT.map((architect, idx) => (
                    <Button
                      key={idx}
                      onPress={() => {
                        setTypeOfArchitect(architect.keyword)
                      }}
                      color={
                        architect.keyword === typeOfArchitect
                          ? 'warning'
                          : 'default'
                      }
                    >
                      {architect.label}
                    </Button>
                  ))}
                </ModalBody>
              </>
            )
          }}
        </ModalContent>
      </Modal>
    </>
  )
}

function StyleSelect({
  style,
  setStyle,
}: {
  style: string
  setStyle: Function
}) {
  return (
    <Select
      value={style}
      onChange={(e) => {
        setStyle(e.target.value)
      }}
      className="flex"
      label="Phong cách"
      items={STYLES}
    >
      {(style) => <SelectItem key={style.keyword}>{style.label}</SelectItem>}
    </Select>
  )
}

function ResultImages({
  original,
  currentImageIdx,
  images,
  setCurrentImageIdx,
  loading,
}: {
  original: string | null
  currentImageIdx: number
  images: string[]
  setCurrentImageIdx: Function
  loading: boolean
}) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  }
  return (
    <div className="flex flex-col justify-center flex-grow">
      {loading ? (
        <Spinner size="lg" label="Đang tạo ..." color="warning" />
      ) : (
        <>
          {images.length === 0 ? (
            <NoResultImages />
          ) : (
            <div className="flex flex-col gap-4 justify-center flex-grow">
              <SliderImagesComparison
                original={original!}
                newImage={images[currentImageIdx]}
              />
              {/* <div className="slider-container"> */}
              {/*   <Slider {...settings}> */}
              <div className="w-full flex flex-wrap gap-2">
                {images.map((image, index) => (
                  <div
                    key={index}
                    onClick={function() {
                      setCurrentImageIdx(index)
                    }}
                    className={clsx({
                      'border-2 border-black': index === currentImageIdx,
                    })}
                  >
                    <Image src={image} width={300} height={300} alt="Result" />
                    <DownloadButton
                      base64String={image}
                      fileName={`result-${index + 1}.png`}
                    />
                  </div>
                ))}
              </div>
              {/*   </Slider> */}
              {/* </div> */}
            </div>
          )}
        </>
      )}
    </div>
  )
}

function NoResultImages() {
  return (
    <Image
      src="services/archiroom/logo.svg"
      sizes="768px"
      width={768}
      height={768}
      alt="No result"
    />
  )
}

function SliderImagesComparison({
  original,
  newImage,
}: {
  original: string
  newImage: string
}) {
  return (
    <ImgComparisonSlider className="size-72">
      <Image
        alt="original"
        width={300}
        height={300}
        className="size-72"
        slot="first"
        src={original}
      />
      <Image
        width={300}
        height={300}
        alt="current selected"
        className="size-72"
        slot="second"
        src={newImage}
      />
    </ImgComparisonSlider>
  )
}

const numberOfResultImagesOptions = [1, 2, 3, 4, 5]

function ChooseNumberOfReturnImages({
  numberOfResultImages,
  setNumberOfResultImages,
}: {
  numberOfResultImages: number
  setNumberOfResultImages: Function
}) {
  return (
    <div>
      <span>Chọn số ảnh trả về</span>
      <div className="flex justify-between">
        {numberOfResultImagesOptions.map((value, idx) => (
          <Button
            key={idx}
            onClick={function() {
              setNumberOfResultImages(value)
            }}
            color={value === numberOfResultImages ? 'primary' : 'default'}
          >
            {value}
          </Button>
        ))}
      </div>
    </div>
  )
}

function DownloadButton({
  base64String,
  fileName,
}: {
  base64String: string
  fileName: string
}) {
  const downloadImage = useCallback(() => {
    // Function to convert base64 string to Blob
    const base64ToBlob = (base64, contentType = '', sliceSize = 512) => {
      const byteCharacters = atob(base64.split(',')[1])
      const byteArrays = []

      for (
        let offset = 0;
        offset < byteCharacters.length;
        offset += sliceSize
      ) {
        const slice = byteCharacters.slice(offset, offset + sliceSize)
        const byteNumbers = new Array(slice.length)

        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i)
        }

        const byteArray = new Uint8Array(byteNumbers)
        byteArrays.push(byteArray)
      }

      return new Blob(byteArrays, { type: contentType })
    }

    // Convert the base64 string to a Blob
    const contentType = base64String.split(';')[0].split(':')[1]
    const blob = base64ToBlob(base64String, contentType)

    // Create a link element and set the URL to the Blob
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = fileName // Specify the filename

    // Programmatically click the link to trigger the download
    document.body.appendChild(link)
    link.click()

    // Clean up and remove the link element
    document.body.removeChild(link)
  }, [base64String, fileName])

  return (
    <Button
      onClick={downloadImage}
      style={{ padding: '10px', cursor: 'pointer' }}
      startContent={<SlCloudDownload />}
    >
      Tải ảnh xuống
    </Button>
  )
}
