import React from "react";
import styles from "../styles/Home.module.css";
import {
  userinfo,
  headings,
  ctaTexts,
  digitalTransformationSteps,
  digitalMeasureToolMetatdata,
  digitalConceptMetatdata,
  digitalObjectivesMetadata,
} from "../Constants/userinfo";
import Link from "next/link";

const SectionCardTypeObjective = ({ currentTheme, data }) => {
  return (
    <div className={styles.educationWrapper + " container mx-auto"}>
      <div
        className={styles.workheading + " " + styles.lineHorizontal}
        data-aos="fade-up"
      >
        {digitalObjectivesMetadata?.title}
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
                <h2 className="text-primary-color">Services for Attorneys</h2>
                <div className="wysiwyg mt-6">
                  <p className="pb-4">
                    Let Morris Engineering help you make your case.
                  </p>
                  
                </div>
              </div>
            </div>
          </div>{" "}
        </div>
      </section>
    </div>
  );
};

export default SectionCardTypeObjective;
