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

                <div
                  className="relative"
                  style={{ backgroundImage: "team.svg" }}
                >
                  <p className="text-lg h-32 mr-32 text-gray-300">
                    <TypeIt
                      options={{
                        strings: [showcasesSectionConfig?.description],
                        speed: 0.5,
                        startDelay: 1000,
                        waitUntilVisible: true,
                      }}
                    ></TypeIt>
                  </p>
                  <div className="lg:w-2/3">
                    {posts
                      ? posts.map((post, key) => {
                          return (
                            <a
                              href={"#" + key}
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
                              <span className="text-sm reduced-motion:group-hover:translate-x-0 -translate-x-5 transition-transform duration-500 will-change-transform group-hover:translate-x-2">
                                {post.title}
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
                          );
                        })
                      : null}
                  </div>
                </div>
              </div>
              <div data-aos="fade-right" className="md:col-span-4 col-span-12">
                <p className="tracking-ff-tighter text-shade-70  richtext"></p>
                <img
                  className="w-full h-128 items-right align-right md:w-1/3-gutter aspect-square snap-center first:ml-gutter last:mr-gutter md:first:ml-0 md:last:mr-0"
                  sizes="10vw"
                  src={"team.svg"}
                  loading="lazy"
                  alt="Marketing product examples"
                />
              </div>
            </div>

            {/* <div className="md:container flex justify-between gap-x-gutter max-w-screen overflow-x-scroll md:overflow-x-visible snap-x snap-mandatory no-scrollbar">
              {posts
                ? posts.map((post, key) => { 
                  if(!post.mainImage) return null;
                  const imageProps = GetImage(post.mainImage)
                  if(!imageProps) return null;
                  return(
                      <img
                        key={key}
                        className="w-[15vw] md:w-1/3-gutter aspect-square snap-center first:ml-gutter last:mr-gutter md:first:ml-0 md:last:mr-0"
                        sizes="10vw"
                        src={imageProps.src}
                        loading="lazy"
                        alt="Marketing product examples"
                      />
                    ) }
                  )
                : null}
            </div> */}
          </section>

          <div id="list" className={"mt-2 z-50"}>
            {posts
              ? posts.map((post, key) => (
                  <section
                    id={key}
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
