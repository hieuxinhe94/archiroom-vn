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
                    itemOne={<ReactCompareSliderImage src={url1}  alt="Image one" />}
                    itemTwo={<ReactCompareSliderImage src={url2}  alt="Image two" />}
                />
            </div>
        </>
    )
}