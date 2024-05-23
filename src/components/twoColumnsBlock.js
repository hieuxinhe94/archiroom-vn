"use client"

import Image from "next/image"
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { urlForImage } from "~/lib/sanity.image"

export default function TwoColumnsBlock({block}) {

    return (


        <div className={block.ltr ? "two-columns-item mt-[80px] lg:mt-[150px] flex flex-col lg:flex-row relative" : "two-columns-item mt-[80px] lg:mt-[150px] flex flex-col lg:flex-row-reverse relative"}>
            <div className={block.ltr ? "image-slider-container min-w-0 w-full lg:w-[500px] xl:w-[592px] lg:mr-[50px] xl:mr-[100px] shrink-0" : "image-slider-container min-w-0 lg:w-[500px] xl:w-[592px] lg:ml-[50px] xl:ml-[100px] shrink-0" }>
              <div className="info-content"
                   data-aos={block.ltr ? "fade-right" : "fade-left"}
                   data-aos-easing="ease-in-out"
                   data-aos-duraion={1000}>
              <Swiper
                    pagination={{
                        dynamicBullets: true,
                        bulletClass: "normal-swiper-slide",
                        bulletActiveClass: "active-swiper-slide"
                    }}
                    modules={[EffectFade, Autoplay, Pagination]}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                      }}
                    effect="fade"
                    spaceBetween={0}
                    slidesPerView={1}
                    >
                        {
                            block.images.map((image, index) =>  
                                <SwiperSlide key={index}>
                                    <Image
                                        src={image
                                            ? urlForImage(image)
                                            : null}
                                        alt="Thumbnail"
                                        width={592}
                                        className="rounded-[20px] w-full"
                                        height={472} />
                                </SwiperSlide>)
                        }
                </Swiper>
              </div>
            </div>
            <div className="info-content"
                 data-aos="zoom-in"
                 data-aos-easing="ease-in-out"
                 data-aos-duraion={1000}
            >
                <p className="sub-title text-[12px] md:text-base text-white uppercase tracking-[3px] mb-[10px] mt-[36px] lg:mt-0">{block.subTitle}</p>
                <h3 className="title text-white text-[24px] md:text-[40px] font-bold mb-[20px]">{block.title}</h3>
                <p className="description text-[14px] md:text-[20px] text-white"  style={{ whiteSpace: "pre-line" }} >
                    {block.description}
                    </p>
                <div className="btn-actions mt-[50px] flex flex-col md:block">
                    <button className="main-btn hover:shadow-purple-700 hover:shadow-[0_0_20px_5px_rgba(0,0,0,0.1)] duration-500 rounded-full bg-gradient-to-r from-purple-gd to-blue-gd text-white text-base px-[30px] py-[10px]">{block.mainBtn}</button>
                    {
                        block.showSubBtn ? <button className="sub-btn rounded-full hover:shadow-purple-700 hover:shadow-[0_0_20px_5px_rgba(0,0,0,0.1)] hover:bg-gradient-to-r hover:from-purple-gd hover:to-blue-gd hover:border-opacity-0 duration-500 border-1 border-white px-[30px] py-[10px] text-white text-base mt-[15px] md:mt-0 md:ml-[20px]">{block.subBtn}</button> : null
                    }
                </div>
            </div>
        </div>
    )
}