import { Button, Card, CardFooter, CardHeader, Image as Image2, Progress } from '@nextui-org/react'
import anime from 'animejs';
import confetti from "canvas-confetti";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from 'react'


import { clothesDataset, modelDataset } from "~/components/staticData";
import TypingEffect from "~/components/TypingEffect";
import { imageKitService } from "~/services";
import { TryOnViewModel, vtoService } from "~/services/VTOService";

import modelPhoto from '../../public/images/body-photo-1.jpg'
import checked from '../components/background-images/checked.svg'
import UploadHumanBody from '../components/UploadHumanBody'
import MoreModel from "./more-model";
import RenderTime from "./renderTimer";
import { BizModel } from '~/components/biz/bizModels';

function getCookie(name) {
  if (typeof document !== undefined) return "";

  const value = `; ${document?.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export function getCurrentUserByBrowser(): UserEntity {
  var userId = typeof window !== "undefined" ? window.localStorage.getItem("userid") : getCookie("userid");
  var username = typeof window !== "undefined" ? window.localStorage.getItem("username") : getCookie("username");
  var email = typeof window !== "undefined" ? window.localStorage.getItem("email") : getCookie("email");
  var userMainBodyUrl = typeof window !== "undefined" ? window.localStorage.getItem("user-main-body-url") : getCookie("user-main-body-url");
  // var userMainClothingUrl = typeof window !== "undefined" ? window.localStorage.getItem("user-main-clothing-url") : getCookie("user-main-clothing-url");
  var login = typeof window !== "undefined" ? window.localStorage.getItem("hasLogin") : getCookie("hasLogin");
  var account = typeof window !== "undefined" ? window.localStorage.getItem("hasAccount") : getCookie("hasAccount");

  return {
    id: userId == "undefined" ? null : userId,
    name: username == "undefined" ? null : username,
    email: email == "undefined" ? null : email,
    mainBodyPhoto: userMainBodyUrl == "undefined" ? null : userMainBodyUrl,
    // mainClothesPhoto: userMainClothingUrl == "undefined" ? null : userMainClothingUrl,
    hasLogin: login == "1" ? true : false,
    hasAccount: account == "1" ? true : false,
  }
}

export function putCachingUserToBrowser(user: UserEntity) {
  localStorage.setItem("userid", user.id);
  localStorage.setItem("username", user.name);
  localStorage.setItem("email", user.email);
  localStorage.setItem("hasLogin", user.hasLogin ? "1" : "0");
  localStorage.setItem("hasAccount", user.hasAccount ? "1" : "0");
  localStorage.setItem("user-main-body-url", user.mainBodyPhoto);
  localStorage.setItem("access_token", user?.access_token);
}

export const handleConfetti = () => {
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


async function getAllModels(userid: string): Promise<BizModel[]> {
  const res = await vtoService.getAllModels(userid);
  if (res.status !== 200) {
    throw new Error('Failed to fetch data')
  }
  return res.data
}

export const getStaticProps = async ({ draftMode = false }) => {
  // const products = await getAffliateProducts();
  const models = await getAllModels("000");
  return {
    props: {
      draftMode,
      models: models
    },
  }
}

export default function IndexPage(props) {
  const router = useRouter();
  const { src } = router.query;
  
  

  const imgSrc = decodeURIComponent(src?.toString())
  const [step, setStep] = useState(0)

  
  

  const [currentUser, setCurrentUser] = useState<UserEntity>({
    mainClothesPhoto: (imgSrc ?? "https://www.tryonhub.ai/images/clothes-sample-1.jpg")
  })
  var HumanSrcUrl = 'https://ik.imagekit.io/tryonhub/1715071847674human_0hSPtC3uG.jpg';
  const [cachedUser, setCachedUser] = useState<UserEntity>()
  const [detectedImages, setDetectedImages] = useState<string[]>([])

  const [counter, setCounter] = useState(0);
  const [startCallAPI, setStartCallAPI] = useState(false);
  const [startDate, setStartDate] = useState(0);
  const [totalTimming, setTotalTimming] = useState(0);

  const modelsPreview: BizModel[] = props.models ?? [];

  // This is the promise code, so this is the useful bit
  const ensureCallAPIVTO = useCallback(async (timeout = 200000) => {
    var start = Date.now();
    return new Promise(waitForUploadedAllImages); // set the promise object within the waitForUploadedAllImages object

    // waitForUploadedAllImages makes the decision whether the condition is met
    // or not met or the timeout has been exceeded which means
    // this promise will be rejected
    function waitForUploadedAllImages(resolve, reject) {
      if ((currentUser.mainBodyPhoto && imgSrc)) {
        
        setCounter((v) => (v <= 10 ? 10 : v + 10));
        setStartCallAPI(true)
        resolve();
      }

      else if (timeout && (Date.now() - start) >= timeout) {
        
        setCounter(0);
        reject(new Error("timeout"));
      }

      else {
        setCounter((v) => (v >= 100 ? 0 : v + 10));
        
        
        setTimeout(waitForUploadedAllImages.bind(this, resolve, reject), 300);
      }
    }
  }, [currentUser.mainBodyPhoto, imgSrc])

  const generateVtoRest = useCallback(async () => {
    // clear current data
    
    
    currentUser.predictedPhotos = null; // hoặc image loading ở đây
    currentUser.mainPredictedPhoto = null;
    setStartDate(Date.now())
    const interval = setInterval(() => {
      setCounter((v) => ((v >= 99) ? 5 : v + 1));
    }, 1200);
    //setCurrentUser(currentUser)
    

    // This runs the promise code
    ensureCallAPIVTO().then(async function () {
      
      if (!currentUser.mainBodyPhoto || !imgSrc) {
        debugger
        alert('Invalid params! Missing required input.')
        return;
      }
      //+ "?tr=w-768,h-1024"
      await vtoService.uploadSrcHumanClothRestV2(new TryOnViewModel({
        clothesImageSrc: imgSrc,
        humanBodyImageSrc: currentUser.mainBodyPhoto,
        clothesType: "",
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
        setCounter((v) => (-1));
        setCurrentUser({})
      }).finally(() => {
        const time = (Date.now() - startDate) / 1000;
        setTotalTimming(time);
        clearInterval(interval);
      })
    });
  }, [currentUser, ensureCallAPIVTO, startDate, imgSrc])

  useEffect(() => {
    
    
    
    if ((currentUser?.id == "null" || currentUser?.id == undefined || currentUser?.id == "undefined") && typeof window !== "undefined") {
      var cachingUser = getCurrentUserByBrowser();
      
      
      cachingUser.id = (cachingUser?.id == "null" || cachingUser?.id == undefined || cachingUser?.id == "undefined") ? "guest" : cachingUser?.id;

      if (cachingUser.hasLogin) {
        if (cachingUser?.mainBodyPhoto !== "undefined" && imgSrc !== "null") {
          
          setStep(1)
          generateVtoRest()
        }
      }
      cachingUser.mainClothesPhoto = imgSrc;
      setCurrentUser(cachingUser)
      putCachingUserToBrowser(cachingUser);
      

    }
  }, [currentUser, generateVtoRest, imgSrc])

  const uploadHumanImageKit = useCallback(async (imageUrl) => {
    
    imageUrl = imageUrl ?? "aaaa";
    currentUser.mainBodyPhoto = null;
    // 
    // ImageCrop(imageUrl, 1024, 768).then(canvas => {
    // const resizedImageURL = canvas.toDataURL("image/jpg");
    imageKitService
      .upload({
        file: imageUrl,
        fileName: currentUser.id + '-human.jpg',
      })
      .then((uploaded) => {
        
        
        currentUser.mainBodyPhoto = uploaded.url + "?tr=w-768,h-1024";// using imagekit auto resize
        setCurrentUser(currentUser)
        putCachingUserToBrowser(currentUser);
        generateVtoRest()
      })
  }, [currentUser, generateVtoRest])

  const handleMultiBodyImageUpload = useCallback(
    async (bodyDetectedImages: string[], originalUploadedImage: string) => {
      // nếu có nhiều ảnh chứa nhiều human
      if (bodyDetectedImages.length >= 2) {
        setDetectedImages(bodyDetectedImages)
        setStep(3)
      }
      // nếu chỉ có 1 ảnh duy nhất, 
      else {
        setDetectedImages(bodyDetectedImages)
        uploadHumanImageKit(originalUploadedImage)

        setStep(2)
      }
    },
    [uploadHumanImageKit],
  )

  const pickSampleUrl = (url) => {
    

    currentUser.mainBodyPhoto = url
    putCachingUserToBrowser(currentUser);
    setStep(2)
    generateVtoRest()
  }

  const pickSampleModel = (sampleItem) => {
    
    
    currentUser.mainBodyPhoto = 'https://www.tryonhub.ai' + sampleItem.url
    putCachingUserToBrowser(currentUser);
    setStep(2)
    generateVtoRest()
  }

  

  return (
    <>
      <Head>
        <title>Tryonhub.ai</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>

      <div className="h-[100vh] bg-white overflow-auto">
        {/* <div className="bg-gradient-to-r from-purple-gd to-blue-gd h-[3px]"></div> */}
        <div className="profile flex justify-between bg-gradient-to-r from-purple-gd to-blue-gd border-t-1 border-white">
          {
            step > 1 ? (
              <button
                data-aos="fade-up"
                onClick={() => { setStep(1) }}
                className="relative text-white text-base px-[20px] py-3 w-auto flex"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                </svg>
                Back
              </button>
            ) : (
              <div>

              </div>
            )
          }

          <div className="info px-[16px] py-[5px]">
            <Link href="/me" className=" flex items-center">
              <p className="text-base mr-[10px] font-bold text-white"> {currentUser.hasLogin ? currentUser.name : "SIGN IN"}</p>
              <div className="rounded-full  bg-gray-200 h-[40px] w-[40px]">
                <Image2 src={currentUser.mainBodyPhoto ?? '/images/loading-gif.gif'} width={36} height={36} alt="model image" className="rounded-full h-[36px] w-[36px] px-2 object-cover" />
              </div>
            </Link>
          </div>
        </div>
        <div className="py-[16px] px-[30px]">
          <div className='w-full flex h-[150px] items-center justify-center'>
            <Image2 src={imgSrc} width={136} height={136} alt="model image" className=" h-[136px] w-[136px] pt-2 px-2 object-fit" />
          </div>

          {step === 0 ?
            <div className="your-img-container">
              <h3 className="text-purple-plugin text-center text-[20px] font-bold mt-[30px]">IS IT THE FIRST TIME WE MET?</h3>
              <p className="text-purple-plugin text-center text-base mt-[10px] mb-[20px]">Let us imagine how do you look, it never repeats!</p>
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
                  </div>
                  <p className="text-[12px] lg:text-base text-center font-medium bg-gradient-to-r from-purple-gd to-blue-gd bg-clip-text text-transparent">
                    Upload your body photo
                  </p>
                </div>
              </div>
              <p className="text-purple-plugin text-base my-[20px]">or choosing a model similar to you</p>
              <div className="relative model-images flex mb-[25px]">
                {
                  modelsPreview && modelsPreview.map((model, index) => (
                    <div
                      key={index}
                      onClick={() => { pickSampleUrl(model.images[0]) }}
                      className="model-image cursor-pointer flex flex-col items-center p-[4px] rounded mr-[10px]">
                      <Image2 src={model.images[0]} width={120} height={160} alt={model.name} className="rounded" />
                      {/* <p className="text-[14px] font-bold mt-[5px]">{item.name}</p> */}
                    </div>))
                }
                <button onClick={() => { setStep(0.5) }} className="more-model z-50 absolute right-[-20px] top-[40px] rounded-full bg-[#afafaf] text-white w-[80px] h-[50px] flex items-center justify-center">
                  <span className="text-xs">More</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>
              <button
                data-aos="fade-up"
                onClick={() => { setStep(1) }}
                data-aos-duration={2000}
                className="relative try-on-now-btn rounded-full bg-gradient-to-r from-purple-gd to-blue-gd text-white text-base px-[20px] py-[10px] w-full md:w-auto"
              >
                CONTINUE
              </button>
              {/* <button className="mt-[30px] text-purple-plugin" onClick={() => { setStep(3) }}>Upload Error (Demo)</button> */}
            </div> : null
          }

          {
            step === 0.5 ? <>
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

          {step === 1 ?
            <div className="source-img-container flex flex-col items-center">
              <h3 className="text-purple-plugin text-center text-[20px] font-bold mt-[30px] mb-[20px]">YOU HAVE HAD AN EXCELLENT CHOICE!</h3>
              <div className="static  ">
                <Image className="rounded" loader={() => decodeURIComponent(src?.toString())} unoptimized={true} src={decodeURIComponent(src?.toString())} alt="clothes image" width={400} height={400} />
                <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <RenderTime duraion={45} onComplete={() => { setStep(2) }} />
                </div>
              </div>
              <p className="start-sub-title text-purple-plugin text-[14px] text-center">Find the best styles for you with TryOnHub.AI</p>
              <span
                data-aos="fade-up"
                data-aos-duration={2000}
                className="relative mt-[20px] try-on-now-btn rounded-full bg-gradient-to-r from-purple-gd to-blue-gd text-white text-base px-[20px] py-[10px] w-full md:w-auto"
              >
                Lets our AI imagine about you...
              </span>
            </div> : null
          }

          {step === 2 ?
            <div className="your-img-container">
              <h3 className="text-purple-plugin text-center text-[20px] font-bold mt-[10px] mb-[10px]">HERE IS YOUR LOOK!</h3>
              {currentUser.predictedPhotos &&
                (
                  <div className="rounded-full w-full px-2 p-2 text-white z-50 from-purple-gd to-blue-gd">
                    <p className="start-sub-title text-purple-plugin text-gray-800 text-[12px] text-center">
                      <TypingEffect message={'Looks very stylish! This outfit seems suitable for you on picnics.'} />
                    </p>
                  </div>
                )}
              <div className="result-container  gap-[10px] bg-[#fff8f8] p-[4px]">
                <div className="main-result relative  w-full h-full flex items-center algin-center justify-center">
                  {/* <Card isFooterBlurred className="w-full h-[auto] col-span-12 sm:col-span-7 staggering-grid-demo"> */}

                  {currentUser.mainPredictedPhoto == null ? (
                    <div className="h-full w-full  items-center algin-center justify-center">
                      <Image2
                        isZoomed
                        src={'/images/loading-gif.gif'}
                        width={"100%"} height={240}
                        className="rounded lg:mb-0 "
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
                    </div>
                  ) : (
                    <div className="h-full w-full flex items-center algin-center justify-center">
                      <Image2
                        isZoomed
                        onError={() => { currentUser.mainPredictedPhotoHD = currentUser.mainPredictedPhoto; }}
                        src={currentUser.mainPredictedPhoto}
                        fallbackSrc={currentUser.mainPredictedPhoto}
                        style={{
                          backgroundSize: "cover",
                          backgroundPosition: "center center",
                          backgroundRepeat: "no-repeat"
                        }}
                        width={"100%"} height={240}
                        className="rounded mb-[20px] lg:mb-0"
                        alt="predicted image with delay"
                      />
                    </div>
                  )}
                  {/* </Card> */}

                  <div className="absolute bottom-0 mb-3 other-poses w-full flex justify-center ">

                    {currentUser.mainPredictedPhoto && currentUser.predictedPhotos?.map((item) =>
                    (<Image2
                      key={item}
                      isZoomed
                      src={'https://app.requestly.io/delay/1000/' + item}
                      width={100} height={40}
                      className="rounded mb-[10px] lg:mb-0"
                      alt="predicted image with delay"
                    />
                    ))
                    }

                  </div>
                </div>
                <div className="sub-result w-full flex flex-col justify-between pt-4 mt-5">

                  {currentUser.mainPredictedPhoto &&
                    (<div>
                      <Recommendation />
                    </div>)
                  }
                </div>
              </div>

              {currentUser.mainPredictedPhoto == null && startCallAPI && ((Date.now() - startDate) > 10000) && (
                <div className="rounded-full w-full px-12  mt-20 p-2 bg-gradient-to-r from-purple-gd to-blue-gd text-white z-50 from-purple-gd to-blue-gd">
                  <p className="start-sub-title text-purple-plugin text-white text-[12px] text-center">Please wait a minutes.<br /> We are facing a long queue of requests pending....</p>
                </div>
              )}

              <button
                hidden={!currentUser.mainPredictedPhoto}
                data-aos="fade-up"
                onClick={() => { setStep(1) }}
                data-aos-duration={2000}
                className="relative mt-[10px] try-on-now-btn rounded-full bg-gradient-to-r from-purple-gd to-blue-gd text-white text-base px-[20px] py-[10px] w-full md:w-auto"
              >
                CHANGE YOUR PIC
              </button>
              {/* <button
                hidden={!currentUser.mainPredictedPhoto}
                data-aos="fade-up"
                onClick={() => { setStep(1) }}
                data-aos-duration={2000}
                className="relative mt-[10px] try-on-now-btn rounded-full bg-gradient-to-r from-purple-gd to-blue-gd text-white text-base px-[20px] py-[10px] w-full md:w-auto"
              >
                BACK
              </button> */}
            </div> : null
          }

          {step === 3 ?
            <div className="your-img-container">
              <h3 className="text-purple-plugin text-center text-[20px] font-bold mt-[30px] mb-[5px]">FEW NOTES FOR YOU</h3>
              <p className="text-purple-plugin text-base text-center mb-[20px]">To have a suitable photo, making the best result</p>
              <div className="notes bg-[#fff8f8] py-[30px] pl-[40px]">
                <div className="checked-item mb-[20px] flex gap-[15px]"
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
                  <p className="validate-point text-base text-purple-plugin">
                    Background removed
                  </p>
                </div>
                <div className="checked-item mb-[20px] flex gap-[15px]"
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
                  <p className="validate-point text-base text-purple-plugin">
                    Front view
                  </p>
                </div>
                <div className="checked-item mb-[20px] flex gap-[15px]"
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
                  <p className="validate-point text-base text-purple-plugin">
                    Stay close to the camera
                  </p>
                </div>
                <div className="checked-item flex gap-[15px]"
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
                  <p className="validate-point text-base text-purple-plugin">
                    Only one person in the picture
                  </p>
                </div>
              </div>
              <button
                data-aos="fade-up"
                onClick={() => { setStep(1) }}
                data-aos-duration={2000}
                className="relative mt-[30px] try-on-now-btn rounded-full bg-gradient-to-r from-purple-gd to-blue-gd text-white text-base px-[20px] py-[10px] w-full md:w-auto"
              >
                Retry Upload
              </button>
            </div> : null
          }
        </div>
      </div>
    </>
  )
}

function Recommendation(props) {

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

  useEffect(() => {
    anime({
      targets: '.staggering-grid-demo .el',
      scale: [
        { value: .1, easing: 'easeOutSine', duration: 500 },
        { value: 1, easing: 'easeInOutQuad', duration: 1200 }
      ],
      delay: anime.stagger(200, { grid: [14, 5], from: 'center' })
    });

  })

  return (<>

    <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-7 staggering-grid-demo">
      <CardHeader className="absolute z-10 top-1 flex-col items-start el">
        <p className="text-tiny text-gray/60 uppercase font-bold">AI Recommendations</p>
        <h4 className="text-gray/90 font-medium text-sm">Your checklist for better choice</h4>
      </CardHeader>
      <div className="w-full gap-2 grid grid-cols-3 grid-rows-2 px-2 mt-20">
        {
          clothesPreview.map((item, index) => (
            <div
              key={index}
              onClick={() => {

              }}
              className="model-image cursor-pointer el">
              <Image2
                width={"100%"} height={240}
                alt={item.name}
                className="z-0 w-full h-full object-cover el"
                src={item.url}
              />
            </div>))
        }

      </div>

      <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
        <div className="flex flex-grow gap-2 items-center">
          <Image2
            alt="Breathing app icon"
            width={"10"} height={11}
            className="rounded-full w-10 h-11 bg-black"
            src="/images/breathing-app-icon.jpeg"
          />
          <div className="flex flex-col ">
            <p className="text-tiny text-white/60 ">Comming Soon</p>
            {/* <p className="text-tiny text-white/60">Get a good night's sleep.</p> */}
          </div>
        </div>
        <Button radius="full" size="sm">More</Button>
      </CardFooter>
    </Card>
  </>)
}