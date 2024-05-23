
import { Button, Chip, Image as Image2, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Progress, Radio, RadioGroup, Spinner, Switch, cn } from '@nextui-org/react'
import { GetStaticProps } from 'next';
import Image from "next/image";
import { useRouter } from 'next/router'
import Script from 'next/script';
import { useCallback, useEffect, useRef, useState } from 'react';
import * as ImageJS from 'image-js'
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
import { BizAffiliateProduct, BizAffiliateProductCategory } from '~/components/biz/bizAffiliateProduct';
import { TypeAnimation } from 'react-type-animation';
import { TryOnViewModel, vtoService } from '~/services/VTOService';
import React from 'react';
import { getUpdateAuthenticateUser } from '../business-app';
import { imageKitService } from '~/services';
import { handleConfetti } from '../try-on-plugin';
import bodyPhotos from '~/components/bodyPhotos';
import MoreModel from '../more-model';
import GraphemeSplitter from 'grapheme-splitter'; // npm i grapheme-splitter


export const menu_commerce = [
 
  {
    label: "Clothes types",
    href: "/",
    children: [
      {
        label: "Upperbody",
        href: "/try-on-shop-category?g=UPPERBODY",

      },
      {
        label: "Dress",
        href: "/try-on-shop-category?g=DRESS",

      },
      {
        label: "Lowerbody",
        href: "/try-on-shop-category?g=LOWERBODY",

      }
    ]
  },
];
async function getProductDetail(id): Promise<BizAffiliateProduct> {
  const res = await fetch('https://api.tryonhub.ai/public/affiliate-products/getItem/' + id);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
async function getAllCategory(userid: string): Promise<BizAffiliateProductCategory[]> {
  const res = await vtoService.getAllCategories(userid ?? "000");
  if (res.status !== 200) {
    throw new Error('Failed to fetch data')
  }
  return res.data
}
async function getAllProviders(userid: string): Promise<any[]> {
  const res = await vtoService.getAllProvider(userid ?? "000");
  if (res.status !== 200) {
    throw new Error('Failed to fetch data')
  }
  return res.data
}
async function getAllProducts(bizId: string): Promise<BizAffiliateProduct[]> {
  const res = await fetch(`https://api.tryonhub.ai/public/affiliate-products/getTrends`);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

async function getAffiliateProducts(bizId: string): Promise<BizAffiliateProduct[]> {
  const res = await vtoService.getAffiliateProducts(bizId ?? "000");
  if (res.status !== 200) {
    throw new Error('Failed to fetch data')
  }
  return res.data
}


export default function Page(props) {
  const router = useRouter()

  const product: BizAffiliateProduct = props.product;


  return (<>
    <section className='bg-black/10'>
      <Head>
        <title>{product?.name}</title>
        <link
          rel="canonical"
          href={product?.images?.length ? product.images[0] : ""}
          key="canonical"
        />
        <meta
          name="description"
          content={"AI try on clothes " + product?.name + ', ' + " AI Mặc thử online  " + product?.name + ' ' + product?.desc}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "Product",
              "name": "AI try on clothes " + product?.name,
              "image": product?.images,
              "description": "AI try on clothes " + product?.name + ', ' + " AI Mặc thử online  " + product?.name + ' ' + product?.desc,
              "sku": product?.id,

              "brand": {
                "@type": "Brand",
                "name": product?.affiliateProvider
              },
              "review": {
                "@type": "Review",
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": 4,
                  "bestRating": 5
                },
                "author": {
                  "@type": "Person",
                  "name": "TryOnHub"
                }
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": 4.4,
                "reviewCount": 89
              },

            })
          }}
        />

      </Head>
      <NextSeo
        title={"Try-On " + product?.name}
        description={"AI try on clothes " + product?.name + ', ' + " AI Mặc thử online  " + product?.name + ' ' + product?.desc}
        canonical={product?.images?.length ? product.images[0] : ""}
        openGraph={{
          url: 'https://www.tryonhub.ai/affiliate-product/' + product?.id,
          title: "AI try on before by " + product?.name,
          description: "AI try on clothes " + product?.name + ', ' + " AI Mặc thử online  " + product?.name + ' ' + product?.desc,
          images: [
            {
              url: product?.images?.length ? product.images[0] : "",

              width: 800,
              height: 600,
              alt: 'Fashion Studio TryOnHub.AI',
              type: 'image/jpeg',
            },


          ],
          siteName: 'TryOnHub.AI',
        }}

      />
      <Container>
        <div className="relative z-0">
          {/* <Image priority={true} src={purpleGradient} width={200} height={200} className='absolute top-[-100px] right-[70px] z-0' alt={''} />
          <Image priority={true} src={polygon} width={900} height={900} className='absolute top-[-100px] right-[200px] z-0' alt={''} /> */}
        </div>
        {/* <Navbar settings={props.settings} launchAppEvent={() => { console.log("showLogin"); }} /> */}
      </Container>
    </section>

    <div
      style={{

        backgroundColor: 'white'
      }}
      className=""
    >
      <ProductPageContent {...props} />
    </div>

    {/* <Footer  /> */}
    <div className="relative opacity-70 z-0">

      {/* <Image src={polygonfooter} width={900} height={900} className='absolute bottom-0 left-[-260px] z-0' alt={''} />
      <Image src={vector} width={400} height={400} className='absolute bottom-[200px] right-[-400px] hidden md:block z-0' alt={''} /> */}
      <Script src="https://www.tryonhub.ai/tryonhub.min.js" />

    </div>
  </>);
}

export const getStaticProps: GetStaticProps = async ({ params, preview = false }) => {
  const settings = await getSettings();

  try {

    const product = await getProductDetail(params.slug);
    const categories = await getAllCategory("000");
     
    return {
      props: {
        product: { ...product },
        categories: categories,
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
  const allProducts = await getAffiliateProducts("000");
  return {
    paths:
      allProducts.map((page) => ({
        params: {
          slug: page.id,
        },
      })) || [],
    fallback: true,
  };
}

function ProductPageContent(props) {
  const [activeAI, setActiveAI] = useState(false);
  const [selectedClothes, setSelectedClothes] = useState('')
  const [selectedMedia, setSelectedMedia] = useState("")
  const [product, setProduct] = useState<BizAffiliateProduct>(props?.product)
  const [categories, setCategories] = useState<BizAffiliateProductCategory[]>([]);

  React.useEffect(() => {
    let currentUser: UserEntity = props?.currentUser ?? getUpdateAuthenticateUser({});
    console.log("Reload data")
    getAllCategory(currentUser.bizId)
      .then((data) => {
        setCategories(data)
        const c_menu_array = Array.from(data);
        c_menu_array.forEach(element => {
          menu_commerce.push({
            label: element.label,
            href: "/try-on-shop-category?c=" + element.label,
            children: null
          })
        });
      });
  }, [props?.currentUser])

  return (

    <div>

      <section className='bg-black/10' style={{ backgroundColor: "black !important", opacity: 50 }}>
        <Container>
          <div className="relative ">
            <Image priority={true} src={purpleGradient} width={200} height={200} className='absolute top-[-100px] right-[70px]' alt={''} />
            {/* <Image priority={true} src={polygon} width={900} height={900} className='absolute top-[-100px] right-[200px]' alt={''} /> */}
          </div>
          <Navbar isHomepage={false} menu={menu_commerce} settings={props.settings} launchAppEvent={() => { }} hasSearch={true} />
        </Container>
      </section>

      <ProductDetailItem product={product} />

      <section className='bg-black/10' style={{ backgroundColor: "black !important", opacity: 20 }}>
        <Footer />
      </section>

      <div className="relative opacity-70 z-0">

        {/* <Image src={polygonfooter} width={900} height={900} className='absolute bottom-0 left-[-260px]' alt={''} />
        <Image src={vector} width={400} height={400} className='absolute bottom-[200px] right-[-400px] hidden md:block' alt={''} /> */}
      </div>
      {/* <Script src="http://localhost:3000/tryonhub.min.js" /> */}
      <Script src="https://www.tryonhub.ai/tryonhub.min.js" />
    </div>


  );
};

var IsUploading = false;
var HumanSrcUrl = 'https://ik.imagekit.io/tryonhub/anonymous-Ch_C3_A2n_20v_C3_A1y_20midi_20in_20hoa_20-_20S0132-0_JV7fuAi46.png';
export function ProductWithTryOn({ product }) {
  const [isDefaultImage, setIsDefaultImage] = useState(true);
  const [isUploadingHuman, setIsUploadingHuman] = useState(false);
  const [isLoadingProperty, setIsLoadingProperty] = useState(false);
  const [isLoadingTryOn, setIsLoadingTryOn] = useState(false);
  const [defaultHumanUrl, setDefaultHumanUrl] = useState(HumanSrcUrl)
  const [humanUrl, setHumanUrl] = useState<string>()
  const fileInputRef = useRef<any>();
  const [counter, setCounter] = useState(0);
  const [startDate, setStartDate] = useState(0);
  const [totalTimming, setTotalTimming] = useState(0);
  const [isLoading, setIsLoading] = useState(false)
  const _product: BizAffiliateProduct = (product as BizAffiliateProduct);
  const _productImage = (_product?.images.length > 0 ? _product.images[0] : null)
  const [predictedUrls, setPredictedUrls] = useState<string[]>()
  const [predictedHDUrls, setPredictedHDUrls] = useState<string[]>();
  const [isPickModels, setIsPickModels] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    const exitingFunction = () => {
      console.log("exiting...");
      if (isLoadingTryOn) alert("AI is rendering. please wait a seconds. Continue?")
    };

    router.events.on("routeChangeStart", exitingFunction);

    return () => {

      router.events.off("routeChangeStart", exitingFunction);
    };
  });

  useEffect(() => {
    if (window.localStorage) {
      const _humanUrl = localStorage.getItem("human-url")
      if (_humanUrl) {
        HumanSrcUrl = _humanUrl;
        setHumanUrl(_humanUrl);
        setDefaultHumanUrl(_humanUrl);
        setIsDefaultImage(false);
        generateVtoRest();
      } else {
        setIsDefaultImage(true);
        generateVtoRest();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const uploadTrigger = () => {
    fileInputRef?.current.click()
  }

  // upload clothes photo
  const handleHumanImageUpload = useCallback(
    async (event: any) => {
      const file = event.target.files[0]
      if (file) {
        setIsUploadingHuman(true);
        setIsLoadingProperty(true);
        const imageUrl = URL.createObjectURL(file)
        const img = await ImageJS.Image.load(imageUrl)
        IsUploading = true;
        imageKitService
          .upload({ file: img.toDataURL(), fileName: 'clothes.jpg' })
          .then((uploaded) => {
            console.log("uploaded done")
            IsUploading = false;
            HumanSrcUrl = uploaded.url;
            localStorage.setItem("human-url", uploaded.url)
            setHumanUrl(uploaded.url);
            setDefaultHumanUrl(uploaded.url);
            setIsDefaultImage(false);
            setIsUploadingHuman(false)
            setIsLoadingProperty(false);
            generateVtoRest()
          })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const ensureCallAPIVTO = useCallback(async (timeout = 200000) => {
    var start = Date.now();
    setStartDate(start);
    return new Promise(waitForUploadedAllImages); // set the promise object within the waitForUploadedAllImages object
    function waitForUploadedAllImages(resolve, reject) {

      if (!IsUploading && HumanSrcUrl) {
        setCounter((v) => (v <= 10 ? 10 : v + 1));
        resolve(isUploadingHuman);
      }

      else if (timeout && (Date.now() - start) >= timeout) {
        setCounter(0);
        reject(new Error("timeout"));
      }
      else {
        setCounter((v) => (v >= 100 ? 0 : v + 1));
        setTimeout(waitForUploadedAllImages.bind(this, resolve, reject), 300);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUploadingHuman, humanUrl])

  const generateVtoRest = useCallback(async () => {
    setIsLoading(true)
    setStartDate(Date.now())
    setIsLoadingTryOn(true);
    console.log("generateVtoRest")

    const interval = setInterval(() => {
      setCounter((v) => ((v >= 90) ? 10 : v + 1));
    }, 1200);

    ensureCallAPIVTO().then(async function () {
      if (!HumanSrcUrl || !_productImage) {
        alert('Invalid params! Missing required input.')
        return;
      }
      console.log("uploadSrcHumanClothRestV2")
      await vtoService.uploadSrcHumanClothRestV2(new TryOnViewModel({
        clothesImageSrc: _productImage,
        humanBodyImageSrc: HumanSrcUrl,
        clothesType: _product?.groupType,
        productId: _product?.id
      })).then((res) => {
        console.log(res)
        setCounter((v) => (100));
        setIsLoadingTryOn(false);
        var info = res.data?.data.data.info;
        var origin = res.data?.origin;
        let _predictedUrls = []
        let _predictedHDUrls = []
        if (info["url-image"] instanceof Array) {
          if (info["url-image-hd"] instanceof Array) {
            info["url-image-hd"].forEach(imageUrl => {
              _predictedHDUrls.push(imageUrl);
            });
          }

          if (info["url-image"] instanceof Array) {
            info["url-image"].forEach(imageUrl => {
              _predictedUrls.push(imageUrl);
            });
          }
        } else {
          _predictedUrls.push(info["url-image"]);
        }

        setPredictedUrls(_predictedUrls)
        setPredictedHDUrls(_predictedHDUrls)
        handleConfetti()
      }).catch((error) => {
        alert('Xin lỗi. Hệ thống chúng tôi gặp sự cố quá tải. Xin vui lòng thử lại sau...');
        setCounter((v) => (0));

      }).finally(() => {
        const time = (Date.now() - startDate) / 1000;
        setTotalTimming(time);
        setIsLoading(false)

        clearInterval(interval);
      })
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, ensureCallAPIVTO])

  const modelsPreview = [
    bodyPhotos[0],
    bodyPhotos[1],
  ];

  return (
    <div className='w-full'>
      <div
        className="flex flex-col relative overflow-hidden height-auto text-foreground box-border outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-medium rounded-large transition-transform-background motion-reduce:transition-none border-transparent bg-default-400/10 backdrop-blur-lg backdrop-saturate-[1.8]"
        tabIndex={-1}
      >
        <div className="flex p-2 z-10 w-full justify-start items-center shrink-0 overflow-inherit color-inherit subpixel-antialiased rounded-t-large gap-2 pb-0">
          <div className="flex justify-center p-2 rounded-full items-center bg-secondary-100/80 text-pink-500">
            <svg
              aria-hidden="true"
              fill="none"
              focusable="false"
              height={12}
              role="presentation"
              viewBox="0 0 12 12"
              width={12}
              className="text-pink-500"
            >
              <path
                d="M3.5 20.5c.83.83 2.17.83 3 0l13-13c.83-.83.83-2.17 0-3-.83-.83-2.17-.83-3 0l-13 13c-.83.83-.83 2.17 0 3ZM18.01 8.99l-3-3"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
              <path
                d="M8.5 2.44 10 2l-.44 1.5L10 5l-1.5-.44L7 5l.44-1.5L7 2l1.5.44ZM4.5 8.44 6 8l-.44 1.5L6 11l-1.5-.44L3 11l.44-1.5L3 8l1.5.44ZM19.5 13.44 21 13l-.44 1.5L21 16l-1.5-.44L18 16l.44-1.5L18 13l1.5.44Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="text-sm font-semibold">Note for you</p>
        </div>
        <div className="relative flex w-full p-3 flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased">
          <p className="font-normal text-xs text-default-500">
            Choose to upload your full body image or choose from our available matching models.
          </p>
        </div>
      </div>
      <div
        className=" mt-12 flex flex-col relative overflow-hidden height-auto text-foreground box-border outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-medium rounded-large transition-transform-background motion-reduce:transition-none border-transparent bg-default-400/10 backdrop-blur-lg backdrop-saturate-[1.8]"
        tabIndex={-1}
      >
        <div className='w-full flex'>
          <div
            className="flex flex-col relative overflow-hidden height-auto text-foreground box-border  outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-medium rounded-large transition-transform-background motion-reduce:transition-none w-full "
            tabIndex={-1}
          >

            <div className="relative  w-full flex-auto place-content-inherit align-items-inherit break-words text-left overflow-y-auto subpixel-antialiased flex flex-row flex-wrap p-0 sm:flex-nowrap">

              <div style={{
                padding: "10px ",
                height: "680px"
              }} className='lg:w-3/5 w-full  relative'>

                {
                  predictedUrls?.length > 0 ? (<img
                    style={{
                      height: "550px",
                      width: "550px",
                      borderRadius: "0.75rem",
                      objectFit: "contain"
                    }}
                    src={predictedUrls[0]}
                    className="absolute  items-center rounded-full rounded-lg z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300  w-full flex-none object-cover object-top"
                    alt="Placeholder "
                    height={"550px"}

                    width={"auto"}
                    data-loaded="true"
                  />) : (<img
                    style={{
                      height: "550px",
                      width: "550px",
                      borderRadius: "0.75rem",
                      objectFit: "contain"
                    }}
                    src={humanUrl ?? defaultHumanUrl}
                    className="absolute  items-center rounded-full rounded-lg z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300  w-full flex-none object-cover object-top"
                    alt="Placeholder "
                    height={"550px"}

                    width={"auto"}
                    data-loaded="true"
                  />)
                }

                {
                  !isLoadingTryOn && (
                    <div className='absolute bottom-0 w-full h-32 flex items-end'>
                      <hr className='mt-14 ' />

                      <button
                        disabled={isLoadingTryOn}
                        onClick={uploadTrigger}
                        className=" w-full items-center mx-12 mt-0 py-4 rounded font-medium  mb-8"
                        style={{
                          color: "#fff",
                          backgroundColor: "#000",
                          fontSize: "1rem",
                          opacity: isLoadingTryOn ? "10" : "100"
                        }}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleHumanImageUpload}
                          ref={fileInputRef}
                        />
                        <span className='flex w-full items-center justify-center' > {"Upload your photo "} {"  "} &nbsp;<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" />
                        </svg>
                        </span>
                      </button>
                    </div>
                  )
                }

                {
                  (!isDefaultImage && isLoadingProperty) && (<div style={{
                    height: "552px",
                    borderRadius: "0.75rem"
                  }} className='absolute  fingerprint scanning '> </div>)
                }

                {
                  (isLoadingTryOn) && (<div style={{
                    height: "552px",
                    borderRadius: "0.75rem"
                  }} className='absolute  fingerprint scanning2 '> </div>)
                }

              </div>
              <div className="px-8 py-5 lg:w-2/3 w-full">
                <h3 className="text-large font-medium">Body parameters:</h3>

                {
                  isLoadingProperty && (
                    <div style={{ height: "500px", padding: "15% 0px 0px 15px" }} className='items-center justify-center'>
                      <Spinner label="Analyzing your body..." color="warning" />
                    </div>
                  )
                }

                {
                  isLoadingTryOn && (
                    <div style={{ height: "500px", padding: "15% 0px 0px 15px" }} className='items-center justify-center'>
                      <Progress
                        aria-label={totalTimming + "seconds"}
                        size="md"
                        label="AI is trying on...."
                        value={counter}
                        color="secondary"
                        showValueLabel={true}
                        className="max-w-md"
                      />
                    </div>
                  )
                }

                {
                  (!isLoadingProperty && !isLoadingTryOn && predictedUrls?.length) && (
                    <div className="mb-2 mt-4 text-sm">
                      <RadioGroup label="Body Size:" description="*Size expected" defaultChecked={true} defaultValue="S">
                        <CustomRadio checked={true} description="34x30 inches" value="XS">
                          XS
                        </CustomRadio>
                        <CustomRadio description="36x32 inches" value="S" >
                          S
                        </CustomRadio>
                        <CustomRadio description="38x34 inches" value="M">
                          M
                        </CustomRadio>
                        <CustomRadio description="40x36 inches" value="L">
                          L
                        </CustomRadio>
                        <CustomRadio description="40x38 inches" value="XL">
                          XL
                        </CustomRadio>
                      </RadioGroup>
                      <div className="max-w-fit"><h3 className="text-medium font-medium leading-8 text-default-600">Skin</h3>
                        <div className="relative flex flex-col gap-2 mt-2" aria-label="Skin" role="radiogroup" aria-orientation="horizontal" id="react-aria695254936-:r0:">
                          <div className="flex flex-col flex-wrap data-[orientation=horizontal]:flex-row gap-2" role="presentation" data-orientation="horizontal">
                            <label className="group relative max-w-fit inline-flex items-center justify-start cursor-pointer tap-highlight-transparent p-2 -m-2" >
                              <div style={{ border: "0px", clip: "rect(0px, 0px, 0px, 0px)", clipPath: "inset(50%)", height: "1px", margin: "-1px", overflow: "hidden", padding: "0px", position: "absolute", width: "1px", whiteSpace: "nowrap" }}>
                                <input type="radio" value="gray" /></div>
                              <span className="pointer-events-none h-8 w-8 rounded-full border border-black border-opacity-10 transition-transform group-data-[pressed=true]:scale-90"
                                style={{ backgroundColor: "white" }}>
                              </span>
                            </label>

                            <label className="group relative max-w-fit inline-flex items-center justify-start cursor-pointer tap-highlight-transparent p-2 -m-2" >
                              <div style={{ border: "0px", clip: "rect(0px, 0px, 0px, 0px)", clipPath: "inset(50%)", height: "1px", margin: "-1px", overflow: "hidden", padding: "0px", position: "absolute", width: "1px", whiteSpace: "nowrap" }}>
                                <input type="radio" value="gray" /></div>
                              <span className="pointer-events-none h-8 w-8 rounded-full border border-black border-opacity-10 transition-transform group-data-[pressed=true]:scale-90"
                                style={{ backgroundColor: "whitesmoke" }}>
                              </span>
                            </label>
                          </div></div></div>
                      <div className="max-w-fit" onClick={() => setIsPickModels(!isPickModels)}>

                      </div>
                    </div>)
                }

                {
                  (isDefaultImage) && (
                    <div className="mb-2 mt-4">

                      <div className="w-full"><h3 className="text-medium font-medium leading-8 text-default-600">Or pick a model:</h3>

                        <div className="relative model-images flex mb-[25px]">
                          {
                            modelsPreview && modelsPreview.map((model, index) => (
                              <div
                                key={index}
                                onClick={() => { console.log(model?.url) }}
                                className="model-image cursor-pointer flex flex-col items-center p-[4px] rounded mr-[10px]">
                                <Image2 src={model.url} width={30} height={40} alt={model.name} className="rounded" />
                                {/* <p className="text-[14px] font-bold mt-[5px]">{item.name}</p> */}
                              </div>))
                          }
                          <button onClick={() => { setIsPickModels(!isPickModels) }} className="more-model z-50 absolute right-[-2px] top-[4px] rounded-full bg-[#afafaf] text-white w-[120px] h-[40px] flex items-center justify-center">
                            <span className="text-xs">{isPickModels ? "Đóng" : "Xem thêm"}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                          </button>
                        </div>

                      </div>

                    </div>)
                }

                {
                  isPickModels && (<MoreModelModal
                    onClose={() => { setIsPickModels(!isPickModels) }}

                    onSelectedModel={(item) => {
                      const url = (item.url as string).startsWith("http") ? item.url : ("https://www.tryonhub.ai" + item.url)
                      console.log(item); setHumanUrl(url);
                      setPredictedUrls([])
                      setPredictedHDUrls([])
                      setIsPickModels(!isPickModels);
                      setDefaultHumanUrl(url);
                      HumanSrcUrl = url;
                      generateVtoRest();
                    }} />)
                }

                {(isDefaultImage && !isLoadingProperty && !isLoadingTryOn && !predictedUrls?.length) && (

                  <div className="flex flex-col gap-3 pt-2 text-small text-default-400">
                    <hr className='mt-14 ' />

                    {/* <button
                      disabled={!isDefaultImage}
                      onClick={() => { }}
                      className=" w-full items-center px-8 mt-0 py-4 rounded font-medium mr-2 mb-8"
                      style={{
                        color: "#fff",
                        backgroundColor: "#000",
                        fontSize: "1rem",
                        opacity: !isDefaultImage ? "10" : "100"
                      }}
                    >
                      <span className='flex w-full items-center justify-center' >Mặc thử  {"  "} &nbsp;
                       
                      </span>
                    </button> */}
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export function ProductDetailItem({ product }) {

  const [categories, setCategories] = useState<BizAffiliateProductCategory[]>([]);
  const [allProducts, setAllProducts] = useState<BizAffiliateProduct[]>();


  React.useEffect(() => {

    getAllProducts("000")
      .then((data) => {
        setAllProducts(data)
      });
  }, []);
  return (

    <div className="pl-6 md:px-6 mx-auto xl:container full py-12">
      <div className="flex gap-20 lg:flex-row flex-col-reverse ">
        <div className="lg:w-4/6 w-full pr-6 md:pr-6">

          <ProductWithTryOn product={product} />

          <div className="mt-20">
            <details
              className="border-t border-[#dfdfdf] mt-20 hover:bg-[#fefefe] frntr-accordination"

            >
              <summary className="font-bold text-2xl py-10 flex items-center justify-between w-full">
                <span>Product spec</span>
                <img
                  src="/build/_assets/arrow-VBAUMBND.svg"
                  alt="Arrow"
                  className="frntr-accordination-arrow w-[20px] h-[20px] mr-4"
                />


              </summary>
              <div className="rounded-md h-auto -mt-4 mb-10">
                <div>
                  <div className="flex justify-between py-4 px-2 odd:bg-[#efefef]">
                    <p className="font-semibold text-md">Origin</p>
                    <p className="text-md">China</p>
                  </div>
                  <div className="flex justify-between py-4 px-2 odd:bg-[#efefef]">
                    <p className="font-semibold text-md">Latin Name</p>
                    <p className="text-md">Pilea peperomioides</p>
                  </div>
                  <div className="flex justify-between py-4 px-2 odd:bg-[#efefef]">
                    <p className="font-semibold text-md">Sunlight</p>
                    <p className="text-md">Medium to bright indirect</p>
                  </div>
                  <div className="flex justify-between py-4 px-2 odd:bg-[#efefef]">
                    <p className="font-semibold text-md">Water</p>
                    <p className="text-md">Dry out between waterings</p>
                  </div>
                  <div className="flex justify-between py-4 px-2 odd:bg-[#efefef]">
                    <p className="font-semibold text-md">Temperature</p>
                    <p className="text-md">18-24C (65-75 F)</p>
                  </div>
                  <div className="flex justify-between py-4 px-2 odd:bg-[#efefef]">
                    <p className="font-semibold text-md">Toxicity</p>
                    <p className="text-md">Non-toxic</p>
                  </div>
                </div>
              </div>
            </details>
            <div className="text-md font-normal"

              dangerouslySetInnerHTML={{
                __html: product?.desc
              }}>

            </div>
          </div>
        </div>
        <div className="lg:w-2/6 w-full">
          <div className="flex flex-col gap-2 sticky top-16 pb-10">
            <div className="line-through font-semibold pt-1 text-sm">
              <Chip color="default">  {product?.groupType}</Chip>
              <Chip color="default" variant="bordered"> {product?.affiliateProvider}</Chip>

            </div>
            <div className="pr-6 md:pr-6">
              <h1 className="font-bold text-xl lg:text-4xl mb-2">{product?.name}</h1>

            </div>
            <div />
            <div className="">
              <div>
                <div className="flex flex-wrap  flex-col">

                  {product?.priceText &&
                    (<div className="line-through font-semibold pt-1 text-sm">
                      <span className="crystallize-price ">   {product?.priceText} $</span>
                    </div>)
                  }
                </div>
              </div>
              <div className="flex gap-1 mt-4 flex-col sm:flex-row">


                {product?.affiliateUrl && (
                  <a
                    className="z-0 text-white group inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap subpixel-antialiased tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 border-medium px-4 min-w-20 h-10 gap-2 rounded-medium [&>svg]:max-w-[theme(spacing.8)] data-[pressed=true]:scale-[0.97] transition-transform-colors-opacity motion-reduce:transition-none border-default text-foreground data-[hover=true]:opacity-hover relative overflow-hidden bg-transparent text-sm font-normal"
                    role="button"
                    tabIndex={0}
                    style={{
                      border: "solid 2px transparent",
                      backgroundImage:
                        "linear-gradient(#050713, #050713), linear-gradient(to right, #F54180, #338EF7)",
                      backgroundOrigin: "border-box",
                      backgroundClip: "padding-box, border-box"
                    }}
                    target='_blank'
                    href={product?.affiliateUrl}
                  >
                    Buy it from {product.affiliateProvider}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      aria-hidden="true"
                      role="img"
                      className="outline-none transition-transform group-data-[hover=true]:translate-x-0.5 [&>path]:stroke-[2.5px]"
                      focusable="false"
                      tabIndex={-1}
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M4 12h16m0 0l-6-6m6 6l-6 6"
                      />
                    </svg>
                  </a>
                )}

              </div>
            </div>
            <div className="bg-[#dfdfdf] h-[1px] mt-5" />
            <div>
              <div className="flex pt-2 items-center gap-2 justify-between">

                <div className="img-container overflow-hidden rounded-md">
                  <div className="frntr-img-gallery ">
                    <div className="portrait frntr-img">
                      <img
                        style={{
                          width: "auto",
                          height: "450px"
                        }}
                        src={product?.images?.length ? product.images[0] : ''}
                        alt=""
                        width={"350px"}
                        height={"450px"}
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>

              </div>
              <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                  <a href="/en/promotions/3-for-2">
                    <div className="rounded-md bg-[#efefef] border border-[transparent] hover:border-[#000] px-3 py-1">
                      <p className="text-xs font-bold">S</p>
                    </div>
                  </a>
                  <a href="/en/promotions/3-for-2">
                    <div className="rounded-md bg-[#efefef] border border-[transparent] hover:border-[#000] px-3 py-1">
                      <p className="text-xs font-bold">M</p>
                    </div>
                  </a>
                  <a href="/en/promotions/4-for-3">
                    <div className="rounded-md bg-[#efefef] border border-[transparent] hover:border-[#000] px-3 py-1">
                      <p className="text-xs font-bold">L</p>
                    </div>
                  </a>
                  <a href="/en/promotions/4-for-3">
                    <div className="rounded-md bg-[#efefef] border border-[transparent] hover:border-[#000] px-3 py-1">
                      <p className="text-xs font-bold">XL</p>
                    </div>
                  </a>
                </div>
              </div>
              <button className="text-[#000] font-regular text-xs ml-7 mt-1 opacity-[0.6] hover:opacity-[1] underline">
                Show more availability options (2)
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full border-t border-[#dfdfdf] pr-6 sm:pr-0">
        <h2 className="font-bold mt-20 mb-4 text-xl">
          Recommends for you
        </h2>
        <div className="grid gap-5 grid-cols-2 grid md:grid-cols-4 lg:grid-cols-5 pb-5">

          {(allProducts as BizAffiliateProduct[])?.map((item, index) => (
            <a
              key={index}
              data-testid="product-link"
              className="grid grid-rows-[1fr_minmax(25px_50px)_40px] place-items-stretch w-full min-h-full justify-stretch items-stretch relative product-link"
              href={"/affiliate-product/" + item.id}
            >
              <div className="img-container img-contain img-border border-solid border border-[#dfdfdf] aspect-[3/4] bg-[#fff] rounded-md h-full overflow-hidden grow-1">

                <img
                  src={item?.images?.length ? item.images[0] : ''}
                  alt="Monstera Minima"
                  width={1024}
                  height={1280}
                  loading="lazy"
                />

              </div>
              <div className="pl-1">
                <p className="text-md line-clamp-2 overflow-hidden">
                  {item.name}
                </p>
              </div>
              <div className="pl-1">
                <div>
                  <div className="">
                    <span className="crystallize-price text-md font-semibold">
                      {item.price}
                    </span>
                  </div>
                </div>
              </div>
            </a>))}

        </div>
      </div>
    </div>



  );
}


export const MoreModelModal = (props, isOpen) => {


  return (
    <Modal size='5xl' backdrop={"blur"} isOpen={isOpen} onClose={props.onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Chọn một người mẫu</ModalHeader>
            <ModalBody>
              <div className='h-[60vh] overflow-scroll'>
                <MoreModel onSelectedModel={props.onSelectedModel} />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose}>
                Action
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export const CustomRadio = (props, checked) => {
  const { children, ...otherProps } = props;

  return (
    <Radio
      checked={checked}
      {...otherProps}
      classNames={{
        base: cn(
          "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
          "flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-2 border-2 border-transparent",
          "data-[selected=true]:border-primary text-sm"
        ),
      }}
    >
      {children}
    </Radio>
  );
};