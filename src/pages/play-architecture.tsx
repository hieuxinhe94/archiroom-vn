import { Image as Image2 } from '@nextui-org/react'
import confetti from 'canvas-confetti'
import Image from 'next/image'
import Script from 'next/script';
import { NextSeo } from 'next-seo';
import { useState } from 'react'
import { useForm } from "react-hook-form";

import Container from '~/components/Container'
import Footer from '~/components/footer';
import Navbar from '~/components/navbar';
import { getHomepageData } from '~/lib/client';
import { getClient } from '~/lib/sanity.client';

import polygon from "../assets/background-images/polygon.svg"
import polygonfooter from "../assets/background-images/polygon-footer.svg"
import purpleGradient from "../assets/background-images/purple-gradient.svg"
import vector from "../assets/background-images/vector.svg"
import { MARKET_CONFIG_DATA } from '~/components/data';
import PlayGroundArchitecture2 from '~/components/marketplace/playground-architecture-2';



export default function PlayArchitecture(props) {

  return (
    <section style={{
      backgroundColor: "whitesmoke", color: "whitesmoke"
    }}
      className=" min-h-screen flex-col items-center justify-between px-2 pt-4">

      <NextSeo
        title="Archiroom.VN | Generative AI Cho kiến trúc "
        description='ai art generator, ai picture generative, generative ai vietnam, Ứng dụng Gen AI Việt Nam, Generative AI Việt Nam, Chuyển đổi số bằng Generative AI Việt Nam'
        canonical="https://ArchiRoom.vn"
        openGraph={{
          url: 'https://ArchiRoom.vn',
          title: "Generative AI Cho kiến trúc - Archiroom.VN",
          description: 'ai art generator, ai picture generative, generative ai vietnam, Ứng dụng Gen AI Việt Nam, Generative AI Việt Nam, Chuyển đổi số bằng Generative AI Việt Nam, AI thử mặc thời trang, Bikini try on, Try on dress, wedding dress try on, try before you buy, try on clothes at home, try on clothes online',
          images: [
            {
              url: 'https://ArchiRoom.AI/logo-s.png',
              width: 800,
              height: 600,
              alt: 'Chợ ứng dụng Generative AI dành cho doanh nghiệp Việt Nam',
              type: 'image/jpeg',
            },

          ],
          siteName: 'ArchiRoom.AI',
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />

      <PlayGroundArchitecture2 config={undefined} onCloseEvent={undefined} />
    </section>
  )
}

