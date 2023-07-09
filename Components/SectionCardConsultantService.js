import React from "react";
import styles from "../styles/Home.module.css";
import {
  consultantService,
  digitalSolutionMetadata,
} from "../Constants/userinfo";
import Link from "next/link";

const SectionCardConsultantService = (props) => {

  const productJsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: "SimplifyDx - Digital transformation AI",
    image: [
      "https://example.com/photos/1x1/photo.jpg",
      "https://example.com/photos/4x3/photo.jpg",
      "https://example.com/photos/16x9/photo.jpg",
    ],
    description:
      "SimplifyDx - AI Digital Consultant service, Tư vấn chuyển đổi số",
    sku: "0446310786",
    mpn: "925872",
    brand: {
      "@type": "Brand",
      name: "SimplifyDx",
    },
    review: {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: 4,
        bestRating: 5,
      },
      author: {
        "@type": "Person",
        name: "Fred Benson",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.4,
      reviewCount: 89,
    },
    offers: {
      "@type": "Offer",
      url: "https://SimplifyDx.com/digital-consultant",
      priceCurrency: "USD",
      price: 119.99,
      priceValidUntil: "2020-11-20",
      itemCondition: "https://schema.org/UsedCondition",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <div className={styles.educationWrapper + " container mx-auto my-24"}>
      <a href={`/digital-consultant`}>
        <div
          className={
            styles.workheading +
            " flex items-end md:text-sm lg:text-4xl px-4 " +
            styles.lineHorizontal
          }
          data-aos="fade-up"
        >
          {consultantService?.title}
        </div>
      </a>
      <section className=" text-and-media-block relative px-4 bg-no-repeat overflow-hidden py-8 md:py-12 xl:py-16 bg-primary-color bg-cover bg-center">
        <div className="container mx-auto   relative px-2">
          <div className="bg-theme-light-gray pt-8 px-2 lg:px-0 ">
            <div className="flex relative flex-wrap">
              <div className="w-full lg:w-1/2 ">
                <div className="my-auto lg:max-w-2xl">
                  <div className="relative w-full transition-shadow duration-300 hover:shadow-xl">
                    <a href={`/digital-consultant`}>
                      {" "}
                      <img
                        className="p-2 mt-8 object-cover w-full h-64 rounded shadow-lg sm:h-64 md:h-80 lg:h-96"
                        src="./3.png"
                        alt=""
                        data-aos="fade-up"
                      />
                    </a>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-1/2 transform   lg:translate-y-0 mt-8 lg:mt-24 lg:pr-12">
                <h2 className="text-primary-color -mt-10 font-semibold text-justify">
                  {consultantService?.subtitle}
                </h2>
                <div className="wysiwyg mt-6 sm:w-3/4 lg:w-4/5 text-gray-300 text-justify">
                  <p className="pb-4">{consultantService?.description}</p>
                </div>
                <div className="">
                  {consultantService?.features &&
                    consultantService?.features?.map((item, key) => (
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
    </div>
  );
};

export default SectionCardConsultantService;
