import React from "react";
import styles from "../styles/Home.module.css";
import {
  ChatbotConfigSection,
  chatbotfeatures,
  consultantService,
  digitalMeasureToolMetatdata,
  digitalSolutionMetadata,
} from "../Constants/userinfo";
import Link from "next/link";
import { Step } from "./SectionCardTypeProduct";

const SectionCardChatbotProduct = (props) => {
  const { products, currentTheme } = props;
  return (
    <div className={styles.educationWrapper + " container mx-auto my-24"}>
      <section className=" text-and-media-block relative px-4 bg-no-repeat overflow-hidden py-8 md:py-12 xl:py-16 bg-primary-color bg-cover bg-center">
    
       <div className={styles.educationWrapper + " container mx-auto"}>
       <a href={`/chatbots`}> <div
            className={
              styles.workheading +
              " flex items-end md:text-sm lg:text-4xl px-4 " +
              styles.lineHorizontal
            }
            data-aos="fade-up"
          >
          {ChatbotConfigSection.title}
          </div>
          </a>
          <section
            className=" text-and-media-block relative px-4 bg-no-repeat overflow-hidden py-8 md:py-12 xl:py-16 bg-primary-color bg-cover bg-center"
            data-aos="fade-up"
          >
            <div className="container container-xl mx-auto  relative px-2">
              <div className="bg-theme-light-gray pt-8 px-2 lg:px-0 lg:py-2 mt-8">
                <div className="flex relative flex-wrap">
                  <div className="w-full lg:w-1/2 order-1 md:order-2">
                    <div className="relative lg:-mt-6 w-full h-64 lg:h-full transition-shadow duration-300 hover:shadow-xl">
                    <a href={`/chatbots`}>  <picture className="p-2 mt-8 mr-4 rounded-2xl object-cover w-full h-64 rounded shadow-lg sm:h-64 md:h-80 lg:h-full ">
                        <source
                          srcSet={ChatbotConfigSection?.main_image.src}
                          type="image/avif"
                        />
                        <img
                          src={ChatbotConfigSection?.main_image.src}
                          className="p-2 mt-8 object-cover w-full h-64 rounded shadow-lg sm:h-64 md:h-80 lg:h-96"
                          alt="condo"
                          loading="lazy"
                          data-aos="fade-up"
                        />
                      </picture></a>
                    </div>
                  </div>
                  <div className="w-full lg:w-1/2 z-10 transform lg:translate-y-0 mt-8 lg:mt-0 lg:pr-12 order-2 md:order-1">
                    <h2 className="text-primary-color"></h2>
                    <div className="flex flex-wrap text-center pt-4 mb-2">
                      <div className="mr-2 mb-2 rounded-full px-3 py-1 text-xs bg-green-400 text-green-900">
                        Trên nền tảng Azure Cognitives Service
                      </div>
                      <div className="mr-2 mb-2 rounded-full px-3 py-1 text-xs bg-green-400 text-green-900">
                        On-premise{" "}
                      </div>
                    </div>

                    <div className="wysiwyg mt-6">
                      <p className="my-1 line-clamp-3 hover:line-clamp-none cursor-pointer text-gray-300">
                        {ChatbotConfigSection?.subtitle}
                      </p>
                      <Step
                        steps={chatbotfeatures}
                        currentTheme={currentTheme}
                      ></Step>
                    </div>
                  </div>
                </div>
              </div>{" "}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default SectionCardChatbotProduct;
