import { useRouter } from "next/router";
import { getClient } from "../lib/sanity";
import { PostThumbnail } from "../Components/SectionCardTypeCaseStudy";
import { postfeaturesquery } from "../lib/groq";
import { NextSeo } from "next-seo";
import styles from "../styles/Post.module.css";
import { digitalCaseStudyArticles } from "../Constants/userinfo";

export default function PostList(props) {
  const router = useRouter();
  const posts = props.data
  return (
    <div>
      <NextSeo
        title={`${"Blogs"}`}
        description={"" || ""}
        canonical={`/posts/`}
        
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
          <div
            className={styles.workheading + " " + styles.lineHorizontal}
            data-aos="fade-up"
          >
            {digitalCaseStudyArticles?.title}
          </div>
          <div className={" pt-20"}>
            <section className=" cards-block z-30 relative bg-no-repeat px-3 py-20 lg:py-20 bg-cover bg-center">
              <div className="container container-xl mx-auto z-10 relative">
                <div className="flex flex-wrap justify-center">
                  {posts
                    ? posts.map((post, key) => (
                        <div
                          key={key}
                          data-aos="fade-up"
                          className="expandable-card relative card-basic pb-8 sm:px-3 mt-6 lg:mt-0 xl:px-6  w-full md:w-1/2 lg:w-1/4"
                        >
                          <PostThumbnail {...post}></PostThumbnail>
                        </div>
                      ))
                    : null}
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const lastestpost = await getClient(preview).fetch(postfeaturesquery);
  //const config = await getClient(preview).fetch(configQuery);
  // const categories = (await client.fetch(catquery)) || null;

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
