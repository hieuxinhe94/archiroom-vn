import Image from "next/image";

import { urlForImage } from "~/lib/sanity.image"

const HowItWorkItem = (feature) => {
  return (
    <div
      className='my-8 mx-2 rounded-3xl h-[516px] border-gradient px-[20px] py-[49px] mb-[65px] hover:scale-100 sm:scale-95 duration-500 bg-gradient-to-r from-[#fa00ff4d] to-[#0094ff4d] border-0'>
      <div className='text-center'>
          <Image src={feature.image
                    ? urlForImage(feature.image)
                    : null} alt={feature.featureName} height={80} width={78} className="mx-auto pb-8"/>
          <h3 className='text-3xl font-medium transition text-white p-[26px]'>{feature.featureName}</h3>
          <p className='mx-auto sm:my-4 my-2 text-center text-white font-thin text-base w-auto h-auto'>{feature.description}</p>
          <button
            onClick={() => {
              
            }}
            className='try-on-now-btn transition rounded-full bg-gradient-to-r from-purple-gd to-blue-gd h-[48px] w-7/12 mt-[20px] text-white text-base'>
            Go to doc
          </button>
        </div>
    </div>
  )
}

export default HowItWorkItem