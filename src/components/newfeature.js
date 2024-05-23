import { Chip } from "@nextui-org/react";
import Image from "next/image"
import { useRouter } from "next/router";
import { useState } from 'react'
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { urlForImage } from "~/lib/sanity.image"
import { getCurrentUserByBrowser } from "~/pages/try-on-plugin";



export default function NewFeature({ }) {
    const router = useRouter();

    return (
        <div className="p-[15px]" >
            <section data-aos="zoom-in" data-aos-duraion={2000}
                className=" m-10 mx-auto mobile:mb-20 mobile:mt-0 rounded-[8px] overflow-hidden bg-gray-100 pb-20">
                <div className="flex flex-col  lg:h-[440px] lg:flex-row-reverse lg:gap-[53px] mobile:rounded-2xl">

                    <picture className="hidden lg:block h-full w-auto flex-initial mt-12 ">
                        <img src="/animates/biz-studio.png" className="h-full w-auto object-cover rounded-xl" loading="eager" draggable="true" />
                    </picture>

                    <picture className="lg:hidden grow ">
                        <source srcSet="/animates/biz-studio.png" type="image/avif" />
                        <source srcSet="/animates/biz-studio.png" type="image/webp" />
                        <img src="/animates/biz-studio.png" className="w-full object-cover object-right" loading="eager" draggable="true" />
                    </picture>

                    <div className="m-10 mobile:m-5 lg:mt-[53px] lg:ml-[60px] lg:mr-0 lg:mb-0 lg:flex-1">
                        <span className=" text-[36px] text-gray-900 mt-[10px] leading-[normal] medium:text-[30px] mobile:mt-6 mobile:text-[28px]">
                            Automate Fashion Studio
                        </span>

                        <p className="mt-12 w-[450px] text-gray-700 text-lg leading-7 mobile:text-base mobile:leading-5 lg:text-lg lg:leading-7 text-justify">
                            Upload new products, launch new collections, onboard 100 more new vendors with massive catalogs

                        </p>
                        <div className="py-5 lg:w-3/4 rounded relative text-left border-sep cursor-pointer aos-init aos-animate" data-aos="fade-up" data-aos-duration="200">
                            <div className="flex justify-between align-center"><div>
                                <Chip
                                    startContent={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-gray-500 w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    }
                                    variant="shadow"
                                    classNames={{
                                        base: "border-small border-white/50 shadow-gray-500/30",
                                        content: "drop-shadow shadow-black text-gray-800",
                                    }}
                                >
                                    Upload and manage your catalog
                                </Chip>
                                <br />
                                <div className="block rounded-lg py-2 text-sm text-gray-300 dark:bg-neutral-700 dark:text-neutral-50 text-justify"></div></div>

                            </div>
                            <div className="flex justify-between align-center"><div>
                                <Chip
                                    startContent={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-gray-500 w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    }
                                    variant="shadow"
                                    classNames={{
                                        base: "border-small border-white/50 shadow-gray-500/30",
                                        content: "drop-shadow shadow-black text-gray-800",
                                    }}
                                >
                                    High quality ouput - 2HD image
                                </Chip>
                            </div>
                            </div>
                            <div className="py-5 flex justify-between align-center"><div>
                                <Chip
                                    startContent={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-gray-500 w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    }

                                    variant="shadow"
                                    classNames={{
                                        base: "border-small border-white/50 shadow-gray-500/30",
                                        content: "drop-shadow shadow-black text-gray-800",
                                    }}
                                >
                                    All in minutes
                                </Chip>

                            </div>
                            </div>
                        </div>


                        <button
                            data-aos="flip-up"
                            data-aos-duration={2000}
                            onClick={() => router.push('/business-app')}
                            className="flex text-sm lg:text-lg w-full  try-on-now-btn rounded-full bg-gradient-to-r from-purple-gd to-blue-gd text-white text-base px-[100px] py-[10px] w-full md:w-auto"
                        >
                            Demo for Business <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-2 w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>

                        </button>
                    </div>
                </div>

                <div className="hidden lg:block lg:flex container mt-[85px] mx-auto lg:w-[1096px] justify-center items-center flex mobile:mt-[38px] mobile:py-4 mobile:gap-6 mobile:h-[auto] mobile:flex-wrap"><div className="flex flex-col items-center lg:mr-16 mr-6 last:mr-0 last-of-type:mr-0 mobile:mr-0 mobile:w-[calc(50%-12px)]">
                    <div className="shadow-gray-500/30 text-gray-700 text-[48px] flex gap-4 items-center justify-center mb-[5px] lg:leading-[60px] medium:text-[24px] mobile:text-[24px] mobile:mb-0 mobile:gap-2 mobile:h-7"><picture className="w-10 h-10 mobile:h-7 mobile:w-7">
                        <img className="opacity-50" src="/animates/conversions.svg" width="40" height="40" alt="INCREASE CONVERSIONS" draggable="true" />
                    </picture>
                        +45%</div>
                    <div className=" text-gray-500 text-base leading-snug text-center whitespace-nowrap medium:text-sm">INCREASE CONVERSIONS</div></div>
                    <div className="last:hidden w-0 h-[41px] border-[0.5px] border-gray-300 lg:mr-16 medium:mr-6 mobile:mr-0 mobile:hidden"></div>

                    <div className="flex flex-col items-center lg:mr-16 mr-6 last:mr-0 last-of-type:mr-0 mobile:mr-0 mobile:w-[calc(50%-12px)]">
                        <div className=" text-gray-700 text-[48px] flex gap-4 items-center justify-center mb-[5px] lg:leading-[60px] medium:text-[24px] mobile:text-[24px] mobile:mb-0 mobile:gap-2 mobile:h-7">
                            <picture className="w-10 h-10 mobile:h-7 mobile:w-7">
                                <img className="opacity-70" src="/animates/thunder.svg" width="40" height="40" alt="PRODUCTION EFFICIENCY" draggable="true" /></picture>2x</div>
                        <div className=" text-gray-500 text-base leading-snug text-center whitespace-nowrap medium:text-sm">PRODUCTION EFFICIENCY</div></div>

                    <div className="last:hidden w-0 h-[41px] border-[0.5px] border-gray-300 lg:mr-16 medium:mr-6 mobile:mr-0 mobile:hidden"></div>
                    <div className="flex flex-col items-center lg:mr-16 mr-6 last:mr-0 last-of-type:mr-0 mobile:mr-0 mobile:w-[calc(50%-12px)]">
                        <div className=" text-gray-700 text-[48px] flex gap-4 items-center justify-center mb-[5px] lg:leading-[60px] medium:text-[24px] mobile:text-[24px] mobile:mb-0 mobile:gap-2 mobile:h-7">
                            <picture className="w-10 h-10 mobile:h-7 mobile:w-7">
                                <img className="opacity-50" src="/animates/returns.svg" width="40" height="40" alt="REDUCE RETURNS" draggable="true" /></picture>-25%</div>
                        <div className=" text-gray-500 text-base leading-snug text-center whitespace-nowrap medium:text-sm">REDUCE RETURNS</div></div>
                    <div className="last:hidden w-0 h-[41px] border-[0.5px] border-gray-300 lg:mr-16 medium:mr-6 mobile:mr-0 mobile:hidden"></div>


                </div>
            </section>
        </div>


    )
}