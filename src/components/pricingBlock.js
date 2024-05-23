import { useState } from "react";
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';


export default function PricingBlock({pricing}) {

    const [monthActive, setMonthlyActive] = useState(true);

    return (
        <>
            {
                pricing ? <div className="pricing-container mt-[70px] md:mt-[100px] relative">
                                <h3 className="text-[30px] md:text-[40px] text-white font-bold text-center mb-[30px] md:mb-[50px]">{pricing.title}</h3>
                                <div className="duration-switcher flex justify-center cursor-pointer">
                                    <div className="switcher flex bg-white rounded-full overflow-hidden mb-[50px] md:mb-[80px]">
                                        <button className={monthActive ? "py-[10px] px-[15px] text-white text-base mr-[5px] bg-gradient-to-r from-purple-gd to-blue-gd rounded-full" : "py-[10px] px-[15px] text-white-gray text-base mr-[5px]"} onClick={() => setMonthlyActive(true)}>Monthly</button>
                                        <button className={!monthActive ? "py-[10px] px-[15px] text-white text-base bg-gradient-to-r from-purple-gd to-blue-gd rounded-full" : "py-[10px] px-[15px] text-white-gray text-base"} onClick={() => setMonthlyActive(false)}>Yearly</button></div>
                                </div>
                                <div className="pricing-list"
                                >
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
                                        spaceBetween={33}
                                        slidesPerView={1}
                                        breakpoints={{
                                            640: {
                                            slidesPerView: 2,
                                            spaceBetween: 20,
                                            },
                                            992: {
                                            slidesPerView: 3,
                                            spaceBetween: 40,
                                            },
                                            1024: {
                                            slidesPerView: 3,
                                            spaceBetween: 50,
                                            },
                                        }}
                                        >
                                            {
                                                pricing.prices?.map((item, index) => 
                                                <SwiperSlide key={index}>
                                                    <div className="p-4 bg-white px-[42px] py-[49px] rounded-[12px] mb-[65px]"
                                                         data-aos='zoom-in'
                                                         data-aos-delay={200 * index}
                                                         data-aos-duraion={1500}
                                                         data-aos-easing='ease-in-out'
                                                         key={index}>
                                                        <h4 className="title text-light-black text-[30px] text-center">{item.title}</h4>
                                                        <p className="description text-white-gray text-[14px] text-center mb-[12px]">{item.description}</p>
                                                        <h3 className="price text-[50px] xl:text-[60px] font-bold text-center mb-[22px]">{monthActive ? item.monthlyPrice : item.yearlyPrice}</h3>
                                                        <div className="features">
                                                            {
                                                                item.features.map((feature, index) => <p className="feature text-center text-base text-light-black mb-[16px]" key={index}>{feature}</p> )
                                                            }
                                                        </div>
                                                        <button className="try-on-now-btn hover:scale-105 hover:shadow-purple-400 hover:shadow-[0_0_20px_5px_rgba(0,0,0,0.1)] duration-500 rounded-full bg-gradient-to-r from-purple-gd to-blue-gd h-[52px] w-full mt-[20px] text-white font-bold text-base">
                                                            Try On Now
                                                        </button>
                                                    </div>
                                                </SwiperSlide>
                                            )
                                
                                            }
                                        </Swiper>
                                </div>
                        </div> : null
            }
        </>
    )
}