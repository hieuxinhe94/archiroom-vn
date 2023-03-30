import styles from "../styles/Home.module.css";
import Link from "next/link";
import {
  userinfo,
  ctaTexts,
  headings,
  businessMainSteps,
} from "../Constants/userinfo";

const HomeBusinessMainProcess = ({ currentTheme }) => {
  return (
    <>
      <div className="container mx-auto z-10 relative">
        <div className="flex justify-center flex-wrap">
          {businessMainSteps
            ? businessMainSteps.steps.map((item, index) => {
                return (
                  <div
                    data-aos="fade-up"
                    data-aos-duration={200 + index * 500}
                    key={item.id}
                    className="rounded-xl card-rise px-2 lg:px-3 mb-4 mt-3  w-1/2 md:w-1/5  "
                  >
                    <a target="" href="/services/#condo">
                      <div className="bg-theme-light-gray rounded-lg bg-gray-200/90 text-gray-900 text-center flex flex-col justify-start items-center mx-auto  h-full shadow-lg px-3 pt-5 pb-6  sm:m-0 ">
                        {/* <picture className="inline-block h-24 mt-3">
                          <source
                            srcSet={item.main_image.src}
                            type="image/avif"
                          />
                          <source
                            srcSet={item.main_image.src}
                            type="image/webp"
                          />
                          <img
                            src={item.main_image.src}
                            alt={item.main_image.alt}
                            className="inline-block h-24 mt-3"
                          />
                        </picture> */}
                        <p className="font-bold text-xs sm:text-sm lg:text-lg">
                          {item.title}
                          <span className="text-secondary-color double-caret "></span>
                        </p>
                        <p> {item.subtitle}</p>
                      </div>
                    </a>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </>
  );
};

export default HomeBusinessMainProcess;
