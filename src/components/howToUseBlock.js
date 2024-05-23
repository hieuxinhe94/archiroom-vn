import { urlForIFile } from "~/lib/sanity.image"


export default function HowToUseBlock({uses}) {
    return (
        <>
            {
                uses ?  <div className="how-to-use-container mt-[80px] md:mt-[150px] relative">
                    <div className="bg-blue-radial-gradient w-[1200px] h-[1200px] opacity-70 absolute top-[-400px] right-[-300px]"></div>
                    <h4 className="title text-white text-[30px] md:text-[40px] font-bold text-center mb-[30px] md:mb-[65px] relative">{uses.title}</h4>
                    <div className="content grid grid-cols-1 xl:grid-cols-2 gap-[50px] lg:grid-cols-7">
                        <div className="video-container lg:h-[472px] overflow-hidden lg:col-span-4 xl:col-span-1 relative">
                            <video controls 
                                   className='step flex items-center mb-[30px] md:mb-[40px] xl:mb-[52px]'
                                   data-aos='fade-right'
                                   data-aos-easing='ease-in-out'
                                   data-aos-delay={200}
                                   data-aos-duraion={1000}
                            >
                                <source src={urlForIFile(uses.video)} type="video/mp4"></source>
                                Your browser does not support the video tag.
                            </video>
                        </div>
                        <div className="steps lg:col-span-3 xl:col-span-1 relative">
                            {
                                uses.howToUseSteps.map((step, index) =>
                                  <div key={index}
                                       className='step flex items-center mb-[30px] md:mb-[40px] xl:mb-[52px]'
                                       data-aos='zoom-in'
                                       data-aos-easing='ease-in-out'
                                       data-aos-delay={(200 * index)}
                                       data-aos-duraion={1000}
                                  >
                                    <div className="step-index text-white text-[36px] md:text-[50px] xl:text-[60px] font-bold w-[52px] h-[52px] md:w-[70px] md:h-[70px] xl:w-[86px] xl:h-[86px] rounded-full flex justify-center items-center bg-gradient-to-r from-purple-gd to-blue-gd">
                                        <div className="bg-prinary-purple w-[49px] h-[49px] md:w-[67px] md:h-[67px] xl:w-[83px] xl:h-[83px] rounded-full flex justify-center items-center">{index + 1}</div></div>
                                    <div className="step-info ml-[20px] md:ml-[35px]">
                                        <p className="title text-white text-[18px] md:text-[25px] xl:text-[30px] font-bold">{step.title}</p>
                                        <p className="description text-white text-[10px] md:text-base">{step.description}</p>
                                    </div>
                                </div>)
                            }
                            <button className="try-on-now-btn hover:shadow-purple-700 hover:shadow-[0_0_20px_5px_rgba(0,0,0,0.1)] duration-500 rounded-full bg-gradient-to-r from-purple-gd to-blue-gd text-white text-base px-[50px] py-[10px] lg:ml-[121px] w-full md:w-auto">{uses.buttonActionTitle}</button>
                        </div>
                    </div>
                </div> : null
            }
        </>
    )
}
