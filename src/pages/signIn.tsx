import { Avatar, Button, CircularProgress, Modal, ModalBody, ModalContent, useDisclosure } from "@nextui-org/react";
import { getCookies, setCookie } from 'cookies-next';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import NextAuth, { getServerSession } from "next-auth/next"
import { OAuthConfig } from "next-auth/providers";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react"
import { getProviders } from "next-auth/react"
import { NextSeo } from "next-seo";
import React, { useEffect, useState } from "react";


import closeIcon from '../components/background-images/closeIcon.svg';
import facebook from '../components/background-images/facebook-login.svg';
import google from '../components/background-images/google_login.svg';
import instagram from '../components/background-images/instagram_login.svg';
import { authOptions } from "../pages/api/auth/[...nextauth]"
import Layout from "./Layout";

import { vtoService } from "~/services/VTOService";

export class LoginResultViewModel {
  access_token: string;
  uid: string;
  bizId: string;
  email: string;
  nickname: string;
  username: string;
  credit: number;
}



export default function Authenticate(props) {


  const { data: session } = useSession()
  const router = useRouter()

  const [email, setEmail] = useState<string>();
  const [name, setName] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [currentUser, setCurrentUser] = useState<UserEntity>()
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");
  const [message, setMessage] = useState<string>();
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  // reset

  // 
  // if (session?.user?.email) {
  //   router.push("/business-app")
  // }

  useEffect(() => {
    vtoService.tokenHeader = "";
    localStorage.clear()


  }, [])




  const onSubmit = () => {

    if (!isLogin && password !== rePassword) {
      setMessage("Password was not match!");
      setLoading(false)
      return;
    }

    if (isLogin) {
      setMessage("Authenticating...");
      onLoginSubmit()
    }
    else {
      setMessage("Registering...");
      onRegisterSubmit()
    }
  }

  const onRegisterSubmit = async () => {

    // validate....

    const registerObj = {
      "email": email,
      "nickname": name,
      "username": username ?? email,
      "password": password,
      "clientUniqueKey": "string",
      "isSignUp": !isLogin,
    }
    setLoading(true)

    // example
    setCookie('name', name);
    setCookie('username', username);
    setCookie('email', email);
    router.push('/play-architecture');
    // end-example
    return;

    await vtoService.registerAPI(registerObj).then(
      (res) => {

        const data: LoginResultViewModel = res.data as LoginResultViewModel;


        localStorage.setItem("token", data.access_token)
        localStorage.setItem("username", data.username);
        localStorage.setItem("nickname", data.nickname);
        localStorage.setItem("email", data.email);
        localStorage.setItem("bizId", data.bizId);
        localStorage.setItem("credit", data.credit?.toString());

        vtoService.tokenHeader = res.data.access_token;
        setCookie('bizId', data.bizId);
        setCookie('token', data.access_token);
        router.push('/play-architecture')
      }
    ).catch((e) => {

      setMessage(e.response?.data?.message)
    }).finally(() => { setLoading(false) });
  };


  const onLoginSubmit = async () => {
    const loginObj = {
      "email": email,
      "nickname": name,
      "username": username ?? email,
      "password": password,
      "clientUniqueKey": "string",
      "isSignUp": !isLogin,
    }
    setLoading(true)
    // example
    setCookie('name', name);
    setCookie('username', username);
    setCookie('email', email);
    router.push('/play-architecture');
    // end-example
    return;
    await vtoService.loginAPI(loginObj).then(
      (res) => {


        const data: LoginResultViewModel = res.data as LoginResultViewModel;


        localStorage.setItem("token", data.access_token)
        localStorage.setItem("username", data.username);
        localStorage.setItem("nickname", data.nickname);
        localStorage.setItem("email", data.email);
        localStorage.setItem("bizId", data.bizId);
        localStorage.setItem("credit", data.credit?.toString() ?? "0");

        vtoService.tokenHeader = res.data.access_token;
        //signIn('email', { email: data.email, name: data.bizId, phone: "" });
        setCookie('bizId', data.bizId);
        setCookie('token', data.access_token);
        router.push('/business-app')
      }
    ).catch((e) => {

      setMessage(e.response?.data?.message)
    }).finally(() => { setLoading(false) });
  }

  return (

    <Layout>
      <NextSeo
        title={`${"Đăng nhập "}`}
        description={"" || ""}

        canonical={`/www.archiroom.vn/signIn`}
        twitter={{
          cardType: "summary_large_image",
        }}
      />
      <div className="relative flex min-h-dvh flex-col  bg-amber-800" id="app-container">
        {session?.user?.email}
        <div className="flex items-center  h-screen justify-center p-4">
          <div className="flex h-full w-full items-center justify-center">
            <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
              <div className="flex justify-between w-full">
                <div className="flex ">
                  <Avatar

                    as="button"
                    className="transition-transform"
                    

                    size="sm"
                    src="/archiroom/logo.png"
                  />

                  <p className="px-2 pt-1 text-lg font-medium">{isLogin ? "Đăng nhập" : "Đăng ký "}</p>
                </div>
                <span onClick={() => setIsLogin(!isLogin)} className="cursor-pointer py-2 relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-small text-primary no-underline hover:opacity-80 active:opacity-disabled transition-opacity" role="link" >
                  {isLogin ? "Đăng ký ?" : "Đăng nhập ?"}
                </span>
              </div>

              <div className="flex flex-col gap-3 pt-4">

                {!isLogin && (
                  <div className="group flex flex-col w-full py-1" data-slot="base" data-filled="true" data-filled-within="true" data-required="true" data-has-elements="true" data-has-label="true">
                    <div data-slot="input-wrapper" className="relative w-full inline-flex tap-highlight-transparent shadow-sm px-3 border-medium border-default-200 data-[hover=true]:border-default-400 group-data-[focus=true]:border-default-foreground min-h-unit-10 rounded-medium flex-col items-start justify-center gap-0 transition-background !duration-150 transition-colors motion-reduce:transition-none h-14 py-2" >
                      <label data-slot="label" className="absolute z-10 pointer-events-none origin-top-left subpixel-antialiased block text-foreground-500 cursor-text after:content-['*'] after:text-danger after:ml-0.5 will-change-auto !duration-200 !ease-out motion-reduce:transition-none transition-[transform,color,left,opacity] group-data-[filled-within=true]:text-default-600 group-data-[filled-within=true]:pointer-events-auto group-data-[filled-within=true]:scale-85 text-small group-data-[filled-within=true]:-translate-y-[calc(50%_+_theme(fontSize.small)/2_-_6px_-_theme(borderWidth.medium))] pe-2 max-w-full text-ellipsis overflow-hidden" id="react-aria9767239137-:r1:" >
                        Tên người dùng</label>
                      <div data-slot="inner-wrapper" className="inline-flex w-full items-center h-full box-border group-data-[has-label=true]:items-end">
                        <input
                          data-slot="input"
                          className="w-full font-normal bg-transparent !outline-none placeholder:text-foreground-500 focus-visible:outline-none data-[has-start-content=true]:ps-1.5 data-[has-end-content=true]:pe-1.5 text-xs"
                          aria-label="Email" aria-required="true" placeholder="Enter your username"
                          type="text"
                          value={username}
                          onChange={(evt) => setUsername(evt.target.value)}
                          name="username" />
                      </div>
                    </div>
                  </div>
                )}

                <div className="group flex flex-col w-full py-1" data-slot="base" data-filled="true" data-filled-within="true" data-required="true" data-has-elements="true" data-has-label="true">
                  <div data-slot="input-wrapper" className="relative w-full inline-flex tap-highlight-transparent shadow-sm px-3 border-medium border-default-200 data-[hover=true]:border-default-400 group-data-[focus=true]:border-default-foreground min-h-unit-10 rounded-medium flex-col items-start justify-center gap-0 transition-background !duration-150 transition-colors motion-reduce:transition-none h-14 py-2" >
                    <label data-slot="label" className="absolute z-10 pointer-events-none origin-top-left subpixel-antialiased block text-foreground-500 cursor-text after:content-['*'] after:text-danger after:ml-0.5 will-change-auto !duration-200 !ease-out motion-reduce:transition-none transition-[transform,color,left,opacity] group-data-[filled-within=true]:text-default-600 group-data-[filled-within=true]:pointer-events-auto group-data-[filled-within=true]:scale-85 text-small group-data-[filled-within=true]:-translate-y-[calc(50%_+_theme(fontSize.small)/2_-_6px_-_theme(borderWidth.medium))] pe-2 max-w-full text-ellipsis overflow-hidden" id="react-aria9767239137-:r6:" >
                      Email
                    </label>
                    <div data-slot="inner-wrapper" className="inline-flex w-full items-center h-full box-border group-data-[has-label=true]:items-end">
                      <input
                        data-slot="input"
                        value={email}
                        onChange={(evt) => setEmail(evt.target.value)}
                        className="w-full font-normal bg-transparent !outline-none placeholder:text-foreground-500 focus-visible:outline-none data-[has-start-content=true]:ps-1.5 data-[has-end-content=true]:pe-1.5 text-xs" aria-label="Email" aria-required="true" placeholder="Enter your email"
                        type="email"
                        name="email" />
                    </div>
                  </div>
                </div>

                <div className="group flex flex-col w-full py-1" data-slot="base" data-filled="true" data-filled-within="true" data-required="true" data-has-elements="true" data-has-label="true">
                  <div data-slot="input-wrapper" className="relative w-full inline-flex tap-highlight-transparent shadow-sm px-3 border-medium border-default-200 data-[hover=true]:border-default-400 group-data-[focus=true]:border-default-foreground min-h-unit-10 rounded-medium flex-col items-start justify-center gap-0 transition-background !duration-150 transition-colors motion-reduce:transition-none h-14 py-2" >
                    <label data-slot="label" className="absolute z-10 pointer-events-none origin-top-left subpixel-antialiased block text-foreground-500 cursor-text after:content-['*'] after:text-danger after:ml-0.5 will-change-auto !duration-200 !ease-out motion-reduce:transition-none transition-[transform,color,left,opacity] group-data-[filled-within=true]:text-default-600 group-data-[filled-within=true]:pointer-events-auto group-data-[filled-within=true]:scale-85 text-small group-data-[filled-within=true]:-translate-y-[calc(50%_+_theme(fontSize.small)/2_-_6px_-_theme(borderWidth.medium))] pe-2 max-w-full text-ellipsis overflow-hidden" id="react-aria9767239137-:rb:" >
                      Mật khẩu
                    </label>
                    <div data-slot="inner-wrapper" className="inline-flex w-full items-center h-full box-border group-data-[has-label=true]:items-end">
                      <input
                        data-slot="input"
                        data-has-end-content="true"
                        className="w-full font-normal bg-transparent !outline-none placeholder:text-foreground-500 focus-visible:outline-none data-[has-start-content=true]:ps-1.5 data-[has-end-content=true]:pe-1.5 text-xs"
                        aria-label="Password"
                        aria-required="true"
                        placeholder="Enter your password"
                        type="password"
                        value={password}
                        onChange={(evt) => setPassword(evt.target.value)}
                        name="password" />

                      <button type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="pointer-events-none text-2xl text-default-400 iconify iconify--solar" width="1em" height="1em" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M9.75 12a2.25 2.25 0 1 1 4.5 0a2.25 2.25 0 0 1-4.5 0"></path>
                          <path fill="currentColor" fillRule="evenodd" d="M2 12c0 1.64.425 2.191 1.275 3.296C4.972 17.5 7.818 20 12 20c4.182 0 7.028-2.5 8.725-4.704C21.575 14.192 22 13.639 22 12c0-1.64-.425-2.191-1.275-3.296C19.028 6.5 16.182 4 12 4C7.818 4 4.972 6.5 3.275 8.704C2.425 9.81 2 10.361 2 12m10-3.75a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5" clipRule="evenodd"></path>
                        </svg>
                      </button>

                    </div>
                  </div>
                </div>

                {!isLogin && (
                  <div className="group flex flex-col w-full py-1" data-slot="base" data-filled="true" data-filled-within="true" data-required="true" data-has-elements="true" data-has-label="true">
                    <div data-slot="input-wrapper" className="relative w-full inline-flex tap-highlight-transparent shadow-sm px-3 border-medium border-default-200 data-[hover=true]:border-default-400 group-data-[focus=true]:border-default-foreground min-h-unit-10 rounded-medium flex-col items-start justify-center gap-0 transition-background !duration-150 transition-colors motion-reduce:transition-none h-14 py-2" >
                      <label data-slot="label" className="absolute z-10 pointer-events-none origin-top-left subpixel-antialiased block text-foreground-500 cursor-text after:content-['*'] after:text-danger after:ml-0.5 will-change-auto !duration-200 !ease-out motion-reduce:transition-none transition-[transform,color,left,opacity] group-data-[filled-within=true]:text-default-600 group-data-[filled-within=true]:pointer-events-auto group-data-[filled-within=true]:scale-85 text-small group-data-[filled-within=true]:-translate-y-[calc(50%_+_theme(fontSize.small)/2_-_6px_-_theme(borderWidth.medium))] pe-2 max-w-full text-ellipsis overflow-hidden" id="react-aria9767239137-:rg:" >
                        Nhập lại password
                      </label>
                      <div data-slot="inner-wrapper" className="inline-flex w-full items-center h-full box-border group-data-[has-label=true]:items-end">
                        <input
                          data-slot="input"
                          data-has-end-content="true"
                          className="w-full font-normal bg-transparent !outline-none placeholder:text-foreground-500 focus-visible:outline-none data-[has-start-content=true]:ps-1.5 data-[has-end-content=true]:pe-1.5 text-xs" aria-label="Confirm Password" placeholder="Confirm your password"
                          type="password"
                          value={rePassword}
                          onChange={(evt) => setRePassword(evt.target.value)}
                          name="confirmPassword" />
                        <button type="button">
                          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="pointer-events-none text-2xl text-default-400 iconify iconify--solar" width="1em" height="1em" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M9.75 12a2.25 2.25 0 1 1 4.5 0a2.25 2.25 0 0 1-4.5 0"></path>
                            <path fill="currentColor" fillRule="evenodd" d="M2 12c0 1.64.425 2.191 1.275 3.296C4.972 17.5 7.818 20 12 20c4.182 0 7.028-2.5 8.725-4.704C21.575 14.192 22 13.639 22 12c0-1.64-.425-2.191-1.275-3.296C19.028 6.5 16.182 4 12 4C7.818 4 4.972 6.5 3.275 8.704C2.425 9.81 2 10.361 2 12m10-3.75a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5" clipRule="evenodd"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {!isLogin && (
                  <label className="group relative max-w-fit inline-flex items-center justify-start cursor-pointer tap-highlight-transparent p-2 -m-2 py-4">
                    <div >
                      <input aria-label=" " aria-labelledby=":rk:" aria-required="true" type="checkbox" value="" /></div>

                    <span id=":rk:" className="px-2 relative text-foreground select-none text-small transition-colors-opacity before:transition-width motion-reduce:transition-none">I agree with the&nbsp;<a className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-small text-primary no-underline hover:opacity-80 active:opacity-disabled transition-opacity" role="link" href="#">Terms</a>&nbsp; and&nbsp;<a className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-small text-primary no-underline hover:opacity-80 active:opacity-disabled transition-opacity" role="link" href="#">Privacy Policy</a></span>
                  </label>
                )}
                <span className="px-2 relative text-red-800 select-none text-sm transition-colors-opacity before:transition-width motion-reduce:transition-none">
                  {message}
                </span>



                <button onClick={() => onSubmit()} disabled={loading} className="z-0 py-2 group relative inline-flex items-center justify-center box-border font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-gradient-to-tr to-emerald-600 from-amber-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600 rounded-xl cursor-pointer">
                  {isLogin ? "Sign In" : "Sign Up"}
                  {loading && (<CircularProgress className="px-1" color="danger" size='sm' isDisabled={true} hidden={true} aria-label="Loading..." />)}
                </button>
              </div>
              <div className="flex items-center gap-4 py-2">
                <hr className="bg-divider border-none w-full h-divider flex-1" role="separator" />
                <p className="shrink-0 text-tiny text-default-500">OR</p>
                <hr className="bg-divider border-none w-full h-divider flex-1" role="separator" />
              </div>
              <div className="flex flex-col gap-2">

                {Object.values(authOptions?.providers ?? []).map((provider: OAuthConfig<any>) => (
                  <button key={provider.name} onClick={() => signIn(provider.id)} className="z-0 py-2 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 border-medium px-unit-4 min-w-unit-20 h-unit-10 text-small gap-unit-2 rounded-medium [&amp;>svg]:max-w-[theme(spacing.unit-8)] data-[pressed=true]:scale-[0.97] transition-transform-colors-opacity motion-reduce:transition-none bg-transparent border-default text-foreground data-[hover=true]:opacity-hover" type="button">

                    {provider.name === "Google" && (
                      <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" focusable="false" className="iconify iconify--flat-color-icons" width="24" height="24" viewBox="0 0 48 48">
                        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917"></path>
                        <path fill="#FF3D00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691"></path>
                        <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44"></path>
                        <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917"></path>
                      </svg>)}
                    {provider.name === "Facebook" && (<img src="/animates/facebook.svg" height={24} width={24} />)}


                    <span className="mx-2">  {isLogin ? "Sign In" : "Sign Up"} with {provider.name}</span>
                  </button>
                ))}
              </div>
              <p className="text-center text-small">hoặc dùng thử bản demo ? &nbsp;<a className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-small text-primary no-underline hover:opacity-80 active:opacity-disabled transition-opacity" role="link" href="/play-architecture">here</a></p>
            </div>
          </div>
        </div>
      </div>
    </Layout>

  );
}
