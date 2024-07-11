import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  cn,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Input,
  Progress,
  RadioGroup,
  Select,
  SelectItem,
  Skeleton,
  Spinner,
  Tab,
  Tabs,
  Tooltip,
  useRadio,
  VisuallyHidden,
} from '@nextui-org/react'
import { Image as Image2 } from '@nextui-org/react'
import * as ImageJS from 'image-js'
import Image from 'next/image'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import combineIcon from './components/background-images/combineIcon.svg'
import resultIcon from './components/background-images/resultIcon.svg'
import upload from './components/background-images/upload.svg'
import { imageKitService } from './components/ImageKitService'
import axios from 'axios'
import { ARCHIROOM_TOOL_CONFIG } from '../data'
import AOS from "aos";

export default function PlayGroundArchitecture2({ config, onCloseEvent }) {
  const fileInputRef = useRef<any>()
  const [step, setStep] = useState(0)
  const [counter, setCounter] = useState(0)
  const [isFirstTime, setIsFirstTime] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hasOutput, setHasOutput] = useState(false)
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const [numberOfOutput, setNumberOfOutput] = useState("1")
  const [genConfig, setGenConfig] = useState({})
  const [imageUploadedUrl, setImageUploadedUrl] = useState('')
  const [imageResponseddUrl, setImageResponseddUrl] = useState('')
  const [promt, setPromt] = useState('architecture')
  const [negativePromt, setNegativePromt] = useState('')
  const [serviceUrl, setServiceUrl] = useState('https://nhathao.top')
  const [outputImageUploadedUrl, setOutputImageUploadedUrl] = useState(
    './services/architecture-ai-step-3.jpg',
  )
  const [isPlayingAround, setIsPlayingAround] = useState(true)
  const uploadTrigger = () => {
    fileInputRef?.current.click()
  }
  const [genType, setGenType] = React.useState<any>(new Set(['Chính xác']))

  const onSubmit = useCallback(async (event: any) => {
    setIsLoading(true);

    const file = event.target.files[0];
    const base64File: any = await getImageBase64(file);
    setImageUploadedUrl(URL.createObjectURL(file))
    console.log(process.env.SD_URL)
    await axios.post(
      `${serviceUrl}/sdapi/v1/img2img`,
      {
        prompt: promt,
        negative_prompt: negativePromt,
        scheduler: 'Karras',
        seed: -1,
        steps: 20,
        width: 512,
        height: 512,
        denoising_strength: 0.5,
        n_iter: 1,
        init_images: [base64File],
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
    ).then((res) => {
      const data = res.data.images[0];
      console.log("data responsed: res.data ");
      console.log(res.data);
      //TODO
      setImageResponseddUrl(data)
    })
      .catch((err) => {
        alert(err)
      }).finally(() => {
        setIsLoading(false);
        setHasOutput(true);
        setStep(1)
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [promt, negativePromt]);

  const setConfig = useCallback((configId: any, configValue: any) => {
    let _config: {} = { ...genConfig };
    console.log(_config);
    _config[configId] = configValue;
    setGenConfig({..._config});
  }, []);

  // upload clothes photo
  const handleImageUpload = useCallback(async (event: any) => {
    const file = event.target.files[0]

    if (file) {
      setIsUploadingImage(true)
      setIsPlayingAround(true)
      setIsLoading(true)
      setStep(1)
      const imageUrl = URL.createObjectURL(file)
      const img = await ImageJS.Image.load(imageUrl)
      imageKitService
        .upload({
          file: img.toDataURL(),
          fileName: 'architecture.jpg',
        })
        .then((uploaded) => {
          setImageUploadedUrl(uploaded.url + '?tr=w-768,h-1024') // using imagekit auto resize
          setIsUploadingImage(false)

          // temp
          setTimeout(() => {
            setCounter((v) => (v >= 100 ? 0 : v + 1))
          }, 1000)
        })
    }
  }, [])

  useEffect(() => {
    AOS.init({
      duration: 500, once: true
    });
  }, []);

  async function getImageBase64(file: File) {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        resolve(reader.result)
      }
    })
  }

  return (
    <div className="w-full px-0 hover:opacity-100  rounded-xl  text-white ">
      <div className="block lg:flex h-[calc(100vh_-_40px)] w-full gap-x-2">
        <div className="flex  bg-slate-800 text-white h-full w-full lg:w-[344px] flex-shrink-0 flex-col items-start gap-y-4 rounded-large  px-8 py-6 shadow-small lg:flex">
          <button
            onClick={() => onCloseEvent()}
            className="z-0 group relative inline-flex items-center justify-center text-sm gap-2 bg-slate-800/90 p-2 rounded-lg"
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
            Quay lại
          </button>
          {/* <div>
            <div className="text-xl font-medium leading-7 ">
              Tạo thiết kế
            </div>
          </div> */}
          <div className="w-full text-white text-sm bg-slate-800">
            <Tabs key={'success'} classNames={{
              tabList: "gap-6 w-full relative rounded-lg bg-slate-800",
              cursor: "w-full bg-slate-700",
              tab: "max-w-fit px-0 h-8 my-1",
              tabContent: "group-data-[selected=true]:text-white "
            }}
              style={{ color: "white" }} className='w-full ' aria-label="Render types" radius="full">
              {
                ARCHIROOM_TOOL_CONFIG.mode.map(item => (
                  <Tab key={item.name} title={item.name} className='px-8 ' />
                ))
              }

            </Tabs>
          </div>
          <div className="w-full text-white text-sm">
            <RadioGroup orientation="horizontal" className='w-auto h-auto' label="Chọn đối tượng Gen ảnh:" onSelect={() => { }}>
              {
                ARCHIROOM_TOOL_CONFIG.targets.map(item => (
                  <CustomRadio key={item.name} value={item.name}>
                    <div className='relative'>
                      <Image
                        src={item.image}
                        className='rounded'
                        width={72}
                        height={72}
                        alt="Try On Step Image"
                      />
                      <span className='p-1 text-xs absolute bottom-0 left-0 text-gray-100'> {item.name}</span>
                    </div>
                  </CustomRadio>
                ))
              }
            </RadioGroup>
          </div>

          <div className="w-full text-white text-sm">
            <div className='rounded-lg bg-slate-700 w-full rounded-[10px] p-[2px]'>
              <Tooltip isOpen={(step == 0.5) && imageUploadedUrl.length == 0} showArrow={true} placement='right-start' content="Tải lên thiết kế của bạn tại đây">
                <div className="">
                  <div className="w-full h-full bg-slate-800/60 rounded-[8px] p-[15px] lg:p-[36px] hover:bg-gradient-to-r hover:from-purple-500/[.05] hover:to-blue-500/[.05] duration-300">
                    <div className="options flex justify-center mb-[15px]">
                      <div className="hover:scale-125 duration-300">
                        <div className="cursor-pointer">

                          {isLoading ? (
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
                            onChange={onSubmit}
                            onBlur={() => setIsLoading(false)}
                            ref={fileInputRef}
                          />
                        </div>
                      </div>
                      <div
                        className=""
                      >
                      </div>
                    </div>
                    <p className="text-[12px] lg:text-base text-center font-medium bg-white bg-clip-text text-transparent">
                      {ARCHIROOM_TOOL_CONFIG.upload.title}
                    </p>
                  </div>
                </div>
              </Tooltip>
            </div>

          </div>

          {
            ARCHIROOM_TOOL_CONFIG.options.map(item => (
              <div className="w-full rounded ">
                <Dropdown backdrop="blur">
                  <DropdownTrigger id={item.id}>
                    <div className='w-full h-14 rounded-lg bg-slate-700 text-sm p-1 px-2 cursor-pointer'>
                      <div className='w-full text-gray-500'> {item.title} </div>
                      <div className='w-full flex gap-2 text-gray-300 font-semibold pt-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" />
                        </svg>
                        {item.child.findLast(a => a.id === genConfig[item.id])?.title ?? ""}
                      </div>
                    </div>
                  </DropdownTrigger>

                  <DropdownMenu variant="faded" onAction={(key) => {
                    console.log(item.id);
                    console.log(key);
                    ARCHIROOM_TOOL_CONFIG.optionsSelected[item.id] = key;
                    setConfig(item.id, key.toString()?.replace(".0", ""));
                  }} aria-label="Static Actions">
                    {[
                      // @ts-ignore
                      item.child?.map(x => <DropdownSection key={x.id} aria-label="Help & Feedback">
                        <DropdownItem
                          shortcut="⌘"
                          description="Copy the file link"
                          id={x.id}
                          startContent={
                            <div className='relative'>
                              <Image
                                src={x.image}
                                className='rounded'
                                width={124}
                                height={124}
                                alt="Try On Step Image"
                              />
                              {/* <span className='p-1 text-xs absolute bottom-0 left-0 text-gray-100'> {x.title}</span> */}
                            </div>
                          }
                        >
                          {x.title}
                        </DropdownItem>
                      </DropdownSection>)
                    ]}
                  </DropdownMenu>

                </Dropdown>
              </div>

            ))
          }

          <div className="w-full rounded ">
            <div className='w-full h-14 rounded-lg  text-sm p-1 px-2 cursor-pointer'>
              <div className='w-full text-gray-500'> Số ảnh trả về </div>
              <div className='w-full flex gap-2 text-gray-300 font-semibold pt-1'>

                <Breadcrumbs
                  size="lg"
                  onAction={(key) => setNumberOfOutput(key.toString())}
                  classNames={{
                    list: "gap-2",
                  }}
                  itemClasses={{
                    item: [
                      "px-2 py-0.5 border-small font-normal  rounded-small",
                      "data-[current=true]:border-foreground data-[current=true]:bg-foreground data-[current=true]:text-background transition-colors",
                      "data-[disabled=true]:border-slate-400 data-[disabled=true]:bg-slate-100 text-white",
                    ],
                    separator: "hidden",
                  }}
                >
                  <BreadcrumbItem key="1" isCurrent={numberOfOutput === "1"}>
                    1
                  </BreadcrumbItem>
                  <BreadcrumbItem key="2" isCurrent={numberOfOutput === "2"}>
                    2
                  </BreadcrumbItem>
                  <BreadcrumbItem key="3" isCurrent={numberOfOutput === "3"}>
                    3
                  </BreadcrumbItem>
                  <BreadcrumbItem key="4" isCurrent={numberOfOutput === "4"}>
                    4
                  </BreadcrumbItem>
                  <BreadcrumbItem key="5" isCurrent={numberOfOutput === "5"}>
                    5
                  </BreadcrumbItem>
                </Breadcrumbs>
              </div>
            </div>
          </div>


        </div>

        <div



          className="flex h-auto w-full flex-col items-center gap-4 md:p-4 " >
          {step === 0 ? (
            <div data-aos='zoom-in'
              data-aos-duraion={1000} className='p-24 text-lg'>
              <h2 className="text-slate-800 text-xl font-bold mb-[60px] hidden lg:flex items-center gap-[10px]">
                <Image
                  src="./logo-s.png"
                  width={42}
                  height={42}
                  alt="Try On Step Image"
                  className="w-[30px] h-[30px] lg:w-[42px] lg:h-[42px]"
                />
                Xin chào, đây là những bước để tạo ra thiết kế ấn tượng.
              </h2>
              <div className="try-on-steps justify-between items-center mb-[60px] hidden lg:flex">
                <div
                  className="try-on-step flex flex-col items-center shrink-0 "
                  data-aos="fade-right"
                  data-aos-easing="ease-in-out"
                  data-aos-delay={200}
                  data-aos-duraion={1000}
                >
                  <Image
                    className='rounded-2xl b-solid b-1 border-slate-100 '
                    src="./services/architecture-ai-step-1.jpg"
                    width={320}
                    height={334}
                    alt="Try On Step Image"
                  />
                  <p className="step-description text-[18px]  font-bold mt-[24px] text-center text-slate-800">
                    Tải lên thiết kế (Sketch)
                  </p>
                </div>

                <Image
                  src={combineIcon}
                  width={32}
                  height={32}
                  alt="Try On Step Image"
                  className="relative left-[20px]  shrink-0"
                  data-aos="fade-right"
                  data-aos-easing="ease-in-out"
                  data-aos-delay={500}
                  data-aos-duraion={1000}
                />

                <div
                  className="try-on-step flex flex-col items-center shrink-0"
                  data-aos="fade-right"
                  data-aos-easing="ease-in-out"
                  data-aos-delay={800}
                  data-aos-duraion={1000}
                >
                  <nav aria-label="Progress" className="px-12 max-w-fit py-4">
                    <ol className="flex flex-row flex-nowrap gap-x-3 [--step-color:hsl(var(--nextui-primary))] [--step-fg-color:hsl(var(--nextui-primary-foreground))] [--active-fg-color:var(--step-fg-color)] [--active-border-color:var(--step-color)] [--active-color:var(--step-color)] [--complete-background-color:var(--step-color)] [--complete-border-color:var(--step-color)] [--inactive-border-color:hsl(var(--nextui-default-300))] [--inactive-color:hsl(var(--nextui-default-300))] [--inactive-bar-color:hsl(var(--nextui-default-300))] max-w-md">
                      <li className="relative flex w-full items-center pr-12">
                        <button className="group flex w-full cursor-pointer flex-row items-center justify-center gap-x-3 rounded-large py-2.5">
                          <div className="max-w-full flex-1 text-start">
                            <div className="text-small font-medium text-default-foreground transition-[color,opacity] duration-300 group-active:opacity-80 lg:text-medium">
                              Chọn bối cảnh
                            </div>
                          </div>
                          <Image
                            src={combineIcon}
                            width={32}
                            height={32}
                            alt="Try On Step Image"
                            className="relative left-[20px]  shrink-0"
                            data-aos="fade-right"
                            data-aos-easing="ease-in-out"
                            data-aos-delay={500}
                            data-aos-duraion={1000}
                          />
                        </button>
                      </li>
                      <li className="relative flex w-full items-center ">
                        <button className="group flex w-full cursor-pointer flex-row items-center justify-center gap-x-3 rounded-large py-2.5">
                          <div className="max-w-full flex-1 text-start">
                            <div className="text-small font-medium text-default-foreground transition-[color,opacity] duration-300 group-active:opacity-80 lg:text-medium">
                              Chọn style Gen
                            </div>
                          </div>
                        </button>
                      </li>
                    </ol>
                  </nav>
                </div>

                <Image
                  src={resultIcon}
                  width={39}
                  height={29}
                  alt="Try On Step Image"
                  className="relative right-[40px] shrink-0"
                  data-aos="fade-right"
                  data-aos-easing="ease-in-out"
                  data-aos-delay={1100}
                  data-aos-duraion={1000}
                />

                <div
                  className="try-on-step flex flex-col items-center shrink-0"
                  data-aos="fade-right"
                  data-aos-easing="ease-in-out"
                  data-aos-delay={1400}
                  data-aos-duraion={1000}
                >
                  <Image
                    className='rounded-2xl b-solid b-1 border-slate-100 '
                    src="./services/architecture-ai-step-3.jpg"
                    width={320}
                    height={334}
                    alt="Try On Step Image"
                  />
                  <p className="step-description text-slate-800 text-[18px] font-bold mt-[24px] text-center">
                    Nhận kết quả
                  </p>
                </div>
              </div>

            </div>
          ) : null}

          {step === 1 ? (
            <>
              <h2 className="text-slate-800 text-base lg:text-[30px] font-bold mb-[20px] lg:mb-[30px] flex items-center mt-12">
                Đang tải ảnh lên
              </h2>
              <div className="w-full flex">
                <div className="w-1/2 flex">
                  <Card
                    className="w-full h-[70vh] space-y-12 mx-12 p-8 "
                    radius="lg"
                  >
                    <Skeleton isLoaded={true} className="rounded-lg">
                      {!isUploadingImage && (
                        <div className="h-auto w-full flex justify-center rounded-lg bg-slate-800/20 pb-10">
                          <Image2
                            width={520}
                            height={580}
                            src={imageUploadedUrl}

                            alt="user uploaded cover"
                            className=" w-full p-5 justify-center mx-auto "
                            fallbackSrc="https://via.placeholder.com/300x500"
                          />
                        </div>
                      )}

                      {isUploadingImage && (
                        <div className="h-[154px] w-full rounded-lg bg-slate-800/20"></div>
                      )}
                    </Skeleton>
                    {isUploadingImage && (
                      <div className="space-y-3 ">
                        <span className="my-1">Đang phân tích bối cảnh</span>
                        <Skeleton
                          isLoaded={isLoading}
                          className="w-3/5 rounded-lg"
                        >
                          <div className="h-3 w-full rounded-lg bg-secondary"></div>
                        </Skeleton>
                        <Skeleton
                          isLoaded={isLoading}
                          className="w-4/5 rounded-lg"
                        >
                          <div className="h-3 w-full rounded-lg bg-secondary-300"></div>
                        </Skeleton>
                        <Skeleton
                          isLoaded={isLoading}
                          className="w-2/5 rounded-lg"
                        >
                          <div className="h-3 w-full rounded-lg bg-secondary-200"></div>
                        </Skeleton>
                      </div>
                    )}
                  </Card>{' '}
                </div>
                <div className="w-1/2 flex">
                  <Card
                    className="w-full h-[70vh] space-y-12 mx-12 p-8 "
                    radius="lg"
                  >
                    <Skeleton isLoaded={hasOutput} className="rounded-lg">
                      {hasOutput && (
                        <div className="h-auto w-full flex justify-center rounded-lg bg-slate-800/20">
                          <Image2
                            width={520}
                            height={580}
                            isZoomed
                            src={`data:image/png;base64, ${imageResponseddUrl}`}
                            // src={imageResponseddUrl}
                            alt="user uploaded cover"
                            className=" w-full h-auto p-5 justify-center mx-auto"
                            fallbackSrc="https://via.placeholder.com/300x500"
                          />
                        </div>
                      )}

                      {isLoading && (
                        <Progress
                          aria-label={counter + 'seconds left'}
                          size="md"
                          value={counter}
                          color="secondary"
                          showValueLabel={true}
                          className=" my-2 w-full"
                        />
                      )}
                    </Skeleton>

                    <div className="space-y-3 ">
                      <div className="flex gap-4 items-center">
                        <Button
                          className="bg-slate-800 text-white"
                          endContent={
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                              />
                            </svg>
                          }
                        >
                          Tải xuống định dạng ảnh
                        </Button>
                        <Button
                          onPress={() => {
                            setStep(1)
                          }}
                          startContent={
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-6 text-white"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                              />
                            </svg>
                          }
                          className="bg-gradient-to-r font-bold from-purple-gd to-blue-gd rounded-full h-[38px] w-full hover:shadow-purple-300 hover:shadow-[0_0_20px_5px_rgba(0,0,0,0.1)] duration-300 lg:w-auto"
                        >
                          <span className="text-white">Retry</span>
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </>
          ) : null}

          {/* Footer */}

          {step === 0 ? (
            <>
              <div className="w-full lg:w-auto h-[40px] box-border rounded-full hover:bg-white hidden lg:block to-blue-gd p-[1px]">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onSubmit}
                  ref={fileInputRef}
                />
                <Button
                  onClick={() => setStep(0.5)}
                  className="w-full lg:w-auto text-white font-medium rounded-full py-1 bg-gradient-to-r from-purple-gd to-blue-gd px-[50px] hover:shadow-purple-300 hover:shadow-[0_0_20px_5px_rgba(0,0,0,0.1)] duration-300"
                >
                  Bắt đầu
                </Button>
              </div>
            </>
          ) : null}
        </div>
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
        'max-w-[300px] cursor-pointer  border-slate-300 rounded-lg  p-1 ml-0',
        'data-[selected=true]:border-slate-400 data-[selected=true]:border-1 text-white',
      )}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      {/* <span {...getWrapperProps()}>
        <span {...getControlProps()} />
      </span> */}
      <div {...getLabelWrapperProps()} className='ml-0'>
        {children && <span className="text-white">{children}</span>}
        {description && (
          <span className="text-small  opacity-70">{description}</span>
        )}
      </div>
    </Component>
  )
}
