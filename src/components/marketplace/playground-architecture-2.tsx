'use client'
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardFooter,
  CardHeader,
  cn,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Input,

  NavbarContent,
  Navbar,
  Progress,
  RadioGroup,
  Select,
  SelectItem,
  Skeleton,
  Spinner,
  Tab,
  Tabs,
  Textarea,
  Tooltip,
  useRadio,
  VisuallyHidden,
  Avatar,
  Link,
  NavbarItem,
  AvatarGroup,
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
import { ARCHIROOM_TOOL_CONFIG, MARKET_CONFIG_DATA } from '../data'
import AOS from "aos";
import ImageComparison from '../image-comparison'
import { useRouter } from 'next/router'
// import { Client } from "@gradio/client";


var genConfigurations = {};
var base64ImageStr = null
export default function PlayGroundArchitecture2({ config, onCloseEvent }) {
  const fileInputRef = useRef<any>()
  const [step, setStep] = useState(0)
  const [counter, setCounter] = useState(0)
  const [isFirstTime, setIsFirstTime] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hasOutput, setHasOutput] = useState(false)
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const [numberOfOutput, setNumberOfOutput] = useState("4")
  const [genConfig, setGenConfig] = useState({})
  const [imageUploadedUrl, setImageUploadedUrl] = useState('')
  const [base64Image, setBase64Image] = useState()
  const [genMode, setGenMode] = useState('genMode-1')
  const [mode, setMode] = useState('image-base')
  const [imageResponseArr, setImageResponseArr] = useState({})
  const [prompt, setPrompt] = useState('')
  const [chatGPTDesignPrompts, setChatGPTDesignPrompts] = useState<any[]>([])
  const [contextId, setContextId] = useState('context-1')
  const [negativePrompt, setNegativePrompt] = useState('(normal quality), (low quality), (worst quality), paintings, sketches,lowres, text, cropped, worst quality, low quality, normal quality, signature, watermark, username, blurry,skech,logo,blurry, drawing, sketch, poor quality, ugly, low resolution, saturated, high contrast, oversharpened, low quality, bad anatomy, worst quality,deformed, disfigured, cropped, jpeg artifacts, error, mutation,noise,UnrealisticDream')
  const [serviceUrl, setServiceUrl] = useState('https://toandeptrai.ddns.net')

  const [isPlayingAround, setIsPlayingAround] = useState(true)
  const uploadTrigger = () => {
    fileInputRef?.current.click()
  }
  const [progressValue, setProgressValue] = React.useState(0);
  const [showPrompt, setShowPrompt] = React.useState(true);
  const [showEditPrompt, setShowEditPrompt] = React.useState(false);
  const router = useRouter();
  useEffect(() => {
    const prompt = router.query.prompt;
    const product = router.query.product;
    if (prompt) {
      // Fetch product details from an API or some data source
      console.log("check prompt: " + prompt)
      setPrompt(prompt.toString())
      setMode('prompt-base');
      setStep(0.5)

      // todo call chat gpt to generate prompt.
      setChatGPTDesignPrompts([
        { title: '1. Phòng bếp (10m²)', prompt: "A modern kitchen design with a 10m² area, styled with Japanese-inspired minimalism. The kitchen features sleek black and white cabinetry with handle-less doors, providing a clean and seamless look. A compact island with a black granite countertop serves as both a preparation area and a casual dining spot. The walls are adorned with light-colored tiles, and the floor is made of polished wooden planks that match the overall warm and neutral color palette. Recessed lighting provides ample illumination, and a large window above the sink allows natural light to brighten the space. The kitchen is equipped with modern stainless steel appliances, including a built-in oven, a minimalist range hood, and a slim refrigerator, all designed to maximize space efficiency in this 10m² kitchen." },
        { title: '2. Phòng khách (20m²)', prompt: "A 20m² living room interior designed in a modern Japanese-inspired style, featuring a large sectional sofa in neutral beige tones. The centerpiece of the room is a low, black wooden coffee table, complemented by a combination of wooden flooring and a soft rug. A raised platform by the large floor-to-ceiling windows provides a cozy seating area with floor cushions. The walls are decorated with geometric patterns, and the ceiling has recessed lighting and dark wooden panels, adding depth and contrast. The room is illuminated by natural light from the windows, softened by sheer curtains. The color palette includes neutral tones like beige and cream, accented by darker shades of black and deep brown, creating a harmonious blend of modern minimalism and traditional Japanese aesthetics in this 20m² space." },
        { title: '3. Phòng ngủ thứ nhất (15m²)', prompt: "A serene 15m² bedroom designed in a modern Japanese style, with a focus on simplicity and comfort. The room features a low platform bed with crisp white linens and dark wooden frames. A tatami mat covers part of the wooden floor, adding an authentic touch. The walls are painted in soft, neutral tones, with one accent wall decorated with a minimalist geometric pattern. The ceiling is simple, with recessed lighting providing a warm, ambient glow. A large window with sheer curtains allows natural light to filter in, enhancing the room's tranquil atmosphere. A small, built-in closet provides efficient storage without taking up much space. The room is accented with potted plants and minimalist artwork, creating a peaceful and inviting retreat in this 15m² bedroom." },
        { title: '4. Phòng ngủ thứ hai (15m²)', prompt: "A cozy 15m² bedroom designed with a modern Japanese-inspired aesthetic. The room features a low-profile wooden bed with light gray bedding, positioned against a wall with a subtle, textured pattern. The flooring is a combination of polished wood and a soft, neutral-colored rug. A small reading nook by the window includes a comfortable chair and a low table, perfect for relaxation. The room is illuminated by both natural light from a large window with light, sheer curtains and warm, recessed ceiling lighting. A minimalist wardrobe with sliding doors offers practical storage without encroaching on the room's space. The overall color scheme is calm and neutral, with light wood, gray, and white tones, creating a peaceful and uncluttered environment in this 15m² bedroom." }

      ])
    }
  }, [router]);

  const [genType, setGenType] = React.useState<any>(new Set(['Chính xác']))
  const setFile = useCallback(async (event: any) => {
    const file = event.target.files[0];
    const base64File: any = await getImageBase64(file);
    base64ImageStr = base64File;
    setBase64Image(base64File);
    setImageUploadedUrl(URL.createObjectURL(file))

  }, [])
  const onSubmit = useCallback(async () => {
    setIsLoading(true);
    console.log(process.env.SD_URL)
    const interval = setInterval(() => {
      setProgressValue((v) => (v >= 100 ? 0 : v + 5));
    }, 1200);
    console.log(genConfigurations)

    let promptCustomize = '';
    let templatePrompt = "Masterpiece, high quality, best quality, authentic, super detail, [Kiểu nhà] (1), [Nội/ ngoại thất] (2), [Phong cách] (3),  [Vật liệu] (4),wooden entrance gate , daylight, archdaily architecture, white Background, 8k uhd, dslr, soft lighting, suuny,high quality, film grain, Fujifilm XT3, [Lora]"

    let genTypeKeyWord = ARCHIROOM_TOOL_CONFIG.options.findLast(y => y.id == 'genType')?.child.findLast(x => x.id == genConfigurations['genType'])?.keywords ?? "";
    let genStyleKeyWord = ARCHIROOM_TOOL_CONFIG.options.findLast(y => y.id == 'genStyle')?.child.findLast(x => x.id == genConfigurations['genStyle'])?.keywords ?? "";
    let genMaterialKeyWord = ARCHIROOM_TOOL_CONFIG.options.findLast(y => y.id == 'genMaterial')?.child.findLast(x => x.id == genConfigurations['genMaterial'])?.keywords ?? "";
    let genContextKeyWord = ARCHIROOM_TOOL_CONFIG.context.findLast(x => x.id == contextId)?.keywords ?? "";

    promptCustomize = templatePrompt
      .replace('[Nội/ ngoại thất] (2)', genContextKeyWord)
      .replace('[Kiểu nhà] (1)', genTypeKeyWord)
      .replace('[Phong cách] (3)', genStyleKeyWord)
      .replace('[Vật liệu] (4)', genMaterialKeyWord)

    if (prompt && prompt.length && genMode == "genMode-2") {
      promptCustomize = prompt;
    } else {
      setPrompt(promptCustomize);
    }

    await axios.post(
      `${serviceUrl}/sdapi/v1/img2img`,
      {
        prompt: promptCustomize,
        negative_prompt: negativePrompt,
        scheduler: 'Karras',
        seed: -1,
        steps: 20,
        width: 512,
        height: 512,
        denoising_strength: 0.5,
        n_iter: 2,
        init_images: [base64ImageStr ?? base64Image],
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
          "accept": "application/json",
          "accept-language": "en-US,en;q=0.9",
          "cache-control": "no-cache",
          "content-type": "application/json",

        },
      },
    ).then((res) => {

      console.log("data responsed: res.data ");
      const images: [] = res.data.images;
      console.log(images);

      //TODO
      setImageResponseArr({
        title: "Kết quả của {genType}, ",
        config: {},
        outputs: images.map(function (item, index) {
          return {
            id: index,
            title: "Biệt thự " + (index + 1),
            description: "",
            image: item,
            tags: ["Biệt thự", "Châu Âu"]
          }
        })
      })

    })
      .catch((err) => {
        alert("Server đang gặp vấn đề, Vui lòng quay lại sau");
        alert(err);
        console.log(err)
        setImageResponseArr({

        })
      }).finally(() => {
        setIsLoading(false);
        setHasOutput(true);
        setStep(1)
        clearInterval(interval);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prompt, negativePrompt]);

  const setConfig = useCallback((configId: any, configValue: any) => {
    let _config: {} = { ...genConfig };
    console.log(_config);
    _config[configId] = configValue;
    setGenConfig({ ..._config });
    genConfigurations[configId] = configValue;
    setStep(0.5)
  }, [genConfig]);

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

  async function getMidjourneyHuggingFace() {
    // const client = await Client.connect("mukaist/Midjourney");
    // const result = await client.predict("/run", {
    //   prompt: "Hello!!",
    //   negative_prompt: "Hello!!",
    //   use_negative_prompt: true,
    //   style: "2560 x 1440",
    //   seed: 0,
    //   width: 512,
    //   height: 512,
    //   guidance_scale: 0.1,
    //   randomize_seed: true,
    // });

    // console.log(result.data);
  }

  return (
    <div className="w-full px-0 hover:opacity-100  rounded-xl  text-white ">
      <div className="block lg:flex w-full  gap-x-2">

        {/* leftside */}

        <div className="flex h-[calc(100vh_-_20px)] bg-slate-800 text-white  w-full lg:w-[344px] flex-shrink-0 flex-col items-start gap-y-4 rounded-large  px-8 py-6 shadow-small lg:flex">
          <a
            href='/'
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
          </a>
          {/* <div>
            <div className="text-xl font-medium leading-7 ">
              Tạo thiết kế
            </div>
          </div> */}

          <div className="w-full text-white text-sm bg-slate-800">
            <Tabs key={'success'}
              selectedKey={genMode}
              onSelectionChange={(key) => { setGenMode(key.toString()); }}

              classNames={{
                tabList: "gap-6 w-full relative rounded-lg bg-slate-800",
                cursor: "w-full bg-slate-700",
                tab: "max-w-fit px-0 h-8 my-1",
                tabContent: "group-data-[selected=true]:text-white "
              }}
              style={{ color: "white" }} className='w-full ' aria-label="Render types" radius="full">
              {
                ARCHIROOM_TOOL_CONFIG.mode.map(item => (
                  <Tab key={item.id} title={item.name} className='px-8 ' />
                ))
              }
            </Tabs>
          </div>
          <div className="w-full text-white text-sm">
            <RadioGroup orientation="horizontal" className='w-auto h-auto' label="Chọn đối tượng Gen ảnh:"
              value={contextId}
              onValueChange={(val) => { console.log("onValueChange"); genConfigurations = {}; setConfig("", ""); setContextId(val) }}>
              {
                ARCHIROOM_TOOL_CONFIG.context.map(item => (
                  <CustomRadio key={item.id} value={item.id}>
                    <div className='relative'>
                      <Image
                        src={item.image}
                        className='rounded'
                        width={80}
                        height={150}
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
              <Tooltip isOpen={(step == 0.5) && imageUploadedUrl.length == 0 && mode == 'image-gen'} showArrow={true} placement='right-start' content="Tải lên thiết kế của bạn tại đây">
                <div className="">
                  <div className="w-full h-full bg-slate-800/60 rounded-[8px] p-[15px] lg:p-[36px] hover:bg-gradient-to-r hover:from-purple-500/[.05] hover:to-blue-500/[.05] duration-300">
                    <div className="options flex justify-center mb-[15px]">
                      <div className="hover:scale-125 duration-300">
                        <div className="cursor-pointer">

                          {isLoading ? (
                            <Spinner color="secondary" />
                          ) : (
                            <>
                              {!imageUploadedUrl && <Image
                                onClick={uploadTrigger}
                                src={upload}
                                width={45}
                                height={45}
                                alt="upload image"
                                className="w-[45px] h-[45px] lg:w-[45px] lg:h-[45px]"
                              />}
                              {imageUploadedUrl && <Image
                                onClick={uploadTrigger}
                                src={imageUploadedUrl}
                                width={250}
                                height={125}
                                alt="upload image"
                                className="w-[100px] h-[86px] lg:w-[200px] lg:h-[96px]"
                              />}
                            </>
                          )}

                        </div>
                      </div>
                      <div
                        className=""
                      >
                      </div>
                    </div>
                    {
                      !imageUploadedUrl && (<p className="text-[12px] lg:text-base text-center font-medium bg-white bg-clip-text text-transparent">
                        {ARCHIROOM_TOOL_CONFIG.upload.title}
                      </p>)
                    }
                  </div>
                </div>
              </Tooltip>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={setFile}
                onBlur={() => setIsLoading(false)}
                ref={fileInputRef}
              />
            </div>

          </div>

          {
            (genMode === 'genMode-1') && ARCHIROOM_TOOL_CONFIG.options.map(item => (
              <div key={item.id} className="w-full rounded ">
                <Dropdown backdrop="blur">
                  <DropdownTrigger id={item.id}>
                    <div className='w-full h-14 rounded-lg bg-slate-700 text-sm p-1 px-2 cursor-pointer'>
                      <div className='w-full text-gray-500'> {item.title} </div>
                      <div className='w-full flex gap-2 text-gray-300 font-semibold pt-1'>
                        <Image2
                          src={item.child?.findLast(a => a.id === genConfigurations[item.id])?.image ?? ""}
                          className='rounded w-[40px] h-[25px] pb-1 '
                          width={30}
                          height={30}
                          alt="Try On Step Image"
                        />

                        {item.child?.findLast(a => a.id === genConfigurations[item.id])?.title ?? ""}

                      </div>
                    </div>
                  </DropdownTrigger>

                  <DropdownMenu variant="faded" onAction={(key) => {
                    console.log(item.id);
                    console.log(key);
                    //ARCHIROOM_TOOL_CONFIG.optionsSelected[item.id] = key;
                    setConfig(item.id, key.toString()?.replace(".0", ""));

                  }} aria-label="Static Actions">
                    {[
                      // @ts-ignore
                      item.child?.filter(x => (contextId == null) ? true : (!x.context ? true : (x.context === contextId))).map(x => <DropdownSection key={x.id} aria-label="Help & Feedback">
                        <DropdownItem
                          shortcut="⌘"
                          description={x.keywords}
                          id={x.id}
                          startContent={
                            <div className='relative'>
                              <Image
                                src={x.image}
                                className='rounded w-[60px] h-[45px] pb-1 '
                                width={124}
                                height={124}
                                alt=""
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

          {/* chế độ gen nâng cao */}


          {
            (genMode === 'genMode-2') &&
            <div key="genMode-2" className="w-full text-white">
              <div className="w-full rounded text-white">
                <span className='p-1 mb-2 text-xs  text-gray-100'> Prompt:</span>
                <Textarea
                  isRequired
                  value={prompt}
                  onValueChange={setPrompt}
                  labelPlacement="outside"
                  placeholder="Điền các yếu tố mong muốn xuất hiện"
                  className="max-w-xs text-white"
                />
              </div>
              <div className="w-full rounded mt-4">
                <span className='p-1 mb-2 text-xs  text-gray-100'> Negative Prompt:</span>
                <Textarea
                  isRequired
                  value={negativePrompt}
                  onValueChange={setNegativePrompt}
                  labelPlacement="outside"
                  placeholder="Điền các yếu tố muốn loại bỏ"
                  className="max-w-xs text-white"
                />
              </div>
            </div>
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
                      "px-2 py-0.5  font-normal  rounded-small",
                      "data-[current=true]:border-small data-[current=true]:border-2 data-[current=true]:border-s data-[current=true]:bg-foreground data-[current=true]:text-background transition-colors",
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


          <div className="w-full  h-[40px] box-border rounded-full hover:bg-white hidden lg:block to-blue-gd p-[1px]">
            <Button
              onClick={() => onSubmit()}
              className="w-full  font-medium rounded-full py-1  bg-white text-slate-800 px-[50px] hover:shadow-purple-300 hover:shadow-[0_0_20px_5px_rgba(0,0,0,0.1)] duration-300"
            >
              Generate
            </Button>
          </div>

        </div>

        {/* rightside */}

        <div className="flex min-h-screen w-full flex-col items-center gap-4 ">
          <div className='w-full mb-12  h-[35px] rounded-lg'>
            <Navbar maxWidth='full' isBordered className='w-full bg-transparent'>
              <NavbarContent justify="start">
                <NavbarItem>
                  <span className="flex lg:block text-slate-800 inline font-semibold text-lg lg:text-xl">Sáng tạo không giới hạn với
                    <span className="tracking-tight inline font-semibold text-lg lg:text-xl">  &nbsp; </span>
                    <span className="tracking-tight inline font-semibold to-emerald-500 from-purple-600 text-lg lg:text-xl bg-clip-text text-transparent bg-gradient-to-b">
                      ARCHIROOM.VN
                    </span>
                  </span>
                  <div>
                  </div>
                </NavbarItem>
              </NavbarContent>

              <NavbarContent as="div" className="items-center" justify="end">
                <NavbarItem>
                  <Link color="foreground" href="#">
                    guest
                  </Link>
                </NavbarItem>

                <Dropdown placement="bottom-end">
                  <DropdownTrigger>
                    <Avatar
                      isBordered
                      as="button"
                      className="transition-transform"
                      color="secondary"
                      name="Archiroom.VN"
                      size="sm"
                      src="/logo-s.png"
                    />
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Profile Actions" variant="flat">
                    <DropdownItem key="profile" className="h-14 gap-2">
                      <p className="font-semibold">Đăng nhập với </p>
                      <p className="font-semibold">guest</p>
                    </DropdownItem>
                    <DropdownItem key="settings">Nâng cấp tài khoản</DropdownItem>
                    <DropdownItem key="logout" color="danger">
                      Đăng xuất
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </NavbarContent>
            </Navbar>
          </div>

          {step === 0 ? (
            <div data-aos='zoom-in'
              data-aos-duraion={1000} className='px-24 pt-12 text-lg'>


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
                    src="archiroom/input-sample.jpg"
                    width={320}
                    height={334}
                    alt="Try On Step Image"
                  />
                  <p className="step-description text-slate-800 text-[18px] font-bold mt-[24px] text-center">
                    Tải lên phác thảo thiết kế của bạn

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
                  <Image2
                    className='rounded-2xl b-solid b-1 border-slate-100 '
                    src="https://app.requestly.io/delay/5000/https://archiroom.vn/archiroom/output-sample-1.jpg"
                    width={320}
                    height={334}
                    alt="Try On Step Image"
                  />
                  <p className="step-description text-slate-800 text-[18px] font-bold mt-[24px] text-center">
                    AI sẽ hiện thực các phương án
                  </p>
                </div>
              </div>

            </div>
          ) : null}

          {step === 0.5 && mode == 'prompt-base' ? (
            <div data-aos='zoom-in'
              data-aos-duraion={1000} className='px-6  pt-2 text-lg'>

              <div className='w-full flex'>

                <Textarea
                  isRequired
                  isReadOnly={isLoading}
                  value={prompt}
                  onValueChange={setPrompt}
                  labelPlacement="outside"
                  autoFocus={true}
                  size='lg'
                  placeholder="Điền các yếu tố muốn ra lệnh"
                  className="mx-auto max-w-4xl cursor-pointer font-display text-[18px] font-bold mt-[1px] bg-gray-100 text-slate-900 sm:text-7xl mt-2"
                />
                <div className="w-[200px] mt-6 items-center justify-center box-border rounded-full hidden lg:block to-blue-gd p-[1px]">
                  <Button
                    isLoading={isLoading}
                    onClick={() => { }}
                    className="w-full  font-medium rounded-full py-1  bg-white text-slate-800 px-[50px]"
                  >
                    Re-Generate
                  </Button>
                </div>
              </div>


              <div className="w-full mb-[60px] hidden lg:flex">
                <div
                  className="grid grid-cols-2 gap-12 my-12  items-center shrink-0  "
                  data-aos="fade-right"
                  data-aos-easing="ease-in-out"
                  data-aos-delay={200}
                  data-aos-duraion={1000}
                >
                  {chatGPTDesignPrompts.map(i => (
                    <div
                      key={i}
                      className="flex flex-col relative overflow-hidden h-auto text-foreground box-border bg-content1 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-medium rounded-large transition-transform-background motion-reduce:transition-none w-[420px]"
                      tabIndex={-1}
                    >
                      <div className="relative flex w-full p-3 flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased px-3 pb-1">
                        <div
                          className="relative shadow-black/5 shadow-none rounded-large"
                          style={{ maxWidth: "fit-content" }}
                        >
                          {" "}

                          <Image2
                            className="relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large aspect-video w-full object-cover object-top"
                            src="https://app.requestly.io/delay/5000/https://archiroom.vn/archiroom/output-sample-1.jpg"
                            width={"auto"}
                            height={334}
                            alt="Try On Step Image"
                          />

                        </div>
                        <span
                          aria-hidden="true"
                          className="w-px h-px block"
                          style={{ marginLeft: "0.25rem", marginTop: "0.5rem" }}
                        />
                        <div className="flex flex-col gap-2 px-2">
                          <p className="text-large font-medium">{i.title}</p>
                          {
                            (showPrompt && !showEditPrompt) && (<p className="text-small text-default-400">
                              {i.prompt}
                            </p>)
                          }
                          {
                            (showEditPrompt) && (
                              <Textarea
                                isRequired
                                value={i.prompt}
                                onValueChange={(evt) => { i.prompt = '' }}
                                labelPlacement="outside"
                                placeholder="Điền các yếu tố muốn ra lệnh"
                                className="mx-auto max-w-4xl cursor-pointer font-display text-4xl font-medium  text-slate-900 sm:text-7xl mt-8"
                              />
                            )
                          }

                        </div>
                      </div>
                      <div className="p-3 h-auto flex w-full items-center overflow-hidden color-inherit subpixel-antialiased rounded-b-large justify-end gap-2">
                        <button
                          onClick={() => { setShowPrompt(!showPrompt); setShowEditPrompt(false) }}
                          className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-4 min-w-20 h-10 text-small gap-2 rounded-medium w-full [&>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none bg-transparent text-default-foreground data-[hover=true]:bg-default/40"
                          type="button"
                        >
                          {showPrompt ? "Ẩn mô tả" : "Hiện mô tả"}
                        </button>
                        <button
                          onClick={() => { setShowPrompt(!showPrompt), setShowEditPrompt(!showEditPrompt); }}
                          className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-4 min-w-20 h-10 text-small gap-2 rounded-medium w-full [&>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none bg-default text-default-foreground data-[hover=true]:opacity-hover"
                          type="button"
                        >
                          {showEditPrompt ? "Cập nhật" : "Chỉnh sửa"}
                        </button>
                      </div>
                    </div>


                  ))}

                </div>
              </div>
            </div>
          ) : null}

          {step === 1 ? (

            imageResponseArr && (<RenderSDOutut
              isLoading={isLoading}
              hasOutput={hasOutput}
              isUploadingImage={isUploadingImage}
              imageUploadedUrl={imageUploadedUrl}
              imageResponseArr={imageResponseArr}
              counter={counter}
              prompt={prompt}
              genConfig={genConfigurations}
              numberOfOutput={numberOfOutput}
            />)



          ) : null}

          {
            isLoading && (
              <div className='flex min-h-screen w-full flex-col items-center gap-4 mt-[50px] text-slate-800' > <Progress
                aria-label="Downloading..."
                size="lg"
                value={progressValue}
                color='primary'
                showValueLabel={true}
                className="max-w-xl"
              /></div>)
          }

          {/* Footer */}

          {step === 0 ? (
            <>
              <div className="w-full lg:w-auto h-[40px] box-border rounded-full hover:bg-white hidden lg:block to-blue-gd p-[1px]">

                <Button
                  onClick={() => setStep(0.5)}
                  className="w-full lg:w-auto text-white font-medium rounded-full py-1  bg-slate-800 px-[50px] hover:shadow-purple-300 hover:shadow-[0_0_20px_5px_rgba(0,0,0,0.1)] duration-300"
                >
                  Bắt đầu
                </Button>
              </div>
            </>
          ) : null}



        </div>


      </div>

      <History />
    </div>
  )
}


const RenderSDOutut = (props) => {
  const {
    isLoading, numberOfOutput, hasOutput, isUploadingImage, imageUploadedUrl, imageResponseArr, counter, isEnable, genConfig, renderConfig, prompt
  } = (props)

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [response, setResponse] = useState(imageResponseArr ?? ARCHIROOM_TOOL_CONFIG.responseDefault);
  console.log("response");
  console.log(response);
  if (response.outputs?.length == 0) return (<></>)
  return (<>
    <div className='w-full  px-8'>
      <span className="text-slate-800 inline font-normal text-sm">
        {/* {`${genConfigurations["genType"]}, ${genConfigurations["genStyle"]}, ${genConfigurations["genMaterial"]}, ${genConfigurations["genExactly"]}`} : <br /> */}
        {prompt}
      </span>
      <Card key={selectedIndex} className="w-full lg:w-1/2 mx-auto   my-4 cursor-pointer">
        <CardHeader className="absolute w-auto z-10 top-1 flex-col items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">{response.outputs[selectedIndex]?.title}</p>
        </CardHeader>
        <ImageComparison url1={imageUploadedUrl} url2={'data:image/jpeg;charset=utf-8;base64,' + response.outputs[selectedIndex]?.image} />
        <CardFooter className="absolute w-auto right-0 rounded-lg  top-0 border-t-1 border-zinc-100/50 z-10 justify-between">

          <Button className="text-tiny" color="primary" radius="full" size="sm">
            Tải xuống
          </Button>
        </CardFooter>
      </Card>


    </div>
    <div className="w-full gap-2 ">
      <span className="text-slate-800 inline font-semibold text-lg px-8"> Các phương án :</span>
      <div className=" grid grid-cols-12 grid-rows-4 ">
        {
          response.outputs.map((item, index) => (
            (<Card
              key={item?.id}

              className="w-auto h-[150px] col-span-12 sm:col-span-3 mx-8 my-4 cursor-pointer">
              <CardHeader className="absolute w-auto z-10 top-1 flex-col items-start">
                <p className="text-tiny text-white/60 uppercase font-bold">{item?.title}</p>
              </CardHeader>
              <Image2
                onClick={() => { setSelectedIndex(item?.id - 1); console.log(item?.id) }}
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover"
                src={'data:image/jpeg;charset=utf-8;base64,' + item?.image}
              />
              <CardFooter className="absolute w-full right-0 rounded-lg bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                <div>
                  <p className="text-white text-tiny">Click vào từng ảnh để xem <br /></p>
                </div>

              </CardFooter>
            </Card>
            )))
        }
      </div>
    </div>




  </>

  );

}


export const History = () => {

  return (<div
    className="absolute float-right bottom-0 right-0  h-[300px] text-foreground box-border bg-content1 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-medium rounded-large transition-transform-background motion-reduce:transition-none "
    tabIndex={-1}
  >
    <a
      href="/authenticate"
      className="group inline-flex px-2 items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-3 min-w-16 h-8 text-tiny gap-2 rounded-full [&>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none bg-default text-default-foreground data-[hover=true]:opacity-hover absolute right-2 top-8 z-10"
      type="button"
    >
      Nâng cấp tài khoản
    </a>
    <div className="flex w-full mt-10 flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased relative min-h-[200px] bg-gradient-to-br from-content1 to-default-100/50 p-8 before:inset-0 before:h-full before:w-full before:content-['']">
      <div className="p-1  flex w-full items-center color-inherit subpixel-antialiased rounded-b-large bottom-0 h-[auto] overflow-visible bg-content1  duration-300 ease-in-out transition-height border-t-1 border-default-100">
        <ul>
          {
            ["Không giới hạn lượt dùng", " Chất lượng HD", "Lưu lại lịch sử", "Chia sẻ tài khoản", " Chỉnh sửa prompt nâng cao", "Thêm nhiều phương án hơn"].map(item => (
              <li key={item} className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  className="text-default-600 iconify iconify--ci"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m6 12l4.243 4.243l8.484-8.486"
                  />
                </svg>
                <p className="text-small text-default-500">{item}</p>
              </li>

            ))
          }

        </ul>
        <br />

      </div>

      <AvatarGroup isGrid max={3} className='mt-4'>
        <Avatar src="https://app.requestly.io/delay/5000/https://archiroom.vn/archiroom/output-sample-1.jpg" />
        <Avatar src="https://app.requestly.io/delay/5000/https://archiroom.vn/archiroom/output-sample-1.jpg" />
        <Avatar src="https://app.requestly.io/delay/5000/https://archiroom.vn/archiroom/output-sample-1.jpg" />
        <Avatar src="https://app.requestly.io/delay/5000/https://archiroom.vn/archiroom/output-sample-1.jpg" />
      </AvatarGroup>
    </div>

  </div>)
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
