import React from "react";
import styles from "../styles/Home.module.css";
import { digitalCaseStudyArticles } from "../Constants/userinfo";
import Link from "next/link";
import GetImage from "../utils/getImage";
import Image from "next/image";

export default function TechPostThumbnail(post) {
  const imageProps = post?.mainImage ? GetImage(post.mainImage) : null;

  return (
    <div >
      <div className="container flex md:flex-row flex-col justify-between cursor-pointer">
        <div className="md:w-1/2-gutter flex items-center justify-center order-2 shrink-0 md:order-2">
          {/**/}

          {post.videoURL && (
            <video
              width={"800px"}
              height={"600px"}
              className=" max-w-full border border-gray-200 rounded-lg dark:border-gray-700"
              controls
              autoPlay={false}
            >
              <source src={post.videoURL} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}

          {!post.videoURL && imageProps && (
            <div className=" max-w-full border border-gray-200 rounded-lg dark:border-gray-700">
              <Image
                src={imageProps?.src}
                alt={post.title}
                loader={imageProps.loader}
                width={"800px"}
                height={"400px"}
                priority={false}
                className="ratio-4-3 w-full bg-cover bg-no-repeat p-3"
              />
            </div>
          )}
        </div>
        <div className="w-full md:max-w-[420px] py-16 md:py-32 order-1 md:w-1/2-gutter md:order-1">
          <h2 className="text-base font-medium default:text-[antiquewhite] uppercase mb-5 md:mb-7 richtext" style={{color: "antiquewhite"}}>
           {post.featured ? "POINT OF SALE" : "PRODUCT"}
          </h2>
          <p className="tracking-ff-tighter mb-6 font-bold text-[28px] leading-[30px] md:text-[40px] md:leading-[44px] richtext">
            {post.title}
          </p>
          <div className="text-shade-70 mb-16 text-base">
            <p>{post.excerpt}</p>
          </div>
          <Link href={`/tech/${post.slug.current}`}>
            <span
              data-aos="fade-left"
              data-aos-delay="5000"
              className="text-lg overflow-hidden border-b pb-4 font-medium default:flex default:border-black w-4/5"
            >
              <svg
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
                className="reduced-motion:group-hover:-translate-x-full h-6 w-6 origin-left -translate-x-full self-center opacity-0 transition-all duration-500 will-change-transform group-hover:translate-x-0 group-hover:opacity-100"
              >
                <path
                  d="M17.707 9.293l-5-5a.999.999 0 10-1.414 1.414L14.586 9H3a1 1 0 100 2h11.586l-3.293 3.293a.999.999 0 101.414 1.414l5-5a.999.999 0 000-1.414z"
                  fill="currentColor"
                ></path>
              </svg>
              <span
                onClick={() => {}}
                className="reduced-motion:group-hover:translate-x-0 -translate-x-5 transition-transform duration-500 will-change-transform group-hover:translate-x-2"
              >
                Chi tiết & Dùng thử
              </span>
              <svg
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
                className="reduced-motion:group-hover:translate-x-0 ml-auto h-6 w-6 origin-left translate-x-0 self-center justify-self-end opacity-100 transition-all duration-500 will-change-transform group-hover:translate-x-full group-hover:opacity-0"
              >
                <path
                  d="M17.707 9.293l-5-5a.999.999 0 10-1.414 1.414L14.586 9H3a1 1 0 100 2h11.586l-3.293 3.293a.999.999 0 101.414 1.414l5-5a.999.999 0 000-1.414z"
                  fill="currentColor"
                ></path>
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
