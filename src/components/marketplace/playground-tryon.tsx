import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Chip,
  cn,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Progress,
  Select,
  SelectItem,
  useDisclosure,
} from '@nextui-org/react'
import { Image as Image2 } from '@nextui-org/react'
import confetti from 'canvas-confetti'
import * as ImageJS from 'image-js'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { useCallback, useRef, useState } from 'react'
import React from 'react'
import Webcam from 'react-webcam'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'


import { clothesDataset, modelDataset } from '~/components/staticData'
import TypingEffect from '~/components/TypingEffect'
import { TryOnViewModel, vtoService } from '~/services/VTOService'

import checked from './components/background-images/checked.svg'
import closeIcon from './components/background-images/closeIcon.svg'
import combineIcon from './components/background-images/combineIcon.svg'
import modalLogo from './components/background-images/modal-logo.svg'
import resultIcon from './components/background-images/resultIcon.svg'
import upload from './components/background-images/upload.svg'
import UploadHumanBody from './components/UploadHumanBody'
import { imageKitService } from './components/ImageKitService'
import MoreModel from './components/more-model'




enum PICTURE_SOURCE {
  UPLOAD,
  CAMERA,
  SOCIAL,
  SAMPLE,
}

export default function PlayGroundTryOn({ status = true, onCloseEvent, currentStep = 0, currentHumanUrl = '', currentClotheUrl = '', currentProductReferUrl = '', currentProductReferProvider = '' }) {
  console.log("currentStep: " + currentStep)
  const router = useRouter()
  const { slug } = router.query
  const [currentUser, setCurrentUser] = useState<UserEntity>({ id: 'guest', bizId: '' })
  const { isOpen, onOpen, onOpenChange } = useDisclosure({
    isOpen: status,
    onClose: onCloseEvent,
  })
  const [step, setStep] = useState(currentStep)
  const [isLoading, setIsLoading] = useState(false)
  const [isUploadingHuman, setIsUploadingHuman] = useState(false)
  const [displayAIComment, setDisplayAIComment] = useState(false)
  const [isUploadingClothes, setIsUploadingClothes] = useState(false)
  const [selectedFile, setSelectedFile] = useState()
  const [isFilePicked, setIsFilePicked] = useState(false)
  const [picSource, setPicSOurce] = useState(null)
  const [images, setImages] = useState<string[]>([])
  const [selectedHumanIndex, setSelectedHunamIndex] = useState<number>()
  const [isImagesInvalid, setIsImagesInvalid] = useState(true)
  const fileInputRef = useRef<any>()
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0])
    setIsFilePicked(true)
  }
  const [counter, setCounter] = useState(0);
  const [startCallAPI, setStartCallAPI] = useState(false);
  const [startDate, setStartDate] = useState(0);
  const [totalTimming, setTotalTimming] = useState(0);
  const modelsPreview = [


    modelDataset.models[1],
    modelDataset.models[2],
    modelDataset.models[24],
    modelDataset.models[28]
  ];

  const clothesPreview = [
    clothesDataset.models[0],
    clothesDataset.models[1],
    clothesDataset.models[2],
    clothesDataset.models[3],
    clothesDataset.models[4],
    clothesDataset.models[8],
    clothesDataset.models[9],
    clothesDataset.models[10],
  ];
  const [groupType, setGroupType] = useState('');



  React.useEffect(() => {
    playTryOnByDefault();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep, currentHumanUrl, currentClotheUrl]);

  // This is the promise code, so this is the useful bit
  const ensureCallAPIVTO = useCallback(async (timeout = 200000) => {
    var start = Date.now();
    setStartDate(start);
    return new Promise(waitForUploadedAllImages); // set the promise object within the waitForUploadedAllImages object

    // waitForUploadedAllImages makes the decision whether the condition is met
    // or not met or the timeout has been exceeded which means
    // this promise will be rejected
    function waitForUploadedAllImages(resolve, reject) {
      if ((currentUser.mainBodyPhoto && currentUser.mainClothesPhoto)) {

        setCounter((v) => (v <= 10 ? 10 : v + 1));
        setStartCallAPI(true)
        resolve(isUploadingHuman);
      }

      else if (timeout && (Date.now() - start) >= timeout) {

        setCounter(0);
        reject(new Error("timeout"));
      }

      else {
        setCounter((v) => (v >= 100 ? 0 : v + 1));




        setTimeout(waitForUploadedAllImages.bind(this, resolve, reject), 300);
      }
    }
  }, [isUploadingHuman, currentUser.mainBodyPhoto, currentUser.mainClothesPhoto])

  const generateVtoRest = useCallback(async () => {
    console.log("generateVtoRest")
    // clear current data
    currentUser.predictedPhotos = []; // hoặc image loading ở đây
    currentUser.mainPredictedPhoto = '';
    setCurrentUser(currentUser)
    setIsLoading(true)
    setStartDate(Date.now())

    const interval = setInterval(() => {
      setCounter((v) => ((v >= 80) ? 10 : v + 1));
    }, 1200);
    // This runs the promise code
    ensureCallAPIVTO().then(async function () {
      if (!currentUser.mainBodyPhoto || !currentUser.mainClothesPhoto) {
        debugger
        alert('Invalid params! Missing required input.')
        return;
      }

      console.log("groupType")
      console.log(groupType)

      await vtoService.uploadSrcHumanClothRestV2(new TryOnViewModel({
        clothesImageSrc: currentUser.mainClothesPhoto,
        humanBodyImageSrc: currentUser.mainBodyPhoto,
        clothesType: groupType.toLocaleLowerCase(),
        productId: null
      })).then((res) => {


        setCounter((v) => (100));

        var info = res.data?.data.data.info;
        var origin = res.data?.origin;
        if (info["url-image"] instanceof Array) {
          if (info["url-image-hd"] instanceof Array) {
            info["url-image-hd"].forEach(imageUrl => {
              currentUser.mainPredictedPhotoHD = imageUrl;
            });
            currentUser.predictedPhotosHD = info["url-image-hd"];
          }

          if (info["url-image"] instanceof Array) {
            info["url-image"].forEach(imageUrl => {
              currentUser.mainPredictedPhoto = imageUrl;
            });

            currentUser.predictedPhotos = info["url-image"];
          }
        } else {
          currentUser.mainPredictedPhoto = info["url-image"];
          currentUser.predictedPhotos = [origin?.humanBodyImageSrc, origin?.clothesImageSrc]
        }
        currentUser.mainBodyPhoto = origin?.humanBodyImageSrc;
        currentUser.mainClothesPhoto = origin?.clothesImageSrc;
        setCurrentUser({ ...currentUser })
        handleConfetti()
      }).catch((error) => {

        alert('Xin lỗi. Hệ thống chúng tôi gặp sự cố quá tải. Xin vui lòng thử lại sau...');
        setCurrentUser({})
        setCounter((v) => (0));
        setDisplayAIComment(false)
      }).finally(() => {
        const time = (Date.now() - startDate) / 1000;
        setTotalTimming(time);
        setIsLoading(false)
        setDisplayAIComment(true)
        clearInterval(interval);


      })
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, startDate, ensureCallAPIVTO])

  const pickSampleModel = (sampleItem) => {

    currentUser.mainBodyPhoto = (sampleItem.url as string).startsWith("http") ? sampleItem.url : ("https://www.tryonhub.ai" + sampleItem.url)
    setCurrentUser(currentUser)
    setStep(3)
  }

  const playTryOnByDefault = () => {
    currentUser.mainClothesPhoto = (currentClotheUrl)
    currentUser.mainBodyPhoto = (currentHumanUrl)
    setCurrentUser(currentUser)
    // generateVtoSk()
    if (currentClotheUrl && currentHumanUrl) {
      console.log("playTryOnByDefault")
      setStep(3.5)

    }
  }

  const pickSampleClothes = (sampleItem) => {
    currentUser.mainClothesPhoto = (sampleItem.url as string).startsWith("http") ? sampleItem.url : ("https://www.tryonhub.ai" + sampleItem.url)
    setCurrentUser(currentUser)
    // generateVtoSk()
    setStep(3.5)
  }

  const uploadTrigger = () => {
    fileInputRef?.current.click()
  }

  // upload clothes photo
  const handleClothingImageUpload = useCallback(
    async (event: any) => {
      const file = event.target.files[0]

      if (file) {
        setIsUploadingClothes(true);

        const imageUrl = URL.createObjectURL(file)
        const img = await ImageJS.Image.load(imageUrl)
        currentUser.mainClothesPhoto = '';

        imageKitService
          .upload({
            file: img.toDataURL(),
            fileName: 'clothes.jpg',
          })
          .then((uploaded) => {


            currentUser.mainClothesPhoto = uploaded.url + "?tr=w-768,h-1024";// using imagekit auto resize
            setCurrentUser(currentUser)
            setIsUploadingClothes(false);


          })
        setStep(3.5)
      }
    },
    [currentUser],
  )

  const uploadHumanImageKit = useCallback(async (imageUrl) => {

    setIsUploadingHuman(true);
    imageUrl = imageUrl ?? images[selectedHumanIndex ?? 0];
    currentUser.mainBodyPhoto = '';


    // ImageCrop(imageUrl, 1024, 768).then(canvas => {
    //   const resizedImageURL = canvas.toDataURL("image/jpg");

    imageKitService
      .upload({
        file: imageUrl,
        fileName: 'human.jpg',
      })
      .then((uploaded) => {



        setIsUploadingHuman(false)
        currentUser.mainBodyPhoto = uploaded.url + "?tr=w-768,h-1024";// using imagekit auto resize
        setCurrentUser(currentUser)
        localStorage.setItem("HUMAN_IMAGE_URL_UPLOADED", currentUser.mainBodyPhoto);
      })

    //});

  }, [selectedHumanIndex, currentUser, images])

  const onNextToStep3 = useCallback(async () => {
    await uploadHumanImageKit(null)
    setStep(3)
  }, [uploadHumanImageKit])

  // upload human body
  const handleMultiBodyImageUpload = useCallback(
    async (bodyDetectedImages: string[], originalUploadedImage: string) => {



      // nếu có nhiều ảnh chứa nhiều human
      if (bodyDetectedImages.length >= 2) {
        setImages(bodyDetectedImages)
        setStep(2)
      }
      // nếu chỉ có 1 ảnh duy nhất, 

      else {
        setImages(bodyDetectedImages)
        // TODO: Bypass temporary no crop
        //uploadHumanImageKit(images[0])
        uploadHumanImageKit(originalUploadedImage)

        setStep(3)
      }
    },
    [uploadHumanImageKit],
  )

  const handleConfetti = () => {
    var scalar = 2
    var pineapple = confetti.shapeFromText({ text: '🍍', scalar })
    confetti({
      shapes: [pineapple],
      particleCount: 300,
      startVelocity: 50,
      spread: 360,
      origin: {
        x: Math.random(),
        // since they fall down, start a bit higher than random
        y: Math.random() - 0.5,
      },
    })
  }


  return (
    <div className="scroll-smooth md:scroll-auto" id="fullpage">
      <Modal
        classNames={{
          closeButton: 'hidden',
        }}
        scrollBehavior="inside"
        isDismissable={true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onCloseEvent}
        placement="center"
        size="5xl"
        className="px-[20px] py-[40px] lg:px-[60px] lg:py-[50px]"
      >
        <ModalContent className="relative">
          {(onClose) => (
            <>
              <ModalBody>
                <Button
                  onPress={() => {
                    if (isLoading) {
                      //prompt("Your image still processing. Please wait for our AI a second to think!....", )
                      return;
                    }

                    onClose()
                    setStep(0)
                  }}
                  className="bg-transparent absolute right-0 top-[20px]"
                >
                  <Image
                    src={closeIcon}
                    width={20}
                    height={20}
                    alt="Try On Step Image"
                  />
                </Button>
                {step === 0 ? (
                  <>
                    <h2 className="text-black text-base lg:text-[30px] font-bold mb-[60px] flex items-center gap-[10px]">
                      <Image
                        src={modalLogo}
                        width={42}
                        height={42}
                        alt="Try On Step Image"
                        className="w-[30px] h-[30px] lg:w-[42px] lg:h-[42px]"
                      />
                      Hi, This is how our AI helps you try on clothes
                    </h2>
                    <div className="try-on-steps justify-between items-center mb-[60px] hidden lg:flex">
                      <div
                        className="try-on-step flex flex-col items-center shrink-0"
                        data-aos="fade-right"
                        data-aos-easing="ease-in-out"
                        data-aos-delay={200}
                        data-aos-duraion={1000}
                      >
                        <Image
                          src={"/images/intro-image-step-1.jpg"}
                          width={118}
                          height={134}
                          alt="Try On Step Image"
                        />
                        <p className="step-description text-[18px] font-bold mt-[24px] text-center">
                          Upload your{' '}
                          <span className="bg-gradient-to-r from-purple-gd to-blue-gd bg-clip-text text-transparent">
                            body photo
                          </span>
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
                        <Image
                          src={"/images/intro-image-step-2.jpg"}
                          width={118}
                          height={134}
                          alt="Try On Step Image"
                        />
                        <p className="step-description text-[18px] font-bold mt-[24px] text-center">
                          Upload the out fit you want to try
                        </p>
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
                          src={"/images/intro-image-step-3.jpg"}
                          width={118}
                          height={134}
                          alt="Try On Step Image"
                        />
                        <p className="step-description text-[18px] font-bold mt-[24px] text-center">
                          See the magic!
                        </p>
                      </div>
                    </div>
                    <div className="try-on-steps-mobile lg:hidden">
                      <Swiper
                        pagination={{
                          dynamicBullets: true,
                          bulletClass: 'normal-swiper-slide-grey',
                          bulletActiveClass: 'active-swiper-slide-gradient',
                        }}
                        loop={true}
                        modules={[Autoplay, Pagination]}
                        autoplay={{
                          delay: 3000,
                          disableOnInteraction: false,
                        }}
                        spaceBetween={0}
                        slidesPerView={1}
                      >
                        <SwiperSlide>
                          <div className="try-on-step flex flex-col items-center shrink-0 mb-[50px]">
                            <Image
                              src={"/images/intro-image-step-1.jpg"}
                              width={230}
                              height={260}
                              alt="Try On Step Image"
                            />
                            <p className="step-description text-[18px] font-bold mt-[24px] text-center">
                              Upload your{' '}
                              <span className="bg-gradient-to-r from-purple-gd to-blue-gd bg-clip-text text-transparent">
                                body photo
                              </span>
                            </p>
                          </div>
                        </SwiperSlide>

                        <SwiperSlide>
                          <div className="try-on-step flex flex-col items-center shrink-0 mb-[50px]">
                            <Image
                              src={"/images/intro-image-step-2.jpg"}
                              width={230}
                              height={260}
                              alt="Try On Step Image"
                            />
                            <p className="step-description text-[18px] font-bold mt-[24px] text-center">
                              Upload the out fit you want to try
                            </p>
                          </div>
                        </SwiperSlide>

                        <SwiperSlide>
                          <div className="try-on-step flex flex-col items-center shrink-0 mb-[50px]">
                            <Image
                              src={"/images/intro-image-step-3.jpg"}
                              width={230}
                              height={260}
                              alt="Try On Step Image"
                            />
                            <p className="step-description text-[18px] font-bold mt-[24px] text-center">
                              See the magic!
                            </p>
                          </div>
                        </SwiperSlide>
                      </Swiper>
                    </div>
                  </>
                ) : null}

                {step === 1 ? (
                  <>
                    <h2 className="text-black text-base lg:text-[30px] font-bold mb-[20px] lg:mb-[30px] flex items-center gap-[10px]">
                      <Image
                        src={modalLogo}
                        width={42}
                        height={42}
                        alt="Try On Step Image"
                        className="w-[30px] h-[30px] lg:w-[42px] lg:h-[42px]"
                      />
                      Step 1: Upload your full body photo
                    </h2>
                    <div className="photo-options grid grid-cols-1 lg:grid-cols-2 gap-[10px] lg:gap-[30px]">
                      <div className="upload bg-gradient-to-r from-purple-gd to-blue-gd rounded-[10px] p-[2px]">
                        <div className="w-full h-full bg-white rounded-[8px] p-[15px] lg:p-[36px] hover:bg-gradient-to-r hover:from-purple-500/[.05] hover:to-blue-500/[.05] duration-300">
                          <div className="options flex justify-center mb-[15px]">
                            <div className="hover:scale-125 duration-300">

                              <UploadHumanBody
                                active={false}
                                checkMultiHuman={false}
                                onBodyDetected={handleMultiBodyImageUpload}
                              />
                            </div>
                            <div
                              className=""

                            >

                            </div>
                          </div>
                          <p className="text-[12px] lg:text-base text-center font-medium bg-gradient-to-r from-purple-gd to-blue-gd bg-clip-text text-transparent">
                            Upload your body photo
                          </p>
                        </div>
                      </div>
                      <div className="social  rounded-[10px] p-[2px] delay-500 ">
                        <div className="w-full h-full bg-white rounded-[8px] hover:bg-gradient-to-r hover:from-purple-500/[.05] hover:to-blue-500/[.05] duration-300">

                          <div className="options  justify-start">
                            <p className="text-[12px] lg:text-base text-center font-medium bg-gradient-to-r from-purple-gd to-blue-gd bg-clip-text text-transparent">
                              Tips for good input:
                            </p>
                            <section className='p-[5px] mt-1 '>
                              <div className="py-1 pt-0 pb-6 text-base text-default-500 flex" >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                </svg>
                                Full body image
                              </div>
                              <div className="py-1 pt-0 pb-6 text-base text-default-500 flex" >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                </svg>
                                Standing straight view
                              </div>
                              <div className="py-1 pt-0 pb-6 text-base text-default-500 flex" >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                </svg>
                                The photo does not contain many people
                              </div>
                            </section>
                          </div>

                        </div>
                      </div>
                    </div>
                    {picSource === PICTURE_SOURCE.CAMERA ? <Webcam /> : null}
                    <div className='w-full flex justify-around items-center'>
                      <div />
                      <h4 className="text-[14px] lg:text-[18px] font-bold text-center mt-[20px] mb-[20px]">
                        Or try customizing a model similar to you
                      </h4>
                      <button
                        onClick={() => { setStep(5) }}
                        className="w-[34px] h-[34px] lg:w-[47px] lg:h-[47px] hover:scale-[1.2] duration-250 animate-ping animate-pulse ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-purple-800">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                        </svg>
                      </button>
                    </div>
                    <div className="relative model-images flex mb-[25px]">

                      <div className="relative model-images flex mb-[25px]">
                        {
                          currentUser?.mainBodyPhoto && (
                            <div

                              onClick={() => {
                                pickSampleModel({ url: currentUser.mainBodyPhoto })
                                setStep(3)
                              }}
                              className="model-image cursor-pointer flex flex-col items-center p-[4px] bg-[#fff8f8] rounded mr-[10px]">
                              <Image2 src={currentUser.mainBodyPhoto} width={80} height={120} alt={"item.name"} className="rounded" />
                              {/* <p className="text-[14px] font-bold mt-[5px]">{item.name}</p> */}
                            </div>
                          )
                        }

                        {
                          modelsPreview.map((item, index) => (
                            <div
                              key={index}
                              onClick={() => {
                                pickSampleModel(item)
                                setStep(3)
                              }}
                              className="model-image cursor-pointer flex flex-col items-center p-[4px] bg-[#fff8f8] rounded mr-[10px]">
                              <Image2 src={item.url} width={80} height={120} alt={item.name} className="rounded" />
                              {/* <p className="text-[14px] font-bold mt-[5px]">{item.name}</p> */}
                            </div>))
                        }
                      </div>


                      <button onClick={() => { setStep(1.5) }} className="more-model z-50 absolute right-[-20px] top-[40px] rounded-full bg-[#afafaf] text-white w-[80px] h-[50px] flex items-center justify-center">
                        <span className="text-xs">More</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                      </button>
                    </div>
                  </>
                ) : null}

                {
                  step === 1.5 ? <>
                    <h3 className="text-purple-plugin text-center text-[20px] font-bold mt-[30px] mb-[5px]">CHOOSING A MODEL SIMILAR TO YOU</h3>
                    <p className="text-purple-plugin text-base text-center mb-[20px]">best similar to you</p>

                    <MoreModel onSelectedModel={pickSampleModel} />

                    <button
                      data-aos="fade-up"
                      onClick={() => { setStep(0) }}
                      data-aos-duration={2000}
                      className="relative try-on-now-btn rounded-full bg-gradient-to-r from-purple-gd to-blue-gd text-white text-base px-[20px] py-[10px] w-full md:w-auto mt-[20px]"
                    >
                      BACK
                    </button>
                  </> : null
                }

                {step === 2 ? (
                  <>
                    <h2 className="text-black text-base lg:text-[30px] font-bold mb-[30px] lg:mb-[60px] flex items-center gap-[10px]">
                      <Image
                        src={modalLogo}
                        width={42}
                        height={42}
                        alt="Try On Step Image"
                        className="w-[30px] h-[30px] lg:w-[42px] lg:h-[42px]"
                      />
                      Step 2: Adjust your photo
                    </h2>
                    <div className="validate-image-container  to-blue-gd rounded-[10px]">
                      <div className="w-full content">
                        <div
                          className="checked-item mb-[30px] flex gap-[15px]"
                          data-aos="fade-right"
                          data-aos-delay={600}
                          data-aos-duraion={1000}
                          data-aos-easing="ease-in-out"
                        >
                          <Image
                            src={checked}
                            width={20}
                            height={20}
                            alt="validated point icon"
                          />
                          <p className="validate-point text-base">
                            <TypingEffect
                              message={'Please tell me who you are?'}
                            />
                          </p>
                        </div>
                      </div>

                      <div className="content lg:flex  bg-white rounded-[8px] lg:p-[2px] m-[2px]">
                        <div className="validate-standard">
                          {/* <div className="checked-item mb-[30px] flex gap-[15px]"
                               data-aos='fade-right'
                               data-aos-delay={200}
                               data-aos-duraion={1000}
                               data-aos-easing='ease-in-out'
                          >
                            <Image
                              src={checked}
                              width={20}
                              height={20}
                              alt="validated point icon"
                            />
                            <p className="validate-point text-base">
                              Background removed
                            </p>
                          </div> */}
                        </div>
                        <div>
                          <div className="flex w-full mt-5">
                            {images.map((imgSrc, index) => (
                              <Checkbox
                                data-aos="zoom-in"
                                data-aos-duraion={1000}
                                data-aos-easing="ease-in-out"
                                color="secondary"
                                // value={index.toString()}
                                key={imgSrc}
                                classNames={{
                                  base: cn(
                                    'inline-flex w-full max-w-md bg-content1',
                                    'ml-auto flex items-center',
                                    'hover:bg-content2 items-center justify-start',
                                    'cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent',
                                    'data-[selected=true]:border-purple-700 m-4',
                                  ),
                                  label: 'w-full',
                                }}
                                isSelected={selectedHumanIndex === index}
                                onValueChange={() =>
                                  setSelectedHunamIndex(index)
                                }
                              >
                                <Image
                                  key={imgSrc}
                                  src={imgSrc}
                                  width={200}
                                  height={300}
                                  alt="validated point icon"
                                  className="rounded-[10px]"
                                />
                              </Checkbox>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}

                {step === 3 ? (
                  <>
                    <h2 className="text-black text-base lg:text-[30px] font-bold mb-[30px] lg:mb-[60px] flex items-center gap-[10px]">
                      <Image
                        src={modalLogo}
                        width={42}
                        height={42}
                        alt="Try On Step Image"
                        className="w-[30px] h-[30px] lg:w-[42px] lg:h-[42px]"
                      />
                      Step 3: Keep moving! Upload or choose clothes
                    </h2>
                    <div className="photo-options grid grid-cols-1 lg:grid-cols-2 gap-[30px] lg:gap-[60px]">
                      <div className="upload bg-gradient-to-r from-purple-gd to-blue-gd rounded-[10px] p-[2px]">
                        <div className="w-full h-full  bg-white rounded-[8px] p-[15px] lg:p-[36px]">
                          <div className="options  flex justify-center mb-[15px]">
                            <button>
                              <Image
                                className="cursor-pointer"
                                onClick={uploadTrigger}
                                src={upload}
                                width={49}
                                height={47}
                                alt="upload image"
                              />
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleClothingImageUpload}
                                ref={fileInputRef}
                              />
                            </button>
                          </div>
                          <p className="text-base text-center font-medium bg-gradient-to-r from-purple-gd to-blue-gd bg-clip-text text-transparent">
                            Upload a clothing photo
                          </p>
                        </div>


                      </div>
                      <div className=" h-full bg-white rounded-[8px] hover:bg-gradient-to-r hover:from-purple-500/[.05] hover:to-blue-500/[.05] duration-300">

                        <div className="options  justify-start">
                          <p className="text-[12px] lg:text-base text-center font-medium bg-gradient-to-r from-purple-gd to-blue-gd bg-clip-text text-transparent">
                            Tips for good input:
                          </p>
                          <section className='p-[5px] mt-1 '>
                            <div className="py-1 pt-0 pb-6 text-base text-default-500 flex" >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                              </svg>
                              The photo contains only 1 piece of clothing
                            </div>
                            <div className="py-1 pt-0 pb-6 text-base text-default-500 flex" >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                              </svg>
                              Standing straight view
                            </div>
                            <div className="py-1 pt-0 pb-6 text-base text-default-500 flex" >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                              </svg>
                              Photos must not be wrinkled or folded
                            </div>
                          </section>
                        </div>

                      </div>

                    </div>
                    <h4 className="text-[18px] lg:text-[24px] font-bold mt-[40px] mb-[30px]">
                      Or quickly use a sample
                    </h4>

                    <div className="relative model-images flex mb-[25px]">
                      {
                        clothesPreview.map((item, index) => (
                          <div
                            key={index}
                            onClick={() => {
                              pickSampleClothes(item)
                              setStep(3.5)
                            }}
                            className="model-image cursor-pointer flex flex-col items-center p-[4px] bg-[#fff8f8] rounded mr-[10px]">
                            <Image2 src={item.url} width={120} height={160} alt={item.name} className="rounded" />
                            {/* <p className="text-[14px] font-bold mt-[5px]">{item.name}</p> */}
                          </div>))
                      }
                      {/* 
                      <button onClick={() => { setStep(3.5) }} className="more-model z-50 absolute right-[-20px] top-[40px] rounded-full bg-[#afafaf] text-white w-[80px] h-[50px] flex items-center justify-center">
                        <span className="text-xs">More</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                      </button> */}
                    </div>


                  </>
                ) : null}

                {step === 3.5 ? (
                  <>
                    <h2 className="text-black text-base lg:text-[30px] font-bold mb-[30px] lg:mb-[60px] flex items-center gap-[10px]">
                      <Image
                        src={modalLogo}
                        width={42}
                        height={42}
                        alt="Try On Step Image"
                        className="w-[30px] h-[30px] lg:w-[42px] lg:h-[42px]"
                      />
                      Step 4: Review your input    <div className="flex w-full gap-4 max-w-xs">
                        <Chip color="default">  {groupType}</Chip>
                      </div>
                    </h2>
                    <div className="result-container lg:flex gap-[40px] w-full">
                      <div className="w-full sub-result lg:flex flex-col lg:w-1/2  sm-w-full lg:h-full flex items-center justify-center">
                        <div className="w-full sub-images lg:flex gap-[3px] justify-center lg:justify-start  mt-[2px] lg:mt-[4px]">
                          {currentUser.mainBodyPhoto && (
                            <Card className="py-4">
                              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                <p className="text-tiny uppercase font-bold">Human Body</p>

                              </CardHeader>
                              <CardBody className="overflow-visible py-2">
                                <Image2
                                  isZoomed
                                  src={currentUser.mainBodyPhoto}
                                  width={100} height={128}
                                  className=""
                                  alt="tryonhub mainBodyPhoto"
                                />
                              </CardBody>
                            </Card>
                          )}

                          {currentUser.mainClothesPhoto && (
                            <Card className="py-4">
                              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                <p className="text-tiny uppercase font-bold">Clothes Image</p>
                                <small className="text-default-500">{groupType}</small>
                              </CardHeader>
                              <CardBody className="overflow-visible py-2">
                                <Image2
                                  isZoomed
                                  src={currentUser.mainClothesPhoto}
                                  width={100} height={128}
                                  className=""
                                  alt="predicted image with delay"
                                />
                              </CardBody>
                            </Card>
                          )}
                        </div>
                      </div>
                      <div className="sub-result flex flex-col lg:w-1/2  sm-w-full lg:h-full flex items-center justify-center">
                        <div data-slot="main-wrapper" className="h-full w-full flex flex-col">
                          <TypingEffect message={'Where do you want to try?'} />
                          <div data-slot="inner-wrapper" className="inline-flex w-full items-center h-full box-border mt-4">
                            <Select defaultSelectedKeys={[groupType]} value={groupType} onChange={(e) => { setGroupType(e.target.value); }} label="What position you want to try?" className="max-w-xs">
                              <SelectItem key={"UPPERBODY"} value={"UPPERBODY"}>
                                Upper Body
                              </SelectItem>
                              <SelectItem key={"LOWERBODY"} value={"LOWERBODY"}>
                                Lower Body
                              </SelectItem>
                              <SelectItem key={"DRESS"} value={"DRESS"}>
                                Dress
                              </SelectItem>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}

                {step === 4 ? (
                  <>
                    <h2 className="text-black text-base lg:text-[30px] font-bold mb-[30px] lg:mb-[60px] flex items-center gap-[10px]">
                      <Image
                        src={modalLogo}
                        width={42}
                        height={42}
                        alt="Try On Step Image"
                        className="w-[30px] h-[30px] lg:w-[42px] lg:h-[42px]"
                      />
                      Step 4: See the magic!
                    </h2>
                    <div className="result-container lg:flex gap-[40px] w-full">
                      <div className="sub-result flex flex-col lg:w-1/2  sm-w-full lg:h-full flex items-center justify-center">

                        {currentUser.mainPredictedPhoto == null ? (
                          <>  <Image2
                            isZoomed
                            src={'/images/loading-gif.gif'}
                            width={380}
                            height={561}
                            className="mb-[20px] lg:mb-0 items-center algin-center justify-center"
                            alt="predicted image with delay"
                          />
                            <Progress
                              aria-label={totalTimming + "seconds"}
                              size="md"
                              value={counter}
                              color="secondary"
                              showValueLabel={true}
                              className="max-w-md"
                            />
                            {currentUser.mainPredictedPhoto == null && startCallAPI && ((Date.now() - startDate) > 10000) && (
                              <div className="rounded-full w-full px-12  mt-2 p-2 bg-gradient-to-r from-purple-gd to-blue-gd text-white z-50 from-purple-gd to-blue-gd">
                                <p className="start-sub-title text-purple-plugin text-white text-[12px] text-center">Please wait maximum 2 minutes. <br /> We are facing a long queue of requests pending....</p>
                              </div>
                            )}
                          </>
                        ) : (
                          <>
                            <Image2
                              isZoomed
                              onError={() => { currentUser.mainPredictedPhotoHD = currentUser.mainPredictedPhoto; }}
                              src={currentUser.mainPredictedPhoto}
                              fallbackSrc={currentUser.mainPredictedPhoto}
                              // width={380}
                              // height={100}
                              className="mb-[20px] lg:mb-0"

                              style={{
                                backgroundSize: "cover",
                                backgroundPosition: "center center",
                                backgroundRepeat: "no-repeat"
                              }}
                              alt="predicted image with delay"
                            />

                            <span className='px-2 text-xs'>{currentUser.mainPredictedPhoto}</span>

                            <div className='mt-12'>

                              {currentProductReferUrl && (
                                <a
                                  className="z-0 text-white group inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap subpixel-antialiased tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 border-medium px-4 min-w-20 h-10 gap-2 rounded-medium [&>svg]:max-w-[theme(spacing.8)] data-[pressed=true]:scale-[0.97] transition-transform-colors-opacity motion-reduce:transition-none border-default text-foreground data-[hover=true]:opacity-hover relative overflow-hidden bg-transparent text-sm font-normal"
                                  role="button"
                                  tabIndex={0}
                                  style={{
                                    border: "solid 2px transparent",
                                    backgroundImage:
                                      "linear-gradient(#050713, #050713), linear-gradient(to right, #F54180, #338EF7)",
                                    backgroundOrigin: "border-box",
                                    backgroundClip: "padding-box, border-box"
                                  }}
                                  target='_blank'
                                  href={currentProductReferUrl + "&tag=tryonhubai-20"}
                                >
                                  Buy it from {currentProductReferProvider}
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    aria-hidden="true"
                                    role="img"
                                    className="outline-none transition-transform group-data-[hover=true]:translate-x-0.5 [&>path]:stroke-[2.5px]"
                                    focusable="false"
                                    tabIndex={-1}
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      fill="none"
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="1.5"
                                      d="M4 12h16m0 0l-6-6m6 6l-6 6"
                                    />
                                  </svg>
                                </a>

                              )}

                            </div>
                          </>
                        )

                        }

                      </div>
                      <div className="sub-result flex py-2 lg:py-0 lg:w-1/2  sm-w-full">

                        <h4 className="text-[18px] lg:text-[24px] text-center lg:text-left font-bold">

                        </h4>

                        <div className="overflow-hidden grow relative rounded-[10px]">
                          <div className="absolute w-full h-full  to-blue-gd p-[30px] h-full opacity-10"></div>
                          <div className="text-base p-[15px] font-bold review bg-clip-text text-transparent">

                            {/* {
                              currentUser.mainPredictedPhoto && (<video loop={true} autoPlay={true} controls={true} id="vid" muted
                                className="rounded-[5px] w-full lg:h-[130px] lg:w-[420px] mb-10"
                              >
                                <source
                                  src={"/videos/animate-after-build.mp4"}
                                  type="video/mp4"
                                ></source>
                                Your browser does not support the video tag.
                              </video>)
                            } */}

                            {currentUser.predictedPhotos?.length && <span className='text-gray-800'>Variants:</span>}

                            <div className="sub-images flex gap-[3px] justify-center lg:justify-start  mt-[2px] lg:mt-[4px]">

                              {currentUser?.predictedPhotos && currentUser.predictedPhotos?.map((item, index) => (
                                <Image2
                                  key={index}
                                  isZoomed
                                  src={'https://app.requestly.io/delay/6000/' + item}

                                  onError={() => { currentUser.predictedPhotosHD = currentUser.predictedPhotos; }}
                                  width={100} height={128}
                                  className=""
                                  alt="predicted image with delay"
                                />
                              ))}
                            </div>
                            < br />
                            <span className='text-gray-800'> Original:</span>
                            <div className="sub-images flex gap-[3px] justify-center lg:justify-start  mt-[2px] lg:mt-[4px]">

                              {currentUser.mainBodyPhoto && (
                                <Image2
                                  isZoomed
                                  src={currentUser.mainBodyPhoto}
                                  width={100} height={128}
                                  className=""
                                  alt="predicted image with delay"
                                />
                              )}
                              {currentUser.mainClothesPhoto && (
                                <Image2
                                  isZoomed
                                  src={currentUser.mainClothesPhoto}
                                  width={100} height={128}
                                  className=""
                                  alt="predicted image with delay"
                                />
                              )}
                            </div>
                            {currentUser.predictedPhotos &&
                              (
                                <div className='bg-gradient-to-r from-purple-gd to-blue-gd  text-white opacity-80 p-4 rounded-lg w-full h-[106px] mt-8'>
                                  <TypingEffect message={'Looks very stylish! This outfit seems suitable for you on picnics.'} />
                                </div>
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}

                {/*  */}
                {step === 5 ? (
                  <>
                    <h2 className="text-black text-base lg:text-[30px] font-bold mb-[30px] lg:mb-[60px] flex items-center gap-[10px]">
                      <Image
                        src={modalLogo}
                        width={42}
                        height={42}
                        alt="Try On Step Image"
                        className="w-[30px] h-[30px] lg:w-[42px] lg:h-[42px]"
                      />
                      Customize your AI Model like you
                    </h2>
                    <div className="photo-options grid grid-cols-1 lg:grid-cols-2 gap-[30px] lg:gap-[60px]">
                      <div className="upload bg-gradient-to-r from-purple-gd to-blue-gd rounded-[10px] p-[2px]">
                        <div className="w-full h-full bg-white rounded-[8px] p-[15px] lg:p-[36px]">

                        </div>
                      </div>
                      <div className="social bg-gradient-to-r from-purple-gd to-blue-gd rounded-[10px] p-[2px]">

                      </div>
                    </div>

                  </>
                ) : null}
              </ModalBody>
              <ModalFooter className="flex-col lg:flex-row">
                {step === 0 ? (
                  <Button
                    onPress={() => setStep(1)}
                    className="w-full lg:w-auto text-white hover:shadow-purple-300 hover:shadow-[0_0_20px_5px_rgba(0,0,0,0.1)] duration-100 font-medium rounded-full bg-gradient-to-r from-purple-gd to-blue-gd px-[50px]"
                    data-aos="zoom-in"
                    data-aos-easing="ease-in-out"
                    data-aos-delay={1600}
                    data-aos-duraion={1000}
                  >
                    Let’s start!
                  </Button>
                ) : null}

                {step === 1 && currentUser.mainBodyPhoto ? (
                  <Button
                    onPress={() => setStep(2)}
                    disabled={currentUser.mainBodyPhoto == null}
                    className="w-full lg:w-auto hover:shadow-purple-300 hover:shadow-[0_0_20px_5px_rgba(0,0,0,0.1)] duration-300 text-white font-medium rounded-full bg-gradient-to-r from-purple-gd to-blue-gd px-[50px]"
                  >
                    Next
                  </Button>
                ) : null}

                {step === 2 ? (
                  <>
                    <div className="w-full lg:w-auto h-[40px] box-border rounded-full hover:bg-white bg-gradient-to-r from-purple-gd to-blue-gd p-[1px]">
                      {images?.length > 1 && (
                        <Button
                          onPress={() => {
                            setStep(1)
                          }}
                          className="bg-white rounded-full h-[38px] w-full hover:shadow-purple-300 hover:shadow-[0_0_20px_5px_rgba(0,0,0,0.1)] duration-300 lg:w-auto"
                        >
                          <span className="bg-gradient-to-r font-bold from-purple-gd to-blue-gd bg-clip-text text-transparent">
                            Retry
                          </span>
                        </Button>
                      )}
                    </div>
                    <Button
                      onPress={() => {
                        onNextToStep3()
                      }}

                      className="w-full lg:w-auto text-white font-medium rounded-full bg-gradient-to-r from-purple-gd to-blue-gd px-[50px] hover:shadow-purple-300 hover:shadow-[0_0_20px_5px_rgba(0,0,0,0.1)] duration-300"
                    >
                      Next
                    </Button>
                  </>
                ) : null}

                {step === 3 ? (
                  <>
                    <div className="w-full lg:w-auto h-[40px] box-border rounded-full bg-gradient-to-r from-purple-gd to-blue-gd p-[1px]">
                      <Button
                        onPress={() => {
                          setStep(1)
                        }}
                        className="bg-white rounded-full h-[38px] w-full lg:w-auto"
                      >
                        <span className="bg-gradient-to-r font-bold from-purple-gd to-blue-gd bg-clip-text text-transparent">
                          Back
                        </span>
                      </Button>
                    </div>
                    <Button
                      disabled={currentUser.mainClothesPhoto == null}
                      onPress={() => {


                        setStep(3.5)
                      }}
                      className="w-full lg:w-auto text-white font-medium rounded-full bg-gradient-to-r from-purple-gd to-blue-gd px-[50px]"
                    >
                      Next
                    </Button>
                  </>
                ) : null}

                {step === 3.5 ? (
                  <>
                    <div className="w-full lg:w-auto h-[40px] box-border rounded-full bg-gradient-to-r from-purple-gd to-blue-gd p-[1px]">
                      <Button
                        onPress={() => {
                          setStep(3)
                        }}
                        className="bg-white rounded-full h-[38px] w-full lg:w-auto"
                      >
                        <span className="bg-gradient-to-r font-bold from-purple-gd to-blue-gd bg-clip-text text-transparent">
                          Back
                        </span>
                      </Button>
                    </div>
                    <Button
                      disabled={groupType == null}
                      onPress={() => {
                        setStep(4)

                        generateVtoRest()
                      }}
                      className="w-full lg:w-auto text-white font-medium rounded-full bg-gradient-to-r from-purple-gd to-blue-gd px-[50px]"
                    >
                      See the magic
                    </Button>
                  </>
                ) : null}


                {step === 4 ? (
                  <>
                    {/* <div className="w-full lg:w-auto h-[40px] box-border rounded-full bg-gradient-to-r from-purple-gd to-blue-gd p-[1px]">
                      <Button
                        onPress={() => {
                          setStep(2)
                        }}
                        className="bg-white rounded-full h-[38px] w-full lg:w-auto"
                      >
                        <span className="bg-gradient-to-r font-bold from-purple-gd to-blue-gd bg-clip-text text-transparent">
                          Back
                        </span>
                      </Button>
                    </div> */}
                    <Button
                      onPress={() => {
                        onClose()
                        setStep(0)
                      }}
                      className="w-full lg:w-auto text-white font-medium rounded-full bg-gradient-to-r from-purple-gd to-blue-gd px-[50px]"
                    >
                      Finish
                    </Button>
                  </>
                ) : null}


                {step === 5 ? (
                  <>
                    <div className="w-full lg:w-auto h-[40px] box-border rounded-full bg-gradient-to-r from-purple-gd to-blue-gd p-[1px]">
                      <Button
                        onPress={() => {
                          setStep(1)
                        }}
                        className="bg-white rounded-full h-[38px] w-full lg:w-auto"
                      >
                        <span className="bg-gradient-to-r font-bold from-purple-gd to-blue-gd bg-clip-text text-transparent">
                          Back
                        </span>
                      </Button>
                    </div>
                    <Button
                      onPress={() => {
                        onClose()
                        setStep(3)
                      }}
                      className="w-full lg:w-auto text-white font-medium rounded-full bg-gradient-to-r from-purple-gd to-blue-gd px-[50px]"
                    >
                      Continue
                    </Button>
                  </>
                ) : null}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
