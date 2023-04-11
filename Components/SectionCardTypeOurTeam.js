import React from "react";
import styles from "../styles/Home.module.css";
import {
  userinfo,
  headings,
  ctaTexts,
  digitalTransformationSteps,
  digitalMeasureToolMetatdata,
  digitalConceptMetatdata,
  digitalSolutionMetadata,
  partnerTrustedMetadata,
} from "../Constants/userinfo";
import Link from "next/link";

const SectionCardTypeParterTrusted = ({ currentTheme, data }) => {
  return (
    <div className={styles.educationWrapper + " container mx-auto"}>
      <div
        className={
 
          " text-center algin-center text-2xl " 
        
        }
        data-aos="fade-up"
      >
        {partnerTrustedMetadata?.title}
      </div>

      <section className="cards-block z-30 relative bg-no-repeat px-3 py-8 md:py-12 xl:py-16 bg-cover bg-center">
        <div className="container mx-auto z-10 relative">
          <div className="flex flex-wrap justify-center">
            <div className="card-rise px-8 lg:px-3 mb-4 mt-3 w-full md:w-1/2 lg:w-1/4  ">
              <a target="" href="#ev-charging">
                <div className=" bg-white bg-theme-light-gray text-gray-900 text-center flex flex-col justify-start items-center mx-auto  h-full shadow-lg px-3 pt-5 pb-6  sm:m-0 ">
                  <img
                    src="https://www.morrisengineeringllc.com/wp-content/uploads/evcharging-icon.png"
                    alt="evcharging-icon"
                    className="inline-block h-24 mt-3"
                     
                  />
                  <p className="font-bold mt-6 text-xs sm:text-sm lg:text-lg">
                    TPBank &nbsp;
                    <span className="text-secondary-color double-caret "></span>
                  </p>
                </div>
              </a>
            </div>
            <div className="card-rise px-8 lg:px-3 mb-4 mt-3  w-full md:w-1/2 lg:w-1/4  ">
              <a target="" href="#pavement">
                <div className=" bg-white bg-theme-light-gray text-gray-900 text-center flex flex-col justify-start items-center mx-auto  h-full shadow-lg px-3 pt-5 pb-6  sm:m-0 ">
                  <img
                    src="https://www.morrisengineeringllc.com/wp-content/uploads/road-icon-2.png"
                    alt="road-icon-2"
                    className="inline-block h-24 mt-3"
                 
                  />
                  <p className="font-bold mt-6 text-xs sm:text-sm lg:text-lg">
                    Vingroup &nbsp;
                    <span className="text-secondary-color double-caret "></span>
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SectionCardTypeParterTrusted;
