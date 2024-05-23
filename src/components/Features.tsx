import FeatureItem from '~/components/FeatureItem'

const Features = ({data}) => {

  return (
    <div className='p-4 testimonial-container mt-[100px] relative z-10 mx-auto'
         data-aos='zoom-in'
         data-aos-duraion={1500}
         data-aos-easing='ease-in-out'>
      <div
        aria-hidden='true'
        className='absolute inset-0 h-max w-full m-auto grid grid-cols-2 -space-x-52 opacity-20'
      >
        <div className='blur-[106px] h-56 bg-gradient-to-br  to-purple-400 from-blue-700' />
        <div className='blur-[106px] h-32 bg-gradient-to-r from-cyan-400  to-indigo-600' />
      </div>
      <div className='px-6 md:px-12 xl:px-6'>
          <div className='text-center'>
            <h2 className='title text-white text-[30px] md:text-[40px] font-bold text-center'>{data.title}</h2>
            <p className='mx-auto mt-6 text-white md:w-3/4 lg:w-3/5 uppercase'>{data.description}</p>
          </div>
        <div
          className='mt-16 border-gradient grid overflow-hidden z-10 bg-gradient-to-tl to-[#fa00e14d] from-[#0094ff4d] h-[497px] w-full rounded-3xl border text-gray-600 border-gray-700 sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-3'>

          {data.features.map((feature, index) => (
            <div
              key={index}>
              <FeatureItem key={index} {...feature} />
            </div>
          ))}
          </div>
      </div>
    </div>
  )
}

export default Features
