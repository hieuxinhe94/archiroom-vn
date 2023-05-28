import { getClient } from "../lib/sanity";
import { useState, useEffect } from "react";
import {
  LocationMarkerIcon,
  MailIcon,
  PhoneIcon,
} from "@heroicons/react/outline";
import { useForm } from "react-hook-form";
import { NextSeo } from "next-seo";
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
  const [message, setMessage] = useState(false);
  // Please update the Access Key in the Sanity CMS - Site Congig Page
  const {
    submit: onSubmit,
  } = () => ({
    from_name: "ContactForm",
    subject: "",
    onSuccess: (msg, data) => {
      setIsSuccess(true);
      setMessage("Cảm ơn bạn. Chúng tôi sẽ liên hệ lại với bạn sớm.");
      reset();
    },
    onError: (msg, data) => {
      setIsSuccess(false);
      setMessage(msg);
    },
  });

  return (
    <>
     <NextSeo
        title={`${"Liên hệ"}`}
        description={"" || ""}
        canonical={`/contact/`}
        
        twitter={{
          cardType: "summary_large_image",
        }}
      />

 
    <div className="w-1/2 mx-auto">
      <h1 className="mt-32 mb-3 text-3xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl dark:text-white"></h1>
      <div className="text-center">
        
      </div>

      <div className="grid my-10 md:grid-cols-2">
        <div className="my-10">
          <h2 className="text-2xl font-semibold dark:text-white">Liên hệ</h2>
          <p className="max-w-sm mt-5 text-justify">
            Bạn có điều gì muốn nói? chúng tôi ở đây để giúp đỡ. Điền vào biểu
            mẫu hoặc gửi email hoặc gọi điện thoại.
          </p>

          <div className="mt-5">
            
        
                        
            <div className="flex items-center mt-2 space-x-2 text-dark-600 dark:text-gray-400">
              <LocationMarkerIcon className="w-4 h-4" />
              <span>44 Lê Ngọc Hân, Hà Nội</span>
            </div>
            <div className="flex items-center mt-2 space-x-2 text-dark-600 dark:text-gray-400">
              <MailIcon className="w-4 h-4" />
              <a href={`mailto:${"siteconfig?.email"}`}>{"siteconfig?.email"}</a>
            </div>

            <div className="flex items-center mt-2 space-x-2 text-dark-600 dark:text-gray-400">
              <PhoneIcon className="w-4 h-4" />
              <a href={`tel:${"siteconfig?.phone "}`}>{"siteconfig?.phone|| "}</a>
            </div>
          </div>

        </div>
        <div>
        <form action="" className="relative rounded-3xl border border-gray-100 bg-white p-8 shadow-2xl shadow-gray-600/10 dark:border-gray-700 dark:bg-gray-800 dark:shadow-none sm:p-12">
                            <div className="absolute inset-0 hidden scale-105 rounded-3xl bg-gradient-to-b from-transparent dark:block dark:to-gray-900/80"></div>
                            <div className="relative">
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">What should we know ?</h2>
                                <div className="mt-8 mb-6 space-y-4">
                                    <div>
                                        <label htmlFor="name" className="mb-2 block text-gray-600 dark:text-gray-300">Your name <span className="text-xl text-red-500 dark:text-red-400">*</span></label>
                                        <input type="text" name="name" id="name" autoComplete="name" className="peer block w-full rounded-lg border border-gray-200 bg-transparent px-4 py-2 text-gray-600 transition-shadow duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 dark:border-gray-700" />
                                        <span className="mt-1 hidden text-sm text-red-500 peer-invalid:block">Helper</span>
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="mb-2 block text-gray-600 dark:text-gray-300">Work email <span className="text-xl text-red-500 dark:text-red-400">*</span></label>
                                        <input type="email" name="email" id="email" autoComplete="email" className="peer block w-full rounded-lg border border-gray-200 bg-transparent px-4 py-2 text-gray-600 transition-shadow duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 dark:border-gray-700" />
                                        <span className="mt-1 hidden text-sm text-red-500 peer-invalid:block">Helper</span>
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="mb-2 block text-gray-600 dark:text-gray-300">Phone <span className="text-xl text-red-500 dark:text-red-400">*</span></label>
                                        <input type="tel" name="phone" id="phone" autoComplete="tel" className="peer block w-full rounded-lg border border-gray-200 bg-transparent px-4 py-2 text-gray-600 transition-shadow duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 dark:border-gray-700" />
                                        <span className="mt-1 hidden text-sm text-red-500 peer-invalid:block">Helper</span>
                                    </div>
                                    <div>
                                        <label htmlFor="company" className="mb-2 block text-gray-600 dark:text-gray-300">Company name <span className="text-xl text-red-500 dark:text-red-400">*</span></label>
                                        <input type="text" name="company" id="company" autoComplete="work" className="peer block w-full rounded-lg border border-gray-200 bg-transparent px-4 py-2 text-gray-600 transition-shadow duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 dark:border-gray-700" />
                                        <span className="mt-1 hidden text-sm text-red-500 peer-invalid:block">Helper</span>
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="mb-2 block text-gray-600 dark:text-gray-300">Message</label>
                                        <textarea name="message" id="message" className="peer block h-28 w-full rounded-lg border border-gray-200 bg-transparent px-4 py-2 text-gray-600 transition-shadow duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 dark:border-gray-700" spellCheck="false"></textarea>

                                        <span className="mt-1 hidden text-sm text-red-500 peer-invalid:block">Helper</span>
                                    </div>
                                </div>

                                <p className="mb-8 text-sm text-gray-600 dark:text-gray-300">By clicking submit below, you agree to the processing of your personal information by PlanetScale as described in the Privacy Policy.</p>

                                <button type="submit" className="relative ml-auto flex h-11 w-max items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition-transform before:duration-300 active:duration-75 active:before:scale-95 dark:before:bg-primaryLight">
                                    <span className="relative text-base font-semibold text-white dark:text-gray-900">Get started</span>
                                </button>
                            </div>
                        </form>
                        
          <form onSubmit={handleSubmit(onSubmit)} className="my-10">
            <input
              type="checkbox"
              id=""
              className="hidden"
              style={{ display: "none" }}
              {...register("botcheck")}
            ></input>

            <div className="mb-5">
              <input
                type="text"
                placeholder="Tiêu đề"
                autoComplete="false"
                className={`w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white rounded-md outline-none dark:placeholder:text-gray-200 dark:bg-gray-900   focus:ring-4  ${
                  errors.name
                    ? "border-red-600 focus:border-red-600 ring-red-100 dark:ring-0"
                    : "border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0"
                }`}
                {...register("name", {
                  required: "Tiêu đề không được để trống",
                  maxLength: 80,
                })}
              />
              {errors.name && (
                <div className="mt-1 text-red-600">
                  <small>{errors.name.message}</small>
                </div>
              )}
            </div>

            <div className="mb-5">
              <label htmlFor="email_address" className="sr-only">
                Email
              </label>
              <input
                id="email_address"
                type="email"
                placeholder="Email"
                name="email"
                autoComplete="false"
                className={`w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white rounded-md outline-none dark:placeholder:text-gray-200 dark:bg-gray-900   focus:ring-4  ${
                  errors.email
                    ? "border-red-600 focus:border-red-600 ring-red-100 dark:ring-0"
                    : "border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0"
                }`}
                {...register("email", {
                  required: "Vui lòng nhập email để chúng tôi liên hệ lại bạn",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Please enter a valid email",
                  },
                })}
              />
              {errors.email && (
                <div className="mt-1 text-red-600">
                  <small>{errors.email.message}</small>
                </div>
              )}
            </div>

            <div className="mb-3">
              <textarea
                name="message"
                placeholder="Thông điệp"
                className={`w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white dark:placeholder:text-gray-200 dark:bg-gray-900   rounded-md outline-none  h-36 focus:ring-4  ${
                  errors.message
                    ? "border-red-600 focus:border-red-600 ring-red-100 dark:ring-0"
                    : "border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0"
                }`}
                {...register("message", {
                  required: "Nhập thông điệp",
                })}
              />
              {errors.message && (
                <div className="mt-1 text-red-600">
                  {" "}
                  <small>{errors.message.message}</small>
                </div>
              )}
            </div>

            <button
              type="submit"
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
    </div>   </>
  );
}
