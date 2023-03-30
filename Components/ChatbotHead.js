import React, { useState } from "react";
import Head from "next/head";
import { pageInfo } from "../Constants/userinfo";
import TypeIt from "typeit-react";

const ChatbotHead = ({ currentTheme }) => {
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
    <div>
      <h3 className="text-left mx-16 mt-6 text-lg font-bold sm:text-sm text-indigo-800">
        <a href="" className="hover:underline">
          Hãy mô tả ngắn gọn về xu hướng Chuyển đổi số sắp tới?
        </a>
      </h3>
      <div class="col-start-1 col-end-8 p-3 rounded-lg">
        <div class="flex flex-row items-center">
          <div class="flex items-center justify-center h-10 w-10 rounded-full flex-shrink-0">
            <div className="flex items-start ml-2">
              <div
                className="bg-indigo-800/80 sm:grid sm:h-10 sm:w-10 sm:shrink-0 sm:place-content-center sm:rounded-full sm:border-2 sm:border-indigo-500"
                aria-hidden="true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 animate-pulse"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div class="relative bg-gray-200 text-gray-500 text-left mx-6 ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl ">
            <TypeIt
              options={{
                strings: [`Xu hướng Chuyển đổi số
                <SuperStrong>(Digital Transformation)</SuperStrong> đang trở thành
                một trong những xu hướng chính của thế giới kinh doanh trong thời
                gian gần đây. Nó bao gồm việc sử dụng công nghệ số và dữ liệu để
                cải thiện các quy trình kinh doanh và tạo ra giá trị cho khách
                hàng. Các ứng dụng của Chuyển đổi số bao gồm:`, `1. Tối ưu hóa quy
                trình kinh doanh: Các doanh nghiệp sử dụng công nghệ số để tự động
                hóa các quy trình kinh doanh và cải thiện hiệu suất.`,
                ` 2. Phát triển
                sản phẩm mới: Công nghệ số cho phép các doanh nghiệp tìm ra cách
                phát triển sản phẩm mới và tăng cường trải nghiệm khách hàng.`,
                ` 3.
                Phân tích dữ liệu: Công nghệ số giúp các doanh nghiệp thu thập và
                phân tích dữ liệu để đưa ra quyết định tốt hơn.`,
                ` 4. Cải thiện trải
                nghiệm khách hàng: Các doanh nghiệp sử dụng công nghệ số để tăng
                cường trải nghiệm khách hàng và cung cấp dịch vụ tốt hơn.`,
                ` 5. Tăng
                cường an ninh và bảo mật: Công nghệ số giúp các doanh nghiệp bảo
                vệ thông tin và dữ liệu của họ khỏi các mối đe dọa an ninh.`,
                ` Tóm
                lại, xu hướng Chuyển đổi số sẽ đem lại nhiều cơ hội cho các doanh
                nghiệp để tăng cường năng suất, tăng trưởng và cung cấp giá trị
                cho khách hàng.`],
                speed: 8,
                waitUntilVisible: true,
              }}
            >
            </TypeIt>
          </div>
        </div>
      </div>
      <div className="mt-4 lg:mx-3 my-2 sm:flex sm:items-center justify-between sm:gap-2">
        <div className="flex items-center gap-1 text-gray-500">
          <svg
            className="h-4 w-4 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <p className="text-xs mx-1 font-medium text-gray-300">
            Generated 48:32 minutes by{" "}
            <strong className="rounded-xl mt-1 border border-indigo-500 bg-indigo-500 px-3 py-1 text-[10px] font-medium text-white hover:underline cursor-pointer">
              ChatGPT
            </strong>{" "}
          </p>
        </div>

        <div className="flex items-center gap-1 text-gray-500">
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
              d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
            />
          </svg>

          <p className="text-xs mx-1 font-medium text-gray-500">Câu hỏi khác</p>
        </div>
      </div>
    </div>
  );
};

export default ChatbotHead;
