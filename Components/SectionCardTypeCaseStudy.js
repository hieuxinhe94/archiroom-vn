import React from "react";
import styles from "../styles/Home.module.css";
import { digitalCaseStudyArticles } from "../Constants/userinfo";
import Link from "next/link";
import GetImage from "../utils/getImage";

const SectionCardTypeCaseStudy = ({ currentTheme, posts }) => {
  return (
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

                    <PostThumbnail {...post} ></PostThumbnail>

                    </div>
                  ))
                : null}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export function PostThumbnail(post) {
  const imageProps = post?.mainImage
  ? GetImage(post.mainImage)
  : null;

  console.log(imageProps);

  return (
    <Link href={`/post/${post.slug.current}`}>
      <div className="mx-auto sm:m-0 shadow-2xl text-center bg-white h-full overflow-visible flex flex-col relative">
        <div
          className="ratio-4-3 h-64 bg-top-1/4 w-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: "url('" + imageProps?.blurDataURL + "')",
          }}
        ></div>
        <div className="grow flex flex-col">
          <button
            className="focus:outline-none grow flex items-start justify-between text-left bg-theme-light-gray px-6 py-4 z-10 relative"
            data-modal="bio-modal-1"
          >
            <div className="">
              <h4 className=" text-gray-800"> {post.title}</h4>
              <h5 className="text-sm text-gray-500 ">{post.excerpt}</h5>
            </div>
            <div>
              <div className="plus transform duration-300 transition-transform border-2 border-black border-solid rounded-full w-12 h-12 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                  />
                </svg>
              </div>
            </div>
          </button>
        </div>
      </div>
    </Link>
  );
}

export default SectionCardTypeCaseStudy;
