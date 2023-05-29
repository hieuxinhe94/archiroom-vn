import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import TypeIt from "typeit-react";

const DynamicComponentWithNoSSR = dynamic(
  () => import("./ChatbotCustomLogic"),
  { ssr: false }
);

const ChatbotCustomView = ({ currentTheme }) => {
  const [visible, setVisible] = useState(false);
  const [activeChat, setActiveChat] = useState(false);
  const [conversationsArr, setConversationsArr] = useState(conversations);
  const [botStyle, setBotStyle] = useState("");
  const [input, setInput] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("This will run after 3 second!");
      setVisible(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer2 = setTimeout(() => {
      console.log("This will run after 1000 second!");

      setActiveChat(true);
    }, 8000);
    return () => clearTimeout(timer2);
  }, []);

  return (
    <div
      className="fixed bottom-5 right-10 w-1/4 h-3/5 rounded-2xl bot-bg border-[0.1px] border-indigo-500"
      style={{
        backgroundColor: currentTheme.secondary,
        backgroundImage: visible ? "" : "url('chatbot-bg-video-unscreen.gif')",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
      }}
    >
      {visible ? (
        <div
          className="rounded-xl relative h-full"
          data-aos="fade-up"
          data-aos-duration={2000}
        >
          <div className="flex items-center justify-center -mt-3 ">
            <div className="rounded-xl border p-1 border-indigo-500 bg-indigo-500/50 justify-center">
              {" "}
              <div
                className="rounded-xl border border-indigo-500  justify-center w-8 h-8 animate-pulse text-white"
                style={{
                  backgroundColor: currentTheme.secondary,
                  backgroundImage: "url('chatbot-bg-video-unscreen.png')",
                  backgroundSize: "contain",
                  backgroundPosition: "0 1px",
                }}
              />{" "}
            </div>
          </div>

          <div className="  mt-2 flex flex-col sm:items-center justify-between sm:gap-2">
            <div className="flex-1 px-4 pt-4 overflow-y-auto  w-full text-xs ">
              <div className="flex items-center mb-2 w-full ">
                <div className="flex-none flex flex-col items-center space-y-1 mr-4">
                  <div className="rounded-full w-10 h-10 items-center flex bg-gray-200/10 justify-center">
                    SPI
                  </div>
                </div>
                <div className="flex-1 bg-indigo-400/10 text-white p-2 rounded-lg mb-2 relative">
                  <div className="">
                    <TypeIt
                      options={{
                        strings: [
                          `Xin chào, tôi là SFA bot. Hãy khám phá những khả năng của tôi nhé. Rất hân hạnh phục vụ bạn!`,
                        ],
                        speed: 10,
                        startDelay: 100,
                        waitUntilVisible: true,
                      }}
                    ></TypeIt>
                  </div>
                </div>
              </div>

              <div class="px-2">
                <div
                  class="flex gap-6 lg:gap-2"
                  data-aos="fade-up"
                  data-aos-delay={2000}
                  data-aos-duration={1000 * 2}
                >
                  {chatbotTypes.map((item, i) => (
                    <div
                      key={i}
                      class={
                        (botStyle === item.code
                          ? "bg-indigo-400/50"
                          : "bg-indigo-400/10") +
                        " flex items-center rounded-xl lg:hover:bg-indigo/10"
                      }
                    >
                      <div class="">
                        <div
                          onClick={() => setBotStyle(item.code)}
                          class="inline-flex items-center justify-center p-2 rounded-lg border-[0.5px] border-white/10 cursor-pointer"
                          href={item.code}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden="true"
                            class="h-6 w-6 flex-none"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="11.5"
                              stroke="#D4D4D4"
                            ></circle>
                            <path
                              d="M9.5 14.382V9.618a.5.5 0 0 1 .724-.447l4.764 2.382a.5.5 0 0 1 0 .894l-4.764 2.382a.5.5 0 0 1-.724-.447Z"
                              fill="#A3A3A3"
                              stroke="#A3A3A3"
                            ></path>
                          </svg>

                          <span class="px-2 h-full w-full flex items-center">
                            {item.title}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {activeChat && conversationsArr &&
                conversationsArr.map((item, i) => (
                  <div key={i}>
                    {item.type == "user" ? (
                      <div className="flex items-center flex-row-reverse my-4">
                        <div className="flex-none flex flex-col items-center space-y-1 ml-4">
                          <a href="#" className="block text-xs hover:underline">
                            You
                          </a>
                        </div>
                        <div className="flex-1 bg-indigo-100 text-gray-800 p-2 rounded-lg mb-2 relative">
                          <div>{item.title}</div>

                          <div className="absolute right-0 top-1/2 transform translate-x-1/2 rotate-45 w-2 h-2 bg-indigo-100"></div>
                        </div>
                      </div>
                    ) : (
                      <>bot</>
                    )}
                  </div>
                ))}
            </div>
          </div>
          <DynamicComponentWithNoSSR />
          <div className="fixed flex border-t p-2  w-full bottom-0 text-xs">
            <div>
              <button
                id="btnOption"
                className="inline-flex bg-indigo-50 rounded-full p-2"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-800"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                  />
                </svg>
              </button>
            </div>

            <div className="flex w-full mx-2">
              <input
                id="txtChat"
                className="w-full rounded-full border border-gray-200 p-2 text-black focus:border-0"
                type="text"
                value={input}
                onInput={(e) => setInput(e.target.value)}
                defaultValue=""
                placeholder="Enter something...."
              />
            </div>

            <div>
              <button
                id="btnSend"
                className="inline-flex bg-indigo-50 rounded-full p-2"
                
                onClick={() => {
                  conversationsArr.push({
                    type: "user",
                    title: input,
                    code: "QnABot",
                  });
                  setConversationsArr(conversationsArr);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-800"
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
      ) : (
        <div className="text-xs mx-1 font-medium text-gray-300 w-full h-full items-center justify-center flex">
          <strong className="rounded-xl mt-1 border border-indigo-500 dark:bg-indigo-800  px-3 py-1 text-[10px] font-medium text-white hover:underline cursor-pointer">
            {" "}
            Đang tạo kết nối SimpleGPT
          </strong>{" "}
        </div>
      )}
    </div>
  );
};

const chatbotTypes = [
  { title: "Chatbot Q&A", code: "QnABot" },
  { title: "Ecommerce Bot", code: "EcommerceBot" },
];

const conversations = [{ type: "user", title: "Chatbot Q&A", code: "QnABot" }];

export default ChatbotCustomView;
