import { useState } from "react";
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';


export default function ImageComparison({ url1, url2 }) {


    return (
        <>
            <div className="img-comp-container">
                <ReactCompareSlider
                    style={{
                        borderRadius: "5px"
                             
                    }}
                    position={20}
                    itemOne={<ReactCompareSliderImage src={url1}  alt="Image one" height={"100%"} />}
                    itemTwo={<ReactCompareSliderImage src={url2}  alt="Image two" height={"100%"}  />}
                />
            </div>
        </>
    )
}