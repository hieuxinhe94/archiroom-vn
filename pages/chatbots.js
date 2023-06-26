import { useRouter } from "next/router";
import { getClient } from "../lib/sanity";
import { PostThumbnail } from "../Components/SectionCardTypeCaseStudy";
import { postfeaturesquery, prebuildproductListquery } from "../lib/groq";
import { NextSeo } from "next-seo";
import styles from "../styles/Post.module.css";
import {
  digitalCaseStudyArticles,
  showcasesSectionConfig,
} from "../Constants/userinfo";
import TypeIt from "typeit-react";
import TechPostThumbnail from "../Components/TechPostThumbnail";
import GetImage from "../utils/getImage";
import { useState } from "react";
import HeadTag from "../Components/HeadTag";
import ChatbotCustomView from "../Components/ChatbotCustomView";

export default function Chatbots(props) {
  const { siteconfig, currentTheme } = props;
  const router = useRouter();
  const posts = props.data;
  const [displayAgenda, setDisplayAgenda] = useState(false);
  const [activeModelIndex, setActiveModelIndex] = useState(0);

  const features = [
    {
      id: 1,
      title: "Hỏi đáp nghiệp vụ nội bộ",
      description: "Hình ảnh minh họa",
      body: "Hình ảnh minh họa",
      demoSrc: "./ocr-cmnd-demo.png",
    },
    {
      id: 2,
      title: "Ra lệnh tự động hóa công việc",
      description: "Hình ảnh minh họa",
      body: "Hình ảnh minh họa",
      demoSrc: "./ocr-cmnd-demo.png",
    },
    {
      id: 3,
      title: "Hỗ trợ khách hàng, hóa đơn",
      description: "Hình ảnh minh họa",
      body: "Hình ảnh minh họa",
      demoSrc: "./ocr-banking-result-demo.png",
    },
    {
      id: 5,
      title: "Giải trí",
      description: "Hình ảnh minh họa",
      body: "Hình ảnh minh họa",
      demoSrc: "",
    },
  ];

  return (
    <div>
      <HeadTag page="ocr-service" />
      <NextSeo
        title={`${"Bóc tách dữ liệu"}`}
        description={"" || ""}
        canonical={`/ocr-service/`}
        twitter={{
          cardType: "summary_large_image",
        }}
      />

      <section>
        <div className="relative bg-white/20">
          <div className="absolute w-full h-full -z-10"></div>
          <div className="">
            <h1 className="relative max-w-3xl mx-auto mb-3 text-3xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl after:absolute after:w-full after:h-full after:bg-white after:inset-0 after:-z-10 after:blur-2xl after:scale-150"></h1>
          </div>
        </div>

        <div className={styles.educationWrapper + " container mx-auto"}>
          <section
            className={
              styles.workheading +
              " marketing relative py-16 md:pt-12 md:pb-16  "
            }
            data-section-name=""
            data-component-name=""
          >
            <div className="container mb-10 grid grid-cols-12">
              <div className="md:col-span-5 col-span-12 md:pr-8">
                <h2 className="text-base font-bold default:text-[#08445E] uppercase mb-7 richtext">
                  <TypeIt
                    options={{
                      strings: [
                        "CHATBOT trên nền tảng Microsoft Cognitives Service",
                      ],
                      speed: 0.5,
                      startDelay: 1000,
                      waitUntilVisible: true,
                    }}
                  ></TypeIt>
                </h2>

                <div className="relative">
                  <p className="text-lg h-12 mr-32 text-gray-300 my-4"></p>
                  <div
                    data-aos="fade-up"
                    data-aos-delay={5000}
                    className="lg:w-2/3"
                  >
                    {features
                      ? features.map((model, key) => {
                          return (
                            <div
                              key={key}
                              onClick={() => setActiveModelIndex(key)}
                              data-aos="zoom-out-down"
                              data-aos-delay={(key + 1) * 500}
                              className=" text-sm hover:cursor-pointer overflow-hidden hover:bg-gray-200/20 border-b pb-4 font-medium default:flex default:border-black w-4/5"
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
                              <span className={(activeModelIndex == key ? " bg-green-200/40 " : "") + " text-sm px-1  reduced-motion:group-hover:translate-x-0 -translate-x-5 transition-transform duration-500 will-change-transform group-hover:translate-x-2"}>
                                {model.title}
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
                            </div>
                          );
                        })
                      : null}
                  </div>
                </div>
              </div>
              <div data-aos="fade-right" className="md:col-span-6 col-span-12">
                <div
                  role="presentation"
                  className="hero-card w-full h-full flex items-center justify-center algin-center"
                >
                  <div
                    role="presentation"
                    className=" relative z-10 transition-all duration-500 will-change-transform rounded-lg overflow-hidden shadow-homepage-card"
                  >
                    <p className="tracking-ff-tighter text-shade-70  richtext my-2">
                      Demo
                    </p>
                    
                    <ChatbotCustomView currentTheme={currentTheme} />   

                  
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div id="list" className={"my-12 z-50"}>
          <h2 className="text-base font-bold default:text-[#08445E] uppercase mb-7 richtext">MÔ TẢ CHI TIẾT</h2>
          {features[activeModelIndex]?.body}

          </div>
        </div>
      </section>
    </div>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const lastestpost = await getClient(preview).fetch(prebuildproductListquery);
  return {
    props: {
      data: lastestpost,
      // categories: categories,
      //siteconfig: { ...config },
      preview,
    },
    revalidate: 10,
  };
}
