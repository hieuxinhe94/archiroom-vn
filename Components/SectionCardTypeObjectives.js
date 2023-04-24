import React, { useEffect, useRef } from "react";
import styles from "../styles/Home.module.css";
import { digitalObjectivesMetadata } from "../Constants/userinfo";
import Link from "next/link";
import Chart from "chart.js/auto";
import Utils from "chart.js/helpers";

const SectionCardTypeObjective = ({ currentTheme, data }) => {
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
        {digitalObjectivesMetadata?.title}
      </div>

      <section className=" text-and-media-block relative px-4 bg-no-repeat overflow-hidden py-2 md:py-12 bg-primary-color bg-cover bg-center">
        <div className="container mx-auto z-10 relative px-2">
          <div className="bg-theme-light-gray pt-8 px-2 lg:px-0 lg:py-10 mt-8">
            <div className="flex relative flex-wrap">
              <div className="w-full lg:w-1/2 order-1 md:order-2">
                <div className="flex -mt-12 justify-start items-end space-x-4 font-mono font-bold text-xs text-center text-white">
                  {digitalObjectivesMetadata &&
                    digitalObjectivesMetadata.features.map((item, key) => (
                      <>
                        <div
                          key={key}
                          className={
                            " w-8  rounded-lg shadow-lg relative " +
                            " h-" +
                            [16, 24, 48, 64, 96, 128][key] +
                            " bg-" +
                            [
                              "indigo",
                              "indigo",
                              "indigo",
                              "indigo",
                              "indigo",
                              "indigo",
                            ][key] +
                            "-500"
                          }
                          data-aos="fade-up"
                          data-aos-duration={200 + key * 500}
                        >
                          <div className="absolute w-8 bottom-6">
                            <div className="-rotate-90 text-xs text-gray-300 text-left">
                              {item.subtitle}
                            </div>
                          </div>
                        </div>
                        <div
                          data-aos="fade-up"
                          data-aos-duration={200 + key * 500}
                          className={"w-32 text-sm font-normal text-left "}
                        >
                          {item.title}
                        </div>
                      </>
                    ))}
                </div>
              </div>
              <div className="w-full lg:w-1/2 z-10 transform -translate-y-16 lg:translate-y-0 -mt-2 lg:mt-0 lg:pr-12 ">
                <h2 className="text-primary-color sm:w-3/4 lg:w-4/5 text-justify">
                  {digitalObjectivesMetadata?.subtitle}
                </h2>
                <div
                  className="wysiwyg mt-1 sm:w-3/4 lg:w-4/5 text-gray-300 text-justify leading-relaxed"
                  style={{ whiteSpace: "pre-line" }}
                >
                  {digitalObjectivesMetadata?.description}
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
