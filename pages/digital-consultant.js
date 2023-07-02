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
import SectionCardTypeTimeline from "../Components/SectionCardTypeTimeline";
import SectionCardTypeConcept from "../Components/SectionCardTypeConcept";
import SectionCardTypeProduct from "../Components/SectionCardTypeProduct";
import SectionCardTypeObjective from "../Components/SectionCardTypeObjectives";
import SectionCardTypeSolution from "../Components/SectionCardTypeSolution";

export default function DigitalConsultant(props) {
  const { siteconfig, currentTheme } = props;
  const router = useRouter();
  const posts = props.data;
  const [displayAgenda, setDisplayAgenda] = useState(false);
  const [activeModelIndex, setActiveModelIndex] = useState(0);

  return (
    <div>
      <HeadTag page="ocr-service" />
      <NextSeo
        title={`${"Tư vấn Chuyển đổi số"}`}
        description={"" || ""}
        canonical={`/digital-consultant/`}
        twitter={{
          cardType: "summary_large_image",
        }}
      />

      <section>
        <div className="relative bg-white/20">
          <div className="absolute w-full h-full"></div>
          <div className="">
            <h1 className="relative max-w-3xl mx-auto mb-3 text-3xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl after:absolute after:w-full after:h-full after:bg-white after:inset-0  after:blur-2xl after:scale-150"></h1>
          </div>
        </div>

        <div className={styles.educationWrapper + " container mx-auto"}>
          <section
            className={
              styles.workheading +
              " marketing relative pt-16 md:pt-12 md:pt-16  "
            }
            data-section-name=""
            data-component-name=""
          >
            <div className="container mb-10 grid grid-cols-12">
              <div className="md:col-span-8 col-span-12 md:pr-8 px-2">
                <h2 className="text-lg font-medium default:text-[#08445E] uppercase mb-7 richtext">
                  <TypeIt
                    options={{
                      strings: [ showcasesSectionConfig?.description],
                      speed: 0.25,
                      startDelay: 1000,
                      waitUntilVisible: true,
                    }}
                  ></TypeIt>
                </h2>
              </div>
            </div>
          </section>

          <div id="list" className={""}>
            <div
              style={{
                backgroundColor: currentTheme.body,
              }}
            >
              {true ? (
                <SectionCardTypeTimeline currentTheme={currentTheme} />
              ) : null}
            </div>

            <div>
              {true ? (
                <SectionCardTypeConcept currentTheme={currentTheme} />
              ) : null}
            </div>

            <div>
              {true ? (
                <SectionCardTypeProduct currentTheme={currentTheme} />
              ) : null}
            </div>

            <div>
              {true ? (
                <SectionCardTypeObjective currentTheme={currentTheme} />
              ) : null}
            </div>

            <div>
              {true ? (
                <SectionCardTypeSolution currentTheme={currentTheme} />
              ) : null}
            </div>

            <div
              className={
                " h-1 w-full container mx-auto " + styles.lineHorizontal
              }
              data-aos="fade-up"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
