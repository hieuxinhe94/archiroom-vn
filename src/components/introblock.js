import { Chip } from "@nextui-org/react";
import Image from 'next/image'
import TypeIt from 'typeit-react'

import blueGradient from './background-images/blue-gradient.svg'
import vector from './background-images/vector.svg'

export default function IntroBlock({ launchAppEvent, introInfo }) {

  return (
    <>
      {introInfo ? (
        <div className="intro-block-container mt-[30px] md:mt-[100px] relative">
          <div className="slogan-container flex lg:justify-between flex-col-reverse lg:flex-row">
            <div className="title-container lg:max-w-[700px] flex flex-col justify-center lg:block relative">
              <Image
                alt="gradient img"
                src={blueGradient}
                width={1400}
                height={1400}
                className="absolute top-[20px] left-[100px] opacity-50"
              />
              <Image
                alt="polygon img"
                src={vector}
                width={612}
                height={621}
                className="absolute top-0 left-[-200px] hidden md:block"
              />
              <p className="sub-title pt-[10px]  text-base text-white tracking-[3px] uppercase mb-[27px] hidden lg:block relative">
                {''}
                <TypeIt
                  options={{
                    strings: introInfo.subTitle,
                    speed: 10,
                    startDelay: 100,
                    waitUntilVisible: true,
                    cursor: false,
                  }}
                ></TypeIt>
              </p>
              <span className="max-w-[468px]  flex flex-col items-start medium:max-w-[736px] medium:w-[736px] medium:mx-auto">
                <span className=" text-[36px] text-white  mt-[10px] leading-[normal] medium:text-[30px] mobile:mt-6 mobile:text-[28px]">

                  {introInfo.title}
                   <br />
                  <Chip
                    variant="shadow"
                    classNames={{
                      base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
                      content: "drop-shadow shadow-black text-white",
                    }}
                  >
                    Generative AI
                  </Chip>
                  {" "}
                  <Chip
                    variant="shadow"
                    classNames={{
                      base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
                      content: "drop-shadow shadow-black text-white",
                    }}
                  >
                    try-before-buy
                  </Chip>
                </span>
                <span className=" text-md text-white leading-[150%] my-6 mobile:mt-2 mobile:mb-6 mobile:text-base">
                
                 
                  {/* {introInfo.title} */}
                </span>

              </span>
              {/* <h1 className=" relative main-title text-white font-bold text-[18px] md:text-[25px] lg:text-[32px] text-center mt-[40px] lg:text-left lg:mt-0 xl:text-[35px] xxl:text-[40px] tracking-[8px] uppercase mb-[40px] lg:mb-[75px]">
                
              </h1> */}

              <button
                data-aos="fade-up"
                data-aos-duration={2000}
                onClick={launchAppEvent}
                className="relative try-on-now-btn rounded-full bg-gradient-to-r from-purple-gd to-blue-gd text-white text-base px-[100px] py-[10px] w-full md:w-auto"
              >
                {introInfo.callToActionBtn}
              </button>
            


            </div>
            <div className="video-container lg:ml-[70px] shrink-0 relative">
              <p className="sub-title text-[12px] md:text-base text-white tracking-[3px] uppercase mb-[16px] md:mb-[27px] lg:hidden">
                {''}
                <TypeIt
                  options={{
                    strings: introInfo.subTitle,
                    speed: 10,
                    startDelay: 100,
                    waitUntilVisible: true,
                    cursor: false,
                  }}
                ></TypeIt>
              </p>
              {/* <video
                loop={true}
                autoPlay="autoplay"
                controls="controls"
                id="vid"
                muted
                className="rounded-[20px] w-full lg:h-[300px] xxl:h-[472px] xl:h-[400px]"
              >
                <source
                  src={urlForIFile(introInfo.video)}
                  type="video/mp4"
                ></source>
                Your browser does not support the video tag.
              </video> */}
              <div className="container flex flex-col justify-between items-center my-10 lg:flex-row lg:w-fit medium:max-w-[810px] mobile:my-6 mobile:last:mt-10">


                <div className="lg:order-first lg:mr-10 relative flex-initial w-full lg:w-[736px] medium:order-first medium:w-full medium:self-stretch mobile:order-first mobile:w-[106vw] mobile:self-center">
                  <div className="relative flex flex-initial h-0 pb-[78.81%]">
                    {/* <div data-type="foreground-0" data-active="true" className="absolute top-0 left-0 right-0 bottom-0 h-full flex flex-col items-center justify-center lg:flex-row z-[1]">
                            <picture className="h-full absolute top-[2.59%] left-[32.07%] !h-[74.83%] opacity-100" >
                                <source srcSet="https://storage-web.pixocial.com/vmake-prod/official/image/index_carousel_model_v6_1.avif" type="image/avif" />
                                <source srcSet="https://storage-web.pixocial.com/vmake-prod/official/image/index_carousel_model_v6_1.webp" type="image/webp" />
                                <img src="https://storage-web.pixocial.com/vmake-prod/official/image/index_carousel_model_v6_1.png" className="h-full object-cover" alt="AI Fashion Model Studio foreground 0" loading="eager" draggable="true" />
                            </picture>
                        </div> */}

                    <div className="with-bg-size-1" style={{ position: 'absolute', top: -55, left: 50, alignContent: "center", width: "600px", height: "480px", margin: "auto" }}>
                      <div id="color-overlay"></div>
                    </div>


                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="our-business-description mt-[60px] lg:mt-[150px] relative">
            <p
              className="text-white text-[18px] md:text-[20px] lg:text-[28px] text-center"
              data-aos="fade-up"
              data-aos-duration={2000}
              style={{ whiteSpace: "pre-line" }}
            >

              {introInfo.description}
            </p>
          </div> */}


        </div >

      ) : null
      }


    </>
  )
}
