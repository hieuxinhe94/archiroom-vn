import React from "react";
import styles from "../styles/Home.module.css";
import {
  userinfo,
  headings,
  ctaTexts,
  digitalTransformationSteps,
  digitalMeasureToolMetatdata,
} from "../Constants/userinfo";
import Link from "next/link";

const SectionCardTypeProduct = ({ currentTheme, data }) => {
  return (
    <div className={styles.educationWrapper + " container mx-auto"}>
      <div
        className={styles.workheading + " " + styles.lineHorizontal}
        data-aos="fade-up"
      >
        {digitalMeasureToolMetatdata?.title}
      </div>

      <section
        className=" text-and-media-block relative px-4 bg-no-repeat overflow-hidden py-8 md:py-12 xl:py-16 bg-primary-color bg-cover bg-center"
        data-aos="fade-up"
      >
        <div className="container container-xl mx-auto z-10 relative px-2">
          <div className="bg-theme-light-gray pt-8 px-6 lg:px-0 lg:py-10 mt-8">
            <div className="flex relative flex-wrap">
              <div className="w-full lg:w-1/2 order-1 md:order-2">
                <div className="relative shadow-image transform -translate-y-16 lg:-translate-y-20 ratio-3-2 lg:ratio-none lg:translate-x-3 xl1450:translate-x-20">
                  <picture  className="w-full h-full skew-y-2 object-cover object-center lg:w-auto lg:h-auto absolute top-0 left-0 lg:static lg:top-auto lg:left-auto">
                    <source srcSet="./137065-business.gif" type="image/avif" />
                    <source srcSet="./137065-business.gif" type="image/webp" />
                    <img
                      width="1300"
                      height="730"
                      src="./137065-business.gif"
                      className="w-full h-full skew-y-2 object-cover object-center lg:w-auto lg:h-auto absolute top-0 left-0 lg:static lg:top-auto lg:left-auto"
                      alt="condo"
                      loading="lazy"
                      srcSet="137065-business.gif 1300w, 137065-business.gif 300w, 137065-business.gif 1024w, 137065-business.gif 768w"
                      sizes="(max-width: 1300px) 100vw, 1300px"
                    />
                  </picture>{" "}
                </div>
              </div>
              <div className="w-full lg:w-1/2 z-10 transform -translate-y-16 lg:translate-y-0 mt-8 lg:mt-0 lg:pl-12 lg:pr-12 order-2 md:order-1">
                <h2 className="text-primary-color">
                  Engineering Services for&nbsp;Community Associations
                </h2>
                <div className="flex flex-wrap text-center pt-4 mb-2">
                  <div className="mr-2 mb-2 rounded-full px-3 py-1 text-xs bg-green-400 text-green-900">
                    Tailwind CSS
                  </div>

                  <div className="mr-2 mb-2 rounded-full px-3 py-1 text-xs bg-green-400 text-green-900">
                    React
                  </div>

                  <div className="mr-2 mb-2 rounded-full px-3 py-1 text-xs bg-green-400 text-green-900">
                    Next.js
                  </div>
                </div>
                <div className="wysiwyg mt-6">
                  <p className="pb-4">
                    Morris Engineering, LLC, collaborates with Association
                    Boards and their Property Managers to help ensure the smooth
                     
                  </p>
                  <Step ></Step>
                </div>
              </div>
            </div>
          </div>{" "}
        </div>
      </section>
    </div>
  );
};


export const Step = () => {
  return (
    <div className="sm:max-w-xl md:max-w-full lg:max-w-screen-xl ">
      <div className="grid gap-6 row-gap-10 lg:grid-cols-1">
        <div className="lg:py-6 lg:pr-16">
          <div className="flex">
            <div className="flex flex-col items-center mr-4">
              <div>
                <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                  <svg
                    className="w-4 text-gray-600"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <line
                      fill="none"
                      strokeMiterlimit="10"
                      x1="12"
                      y1="2"
                      x2="12"
                      y2="22"
                    />
                    <polyline
                      fill="none"
                      strokeMiterlimit="10"
                      points="19,15 12,22 5,15"
                    />
                  </svg>
                </div>
              </div>
              <div className="w-px h-full bg-gray-300" />
            </div>
            <div className="pt-1 pb-8">
              <p className="mb-2 text-lg font-bold">Step 1</p>
              <p className="text-gray-700">
                All recipes are written using certain conventions, which define
                the characteristics of common ingredients. The rules vary from
                place to place.
              </p>
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-col items-center mr-4">
              <div>
                <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                  <svg
                    className="w-4 text-gray-600"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <line
                      fill="none"
                      strokeMiterlimit="10"
                      x1="12"
                      y1="2"
                      x2="12"
                      y2="22"
                    />
                    <polyline
                      fill="none"
                      strokeMiterlimit="10"
                      points="19,15 12,22 5,15"
                    />
                  </svg>
                </div>
              </div>
              <div className="w-px h-full bg-gray-300" />
            </div>
            <div className="pt-1 pb-8">
              <p className="mb-2 text-lg font-bold">Step 2</p>
              <p className="text-gray-700">
                The first mate and his Skipper too will do their very best to
                make the others comfortable in their tropic island nest. Michael
                Knight a young loner.
              </p>
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-col items-center mr-4">
              <div>
                <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                  <svg
                    className="w-4 text-gray-600"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <line
                      fill="none"
                      strokeMiterlimit="10"
                      x1="12"
                      y1="2"
                      x2="12"
                      y2="22"
                    />
                    <polyline
                      fill="none"
                      strokeMiterlimit="10"
                      points="19,15 12,22 5,15"
                    />
                  </svg>
                </div>
              </div>
              <div className="w-px h-full bg-gray-300" />
            </div>
            <div className="pt-1 pb-8">
              <p className="mb-2 text-lg font-bold">Step 3</p>
              <p className="text-gray-700">
                Tell them I hate them. Is the Space Pope reptilian!? Tell her
                she looks thin. Hello, little man. I will destroy you!
              </p>
            </div>
          </div>
       
          <div className="flex">
            <div className="flex flex-col items-center mr-4">
              <div>
                <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                  <svg
                    className="w-6 text-gray-600"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <polyline
                      fill="none"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeMiterlimit="10"
                      points="6,12 10,16 18,8"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="pt-1">
              <p className="mb-2 text-lg font-bold">Success</p>
              <p className="text-gray-700" />
            </div>
          </div>
        </div>
      
      </div>
    </div>
  );
};

export default SectionCardTypeProduct;
