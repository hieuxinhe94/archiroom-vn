
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import cx from "clsx";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Fragment } from "react";

import { urlForImage } from "~/lib/sanity.image"
import { getCurrentUserByBrowser } from "~/pages/try-on-plugin";
const menu = [
  {
    label: "Demo",
    href: "?launchdemo=true",
    children: ""
  },
  {
    label: "Try Before Buy",
    href: "/try-before-buy",

  },
  {
    label: "Business Portal",
    href: "/business-app"
  },
  {
    label: "Pricing",
    href: "https://docs.tryonhub.ai/guides/pricing"
  },
  {
    label: "Developer",
    href: "https://docs.tryonhub.ai/"
  },
  {
    label: "About us",
    href: "/about"
  }
];
export default function NavbarCommerce({ settings = {}, isHomepage = false, launchAppEvent, client = undefined, isLogin = false }) {
  const [currentUser, setCurrentUser] = useState<UserEntity>(getCurrentUserByBrowser())
  return (
    <div>
      <div className="justify-between-full fixed z-40 bg-[#fff] w-full left-0 top-0">
        <div className="flex flex-auto items-center mx-auto px-6 xl:container pt-3 pb-2">
          <div className="flex mx-auto flex-auto justify-between items-center relative">
            <div className="flex gap-4 md:gap-10 items-center">
              <a href="/en/">
                <div className="max-h-[80px] h-[30px] max-w-[100%] img-container">
                  <figure className="w-auto flex h-full">
                    <picture>
                      <img
                        src="/favicon.ico"
                        alt="frntr logo"
                        width={170}
                        height={30}
                        loading="eager"
                        style={{ width: "auto", height: "100%" }}
                      />
                     
                    </picture>
                    TryOnHUB.AI
                    <figcaption />
                  </figure>
                </div>
              </a>
              <div className="flex gap-10 lg:flex lg:items-center lg:flex-row flex-col lg:w-auto lg:h-auto lg:relative lg:px-0 lg:py-0 lg:mt-0 lg:top-0 hidden top-10 mt-5 bg-[#fff] w-full right-0 left-0 z-50 h-screen fixed left-0 bottom-0 px-10 py-10">
                <div className="xl:w-[340px] md:px-4 relative 270px">
                  <div className="relative z-30 flex items-center justify-between bg-grey h-10 rounded-full overflow-hidden focus-within:border">
                    <input
                      placeholder="Names, SKUs, categories"
                      className="bg-grey rounded-full overflow-hidden focus:border-textBlack outline-none px-6 w-full placeholder:text-[14px] placeholder:italic "
                      aria-label="Search"
                      type="text"
                      defaultValue=""
                    />
                    <a
                      className="w-10 p-4 h-full text-[#fff] flex justify-center items-center rounded-full"
                      href="/en/search?q="
                    >
                      <img
                        src="/animates/searchIcon.svg"
                        alt="search icon"
                        width={15}
                        height={15}
                      />
                    </a>
                  </div>
                </div>
                <a className="hover:underline" href="/en/shop">
                  Shop
                </a>
                <a className="hover:underline" href="/en/stories">
                  Stories
                </a>
                <span className="nav-anchor ">
                  <span className="text-lg lg:text-[16px] block hover:underline">
                    Promotions
                  </span>
                  <span className="hidden lg:flex text-[11px] caret">▼</span>
                  <ul
                    className="nav-dropdown"
                    style={{ gridTemplateColumns: "repeat(1, 1fr)" }}
                  >
                    <a href="/en/promotions/3-for-2">
                      <li className="hover:bg-grey text h-full text-sm w-full">
                        3 for 2
                      </li>
                    </a>
                    <a href="/en/promotions/4-for-3">
                      <li className="hover:bg-grey text h-full text-sm w-full">
                        4 for 3
                      </li>
                    </a>
                  </ul>
                </span>
                <span className="nav-anchor ">
                  <span className="text-lg lg:text-[16px] block hover:underline">
                    Room
                  </span>
                  <span className="hidden lg:flex text-[11px] caret">▼</span>
                  <ul
                    className="nav-dropdown"
                    style={{ gridTemplateColumns: "repeat(1, 1fr)" }}
                  >
                    <a href="/en/room/kitchen">
                      <li className="hover:bg-grey text h-full text-sm w-full">
                        Kitchen
                      </li>
                    </a>
                    <a href="/en/room/living-room">
                      <li className="hover:bg-grey text h-full text-sm w-full">
                        Living room
                      </li>
                    </a>
                  </ul>
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-auto items-center justify-end h-[40px] w-[100px]">
            <a className="p-2 rounded-md hover:bg-[#efefef]" href="/en/orders">
              <img
                className="w-[30px] h-[30px]"
                src="/build/_assets/userIcon-IK2GULGQ.svg"
                width={25}
                height={25}
                alt="User icon"
              />
            </a>
            <a className="p-2 rounded-md hover:bg-[#efefef] relative" href="/en/cart">
              <img
                className="w-[30px] h-[30px]"
                src="/build/_assets/basketIcon-DXTNOZGC.svg"
                width={25}
                height={25}
                alt="Basket icon"
              />
              <div className="absolute top-1 right-1 bg-[#ff0000] text-[#ffffff] w-[15px] h-[15px] rounded-full flex justify-center items-center text-[8px]">
                0
              </div>
            </a>
            <select
              className="w-[60px] px-2 border-2 hover:cursor-pointer"
              aria-label="Language switcher"
            >
              <option value="en" >  EN </option>
              <option value="no">NO</option>
            </select>
          </div>
          <div className="z-50 p-[10px] h-[40px] text-center rounded-md cursor-pointer hover:bg-[#efefef] lg:hidden block">
            <button
              type="button"
              className="focus:outline-none"
              aria-controls="mobile-menu"
              aria-label="Mobile Menu"
              title="Mobile Menu"
              aria-expanded="false"
            >
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

const DropdownMenu = ({ menu, items, mobile }) => {
  return (
    <Menu
      as="div"
      className={cx("relative text-left", mobile && "w-full")}>
      {({ open }) => (
        <>
          <Menu.Button
            className={cx(
              "flex items-center gap-x-1 rounded-md px-5 py-2 text-sm font-medium  outline-none transition-all focus:outline-none focus-visible:text-indigo-500 focus-visible:ring-1 dark:focus-visible:bg-gray-800",
              open
                ? "text-blue-500 hover:text-blue-500"
                : " text-gray-600 dark:text-gray-400 ",
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
                  <Menu.Item as="div" key={`${item.title}${index}`}>
                    {({ active }) => (
                      <Link
                        href={item?.path ? item.path : "#"}
                        className={cx(
                          "flex items-center space-x-2 px-5 py-2 text-sm lg:space-x-4",
                          active
                            ? "text-blue-500"
                            : "text-gray-700 hover:text-blue-500 focus:text-blue-500 dark:text-gray-300"
                        )}>
                        <span> {item.title}</span>

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
