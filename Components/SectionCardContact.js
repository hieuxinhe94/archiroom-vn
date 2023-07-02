import { getClient } from "../lib/sanity";
import { useState, useEffect } from "react";
import {
  LocationMarkerIcon,
  MailIcon,
  PhoneIcon,
} from "@heroicons/react/outline";
import { useForm } from "react-hook-form";
import { NextSeo } from "next-seo";
export default function SectionCardContact(props) {
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
  const { isMinimize, currentTheme } = props;
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
      <div className="w-1/2 mx-auto my-2">
        <h1 className="mt-32 mb-3 text-2xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl dark:text-white"></h1>
        <div className="text-center"></div>

        <div>
          <form
            onSubmit={(e) => handleSubmit(e)}
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
                    Bạn quan tâm đến dịch vụ nào?
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    {...register("message", {
                      required: "Nhập thông điệp",
                    })}
                    className="peer block h-28 w-full rounded-lg border border-gray-200 bg-transparent px-4 py-2 text-gray-600 transition-shadow duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 dark:border-gray-700"
                    spellCheck="false"
                  ></textarea>

                  <span className="mt-1 hidden text-sm text-red-500 peer-invalid:block">
                    {errors.message && (
                      <div className="mt-1 text-red-600">
                        {" "}
                        <small>{errors.message.message}</small>
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
    </>
  );
}
