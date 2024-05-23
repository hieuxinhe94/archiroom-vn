import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Progress, Skeleton, useDisclosure } from '@nextui-org/react'
import Link from 'next/link'
import React, { useState } from 'react';
import { BizResult } from './bizGenerate';

export default function BizImagePreview(props) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [images, setImages] = useState<string[]>(props.images ?? [])
    const [resultList, setResultList] = useState<BizResult[]>(props.resultList)
    const [index, setIndex] = useState((props.indexPreviewing  >= props.resultList?.length) ? 0: props.indexPreviewing)
    
    
    
    return (
        <>
            <Modal
                backdrop="opaque"
                isOpen={true}
                onClose={props.onClose}
                size='full'
                onOpenChange={onOpenChange}
                radius="lg"
                classNames={{
                    body: "py-6",
                    backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
                    base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
                    header: "border-b-[1px] border-[#292f46]",
                    footer: "border-t-[1px] border-[#292f46] mb-12",
                    closeButton: "bg-white hover:bg-white/5 active:bg-white/10 mr-12 mt-4 ",
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Preview: {index + 1}/{images?.length} images</ModalHeader>
                            <ModalBody>
                                <div id="indicators-carousel" className="relative w-full" data-carousel="static" style={{
                                                    height: "80%" 
                                                }} >

                                    <div className="relative  overflow-hidden rounded-lg h-[90%] lg:h-[100vh]">

                                        {
                                            images && images.map((url, i) => (
                                                <div key={i} className={`${i == index ? "block" : "hidden"} duration-700 ease-in-out" data-carousel-item="active"`}  style={{
                                                    height: "80%" 
                                                }}>
                                                    <img src={url}
                                                        style={{
                                                            width: "auto", 
                                                            objectFit: "fill",
                                                            paddingBottom: "100px"
                                                        }}
                                                        className="absolute block w-auto mx-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 mt-12 lg:mt-0 h-[60vh] lg:h-[90vh]" alt="..." />
                                                </div>
                                            ))
                                        }

                                    </div>

                                    <div className="absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-5 left-1/2">
                                        {
                                            images && images.map((url, i) => (
                                                <button key={i} type="button" className="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to={i}></button>
                                            ))
                                        }
                                    </div>

                                    <button onClick={() => setIndex(index - 1)} type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
                                            </svg>
                                            <span className="sr-only">Previous</span>
                                        </span>
                                    </button>
                                    <button onClick={() => setIndex(index + 1)} type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                                            </svg>
                                            <span className="sr-only">Next</span>
                                        </span>
                                    </button>
                                </div>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="secondary" variant="light" onPress={props.onClose}>
                                    Close
                                </Button>
                                <Button className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20" onPress={props.onClose}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

