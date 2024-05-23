import { Button, Modal, ModalBody, ModalContent, useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { SessionProvider,signIn, signOut, useSession } from "next-auth/react"
import React, { useEffect, useState } from "react";

import closeIcon from '../components/background-images/closeIcon.svg';
import facebook from '../components/background-images/facebook-login.svg';
import google from '../components/background-images/google_login.svg';
import instagram from '../components/background-images/instagram_login.svg';
import { getCurrentUserByBrowser, putCachingUserToBrowser } from "./try-on-plugin";

enum BusinessType {
  INDIVIDUAL,
  BUSINESS
}

export class LoginResultViewModel {
  "access_token": string;
  "_id": string;
  "nickname": string;
  "email": string;
  "browserid": string;
  "lastLogin": string;
  "bodyPhotoSrc": string;
  "bodyPhotoSrcOlds": string;
}


async function callLoginAPI(loginObj: {}): Promise<any> {
  const res = await fetch("https://api.tryonhub.ai/auth/login", {
    "headers": {
      "content-type": "application/json"
    },
    "body": JSON.stringify(loginObj),
    "method": "POST"
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default function LoginApp({status = false, ssoproviders=[],  onCloseEvent, onSuccessEvent }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure({ isOpen: status, onClose: onCloseEvent });


  const [currentUser, setCurrentUser] = useState<UserEntity>(getCurrentUserByBrowser())
  const [email, setEmail] = useState<string>(currentUser?.email ?? "");
  const [name, setName] = useState<string>(currentUser?.name ?? "");
  const [message, setMessage] = useState<string>();
  const [businessType, setBusinessType] = useState(BusinessType.INDIVIDUAL)

  const onBusinessTypeSelected = (e) => {
    setBusinessType(e.target.value)
  }
 

  const onLoginSubmit = () => {
    const loginObj = {
      "email": email,
      "nickname": name,
      "clientUniqueKey": "string"
    }
    
    callLoginAPI(loginObj).then(
      (res) => {
        
        const data: LoginResultViewModel = res.info as LoginResultViewModel;
        
        currentUser.mainBodyPhoto = data.bodyPhotoSrc;
        localStorage.setItem("access_token", res.token)
        localStorage.setItem("user)id", data._id);
        currentUser.token = res.token;
        currentUser.id = data._id;
        setCurrentUser(currentUser)
        putCachingUserToBrowser(currentUser);

        setTimeout(() => {
          onSuccessEvent(currentUser);
        }, 1000)

      }
    ).catch(() => {
      setMessage("Invalid nickname. Try again or use another email to continue...")
    });
  }

  return (
    <div className="scroll-smooth md:scroll-auto" id="fullpage">
      <Modal classNames={{
        closeButton: "hidden",
      }} isOpen={isOpen} onOpenChange={onOpenChange} size="2xl" className="px-[20px] py-[50px] lg:px-[60px] lg:py-[50px]">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <Button onPress={() => { onClose(); }} className="bg-transparent absolute right-0 top-[20px]">
                  <Image src={closeIcon} width={20} height={20} alt="Try On Step Image" />
                </Button>
                <div className="login-title-content flex justify-between items-center">
                  <h2 className="text-[30px] font-bold">Login</h2>
                  <div className="links flex">
                    <Link href="/" className="text-base bg-gradient-to-r from-purple-gd to-blue-gd bg-clip-text text-transparent">
                      Help
                    </Link>
                    <span className="w-[2px] bg-gradient-to-r from-purple-gd to-blue-gd mx-[15px]"></span>
                    <Link href="/" className="text-base bg-gradient-to-r from-purple-gd to-blue-gd bg-clip-text text-transparent">
                      Privacy
                    </Link>
                  </div>
                </div>
                <div className="business-type-container flex mt-[40px]">
                  <div className="business mr-[30px] md:mr-[70px]">
                    <input id="individual" onChange={(e) => { onBusinessTypeSelected(e) }} checked={businessType == BusinessType.INDIVIDUAL} value={BusinessType.INDIVIDUAL} type="radio" name="business-type" className="hidden business-type-input" />
                    <label htmlFor="individual" className="cursor-pointer relative text-base font-medium">Individual</label>
                  </div>
                  <div className="business">
                    <input id="business" onChange={(e) => { onBusinessTypeSelected(e) }} checked={businessType == BusinessType.BUSINESS} value={BusinessType.BUSINESS} type="radio" name="business-type" className="hidden business-type-input" />
                    <label htmlFor="business" className="cursor-pointer relative text-base font-medium">Business</label>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-purple-gd to-blue-gd rounded-[13px] flex mt-[30px] mb-[10px]">
                  <input
                    type="email"
                    required={true}
                    value={email}
                    onChange={e => { setEmail(e.currentTarget.value); }}
                    pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"

                    placeholder="Email"
                    className="m-[1px] bg-white rounded-[12px] h-[48px] w-full px-[10px] outline-none"
                  />
                </div>

                <div className="bg-gradient-to-r from-purple-gd to-blue-gd rounded-[13px] flex mt-[5px] mb-[30px]">
                  <input
                    type="text"
                    required={true}
                    value={name}
                    onChange={e => { setName(e.currentTarget.value); }}

                    placeholder="Nickname"
                    className="m-[1px] bg-white rounded-[12px] h-[48px] w-full px-[10px] outline-none"
                  />
                </div>
                <Button
                  type="submit"
                  onClick={() => {

                    if (!email.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)) {
                      setMessage("Email not valid!")
                    } else if (!name) {
                      setMessage("Please enter your name")
                    } else {

                      currentUser.email = email;
                      currentUser.name = name;
                      currentUser.hasLogin = true;
                      onLoginSubmit();

                    }
                  }} className="w-full lg:w-auto text-white font-medium rounded-full bg-gradient-to-r from-purple-gd to-blue-gd px-[50px] h-[48px]">
                  Continue with email
                </Button>
                <span className="text-red-400 transition duration-150 ease-in-out">{message}</span>
                {
                  businessType == BusinessType.INDIVIDUAL ? <div className="social-login">
                    <p className=" text-base md:text-[18px] font-bold my-[30px] text-center">Or</p>
                    <div className="social-actions sm:px-[50px] md:px-[70px] flex justify-between">


                      {Object.values(ssoproviders).map((provider: any) => (
                        <div key={provider.name}>
                          <button onClick={() => signIn(provider.id)}>
                            Sign in with {provider.name}
                          </button>
                        </div>
                      ))}

                      <Button onPress={() => onSuccessEvent} className="w-[60px] h-[60px] md:w-[77px] md:h-[77px] bg-transparent p-0 rounded-full">
                        <Image src={facebook} width={77} height={77} alt="Facebook login" className="w-[60px] h-[60px] md:w-[77px] md:h-[77px]" />
                      </Button>
                      <Button onPress={() => signIn()} className="w-[60px] h-[60px] md:w-[77px] md:h-[77px] bg-transparent p-0 rounded-full">
                        <Image src={google} width={77} height={77} alt="Google login" className="w-[60px] h-[60px] md:w-[77px] md:h-[77px]" />
                      </Button>
                      <Button onPress={() => onSuccessEvent} className="w-[60px] h-[60px] md:w-[77px] md:h-[77px] bg-transparent p-0 rounded-full">
                        <Image src={instagram} width={77} height={77} alt="Instagram login" className="w-[60px] h-[60px] md:w-[77px] md:h-[77px]" />
                      </Button>
                    </div>
                  </div> : null
                }
              </ModalBody>

            </>
          )}
        </ModalContent>
      </Modal>


    </div>
  );
}
