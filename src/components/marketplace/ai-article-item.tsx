import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Progress, Skeleton } from '@nextui-org/react'
import Link from 'next/link'
import React, { useState } from 'react';
import VideoPlayer from './video-player';
import QuickPlayAI from './quickPlayAI';

export default function AIArticleItem({ product }) {

  const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false);
  const [isPlayVideo, setIsPlayVideo] = useState<boolean>(false);
  const [isPlayTryIt, setIsPlayTryIt] = useState<boolean>(false);


  return (
    <div>
      <div onClick={() => { console.log('onclicked'); setIsOpenDetail(!isOpenDetail) }} key={product} className="relative py-1 hover:opacity-100 bg-slate-800 rounded-xl  text-white">

        <div
          style={{
            backgroundImage: "url('" + product.image + "')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}

          className="rounded-lg h-[260px] w-full px-1">
          <div className="w-11 rounded-lg bg-slate-500 px-1">
            <svg aria-hidden="true" className="h-9 w-9" fill="none">
              <defs>
                <linearGradient
                  id=":r25:"
                  x1="11.5"
                  y1={18}
                  x2={36}
                  y2="15.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset=".194" stopColor="#fff" />
                  <stop offset={1} stopColor="#6692F1" />
                </linearGradient>
              </defs>
              <path
                d="m30 15-4 5-4-11-4 18-4-11-4 7-4-5"
                stroke="url(#:r25:)"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <h3 className="mt-2 text-sm font-medium text-white px-4">
          <button
            className="ui-not-focus-visible:outline-none"
            role="tab"
            type="button"
            aria-selected="false"
            tabIndex={-1}
          >
            <span className="absolute inset-0 " />
            {product.title}
          </button>
        </h3>

        <p className="hidden lg:block my-4 text-sm text-white px-4">
          {product.description}
        </p>
      </div>
      {
        isOpenDetail && (<>
          <Modal size="5xl" className='overflow-y-auto' isOpen={true}
            onOpenChange={() => { console.log('aaaaaaaaaaaa') }}
            isDismissable={false}
            isKeyboardDismissDisabled={false}

            onClose={() => { console.log('closed'); setIsOpenDetail(false) }}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Giới thiệu {product.title}</ModalHeader>
                  {
                    isPlayTryIt ? (<QuickPlayAI  config={product} onCloseEvent={() => {setIsPlayTryIt(!isPlayTryIt)}} />) : (<IntroduceModal product={product} />)
                  }

                  <ModalFooter className='pb-6'>
                    <Button color="danger" variant="light" onClick={() => { setIsOpenDetail(false); setIsPlayTryIt(false); }}>
                      Đóng cửa sổ
                    </Button>
                    {!isPlayTryIt && (<Button className="flex cursor-pointer group shadow-small inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900"
                      onClick={() => { setIsPlayTryIt(!isPlayTryIt); }}
                    >
                      Dùng thử ngay bây giờ
                    </Button>)}

                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>)
      }


      <VideoPlayer url={product.video} isOpenDetail={isPlayVideo} onClose={() => { setIsPlayVideo(!isPlayVideo); }} />

    </div >

  )
}

export function IntroduceModal({ product }) {
  return (<ModalBody>
    <div className='w-full block lg:flex h-auto overflow-y-scroll'>
      <div className="hidden lg:block w-full lg:w-1/2 lg:col-span-4 p-2 lg:p-12">
        <div className="flex  bg-content1   mb-4">
          <a className="w-1/2 flex group shadow-small inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900"
            color="slate"
            href="/authenticate"
          >
            Nhận 3 tháng dùng thử
          </a>
          <a
            className="w-1/2 cursor-pointer shadow-small inline-flex ring-1 items-center justify-center rounded-full mx-2 py-2 px-4 text-sm focus:outline-none ring-slate-200 text-slate-700 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:ring-slate-300"
            color="slate"
          // href={product.video}
          // onClick={() => setIsPlayVideo(true)}
          >
            <svg
              aria-hidden="true"
              className="h-3 w-3 flex-none fill-blue-600 group-active:fill-current"
            >
              <path d="m9.997 6.91-7.583 3.447A1 1 0 0 1 1 9.447V2.553a1 1 0 0 1 1.414-.91L9.997 5.09c.782.355.782 1.465 0 1.82Z" />
            </svg>
            <span className="ml-3">Xem Video</span>
          </a>


        </div>

        <div className="flex flex-col gap-2 rounded-medium bg-content1 p-6 shadow-small">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              role="img"
              className="text-warning-500 iconify iconify--solar"
              width={20}
              height={20}
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M9.153 5.408C10.42 3.136 11.053 2 12 2c.947 0 1.58 1.136 2.847 3.408l.328.588c.36.646.54.969.82 1.182c.28.213.63.292 1.33.45l.636.144c2.46.557 3.689.835 3.982 1.776c.292.94-.546 1.921-2.223 3.882l-.434.507c-.476.557-.715.836-.822 1.18c-.107.345-.071.717.001 1.46l.066.677c.253 2.617.38 3.925-.386 4.506c-.766.582-1.918.051-4.22-1.009l-.597-.274c-.654-.302-.981-.452-1.328-.452c-.347 0-.674.15-1.328.452l-.596.274c-2.303 1.06-3.455 1.59-4.22 1.01c-.767-.582-.64-1.89-.387-4.507l.066-.676c.072-.744.108-1.116 0-1.46c-.106-.345-.345-.624-.821-1.18l-.434-.508c-1.677-1.96-2.515-2.941-2.223-3.882c.293-.941 1.523-1.22 3.983-1.776l.636-.144c.699-.158 1.048-.237 1.329-.45c.28-.213.46-.536.82-1.182z"
              />
            </svg>
            <span className="text-large font-semibold">4.4</span>
            <span className="text-default-500">• (Based on 5 reviews)</span>
          </div>
          <div className="flex flex-col gap-2">
            {[1, 2, 3, 4, 5].map(item =>
            (<div key={item} className="flex items-center w-full">
              <div className="flex items-center w-full">
                <div
                  className="flex flex-col gap-2 w-full"
                  aria-valuenow={21.58273381294964}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuetext="22%"
                  role="progressbar"
                >
                  <div className="flex justify-between w-full">
                    <span className="text-medium w-full" >
                      <span className="text-small">{item} star</span>
                    </span>
                    <span className="text-medium">{50 / item}%</span>
                  </div>
                  <div className="z-0 relative bg-default-300/50 overflow-hidden h-3 rounded-full">
                    <div
                      className="h-full bg-warning rounded-full transition-transform !duration-500"
                      style={{ transform: "translateX(-78.4173%)" }}
                    />
                  </div>
                </div>
              </div>
            </div>))}

            <div className="mt-4 flex w-full flex-col gap-4">
              <button
                className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 border-medium px-4 min-w-20 h-10 text-small gap-2 rounded-full w-full [&>svg]:max-w-[theme(spacing.8)] data-[pressed=true]:scale-[0.97] transition-transform-colors-opacity motion-reduce:transition-none bg-transparent border-default text-foreground data-[hover=true]:opacity-hover"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  focusable="false"
                  tabIndex={-1}
                  className="iconify iconify--solar"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m11.4 18.161l7.396-7.396a10.289 10.289 0 0 1-3.326-2.234a10.29 10.29 0 0 1-2.235-3.327L5.839 12.6c-.577.577-.866.866-1.114 1.184a6.556 6.556 0 0 0-.749 1.211c-.173.364-.302.752-.56 1.526l-1.362 4.083a1.06 1.06 0 0 0 1.342 1.342l4.083-1.362c.775-.258 1.162-.387 1.526-.56c.43-.205.836-.456 1.211-.749c.318-.248.607-.537 1.184-1.114m9.448-9.448a3.932 3.932 0 0 0-5.561-5.561l-.887.887l.038.111a8.754 8.754 0 0 0 2.092 3.32a8.754 8.754 0 0 0 3.431 2.13z"
                  />
                </svg>
                Viết đánh giá
              </button>

            </div>
          </div>
        </div>


      </div>
      <div className="w-full lg:w-1/2 lg:col-span-4 p-2 lg:px-4">
        <span className='font-bold'>Mô tả:</span>
        <div className="flex w-full flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased">
          {product.description}
        </div>
        <div
          className='rounded-xl my-6'
          style={{
            backgroundImage: "url('" + product.image + "')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "400px",
            width: "auto"
          }}></div>
      </div>
    </div>
  </ModalBody>)

}

