
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Chip, Input } from "@nextui-org/react";
import cx from "clsx";
import Image from "next/image";
import {Link} from "@nextui-org/react";
import React, { useState } from "react";
import { Fragment } from "react";

import { urlForImage } from "~/lib/sanity.image"
import { getCurrentUserByBrowser } from "~/pages/try-on-plugin";

export default function Navbar({ settings, menu, isHomepage = true, launchAppEvent, client = undefined, isLogin = false, hasSearch = false }) {


  const [currentUser, setCurrentUser] = useState<UserEntity>(getCurrentUserByBrowser())



  return (
    <div>

      <Disclosure>
        {({ open }) => (
          <>
            {/* <div className="relative">
                <Image src={purpleGradient} width={1200} height={1200} className='absolute top-[-100px] right-[70px]' />
                <Image src={polygon} width={900} height={900} className='absolute top-[-100px] right-[200px]' />
              </div>
              */}
            <div className="w-full flex flex-wrap justify-between md:flex-nowrap md:gap-10 py-[15px] relative">
              <div className="flex w-full items-center justify-between md:w-auto relative">
              
                <Link href={isHomepage ? "/" : "/try-on-shop"} className="w-[250px]  md:w-[185px] dark:hidden absolute md:static  left-0  md:translate-x-0 md:translate-y-0">
                  {settings?.logo ? (
                    <div className="">
                     
                      <Image
                        {...urlForImage(settings.logo)}
                        alt="Logo"
                        style={{height: "20px", width: "auto"}}
                        height={20}
                        priority={true}
                      />
                      <div className="text-white text-xs pt-1"> power by  <h2 className="tracking-tight inline font-semibold from-[#6FEE8D] to-[#17c964] text-sm bg-clip-text text-transparent bg-gradient-to-b">SIMPLIFY TECH&nbsp;</h2></div>
                    </div>
                  ) : (
                    <div>
                      <span className="block text-center">
                        TryOnHub.AI
                      </span>
                      <div className="text-white text-xs pt-1"> power by  <h2 className="tracking-tight inline font-semibold from-[#6FEE8D] to-[#17c964] text-sm bg-clip-text text-transparent bg-gradient-to-b">SIMPLIFY TECH&nbsp;</h2></div>
                    </div>
                  )}
                </Link>
                <Link href={isHomepage ? "/" : "/try-on-shop"} className="w-full hidden w-full dark:block">
                  {settings?.logoalt ? (
                    <Image
                      {...urlForImage(settings.logoalt)}
                      alt="Logo"
                      priority={true}
                      sizes="(max-width: 640px) 100vw, 200px"
                    />
                  ) : (
                    <div>
                      <span className="block text-center">
                        TryOnHub.AI
                      </span>
                      <div className="text-white text-xs"> power by  <h2 className="tracking-tight inline font-semibold from-[#6FEE8D] to-[#17c964] text-sm bg-clip-text text-transparent bg-gradient-to-b">SIMPLIFY TECH&nbsp;</h2></div>
                    </div>
                  )}
                </Link>
                <Disclosure.Button
                  aria-label="Toggle Menu"
                  className="ml-auto rounded-md py-1 text-white focus:outline-none md:hidden ">
                  <svg
                    className="h-6 w-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24">
                    {open && (
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                      />
                    )}
                    {!open && (
                      <path
                        fillRule="evenodd"
                        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                      />
                    )}
                  </svg>
                </Disclosure.Button>
              </div>
              <div className="order-1 hidden w-full flex-col items-center justify-start md:order-none md:flex md:w-auto md:flex-1 md:flex-row md:justify-center ">
                <Fragment key={`tools`}>
                  <Link
                    isExternal
                    showAnchorIcon
                    href={"/tools"}
                    className="px-5 py-2 text-sm  text-white focus:border-white border-transparent border-b-2"
                  >
                    <span className="text-purple-200 text-lg py-2 bg-stale-800" >  More Tools </span>
                  </Link>
                </Fragment>

                {menu.map((item, index) => (
                  <Fragment key={`${item.label}${index}`}>
                    {item.children && item.children.length > 0 ? (
                      <DropdownMenu
                        menu={item}
                        key={`${item.label}${index}`}
                        items={item.children} mobile={undefined} />
                    ) : (
                      <Link
                        href={item.href}
                        key={`${item.label}${index}`}
                        className="mx-3 lg:mx-8 my-2  text-lg text-white hover:border-white border-transparent border-b-2 duration-1000"
                      >
                        <div className="flex"> {item.label}  {item.isNew && (<Chip
                          variant="shadow"
                          classNames={{
                            base: "mx-2 bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
                            content: "drop-shadow shadow-black text-white",
                          }}
                        >
                          New
                        </Chip>)} </div>
                      </Link>
                    )}
                  </Fragment>
                ))}



              </div>
              {/* <div className="shrink-0 hidden md:block">
                  <a
                    href="/authenticate"
               
                    className="hover:scale-[1.03] hover:shadow-purple-700 hover:shadow-[0_0_20px_1px_rgba(0,0,0,0.1)] duration-500 rounded-full bg-gradient-to-r from-purple-gd to-blue-gd text-white text-base px-[32px] py-[8px]">
                    {'Sign In'}</a>
                </div> */}
            </div>
            <Disclosure.Panel>
              <div className="relative order-2 flex w-full flex-col items-center justify-center md:hidden">
              <Fragment key={`tools`}>
                  <Link
                    isExternal
                    showAnchorIcon
                    href={"/tools"}
                    className="px-5 py-2 text-sm  text-white focus:border-white border-transparent border-b-2"
                  >
                    <span className="text-purple-200 text-lg py-2 bg-stale-800" >  More Tools </span>
                  </Link>
                </Fragment>

                {menu.map((item, index) => (
                  <Fragment key={`${item.label}${index}`}>
                    {item.children && item.children.length > 0 ? (
                      <DropdownMenu
                        menu={item}
                        key={`${item.label}${index}`}
                        items={item.children}
                        mobile={true}
                      />
                    ) : (
                      <Link
                        href={item.href}
                        key={`${item.label}${index}`}
                        className="px-5 py-2 text-sm  text-white focus:border-white border-transparent text-white"
                      >
                        {item.label}  

                      </Link>
                    )}
                  </Fragment>
                ))}


              </div>


            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

    </div>
  );
}

const DropdownMenu = ({ menu, items, mobile }) => {
  return (
    <Menu
      as="div"
      className={cx("relative text-left z-50", mobile && "w-full")}>
      {({ open }) => (
        <>
          <Menu.Button
            className={cx(
              "flex items-center gap-x-1 rounded-md px-5 py-2 text-lg   outline-none transition-all focus:outline-none focus-visible:text-indigo-500 focus-visible:ring-1 dark:focus-visible:bg-gray-800",
              open
                ? "text-blue-500 hover:text-blue-500"
                : " text-white dark:text-gray-400 ",
              mobile ? "w-full px-4 py-2 " : "inline-block px-4 py-2"
            )}>
            <span>{menu.label}</span>
            <ChevronDownIcon className="mt-0.5 h-4 w-4" />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="lg:transition lg:ease-out lg:duration-100"
            enterFrom="lg:transform lg:opacity-0 lg:scale-95"
            enterTo="lg:transform lg:opacity-100 lg:scale-100"
            leave="lg:transition lg:ease-in lg:duration-75"
            leaveFrom="lg:transform lg:opacity-100 lg:scale-100"
            leaveTo="lg:transform lg:opacity-0 lg:scale-95">
            <Menu.Items
              className={cx(
                "z-20 origin-top-left rounded-md  focus:outline-none  lg:absolute lg:left-0  lg:w-56",
                !mobile && "bg-white shadow-lg  dark:bg-gray-800"
              )}>
              <div className={cx(!mobile && "py-3")}>
                {items.map((item, index) => (
                  <Menu.Item as="div" key={`${item.label}${index}`}>
                    {({ active }) => (
                      <Link
                        href={item?.path ?? item?.href}
                        className={cx(
                          "flex items-center space-x-2 px-5 py-2 text-lg lg:space-x-4",
                          active
                            ? "text-blue-500"
                            : "text-gray-700 hover:text-blue-500 focus:text-blue-500 dark:text-gray-300"
                        )}>
                        <span> {item.label}</span>

                      </Link>
                    )}
                  </Menu.Item>

                ))}

              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};


export const SearchIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M22 22L20 20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);
