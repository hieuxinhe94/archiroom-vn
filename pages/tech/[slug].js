import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import CategoryLabel from "../../Components/category";
import {
  configQuery,
  pathproductquery,
  pathquery,
  singleproductquery,
  singlequery,
} from "../../lib/groq";
import client, { getClient, usePreviewSubscription } from "../../lib/sanity";
import GetImage from "../../utils/getImage";
import { parseISO, format } from "date-fns";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import styles from "../../styles/Post.module.css";
import { CustomFieldsComponent } from "../../Components/CustomFieldsComponent";
import { useState } from "react";

export default function Post(props) {
  const { postdata, siteconfig, preview } = props;
  const router = useRouter();
  const { slug } = router.query;
  const [loading, setLoading] = useState(false);
  const [displayBotQnA, setDisplayBotQnA] = useState(false);
  const [displayBotCustomerService, setDisplayBotCustomerService] =
    useState(false);
  const { data: post } = usePreviewSubscription(singleproductquery, {
    params: { slug: slug },
    initialData: postdata,
    enabled: preview || router.query.preview !== undefined,
  });

  const imageProps = post?.mainImage ? GetImage(post?.mainImage) : null;

  const AuthorimageProps = post?.author?.image
    ? GetImage(post.author.image)
    : null;

  const contentResolver = (type) => {
    console.log(type);
    switch (type) {
      case "QNA-CHATBOT": {
        setLoading(true);
        setDisplayBotQnA(true);
        return;
      }
      case "INNOVATIVE-STUDIO": {
        setLoading(true);
        router.push("https://app.trustcontact.net");
        return;
      }
      default:
        return <>Unknown Action</>;
    }
  };
  const components = {
    block: {
      // Ex. 2: rendering custom lists
      blockquoteComponent: ({ children }) => (
        <CustomFieldsComponent type={"blockquoteComponent"}>
          {children}{" "}
        </CustomFieldsComponent>
      ),
      podcastComponent: ({ children }) => (
        <CustomFieldsComponent type={"podcastComponent"}>
          {" "}
          {children}
        </CustomFieldsComponent>
      ),
      videoComponent: ({ children }) => (
        <CustomFieldsComponent type={"videoComponent"}>
          {" "}
          {children}
        </CustomFieldsComponent>
      ),
      chatbotComponent: ({ children }) => (
        <CustomFieldsComponent type={"chatbotComponent"}>
          {children}
        </CustomFieldsComponent>
      ),
      rpaComponent: ({ children }) => (
        <CustomFieldsComponent type={"rpaComponent"}>
          {children}
        </CustomFieldsComponent>
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
              <div className="absolute w-3/4 h-full -z-10"></div>
              <div className="">
                <h1 className="relative max-w-3xl mx-auto mb-3 text-3xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl after:absolute after:w-full after:h-full after:bg-white after:inset-0 after:-z-10 after:blur-2xl after:scale-150"></h1>
              </div>
            </div>

            <div className="max-w-screen-xl mx-auto">
              <h2 className="text-base font-medium default:text-[#08445E] uppercase mb-5 md:mb-8 richtext">
                <CategoryLabel categories={post.categories} />
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
              </h2>

              <div className="mb-16 md:mb-24 flex justify-between md:flex-row flex-col">
                <div className="  w-3/4   mb-10 md:mb-0 shrink-1 richtext">
                  <p className="tracking-ff-tighter font-bold w-full text-3xl  mb-10 md:mb-0 shrink-1 richtext">
                    {post.title}
                  </p>
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
                  <div className="text-brand-primary dark:text-white  text-justify  my-3 prose prose-base dark:prose-invert prose-a:text-blue-500 antialiased hover:subpixel-antialiased">
                    {(post.body || post.customizebody) && (
                      <PortableText
                        components={components}
                        value={
                          post.body && post.body.length >= 10
                            ? post.body
                            : post.customizebody
                        }
                      />
                    )}
                  </div>
                </div>
                <div className="justify-start">
                  <button
                    onClick={() => {
                      contentResolver(post.productcode || "QNA-CHATBOT");
                    }}
                    className="text-lg m-8 overflow-hidden border-b pb-4 font-medium default:flex default:border-black  md:w-auto md:min-w-[24rem] cursor-pointer hover:bg-gray-300/50 "
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
                    <span className=" reduced-motion:group-hover:translate-x-0 -translate-x-5 transition-transform duration-500 will-change-transform group-hover:translate-x-2">
                      Trải nghiệm ngay
                    </span>
                    <div className=" flex justify-end items-end content-end">
                      {loading ? (
                        <svg
                          className="animate-spin reduced-motion:group-hover:translate-x-0 ml-auto h-6 w-6 origin-left translate-x-0 self-center justify-self-end opacity-100 transition-all duration-500 will-change-transform group-hover:translate-x-full group-hover:opacity-0"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      ) : (
                        <svg
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          focusable="false"
                          className="animate-ping h-6 w-6 mx-4"
                        >
                          <path
                            d="M17.707 9.293l-5-5a.999.999 0 10-1.414 1.414L14.586 9H3a1 1 0 100 2h11.586l-3.293 3.293a.999.999 0 101.414 1.414l5-5a.999.999 0 000-1.414z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      )}
                    </div>
                  </button>

                  <div className="w-full px-8">
                  <div className=" rounded-3xl border border-gray-100 p-8 shadow-2xl shadow-gray-600/10 dark:border-gray-700 dark:bg-gray-800 dark:shadow-none lg:px-12">
                  <div className="w-full flex text-xs font-medium text-gray-300 text-justify">
                      Tính năng:
                      </div>
                            <div className="w-64">
                                <p className="mt-2 w-full mb-8 text-gray-600 dark:text-gray-300 overflow-hidden">Lorem ipsum dolor laboriosam deleniti 
                                aperiam ab veniam sint non cumque quis tempore cupiditate.   veritatis harum et rerum.</p>
                                <div className="flex gap-4">
                                <div>
                                        <h2 className="leading-0 text-lg font-medium text-gray-700 dark:text-white">Randy Doe</h2>
                                        <p className="leading-0 -mt-0.5 text-sm text-gray-500 dark:text-gray-400">Backend dev</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                  </div>

                  <div className="w-full px-8 mt-12">
                    <div className="w-full cursor-pointer rounded-md bg-black/30  text-white backdrop-blur-md hover:bg-black/20 text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10">
                      <div className="flex items-center justify-center ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="rounded-xl w-6 h-6 border border-indigo-500 bg-indigo-500  justify-center text-white"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                          />
                        </svg>
                      </div>

                      <div className="w-full flex px-3 pt-2 pb-5 text-xs font-medium text-gray-300 text-justify">
                        Chính sách:
                      </div>
                      <div className="w-full flex px-3 pt-2 pb-5 text-xs font-medium text-gray-300 text-justify">
                        <ul>
                          <li>.</li>
                          <li>.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {displayBotQnA && (
            <div className="fixed bottom-10 right-10">
              <iframe
                src="https://webchat.botframework.com/embed/SimplifyAILanguageService01-bot?s=XN_b7jXwYcQ.310bmzFahKZJgN4BBPk3GLam2Jzkkht6bphzkvNZ7p0"
                style={{ height: "502px", maxHeight: "502px" }}
              ></iframe>
            </div>
          )}

          {displayBotCustomerService && (
            <div className="fixed bottom-10 right-10">
              <iframe
                src="https://webchat.botframework.com/embed/SimplifyAILanguageService01-bot?s=XN_b7jXwYcQ.310bmzFahKZJgN4BBPk3GLam2Jzkkht6bphzkvNZ7p0"
                style={{ height: "502px", maxHeight: "502px" }}
              ></iframe>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const post = await getClient(preview).fetch(singleproductquery, {
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
  const allPosts = await client.fetch(pathproductquery);
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
