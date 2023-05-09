import React, { useState } from "react";
import Head from "next/head";
import { pageInfo } from "../Constants/userinfo";
import TypeIt from "typeit-react";

const ChatbotHead = ({ currentTheme, onClickDetail }) => {
  const [visible, setVisible] = useState(true);
  const [tryItvisible, setTryItvisible] = useState(false);
  const [variable, setVariable] = useState([
    Math.floor(Math.random() * 4) + 1,
    Math.floor(Math.random() * 4) + 1,
    Math.floor(Math.random() * 4) + 1,
    Math.floor(Math.random() * 4) + 1,
    Math.floor(Math.random() * 4) + 1,
  ]);

  const SuperStrong = ({ children }) => {
    return <strong style={{ fontStyle: "bold" }}>{children}</strong>;
  };

  return (
    <>
      {" "}
      {visible && (
        <div className="">
          <div className="flex items-center justify-center -mt-3 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="rounded-xl border border-indigo-500 bg-indigo-500  justify-center w-8 h-8 animate-pulse text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
              />
            </svg>
          </div>

          <div className="col-start-1 col-end-8 p-2 rounded-lg ">
            <div className="flex flex-row items-start ">
              <div
                style={{
                  backgroundColor: currentTheme.mainColor,
                  color: currentTheme.textColor,
                }}
                className="relative text-justify  text-left lg:mx-2 leading-relaxed ml-1 text-sm py-2 px-1 rounded-xl "
              >
                <TypeIt
                  options={{
                    strings: [
                      `Xu hướng Chuyển đổi số <SuperStrong>(Digital Transformation)</SuperStrong> 
                đang trở thành một trong những xu hướng chính của thế giới kinh doanh trong thời
                gian gần đây. Nó bao gồm việc sử dụng công nghệ số và dữ liệu để
                cải thiện các quy trình kinh doanh và tạo ra giá trị cho khách
                hàng. `,
                      `Simplift.AI định vị `,
                      `Là cầu nối vững chắc giúp doanh nghiệp triển khai những công nghệ mới nhanh chóng, hiệu quả.`,
                    ],
                    speed: 8,
                    startDelay: 3000,
                    waitUntilVisible: true,
                  }}
                ></TypeIt>
                {tryItvisible && (
                  <span className="text-sm">
                    <a href="">Trò chuyện</a>
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 lg:mx-3 my-2 sm:flex sm:items-center justify-between sm:gap-2">
            {visible && (
              <div className="hidden lg:flex items-center gap-1 text-gray-500">
                <svg
                  className="h-4 w-4 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <p
                  className="text-xs mx-1 font-medium text-gray-300"
                  onClick={() => {
                    setVisible(false);
                    onClickDetail();
                  }}
                >
                  Trò chuyện ngay với{" "}
                  <strong className="rounded-xl mt-1 border border-indigo-500 dark:bg-indigo-800  px-3 py-1 text-[10px] font-medium text-white hover:underline cursor-pointer">
                    SimpleGPT
                  </strong>{" "}
                </p>
              </div>
            )}

            {/* <div
          onClick={() => {
            setVisible(!visible);
          }}
          className="flex items-center gap-1 text-gray-500 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-4 w-4 text-gray-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
            />
          </svg>

          <p className="text-xs mx-1 font-medium text-gray-500">
            {" "}
            {visible ? "Thu gọn" : "Mở ChatGPT"}
          </p>
        </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotHead;
