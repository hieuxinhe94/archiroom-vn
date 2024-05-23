import Image from "next/image"
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { urlForImage } from "~/lib/sanity.image"

export default function PartnersBlock({partners}) {

    return (
        <div data-aos="zoom-in"
             data-aos-duraion={2000}>
        {
            partners.length > 0 ? <div className="partners-container mt-[60px] md:mt-[100px]">
                <h3 className="text-[30px] md:text-[40px] text-white font-bold text-center mb-[30px]">Trusted by</h3>
                <div className="partner-list"

                >
                    <Swiper
                        pagination={{
                            dynamicBullets: true,
                            bulletClass: "normal-swiper-slide",
                            bulletActiveClass: "active-swiper-slide"
                        }}
                        modules={[Pagination]}
                        loop={true}
                        spaceBetween={20}
                        slidesPerView={2}
                        breakpoints={{
                            640: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                            1200: {
                                slidesPerView: 6,
                                spaceBetween: 50,
                            },
                            }}
                        >
                            {
                                partners.map((item, index) => 
                                    <SwiperSlide key={index}>
                                        <div className="flex items-center h-[55px] justify-center mb-[60px]">
                                            <Image
                                                key={item._id}
                                                src={item.logo
                                                    ? urlForImage(item.logo)
                                                    : null}
                                                alt={item.logo.alt || "Thumbnail"}
                                                width={170}
                                                height={55}
                                            />
                                        </div>
                                    </SwiperSlide>
                                )
                            }
                    </Swiper>
                </div>
        </div> : null
        }
        </div>
        
        
    )
}