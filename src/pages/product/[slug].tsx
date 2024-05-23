
import { Image as Image2, Switch } from '@nextui-org/react'
import { GetStaticProps } from 'next';
import Image from "next/image";
import { useRouter } from 'next/router'
import Script from 'next/script';
import { useState } from 'react';

import polygon from "~/assets/background-images/polygon.svg"
import polygonfooter from "~/assets/background-images/polygon-footer.svg"
import purpleGradient from "~/assets/background-images/purple-gradient.svg"
import vector from "~/assets/background-images/vector.svg"
import Container from '~/components/Container'
import Footer from '~/components/footer';
import Navbar from '~/components/navbar';
import { Product } from '~/components/Product';
import { getSettings } from '~/lib/client';
import Head from 'next/head';
import { NextSeo } from 'next-seo';

async function getProductDetail(name): Promise<Product> {
  const res = await fetch('https://api.tryonhub.ai/product/findOneByName/' + name);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

async function getAllProducts(): Promise<Product[]> {
  const res = await fetch('https://api.tryonhub.ai/product/findAll');

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}


export default function Page(props) {
  const router = useRouter()

  return (<>
    <section className='bg-black/10'>
      <Head>
        <title>Canonical Tag Example</title>
        <link
          rel="canonical"
          href="https://example.com/blog/original-post"
          key="canonical"
        />
        <meta
          name="description"
          content="Check out iPhone 12 XR Pro and iPhone 12 Pro Max. Visit your local store and for expert advice."
        />
      </Head>
      <NextSeo
        title="Fashion Studio TryOnHub.AI"
        description="Virtual try on clothing studio for business."
        canonical="https://www.tryonhub.ai/"
        openGraph={{
           
          url: 'https://www.tryonhub.ai/business-app',
          title: "Fashion Studio TryOnHub.AI",
          description: 'TryOnHub.AI Fashion Studio, AI thử mặc thời trang',
          images: [
            {
              url: 'https://www.tryonhub.ai/animates/biz-studio.png',
              width: 800,
              height: 600,
              alt: 'Fashion Studio TryOnHub.AI',
              type: 'image/jpeg',
            },
            {
              url: 'https://www.tryonhub.ai/animates/biz-studio-2.png',
              width: 900,
              height: 800,
              alt: 'Fashion Studio TryOnHub.AI',
              type: 'image/jpeg',
            },

          ],
          siteName: 'TryOnHub.AI',
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />
      <Container>
        <div className="relative z-0">
          <Image priority={true} src={purpleGradient} width={200} height={200} className='absolute top-[-100px] right-[70px] z-0' alt={''} />
          <Image priority={true} src={polygon} width={900} height={900} className='absolute top-[-100px] right-[200px] z-0' alt={''} />
        </div>
        {/* <Navbar settings={props.settings} launchAppEvent={() => { console.log("showLogin"); }} /> */}
      </Container>
    </section>

    <section className='bg-black/10 w-full py-20'>
      <ProductPageContent props={props} />
    </section>

    {/* <Footer  /> */}
    <div className="relative opacity-70 z-0">

      <Image src={polygonfooter} width={900} height={900} className='absolute bottom-0 left-[-260px] z-0' alt={''} />
      <Image src={vector} width={400} height={400} className='absolute bottom-[200px] right-[-400px] hidden md:block z-0' alt={''} />
      <Script src="https://www.tryonhub.ai/tryonhub.min.js" />
    </div>
  </>);
}

export const getStaticProps: GetStaticProps = async ({ params, preview = false }) => {
  const settings = await getSettings();

  try {
    const product = await getProductDetail(params.slug);
    return {
      props: {
        product: { ...product },
        settings: { ...settings },
        preview,
      },
      revalidate: 30,
    };
  } catch {
    return {
      props: {
        product: {},
        settings: { ...settings },
        preview,
      },
      revalidate: 30,
    };
  }

}

export async function getStaticPaths() {
  const allPosts = await getAllProducts();
  return {
    paths:
      allPosts.filter(t => t.name != undefined && t.name != null)?.map((page) => ({
        params: {
          slug: page.name,
        },
      })) || [],
    fallback: false,
  };
}

function ProductPageContent({ props, }) {
  const [activeAI, setActiveAI] = useState(false);
  const [selectedClothes, setSelectedClothes] = useState('')
  const [selectedMedia, setSelectedMedia] = useState("")
  const [product, setProduct] = useState<Product[]>(props.product)
  return (<>

    <section className="page-title">
      <div className="page-title-container pt-[40px] md:pt-[70px]">
        <h1 className="title text-white uppercase text-center font-bold text-[40px] relative">{"Product Detail"}</h1>
        <p className="description text-[18px] text-white text-center relative z-[1] px-[16px]">

        </p>
      </div>
    </section>

    <section className="relative z-10 min-h-[400px] w-100 z-50 text-white">
      <Container>
        <div className="left-0 py-0">
          <div className='main-nav flex flex-col md:flex-row items-center mb-[30px]'>
            <div className="try-on-bar-actions flex flex-row items-center justify-between shrink-0 mb-[10px] md:mb-0 mr-0 md:mr-[60px] w-full md:w-[250px]">
              <span className='text-white text-[20px] font-bold mr-[44px]'> Auto Try-On </span>

              <Switch defaultSelected color="secondary"
                onChange={(value) => {
                  setActiveAI(!activeAI);
                }}></Switch>
            </div>

          </div>

          <div className='sidebar flex flex-col md:flex-row'>
            <nav className='md:w-[250px] shrink-0 mr-[60px] mb-[15px] md:mb-[0] w-full'>
              <h3 className="text-[18px] font-bold text-white">Collections</h3>
              <ul className="flex flex-row items-center md:items-start md:flex-col md:mb-0 gap-[20px]">
                <li className="mt-[15px] flex text-white dark:text-black hover:cursor-pointer">
                  <p className={selectedMedia == "" ? "w-full text-base font-medium md:mt-[20px] cursor-pointer bg-gradient-to-r from-purple-gd to-blue-gd bg-clip-text text-transparent" : "w-full text-base font-medium text-white md:mt-[20px] cursor-pointer"} onClick={() => { }}>All</p></li>
                {/* {
                  props.roomPage?.chanels?.map((item, index) =>
                    <li key={index} className="mt-[15px] flex"><a onClick={() => { }} className={item.media == selectedMedia ? "w-full text-base font-medium cursor-pointer bg-gradient-to-r from-purple-gd to-blue-gd bg-clip-text text-transparent" : "w-full text-base font-medium text-white cursor-pointer"} >
                      {item.media}
                    </a></li>
                  )} */}

              </ul>
            </nav>
            <div className="w-full h-[600px]">
              <ProductDetailItem product={props.product} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  </>);
};

export function ProductDetailItem({ product }) {

  return (
    <>
      <div className="flex font-serif bg-white rounded-sm">
        <div className="try-on-hub-image-src  flex-none w-[252px] h-[450px] relative">
          <img src={product?.productImageSrc}
            alt={product?.name}
            height={150}
            className="absolute inset-0 w-full h-full object-cover rounded-lg" loading="lazy" />
        </div>
        <form className="flex-auto p-6">
          <div className="flex flex-wrap items-baseline">
            <h1 className="w-full flex-none text-left mb-3 text-2xl leading-none text-slate-900">
              {product?.name}
            </h1>
            <div className="flex-auto text-lg font-medium text-slate-500">
              {product?.vendorName}
            </div>
            <div className="text-xs leading-6 font-medium uppercase text-slate-500">
              {product?.vendorGroup}
            </div>
          </div>
          <div className="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
            <div className="space-x-1 flex text-sm font-medium">
              <label>
                <input className="sr-only peer" type="radio" value="xs" defaultChecked={true} />
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-slate-500 peer-checked:bg-slate-100 peer-checked:text-slate-900">
                  XS
                </div>
              </label>
              <label>
                <input className="sr-only peer" type="radio" value="s" />
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-slate-500 peer-checked:bg-slate-100 peer-checked:text-slate-900">
                  S
                </div>
              </label>
              <label>
                <input className="sr-only peer" type="radio" value="m" />
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-slate-500 peer-checked:bg-slate-100 peer-checked:text-slate-900">
                  M
                </div>
              </label>
              <label>
                <input className="sr-only peer" type="radio" value="l" />
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-slate-500 peer-checked:bg-slate-100 peer-checked:text-slate-900">
                  L
                </div>
              </label>
              <label>
                <input className="sr-only peer" type="radio" value="xl" />
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-slate-500 peer-checked:bg-slate-100 peer-checked:text-slate-900">
                  XL
                </div>
              </label>
            </div>
          </div>
          <div className="flex space-x-4 mb-5 text-sm font-medium">
            <div className="flex-auto flex space-x-4 pr-4">
              <button className="flex-none w-1/2 h-12 uppercase font-medium tracking-wider bg-slate-900 text-white" type="submit">
                Add to cart
              </button>
              <button className="try-on-hub-btn-lg flex-none w-1/2 h-12 uppercase font-medium tracking-wider border border-slate-200 " type="button">
                Try It On
              </button>
            </div>
            <button className="flex-none flex items-center justify-center w-12 h-12 text-slate-300 border border-slate-200" type="button" aria-label="Like">
              <svg width="20" height="20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
              </svg>
            </button>
          </div>
          <p className="text-sm text-slate-500">
            {product.description}
          </p>
        </form>
      </div>
    </>

  );
}