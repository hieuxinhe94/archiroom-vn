import { Button, Card, CircularProgress, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Progress, Skeleton, Snippet, Tab, Tabs } from '@nextui-org/react'
import Link from 'next/link'
import React, { useState } from 'react';
import { StreamingTextResponse, streamText } from 'ai';
import { NextRequest } from 'next/server';
import { useChat } from 'ai/react';
import { openai } from '@ai-sdk/openai';
import axios from 'axios';
import Image from 'next/image'


export default function PlayGroundFilmMaking({ config, onCloseEvent }) {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);
  const [userInput, setUserInput] = useState<string>();

  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<any>([]);
  const [outputImage, setOutputImage] = useState<any>();
  const [outputImageDesc, setOutputImageDesc] = useState<any>();

  const [value, setValue] = React.useState(0);

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    let temp: object[] = [...messages];
    temp.push({ role: 'user', content: prompt })
    setMessages(temp);
    setPrompt('');
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 100 : v + 1));
    }, 1000);
    
    try {
      setIsLoading(true);
      await axios.post('/api/chatgpt-translator', { promt: prompt })
        .then(async (res) => {
          let temp: object[] = [...messages];
          temp.push({ role: 'user', content: prompt })
          temp.push({ role: 'assistant', content: res.data.result });
          setMessages(temp);
          console.log("chatgpt-translator: " + res.data.result);
          // continue parsing to scenario
          setValue((v) => (25));
          await axios.post('/api/chatgpt-image', { prompt: "Make an image about following content: " + res.data.result })
            .then(async (res) => {
              // continue parsing to scenario
              console.log("chatgpt-image response")
              console.log(res.data)
              console.log("chatgpt-image: " + res.data);
              setOutputImage(res.data.result.url)
              setIsLoading(false);
              //setOutputImageDesc(res.data.result.revised_prompt)
              setValue((v) => (50))
              // translate back to vietnamse
              await axios.post('/api/chatgpt-translatorback', { promt: res.data.result.revised_prompt })
                .then(async (res) => {
                  console.log("chatgpt-translator: " + res.data.result);
                  setOutputImageDesc(res.data.result)
                 
                
                  setValue((v) => (75))
                })
                .finally(() => {
               
                  clearInterval(interval);
                });
            }).finally(() => {

            });
        });
    } catch (error) {
      let temp: object[] = [...messages];
      temp.push({ role: 'System', content: 'Error fetching response' });
      setMessages(temp);
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full px-4 hover:opacity-100  rounded-xl  text-white ">
      <div className="flex h-full flex-col justify-center px-2">
        <div className="flex w-full flex-col items-center justify-center ">
          <span
            tabIndex={-1}
            className="flex relative justify-center items-center box-border overflow-hidden align-middle z-0 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 w-14 h-14 text-small bg-default text-default-foreground rounded-full"
          >
            <img
              src="https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/avatar_ai.png"
              className="flex object-cover w-full h-full transition-opacity !duration-500 opacity-0 data-[loaded=true]:opacity-100"
              alt="avatar"
              data-loaded="true"
            />
          </span>
          <h1 className="text-xl font-medium text-default-700">
            Tạo film/video bằng AI
          </h1>
        </div>

        <div className="algin-center flex w-full flex-col  md:overflow-scroll lg:overflow-hidden">
          <div className=" ">
            <Tabs
              aria-label="Options"
            // selectedKey={selected}
            // onSelectionChange={setSelected}
            >
              <Tab key="normal" title="Phim ngắn">
              </Tab>

            </Tabs>
          </div>
        </div>

        {

          !isFirstLoad && (<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 mt-10">
            <div
              className="flex flex-col relative overflow-hidden height-auto text-foreground box-border outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-none rounded-large transition-transform-background motion-reduce:transition-none bg-content2"
              tabIndex={-1}
            >
              <div className="p-1 z-10 w-full justify-start items-center shrink-0 overflow-inherit color-inherit subpixel-antialiased rounded-t-large flex flex-col gap-2 px-4 pb-4 pt-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  className="iconify iconify--solar"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                >
                  <g fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 12V6.719c0-2.19 0-3.285-.707-3.884c-.707-.6-1.788-.42-3.95-.059l-1.055.176c-1.64.273-2.46.41-3.288.41c-.828 0-1.648-.137-3.288-.41l-1.054-.176c-2.162-.36-3.243-.54-3.95.059C3 3.434 3 4.529 3 6.719V12c0 5.49 4.239 8.155 6.899 9.286c.721.307 1.082.46 2.101.46c1.02 0 1.38-.153 2.101-.46C16.761 20.155 21 17.49 21 12Z" />
                    <path
                      strokeLinecap="round"
                      d="M6.5 9c.291-.583 1.077-1 2-1s1.709.417 2 1m3 0c.291-.583 1.077-1 2-1s1.709.417 2 1m-9 5s1.05 1 3.5 1s3.5-1 3.5-1"
                    />
                  </g>
                </svg>
                <p className="text-medium text-content2-foreground">Ví dụ</p>
              </div>
              <div className="relative w-full p-3 flex-auto place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased flex flex-col gap-2">
                <div className="flex min-h-[50px] rounded-medium bg-content3 px-3 py-2 text-content3-foreground">
                  <p className="text-small">
                    Hãy làm phim ngắn giới thiệu về Hồ Chí Minh - Việt Nam
                  </p>
                </div>
                <div className="flex min-h-[50px] rounded-medium bg-content3 px-3 py-2 text-content3-foreground">
                  <p className="text-small">
                    Hãy làm phim ngắn về chiến tranh việt nam 1975
                  </p>
                </div>
              </div>
            </div>
            <div
              className="flex flex-col relative overflow-hidden height-auto text-foreground box-border outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-none rounded-large transition-transform-background motion-reduce:transition-none bg-content2"
              tabIndex={-1}
            >
              <div className="p-3 z-1 w-full justify-start items-center shrink-0 overflow-inherit color-inherit subpixel-antialiased rounded-t-large flex flex-col gap-2 px-4 pb-4 pt-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  className="iconify iconify--solar"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                >
                  <g fill="none" stroke="currentColor">
                    <path
                      strokeWidth="1.5"
                      d="M3.845 7.922a2.883 2.883 0 1 1 4.077-4.077l12.234 12.233a2.884 2.884 0 0 1-4.078 4.078z"
                    />
                    <path strokeLinecap="round" strokeWidth="1.5" d="m6 10l4-4" />
                    <path d="M16.1 2.307a.483.483 0 0 1 .9 0l.43 1.095a.482.482 0 0 0 .272.274l1.091.432a.486.486 0 0 1 0 .903l-1.09.432a.485.485 0 0 0-.273.273L17 6.81a.483.483 0 0 1-.9 0l-.43-1.095a.485.485 0 0 0-.273-.273l-1.09-.432a.486.486 0 0 1 0-.903l1.09-.432a.485.485 0 0 0 .273-.274zm3.867 6.823a.483.483 0 0 1 .9 0l.156.399c.05.125.148.224.273.273l.398.158a.486.486 0 0 1 0 .902l-.398.158a.485.485 0 0 0-.273.273l-.156.4a.483.483 0 0 1-.9 0l-.157-.4a.485.485 0 0 0-.272-.273l-.398-.158a.486.486 0 0 1 0-.902l.398-.158a.485.485 0 0 0 .272-.273zM5.133 15.307a.483.483 0 0 1 .9 0l.157.4a.48.48 0 0 0 .272.273l.398.157a.486.486 0 0 1 0 .903l-.398.158a.484.484 0 0 0-.272.273l-.157.4a.483.483 0 0 1-.9 0l-.157-.4a.484.484 0 0 0-.272-.273l-.398-.158a.486.486 0 0 1 0-.903l.398-.157a.484.484 0 0 0 .272-.274z" />
                  </g>
                </svg>
                <p className="text-medium text-content2-foreground">Khả năng</p>
              </div>
              <div className="relative w-full p-3 flex-auto place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased flex flex-col gap-2">
                <div className="flex min-h-[50px] rounded-medium bg-content3 px-3 py-2 text-content3-foreground">
                  <p className="text-small">
                    Tạo video từ mô tả tiếng Việt
                  </p>
                </div>
                <div className="flex min-h-[50px] rounded-medium bg-content3 px-3 py-2 text-content3-foreground">
                  <p className="text-small">
                    Cho phép người dùng cung cấp các cập nhật thông tin
                  </p>
                </div>

              </div>
            </div>
            <div
              className="flex flex-col relative overflow-hidden height-auto text-foreground box-border outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-none rounded-large transition-transform-background motion-reduce:transition-none bg-content2"
              tabIndex={-1}
            >
              <div className="p-3 z-10 w-full justify-start items-center shrink-0 overflow-inherit color-inherit subpixel-antialiased rounded-t-large flex flex-col gap-2 px-4 pb-4 pt-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  className="iconify iconify--solar"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 7.25a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0V8a.75.75 0 0 1 .75-.75M12 16a1 1 0 1 0 0-2a1 1 0 0 0 0 2"
                  />
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M8.723 2.051c1.444-.494 2.34-.801 3.277-.801c.938 0 1.833.307 3.277.801l.727.25c1.481.506 2.625.898 3.443 1.23c.412.167.767.33 1.052.495c.275.16.55.359.737.626c.185.263.281.587.341.9c.063.324.1.713.125 1.16c.048.886.048 2.102.048 3.678v1.601c0 6.101-4.608 9.026-7.348 10.224l-.027.011c-.34.149-.66.288-1.027.382c-.387.1-.799.142-1.348.142c-.55 0-.96-.042-1.348-.142c-.367-.094-.687-.233-1.027-.382l-.027-.011C6.858 21.017 2.25 18.092 2.25 11.99v-1.6c0-1.576 0-2.792.048-3.679c.025-.446.062-.835.125-1.16c.06-.312.156-.636.34-.9c.188-.266.463-.465.738-.625c.285-.165.64-.328 1.052-.495c.818-.332 1.962-.724 3.443-1.23zM12 2.75c-.658 0-1.305.212-2.92.764l-.572.196c-1.513.518-2.616.896-3.39 1.21a7.137 7.137 0 0 0-.864.404a1.648 1.648 0 0 0-.208.139a.386.386 0 0 0-.055.05a.409.409 0 0 0-.032.074c-.02.056-.042.136-.063.248a7.438 7.438 0 0 0-.1.958c-.046.841-.046 2.015-.046 3.624v1.574c0 5.176 3.87 7.723 6.449 8.849c.371.162.586.254.825.315c.228.059.506.095.976.095s.748-.036.976-.095c.24-.06.454-.153.825-.315c2.58-1.126 6.449-3.674 6.449-8.849v-1.574c0-1.609 0-2.783-.046-3.624a7.423 7.423 0 0 0-.1-.958a1.738 1.738 0 0 0-.063-.248a.408.408 0 0 0-.032-.074a.385.385 0 0 0-.055-.05a1.64 1.64 0 0 0-.208-.14a7.135 7.135 0 0 0-.864-.402c-.774-.315-1.877-.693-3.39-1.21l-.573-.197C13.305 2.962 12.658 2.75 12 2.75"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-medium text-content2-foreground">Hạn chế</p>
              </div>
              <div className="relative w-full p-3 flex-auto place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased flex flex-col gap-2">
                <div className="flex min-h-[50px] rounded-medium bg-content3 px-3 py-2 text-content3-foreground">
                  <p className="text-small">
                    Đôi khi có thể tạo ra thông tin không chính xác
                  </p>
                </div>
                <div className="flex min-h-[50px] rounded-medium bg-content3 px-3 py-2 text-content3-foreground">
                  <p className="text-small">
                    Đôi khi có thể đưa ra những hướng dẫn có hại hoặc thông tin sai lệch.
                  </p>
                </div>
              </div>
            </div>

          </div>)
        }

        <div className=" w-full flex place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased flex  gap-2">


          <div className='w-full lg:w-1/2 p-4'>

            {outputImage && (<Card className='p-4'>
              <p className="text-small font-bold py-1">
                Kịch bản:
              </p>

              <div className='py-1' key={outputImageDesc}>
                {outputImageDesc}
              </div>


            </Card>
            )}

          </div>

          <div className='w-full lg:w-1/2 p-4 text-slate-800'>
            {
              isLoading && (<CircularProgress
                aria-label="Loading..."
                size="lg"
                label={value}
                value={value}
                color="warning"
                showValueLabel={true}
              />)
            }

            {outputImage && (<Card className='p-4 flex items-center justify-center'>
              <p className="text-small font-bold py-1">
                Kết quả:
              </p>
              <Image
                src={outputImage}
                width={290}
                height={290}
                alt="OpenAI Generated"
                className="relative right-[40px] shrink-0"
                data-aos="fade-right"
                data-aos-easing="ease-in-out"
                data-aos-delay={1100}
                data-aos-duraion={1000}
              />
            </Card>)}
            <div>
            </div>
          </div>
        </div>


        <div
          className="group flex flex-col w-full min-h-[40px] mt-10 my-4 bg-slate-800 rounded-xl"
          data-slot="base"
          data-filled="true"
          data-filled-within="true"
        >
          <form onSubmit={handleSubmit}>
            <div
              data-slot="input-wrapper"
              className="relative w-full inline-flex tap-highlight-transparent flex-row items-center px-3 gap-3 bg-default-100 data-[hover=true]:bg-default-200 group-data-[focus=true]:bg-default-100 h-10 min-h-10 rounded-large !h-auto transition-background motion-reduce:transition-none !duration-150 outline-none group-data-[focus-visible=true]:z-10 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-2 group-data-[focus-visible=true]:ring-offset-background py-2 !bg-transparent shadow-none"
              data-has-multiple-rows="true"
              style={{ cursor: "text" }}
            >
              <div
                data-slot="inner-wrapper"
                className="inline-flex w-full h-full box-border items-start group-data-[has-label=true]:items-start relative"
              >
                <input
                  data-slot="input"
                  multiple={true}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onFocus={() => setIsFirstLoad(true)}
                  data-has-end-content="true"
                  className="w-full font-normal bg-transparent !outline-none placeholder:text-foreground-500 focus-visible:outline-none data-[has-start-content=true]:ps-1.5 data-[has-end-content=true]:pe-1.5 resize-none data-[hide-scroll=true]:scrollbar-hide group-data-[has-value=true]:text-default-foreground h-full transition-height !duration-100 motion-reduce:transition-none py-0 pt-1 pl-2 pb-6 !pr-10 text-medium"
                  aria-label="Prompt"
                  placeholder="Hãy nói điều gì đó"
                  id="react-aria7379534788-:r4:"
                  data-hide-scroll="true"
                  title=""
                  style={{ height: "100px !important" }}
                  spellCheck="false"

                />

                <div className="flex items-end justify-center pt-4 gap-2">
                  <button
                    className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-tiny gap-2 rounded-large opacity-disabled pointer-events-none px-0 !gap-0 data-[pressed=true]:scale-[0.97] transition-transform-colors-opacity motion-reduce:transition-none bg-default text-default-foreground min-w-8 w-[150px] h-8 data-[hover=true]:opacity-hover"
                    data-disabled="true"
                    type="submit"

                  >
                    Gửi
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      aria-hidden="true"
                      role="img"
                      className="[&>path]:stroke-[2px] text-default-600 iconify iconify--solar"
                      width={20}
                      height={20}
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M12 20V4m0 0l6 6m-6-6l-6 6"
                      />
                    </svg>
                  </button>
                </div>

              </div>
            </div>
          </form>
        </div>


        <div className="flex min-h-[50px] rounded-medium italic  px-3 py-2 text-content3-foreground">
          <p className="text-small">
            *Phiên bản dùng thử có thể bị hạn chế về thời gian/chất lượng.
          </p>
        </div>
      </div>


    </div >
  )
}

