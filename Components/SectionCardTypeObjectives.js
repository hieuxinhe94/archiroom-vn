import React, { useEffect, useRef } from "react";
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
import Chart from "chart.js/auto";
import Utils from "chart.js/helpers";

const SectionCardTypeObjective = ({ currentTheme, data }) => {
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
        {digitalObjectivesMetadata?.title}
      </div>

      <section className="mt-8 text-and-media-block relative px-4 bg-no-repeat overflow-hidden py-2 md:py-12 bg-primary-color bg-cover bg-center">
        <div className="container mx-auto z-10 relative px-2">
          <div className="bg-theme-light-gray pt-8 px-2 lg:px-0 lg:py-10 mt-8">
            <div className="flex relative flex-wrap">
              <div className="w-full lg:w-1/2 order-1 md:order-2">
                <div className="relative lg:-mt-6 w-full h-64 lg:h-full transition-shadow duration-300 hover:shadow-xl">
                  <picture className="p-2 mt-8 mr-4 rounded-2xl object-cover w-full h-64 rounded shadow-lg sm:h-64 md:h-80 lg:h-full ">
                    <source
                      srcSet={digitalObjectivesMetadata?.main_image.src}
                      type="image/avif"
                    />
                    <img
                      width="600"
                      height="530"
                      src={digitalObjectivesMetadata?.main_image.src}
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
              <div className="w-full lg:w-1/2 z-10 transform -translate-y-16 lg:translate-y-0 mt-8 lg:mt-0 lg:pr-12 ">
                <h2 className="text-primary-color">
                  Innovative analytics that you will love
                </h2>
                <div className="wysiwyg mt-6">
                  <div className="flex justify-start items-end space-x-4 font-mono font-bold text-xs text-center text-white">
                    <div className="w-8 bg-blue-500 rounded-lg shadow-lg h-24 relative">
                      <div className="absolute w-8 bottom-6">
                        <div className="-rotate-90">3 m</div>
                      </div>
                    </div>
                    <div className="px-2 w-16"> AAA </div>
                    <div className="w-8 bg-blue-500 rounded-lg shadow-lg h-40 relative">
                      <div className="absolute w-8 bottom-6">
                        <div className="-rotate-90">6 m</div>
                      </div>
                    </div>
                    <div className="px-2 w-16"> AAA </div>
                    <div className="w-8 bg-blue-500 rounded-lg shadow-lg h-64 relative">
                      <div className="absolute w-8 bottom-6">
                        <div className="-rotate-90">1 y</div>
                      </div>
                    </div>
                    <div className="px-2 w-16"> AAA </div>
                    <div className="w-8 bg-blue-500 rounded-lg shadow-lg h-96 relative">
                      <div className="absolute w-8 bottom-6">
                        <div className="-rotate-90">2y</div>
                      </div>
                    </div>
                    <div className="px-2 w-16"> AAA </div>

                    <div className="w-8 bg-blue-500 rounded-lg shadow-lg h-96 relative">
                      <div className="absolute w-8 bottom-6">
                        <div className="-rotate-90">3y</div>
                      </div>
                    </div>
                    <div className="px-2 w-16"> AAA </div>
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

export const Statistic = () => {
  const canvasEl = useRef(null);
  const colors = {
    purple: {
      default: "rgba(149, 76, 233, 1)",
      half: "rgba(149, 76, 233, 0.5)",
      quarter: "rgba(149, 76, 233, 0.25)",
      zero: "rgba(149, 76, 233, 0)",
    },
    white: {
      default: "rgba(149, 76, 233, 1)",
      half: "rgba(149, 76, 233, 0.5)",
      quarter: "rgba(149, 76, 233, 0.25)",
      zero: "rgba(149, 76, 233, 0)",
    },
    main_color: {
      default: "#17223b",
      half: "#47ce2ccc",
    },
  };

  useEffect(() => {
    const ctx = canvasEl.current.getContext("2d");
    // const ctx = document.getElementById("myChart");

    const gradient = ctx.createLinearGradient(0, 16, 0, 600);
    gradient.addColorStop(0, colors.purple.half);
    gradient.addColorStop(0.65, colors.purple.quarter);
    gradient.addColorStop(1, colors.purple.zero);

    const weight = [60.0, 60.2, 59.1, 61.4, 59.9, 60.2, 59.8, 58.6, 59.6, 59.2];

    const labels = [
      "Khách hàng",
      "Chiến lược",
      "Công nghệ",
      "Vận hành",
      "Văn hóa",
      "Dữ liệu",
    ];
    const DATA_COUNT = 6;
    const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

    const data = {
      labels: labels,
      datasets: [
        {
          label: "Tổ chức của bạn",
          data: [1, 2, 3, 4, 5, 4],
          borderColor: colors.purple.default,
          backgroundColor: colors.main_color.half,
        },
        {
          label: "Trung bình ngành",
          data: [3, 4, 4, 4, 3, 4],
          borderColor: colors.purple.half,
          backgroundColor: colors.main_color.default,
        },
      ],
    };

    let delayed = true;
    const config = {
      type: "radar",
      data: data,
      backgroundColor: colors.purple.half,

      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Mô hình đánh giá mức độ trưởng thành chuyển đổi số",
          },
        },
        animation: {
          onComplete: () => {
            delayed = true;
          },
          delay: (context) => {
            let delay = 0;
            if (
              context.type === "data" &&
              context.mode === "default" &&
              !delayed
            ) {
              delay = context.dataIndex * 300 + context.datasetIndex * 100;
            }
            return delay;
          },
        },
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      },
    };
    const myLineChart = new Chart(ctx, config);

    return function cleanup() {
      myLineChart.destroy();
    };
  });
  return (
    <div className="relative bg-white/90 rounded-lg">
      <canvas data-aos="fade-up" id="myChart" ref={canvasEl} height="350" />
    </div>
  );
};

export default SectionCardTypeObjective;
