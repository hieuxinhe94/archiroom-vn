import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import { useRouter as useRouter2 } from 'next/navigation'
import { useRouter } from "next/router";
import { getServerSession, Session } from "next-auth";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react"
import { NextSeo } from "next-seo";
import { useState } from 'react'
import { useEffect } from "react";
import React from "react";

import AnnouncementBar from "~/components/announcementBar";
import BizBilling from "~/components/biz/bizBilling";
import BizCollectionItem from "~/components/biz/bizCollectionItem";
import { BizCollection } from "~/components/biz/bizCollections";
import BizDashboard, { BizCardListCollection, BizCardListGeneratives, BizCardListModel } from "~/components/biz/bizDashboard";
import { BizGenerate, BizResult } from "~/components/biz/bizGenerate";
import BizGenerateItem from "~/components/biz/bizGenerateItem";
import BizGenerateItemResult from "~/components/biz/bizGenerateItemResult";
import BizModelItem from "~/components/biz/bizModelItem";
import { BizModel } from "~/components/biz/bizModels";
import BizWelcome from "~/components/biz/bizwelcome";
import Navbar2 from '~/components/navbar'
import { getHomepageData } from "~/lib/client";
import { urlForImage } from "~/lib/sanity.image"
import { authOptions } from '~/pages/api/auth/[...nextauth]'
import { vtoService } from "~/services/VTOService";

import { getCurrentUserByBrowser, putCachingUserToBrowser } from "./try-on-plugin";
import BizImagePreview from "~/components/biz/bizImagePreview";
import { getCookie } from "cookies-next";
import { BizCardAffiliate } from "~/components/biz/BizCardAffiliate";


export enum BusinessType {
  INDIVIDUAL,
  BUSINESS
}

async function getAllModels(userid: string): Promise<BizModel[]> {
  const res = await vtoService.getAllModels(userid ?? "000");
  if (res.status !== 200) {
    throw new Error('Failed to fetch data')
  }
  return res.data
}

async function getAllCollections(userid: string): Promise<BizCollection[]> {
  const res = await vtoService.getAllCollections(userid);
  if (res.status !== 200) {
    throw new Error('Failed to fetch data')
  }
  return res.data
}

async function getAllGenerates(userid: string): Promise<BizGenerate[]> {
  const res = await vtoService.getAllGeneratives(userid);
  if (res.status !== 200) {
    throw new Error('Failed to fetch data')
  }
  return res.data
}

async function getGeneratesDetail(albumId: string): Promise<BizGenerate> {
  const res = await vtoService.getGenerative(albumId);
  if (res.status !== 200) {
    throw new Error('Failed to fetch data')
  }
  return res.data
}

async function getUserDetail(usernameOrEmail: string): Promise<UserEntity> {
  const res = await vtoService.getUserInfo(usernameOrEmail);
  if (res.status !== 200) {
    throw new Error('Failed to fetch data')
  }
  return res.data
}


export async function getServerSideProps(context) {
  let session: Session;
  let userEntity: UserEntity = {};
  try {
    session = await getServerSession(context.req, context.res, authOptions)
    if (session && session.user) {
      userEntity.username = session.user.email;
      userEntity.email = session.user.email;
      userEntity.bizId = session.user.email;
      userEntity.name = session.user.name;
      userEntity.nickname = session.user.name;
    }
  } catch {

  }

  let bizId = "";

  bizId = session ? session?.user?.email : null;

  if (!bizId && bizId?.length < 3) {
    const cookies: string[] = (context.req.headers.cookie ?? ';').split(';').filter(x => x.indexOf('bizId') >= 0)

    if (cookies && cookies.length) {
      let bizIdCookie = cookies[0].split("=");
      bizId = bizIdCookie[1];
    }
  }

  if (!bizId || bizId?.length < 3) {
    bizId = ("000") // demo bizId
  }





  return {
    props: {
      session: session?.user ?? null,
      bizId: bizId,
      currentUser: userEntity
    }
  }
}



export const getUpdateAuthenticateUser = (current: UserEntity) => {
  if (localStorage) {
    current.access_token = localStorage.getItem("access_token");
    current.username = localStorage.getItem("username");
    current.nickname = localStorage.getItem("nickname");
    current.email = localStorage.getItem("email");
    current.bizId = localStorage.getItem("bizId") ?? current.bizId;
  }


  return current;
}

export default function BusinessApp(props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const router2 = useRouter2();

  const [currentUser, setCurrentUser] = useState<UserEntity>(props.currentUser)


  const [businessType, setBusinessType] = useState(BusinessType.BUSINESS)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const [featureId, setFeatureId] = useState<string>("");

  if (currentUser)
    currentUser.bizId = currentUser.bizId ?? props.bizId;
  let session: Session = props.session;
  const [currentModelDetail, setCurrentModelDetail] = useState<BizModel>();
  const [currentCollectionDetail, setCurrentCollectionDetail] = useState<BizCollection>();
  const [currentGenerativeDetail, setCurrentGenerativeDetail] = useState<BizGenerate>();

  const [isModelOpen, setIsModelOpen] = useState(false)
  const [imagesPreviewing, setImagesPreviewing] = useState<string[]>([])
  const [indexPreviewing, setIndexPreviewing] = useState<number>(0)
  const [outputPreviewing, setOutputPreviewing] = useState<BizResult[]>([])

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [hasLogin, setHasLogin] = React.useState(false);
  const [allModels, setAllModels] = useState<BizModel[]>([])
  const [allCollections, setAllCollections] = useState<BizCollection[]>([])
  const [allGeneratives, setAllGeneratives] = useState<BizGenerate[]>([])
  const [currentGenerative, setCurrentGenerative] = useState<BizGenerate>()

  if (props?.session) {

    vtoService.tokenHeader = props.session.user
  }

  React.useEffect(() => {

    if (session?.user?.email && !props.currentUser) {

      // currentUser.email = session?.user?.email;
      // currentUser.name = session?.user?.name;
      // currentUser.avatar = session?.user?.image

      //localStorage.setItem("token", session.user.name)
      localStorage.setItem("username", session.user.email);
      localStorage.setItem("nickname", session.user.name);
      localStorage.setItem("email", session.user.email);
      localStorage.setItem("bizId", session.user.email);
      setHasLogin(true)
      setCurrentUser(currentUser)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  React.useEffect(() => {
    if (!currentUser?.username) {

      const cachedUser = getUpdateAuthenticateUser(currentUser);
      setHasLogin(true)
      setCurrentUser({ ...cachedUser });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (!featureId) {
      const f = router.query.f;
      const reqFeature = f ? f.toString() : "";
      setFeatureId(reqFeature)
    }

  }, [router, featureId]);

  useEffect(() => {
    let currentUsername = currentUser.email ?? currentUser.username ?? session?.user?.email;

    let currentUserTmp: UserEntity = currentUser;

    if (currentUsername) {
      currentUser.bizId = currentUser.bizId ?? currentUser.username ?? currentUser.email ?? session?.user?.email ?? vtoService.bizId


      getUserDetail(currentUsername)
        .then((data: UserEntity) => {


          currentUserTmp = data;
          setCurrentUser(data)
          setHasLogin(true)
          vtoService.bizId = data.bizId;
          vtoService.tokenHeader = data.access_token;
          localStorage.setItem("access_token", data.access_token);
        });
    }

    getAllModels(currentUserTmp.bizId)
      .then((data) => {


        setAllModels(data)
      });

    getAllCollections(currentUserTmp.bizId)
      .then((data) => {


        setAllCollections(data)
      })

    getAllGenerates(currentUserTmp.bizId)
      .then((allGeneratives) => {


        setAllGeneratives(allGeneratives)
        const recentBatch = allGeneratives?.length ? allGeneratives.findLast(x => x._id) : null;

        if (recentBatch && recentBatch._id) {
          getGeneratesDetail(recentBatch._id)
            .then((recentBatch) => {


              setCurrentGenerative(recentBatch)
            })
        }
      })


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.bizId])

  const menuItems = [
    { text: "Dashboard", href: "/business-app?f=dashboard", isActive: true },
    { text: "Collections", href: "/business-app?f=collections", isActive: false },
    { text: "Models", href: "/business-app?f=models", isActive: false },
    { text: "Lookbooks", href: "/business-app?f=generatives", isActive: false },
    { text: "Billing", href: "/business-app?f=billing", isActive: false },
    { text: "Affiliate", href: "/business-app?f=affiliate", isActive: false },
    { text: hasLogin ? "" : "Sign In", href: "/authenticate", isActive: false },
  ];

  return (
    <>
      <NextSeo
        title="Fashion Studio TryOnHub.AI"
        description="Virtual try on clothing studio for business."
        canonical="https://www.tryonhub.ai/business-app"
        openGraph={{
          url: 'https://www.tryonhub.ai/business-app',
          title: "Fashion Studio TryOnHub.AI",
          description: 'TryOnHub.AI Fashion Studio, AI thử mặc thời trang',
          images: [
            {
              url: 'https://www.tryonhub.ai/animates/biz-studio.png',
              width: 800,
              height: 600,
              alt: 'Fashion Studio TryOnHub.AI',
              type: 'image/jpeg',
            },
            {
              url: 'https://www.tryonhub.ai/animates/biz-studio-2.png',
              width: 900,
              height: 800,
              alt: 'Fashion Studio TryOnHub.AI',
              type: 'image/jpeg',
            },

          ],
          siteName: 'TryOnHub.AI',
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />

      {!hasLogin && (<AnnouncementBar props={{
        data: {
          projectName: '*Preview',
          greetings: 'You\'re using test data. Activate your account to access all live data.',
          buttonText: 'Register or Sign in now',
          hyperlink: "/authenticate"
        }
      }} />
      )}

      {isModelOpen && <BizImagePreview
        onClose={() => setIsModelOpen(!isModelOpen)}
        images={imagesPreviewing}
        indexPreviewing={indexPreviewing}
        resultList={outputPreviewing}
      />
      }

      <Navbar isBordered className="text-sm bg-white">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarMenu className="text-sm mt-12px" style={{ marginTop: "50px", top: "130px" }}>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link color="foreground" href={item.href} className="text-sm px-2">
                {item.text}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
        <a href="/business-app" className="hidden sm:block font-bold text-inherit pt-1">Fashion AI Studio</a>
        <NavbarContent className="hidden sm:flex gap-3 text-sm mt-12px " >
          {
            menuItems.map((item, index) => (
              <NavbarItem key={index}>
                <Link color="foreground" href={item.href} className="text-sm px-2">
                  {item.text}
                </Link>
              </NavbarItem>
            ))
          }

        </NavbarContent>

        <NavbarContent as="div" className="items-center" justify="end" >

          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src={currentUser?.avatar ?? "favicon.ico"}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{currentUser?.email ?? "demo-biz@tryonhub.ai"}</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
              {currentUser?.email && (<DropdownItem onClick={() => { signOut({ redirect: false }); router2.push("/authenticate"); }} key="logout" color="danger">
                Log Out
              </DropdownItem>)}
              {!currentUser?.email && (<DropdownItem onClick={() => { router2.push("/authenticate"); }} key="login" color="danger">
                Sign In
              </DropdownItem>)}
            </DropdownMenu>

          </Dropdown>
        </NavbarContent>
        <span className="flex text-sm pt-1">{currentUser?.name ?? currentUser?.username ?? currentUser?.email} <span className="px-2 text-sm flex">

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-indigo-800 ">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          {currentUser?.credit ?? 0}
        </span></span>
      </Navbar>

      <section>
        <div className="" >
          <section data-aos="zoom-in" data-aos-duraion={2000} className="mx-auto mobile:mb-20 mobile:mt-0  overflow-hidden bg-white pb-20">
            <div className="relative bg-white mx-auto flex w-full max-w-8xl flex-auto justify-center sm:px-2 lg:px-8 xl:px-12">
              {
                (isSidebarOpen) && (<HelpCard />)
              }
              <div className="min-w-0   max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pl-8 lg:pr-0 xl:px-16">
                <article>


                  {
                    (featureId == "welcome") && <BizWelcome  {...props} session={session} />
                  }


                  {
                    (featureId == "") && <BizDashboard
                      currentUser={currentUser}
                      {...props}
                      session={session}
                      allModels={allModels}
                      allGeneratives={allGeneratives}
                      currentGenerative={currentGenerative}
                      allCollections={allCollections}

                      onModelDetail={() => { setIsSidebarOpen(true); setFeatureId("models") }}
                      onBillingDetail={() => { setIsSidebarOpen(true); setFeatureId("billing") }}
                      onCollectionDetail={(item) => { setCurrentCollectionDetail(item); setIsSidebarOpen(true); setFeatureId("itemCollection") }}
                      onGenerateBatch={() => { setIsSidebarOpen(true); setFeatureId("generateBatch") }}
                      openModelDetail={(item) => { setCurrentModelDetail(item); setIsSidebarOpen(true); setFeatureId("itemModel") }}
                      openGenerativeDetail={(item) => { setCurrentGenerativeDetail(item); setIsSidebarOpen(true); setFeatureId("generateBatch") }}
                      openGenerativeResult={(item) => { setCurrentGenerativeDetail(item); setIsSidebarOpen(true); setFeatureId("generateResult") }}
                      onPreViewItem={(images, index) => { setIsModelOpen(true); setImagesPreviewing(images), setIndexPreviewing(index) }}
                    />
                  }

                  {
                    (featureId == "generateResult") && <BizGenerateItemResult  {...props} session={session} currentUser={currentUser}
                      allModels={allModels}
                      allGeneratives={allGeneratives}
                      currentGenerative={currentGenerative}
                      allCollections={allCollections}

                      item={currentGenerativeDetail}
                      onPreViewItem={(images, index) => { setIsModelOpen(true); setImagesPreviewing(images), setIndexPreviewing(index) }}
                      onBack={() => { setIsSidebarOpen(true); setFeatureId("") }} />
                  }

                  {
                    (featureId == "generateBatch") && <BizGenerateItem  {...props} session={session} currentUser={currentUser}
                      allModels={allModels}
                      allGeneratives={allGeneratives}
                      currentGenerative={currentGenerative}
                      allCollections={allCollections}

                      item={currentGenerativeDetail}
                      onPreViewItem={(images, index) => { setIsModelOpen(true); setImagesPreviewing(images), setIndexPreviewing(index) }}
                      onBack={() => { setIsSidebarOpen(true); setFeatureId("") }} />
                  }
                  {
                    (featureId == "itemCollection") && <BizCollectionItem  {...props} session={session} currentUser={currentUser}
                      allModels={allModels}
                      allGeneratives={allGeneratives}
                      currentGenerative={currentGenerative}
                      allCollections={allCollections}
                      item={currentCollectionDetail}
                      onPreViewItem={(images, index) => { setIsModelOpen(true); setImagesPreviewing(images), setIndexPreviewing(index) }}
                      onBack={() => { setIsSidebarOpen(true); setFeatureId("") }} />
                  }
                  {
                    (featureId == "collections") && <BizCardListCollection size={"lg"}  {...props} session={session} currentUser={currentUser}
                      allModels={allModels}
                      allGeneratives={allGeneratives}
                      currentGenerative={currentGenerative}
                      allCollections={allCollections}
                      openCollectionDetail={(item) => { setCurrentCollectionDetail(item); setIsSidebarOpen(true); setFeatureId("itemCollection") }}
                      onPreViewItem={(images, index) => { setIsModelOpen(true); setImagesPreviewing(images), setIndexPreviewing(index) }}
                      onBack={() => { setIsSidebarOpen(true); setFeatureId("") }} />
                  }

                  {
                    (featureId == "itemModel") && <BizModelItem {...props} session={session} currentUser={currentUser}
                      allModels={allModels}
                      allGeneratives={allGeneratives}
                      currentGenerative={currentGenerative}
                      allCollections={allCollections}

                      item={currentModelDetail}
                      onPreViewItem={(images, index) => { setIsModelOpen(true); setImagesPreviewing(images), setIndexPreviewing(index) }}
                      onBack={() => { setIsSidebarOpen(true); setFeatureId("") }} />
                  }

                  {
                    (featureId == "models") && <BizCardListModel {...props} session={session} currentUser={currentUser}
                      allModels={allModels}
                      allGeneratives={allGeneratives}
                      currentGenerative={currentGenerative}
                      allCollections={allCollections}
                      size={"lg"}
                      onAddNew={() => props.openModelDetail()}
                      openModelDetail={(item) => { setCurrentModelDetail(item); setIsSidebarOpen(true); setFeatureId("itemModel") }}
                      onPreViewItem={(images, index) => { setIsModelOpen(true); setImagesPreviewing(images), setIndexPreviewing(index) }}
                      onBack={() => props.onBack()}
                    />
                  }

                  {
                    (featureId == "generatives") && <BizCardListGeneratives {...props} session={session} currentUser={currentUser}
                      allModels={allModels}
                      allGeneratives={allGeneratives}
                      currentGenerative={currentGenerative}
                      allCollections={allCollections}
                      size={"lg"}
                      onAddNew={() => props.openModelDetail()}
                      onBack={() => props.onBack()}
                      openGenerativeResult={(item) => { setCurrentGenerativeDetail(item); setIsSidebarOpen(true); setFeatureId("generateResult") }}
                      onPreViewItem={(images, index) => { setIsModelOpen(true); setImagesPreviewing(images), setIndexPreviewing(index) }}
                    />
                  }

                  {
                    (featureId == "billing") && <BizBilling  {...props} session={session} currentUser={currentUser}
                      onBack={() => { setIsSidebarOpen(true); setFeatureId("") }} />
                  }
                  {(featureId == "affiliate") && <BizCardAffiliate size={"lg"}  {...props} session={session} currentUser={currentUser}
                    allModels={allModels}
                    allGeneratives={allGeneratives}
                    currentGenerative={currentGenerative}
                    allCollections={allCollections}
                    openCollectionDetail={(item) => { setCurrentCollectionDetail(item); setIsSidebarOpen(true); setFeatureId("itemCollection") }}
                    onPreViewItem={(images, index) => { setIsModelOpen(true); setImagesPreviewing(images), setIndexPreviewing(index) }}
                    onBack={() => { setIsSidebarOpen(true); setFeatureId("") }} />
                  }



                  <div className="mx-auto flex flex-col items-center justify-center px-8 pb-28 text-center sm:container">
                    {(featureId === "welcome") && <button onClick={() => { setIsSidebarOpen(true); setFeatureId("") }}
                      className="z-10 relative try-on-now-btn rounded-full bg-gradient-to-r from-purple-gd to-blue-gd text-white relative items-center justify-center rounded-md transition-all font-medium 2xl:px-6 2xl:py-3.5 px-8 py-3 copy-body button_primaryButton__ipohF bg-blurple text-white overflow-hidden inline-flex whitespace-nowrap" >
                      Ok, Lets start
                    </button>
                    }

                  </div>
                </article>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}

export function HelpCard() {

  return (<div className="hidden xl:block bg-gray-50 lg:relative  lg:flex-none" >
    <div className="absolute inset-y-0 right-0 w-[50vw] bg-gray-50 dark:hidden"></div>
    <div className="absolute bottom-0 right-0 top-16 hidden h-12 w-px bg-gradient-to-t from-slate-800 dark:block"></div>
    <div className="absolute bottom-0 right-0 top-28 hidden w-px bg-slate-800 dark:block"></div>
    <div className="sticky top-[4.75rem] -ml-0.5 h-[calc(100vh-4.75rem)] w-64 overflow-y-auto overflow-x-hidden py-16 pl-0.5 pr-8 xl:w-72 xl:pr-16">
      <nav className="text-base lg:text-sm"><ul role="list" className="space-y-9">
        <li>
          <h2 className="font-display font-medium text-slate-900 dark:text-white">Help you start?</h2>
          <ul role="list" className="mt-2 space-y-2 border-l-2 border-slate-100 lg:mt-4 lg:space-y-4 lg:border-slate-200 dark:border-slate-800">
            <li className="relative">
              <a className="block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full font-semibold ext-slate-600 before:bg-sky-500" href="/docs/installation">

                1. Create a new collection and upload your fashion design.
              </a>
            </li>
            <li className="relative">
              <a className="block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300" href="/">
                2. Create fashion models of your organization.
              </a>
            </li>

            <li className="relative">
              <a className="block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300" href="/">
                3. Or pick some pre-built AI models.
              </a>
            </li>

            <li className="relative">
              <a className="block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300" href="/">
                4. Click to button Start Generate to wearing your fashion design to the models.
              </a>
            </li>

            <li className="relative">
              <a className="block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300" href="/">
                4. Our AI will take an minutes to train and generate very realistic image for you.
              </a>
            </li>

            <li className="relative">
              <a className="block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300" href="/">
                5. An email will send for you after completion.
              </a>
            </li>
          </ul>
        </li>

      </ul>
      </nav>
    </div>
  </div>);
}

export const AcmeLogo = () => (
  <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export const SearchIcon = ({
  size = 24,
  strokeWidth = 1.5,
  width,
  height,
  ...props
}) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={height || size}
    role="presentation"
    viewBox="0 0 24 24"
    width={width || size}
    {...props}
  >
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
    <path
      d="M22 22L20 20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
  </svg>
);
