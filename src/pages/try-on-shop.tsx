import { CircularProgress, Input, Switch } from '@nextui-org/react'
import Image from "next/image";
import Script from 'next/script';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import * as ImageJS from 'image-js'
import Container from '~/components/Container'
import Footer from '~/components/footer'
import Navbar, { SearchIcon } from '~/components/navbar'
import { Product } from '~/components/Product';
import { clothesDataset } from '~/components/staticData';
import { getFilteredProducts, getSettings } from '~/lib/client'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { getRoomPage, } from '~/lib/sanity.queries'

import polygon from "../assets/background-images/polygon.svg"
import polygonfooter from "../assets/background-images/polygon-footer.svg"
import purpleGradient from "../assets/background-images/purple-gradient.svg"
import vector from "../assets/background-images/vector.svg"
import LoginApp from './LoginApp'
import TryonApp from './TryonApp';
import { TryOnViewModel, vtoService } from '~/services/VTOService';
import { BizCollection } from '~/components/biz/bizCollections';
import { BizAffiliateProductCategory, BizAffiliateProduct } from '~/components/biz/bizAffiliateProduct';
import React from 'react';
import { getUpdateAuthenticateUser } from './business-app';
import NavbarCommerce from '~/components/navbar-commerce';
import { imageKitService } from '~/services';
import { SliderProduct } from '~/components/sliderProduct';
import { SliderImageSM } from '~/components/SliderImageSM';
import CrawlingPopup from './CrawlingPopup';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import { MoreModelModal } from './affiliate-product/[slug]';


async function getAllCollections(userid: string): Promise<BizCollection[]> {
  const res = await vtoService.getAllCollections(userid);
  if (res.status !== 200) {
    throw new Error('Failed to fetch data')
  }
  return res.data
}

export const getStaticProps = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const roomPage = await getRoomPage(client);
  const settings = await getSettings();
  // const products = await getAffliateProducts();
  const collections = await getAllCollections("000");
  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      roomPage: roomPage[0],
      // products: products,
      settings: settings,
      collections: collections
    },
  }
}

async function getAllCategory(userid: string): Promise<BizAffiliateProductCategory[]> {
  const res = await vtoService.getAllCategories(userid ?? "000");
  if (res.status !== 200) {
    throw new Error('Failed to fetch data')
  }
  return res.data
}

async function getTrendingProducts(userid: string): Promise<BizAffiliateProduct[]> {
  const res = await vtoService.getTrendingProducts(userid ?? "000");
  if (res.status !== 200) {
    throw new Error('Failed to fetch data')
  }
  return res.data
}

async function getByStatusProducts(status: string): Promise<BizAffiliateProduct[]> {
  const res = await vtoService.getByStatusProducts(status);
  if (res.status !== 200) {
    throw new Error('Failed to fetch data')
  }
  return res.data
}

async function getAIRecommendingProducts(human_url: string): Promise<BizAffiliateProduct[]> {
  const res = await vtoService.getAIRecommendingProducts(human_url);
  if (res.status == 201) {

    return res.data
  }
  return res.data
}

async function getLastTryProducts(human_url: string): Promise<BizAffiliateProduct[]> {
  const res = await vtoService.getLastTryProducts(human_url);
  if (res.status == 201) {

    return res.data
  }
  return res.data
}




let temp_menu_commerce = [
 
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

export default function TryBeforeBuy(props) {
  const [appMode, setAppMode] = useState('');
  const [launchApp, setlaunchApp] = useState(false);

  // console.log("props.collections")
  // console.log(props.collections)
  const [categories, setCategories] = useState<BizAffiliateProductCategory[]>([]);
  const [allSpecificProducts, setAllSpecificProducts] = useState<BizAffiliateProduct[]>();
  const [allTrendProducts, setAllTrendProducts] = useState<BizAffiliateProduct[]>();
  const [allSaleOffProducts, setAllSaleOffProducts] = useState<BizAffiliateProduct[]>();

  const [allDressProducts, setAllDressTrendProducts] = useState<BizAffiliateProduct[]>();
  const [allUpperBodyProducts, setAllUpperBodyProducts] = useState<BizAffiliateProduct[]>();
  const [allLowerBodyProducts, setAllLowerBodyProducts] = useState<BizAffiliateProduct[]>();
  const [menuCommerce, setMenuCommerce] = useState([]);

  React.useEffect(() => {
    let currentUser: UserEntity = props?.currentUser ?? getUpdateAuthenticateUser({});
    console.log("Reload data")
    getAllCategory(currentUser.bizId)
      .then((data) => {
        setCategories(data)
        const c_menu_array = Array.from(data);
        let menu_commerce = temp_menu_commerce;
        c_menu_array.forEach(element => {
          menu_commerce.push({
            label: element.label,
            href: "/try-on-shop-category?c=" + element.label,
            children: null
          })
        });
        setMenuCommerce([...menu_commerce]);
      });
    getByStatusProducts("NEW")
      .then((data) => {
        setAllTrendProducts(data)
      });
    getByStatusProducts("SALE-OFF")
      .then((data) => {
        setAllSaleOffProducts(data)
      });
    getLastTryProducts(HumanSrcUrl)
      .then((data) => {
        setAllSpecificProducts(data)
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [HumanSrcUrl]);

  return (
    <div style={{ zoom: "90%" }} >
      <Head>
        <title>Try Before Buy with TryOnHub.AI</title>
        <meta name="description" content='TRYING AMAZON DRESSES, TRYING AMAZON Jean, TRYING AMAZON T-shirt AI thử mặc thời trang, Bikini try on, Try on dress, wedding dress try on, try before you buy, try on clothes at home, try on clothes online' key="desc" />
        <meta property="og:title" content="Trying on Amazone dress before you buy with TryOnHub.AI" />
        <meta
          property="og:description"
          content="AI Try on dress, try on clothes at home, try before you buy, at home try on, wedding dress try on, try before you buy clothes, virtual try on clothes, try before you buy clothing online, virtual dress try on"
        />
        <meta
          property="og:image"
          content="https://tryonhub.ai/animates/H_2.png"
        />
      </Head>
      <NextSeo
        title="TryOn clothing at home with TryOnHub.AI"
        description='TRYING AMAZON DRESSES, TRYING AMAZON Jean, TRYING AMAZON T-shirt AI thử mặc thời trang, Bikini try on, Try on dress, wedding dress try on, try before you buy, try on clothes at home, try on clothes online'
        canonical="https://www.tryonhub.ai/try-on-shop"
        openGraph={{
          url: 'https://www.tryonhub.ai/try-on-shop',
          title: "TryOn clothes with TryOnHub.AI",
          description: 'TryOnHub.AI, AI thử mặc thời trang, Bikini try on, Try on dress, wedding dress try on, try before you buy, try on clothes at home, try on clothes online',
          images: [
            {
              url: 'https://tryonhub.ai/animates/H_2.png',
              width: 800,
              height: 600,
              alt: 'Try On Before buy online by TryOnHub.AI',
              type: 'image/jpeg',
            },
            {
              url: 'https://tryonhub.ai/animates/O_2.png',
              width: 800,
              height: 600,
              alt: 'Try On Before buy online by TryOnHub.AI',
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
      <section className='bg-black' style={{ backgroundColor: "black !important", opacity: 50 }}>
        <Container>
          {/* <div className="relative ">
            <Image priority={true} src={purpleGradient} width={200} height={200} className='absolute top-[-100px] right-[70px]' alt={''} />
            <Image priority={true} src={polygon} width={900} height={900} className='absolute top-[-100px] right-[200px]' alt={''} />
          </div> */}
          <Navbar isHomepage={false} menu={menuCommerce} settings={props.settings} launchAppEvent={() => { }} hasSearch={true} />
        </Container>
      </section>

      <RoomPageContent
        props={props}
        categories={categories}
        trendingProducts={allTrendProducts}
        allSpecificProducts={allSpecificProducts}
        allSaleOffProducts={allSaleOffProducts}

      // dressProducts={allDressProducts}
      // upperbodyProducts={allUpperBodyProducts}
      // lowerbodyProducts={allLowerBodyProducts}
      />

      <Footer />



      <div className="relative opacity-70 z-0">

        {/* <Image src={polygonfooter} width={900} height={900} className='absolute bottom-0 left-[-260px]' alt={''} />
        <Image src={vector} width={400} height={400} className='absolute bottom-[200px] right-[-400px] hidden md:block' alt={''} /> */}
      </div>
      {/* <Script src="http://localhost:3000/tryonhub.min.js" /> */}
      <Script src="https://www.tryonhub.ai/tryonhub.min.js" />

    </div>
  )
}


var IsUploading = false;
var IsTryingOn = false;
var TryingOnIndex = 0;
var HumanSrcUrl = 'https://ik.imagekit.io/tryonhub/1715071847674human_0hSPtC3uG.jpg';
var ClotheSrcUrl = '';
function RoomPageContent(props) {
  const [activeAI, setActiveAI] = useState(false);
  const [selectedClothes, setSelectedClothes] = useState('')
  const [selectedMedia, setSelectedMedia] = useState("")
  const [launchApp, setlaunchApp] = useState(false);
  const [crawlingApp, setCrawlingApp] = useState(false);
  const [collections, setCollections] = useState<BizCollection[]>(props.collections)
  const [suggestImages, setSuggestImages] = useState<string[]>([HumanSrcUrl])
  const [isDefaultImage, setIsDefaultImage] = useState(true);
  const [isUploadingHuman, setIsUploadingHuman] = useState(false);
  const [isUploadingClothes, setIsUploadingClothes] = useState(false);
  const [isLoadingProperty, setIsLoadingProperty] = useState(false);
  const [isLoadingTryOn, setIsLoadingTryOn] = useState(false);
  const [defaultHumanUrl, setDefaultHumanUrl] = useState(HumanSrcUrl)
  const [humanUrl, setHumanUrl] = useState<string>(HumanSrcUrl);
  const fileInputRef = useRef<any>();
  const fileInputRef2 = useRef<any>();

  const [recommendProducts, setRecommendProducts] = useState<BizAffiliateProduct[]>(props.allRecommendProducts ?? []);
  const [isPickModels, setIsPickModels] = useState<boolean>(false);
  const [isCrawling, setIsCrawling] = useState(false);
  const [crawlingUrl, setCrawlingUrl] = useState("");
  const [crawlingProduct, setCrawlingProduct] = useState<BizAffiliateProduct>();
  useEffect(() => {
    if (window.localStorage) {
      const _humanUrl = localStorage.getItem("human-url")
      if (_humanUrl) {
        HumanSrcUrl = _humanUrl;
        setHumanUrl(_humanUrl);
        setDefaultHumanUrl(_humanUrl);
        setIsDefaultImage(false);
        let temp: string[] = []
        temp.push(_humanUrl);
        setSuggestImages([...temp]);
      } else {
        setIsDefaultImage(true);
      }
    }

    getAIRecommendingProducts(HumanSrcUrl)
      .then((data) => {
        setRecommendProducts(data)
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("re play try on")
    playAutoSuggestTryOn(recommendProducts as BizAffiliateProduct[]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const uploadTrigger = () => {
    fileInputRef?.current.click()
  }
  const uploadTrigger2 = () => {
    fileInputRef2?.current.click()
  }

  const playAutoSuggestTryOn = (products: BizAffiliateProduct[] = []) => {
    console.log("playAutoSuggestTryOn")
    if (!products || !products.length) return;
    if (!humanUrl || !humanUrl.length) return;
    let someProducts = products.slice(0, products.length >= 2 ? 2 : products.length)
    someProducts.forEach(async (product, index) => {

      if (product.images && product.images.length && product.images[0]) {
        await generateVtoRest(product.images[0], index, product)
      }
    })
  }

  const ensureLastCallComplete = useCallback(async (timeout = 200000) => {
    var start = Date.now();
    return new Promise(waitForUploadedAllImages); // set the promise object within the waitForUploadedAllImages object
    function waitForUploadedAllImages(resolve, reject) {
      console.log("check !IsTryingOn " + !IsTryingOn)
      console.log("check humanUrl " + humanUrl)
      if (!IsTryingOn && humanUrl) {
        resolve(IsTryingOn);
      }
      else if (timeout && (Date.now() - start) >= timeout) {
        reject(new Error("timeout"));
      }
      else {
        setTimeout(waitForUploadedAllImages.bind(this, resolve, reject), 300);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [IsTryingOn, humanUrl])

  const generateVtoRest = useCallback(async (productImageUrl: string, index: number, product: BizAffiliateProduct) => {
    setIsLoadingTryOn(true);
    ensureLastCallComplete().then(async function () {
      if (!humanUrl || !productImageUrl) {
        alert('Invalid params! Missing required input.')
        return;
      }
      console.log("generateVtoRest...")
      IsTryingOn = true;
      TryingOnIndex = index;
      await vtoService.uploadSrcHumanClothRestV2(new TryOnViewModel({
        clothesImageSrc: productImageUrl,
        humanBodyImageSrc: HumanSrcUrl,
        clothesType: product.groupType,
        productId: product.id
      })).then((res) => {
        console.log("result of vto received...")
        var info = res.data?.data.data.info;
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
              suggestImages.push(imageUrl);
              setSuggestImages([...suggestImages]);
            });
          }
        } else {
          _predictedUrls.push(info["url-image"]);
        }
        // Update results:


      }).catch(() => {
        alert('Xin lỗi. Hệ thống chúng tôi gặp sự cố quá tải. Xin vui lòng thử lại sau...');
      }).finally(() => {
        IsTryingOn = false;
      })
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ensureLastCallComplete])

  // upload human photo
  const handleHumanImageUpload = useCallback(
    async (event: any) => {
      const file = event.target.files[0]
      if (file) {
        setIsUploadingHuman(true);
        setIsLoadingProperty(true);
        console.log("handleHumanImageUpload")
        IsTryingOn = false;
        IsUploading = true;
        const imageUrl = URL.createObjectURL(file)
        const img = await ImageJS.Image.load(imageUrl)
        IsUploading = true;
        imageKitService
          .upload({ file: img.toDataURL(), fileName: Date.now() + 'human.jpg' })
          .then((uploaded) => {
            console.log("uploaded done")
            IsUploading = false;
            HumanSrcUrl = uploaded.url;
            localStorage.setItem("human-url", uploaded.url)
            setHumanUrl(uploaded.url);
            setDefaultHumanUrl(uploaded.url);
            let temp: string[] = []
            temp.push(uploaded.url);
            setSuggestImages([...temp]);
            setIsDefaultImage(false);
            setIsUploadingHuman(false)
            setIsLoadingProperty(false);


            // set TryOnApp
            setlaunchApp(true);
            console.log("re play try on")
            //playAutoSuggestTryOn(recommendProducts as BizAffiliateProduct[]);
          })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  // upload clothes photo
  const handleClothesImageUpload = useCallback(
    async (event: any) => {
      const file = event.target.files[0]
      if (file) {
        console.log("handleClothesImageUpload")
        setIsUploadingClothes(true);
        setIsLoadingProperty(true);
        IsTryingOn = false;
        IsUploading = true;
        const imageUrl = URL.createObjectURL(file)
        const img = await ImageJS.Image.load(imageUrl)
        IsUploading = true;
        imageKitService
          .upload({ file: img.toDataURL(), fileName: Date.now() + 'clothes.jpg' })
          .then((uploaded) => {
            console.log("uploaded done")
            IsUploading = false;
            ClotheSrcUrl = uploaded.url;
            localStorage.setItem("clothes-url", uploaded.url)
            setIsDefaultImage(false);
            setIsUploadingClothes(false)

            // set TryOnApp
            setlaunchApp(true);
          })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const isUrlValid = (userInput) => {
    var res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if (res == null)
      return false;
    else
      return true;
  }

  const onCrawlingUrlAmazon = useCallback(async (url: string) => {
    if (!isUrlValid) return alert('This url is not valid!');
    setCrawlingUrl(url);
    setIsCrawling(true);
    setCrawlingApp(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (<>

    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "minmax(15px, 1fr) repeat(3, minmax(0, 510px)) minmax(15px, 1fr)",
        gridAutoRows: "minmax(300px, auto)",
        backgroundColor: 'white'
      }}
      className="crystallize-grid crystallize-grid--css-grid"
    >
      <div
        className="crystallize-grid__cell cell-0-0 first-row first-col last-col"
        style={{ gridColumn: "1 / span 5", gridRow: "auto / span 1" }}
      >
        <div
          className="crystallize-tile pl-12 lg:pl-0 crystallize-tile-view-banner crystallize-tile-preset-low-profile-tile"
          style={{
            position: "relative",
            width: "100%",
            zIndex: 20,
            minHeight: "100%",
            display: "flex",
            alignItems: "stretch",
            justifyContent: "stretch",
            background: "#FFFFF",
            color: "#000"
          }}
        >
          <div style={{ width: "100%", zIndex: 20 }}>
            <div className=" flex md:flex-row flex-col  w-full mx-auto px-0 lg:px-10 max-w-[1600px] w-full items-center mt-14  md:py-0 ">
              <div className="md:w-1/2 pl-8 lg:pl-0 flex-column relative z-10 ">
                <div
                  className="text-left hover:text-center  mb-3  "
                  style={{ fontSize: 60, lineHeight: '2.5rem' }}
                >

                  <h1 className="tracking-tight inline font-semibold from-[#8e3cfa] to-[#F54C7A] text-4xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-b">TRY ON </h1>
                  <div>
                    <h1 className="tracking-tight inline font-semibold text-4xl lg:text-6xl">BEFORE BUY</h1>
                  </div>
                </div>
                <div className="mt-2 mb-5 max-w-[400px] leading-[1.6em]">
                  <p>Generative AI will help you Try On dresses, T-shirts, bikinis, and every outfit in seconds..</p>
                </div>

                <h2 className="text-xl mb-3 font-normal mt-12">
                  Your body photo {"("}full body{")"}
                </h2>
                <div className='flex'>



                  <button
                    className="pl-3 pr-5  pt-2 pb-1 rounded-xl rounded font-medium mr-2 mb-8 bg-transparent "
                    onClick={uploadTrigger}
                    style={{
                      backgroundColor: "#f4f4f5",
                      fontSize: "1rem"
                    }}
                  >

                    <a className='flex text-gray-600 text-sm my-1' > {isUploadingHuman ? "Change your photo" : "Upload now"} {"  "} &nbsp;
                      {
                        isUploadingHuman ? (<CircularProgress />)
                          :
                          (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mb-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" />
                          </svg>)}


                    </a>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleHumanImageUpload}
                      ref={fileInputRef}
                    />
                  </button> <span className='mt-3 px-4'> or </span>
                  <button
                    onClick={() => { setIsPickModels(!isPickModels) }}
                    className='flex justify-center items-center h-10 px-2 bg-gray-100 rounded-full'>
                    <span className='px-1 text-gray-800 text-sm'> Pick a Model </span>

                  </button>
                </div>

                {
                  isPickModels && (<MoreModelModal
                    onClose={() => { setIsPickModels(!isPickModels) }}

                    onSelectedModel={(item) => {
                      const url = (item.url as string).startsWith("http") ? item.url : ("https://www.tryonhub.ai" + item.url)
                      console.log(item); setHumanUrl(url);
                      setIsPickModels(!isPickModels);
                      setDefaultHumanUrl(url);
                      HumanSrcUrl = url;

                      localStorage.setItem("human-url", HumanSrcUrl)
                      setHumanUrl(HumanSrcUrl);
                      setDefaultHumanUrl(HumanSrcUrl);
                      let temp: string[] = []
                      temp.push(HumanSrcUrl);
                      setSuggestImages([...temp]);
                      setIsDefaultImage(false);
                      setIsUploadingHuman(false)
                      setIsLoadingProperty(false);
                      // set TryOnApp
                      setlaunchApp(true);
                    }} />)
                }

                {true && (

                  <div>
                    <h2 className="text-xl mb-3 font-normal mt-2">
                      Clothes wish to try {"("}Upload/Url{")"}
                    </h2>
                    <div className="w-[460px] h-32 text-sm mt-1 flex bg-white">
                      <Input
                        type="url"
                        placeholder="amazon.com/123xyz"
                        labelPlacement="outside"
                        onValueChange={(value) => {
                          if (isUrlValid(value)) {
                            setIsCrawling(true);
                            onCrawlingUrlAmazon(value)
                          }
                        }}
                        startContent={
                          <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">https://</span>
                          </div>
                        }
                        endContent={
                          <div className="flex items-center">
                            <label className="sr-only" htmlFor="currency">
                              Source
                            </label>
                            {isCrawling ?
                              (<CircularProgress />) :
                              (<select
                                className="outline-none border-0 bg-transparent text-default-400 text-small"
                                id="currency"
                                name="currency"
                              >
                                <option>Amazon</option>

                              </select>)}

                          </div>
                        }
                      />
                      <span className='mt-3 px-4'> or </span>
                      <button
                        onClick={uploadTrigger2}
                        className='flex justify-center items-center h-10 w-32 px-2 bg-gray-100 rounded-full'>
                        {isUploadingClothes ? (<CircularProgress />) : (<span className='px-1 text-gray-800'> Upload </span>)}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" />
                        </svg>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleClothesImageUpload}
                          ref={fileInputRef2}
                        />
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="self-end flex justify-center items-center md:w-8/12 w-full  img-container img-contain ">

                <div style={{
                  padding: "10px ",
                  width: "300px",
                  height: "450px"
                }} className='w-1/2 relative'>

                  {
                    (suggestImages.length) && (
                      // <img
                      //   style={
                      //     { height: 400, paddingBottom: '30px', paddingLeft: '2px' }
                      //   }
                      //   src={humanUrl ?? defaultHumanUrl}
                      //   alt=""
                      //   className=' hidden lg:block lg:my-12 mx-auto'
                      //   width={"auto"}
                      //   height={400}
                      //   loading="lazy"
                      // />
                      <SliderImageSM dataArray={suggestImages} />
                    )

                  }

                  {
                    <div style={{
                      height: "450px",
                      border: "solid 1px #bd8cdf",
                      borderRadius: "0.25rem"
                    }} className='absolute my-[20px] fingerprint scanning3 '> </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      <div className="crystallize-grid__cell cell-3-0 first-col last-col" style={{ gridColumn: "2 / span 3", gridRow: "2 / span 1" }}>
        <div className="crystallize-tile crystallize-tile-view-slider "
          style={{
            position: "relative",
            width: "100%",
            zIndex: 20,
            minHeight: "100%",
            display: "flex",
            alignItems: "stretch",
            justifyContent: "stretch"
          }}
        >
          <div style={{ width: "100%", zIndex: 20 }}>
            <div className="w-full">
              <div className="pb-10  ">
                <h2 className="text-3xl mb-3 font-bold">
                  AI recommend for you
                </h2>
                <div className="embed-text w-2/4">
                  <p>
                    Our plants are sure to brighten up your home (and your future).
                  </p>
                </div>
              </div>
              {
                recommendProducts && (<SliderProduct products={recommendProducts} />)
              }
            </div>
          </div>
        </div>
      </div>


      <div
        className="crystallize-grid__cell cell-2-0 first-col border border-[#f5f5f5] hover:border-[#000]"
        style={{ gridColumn: "2 / span 1", gridRow: "3 / span 1" }}
      >

        <div
          className="crystallize-tile crystallize-tile-view-slider crystallize-tile-preset-super-tile "
          style={{
            position: "relative",
            width: "100%",
            zIndex: 20,
            minHeight: "100%",
            display: "flex",
            alignItems: "stretch",
            justifyContent: "stretch",
            background: "#ffd9ec",
            color: "#000"
          }}
        >

          <div style={{ width: "100%", zIndex: 20 }}>
            <a href="/try-on-shop-category?c=dress" className=''>
              <div className="w-full">
                <div className="lg:pb-10  pt-20 px-5">
                  <h2 className="text-xl lg:text-2xl mb-3 font-bold">
                    Try-On DRESS
                  </h2>
                  <div className="embed-text w-5/5 pr-10  hidden lg:block ">
                    <p>
                      Try on dresses of all kinds of patterns and designs and choose the dress that best suits you.
                    </p>
                  </div>
                </div>
                <div className="px-5 hidden lg:block">
                  <div
                    className="splide splide--slide splide--ltr splide--draggable is-active is-overflow is-initialized"
                    id="splide01"
                    role="region"
                    aria-roledescription="carousel"
                  >

                    <div
                      className="splide__track splide__track--slide splide__track--ltr splide__track--draggable"
                      id="splide01-track"
                      style={{ paddingLeft: 0, paddingRight: 0 }}
                      aria-live="polite"
                      aria-atomic="true"
                    >
                      <ul
                        className="splide__list hidden lg:flex"
                        id="splide01-list"
                        role="presentation"
                        style={{ transform: "translateX(0px)" }}
                      >
                        <li
                          className="splide__slide slide items-stretch pb-10 is-active is-visible "
                          id="splide01-slide01"
                          role="group"
                          aria-roledescription="slide"
                          aria-label="1 of 4"
                          style={{ marginRight: 10, width: "calc(50% - 5px)" }}
                        >

                          <div className="absolute top-3 right-2 bg-green2 items-center flex z-[20] justify-center rounded-full w-[45px] h-[45px] text-[#fff] text-sm">

                          </div>
                          <div className="img-container pb-2 img-contain img-border border-solid border border-[#dfdfdf]  bg-[#fff] rounded-md overflow-hidden grow-1">
                            <img
                              style={{
                                height: "220px",
                                width: "auto",
                                margin: "auto",
                                paddingTop: "12px"
                              }}
                              src="/animates/C_Dress_1.jpg"
                              alt="Alocasia is a cool plant."
                              width={768}
                              height={960}
                              loading="lazy"
                            />
                          </div>


                        </li>

                        <li
                          className="splide__slide slide items-stretch pb-10 is-visible is-next"
                          id="splide01-slide02"
                          role="group"
                          aria-roledescription="slide"
                          aria-label="2 of 4"
                          style={{ marginRight: 10, width: "calc(50% - 5px)" }}
                        >

                          <div className="absolute top-3 text-xs right-2 bg-green-100/10 text-gray-800 rounded-xl items-center flex z-[20] justify-center rounded-full w-[95px] h-[45px] text-[#fff] text-sm">
                            AI Try On
                          </div>
                          <div className=" img-container pb-2 img-contain img-border border-solid border border-[#dfdfdf]  bg-[#fff] rounded-md  overflow-hidden grow-1">

                            <img
                              style={{
                                height: "220px",
                                width: "auto",
                                margin: "auto",
                                paddingTop: "12px"
                              }}
                              src="/animates/O_Dress_1.jpg"
                              alt="Monstera Deliciosa"
                              width={1024}
                              height={1237}
                              loading="lazy"
                            />

                          </div>



                        </li>

                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
          {/* </a> */}
        </div>

      </div>

      <div
        className="crystallize-grid__cell cell-2-1 "
        style={{ gridColumn: "3 / span 1", gridRow: "3 / span 1", backgroundColor: "antiquewhite" }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            zIndex: 20,
            minHeight: "100%",
            display: "flex",
            alignItems: "stretch",
            justifyContent: "stretch"
          }}
        >
          <a
            className="grid min-h-[100%]  rounded-md overflow-hidden border border-[#f5f5f5] hover:border-[#000]"
            href="/try-on-shop-category?c=upperbody"
          >
            <div className="flex flex-col  items-stretch h-full overflow-hidden w-full">
              <div className="lg:px-10 pt-20 h-1/3 ">
                <h2 className="text-xl lg:text-2xl font-bold mb-3">
                  UPPER BODY
                </h2>
                <p className="embed-text  hidden lg:block ">
                  Mens shirts are often combined with pants, and womens shirts with pants or skirts. Popular types of tops are t-shirts, blouses and shirts.
                </p>
              </div>
              <div className=" hidden lg:block pl-10 pt-10 max-w-full  img-container overflow-hidden rounded-t-l-md img-cover grow">

                <img
                  style={{
                    height: "220px",
                    width: "auto",
                    margin: "auto",
                    paddingTop: "12px"
                  }}
                  src="/animates/C_UpperBody_1.jpg"
                  alt="Room with teapot on table"
                  width={768}
                  height={710}
                  loading="lazy"
                />

              </div>
            </div>
          </a>
        </div>
      </div>
      <div
        className="crystallize-grid__cell cell-2-2 last-col"
        style={{ gridColumn: "4 / span 1", gridRow: "3 / span 1" }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            zIndex: 20,
            minHeight: "100%",
            display: "flex",
            alignItems: "stretch",
            justifyContent: "stretch"
          }}
        >
          <a
            className="grid min-h-[100%] w-full bg-[#F5F5F5] relative rounded-md border border-[#f5f5f5] hover:border-[#000]"
            href="try-on-shop-category?c=lowerbody"
          >
            <div className="flex flex-col  items-stretch  w-full">
              <div className="lg:px-10 pt-20 pb-6 ">
                <h2 className="text-xl lg:text-2xl font-bold mb-3"> LOWER BODY</h2>
                <p className="embed-text  hidden lg:block ">
                  All lower body garments are divided into two parts, one for each leg. It can also be Pants and Shorts.
                </p>
              </div>
              <div className=" hidden lg:block img-container w-full lg:col-span-3 self-start rounded-tl-lg relative">
                <div className="absolute w-full frntr-hotspot frntr-hotspot-microformat">
                </div>
                <img
                  style={{
                    height: "220px",
                    width: "auto",
                    margin: "auto",
                    paddingTop: "12px"
                  }}
                  src="/animates/O_LowerBody_1.png"
                  alt="Room with many plants"
                  width={1024}
                  height={1192}
                />
              </div>
            </div>
          </a>
        </div>
      </div>


      <div className="crystallize-grid__cell cell-4-0 first-col last-row last-col"
        style={{ gridColumn: "1 / span 5", gridRow: "auto / span 1" }}
      >
        <div
          className="crystallize-tile crystallize-tile-view-slider crystallize-tile-preset-super-tile"
          style={{
            position: "relative",
            width: "100%",
            zIndex: 20,
            minHeight: "100%",
            display: "flex",
            alignItems: "stretch",
            justifyContent: "stretch",

          }}
        >
          <div style={{ width: "100%", zIndex: 20 }}>
            <div className="px-8 lg:px-10 max-w-[1650px] w-full mx-auto">
              <div className="pt-20 ">
                <h2 className="text-3xl mb-3 font-bold">Trending products</h2>
                <div className="embed-text w-2/4">
                  <p>Enjoy discounts on the following:</p>
                </div>
              </div>
              {
                props.trendingProducts && (<SliderProduct products={props.trendingProducts} />)
              }
            </div>
          </div>


        </div>
      </div>

      <div className="crystallize-grid__cell cell-4-0 first-col last-row last-col"
        style={{ gridColumn: "1 / span 5", gridRow: "auto / span 1" }}
      >
        <div
          className="crystallize-tile crystallize-tile-view-slider crystallize-tile-preset-super-tile"
          style={{
            position: "relative",
            width: "100%",
            zIndex: 20,
            minHeight: "100%",
            display: "flex",
            alignItems: "stretch",
            justifyContent: "stretch",
            background: "#FFFFFF"
          }}
        >
          <div style={{ width: "100%", zIndex: 20 }}>
            <div className="px-8 lg:px-10 max-w-[1650px] w-full mx-auto">
              <div className="pb-10  pt-20 undefined">
                <h2 className="text-3xl mb-3 font-bold">Look back last tries</h2>
                <div className="embed-text w-2/4">
                  <p>Enjoy discounts on the following:</p>
                </div>
              </div>
              {
                props.allSpecificProducts && (<SliderProduct products={props.allSpecificProducts} />)
              }
            </div>
          </div>
        </div>
        <div className="crystallize-grid__cell cell-4-0 first-col last-row last-col"
          style={{ gridColumn: "1 / span 5", gridRow: "auto / span 1" }}
        > <div
          className="crystallize-tile crystallize-tile-view-slider crystallize-tile-preset-super-tile"
          style={{
            position: "relative",
            width: "100%",
            zIndex: 20,
            minHeight: "100%",
            paddingLeft: "45%",
            display: "flex",
            alignItems: "stretch",
            justifyContent: "stretch",
            background: "#E2ECE9"
          }}
        >
            <hr />
            <div className='w-full h-32 flex items-center'>
              <button
                className="px-8 mt-0 py-4 rounded font-medium mr-2 mb-8"
                style={{
                  color: "#fff",
                  backgroundColor: "#000",
                  fontSize: "1rem"
                }}
              >
                <a className='flex ' href="/try-on-shop-all">See more {"  "} &nbsp;
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                  </svg>
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="crystallize-grid__cell cell-4-0 first-col last-row last-col"
        style={{ gridColumn: "1 / span 5", gridRow: "auto / span 1" }}
      >
        <div
          className="crystallize-tile crystallize-tile-view-slider crystallize-tile-preset-super-tile"
          style={{
            position: "relative",
            width: "100%",
            zIndex: 20,
            minHeight: "100%",
            display: "flex",
            alignItems: "stretch",
            justifyContent: "stretch",
            background: "#FFFFFF"
          }}
        >
          <div style={{ width: "100%", zIndex: 20 }}>
            <div className="px-8 lg:px-10 max-w-[1650px] w-full mx-auto">
              <div className="pb-10 ">
                <h2 className="text-3xl mb-3 font-bold">Good price today{"\'"}s</h2>
                <div className="embed-text w-2/4">
                  <p>Enjoy discounts on the following:</p>
                </div>
              </div>
              {
                props.allSaleOffProducts && (<SliderProduct products={props.allSaleOffProducts} />)
              }
            </div>
          </div>
        </div>
        <div className="crystallize-grid__cell cell-4-0 first-col last-row last-col"
          style={{ gridColumn: "1 / span 5", gridRow: "auto / span 1" }}
        > <div
          className="crystallize-tile crystallize-tile-view-slider crystallize-tile-preset-super-tile"
          style={{
            position: "relative",
            width: "100%",
            zIndex: 20,
            minHeight: "100%",
            paddingLeft: "45%",
            display: "flex",
            alignItems: "stretch",
            justifyContent: "stretch",
            background: "#E2ECE9"
          }}
        >
            <hr />
            <div className='w-full h-32 flex items-center'>
              <button
                className="px-8 mt-0 py-4 rounded font-medium mr-2 mb-8"
                style={{
                  color: "#fff",
                  backgroundColor: "#000",
                  fontSize: "1rem"
                }}
              >
                <a className='flex ' href="/try-on-shop-all">See more {"  "} &nbsp;
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                  </svg>
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>


    </div>

    {
      launchApp && <TryonApp status={launchApp} currentHumanUrl={HumanSrcUrl} currentClotheUrl={ClotheSrcUrl} currentStep={ClotheSrcUrl ? 3.5 : 3}
        currentProductReferUrl={crawlingProduct?.affiliateUrl}
        currentProductReferProvider={crawlingProduct?.affiliateProvider}
        onCloseEvent={() => { console.log("onCloseEvent");; setlaunchApp(false); }} />
    }

    <CrawlingPopup onNextEvent={((product: BizAffiliateProduct) => { setCrawlingProduct(product); ClotheSrcUrl = product.images[0]; setlaunchApp(true); setCrawlingApp(false); setIsCrawling(false) })} status={crawlingApp} productUrl={crawlingUrl} currentStep={0} onCloseEvent={() => { console.log("onCloseEvent");; setIsCrawling(false); setCrawlingApp(false) }} />
  </>);
};




