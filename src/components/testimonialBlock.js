import { useEffect,useState } from "react";
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { getTestimonialBlocks } from "~/lib/client";

import Testimonial from "./testimonial";


export default function TestimonialBlock({testimonials}) {

    return (
        <>
        {
            testimonials ? <div className="testimonial-container mt-[80px] md:mt-[150px] relative z-10">
                        <h4 className="title text-white text-[30px] md:text-[40px] font-bold text-center mb-[40px] md:mb-[65px]">{testimonials.title}</h4>
                        <Swiper
                            pagination={{
                                dynamicBullets: true,
                                bulletClass: "normal-swiper-slide",
                                bulletActiveClass: "active-swiper-slide"
                            }}
                            loop={true}
                            modules={[Autoplay, Pagination]}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            spaceBetween={78}
                            slidesPerView={1}
                            breakpoints={{
                                640: {
                                  slidesPerView: 2,
                                  spaceBetween: 20,
                                },
                                992: {
                                  slidesPerView: 2,
                                  spaceBetween: 40,
                                },
                                1024: {
                                  slidesPerView: 3,
                                  spaceBetween: 50,
                                },
                              }}
                            >
                                {
                                    testimonials.testimonials.map((item, index) => 
                                        <SwiperSlide key={index}>
                                            <Testimonial testimonial={item} />
                                        </SwiperSlide>
                                    )
                                }
                        </Swiper>
                    </div> : null
        }
        </>
    )
}