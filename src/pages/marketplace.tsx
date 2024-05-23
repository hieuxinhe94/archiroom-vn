import { Tabs, Tab } from "@nextui-org/react";
import { Card } from "@stripe/stripe-js";
import { NextSeo } from "next-seo";
import Head from "next/head";
import Image from "next/image";
import Slider from "react-slick";

import { ProductItem } from "~/components/ProductItem";
import { MARKET_CONFIG_DATA } from "~/components/data";
import AIArticleItem from "~/components/marketplace/ai-article-item";
import Navbar from "~/components/navbar";

export default function Tools(props) {

  const heroSliderSetting = MARKET_CONFIG_DATA;

  return (

    <>

      <Head>
        <title>Generative AI Vietnam | SIMPLIFY.AI</title>
        <link
          rel="canonical"
          href={"https://www.simplifydx.com"}
          key="canonical"
        />

        <meta name="description" content='ai art generator, ai picture generative, generative ai vietnam, Ứng dụng Gen AI Việt Nam, Generative AI Việt Nam, Chuyển đổi số bằng Generative AI Việt Nam' key="desc" />
        <meta property="og:title" content="Chợ ứng dụng Generative AI dành cho doanh nghiệp Việt Nam - SIMPLIFY AI INC" />
        <meta
          property="og:description"
          content="ai art generator, ai picture generative, generative ai vietnam, Ứng dụng Gen AI Việt Nam, Generative AI Việt Nam, Chuyển đổi số bằng Generative AI Việt Nam"
        />
        <meta
          property="og:image"
          content="https://simplifydx.com/services/logo.png"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
      </Head>

      <NextSeo
        title="Chợ ứng dụng Generative AI dành cho doanh nghiệp Việt Nam - SIMPLIFY AI INC"
        description='ai art generator, ai picture generative, generative ai vietnam, Ứng dụng Gen AI Việt Nam, Generative AI Việt Nam, Chuyển đổi số bằng Generative AI Việt Nam'
        canonical="https://simplifydx.com"
        openGraph={{
          url: 'https://simplifydx.com',
          title: "Chợ ứng dụng Generative AI dành cho doanh nghiệp Việt Nam - SIMPLIFY AI INC",
          description: 'ai art generator, ai picture generative, generative ai vietnam, Ứng dụng Gen AI Việt Nam, Generative AI Việt Nam, Chuyển đổi số bằng Generative AI Việt Nam, AI thử mặc thời trang, Bikini try on, Try on dress, wedding dress try on, try before you buy, try on clothes at home, try on clothes online',
          images: [
            {
              url: 'https://simplifydx.com/services/logo.png',
              width: 800,
              height: 600,
              alt: 'Chợ ứng dụng Generative AI dành cho doanh nghiệp Việt Nam',
              type: 'image/jpeg',
            },

          ],
          siteName: 'simplifydx.com',
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />

      <Navbar heroSliderSetting={heroSliderSetting} key={''} settings={null} />

      <main style={{
        backgroundColor: "whitesmoke", color: "whitesmoke"

      }} className="flex min-h-screen flex-col items-center justify-between px-2 pt-4">
        <div className="max-w-[1400px] w-full  px-4 sm:px-6 lg:px-8 pb-8 pt-20 text-center lg:pt-12">
          <h4 className="mx-auto mt-4 max-w-2xl text-xl tracking-tight text-slate-700">
            Công nghệ đột phá cho hành trình dẫn đầu
          </h4>
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Work-Smart hơn với <span className="relative text-transparent font-bold bg-clip-text bg-gradient-to-tr to-emerald-500 from-purple-600">
              Kho ứng dụng GenAI
            </span>
          </h2>

          <div className="mt-10 flex justify-center px-4">
            <a className="hidden lg:block group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900"

              color="slate"
              href="/authenticate"
            >
              Nhận 3 tháng dùng thử
            </a>
            <a
              className="group inline-flex ring-1 items-center justify-center rounded-full mx-2 py-2 px-4 text-sm focus:outline-none ring-slate-200 text-slate-700 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:ring-slate-300"

              color="slate"
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            >
              <svg
                aria-hidden="true"
                className="h-3 w-3 flex-none fill-blue-600 group-active:fill-current"
              >
                <path d="m9.997 6.91-7.583 3.447A1 1 0 0 1 1 9.447V2.553a1 1 0 0 1 1.414-.91L9.997 5.09c.782.355.782 1.465 0 1.82Z" />
              </svg>
              <span className="ml-3">Xem Video</span>
            </a>
          </div>

          <div className="mt-12 lg:pt-12 w-full justify-center slider-container">

            <header className="flex flex-wrap items-center justify-between gap-4 text-slate-800 font-display">
              <h1 className="text-lg text-slate-800 font-display pt-5"></h1>
              <div
                data-slot="base"
                data-filled="true"
                data-has-value="true"
                className="group flex flex-col transition-background motion-reduce:transition-none !duration-150 group relative justify-end data-[has-label=true]:mt-[calc(theme(fontSize.small)_+_10px)] w-40"
              >
                <div
                  aria-hidden="true"
                  data-a11y-ignore="aria-hidden-focus"
                  data-testid="hidden-select-container"
                  style={{
                    border: 0,
                    clip: "rect(0px, 0px, 0px, 0px)",
                    clipPath: "inset(50%)",
                    height: 1,
                    margin: "-1px",
                    overflow: "hidden",
                    padding: 0,
                    position: "absolute",
                    width: 1,
                    whiteSpace: "nowrap"
                  }}
                >
                  <input
                    tabIndex={0}
                    type="text"
                    defaultValue="most_recent"
                    style={{ fontSize: 16 }}
                  />
                  <label>
                    <select size={3} tabIndex={-1} title="">
                      <option />
                      <option value="most_recent">Mới cập nhật</option>
                      <option value="most_helpful">Nhiều người dùng</option>
                      <option value="highest_rating">Đánh giá cao nhất</option>
                    </select>
                  </label>
                </div>
                <div data-slot="mainWrapper" className="w-full flex flex-col">
                  <button

                    className="relative gap-3 w-full inline-flex flex-row items-center shadow-sm outline-none tap-highlight-transparent border-medium border-default-200 data-[hover=true]:border-default-400 data-[open=true]:border-default-foreground data-[focus=true]:border-default-foreground h-10 min-h-10 rounded-full px-4 transition-colors motion-reduce:transition-none"
                    type="button"

                  >
                    <div
                      data-slot="innerWrapper"
                      className="inline-flex h-full w-[calc(100%_-_theme(spacing.6))] min-h-4 items-center gap-1.5 box-border"
                    >
                      <span
                        data-slot="value"
                        className="text-foreground-500 font-normal w-full text-left rtl:text-right text-small truncate"

                      >
                        Được ưa thích
                        <div
                          style={{
                            border: 0,
                            clip: "rect(0px, 0px, 0px, 0px)",
                            clipPath: "inset(50%)",
                            height: 1,
                            margin: "-1px",
                            overflow: "hidden",
                            padding: 0,
                            position: "absolute",
                            width: 1,
                            whiteSpace: "nowrap"
                          }}
                        >
                          ,
                        </div>
                      </span>
                    </div>
                    <svg
                      aria-hidden="true"
                      fill="none"
                      focusable="false"
                      height="1em"
                      role="presentation"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      width="1em"
                      data-slot="selectorIcon"
                      className="absolute right-3 rtl:left-3 rtl:right-[unset] w-4 h-4 transition-transform duration-150 ease motion-reduce:transition-none data-[open=true]:rotate-180"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                </div>
              </div>
              <div
                className="group flex flex-col group relative justify-end data-[has-label=true]:mt-[calc(theme(fontSize.small)_+_10px)] w-full"
                data-slot="base"
                data-filled="true"
                data-filled-within="true"
              >
                <div data-slot="main-wrapper" className="h-full flex flex-col">
                  <div
                    data-slot="input-wrapper"
                    className="relative w-[450px] h-[55px] mx-auto inline-flex tap-highlight-transparent flex-row items-center shadow-sm gap-3 border-medium border-default-200 data-[hover=true]:border-default-400 group-data-[focus=true]:border-default-foreground h-10 min-h-10 rounded-full transition-background !duration-150 px-4 transition-colors motion-reduce:transition-none"
                    style={{ cursor: "text" }}
                  >
                    <div
                      data-slot="inner-wrapper"
                      className="inline-flex w-full items-center h-full box-border"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        aria-hidden="true"
                        role="img"
                        className="iconify iconify--solar"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                      >
                        <g fill="none" stroke="currentColor" strokeWidth="1.5">
                          <circle cx="11.5" cy="11.5" r="9.5" />
                          <path strokeLinecap="round" d="M18.5 18.5L22 22" />
                        </g>
                      </svg>
                      <input
                        data-slot="input"
                        data-has-start-content="true"
                        className="w-full px-12 font-normal bg-transparent !outline-none placeholder:text-foreground-500 focus-visible:outline-none data-[has-start-content=true]:ps-1.5 data-[has-end-content=true]:pe-1.5 text-small h-full"
                        aria-label="Search"
                        placeholder="Tìm ứng dụng"
                        type="text"
                        defaultValue=""
                        title=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </header>

            <section
              id="features"
              aria-label="Features for simplifying everyday business tasks"
              className="pb-14 "
            >

              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">



                <div className=" lg:mt-20 lg:block">
                  <div
                    className="grid grid-cols-3 gap-x-8 gap-y-8"
                    role="tablist"
                    aria-orientation="horizontal"
                  >
                    {
                      heroSliderSetting.allTools.map((item, index) => (
                        <AIArticleItem key={index} product={item} />
                      ))
                    }
                  </div>
                </div>
              </div>
            </section>

          </div>

          <div className="my-36 lg:mt-44">
            <div className="md:text-center">
              <h2 className="font-display text-3xl tracking-tight tracking-tight text-slate-700">
                <span className="relative whitespace-nowrap">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 281 40"
                    preserveAspectRatio="none"
                    className="absolute left-0 top-1/2 h-[1em] w-full fill-blue-400"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M240.172 22.994c-8.007 1.246-15.477 2.23-31.26 4.114-18.506 2.21-26.323 2.977-34.487 3.386-2.971.149-3.727.324-6.566 1.523-15.124 6.388-43.775 9.404-69.425 7.31-26.207-2.14-50.986-7.103-78-15.624C10.912 20.7.988 16.143.734 14.657c-.066-.381.043-.344 1.324.456 10.423 6.506 49.649 16.322 77.8 19.468 23.708 2.65 38.249 2.95 55.821 1.156 9.407-.962 24.451-3.773 25.101-4.692.074-.104.053-.155-.058-.135-1.062.195-13.863-.271-18.848-.687-16.681-1.389-28.722-4.345-38.142-9.364-15.294-8.15-7.298-19.232 14.802-20.514 16.095-.934 32.793 1.517 47.423 6.96 13.524 5.033 17.942 12.326 11.463 18.922l-.859.874.697-.006c2.681-.026 15.304-1.302 29.208-2.953 25.845-3.07 35.659-4.519 54.027-7.978 9.863-1.858 11.021-2.048 13.055-2.145a61.901 61.901 0 0 0 4.506-.417c1.891-.259 2.151-.267 1.543-.047-.402.145-2.33.913-4.285 1.707-4.635 1.882-5.202 2.07-8.736 2.903-3.414.805-19.773 3.797-26.404 4.829Zm40.321-9.93c.1-.066.231-.085.29-.041.059.043-.024.096-.183.119-.177.024-.219-.007-.107-.079ZM172.299 26.22c9.364-6.058 5.161-12.039-12.304-17.51-11.656-3.653-23.145-5.47-35.243-5.576-22.552-.198-33.577 7.462-21.321 14.814 12.012 7.205 32.994 10.557 61.531 9.831 4.563-.116 5.372-.288 7.337-1.559Z"
                    />
                  </svg>
                  <span className="relative text-transparent  bg-clip-text bg-gradient-to-tr to-emerald-500 from-purple-600">Dấu mốc </span>
                </span>{" "}
                đã đạt được.
              </h2>
              <p className="mt-4 text-lg text-slate-400">
                Thành công của chúng tôi được đánh dấu bằng những đánh giá của khách hàng.
              </p>
            </div>

            <ul
              role="list"
              className="mt-8 w-full  lg:flex flex-row items-center justify-center gap-x-8 sm:flex-col sm:gap-x-0 sm:gap-y-10 xl:flex-row xl:gap-x-12 xl:gap-y-0"
            >
              <li className="flex">
                <a
                  className="tap-highlight-transparent no-underline hover:opacity-80 active:opacity-disabled transition-opacity z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 border-medium px-4 min-w-20 h-10 gap-2 rounded-medium [&>svg]:max-w-[theme(spacing.8)] data-[pressed=true]:scale-[0.97] transition-transform-colors-opacity motion-reduce:transition-none bg-transparent border-default data-[hover=true]:opacity-hover group text-sm border-dashed font-normal text-default-600 data-[hover=true]:bg-default-100/50"
                  tabIndex={0}
                  role="button"
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    height={24}
                    role="presentation"
                    viewBox="0 0 24 24"
                    width={24}
                    className="text-danger group-data-[hover=true]:animate-heartbeat"
                    tabIndex={-1}
                  >
                    <path
                      d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                  </svg>
                  150+ Khách hàng
                </a>
              </li>

              <li className="flex">
                <a
                  className="tap-highlight-transparent no-underline hover:opacity-80 active:opacity-disabled transition-opacity z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 border-medium px-4 min-w-20 h-10 gap-2 rounded-medium [&>svg]:max-w-[theme(spacing.8)] data-[pressed=true]:scale-[0.97] transition-transform-colors-opacity motion-reduce:transition-none bg-transparent border-default data-[hover=true]:opacity-hover group text-sm border-dashed font-normal text-default-600 data-[hover=true]:bg-default-100/50"
                  tabIndex={0}
                  role="button"
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    height={24}
                    role="presentation"
                    viewBox="0 0 24 24"
                    width={24}
                    className="text-danger group-data-[hover=true]:animate-heartbeat"
                    tabIndex={-1}
                  >
                    <path
                      d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                  </svg>
                  1,5M+ API request
                </a>
              </li>

              <li className="flex">
                <a
                  className="tap-highlight-transparent no-underline hover:opacity-80 active:opacity-disabled transition-opacity z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 border-medium px-4 min-w-20 h-10 gap-2 rounded-medium [&>svg]:max-w-[theme(spacing.8)] data-[pressed=true]:scale-[0.97] transition-transform-colors-opacity motion-reduce:transition-none bg-transparent border-default data-[hover=true]:opacity-hover group text-sm border-dashed font-normal text-default-600 data-[hover=true]:bg-default-100/50"
                  tabIndex={0}
                  role="button"
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    height={24}
                    role="presentation"
                    viewBox="0 0 24 24"
                    width={24}
                    className="text-danger group-data-[hover=true]:animate-heartbeat"
                    tabIndex={-1}
                  >
                    <path
                      d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                  </svg>
                  35k+ Người dùng active
                </a>
              </li>

              <li className="flex">
                <a
                  className="tap-highlight-transparent no-underline hover:opacity-80 active:opacity-disabled transition-opacity z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 border-medium px-4 min-w-20 h-10 gap-2 rounded-medium [&>svg]:max-w-[theme(spacing.8)] data-[pressed=true]:scale-[0.97] transition-transform-colors-opacity motion-reduce:transition-none bg-transparent border-default data-[hover=true]:opacity-hover group text-sm border-dashed font-normal text-default-600 data-[hover=true]:bg-default-100/50"
                  tabIndex={0}
                  role="button"
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    height={24}
                    role="presentation"
                    viewBox="0 0 24 24"
                    width={24}
                    className="text-danger group-data-[hover=true]:animate-heartbeat"
                    tabIndex={-1}
                  >
                    <path
                      d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                  </svg>
                  30% Tăng trưởng hàng tháng
                </a>
              </li>

            </ul>
          </div>
        </div>
      </main>




      <section
        id="get-started-today"
        className="relative overflow-hidden bg-slate-900 py-32"
      >
        <img
          alt=""
          loading="lazy"
          width={2245}
          height={1636}
          decoding="async"
          data-nimg={1}
          className="absolute left-1/2 top-1/2 max-w-none translate-x-[-44%] translate-y-[-42%] opacity-20"
          style={{ color: "transparent" }}
          src="/background-features.5f7a9ac9.jpg"
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="mx-auto max-w-lg text-center">
            <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
              Đăng ký ngay hôm nay
            </h2>
            <p className="mt-4 text-lg tracking-tight text-white">
              Miễn phí đăng ký mới và tài khoản 100$ miễn phí trải nghiệm dịch vụ của chúng tôi
            </p>
            <a
              className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-white text-slate-900 hover:bg-blue-50 active:bg-blue-200 active:text-slate-600 focus-visible:outline-white mt-10"
              color="white"

              href="/authenticate"
            >
              Đăng ký tài khoản
            </a>
          </div>
        </div>
      </section>


      <section
        id="faq"
        aria-labelledby="faq-title"
        className="relative overflow-hidden bg-slate-50 py-20 sm:py-32"
      >
        <img
          alt=""
          loading="lazy"
          width={1558}
          height={946}
          decoding="async"
          data-nimg={1}
          className="absolute left-1/2 top-0 max-w-none -translate-y-1/4 translate-x-[-30%]"
          style={{ color: "transparent" }}
          src="/_next/static/media/background-faqs.55d2e36a.jpg"
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="mx-auto max-w-5xl lg:mx-0">
            <h2
              id="faq-title"
              className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl"
            >
              {heroSliderSetting.fqa.config.title}
            </h2>
            <p className="mt-4 text-lg tracking-tight text-slate-700">
              {heroSliderSetting.fqa.config.description}
            </p>
          </div>
          <ul
            role="list"
            className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"
          >
            {
              heroSliderSetting.fqa.items.map((item, index) => (<li key={index}>
                <h3 className="font-display text-lg leading-7 text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm text-slate-700">
                  {item.description}
                </p>
              </li>))
            }
          </ul>
        </div>
      </section>

      {/* <section
        id="footer"
        className="relative overflow-hidden bg-slate-900 py-32"
      >
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="mx-auto max-w-lg text-center">
            <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
              Footer
            </h2>

          </div>
        </div>
      </section> */}

      <footer className="relative overflow-hidden bg-slate-900">
        <img
          alt=""
          loading="lazy"
          width={2245}
          height={1236}
          decoding="async"
          data-nimg={1}
          className="absolute left-1/2 top-1/2 max-w-none translate-x-[-44%] translate-y-[-42%] opacity-20"
          style={{ color: "transparent", zIndex: "-100" }}
          src="/background-features.5f7a9ac9.jpg"
        />
        <div className="max-w-7xl mx-auto px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32 z-50">
          <div className="flex">
            <div className="space-y-8 md:pr-8">
              <div className="flex items-center justify-start text-white">
                <img src={heroSliderSetting.header.logo} height={65} width={65} />
                <span className="text-medium font-medium p-4">{heroSliderSetting.footer.brandName}</span>
              </div>
              <p className="text-small text-default-500">
                {heroSliderSetting.footer.description}
              </p>
              <div className="flex space-x-6">
                <a
                  className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium no-underline hover:opacity-80 active:opacity-disabled transition-opacity text-default-400"
                  tabIndex={0}
                  role="link"
                  href="#"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="sr-only">Facebook</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    role="img"
                    className="w-6 iconify iconify--fontisto"
                    width="0.5em"
                    height="1em"
                    viewBox="0 0 12 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12.462.173v3.808h-2.265a2.11 2.11 0 0 0-1.675.521l.002-.002a2.368 2.368 0 0 0-.432 1.566v-.008v2.726h4.229l-.56 4.27H8.098V24H3.681V13.053H.001V8.784h3.68V5.639a5.56 5.56 0 0 1 1.502-4.162l-.003.003A5.418 5.418 0 0 1 9.185.002h-.013a24.124 24.124 0 0 1 3.406.185l-.117-.012z"
                    />
                  </svg>
                </a>
                <a
                  className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium no-underline hover:opacity-80 active:opacity-disabled transition-opacity text-default-400"
                  tabIndex={0}
                  role="link"
                  href="#"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="sr-only">Instagram</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    role="img"
                    className="w-6 iconify iconify--fontisto"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M16 12a4 4 0 1 0-1.172 2.829A3.843 3.843 0 0 0 16 12.06l-.001-.063zm2.16 0a6.135 6.135 0 1 1-1.797-4.359a5.922 5.922 0 0 1 1.798 4.256l-.001.109zm1.687-6.406v.002a1.44 1.44 0 1 1-.422-1.018c.256.251.415.601.415.988v.029v-.001zm-7.84-3.44l-1.195-.008q-1.086-.008-1.649 0t-1.508.047c-.585.02-1.14.078-1.683.17l.073-.01c-.425.07-.802.17-1.163.303l.043-.014a4.117 4.117 0 0 0-2.272 2.254l-.01.027a5.975 5.975 0 0 0-.284 1.083l-.005.037a11.76 11.76 0 0 0-.159 1.589l-.001.021q-.039.946-.047 1.508t0 1.649t.008 1.195t-.008 1.195t0 1.649t.047 1.508c.02.585.078 1.14.17 1.683l-.01-.073c.07.425.17.802.303 1.163l-.014-.043a4.117 4.117 0 0 0 2.254 2.272l.027.01c.318.119.695.219 1.083.284l.037.005c.469.082 1.024.14 1.588.159l.021.001q.946.039 1.508.047t1.649 0l1.188-.024l1.195.008q1.086.008 1.649 0t1.508-.047c.585-.02 1.14-.078 1.683-.17l-.073.01c.425-.07.802-.17 1.163-.303l-.043.014a4.117 4.117 0 0 0 2.272-2.254l.01-.027c.119-.318.219-.695.284-1.083l.005-.037c.082-.469.14-1.024.159-1.588l.001-.021q.039-.946.047-1.508t0-1.649t-.008-1.195t.008-1.195t0-1.649t-.047-1.508c-.02-.585-.078-1.14-.17-1.683l.01.073a6.254 6.254 0 0 0-.303-1.163l.014.043a4.117 4.117 0 0 0-2.254-2.272l-.027-.01a5.975 5.975 0 0 0-1.083-.284l-.037-.005a11.76 11.76 0 0 0-1.588-.159l-.021-.001q-.946-.039-1.508-.047t-1.649 0zM24 12q0 3.578-.08 4.953a6.64 6.64 0 0 1-6.985 6.968l.016.001q-1.375.08-4.953.08t-4.953-.08a6.64 6.64 0 0 1-6.968-6.985l-.001.016q-.08-1.375-.08-4.953t.08-4.953A6.64 6.64 0 0 1 7.061.079L7.045.078q1.375-.08 4.953-.08t4.953.08a6.64 6.64 0 0 1 6.968 6.985l.001-.016Q24 8.421 24 12"
                    />
                  </svg>
                </a>

              </div>
            </div>
            <div className="mt-16 w-full  gap-8  xl:mt-0">
              <div className="w-full md:grid md:grid-cols-4 md:gap-8">
                {
                  heroSliderSetting.footer.shortLinks.map((item, index) => (
                    <div key={index}>
                      <div>
                        <h3 className="text-small font-semibold text-default-600">
                          {item.title}
                        </h3>
                        <ul className="mt-6 space-y-4">
                          {
                            item.items.map((subitem, subindex) => (
                              <li key={subindex}>
                                <a
                                  className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-small no-underline hover:opacity-80 active:opacity-disabled transition-opacity text-default-400"
                                  tabIndex={0}
                                  role="link"
                                  href={subitem.href}
                                >
                                  {subitem.title}
                                </a>
                              </li>))
                          }
                        </ul>
                      </div>
                    </div>
                  ))
                }


              </div>

            </div>
          </div>
          <hr
            className="shrink-0 bg-divider border-none w-full h-divider mt-16 sm:mt-20 lg:mt-24"
            role="separator"
          />
          <div className="flex flex-wrap justify-between gap-2 pt-8">
            <p className="text-small text-default-400">
              © 2024 {heroSliderSetting.footer.brandName}. All rights reserved.
            </p>
            <div
              className="relative flex flex-col gap-2"
              aria-label="Select a theme"
              role="radiogroup"
              aria-orientation="horizontal"
              id="react-aria6801927900-:r0:"
            >
              <div
                className="flex flex-col flex-wrap data-[orientation=horizontal]:flex-row gap-0 items-center"
                role="presentation"
                data-orientation="horizontal"
              >
                <label
                  className="group relative max-w-fit inline-flex items-center justify-start cursor-pointer tap-highlight-transparent p-2 -m-2"
                  data-selected="true"
                >
                  <div
                    style={{
                      border: 0,
                      clip: "rect(0px, 0px, 0px, 0px)",
                      clipPath: "inset(50%)",
                      height: 1,
                      margin: "-1px",
                      overflow: "hidden",
                      padding: 0,
                      position: "absolute",
                      width: 1,
                      whiteSpace: "nowrap"
                    }}
                  >
                    <input

                      tabIndex={0}
                      type="radio"
                      defaultValue="dark"
                      defaultChecked={true}

                      title=""
                    />
                  </div>
                  <div
                    aria-hidden="true"
                    className="relative inline-flex items-center justify-center flex-shrink-0 overflow-hidden border-solid border-medium box-border group-data-[hover-unselected=true]:bg-default-100 outline-none group-data-[focus-visible=true]:z-10 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-2 group-data-[focus-visible=true]:ring-offset-background group-data-[selected=true]:border-primary transition-transform-colors motion-reduce:transition-none pointer-events-none h-8 w-8 rounded-full border-black border-opacity-10 ring-0 transition-transform group-data-[pressed=true]:scale-90 bg-default-200 dark:bg-default-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      aria-hidden="true"
                      role="img"
                      className="text-default-500 iconify iconify--solar"
                      width={18}
                      height={18}
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="m21.067 11.857l-.642-.388zm-8.924-8.924l-.388-.642zM21.25 12A9.25 9.25 0 0 1 12 21.25v1.5c5.937 0 10.75-4.813 10.75-10.75zM12 21.25A9.25 9.25 0 0 1 2.75 12h-1.5c0 5.937 4.813 10.75 10.75 10.75zM2.75 12A9.25 9.25 0 0 1 12 2.75v-1.5C6.063 1.25 1.25 6.063 1.25 12zm12.75 2.25A5.75 5.75 0 0 1 9.75 8.5h-1.5a7.25 7.25 0 0 0 7.25 7.25zm4.925-2.781A5.746 5.746 0 0 1 15.5 14.25v1.5a7.247 7.247 0 0 0 6.21-3.505zM9.75 8.5a5.747 5.747 0 0 1 2.781-4.925l-.776-1.284A7.246 7.246 0 0 0 8.25 8.5zM12 2.75a.384.384 0 0 1-.268-.118a.285.285 0 0 1-.082-.155c-.004-.031-.002-.121.105-.186l.776 1.284c.503-.304.665-.861.606-1.299c-.062-.455-.42-1.026-1.137-1.026zm9.71 9.495c-.066.107-.156.109-.187.105a.285.285 0 0 1-.155-.082a.384.384 0 0 1-.118-.268h1.5c0-.717-.571-1.075-1.026-1.137c-.438-.059-.995.103-1.299.606z"
                      />
                    </svg>
                  </div>
                </label>
                <label className="group relative max-w-fit inline-flex items-center justify-start cursor-pointer tap-highlight-transparent p-2 -m-2">
                  <div
                    style={{
                      border: 0,
                      clip: "rect(0px, 0px, 0px, 0px)",
                      clipPath: "inset(50%)",
                      height: 1,
                      margin: "-1px",
                      overflow: "hidden",
                      padding: 0,
                      position: "absolute",
                      width: 1,
                      whiteSpace: "nowrap"
                    }}
                  >
                    <input
                      aria-labelledby=":r7:"
                      aria-describedby="react-aria6801927900-:r3:"
                      tabIndex={-1}
                      type="radio"
                      defaultValue="light"
                      name="react-aria6801927900-:r5:"
                      title=""
                    />
                  </div>
                  <div
                    aria-hidden="true"
                    className="relative inline-flex items-center justify-center flex-shrink-0 overflow-hidden border-solid border-medium box-border group-data-[hover-unselected=true]:bg-default-100 outline-none group-data-[focus-visible=true]:z-10 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-2 group-data-[focus-visible=true]:ring-offset-background group-data-[selected=true]:border-primary transition-transform-colors motion-reduce:transition-none pointer-events-none h-8 w-8 rounded-full border-black border-opacity-10 ring-0 transition-transform group-data-[pressed=true]:scale-90"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      aria-hidden="true"
                      role="img"
                      className="text-default-500 iconify iconify--solar"
                      width={18}
                      height={18}
                      viewBox="0 0 24 24"
                    >
                      <g fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx={12} cy={12} r={5} />
                        <path
                          strokeLinecap="round"
                          d="M12 2v2m0 16v2M4 12H2m20 0h-2m-.222-7.777l-2.222 2.031M4.222 4.223l2.222 2.031m0 11.302l-2.222 2.222m15.556-.001l-2.222-2.222"
                        />
                      </g>
                    </svg>
                  </div>
                </label>
                <label className="group relative max-w-fit inline-flex items-center justify-start cursor-pointer tap-highlight-transparent p-2 -m-2">
                  <div
                    style={{
                      border: 0,
                      clip: "rect(0px, 0px, 0px, 0px)",
                      clipPath: "inset(50%)",
                      height: 1,
                      margin: "-1px",
                      overflow: "hidden",
                      padding: 0,
                      position: "absolute",
                      width: 1,
                      whiteSpace: "nowrap"
                    }}
                  >
                    <input
                      aria-labelledby=":r8:"
                      aria-describedby="react-aria6801927900-:r3:"
                      tabIndex={-1}
                      type="radio"
                      defaultValue="system"
                      name="react-aria6801927900-:r5:"
                      title=""
                    />
                  </div>
                  <div
                    aria-hidden="true"
                    className="relative inline-flex items-center justify-center flex-shrink-0 overflow-hidden border-solid border-medium box-border group-data-[hover-unselected=true]:bg-default-100 outline-none group-data-[focus-visible=true]:z-10 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-2 group-data-[focus-visible=true]:ring-offset-background group-data-[selected=true]:border-primary transition-transform-colors motion-reduce:transition-none pointer-events-none h-8 w-8 rounded-full border-black border-opacity-10 ring-0 transition-transform group-data-[pressed=true]:scale-90"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      aria-hidden="true"
                      role="img"
                      className="text-default-500 iconify iconify--solar"
                      width={18}
                      height={18}
                      viewBox="0 0 24 24"
                    >
                      <g fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M2 10c0-3.771 0-5.657 1.172-6.828C4.343 2 6.229 2 10 2h4c3.771 0 5.657 0 6.828 1.172C22 4.343 22 6.229 22 10v1c0 2.828 0 4.243-.879 5.121C20.243 17 18.828 17 16 17H8c-2.828 0-4.243 0-5.121-.879C2 15.243 2 13.828 2 11z" />
                        <path strokeLinecap="round" d="M16 22H8m4-5v5m10-9H2" />
                      </g>
                    </svg>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </footer>


    </>);
};




