import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import TypeIt from "typeit-react";
import { showcasesSectionConfig } from "../Constants/userinfo";
import TechPostThumbnail from "./TechPostThumbnail";
import GetImage from "../utils/getImage";

const SectionCardTechProduct = (props) => {
  const { products, currentTheme } = props;
  const [selectedId, setSelectedId] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(products[0] || {});
  console.log(products)
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
        Phần mềm doanh nghiệp
      </div>

      <section className="flex flex-row-reverse  text-and-media-block relative px-4 bg-no-repeat overflow-hidden py-8 md:py-12 xl:py-16 bg-primary-color bg-cover bg-center">
        <div className="w-1/2">
          <div
            id="list"
            data-aos="fade-up"
            data-aos-delay={5000}
            className={"mt-2 z-50"}
          >
            <div className="md:w-1/2-gutter flex items-center justify-center order-2 shrink-0 md:order-2">
              {/**/}

              {selectedProduct.videoURL && (
                <video
                  width={"800px"}
                  height={"600px"}
                  className=" max-w-full border border-gray-200 rounded-lg dark:border-gray-700"
                  controls
                  autoPlay={false}
                >
                  <source src={selectedProduct.videoURL} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}

              {!selectedProduct.videoURL && selectedProduct.mainImage && (
                <div className=" max-w-full border border-gray-200 rounded-lg dark:border-gray-700">
                  <Image
                    src={GetImage(selectedProduct.mainImage)?.src}
                    alt={selectedProduct.title}
                    loader={imageProps.loader}
                    width={"800px"}
                    height={"400px"}
                    priority={false}
                    className="ratio-4-3 w-full bg-cover bg-no-repeat p-3"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          data-aos="fade-up"
          data-aos-delay={5000}
          className="lg:w-2/3  my-8"
        >
          <div className="flex flex-wrap text-center mb-2" data-aos="fade-up">
            <div className="mr-2 mb-2 rounded-full px-3 py-1 text-xs bg-green-400 text-green-900">
              Microsoft Sharepoint
            </div>
            <div className="mr-2 mb-2 rounded-full px-3 py-1 text-xs bg-green-400 text-green-900">
              On-premise{" "}
            </div>
          </div>
          {products
            ? products.map((product, key) => {
                return (
                  <a key={key} href={"/tech/"+ product.slug?.current}> <div
                    
                    onClick={() => {
                      setSelectedId((k) => key);
                      setSelectedProduct((p) => products[key]);
                    }}
                    data-aos="zoom-out-down"
                    data-aos-delay={(key + 1) * 500}
                    className="text-sm overflow-hidden hover:bg-gray-200/20 border-b pb-4 font-medium default:flex default:border-black w-4/5"
                  >
                    <svg
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      focusable="false"
                      className="reduced-motion:group-hover:-translate-x-full h-6 w-6 origin-left -translate-x-full self-center opacity-0 transition-all duration-500 will-change-transform group-hover:translate-x-0 group-hover:opacity-100"
                    >
                      <path
                        d="M17.707 9.293l-5-5a.999.999 0 10-1.414 1.414L14.586 9H3a1 1 0 100 2h11.586l-3.293 3.293a.999.999 0 101.414 1.414l5-5a.999.999 0 000-1.414z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <span
                      className={
                        // (selectedId == key ? " bg-green-200/40 " : "") +
                        "text-sm reduced-motion:group-hover:translate-x-0 -translate-x-5 transition-transform duration-500 will-change-transform group-hover:translate-x-2"
                      }
                    >
                     <a href={"/tech/"+ product.slug?.current}></a> {product.title}
                    </span>
                    <svg
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      focusable="false"
                      className="reduced-motion:group-hover:translate-x-0 ml-auto h-6 w-6 origin-left translate-x-0 self-center justify-self-end opacity-100 transition-all duration-500 will-change-transform group-hover:translate-x-full group-hover:opacity-0"
                    >
                      <path
                        d="M17.707 9.293l-5-5a.999.999 0 10-1.414 1.414L14.586 9H3a1 1 0 100 2h11.586l-3.293 3.293a.999.999 0 101.414 1.414l5-5a.999.999 0 000-1.414z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div></a>
                );
              })
            : null}
        </div>
      </section>
    </div>
  );
};

export default SectionCardTechProduct;
