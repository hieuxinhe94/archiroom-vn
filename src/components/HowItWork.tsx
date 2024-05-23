import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import HowItWorkItem from '~/components/HowItWorkItem'

const HowItWork = ({items}) => {

  return (
      <div className='testimonial-container mt-[80px] md:mt-[150px] relative z-10'>
        <div className='text-center'>
          <h2 className='title text-white text-[30px] md:text-[40px] font-bold text-center'>{items.title}</h2>
          <p className='mx-auto mt-6 text-white md:w-3/4 lg:w-3/5'>{items.description}</p>
        </div>
        <div
          className='pricing-list mt-16'
        >
          <Swiper className="relative"
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
            spaceBetween={1}
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

          {items.howitworksitems.map((feature, index) => (
            <SwiperSlide key={index}>
              <div
                   data-aos='zoom-in'
                   data-aos-delay={200 * index}
                   data-aos-duraion={1500}
                   data-aos-easing='ease-in-out'
                   key={index}>
                <HowItWorkItem key={index} {...feature} />
              </div>
            </SwiperSlide>
          ))}
            </Swiper>
        </div>
      </div>
  )
}

export default HowItWork
