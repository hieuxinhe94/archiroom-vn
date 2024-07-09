
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Chip, Input } from "@nextui-org/react";
import cx from "clsx";
import Image from "next/image";
import { Link } from "@nextui-org/react";
import React, { useState } from "react";
import { Fragment } from "react";

import { urlForImage } from "~/lib/sanity.image"

export default function Navbar({ settings, heroSliderSetting }) {
  return (
    <header className="py-5" style={{ backgroundColor: "whitesmoke" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 font-medium">
            <a aria-label="Home" href="/" className="py-1 ">
              <img src={heroSliderSetting.header.logo} height={65} width={65} />
            </a>
            <a aria-label="Home" className="flex pl-4 py-1" href="/">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="hidden lg:block w-5 h-5 ">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
              </svg>
              <span className="pl-2">ARCHIROOM.VN</span>

            </a>
            <div className="hidden md:flex md:gap-x-6 pl-24">
              {heroSliderSetting.header.navigators.map((item, index) => (<a key={index}
                className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                href={item.href}
              >
                {item.title}
              </a>))}


            </div>
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            <div className="hidden md:block">
              <a
                className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                href="/authenticate"
              >
                Đăng ký
              </a>
            </div>
            <a
              className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-gradient-to-tr to-emerald-600 from-purple-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600"
              color="blue"

              href="/authenticate"
            >
              <span>
                Đăng ký ngay<span className="hidden lg:inline"> hôm nay</span>
              </span>
            </a>
            <div className="-mr-1 md:hidden">
              <div >
                <button
                  className="relative z-10 flex h-8 w-8 items-center justify-center ui-not-focus-visible:outline-none"
                  aria-label="Toggle Navigation"
                  type="button"
                  aria-expanded="false"
                >
                  <svg
                    aria-hidden="true"
                    className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
                    fill="none"
                    strokeWidth={2}
                    strokeLinecap="round"
                  >
                    <path
                      d="M0 1H14M0 7H14M0 13H14"
                      className="origin-center transition"
                    />
                    <path
                      d="M2 2L12 12M12 2L2 12"
                      className="origin-center transition scale-90 opacity-0"
                    />
                  </svg>
                </button>
              </div>
              <div
                style={{
                  position: "fixed",
                  top: 1,
                  left: 1,
                  width: 1,
                  height: 0,
                  padding: 0,
                  margin: "-1px",
                  overflow: "hidden",
                  clip: "rect(0, 0, 0, 0)",
                  whiteSpace: "nowrap",
                  borderWidth: 0,
                  display: "none"
                }}
              />
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
