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

export default function ShowCases(props) {
  const router = useRouter();
  const posts = props.data;
  return (
    <div>
      <NextSeo
        title={`${"Công nghệ số"}`}
        description={"" || ""}
        canonical={`/showcases/`}
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
              <div className="md:col-span-8 col-span-12 md:pr-8">
                <h2 className="text-base font-medium default:text-[#08445E] uppercase mb-7 richtext">
                  {showcasesSectionConfig?.title}
                </h2>
                <p className="text-lg h-36 ">
                  <TypeIt
                    options={{
                      strings: [showcasesSectionConfig?.subtitle, showcasesSectionConfig?.description],
                      speed: 0.5,
                      startDelay: 1000,
                      waitUntilVisible: true,
                    }}
                  ></TypeIt>
                </p>
              </div>
              <div
                data-aos="fade-right"
                className="md:col-span-4 col-span-12"
              >
                <p className="tracking-ff-tighter text-shade-70 my-8 md:my-16 richtext">
                
                </p>
                <a
                  href="#list"
                  className="text-lg overflow-hidden border-b pb-4 font-medium default:flex default:border-black w-4/5"
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
                    onClick={() => {}}
                    className="reduced-motion:group-hover:translate-x-0 -translate-x-5 transition-transform duration-500 will-change-transform group-hover:translate-x-2"
                  >
                    Khám phá sản phẩm
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
                </a>
              </div>
            </div>
            <div className="md:container flex justify-between gap-x-gutter max-w-screen overflow-x-scroll md:overflow-x-visible snap-x snap-mandatory no-scrollbar">
              <img
                className="w-[80vw] md:w-1/3-gutter aspect-square snap-center first:ml-gutter last:mr-gutter md:first:ml-0 md:last:mr-0"
                sizes="100vw"
                srcSet="https://cdn.shopify.com/shopifycloud/brochure/assets/home/redesign2022/sell-buyer-small-f7a1e59a62226c554e7691b17a1af76c06978bd41ce78d4f980446ed1bfcaad6.webp 1x, https://cdn.shopify.com/shopifycloud/brochure/assets/home/redesign2022/sell-buyer-large-37ef6b862e53584054039ff594f868d60f1804c08624b462c4f4d679e7155c71.webp 2x"
                loading="lazy"
                alt="Marketing product examples"
              />
              <img
                className="w-[80vw] md:w-1/3-gutter aspect-square snap-center first:ml-gutter last:mr-gutter md:first:ml-0 md:last:mr-0"
                sizes="100vw"
                srcSet="https://cdn.shopify.com/shopifycloud/brochure/assets/home/redesign2022/marketing2-small-2a712ec8dc64d2b33a2ddd9346f5ebeb8d87d616831d14cb32dcef3e06302598.png 1x, https://cdn.shopify.com/shopifycloud/brochure/assets/home/redesign2022/marketing2-large-11a96ec4b8f603824a9f489b164510137d62ec4035577593d68c787159c9a5e2.png 2x"
                loading="lazy"
                alt="Marketing - Connect with customers online"
              />
              <img
                className="w-[80vw] md:w-1/3-gutter aspect-square snap-center first:ml-gutter last:mr-gutter md:first:ml-0 md:last:mr-0"
                sizes="100vw"
                srcSet="https://cdn.shopify.com/shopifycloud/brochure/assets/home/redesign2022/marketing3-small-6582aefc08f96962465ba3e4579af9e7c1fd338571c1ac96de8999feb106c05f.png 1x, https://cdn.shopify.com/shopifycloud/brochure/assets/home/redesign2022/marketing3-large-45a05b52b6219582fe516c4fdea4dfe6aa7107b7dd07b1e91e49bcf35fb85fc7.png 2x"
                loading="lazy"
                alt="Marketing - Connect with customers in person"
              />
            </div>
          </section>

          <div id="list" className={"mt-2 z-50"}>
            {posts
              ? posts.map((post, key) => (
                  <section
                    key={key}
                    data-aos="fade-up"
                    className="pb-16 md:pt-8"
                  
                  >
                    <TechPostThumbnail {...post}></TechPostThumbnail>
                  </section>
                ))
              : null}
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
