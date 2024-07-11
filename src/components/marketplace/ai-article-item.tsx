import { Avatar, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Progress, Skeleton } from '@nextui-org/react'
import Link from 'next/link'
import React, { useState } from 'react';
import VideoPlayer from './video-player';
import QuickPlayAI from './quickPlayAI';
import { useRouter } from 'next/router';

export default function AIArticleItem({ product, isSelecting = false }) {
  const router = useRouter();
  const [isOpenDetail, setIsOpenDetail] = useState<boolean>(isSelecting);
  const [isPlayVideo, setIsPlayVideo] = useState<boolean>(false);
  const [isPlayTryIt, setIsPlayTryIt] = useState<boolean>(false);


  return (
    <div>
      <div onClick={() => { console.log('onclicked'); setIsOpenDetail(!isOpenDetail); router.push(`?product=${product.code}`); }} key={product} className="relative py-1 hover:opacity-100 bg-slate-800 rounded-xl  text-white">

        <div
          style={{
            backgroundImage: "url('" + product.image + "')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}

          className="rounded-lg h-[260px] w-full px-1">
          <div className="w-11 rounded-lg  px-1">
            <img
              className=" rounded-lg"
              src="/logo-s.png"
            />
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
          <Modal size={(product.fullscreen && isPlayTryIt) ? "full" : "5xl"} className='overflow-y-auto ' isOpen={true}
            onOpenChange={() => { console.log('aaaaaaaaaaaa') }}
            isDismissable={false}
            isKeyboardDismissDisabled={false}

            onClose={() => { console.log('closed'); setIsOpenDetail(false) }}>
            <ModalContent>
              {(onClose) => (
                <>
                  {
                    isPlayTryIt ? (<QuickPlayAI config={product} onCloseEvent={() => { setIsPlayTryIt(!isPlayTryIt) }} />) : (<IntroduceModal product={product} />)
                  }
                  {
                    !(product.fullscreen && isPlayTryIt) && (
                      <ModalFooter className='pb-6'>
                        <a onClick={() => { setIsOpenDetail(false); setIsPlayTryIt(false); }}
                          className=" cursor-pointer shadow-small inline-flex ring-1 items-center justify-center rounded-full mx-2 py-2 px-4 text-sm focus:outline-none ring-slate-200 text-slate-700 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:ring-slate-300"
                          color="slate"
                        >
                       
                          <span className="mx-3"> Đóng cửa sổ</span>
                        </a>


                        {!isPlayTryIt && (<Button className="flex cursor-pointer group shadow-small inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900"
                          onClick={() => { setIsPlayTryIt(!isPlayTryIt); }}
                        >
                          Dùng thử ngay bây giờ
                        </Button>)}

                      </ModalFooter>)
                  }

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
        <h1 className='py-1 font-bold text-xl'>{product.title}</h1>


        <div className="flex  bg-content1   mb-4">
          {/* <a className="w-1/2 flex group shadow-small inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900"
            color="slate"
            href="/authenticate"
          >
            Nhận 3 tháng dùng thử
          </a> */}
          {/* <a
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
          </a> */}


        </div>



      </div>
      <div className="w-full lg:w-1/2 lg:col-span-4 p-2 lg:px-4 lg:p-12">
        <span className='font-bold'></span>
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

