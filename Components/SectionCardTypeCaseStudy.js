import React from "react";
import styles from "../styles/Home.module.css";
import { digitalCaseStudyArticles } from "../Constants/userinfo";
import Link from "next/link";
import GetImage from "../utils/getImage";
import Image from "next/image";

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
                      <PostThumbnail {...post}></PostThumbnail>
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
  const imageProps = post?.mainImage ? GetImage(post.mainImage) : null;

  return (
    <Link href={`/post/${post.slug.current}`}>
      <div class="container flex md:flex-row flex-col justify-between">
        <div class="md:w-1/2-gutter flex items-center justify-center order-2 shrink-0 md:order-2">
          {/* <img
                    sizes="100vw"
                    srcset="https://cdn.shopify.com/shopifycloud/brochure/assets/home/redesign2022/pos-2-small-2bceb2e9fd90de0e825252632b00f723978536c6c4535e44468dfc31a7cef8f0.webp 1x, https://cdn.shopify.com/shopifycloud/brochure/assets/home/redesign2022/pos-2-large-50a3a20f09c7d1fef32dd3c6fdcfc75db43bc06e980cd317d08acbba64ae9a7b.webp 2x"
                    alt="Shopify Point of Sale"
                    class="w-full h-full object-contain"
                  /> */}
          {imageProps ? (
            <Image
              sizes="100vw"
              src={imageProps?.src}
              alt={"trustcheck feature"}
              loader={imageProps.loader}
              width={254}
              height={254}
              priority={false}
              class="w-full h-full object-contain"
            />
          ) : null}
        </div>
        <div class="w-full md:max-w-[420px] py-16 md:py-32 order-1 md:w-1/2-gutter md:order-1">
          <h2 class="text-base font-medium default:text-[#08445E] uppercase mb-5 md:mb-7 richtext">
            POINT OF SALE
          </h2>
          <p class="tracking-ff-tighter mb-6 font-bold text-[28px] leading-[30px] md:text-[40px] md:leading-[44px] richtext">
            {post.title}
          </p>
          <div class="text-shade-70 mb-16 text-base">
            <p>{post.excerpt}</p>
          </div>
          <a
            href="/pos"
            class="text-lg overflow-hidden border-b pb-4 font-medium default:flex default:border-black w-4/5"
          >
            <svg
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
              class="reduced-motion:group-hover:-translate-x-full h-6 w-6 origin-left -translate-x-full self-center opacity-0 transition-all duration-500 will-change-transform group-hover:translate-x-0 group-hover:opacity-100"
            >
              <path
                d="M17.707 9.293l-5-5a.999.999 0 10-1.414 1.414L14.586 9H3a1 1 0 100 2h11.586l-3.293 3.293a.999.999 0 101.414 1.414l5-5a.999.999 0 000-1.414z"
                fill="currentColor"
              ></path>
            </svg>
            <span class="reduced-motion:group-hover:translate-x-0 -translate-x-5 transition-transform duration-500 will-change-transform group-hover:translate-x-2">
              Meet Shopify POS
            </span>
            <svg
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
              class="reduced-motion:group-hover:translate-x-0 ml-auto h-6 w-6 origin-left translate-x-0 self-center justify-self-end opacity-100 transition-all duration-500 will-change-transform group-hover:translate-x-full group-hover:opacity-0"
            >
              <path
                d="M17.707 9.293l-5-5a.999.999 0 10-1.414 1.414L14.586 9H3a1 1 0 100 2h11.586l-3.293 3.293a.999.999 0 101.414 1.414l5-5a.999.999 0 000-1.414z"
                fill="currentColor"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </Link>
  );
}

export default SectionCardTypeCaseStudy;
