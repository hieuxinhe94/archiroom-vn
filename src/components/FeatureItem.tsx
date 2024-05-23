import Image from "next/image";

import { urlForImage } from "~/lib/sanity.image"

const FeatureItem = (feature) => {
  return (
      <button
        onClick={() => {
          
        }}
        className='group relative bg-gray-800/20 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10 h-full hover:shadow-purple-700 hover:shadow-[0_0_20px_5px_rgba(0,0,0,0.1)] duration-500'>
        <div className='relative space-y-8 py-12 pl-20 pr-12 pt-20 group-hover:scale-105 duration-500'>
          <div className='space-y-2 text-left'>
            <Image
              src={feature.image
                ? urlForImage(feature.image)
                : null}
              alt={feature.featureName}
              loading='lazy'
              width={70}
              height={70}
              style={{ color: 'transparent' }}
              className='object-scale-down w-20 h-20 mb-6'
            />
            <h5 className='text-xl font-semibold text-white transition pb-4'>
              {feature.featureName}
            </h5>
            <p className='text-white text-base'>
              {feature.description}
            </p>
          </div>
        </div>
      </button>
  )
}

export default FeatureItem