import React from "react";
import styles from "../styles/Home.module.css";
import { digitalSolutionMetadata } from "../Constants/userinfo";
import Link from "next/link";

const SectionCardTypeSolution = ({ currentTheme, data }) => {
  return (
    <div className={styles.educationWrapper + " container mx-auto my-24"}>
      <div
        className={
          styles.workheading +
          " flex items-end md:text-sm lg:text-4xl px-4 " +
          styles.lineHorizontal
        }
        data-aos="fade-up"
      >
        {digitalSolutionMetadata?.title}
      </div>

      <section className=" text-and-media-block relative px-4 bg-no-repeat overflow-hidden py-8 md:py-12 xl:py-16 bg-primary-color bg-cover bg-center">
        <div className="container mx-auto z-10 relative px-2">
          <div className="bg-theme-light-gray pt-8 px-2 lg:px-0 ">
            <div className="flex relative flex-wrap">
              <div className="w-full lg:w-1/2 ">
                <div className="my-auto lg:max-w-2xl">
                  <div className="relative w-full transition-shadow duration-300 hover:shadow-xl">
                    <img
                      className="p-2 mt-8 object-cover w-full h-64 rounded shadow-lg sm:h-64 md:h-80 lg:h-96"
                      src="./designthinking-2.png"
                      alt=""
                    />
                    <a
                      aria-label="Play Video"
                      className="absolute inset-0 flex items-center justify-center w-full h-full transition-colors duration-300 bg-gray-900 bg-opacity-50 group hover:bg-opacity-25"
                    >
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
              </div>

              <div className="w-full lg:w-1/2 z-10 transform -translate-y-16 lg:translate-y-0 mt-8 lg:mt-24 lg:pr-12">
                <h2 className="text-primary-color -mt-10 font-semibold text-justify">
                  {digitalSolutionMetadata?.subtitle}
                </h2>
                <div className="wysiwyg mt-6 sm:w-3/4 lg:w-4/5 text-gray-300 text-justify">
                  <p className="pb-4">{digitalSolutionMetadata?.description}</p>
                </div>
                <div className="">
                  {digitalSolutionMetadata?.features &&
                    digitalSolutionMetadata?.features?.map((item, key) => (
                      <div
                        key={key}
                        className="py-2 lg:w-3/4 rounded justify-left border-sep cursor-pointer"
                        data-aos="fade-up"
                        data-aos-duration={200 + key * 500}
                      >
                        <div className="flex justify-left align-center">
                          <p className="text-xl font-bold mr-2">
                            <span className="plus block">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6 text-gray-300"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                          </p>

                          <div className="ml-2 mx-2">
                            {item.title}
                            <br />
                            <div className="block rounded-lg py-2 text-sm text-gray-300 dark:bg-neutral-700 dark:text-neutral-50 text-justify">
                              {item.subtitle}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SectionCardTypeSolution;
