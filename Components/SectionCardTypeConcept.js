import React from "react";
import styles from "../styles/Home.module.css";
import {
  userinfo,
  headings,
  ctaTexts,
  digitalTransformationSteps,
  digitalMeasureToolMetatdata,
  digitalConceptMetatdata,
} from "../Constants/userinfo";
import Link from "next/link";

const SectionCardTypeConcept = ({ currentTheme, data }) => {
  return (
    <div className={styles.educationWrapper + " container mx-auto"}>
      <div
        className={styles.workheading + " " + styles.lineHorizontal}
        data-aos="fade-up"
      >
        {digitalConceptMetatdata?.title}
      </div>

      <section className="mt-20 text-and-media-block relative px-4 bg-no-repeat overflow-hidden py-8 md:py-12 xl:py-16 bg-primary-color bg-cover bg-center">
        <div className="container mx-auto z-10 relative px-2">
          <div className="bg-theme-light-gray pt-8 px-6 lg:px-0 lg:py-10 mt-8">
            <div className="flex relative flex-wrap">
              <div className="w-full lg:w-1/2 ">
                <div className="relative shadow-image transform -translate-y-16 lg:-translate-y-20 ratio-3-2 lg:ratio-none lg:-translate-x-3 xl1450:-translate-x-20">
                  {" Image or video "}
                </div>
              </div>
              <div className="w-full lg:w-1/2 z-10 transform -translate-y-16 lg:translate-y-0 mt-8 lg:mt-0 lg:pr-12 lg:pl-12">
                <h2 className="text-primary-color font-semibold">
                  {" "}
                  {digitalConceptMetatdata?.subtitle}
                </h2>
                <div className="wysiwyg mt-6">
                  <p className="pb-4 font-light">{digitalConceptMetatdata?.description}</p>

                  <div className="w-full text-center sm:w-3/4 lg:w-3/5">
                    <ul className="accordion mt-4">
                      {digitalConceptMetatdata?.features &&
                        digitalConceptMetatdata?.features.map((item, key) => {
                          return (
                            <li
                              key={key}
                              className="py-5 rounded relative text-left border-sep cursor-pointer"
                            >
                              <div className="flex justify-between align-center">
                                <p className="leading-normal text-sm ">
                                  {item.title}
                                </p>
                                <p className="text-xl font-bold ml-2">
                                  <span className="plus block">+</span>
                                </p>
                              </div>
                              <div className="description max-h-0 overflow-hidden opacity-0">
                                <div className="text-base wysiwyg">
                                  <p className="pb-2 font-semibold">
                                    Hudson County, NJ
                                  </p>
                                  <ul className="check-list pb-4">
                                    <li>28 Buildings, 212 Units</li>
                                    <li>Stucco Replacement</li>
                                  </ul>
                                  <p className="pb-2 font-semibold">
                                    Passaic County, NJ
                                  </p>
                                  <ul className="check-list ">
                                    <li>24 Buildings, 210 Units</li>
                                    <li>EIFS Replacement</li>
                                  </ul>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                    </ul>
                  </div>

                  <div className="flex flex-wrap text-center pt-4 mb-2">
                    <div className="mr-2 mb-2 rounded-full px-3 py-1 text-xs bg-green-400 text-green-900">
                      PDF Book download
                    </div>
                    <div className="mr-2 mb-2 rounded-full px-3 py-1 text-xs bg-green-400 text-green-900">
                      Video download
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
        </div>
      </section>
    </div>
  );
};

export default SectionCardTypeConcept;
