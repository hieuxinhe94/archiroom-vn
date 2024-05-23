import { CircularProgress, Switch } from '@nextui-org/react'
import Image from "next/image";
import Script from 'next/script';
import { useCallback, useEffect, useRef, useState } from 'react'
import * as ImageJS from 'image-js'
import Container from '~/components/Container'
import Footer from '~/components/footer'
import Navbar from '~/components/navbar'
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
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo';
import { GridProduct } from '~/components/gridProduct';



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



async function getAIRecommendingProducts(human_url: string): Promise<BizAffiliateProduct[]> {
  const res = await vtoService.getAIRecommendingProducts(human_url);
  if (res.status == 201) {

    return res.data
  }
  return res.data
}

async function getByGroupTypeProducts(groupType: string): Promise<BizAffiliateProduct[]> {
  const res = await vtoService.getByGroupProducts(groupType);
  if (res.status !== 200) {
    throw new Error('Failed to fetch data')
  }
  return res.data
}

async function getByCategoryProducts(categoryName: string): Promise<BizAffiliateProduct[]> {
  const res = await vtoService.getByCategoryProducts("000", categoryName);
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

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      roomPage: roomPage[0],
      // products: products,
      settings: settings,

    },
  }
}

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

export default function TryBeforeBuy(props) {
  const [appMode, setAppMode] = useState('');
  const [launchApp, setlaunchApp] = useState(false);

  const router = useRouter()
  const groupTypeName = (router.query?.g as string);
  const categoryTypeName = (router.query?.c as string);
  const [categories, setCategories] = useState<BizAffiliateProductCategory[]>([]);
  const [allTrendProducts, setAllTrendProducts] = useState<BizAffiliateProduct[]>();


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
    <div >
      <NextSeo
        title={categoryTypeName + "Try On with TryOnHub.AI"}
        description='TryOnHub.AI, AI thử mặc thời trang, Bikini try on, Try on dress, wedding dress try on, try before you buy, try on clothes at home, try on clothes online'
        canonical="https://www.tryonhub.ai/try-on-shop-category"
        openGraph={{
          url: 'https://www.tryonhub.ai/try-on-shop',
          title: categoryTypeName + " Try On with TryOnHub.AI",
          description: 'TryOnHub.AI, AI thử mặc thời trang, ' + categoryTypeName + ' try on, Try on dress, wedding dress try on, try before you buy, try on clothes at home, try on clothes online',
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
          <Navbar isHomepage={false} menu={menu_commerce} settings={props.settings} launchAppEvent={() => { }} hasSearch={true} />
        </Container>
      </section>

      <RoomPageContent
        props={props}
        categories={categories}
        groupTypeName={groupTypeName}
        categoryTypeName={categoryTypeName}
      />
      <Footer />
      <TryonApp status={launchApp && appMode === 'app'} onCloseEvent={() => { console.log("onCloseEvent"); setAppMode(''); setlaunchApp(false) }} />
      <LoginApp
        status={launchApp && appMode === 'login'}
        onSuccessEvent={() => { console.log("onLoginSuccessedEvent"); }}
        onCloseEvent={() => { console.log("onCloseEvent"); setAppMode(''); setlaunchApp(false) }} />
      <div className="relative opacity-70 z-0">
      </div>
      <Script src="https://www.tryonhub.ai/tryonhub.min.js" />
    </div>
  )
}


var IsUploading = false;
var IsTryingOn = false;
var TryingOnIndex = 0;
var HumanSrcUrl = 'https://ik.imagekit.io/tryonhub/1715071847674human_0hSPtC3uG.jpg';
function RoomPageContent(props) {
  const [activeAI, setActiveAI] = useState(false);
  const [selectedClothes, setSelectedClothes] = useState('')
  const [selectedMedia, setSelectedMedia] = useState("")

  const [collections, setCollections] = useState<BizCollection[]>(props.collections)
  const [suggestImages, setSuggestImages] = useState<string[]>([HumanSrcUrl])
  const [isDefaultImage, setIsDefaultImage] = useState(true);
  const [isUploadingHuman, setIsUploadingHuman] = useState(false);
  const [isLoadingProperty, setIsLoadingProperty] = useState(false);
  const [isLoadingTryOn, setIsLoadingTryOn] = useState(false);
  const [defaultHumanUrl, setDefaultHumanUrl] = useState(HumanSrcUrl)
  const [humanUrl, setHumanUrl] = useState<string>(HumanSrcUrl);
  const fileInputRef = useRef<any>();

  const [recommendProducts, setRecommendProducts] = useState<BizAffiliateProduct[]>([]);
  const [allProducts, setAllProducts] = useState<BizAffiliateProduct[]>();



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
        console.log("setRecommendProducts")
        setRecommendProducts(data)
      });

    console.log("props.groupTypeName")
    console.log(props.groupTypeName)
    if (["upperbody", "dress", "lowerbody"].indexOf(props.groupTypeName) !== -1) {
      console.log("1")
      getByGroupTypeProducts(props.groupTypeName)
        .then((data) => {
          setAllProducts(data)
        });
    } else if (props.categoryTypeName && props.categoryTypeName?.length) {
      console.log("2")
      getByCategoryProducts(props.categoryTypeName)
        .then((data) => {
          console.log("getByCategoryProducts")
          console.log(data)
          setAllProducts(data)
        });

    } else {
      console.log("3")
      getByCategoryProducts(props.groupTypeName)
        .then((data) => {
          console.log("getByCategoryProducts")
          console.log(data)
          setAllProducts(data)
        });

    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.groupTypeName, props.categoryTypeName]);

  useEffect(() => {
    console.log("re play try on")
    playAutoSuggestTryOn(allProducts as BizAffiliateProduct[]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allProducts]);

  const uploadTrigger = () => {
    fileInputRef?.current.click()
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
            let temp: string[] = []
            temp.push(uploaded.url);
            setSuggestImages([...temp]);
            setIsDefaultImage(false);
            setIsUploadingHuman(false)
            setIsLoadingProperty(false);
            console.log("re play try on")
            //playAutoSuggestTryOn(allProducts as BizAffiliateProduct[]);
          })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );


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
          className="crystallize-tile crystallize-tile-view-banner crystallize-tile-preset-low-profile-tile"
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
            <div className=" flex md:flex-row flex-col  w-full mx-auto px-8 lg:px-10 max-w-[1600px] w-full items-center pt-10  md:py-0 ">
              <div className="md:w-1/2 pl-8 lg:pl-0 flex-column relative z-10 ">
                <div
                  className="text-left hover:text-center  mb-3  "
                  style={{ fontSize: 60, lineHeight: '2.5rem' }}
                >

                  <h1 className="tracking-tight inline font-semibold from-[#FF72E1] to-[#F54C7A] text-4xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-b">TRY IT </h1>
                  <div>
                    <h1 className="tracking-tight inline font-semibold text-4xl lg:text-6xl">BEFORE BUY</h1>
                  </div>
                </div>
                <div className="mt-2 mb-5 max-w-[400px] leading-[1.6em]">
                  <p>Novel experiences provided by Generative AI.</p>
                </div>
                <button
                  className="px-8 mt-12 py-4 rounded font-medium mr-2 mb-8"
                  onClick={uploadTrigger}
                  style={{
                    color: "#fff",
                    backgroundColor: "#000",
                    fontSize: "1rem"
                  }}
                >
                  <a className='flex' >Upload your body photo {"  "} &nbsp;
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" />
                    </svg>

                  </a>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleHumanImageUpload}
                    ref={fileInputRef}
                  />
                </button>
              </div>
              <div className="self-end flex justify-center items-center md:w-8/12 w-full pt-10 img-container img-contain ">

                <div style={{
                  padding: "10px ",
                  width: "300px",
                  height: "450px"
                }} className='w-1/2 relative'>

                  {
                    (suggestImages.length) && (

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
              <div className="pb-10  pt-20 undefined">
                <h2 className="text-3xl mb-3 font-bold">Lastest {props.categoryTypeName ?? props.groupTypeName} products:</h2>

                <div className="embed-text w-2/4">
                  <p>
                    Take a look at these products.
                  </p>
                </div>
              </div>
              {
                allProducts && (<GridProduct products={allProducts} size={20} />)
              }
            </div>
          </div>
        </div>
      </div>
      <div className="crystallize-grid__cell cell-4-0 first-col last-row last-col"
        style={{ gridColumn: "1 / span 5", gridRow: "auto / span 1" }}
      >
        <div
          className="crystallize-tile crystallize-tile-view-slider crystallize-tile-preset-super-tile pb-12"
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
            <div className="px-8 lg:px-10 max-w-[1650px] w-full mx-auto ">
              <div className="pb-10  pt-20 ">
                <h2 className="text-3xl mb-3 font-bold">
                  AI recommend for {props.categoryTypeName ?? props.groupTypeName}
                </h2>
                <div className="embed-text w-2/4">
                  <p>Enjoy discounts on the following:</p>
                </div>
              </div>
              {
                recommendProducts && (<SliderProduct products={recommendProducts} />)
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  </>);
};




