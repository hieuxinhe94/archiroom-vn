import "aos/dist/aos.css";

import AOS from "aos";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from 'react'
import { useEffect } from "react";

import AnnouncementBar from "~/components/announcementBar";
import Container from '~/components/Container'
import ToastCustom from '~/components/custom.toast'
import Features from '~/components/Features'
import Footer from '~/components/footer'
import HowItWork from '~/components/HowItWork'
import HowToUseBlock from '~/components/howToUseBlock'
import IntroBlock from '~/components/introblock'
import Navbar from '~/components/navbar'
import NewsFeature from '~/components/newfeature'
import PartnersBlock from '~/components/partners'
import PriceBlock from '~/components/pricingBlock'
import TwoColumnsBlocks from '~/components/twoColumnsBlocks'
import { getHomepageData } from '~/lib/client'

import polygon from "../assets/background-images/polygon.svg"
import polygonfooter from "../assets/background-images/polygon-footer.svg"
import purpleGradient from "../assets/background-images/purple-gradient.svg"
import vector from "../assets/background-images/vector.svg"
import LoginApp from './LoginApp'
import ProfileApp from "./ProfileApp";
import { getCurrentUserByBrowser } from "./try-on-plugin";
import TryonApp from './TryonApp'
import { NextSeo } from "next-seo";


export async function getStaticProps() {
  const homeData = await getHomepageData()
  return {
    props: {
      featureBlock: homeData.featureBlock.length > 0 ? homeData.featureBlock[0] : null,
      howitworks: homeData.howItWorksBlock.length > 0 ? homeData.howItWorksBlock[0] : null,
      introInfo: homeData.intro.length > 0 ? homeData.intro[0] : null,
      partners: homeData.partners,
      twoColumns: homeData.twoColumnsBlocks,
      settings: homeData.settings,
      pricing: homeData.pricingBlock.length > 0 ? homeData.pricingBlock[0] : null,
      uses: homeData.howToUseBlock.length > 0 ? homeData.howToUseBlock[0] : null,
      testimonials: homeData.testimonialBlock.length > 0 ? homeData.testimonialBlock[0] : null
    }
  }
}
const menu = [
  {
    label: "Demo",
    href: "?launchdemo=true",
    children: ""
  },
  {
    label: "Try on Shop",
    href: "/try-on-shop",
    isNew: true
  },
  {
    label: "Business",
    href: "/business-app"
  },
  {
    label: "Pricing",
    href: "https://docs.tryonhub.ai/guides/pricing"
  },
  {
    label: "About Us",
    href: "/about"
  }
];
export default function IndexPage(props) {
  const router = useRouter();
  const { app } = router.query;
  const [appMode, setAppMode] = useState('');
  const [launchApp, setlaunchApp] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserEntity>(getCurrentUserByBrowser())

  useEffect(() => {
    AOS.init({
      offset: 40,
      once: true
    });
  }, []);
  useEffect(() => {
    console.log("app");
    console.log(app);
    switch (app) {
      case "bussiness":
        setAppMode('bussiness');
        setlaunchApp(true);
        break;
      case "launchdemo":
        setAppMode('app');
        setlaunchApp(true);
        break;
    }
  }, [app]); // empty array means only once



  return (
    <div>
      <AnnouncementBar props={{}} />
      <NextSeo
        title="Fashion Studio TryOnHub.AI"
        description="Generative AI Try On Dresses, T-Shirts, clothes, bikini, upperbody, lowerbody online. Try On Amazon clothes. Virtual try on clothing studio for business."
        canonical="https://www.tryonhub.ai/default"
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
        <section>
          <div className="relative  leading-[normal] medium:text-[30px] mobile:mt-6 mobile:text-[28px]">
        

            <Image priority={true} src={purpleGradient} width={1200} height={1200} className='absolute top-[-100px] right-[70px]' alt={''} />
            <Image priority={true} src={polygon} width={900} height={900} className='absolute top-[-100px] right-[200px]' alt={''} />
          </div>

          <Navbar menu={menu} settings={props.settings} isHomepage={true} launchAppEvent={() => { console.log("showLogin"); setAppMode('login'); setlaunchApp(!launchApp) }} />
          <IntroBlock introInfo={props.introInfo} launchAppEvent={() => { console.log("showTryOnApp"); setAppMode('app'); setlaunchApp(!launchApp) }} />
          <NewsFeature />
          <TwoColumnsBlocks twoColumns={props.twoColumns} />
          <HowItWork items={props.howitworks}></HowItWork>
          <PriceBlock pricing={props.pricing} />
          <HowToUseBlock uses={props.uses} />
          {/* <TestimonialBlock testimonials={props.testimonials} /> */}

          <Features data={props.featureBlock}></Features>
          <Footer />
          <TryonApp status={launchApp && appMode === 'app'} onCloseEvent={() => { console.log("onCloseEvent"); setAppMode(''); setlaunchApp(false) }} />

          {
            (launchApp && appMode === 'login') &&

            <LoginApp status={launchApp && appMode === 'login'}
              onSuccessEvent={(currentUser) => { setCurrentUser(currentUser); console.log("onLoginSuccessedEvent"); setAppMode('profile'); setlaunchApp(true) }}
              onCloseEvent={() => { console.log("onCloseEvent"); setAppMode(''); setlaunchApp(false) }} />
          }


          {
            (launchApp && appMode === 'profile') &&
            (<ProfileApp status={launchApp && appMode === 'profile'} userData={currentUser}
              onSuccessEvent={(currentUser) => { setCurrentUser(currentUser); console.log("onProfileChangedEvent"); setAppMode(''); setlaunchApp(false) }}
              onCloseEvent={() => { console.log("onCloseEvent"); setAppMode(''); setlaunchApp(false) }} />)
          }


          <div className="relative opacity-70 z-0">
            <div className="bg-purple-radial-gradient w-[1200px] h-[1200px] absolute bottom-[-200px] left-[-400px]"></div>
            <Image src={polygonfooter} width={900} height={900} className='absolute bottom-0 left-[-260px]' alt={''} />
            <Image src={vector} width={400} height={400} className='absolute bottom-[200px] right-[-400px] hidden md:block' alt={''} />
          </div>
        </section>
        <ToastCustom />
      </Container>
    </div>
  )
}
