import { Divider, Image as Image2 } from '@nextui-org/react'
import { useState } from "react";

import { modelDataset } from "~/components/staticData";

 async function getServerSideProps() {
    return {
        props: {}
    }
}

export default function IndexPage({onSelectedModel}) {

    const dataset = modelDataset;

    const [selectingGender, setSelectingGender] = useState<string>()
    const [selectingArea, setSelectingArea] = useState<string>()
    const [selectingSize, setSelectingSize] = useState<string>()

    const pickSampleModel = (sampleItem) => {
        onSelectedModel(sampleItem)
    }

    return (
        <div>
            <div className='filter-clothes w-full h-[32px] flex justify-start items-left rounded-full bg-white01 pl-4 text-xs flex-wrap'>
                {
                    dataset.genders.map((item, index) => <div onClick={() => { setSelectingGender(item) }} key={index} className={selectingGender === item ? 'cursor-pointer filter-item h-[32px] flex justify-center items-center px-[10px] md:px-[50px] rounded-full bg-gradient-to-r from-purple-gd to-blue-gd' : 'cursor-pointer filter-item h-[32px] flex justify-center items-center  px-[10px] md:px-[50px] rounded-full'}>
                        <p className='filter-text'>{item}</p>
                    </div>)
                }
                <Divider orientation="vertical" className="h-[12px] mt-2 mx-2" />
                {
                    dataset.styles.map((item, index) => <div onClick={() => { setSelectingArea(item) }} key={index} className={selectingArea === item ? 'cursor-pointer filter-item h-[32px] flex justify-center items-center px-[10px] md:px-[50px] rounded-full bg-gradient-to-r from-purple-gd to-blue-gd' : 'cursor-pointer filter-item h-[32px] flex justify-center items-center  px-[10px] md:px-[50px] rounded-full'}>
                        <p className='filter-text'>{item}</p>
                    </div>)
                }
                <Divider orientation="vertical" className="h-[12px] mt-2 mx-2" />
                {
                    dataset.sizes.map((item, index) => <div onClick={() => { setSelectingSize(item) }} key={index} className={selectingSize === item ? 'cursor-pointer filter-item h-[32px] flex justify-center items-center px-[10px] md:px-[50px] rounded-full bg-gradient-to-r from-purple-gd to-blue-gd' : 'cursor-pointer filter-item h-[32px] flex justify-center items-center  px-[10px] md:px-[50px] rounded-full'}>
                        <p className='filter-text'>{item}</p>
                    </div>)
                }
            </div>


            <div className="model-images grid grid-cols-3 gap-4 mt-[40px]">
                {
                    dataset.models.filter(
                        item => ((selectingArea ? item.style === selectingArea : true)
                            && (selectingGender ? item.gender === selectingGender : true)
                            && (selectingSize ? item.size === selectingSize : true))
                    ).map((item, index) => (
                        <div
                            key={index}
                            onClick={() => {pickSampleModel(item)}}
                            className="model-image cursor-pointer flex flex-col items-center p-[4px] bg-[#fff8f8] rounded mr-[10px]">
                            <Image2 src={item.url} width={120} height={160} alt="model image" className="rounded" />
                            <p className="text-[14px] font-bold mt-[5px]">{item.name}</p>
                        </div>)
                    )
                }
            </div>
        </div>
    )
}
