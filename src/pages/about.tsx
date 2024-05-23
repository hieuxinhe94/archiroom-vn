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

export default function Contact(props) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    setValue,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm({
    mode: "onTouched",
  });

  const [isSuccess, setIsSuccess] = useState(false);
  // Please update the Access Key in the Sanity CMS - Site Congig Page
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  // const onSubmit = () => ({
  //   from_name: "ContactForm",
  //   subject: "",
  //   onSuccess: (msg, data) => {
  //     onPost();
  //     reset();
  //   },
  //   onError: (msg, data) => {
  //     setIsSuccess(false);
  //     setMessage(msg);
  //   },
  // });

  const onPost = async () => {
    try {
      setIsSuccess(true);
      const client = getClient();
      console.log(client.config());
      alert("Cảm ơn bạn. Chúng tôi sẽ liên hệ lại với bạn sớm.");
      await client.create({
        _type: "contact",
        title: message,
        name: name,
        email: email,
        phone: phone,
        company: "a",
        content: message,
      });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>

      <section className='bg-black/10'>
        <Container>
          <div className="relative ">
            <Image priority={true} src={purpleGradient} width={200} height={200} className='absolute top-[-100px] right-[70px]' alt={''} />
            <Image priority={true} src={polygon} width={900} height={900} className='absolute top-[-100px] right-[200px]' alt={''} />
          </div>
          <Navbar menu={[]} settings={props.settings} launchAppEvent={() => { }} />
        </Container>
      </section>

      <NextSeo
        title={`${"Liên hệ"}`}
        description={"" || ""}
        canonical={`/contact/`}
        twitter={{
          cardType: "summary_large_image",
        }}
      />
      <div className="w-1/2 mx-auto " style={{ zIndex: 50 }}>
        <h1 className="mt-32 mb-3 text-2xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl dark:text-white"></h1>
        <div className="text-center"></div>

        <div className="grid my-10 md:grid-cols-2 text-white z-50">
          <div className="my-10">
            <h2 className="text-2xl font-semibold dark:text-white">SIMPLIFY TECH.INC</h2>
            <p className="max-w-sm mt-5 text-justify">

              Chúng tôi hiểu rằng Tryonhub.ai còn nhiều điều phải làm, nhiều bước phải tối ưu
              nhưng chúng tôi tin rằng, chỉ cần đủ nỗ lực, sự kiên trì của những người Việt Nam trẻ,
              chúng tôi có thể làm cuộc sống này đơn giản là thú vị hơn một chút.

            </p>

            <p className='mt-12'></p>
            <div className="mt-5">
              <div className="flex items-center mt-2 space-x-2 text-dark-600 dark:text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#ffffff" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span>183, Truong Chinh Street, Hanoi City, Vietnam</span>
              </div>
              <div className="flex items-center mt-2 space-x-2 text-dark-600 dark:text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25" />
                </svg>
             

                <a href={`mailto:${"contact@tryonhub.ai"}`}>
                  contact@tryonhub.ai
                </a>
              </div>

              <div className="flex items-center mt-2 space-x-2 text-dark-600 dark:text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z" />
                </svg>
                <a href={`tel:${"035.89.777.89"}`}>035.89.777 89</a>
              </div>
            </div>
          </div>
          <div>
            <form
              onSubmit={(e: any) => handleSubmit(e)}
              className="relative rounded-3xl border border-gray-100 bg-white p-8 shadow-2xl shadow-gray-600/10 dark:border-gray-700 dark:bg-gray-800 dark:shadow-none sm:p-12"
            >
              <div className="absolute inset-0 hidden scale-105 rounded-3xl bg-gradient-to-b from-transparent dark:block dark:to-gray-900/80"></div>
              <div className="relative">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Liên hệ với chúng tôi?
                </h2>
                <div className="mt-8 mb-6 space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-gray-600 dark:text-gray-300"
                    >
                      Họ và tên{" "}
                      <span className="text-xl text-red-500 dark:text-red-400">
                        *
                      </span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      {...register("name", {
                        required: "Nhập thông tin",
                      })}
                      autoComplete="name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      className="peer block w-full rounded-lg border border-gray-200 bg-transparent px-4 py-2 text-gray-600 transition-shadow duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 dark:border-gray-700"
                    />
                    <span className="mt-1 hidden text-sm text-red-500 peer-invalid:block">
                      Thông tin không hợp lệ
                    </span>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-gray-600 dark:text-gray-300"
                    >
                      Email công ty{" "}
                      <span className="text-xl text-red-500 dark:text-red-400">
                        *
                      </span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      {...register("email", {
                        required: "Nhập thông tin",
                      })}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      autoComplete="email"
                      className="peer block w-full rounded-lg border border-gray-200 bg-transparent px-4 py-2 text-gray-600 transition-shadow duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 dark:border-gray-700"
                    />
                    <span className="mt-1 hidden text-sm text-red-500 peer-invalid:block">
                      Thông tin không hợp lệ
                    </span>
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-gray-600 dark:text-gray-300"
                    >
                      Điện thoại{" "}
                      <span className="text-xl text-red-500 dark:text-red-400">
                        *
                      </span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      {...register("phone", {
                        required: "Nhập thông tin",
                      })}
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                      autoComplete="tel"
                      className="peer block w-full rounded-lg border border-gray-200 bg-transparent px-4 py-2 text-gray-600 transition-shadow duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 dark:border-gray-700"
                    />
                    <span className="mt-1 hidden text-sm text-red-500 peer-invalid:block">
                      Thông tin yêu cầu nhập
                    </span>
                  </div>
                  <div>
                    <label
                      htmlFor="company"
                      className="mb-2 block text-gray-600 dark:text-gray-300"
                    >
                      Tên công ty{" "}
                      <span className="text-xl text-red-500 dark:text-red-400">
                        *
                      </span>
                    </label>
                    <input
                      type="text"
                      name="company"
                      id="company"
                      {...register("company", {
                        required: "Nhập thông tin",
                      })}

                      autoComplete="work"
                      className="peer block w-full rounded-lg border border-gray-200 bg-transparent px-4 py-2 text-gray-600 transition-shadow duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 dark:border-gray-700"
                    />
                    <span className="mt-1 hidden text-sm text-red-500 peer-invalid:block">
                      Thông tin yêu cầu nhập
                    </span>
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-gray-600 dark:text-gray-300"
                    >
                      Nội dung liên hệ?
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      {...register("message", {
                        required: "Nhập thông điệp",
                      })}
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                      }}
                      className="peer block h-28 w-full rounded-lg border border-gray-200 bg-transparent px-4 py-2 text-gray-600 transition-shadow duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 dark:border-gray-700"
                      spellCheck="false"
                    ></textarea>

                    <span className="mt-1 hidden text-sm text-red-500 peer-invalid:block">
                      {errors.message && (
                        <div className="mt-1 text-red-600">

                          <small>{"errors?.message?.message"}</small>
                        </div>
                      )}
                    </span>
                  </div>
                </div>

                <p className="mb-8 text-sm text-gray-600 dark:text-gray-300">
                  Chúng tôi sẽ liên hệ sớm nhất! Cảm ơn sự quan tâm của bạn.
                </p>

                <button
                  type="submit"
                  disabled={errors.message?.message != null}
                  onClick={(e) => {
                    e.preventDefault();
                    if (errors.message?.message == null) {
                      onPost();
                    }

                  }}
                  className="w-full py-4 font-semibold text-white transition-colors bg-gray-900 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-offset-2 focus:ring focus:ring-gray-200 px-7 dark:bg-white dark:text-black "
                >
                  {isSubmitting ? (
                    <svg
                      className="w-5 h-5 mx-auto text-white dark:text-black animate-spin"
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
                    "Gửi"
                  )}
                </button>
              </div>
            </form>
            {isSubmitSuccessful && isSuccess && (
              <div className="mt-3 text-sm text-center text-green-500">
                {message || "Success. Message sent successfully"}
              </div>
            )}
            {isSubmitSuccessful && !isSuccess && (
              <div className="mt-3 text-sm text-center text-red-500">
                {message || "Something went wrong. Please try later."}
              </div>
            )}
          </div>
        </div>
      </div>{" "}


      <Footer />

      {/* <LoginApp 
      status={launchApp && appMode === 'login'} 
      onSuccessEvent={() => { console.log("onLoginSuccessedEvent");  }}
      onCloseEvent={() => { console.log("onCloseEvent"); setAppMode(''); setlaunchApp(false) }} /> */}


      <Script src="https://www.tryonhub.ai/tryonhub.min.js" />


    </>
  )
}

