import React, { useState } from "react";
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
  const [isReadMore, setIsReadMore] = useState(false);

  return (
    <div className={styles.educationWrapper + " container mx-auto"}>
      <div
        className={
          styles.workheading +
          " flex items-end md:text-sm lg:text-4xl px-4 " +
          styles.lineHorizontal
        }
        data-aos="fade-up"
      >
        {digitalMeasureToolMetatdata?.title}
      </div>

      <section
        className=" text-and-media-block relative px-4 bg-no-repeat overflow-hidden py-8 md:py-12 xl:py-16 bg-primary-color bg-cover bg-center"
        data-aos="fade-up"
      >
        <div className="container container-xl mx-auto z-10 relative px-2">
          <div className="bg-theme-light-gray pt-8 px-2 lg:px-0 lg:py-2 mt-8">
            <div className="flex relative flex-wrap">
              <div className="w-full lg:w-1/2 order-1 md:order-2">
                <div className="relative lg:-mt-6 w-full h-64 lg:h-full transition-shadow duration-300 hover:shadow-xl">
                  <picture className="p-2 mt-8 mr-4 rounded-2xl object-cover w-full h-64 rounded shadow-lg sm:h-64 md:h-80 lg:h-full ">
                    <source
                      srcSet={digitalMeasureToolMetatdata?.main_image.src}
                      type="image/avif"
                    />
                    <img
                      width="600"
                      height="530"
                      src={digitalMeasureToolMetatdata?.main_image.src}
                      className="w-full h-full rounded rounded-xl object-cover object-center lg:w-auto absolute top-0 left-0 lg:static lg:top-auto lg:left-auto"
                      alt="condo"
                      loading="lazy"
                      sizes="(max-width: 600px) 100vw, 1300px"
                    />
                  </picture>
                  <a className="absolute inset-0 flex items-center justify-center w-full h-full transition-colors duration-300 bg-gray-900 bg-opacity-50 group hover:bg-opacity-25">
                    <Link href={`/post/`}>
                      <div className="flex items-center justify-center w-16 h-16 transition duration-300 transform bg-gray-100 rounded-full shadow-2xl group-hover:scale-110">
                        <svg
                          className="w-10 text-gray-900"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M16.53,11.152l-8-5C8.221,5.958,7.833,5.949,7.515,6.125C7.197,6.302,7,6.636,7,7v10 c0,0.364,0.197,0.698,0.515,0.875C7.667,17.958,7.833,18,8,18c0.184,0,0.368-0.051,0.53-0.152l8-5C16.822,12.665,17,12.345,17,12 S16.822,11.335,16.53,11.152z" />
                        </svg>
                      </div>
                    </Link>
                  </a>
                </div>
              </div>
              <div className="w-full lg:w-1/2 z-10 transform lg:translate-y-0 mt-8 lg:mt-0 lg:pr-12 order-2 md:order-1">
                <h2 className="text-primary-color">
                  {digitalMeasureToolMetatdata?.subtitle}
                </h2>
                <div className="flex flex-wrap text-center pt-4 mb-2">
                    <div className="mr-2 mb-2 rounded-full px-3 py-1 text-xs bg-green-400 text-green-900">
                      2 years free updates trial
                    </div>
                    <div className="mr-2 mb-2 rounded-full px-3 py-1 text-xs bg-green-400 text-green-900">
                      On-premise support
                    </div>
                  </div>

                <div className="wysiwyg mt-6">
                  <p className="my-1 line-clamp-3 hover:line-clamp-none cursor-pointer text-gray-300">
                    {digitalMeasureToolMetatdata?.description}
                  </p>
                  <Step
                    steps={digitalMeasureToolMetatdata.steps}
                    currentTheme={currentTheme}
                  ></Step>

                 
                </div>
              </div>
            </div>
          </div>{" "}
        </div>
      </section>
    </div>
  );
};

export const Step = (props) => {
  const [toggleId, setToggleId] = useState(null);

  return (
    <div className="mt-4 ">
      {props?.steps &&
        props?.steps?.map((item, key) => (
          <div
            key={key}
            className="py-5 lg:w-3/4 rounded relative text-left border-sep cursor-pointer"
            data-aos="fade-up"
            data-aos-duration={200 + key * 500}
          >
            <div className="flex justify-between align-center">
              <div>
                {item.title}
                <br />
                <div className="block rounded-lg py-2 text-sm text-gray-300 dark:bg-neutral-700 dark:text-neutral-50 text-justify">
                  {item.subtitle}
                </div>
              </div>

              <p
                className="text-xl font-bold ml-2"
                onClick={() => {
                  if (key == toggleId) setToggleId(null);
                  else {
                    setToggleId(key);
                  }
                }}
              >
                <span className="plus block">
                  {key == toggleId ? "-" : "+"}
                </span>
              </p>
            </div>
            <div
              className={
                (key == toggleId ? "" : "!visible hidden  ") +
                " rounded-lg shadow-lg"
              }
              id="collapseExample"
              data-te-collapse-item
            >
              <div className="block rounded-lg py-2 text-sm text-gray-300 dark:bg-neutral-700 dark:text-neutral-50 text-justify">
                {item.description}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SectionCardTypeProduct;
