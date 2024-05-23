import { Image as Image2 } from '@nextui-org/react'
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { v4 } from "uuid";

import Container from '~/components/Container'
import UploadHumanBody from "~/components/UploadHumanBody";
import { imageKitService } from "~/services/ImageKitService";
import { vtoService } from "~/services/VTOService";

import modelPhoto from '../../public/images/body-photo-1.jpg'
import LoginApp from "./LoginApp";
import { getCurrentUserByBrowser, handleConfetti, putCachingUserToBrowser } from "./try-on-plugin";

async function getServerSideProps() {
  return {
    props: {}
  }
}

export default function ProfilePage({ props }) {
  const [step, setStep] = useState(0)
  const [currentUser, setCurrentUser] = useState<UserEntity>({})
  const router = useRouter()
  console.log(currentUser)
  const [detectedImages, setDetectedImages] = useState<string[]>([])
  useEffect(() => {
    console.log("useEffect checking")
    console.log(currentUser?.id)
    console.log("imgSrc checking: " + currentUser?.mainClothesPhoto)
    if ((currentUser?.id == "null" || currentUser?.id == undefined || currentUser?.id == "undefined") && typeof window !== "undefined") {
      var cachingUser = getCurrentUserByBrowser();
      console.log("cachingUser")
      console.log(cachingUser)
      cachingUser.id = (cachingUser?.id == "null" || cachingUser?.id == undefined || cachingUser?.id == "undefined") ? v4() : cachingUser?.id;

      if (cachingUser?.mainBodyPhoto !== "undefined" && cachingUser?.mainBodyPhoto !== "null") {
        console.log("Đã có profile, đi thẳng đến ai generate")

      }
      setCurrentUser(cachingUser)
      putCachingUserToBrowser(cachingUser);
      console.log(currentUser?.mainBodyPhoto)

    }
  }, [currentUser])



  // This is the promise code, so this is the useful bit
  const uploadHumanImageKit = useCallback(async (imageUrl) => {
    console.log('uploadHumanImageKit starting')
    imageUrl = imageUrl ?? "aaaa";
    currentUser.mainBodyPhoto = null;
    // console.log('ImageCrop 1024 / 768')
    // ImageCrop(imageUrl, 1024, 768).then(canvas => {
    // const resizedImageURL = canvas.toDataURL("image/jpg");
    imageKitService
      .upload({
        file: imageUrl,
        fileName: currentUser.id + '-human.jpg',
      })
      .then((uploaded) => {
        console.log('uploadHumanImageKit completed')
        console.log(uploaded)
        currentUser.mainBodyPhoto = uploaded.url + "?tr=w-768,h-1024";// using imagekit auto resize
        setCurrentUser({ ...currentUser })
        putCachingUserToBrowser(currentUser);
      })
  }, [currentUser])

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

  return (
    <div className="profile-container h-[90vh] bg-white overflow-auto">
      <div className="bg-gradient-to-r from-purple-gd to-blue-gd h-[3px]"></div>
      {
        (currentUser.hasLogin == false) ? (
          <Container>
            <LoginApp status={true}
              //userData={currentUser}
              onSuccessEvent={(_currentUser) => {
                console.log("onLoginSuccessedEvent");
                _currentUser.hasLogin = true;
                setCurrentUser({ ..._currentUser });
                putCachingUserToBrowser(_currentUser);
              }}
              onCloseEvent={() => { console.log("onCloseEvent"); router.back() }} />
          </Container>
        ) : (<Container>
          <div className="user-info-container mt-[40px]">
            <div className="user-info flex gap-[15px] items-center mb-[20px]">
              <div className="rounded-full  bg-gray-200 h-[48px] w-[48px]">
                <Image2 alt="user avatar" src={currentUser.mainBodyPhoto != "undefined" ? currentUser.mainBodyPhoto : '/images/loading-gif.gif'} width={40} height={40} className="rounded-full w-[40px] px-2 bg-gray-200 h-[40px]" />
              </div>

              <div className="info">
                <p className="text-[25px] text-bold uppercase text-purple-plugin">{currentUser.name}</p>
                <p className="text-[12px] text-purple-plugin">Continue to TRYON.AI</p>
              </div>
            </div>
            <div className="info-item flex mb-[20px] mt-10">
              <label className="text-purple-plugin w-[200px]">Email</label>
              <p className="text-purple-plugin">{currentUser.email}</p>
            </div>
            <div className="info-item flex mb-[20px]">
              <label className="text-purple-plugin w-[200px]">Original photo</label>
              <div className="image-avatar w-full flex flex-col items-center">

                {
                  (!currentUser.mainBodyPhoto || currentUser.mainBodyPhoto == "undefined" || currentUser.mainBodyPhoto == "null") ?
                    (<div className="upload w-full bg-gradient-to-r from-purple-gd to-blue-gd rounded-[10px] p-[2px]">
                      <div className="w-full h-full bg-white rounded-[8px] p-[15px] lg:p-[36px] hover:bg-gradient-to-r hover:from-purple-500/[.05] hover:to-blue-500/[.05] duration-300">
                        <div className="options flex justify-center mb-[15px]">
                          <div className="hover:scale-125 duration-300 cursor-pointer">
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
                    </div>) : (<>
                      <div className="hover:scale-125 duration-300">
                        <Image2 alt="user avatar" src={currentUser.mainBodyPhoto} width={200} height={300} className="h-[300px] rounded" />
                      </div>
                      <button
                        onClick={() => { currentUser.mainBodyPhoto = null; setCurrentUser({ ...currentUser }) }}
                        className="text-purple-plugin mt-[15px] underline">Change Photo</button>
                    </>)
                }
              </div>
            </div>
            <div className="info-item flex mb-[20px]">
              {/* <label className="text-purple-plugin w-[200px]">History</label> */}
              {/* <div className="image-history flex gap-[10px]">
                                <Image alt="user avatar" src={modelPhoto} width={80} height={120} className="h-[120px] rounded" />
                                <Image alt="user avatar" src={modelPhoto} width={80} height={120} className="h-[120px] rounded" />
                                <Image alt="user avatar" src={modelPhoto} width={80} height={120} className="h-[120px] rounded" />
                            </div> */}
            </div>
            <div className="policies">
              <Link href="/" className="text-[14px] md:text-base text-purple-plugin mb-[16px] mr-[30px]">
                Help
              </Link>
              <Link href="/" className="text-[14px] md:text-base text-purple-plugin mb-[16px]">
                Privacy
              </Link>
            </div>
            <div className="button-actions flex just-fy-center mt-[30px] px-[40px] pb-[40px]">
              <Link href="/try-on-plugin"
                className="relative try-on-now-btn rounded-full bg-gradient-to-r from-purple-gd to-blue-gd text-white text-base px-[20px] py-[10px] w-full md:w-auto mr-[40px] flex justify-center"
              >
                BACK
              </Link>
              <button
                onClick={() => {
                  console.log("LogoutEvent");
                  currentUser.hasLogin = false;
                  currentUser.mainBodyPhoto = null;
                  setCurrentUser({ ...currentUser });
                  putCachingUserToBrowser(currentUser);
                }}
                className="relative try-on-now-btn rounded-full bg-gradient-to-r from-purple-gd to-blue-gd text-white text-base px-[20px] py-[10px] w-full md:w-auto"
              >
                SIGN OUT
              </button>
            </div>
          </div>
        </Container>)
      }

    </div>
  )
}
