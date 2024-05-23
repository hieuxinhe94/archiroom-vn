import { Button, Modal, ModalBody, ModalContent, useDisclosure } from "@nextui-org/react";
import { Image as Image2 } from '@nextui-org/react'
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { v4 } from "uuid";

import Container from '~/components/Container'
import UploadHumanBody from "~/components/UploadHumanBody";
import { imageKitService } from "~/services/ImageKitService";

import closeIcon from '../components/background-images/closeIcon.svg';
import facebook from '../components/background-images/facebook-login.svg';
import google from '../components/background-images/google_login.svg';
import instagram from '../components/background-images/instagram_login.svg';
import ProfilePage from "./me";
import { getCurrentUserByBrowser, putCachingUserToBrowser } from "./try-on-plugin";

enum BusinessType {
  INDIVIDUAL,
  BUSINESS
}

export class ProfileResultViewModel {
  "access_token": string;
  "_id": string;
  "nickname": string;
  "email": string;
  "browserid": string;
  "lastLogin": string;
  "bodyPhotoSrc": string;
  "bodyPhotoSrcOlds": string;
}


async function callUpdateProfileAPI(bodyObj: {}): Promise<any> {
  const res = await fetch("https://api.tryonhub.ai/auth/login", {
    "headers": {
      "content-type": "application/json"
    },
    "body": JSON.stringify(bodyObj),
    "method": "POST"
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default function ProfileApp({ status = false, userData, onCloseEvent, onSuccessEvent }) {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure({ isOpen: status, onClose: onCloseEvent });
  


  const [message, setMessage] = useState<string>();
  const [currentUser, setCurrentUser] = useState<UserEntity>(getCurrentUserByBrowser())
  const [email, setEmail] = useState<string>();
  const [name, setName] = useState<string>(currentUser?.name ?? "");
  const [step, setStep] = useState(0)
  const [detectedImages, setDetectedImages] = useState<string[]>([])
  const [businessType, setBusinessType] = useState(BusinessType.INDIVIDUAL)

  const onBusinessTypeSelected = (e) => {
    setBusinessType(e.target.value)
  }


  // This is the promise code, so this is the useful bit
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
    <div className="scroll-smooth md:scroll-auto" id="fullpage">
      <Modal classNames={{
        closeButton: "hidden",
      }} isOpen={isOpen} onOpenChange={onOpenChange} size="4xl" className="px-[20px] py-[50px] lg:px-[60px] lg:py-[50px]">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <Button onPress={() => { onClose(); }} className="bg-transparent absolute right-0 top-[20px]">
                  <Image src={closeIcon} width={20} height={20} alt="Try On Step Image" />
                </Button>
                <Container>
                  <div className="user-info-container mt-[40px]">
                    <div className="user-info flex gap-[15px] items-center mb-[20px]">
                      <div className="rounded-full  bg-gray-200 h-[48px] w-[48px]">
                        <Image2 alt="user avatar" src={currentUser.mainBodyPhoto != "undefined" ? currentUser.mainBodyPhoto : '/images/loading-gif.gif'} width={40} height={40} className="rounded-full w-[40px] px-2 bg-gray-200 h-[40px]" />
                      </div>

                      <div className="info">
                        <p className="text-[25px] text-bold uppercase text-purple-plugin">{currentUser.email}</p>
                        <p className="text-[12px] text-purple-plugin">Continue to TRYON.AI</p>
                      </div>
                    </div>
                    <div className="info-item flex my-[10px]">
                      <label className="text-purple-plugin font-bold my-2 w-[150px]">User name: </label>
                      {/* <p className="text-purple-plugin">{currentUser.name}</p> */}
                      <div className="bg-gradient-to-r from-purple-gd to-blue-gd rounded-[13px] flex ">
                        <input
                          type="text"
                          required={true}
                          value={name}
                          onChange={e => { setName(e.currentTarget.value); }}

                          placeholder="Nickname"
                          className="m-[1px] bg-white rounded-[12px] h-[48px] w-full px-[10px] outline-none"
                        />
                      </div>
                    </div>
                    <div className="info-item flex mb-[20px]">
                    <label className="text-purple-plugin font-bold my-2 w-[150px]">Your body: </label>
                      <div className="image-avatar w-full flex flex-col items-left ml-[32px]">
                        {
                          (!currentUser.mainBodyPhoto || currentUser.mainBodyPhoto == "undefined" || currentUser.mainBodyPhoto == "null") ?
                            (<div className="upload w-full bg-gradient-to-r from-purple-gd to-blue-gd rounded-[10px] p-[2px]">
                              <div className="w-full h-full bg-white rounded-[8px] p-[15px] lg:p-[36px] hover:bg-gradient-to-r hover:from-purple-500/[.05] hover:to-blue-500/[.05] duration-300">
                                <div className="options flex justify-center mb-[15px]">
                                  <div className="hover:scale-125 duration-100 cursor-pointer">
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
                              <div className="duration-300">
                                <Image2 alt="user avatar" src={currentUser.mainBodyPhoto} width={200} height={300} className="h-[300px] rounded" />
                              </div>
                              <button
                                onClick={() => { currentUser.mainBodyPhoto = null; setCurrentUser({ ...currentUser }) }}
                                className="text-purple-plugin mt-[15px] underline text-left">Change Photo</button>
                            </>)
                        }
                      </div>
                    </div>
                    <div className="info-item flex mb-[20px]">
                    </div>
                  
                    <div className="button-actions flex just-fy-center mt-[30px] px-[40px] pb-[40px]">
                      
                    </div>
                  </div>
                </Container>
              </ModalBody>

            </>
          )}
        </ModalContent>
      </Modal>


    </div>
  );
}
