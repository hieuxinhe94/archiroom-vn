import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import TypeIt from "typeit-react";

const DynamicComponentWithNoSSR = dynamic(
  () => import("./ChatbotCustomLogic"),
  { ssr: false }
);

const ChatbotCustomView = ({ currentTheme }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("This will run after 1 second!");
      setVisible(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="fixed bottom-5 right-10 w-1/4 h-1/2 rounded-xl bot-bg "
      style={{
        backgroundColor: currentTheme.secondary,
        backgroundImage: visible ? "" : "url('chatbot-bg-video-unscreen.gif')",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
      }}
    >
      {visible && (
        <div
          className="rounded-xl relative h-full"
          data-aos="fade-up"
          data-aos-duration={2000}
        >
          <div className="flex items-center justify-center -mt-3 ">
            {/* <svg
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
            </svg> */}

            <div className="rounded-xl border p-1 border-indigo-500 bg-indigo-500 justify-center">
              {" "}
              <div
                className="rounded-xl border border-indigo-500 bg-indigo-500 justify-center w-8 h-8 animate-pulse text-white"
                style={{
                  backgroundColor: currentTheme.secondary,
                  backgroundImage: "url('chatbot-bg-video-unscreen.png')",
                  backgroundSize: "contain",
                  backgroundPosition: "0 1px",
                }}
              />{" "}
            </div>
          </div>

          <div className=" lg:mx-3 mt-2 flex flex-col sm:items-center justify-between sm:gap-2">
            {visible && (
              <div className="hidden lg:flex items-center gap-1 text-gray-500">
                <p
                  className="text-xs mx-1 font-medium text-gray-300"
                  onClick={() => {}}
                >
                  CHATBOT xây dựng trên nền{" "}
                  <strong className="rounded-xl mt-1 border border-indigo-500 dark:bg-indigo-800  px-3 py-1 text-[10px] font-medium text-white hover:underline cursor-pointer">
                    Microsoft AI
                  </strong>
                </p>
              </div>
            )}

            <div className="flex-1 px-4 py-4 overflow-y-auto  w-full text-xs ">
              <div className="flex items-center mb-4 w-full ">
                <div className="flex-none flex flex-col items-center space-y-1 mr-4">
                  <img
                    className="rounded-full w-10 h-10 p-2"
                    src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  />
                  <a href="#" className="block hover:underline">
                    Simplify
                  </a>
                </div>
                <div className="flex-1 bg-indigo-400 text-white p-2 rounded-lg mb-2 relative ">
                  <div className="">
                    <TypeIt
                      options={{
                        strings: [
                          `  Xin chào, tôi là chatbot được xây dựng trên nền tảng `,
                          `Azure AI của Microsoft, tôi rất hân hạnh phục vụ bạn.`,
                        ],
                        speed: 8,
                        startDelay: 3000,
                        waitUntilVisible: true,
                      }}
                    ></TypeIt>
                  </div>

                  <div className="absolute left-0 top-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-indigo-400"></div>
                </div>
              </div>

              {/* <div className="flex items-center flex-row-reverse mb-4">
                <div className="flex-none flex flex-col items-center space-y-1 ml-4">
                  <img
                    className="rounded-full w-10 h-10"
                    src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  />
                  <a href="#" className="block text-xs hover:underline">
                    Simplify
                  </a>
                </div>
                <div className="flex-1 bg-indigo-100 text-gray-800 p-2 rounded-lg mb-2 relative">
                  <div>
                    strokeLinejoin Lorem ipsum dolor sit amet, consectetur
                    adipisicing elit.Lorem ipsum dolor sit amet, consectetur
                    adipisicing elit.
                  </div>

                  <div className="absolute right-0 top-1/2 transform translate-x-1/2 rotate-45 w-2 h-2 bg-indigo-100"></div>
                </div>
              </div> */}
            </div>
          </div>
          <DynamicComponentWithNoSSR />
          <div className="fixed flex border-t p-2  w-full bottom-0 text-xs">
            <div className="flex w-full mx-2">
              <input
                id="txtChat"
                className="w-full rounded-full border border-gray-200 p-2 text-gray-800"
                type="text"
                defaultValue=""
                placeholder="Enter something...."
              />
            </div>

            <div>
              <button
                id="btnSend"
                className="inline-flex bg-indigo-50 rounded-full p-2"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-indigo-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotCustomView;
