import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react"

import { getAllSocial, getSettings } from "~/lib/client"
import { urlForImage } from "~/lib/sanity.image"

import Container from "./Container";



export default function Footer(props) {

  const [data, setData] = useState([])
  const [settings, setSettings] = useState({})

    useEffect(() => {
        async function fetchInfo() {
            const data = await getAllSocial()
            setData(data)
        }

        async function fetchSettings() {
          const data = await getSettings()
          setSettings(data)
      }
      
        fetchInfo()
        fetchSettings()
    }, [])

  return (
    <footer style={{backgroundColor: "black"}}>
    <Container>
      <div className="relative pt-[50px] z-10 footer-container grid grid-cols-2 lg:grid-cols-3 gap-[30px] mt-[80px] md:mt-[150px]">
        <div className="our-info col-span-2 lg:col-span-1 py-12">
        <Link href="/" className="text-base bg-gradient-to-r from-purple-gd to-blue-gd bg-clip-text text-transparent">
          {settings?.logo ? (
            <Image
              {...urlForImage(settings.logo)}
              alt="Logo"
              priority={true}
              sizes="(max-width: 640px) 100vw, 200px"
            />
          ) : (
            <span className="block text-center bg-gradient-to-r from-purple-gd to-blue-gd bg-clip-text text-transparent">
              TryOnHub.AI
            </span>
          )}
        </Link>
        <div className="info-item flex mb-[20px] mt-[44px]">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#ffffff" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          <span className="text-white text-[14px] md:text-[18px] ml-[10px]">183, Truong Chinh Street, Hanoi City, Vietnam</span>
        </div>
        {/* <div className="info-item flex mb-[20px]">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#ffffff" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
          </svg>
          <span className="text-white text-[14px] md:text-[18px] ml-[10px]">123-456-7890</span>
        </div> */}
        <div className="info-item flex mb-[20px]">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#ffffff" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
          <span className="text-white text-[14px] md:text-[18px] ml-[10px]">contact@tryonhub.ai</span>
        </div>
        </div>
        <div className="footer-links flex flex-col items-start">
          <Link href="/" className="text-[14px] md:text-base mb-[16px] bg-gradient-to-r from-purple-gd to-blue-gd bg-clip-text text-transparent">
          Try On Now
          </Link>
          <Link href="/" className="text-[14px] md:text-base text-white mb-[16px]">
          Pricing
          </Link>
          <Link href="/" className="text-[14px] md:text-base text-white mb-[16px]">
          Business
          </Link>
          <Link href="/" className="text-[14px] md:text-base text-white mb-[16px]">
          Case study
          </Link>
        </div>
        <div className="footer-links flex flex-col">
          <Link href="/" className="text-[14px] md:text-base text-white mb-[16px]">
          Resources
          </Link>
          <Link href="/" className="text-[14px] md:text-base text-white mb-[16px]">
          For Developers
          </Link>
          <Link href="/" className="text-[14px] md:text-base text-white mb-[16px]">
          Contact & Support
          </Link>
        </div>
      </div>
      <div className="relative z-10 copy-right socials border-t border-white border-opacity-30 mt-[40px] md:mt-[70px] flex justify-between items-center flex-col-reverse lg:flex-row">
        <p className="text-[14px] md:text-base text-white py-[20px]">Copyright © {new Date().getFullYear()} SIMPLIFY AI JOIN STOCK. All
        rights reserved.</p>
        <div className="socials flex mt-[20px] lg:mt-0">
          {
            data.map((social, index) => 
              <div className="social ml-[10px]" key={index}>
                <Link href={social.url} target="_blank">
                  <Image
                  src={social.logo
                      ? urlForImage(social.logo)
                      : null}
                  alt="Social Logo"
                  width={30}
                  height={30} />
                </Link>
              
              </div>
            )
          }
        </div>
      </div>
      
    </Container>
    </footer>
  );
}