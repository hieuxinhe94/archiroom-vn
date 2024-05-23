import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Progress,
  useDisclosure,
} from '@nextui-org/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { useCallback, useState } from 'react'
import React from 'react'
import closeIcon from '../components/background-images/closeIcon.svg'
import modalLogo from '../components/background-images/modal-logo.svg'
import { getCurrentUserByBrowser } from './try-on-plugin'
import { BizAffiliateProduct } from '~/components/biz/bizAffiliateProduct'
import { vtoService } from '~/services/VTOService'
import { ProductItem } from '~/components/ProductItem'


export default function CrawlingPopup({ status = false, onCloseEvent, onNextEvent, currentStep = 0, productUrl = '' }) {
  const router = useRouter()
  const { slug } = router.query
  const [currentUser, setCurrentUser] = useState<UserEntity>(getCurrentUserByBrowser())
  const { isOpen, onOpen, onOpenChange } = useDisclosure({
    isOpen: status,
    onClose: onCloseEvent,
  })
  const [step, setStep] = useState(currentStep)
  const [isLoading, setIsLoading] = useState(false)
  const [crawlingUrl, setCrawlingUrl] = useState("");
  const [crawlingTitle, setCrawlingTitle] = useState(null);
  const [isCrawling, setIsCrawling] = useState(true);
  const [crawlingProduct, setCrawlingProduct] = useState<BizAffiliateProduct>();

  React.useEffect(() => {
    console.log("onCrawlingUrlAmazon")
    onCrawlingUrlAmazon(productUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productUrl]);


  const onCrawlingUrlAmazon = useCallback(async (url: string) => {

    setIsCrawling(true);
    setCrawlingUrl(url);
    await vtoService.crawAmazoneProduct([url]).then(
      (res) => {

        console.log(res);
        let affiliateProducts: BizAffiliateProduct[] = [];
        Array.from(res?.data).forEach((page: any) => {
          setCrawlingTitle((crawlingTitle ?? '') + ',' + page.title)
          affiliateProducts.push({
            bizId: ("000"),
            name: page.title?.trim(),
            desc: page.detail?.trim(),
            price: Number.parseInt(page.price.replace('$', '')),
            priceText: page.price,
            oldPrice: Number.parseInt(page.price?.replace('$', '')),
            images: [page.image],
            affiliateUrl: page.link,
            affiliateText: "Buy in Amazon",
            affiliateProvider: "Amazon"
          });
        });
        setCrawlingProduct(affiliateProducts[0]);
        setIsCrawling(false)
      }
    ).catch((e) => {

    }).finally(() => {
      // temp:
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="scroll-smooth md:scroll-auto" id="fullpage">
      <NextSeo
        title={`${'TryOnHub.AI'}`}
        description={'' || ''}
        canonical={`/`}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />

      <Modal
        classNames={{
          closeButton: 'hidden',
        }}
        scrollBehavior="inside"
        isDismissable={false}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        size="5xl"
        className="px-[20px] py-[40px] lg:px-[60px] lg:py-[50px]"
      >
        <ModalContent className="relative">
          {(onClose) => (
            <>
              <ModalBody>
                <Button
                  onPress={() => {
                    if (isLoading) {
                      alert("Your image still processing. Please wait for our AI a second to think!....")
                      return;
                    }

                    onClose()
                    setStep(0)
                  }}
                  className="bg-transparent absolute right-0 top-[20px]"
                >
                  <Image
                    src={closeIcon}
                    width={20}
                    height={20}
                    alt="Try On Step Image"
                  />
                </Button>
                {step === 0 ? (
                  <>
                    <h2 className="text-black text-base lg:text-[30px] font-bold mb-[60px] flex items-center gap-[10px]">
                      <Image
                        src={modalLogo}
                        width={42}
                        height={42}
                        alt="Try On Step Image"
                        className="w-[30px] h-[30px] lg:w-[42px] lg:h-[42px]"
                      />
                      Hi, We are fetching the URL that you provided...
                    </h2>
                    {
                      isCrawling && (<div className='w-full'>
                        <div className='mt-12'>
                          {productUrl}
                        </div>
                        <div className='mt-12'>
                          <Progress
                            size="sm"
                            isIndeterminate
                            aria-label="Loading..."
                            className="max-w-md"
                          />
                        </div>
                      </div>)}

                    {
                      (!isCrawling && crawlingProduct) && (<ProductItem product={crawlingProduct} index={0} />)
                    }
                  </>
                ) : null}


              </ModalBody>
              <ModalFooter className="flex-col lg:flex-row">
                {step === 0 ? (
                  <Button
                    onPress={() => onNextEvent(crawlingProduct)}
                    className="w-full lg:w-auto text-white hover:shadow-purple-300 hover:shadow-[0_0_20px_5px_rgba(0,0,0,0.1)] duration-100 font-medium rounded-full bg-gradient-to-r from-purple-gd to-blue-gd px-[50px]"
                    data-aos="zoom-in"
                    data-aos-easing="ease-in-out"
                    data-aos-delay={1600}
                    data-aos-duraion={1000}
                  >
                    Ok, Let’s try!
                  </Button>
                ) : null}


              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
