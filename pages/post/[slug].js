import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import CategoryLabel from "../../Components/category";
import { configQuery, pathquery, singlequery } from "../../lib/groq";
import client, { getClient, usePreviewSubscription } from "../../lib/sanity";
import GetImage from "../../utils/getImage";
import { parseISO, format } from "date-fns";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import styles from "../../styles/Post.module.css";
import { CustomFieldsComponent } from "../../Components/CustomFieldsComponent";

export default function Post(props) {
  const { postdata, siteconfig, preview } = props;
  const router = useRouter();
  const { slug } = router.query;

  const { data: post } = usePreviewSubscription(singlequery, {
    params: { slug: slug },
    initialData: postdata,
    enabled: preview || router.query.preview !== undefined,
  });

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  const imageProps = post?.mainImage ? GetImage(post?.mainImage) : null;

  const AuthorimageProps = post?.author?.image
    ? GetImage(post.author.image)
    : null;

  const components = {
    block: {
      // Ex. 2: rendering custom lists
      blockquoteComponent: ({ children }) => (
        <CustomFieldsComponent type={"blockquoteComponent"} children={children} />  
      ),
      podcastComponent: ({ children }) => (
        <CustomFieldsComponent type={"podcastComponent"} children={children} />  
      ),
      videoComponent: ({ children }) => (
        <CustomFieldsComponent type={"videoComponent"} children={children} />  
      ),
      chatbotComponent: ({ children }) => (
        <CustomFieldsComponent type={"chatbotComponent"} children={children} />  
      ),
      rpaComponent: ({ children }) => (
        <CustomFieldsComponent type={"rpaComponent"} children={children} />  
      ),
    },
  };

  return (
    <>
      {post && (
        <div>
          <NextSeo
            title={`${post.title}`}
            description={post.excerpt || ""}
            canonical={`/post/${post.slug.current}`}
            openGraph={{
              title: `${post.title}`,
              description: post.excerpt || "",
              images: [
                {
                  url: GetImage(post?.mainImage).src || null,
                  width: 800,
                  height: 600,
                  alt: "",
                },
              ],
              site_name: "",
            }}
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

            <article className="!pt-0">
              <div className="max-w-screen-md mx-auto ">
                <div className="text-center">
                  <CategoryLabel categories={post.categories} />
                </div>

                <h1 className="mt-2 mb-3 text-3xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl dark:text-white">
                  {post.title}
                </h1>

                <div className="flex justify-center mt-3 space-x-3 text-gray-500 ">
                  <div className="flex items-center gap-3">
                    <div className="relative flex-shrink-0 w-10 h-10">
                      {AuthorimageProps && (
                        <Image
                          src={AuthorimageProps.src}
                          blurDataURL={AuthorimageProps.blurDataURL}
                          loader={AuthorimageProps.loader}
                          objectFit="cover"
                          alt={post?.author?.name}
                          placeholder="blur"
                          layout="fill"
                          className="rounded-full"
                        />
                      )}
                    </div>
                    <div>
                      <p className="text-gray-800 dark:text-gray-400">
                        {post.author.name}
                      </p>
                      <div className="flex items-center space-x-2 text-sm">
                        <time
                          className="text-gray-500 dark:text-gray-400"
                          dateTime={post?.publishedAt || post._createdAt}
                        >
                          {format(
                            parseISO(post?.publishedAt || post._createdAt),
                            "MMMM dd, yyyy"
                          )}
                        </time>
                        <span>· {post.estReadingTime || "5"} min read</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            <div className="relative my-8 z-0 max-w-screen-lg mx-auto overflow-hidden lg:rounded-lg aspect-video">
              {imageProps && (
                <Image
                  src={imageProps.src}
                  loader={imageProps.loader}
                  blurDataURL={imageProps.blurDataURL}
                  alt={post.mainImage?.alt || "Thumbnail"}
                  placeholder="blur"
                  layout="fill"
                  loading="eager"
                  objectFit="cover"
                />
              )}
            </div>

            <section className="flex justify-center">
              <article className={styles.articleBody + " mx-auto flex"}>
                <div className="text-gray-300/90 mx-auto indent-2 text-justify max-w-screen-md my-3 prose prose-base dark:prose-invert prose-a:text-blue-500 antialiased hover:subpixel-antialiased leading-loose">
                  {post.body && (
                    <PortableText
                      components={components}
                      value={post.customizebody}
                    />
                  )}

                  <div className="flex justify-center mt-7 mb-7">
                    <Link href="/">
                      <a className="px-5 py-2 text-sm text-blue-600 rounded-full dark:text-blue-500 bg-brand-secondary/20 ">
                        ← View all posts
                      </a>
                    </Link>
                  </div>
                </div>

                <div className="w-64 p-4">
                  <div className="w-full  items-center justify-end">
                    <div className="w-full ">
                      <div className="w-full cursor-pointer relative inline-flex rounded-md bg-white text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50 hover:text-slate-900">
                        <div className="w-full flex px-3 py-2">
                          <svg className="mr-2.5 h-5 w-5 flex-none fill-slate-400">
                            <path d="M5 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v14l-5-2.5L5 18V4Z"></path>
                          </svg>
                          Subscribe this topic
                        </div>
                        <div className="border-l border-slate-400/20 px-2.5 py-2">
                          12k
                        </div>
                      </div>
                      <div className="z-0">
                        <div className="absolute -bottom-8 -top-12 right-0 w-px bg-slate-900/[0.1] [mask-image:linear-gradient(to_top,transparent,white_4rem,white_calc(100%-4rem),transparent)]"></div>
                        <div className="absolute -bottom-8 -top-12 left-0 w-px bg-slate-900/[0.1] [mask-image:linear-gradient(to_top,transparent,white_4rem,white_calc(100%-4rem),transparent)]"></div>
                      </div>
                    </div>

                    <hr className="my-6 w-full h-0.1" />
                    <br />

                    <div className="w-full ">
                      <div className="w-full cursor-pointer   rounded-md bg-black/30  text-white backdrop-blur-md hover:bg-black/20 text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10">
                        <div className="flex items-center justify-center ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="-mt-2 rounded-xl w-6 h-6 border border-indigo-500 bg-indigo-500  justify-center  animate-pulse text-white"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                            />
                          </svg>
                        </div>

                        <div className="w-full flex px-2 py-4 text-xs font-medium text-gray-300 text-justify">
                          ChatGPT được sử dụng ở một vài nơi, giúp đảm bảo tính
                          khách quan cho bài viết này.
                        </div>
                      </div>
                    </div>

                    <hr className="my-6 w-full h-0.1" />
                    <br />

                    <div className="w-full ">
                      <div className="w-full cursor-pointer   rounded-md bg-black/30  text-white backdrop-blur-md hover:bg-black/20 text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10">
                        <div className="flex items-center justify-center ">
                      
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="-mt-2 rounded-xl w-6 h-6 border border-indigo-500 bg-indigo-500  justify-center  animate-pulse text-white"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                            />
                          </svg>
                        </div>

                        <div className="w-full flex px-2 py-4 text-xs font-medium text-gray-300 text-justify">
                          RPA - Robotic tự động tổng hợp, báo cáo dữ liệu theo
                          thời gian thực...
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </section>
          </section>
        </div>
      )}
    </>
  );
}



export async function getStaticProps({ params, preview = false }) {
  const post = await getClient(preview).fetch(singlequery, {
    slug: params.slug,
  });

  const config = await getClient(preview).fetch(configQuery);

  return {
    props: {
      postdata: { ...post },
      siteconfig: { ...config },
      preview,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const allPosts = await client.fetch(pathquery);
  return {
    paths:
      allPosts?.map((page) => ({
        params: {
          slug: page.slug,
        },
      })) || [],
    fallback: true,
  };
}
