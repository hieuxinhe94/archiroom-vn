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
                  <picture  className="w-full h-full skew-y-6 object-cover object-center lg:w-auto lg:h-auto absolute top-0 left-0 lg:static lg:top-auto lg:left-auto">
                    <source srcSet="./137065-business.gif" type="image/avif" />
                    <source srcSet="./137065-business.gif" type="image/webp" />
                    <img
                      width="1300"
                      height="730"
                      src="./137065-business.gif"
                      className="w-full h-full skew-y-6 object-cover object-center lg:w-auto lg:h-auto absolute top-0 left-0 lg:static lg:top-auto lg:left-auto"
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
                    operation of any project you may be tackling. We can help
                    you prepare your community for the future with our
                    transition and reserve studies services. We can identify the
                    source of and remediate structural concerns or leaks in your
                    community. We can assist with the repair or replacement of
                    site facilities, such as asphalt pavement or drainage
                    structures.{" "}
                  </p>
                  <p className="pb-4">
                    Morris Engineering continuously monitors emerging property
                    enhancements, like EV Charging Stations, to ensure that you
                    are ready to address these and other future requirements.
                  </p>
                  <p>
                    We provide Associations with peace of mind by helping to
                    ensure the work being performed is appropriate and enduring.
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

export default SectionCardTypeProduct;
