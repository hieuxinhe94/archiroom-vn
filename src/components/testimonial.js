"use client"

import Image from "next/image";

import { urlForImage } from "~/lib/sanity.image"


export default function Testimonial({testimonial}) {

    return (
        <div className="testimonial pb-[60px]">
            <Image
                key={testimonial._id}
                src={testimonial.thumbnail
                    ? urlForImage(testimonial.thumbnail)
                    : null}
                alt="Thumbnail"
                width={380}
                height={288}
                className="rounded-[20px] h-[288px] object-cover w-full"
            />
            <h5 className="title text-white text-[18px] md:text-[20px] font-bold mb-[10px] mt-[30px]">{testimonial.title}</h5>
            <p className="description text-white text-[14px] md:text-base mb-[16px]">{testimonial.description}</p>
            <div className="author flex items-center">
                <Image
                    key={testimonial._id}
                    src={testimonial.avatar
                        ? urlForImage(testimonial.avatar)
                        : null}
                    alt="Customer Avatar"
                    width={21}
                    height={21}
                    className="rounded-full"
                />
                <p className="author-info ml-[10px] text-white text-[12px] md:text-[14px]">{testimonial.customerInfo}</p>
            </div>
        </div>
    )
}