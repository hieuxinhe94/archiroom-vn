import Link from 'next/link'

export default function BizWelcome(props) {
    return (
        <div className="container m-auto">
            <div className="mx-auto flex flex-col items-center justify-center px-8 pb-4 text-center sm:container">
                <div className="w-[280px] lg:w-[401px] 2xl:w-[461px] 3xl:w-[561px]">
                    <picture>
                        <img width="561" height="200" alt="Self-watering plant" loading="lazy" src="/animates/biz-getting-started.jpg" />
                    </picture>
                </div>
            </div>
            <div>
                <div className="mx-auto w-full py-4 indent-1">
                    <article className="text-wrap    text-sm mx-auto max-w-[650px] text-starts justify-start">
                        <h3>With TryOnHub.AI, there is no need to spend extensive time and resources organizing photo shoots or hiring models. By utilizing our intelligent technology, you can generate quick and effective advertising images without the wait.
                        </h3>
                        <h3 className='underline decoration-1 py-2'> Benefits:
                        </h3>
                           <ul className='list-disc pl-6'>
                            <li> Save time and costs</li>
                            <li> Enhance interaction</li>
                            <li> Build brand presence</li>
                           
                        </ul> 
                        <h3 className=' decoration-1 py-2'> Join the fashion revolution with Virtual Try-On AI and turn your dreams into reality today! </h3>
                    </article>

                </div>
            </div>
        </div>
    )
}
