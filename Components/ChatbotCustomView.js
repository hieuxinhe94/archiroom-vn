import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import TypeIt from "typeit-react";

const DynamicComponentWithNoSSR = dynamic(
  () => import("./ChatbotCustomLogic"),
  { ssr: false }
);

const ChatbotCustomView = ({ currentTheme }) => {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(true);
  const [activeChat, setActiveChat] = useState(false);
  const [activeOption, setActiveOption] = useState(false);
  const [conversationsArr, setConversationsArr] = useState([]);
  const [count, setCount] = useState(0);

  const [botStyle, setBotStyle] = useState("");
  const [input, setInput] = useState("");
  const [answer, setAnswer] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("This will run after 3 second!");
      setVisible(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer2 = setTimeout(() => {
      console.log("This will run after 8 second!");

      setActiveChat(true);
    }, 8000);
    return () => clearTimeout(timer2);
  }, []);

  const addMessage = (type, text) => {
    let newMessage = {
      type: type,
      title: text,
      code: "QnABot",
    };
    setConversationsArr((c) => [...c, newMessage]);

    // Scroll to the end
    let scrollchat = document.getElementById("scrollchat");
    scrollchat.scrollTop = scrollchat.scrollHeight;
  };

  const onSubmit = () => {
    event.preventDefault();

    addMessage("user", input);
    setInput("");
    setCount((c) => c + 1);

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open(
      "GET",
      "https://api.trustcontact.net/api/Language?question=" + input
    );
    xhr.setRequestHeader(
      "Cookie",
      "ARRAffinity=22a7daa836b64a8ce56c907737553d08297ff2e76cd06a1f52c29956b9a85c17; ARRAffinitySameSite=22a7daa836b64a8ce56c907737553d08297ff2e76cd06a1f52c29956b9a85c17"
    );
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        var jsonResponse = JSON.parse(xhr.responseText);
        addMessage(
          "self",
          jsonResponse.shortAnswer?.text ?? jsonResponse.answer
        );
        setCount((c) => c + 1);
      }
    };
  };

  return (
    <>
      {active && (
        <div
          className="fixed bottom-5 z-50 right-10  rounded-2xl bot-bg border-[0.1px] border-indigo-500"
          style={{
            backgroundColor: currentTheme.secondary,
            backgroundImage: visible
              ? ""
              : "url('chatbot-bg-video-unscreen.gif')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            height: "38rem",
            width: "28rem",
          }}
        >
          {visible ? (
            <div
              className="rounded-xl relative h-full"
              data-aos="fade-up"
              data-aos-duration={2000}
            >
              <div className="flex justify-between  -mt-3 ">
                <div className="mt-3 px-3">
                  <div
                    className="dot red "
                    onClick={() => {
                      setActive(false);
                    }}
                  ></div>
                  <div className="dot amber"></div>
                  <div className="dot green"></div>
                </div>
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
                <div className="mt-5 px-3 w-16"></div>
              </div>

              <div
                className="flex flex-col sm:items-center justify-between sm:gap-2"
                style={{ height: "28em" }}
              >
                <div
                  id="scrollchat"
                  className="flex-1 px-4 pt-4 overflow-y-auto  w-full text-xs "
                >
                  <div className="px-2">
                    <div
                      className="flex gap-6 lg:gap-2"
                      data-aos="fade-up"
                      data-aos-delay={100}
                      data-aos-duration={100}
                    >
                      {chatbotTypes.map((item, i) => (
                        <div
                          key={i}
                          className={
                            (botStyle === item.code
                              ? "bg-indigo-400/50"
                              : "bg-indigo-400/10") +
                            " flex items-center rounded-xl lg:hover:bg-indigo/10"
                          }
                        >
                          <div className="">
                            <div
                              onClick={() => setBotStyle(item.code)}
                              className="inline-flex items-center justify-center p-1 rounded-lg border-[0.5px] border-white/10 cursor-pointer"
                              href={item.code}
                            >
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                aria-hidden="true"
                                className="h-6 w-6 flex-none"
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

                              <span className="px-2 h-full w-full flex items-center">
                                {item.title}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center my-3 w-full ">
                    <div
                      className="flex-1 bg-indigo-500/10 text-white/50 p-2 rounded-lg mb-2 relative"
                      style={{ width: "22rem" }}
                    >
                      <div className="">
                        <TypeIt
                          options={{
                            strings: [
                              `Xin chào, tôi là SFA bot. Tôi được thiết kế để học tự động từ văn bản và trả lời trong phạm vi xác định.`,
                              "Trong demo này, hãy trò chuyện về sản phẩm mới kính vision pro của Apple với tôi nhé !.",
                            ],
                            speed: 10,
                            startDelay: 100,
                            waitUntilVisible: true,
                            cursor: false,
                          }}
                        ></TypeIt>
                      </div>
                    </div>
                  </div>

                  {activeChat &&
                    conversationsArr &&
                    conversationsArr.map((item, i) => (
                      <div key={i}>
                        {item.type == "user" && (
                          <div className="flex items-center  flex-row-reverse my-2 overflow-hidden">
                            <div className="items-end pl-3 space-y-1">
                              <div className="rounded-full w-10 h-10 items-center flex bg-indigo-400/20 justify-center">
                                <a className="block text-xs hover:underline">
                                  You
                                </a>
                              </div>
                            </div>
                            <div className="flex-1  mb-2 relative">
                              <div className="my-1 flex justify-end text-white ">
                                <span className="bg-indigo-400/20 p-3 rounded-lg">
                                  {item.title}
                                </span>
                              </div>
                              <div className="absolute right-0 top-1/2 transform translate-x-1/2 rotate-45 w-2 h-2 bg-indigo-400/30"></div>
                            </div>
                          </div>
                        )}

                        {item.type == "self" && (
                          <div className="flex items-center flex-row-reverse my-2 overflow-hidden">
                            <div className="flex-1 bg-indigo-400/20 text-white p-2 rounded-lg mb-2 relative">
                              <div
                                style={{ marginLeft: "-7px" }}
                                className="absolute left-0 top-1/2 transform translate-x-1/2 rotate-45 w-2 h-2 bg-indigo-400/30"
                              ></div>
                              <div className="my-1">
                                <TypeIt
                                  options={{
                                    strings: [item.title],
                                    speed: 10,
                                    startDelay: 100,
                                    waitUntilVisible: true,
                                    cursor: false,
                                  }}
                                ></TypeIt>
                              </div>
                            </div>
                            <div className="items-end pr-3 space-y-1">
                              <div className="rounded-full w-10 h-10 items-center flex bg-gray-200/10 justify-center">
                                <a className="block text-xs hover:underline">
                                  AI
                                </a>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
              <DynamicComponentWithNoSSR />
              <div className="fixed flex border-t p-2  w-full bottom-0 text-xs">
                <div className="relative inline-block text-left">
                  <button
                    id="btnOption"
                    className="inline-flex bg-indigo-500/10 rounded-full p-2"
                    type="button"
                    onClick={() => setActiveOption(!activeOption)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="text-center w-5 h-5 text-gray-300/80"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                      />
                    </svg>
                  </button>
                  {activeOption && (
                    <div
                      className="absolute bottom-14 z-10 mt-2 w-56 origin-top-right rounded-md bg-indigo-400/20 shadow-lg ring-1 ring-black focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="menu-button"
                      tabIndex="-1"
                    >
                      <div className="py-1" role="none">
                        <a
                          href="#"
                          className="text-white bg-indigo-500/10 block my-1 px-4 py-2 text-sm"
                          role="menuitem"
                          tabIndex="-1"
                          id="menu-item-0"
                        >
                          Khởi động lại chat
                        </a>

                        <a
                          href="#"
                          className="text-white bg-indigo-500/10 block my-1 px-4 py-2 text-sm"
                          role="menuitem"
                          tabIndex="-1"
                          id="menu-item-2"
                        >
                          Xem thông số kỹ thuật
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex w-full mx-2">
                  <input
                    id="txtChat"
                    className="w-full rounded-full border border-gray-200 p-2 text-black focus:border-0"
                    type="text"
                    value={input}
                    onInput={(e) => setInput(e.target.value)}
                    placeholder="Enter something...."
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        onSubmit();
                      }
                    }}
                  />
                </div>

                <div>
                  <button
                    id="btnSend"
                    className="inline-flex bg-indigo-50 rounded-full p-2"
                    onClick={(event) => {
                      onSubmit();
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="text-center w-5 h-5 text-gray-800"
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
      )}
    </>
  );
};

const chatbotTypes = [
  { title: "Chatbot Q&A", code: "QnABot" },
  { title: "Ecommerce Bot", code: "EcommerceBot" },
];

const conversations = [{ type: "user", title: "Chatbot Q&A", code: "QnABot" }];

export default ChatbotCustomView;
