import { Avatar, AvatarGroup, Card, Chip, CircularProgress, Progress, Skeleton } from '@nextui-org/react'
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';

import { vtoService } from '~/services/VTOService';

import BizCollections, { BizCollection } from "./bizCollections"
import BizGenerateBatchs, { BizGenerate } from "./bizGenerate"
import BizModels, { BizModel } from "./bizModels"


export default function BizDashboard(props) {
    const router = useRouter()
    const onDeleteAll = useCallback(async () => {
        await vtoService.deleteAll("000").then(
            (res) => {
                

                //props.onBack();
                router.reload()

                setTimeout(() => {
                }, 1000)
            }
        ).catch((e) => {
            
        }).finally(() => {

            // temp:
        });
    }, [router]);

    
    

    return (
        <div className="container " style={{ fontFamily: "sans-serif" }}>
            <div className="grid pt-2">
                <div className="row-span-3 col-span-1 mx-auto">

                    <div
                        onClick={props.onCollectionDetail}
                        style={{ backgroundColor: "#0C0053" }}
                        className=" text-white cursor-pointer flex flex-col relative overflow-hidden height-auto outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-medium rounded-large transition-transform-background motion-reduce:transition-none max-w-2xl lg:max-w-xl my-4 pb-2" >
                        <div className="flex p-3 z-10 w-full items-center shrink-0 overflow-inherit color-inherit subpixel-antialiased rounded-t-large justify-center px-6 pb-0 py-3">
                            <div className="flex">
                                <div className="px-1 flex items-center justify-center h-auto w-max-content" role="group">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </div>
                                <h4 className="text-large px-1">
                                    Create new collection
                                </h4>
                            </div>
                        </div>
                    </div>
                    <BizCardListCollection size={"sm"} {...props} openCollectionDetail={(item) => props.onCollectionDetail(item)} />
                    <br className='my-4' />


                    <div
                        onClick={props.openModelDetail}
                        style={{ backgroundColor: "#0C0053", }}
                        className=" text-white cursor-pointer flex flex-col relative overflow-hidden height-auto outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-medium rounded-large transition-transform-background motion-reduce:transition-none max-w-lg my-4 pb-2" >
                        <div className="flex p-3 z-10 w-full items-center shrink-0 overflow-inherit color-inherit subpixel-antialiased rounded-t-large justify-center px-6  pb-1 pt-3">
                            <div className="flex ">
                                <div className="flex px-1 items-center justify-center h-auto w-max-content" role="group">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </div>
                                <span aria-hidden="true" className="w-px h-px block"
                                    style={{ marginLeft: "0.25rem", marginTop: "0.5rem" }}>
                                </span>
                                <h4 className="text-large px-1 ">
                                    Create new model
                                </h4>

                            </div>
                        </div>
                    </div>
                    <BizCardListModel size={"sm"} {...props} onAddNew={() => props.openModelDetail()} onBack={() => props.onBack()} openModelDetail={(item) => props.openModelDetail(item)} />
                </div>

                <div className="col-span-2 lg:col-span-1 mx-auto">
                    <div
                        onClick={props.onGenerateBatch}
                        style={{ backgroundColor: "#0C0053" }}
                        className=" text-white hover:shadow-purple-700 hover:shadow-[0_0_20px_5px_rgba(0,0,0,0.1)] duration-500 rounded-full  cursor-pointer flex flex-col relative overflow-hidden height-auto text-foreground  bg-content1 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-medium rounded-large transition-transform-background motion-reduce:transition-none max-w-xl my-4 pb-2" >
                        <div className="flex px-3 z-10 w-full items-center shrink-0 overflow-inherit color-inherit subpixel-antialiased rounded-t-large justify-center px-6 pb-0 pt-4">
                            <div className="flex ">
                                <div className="flex px-1 items-center justify-center h-auto w-max-content" role="group">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                                    </svg>
                                </div>
                                <span aria-hidden="true" className="w-px h-px block"
                                    style={{ marginLeft: "0.25rem", marginTop: "0.5rem" }}>
                                </span>
                                <h4 className="px-1 text-large">
                                    Start Generate Lookbook
                                </h4>

                            </div>
                        </div>
                    </div>
                    {
                        props?.currentGenerative && (<BizCardRecentBatch  {...props} openGenerativeDetail={(item) => props.openGenerativeDetail(item)} />)
                    }

                    <br className='my-4' />
                    <BizCardListGeneratives size={"sm"} {...props} openGenerativeDetail={(item) => props.openGenerativeDetail(item)} />
                </div>
                <div className="row-span-2 col-span-2 ">
                    {/* <BizCardBilling /> */}
                </div>
            </div>
        </div>
    )
}


export function BizCardRecentBatch(props) {
    if (props?.allGeneratives == null) return <p>Loading...</p>
    const allGeneratives: BizGenerate[] = props.allGeneratives ?? BizGenerateBatchs;
    //const processingBatch = allGeneratives.findLast(); //(i => i.state === 'processing');
    const recentBatch: BizGenerate = props?.currentGenerative ?? null;
    const percentage = 100 * ((recentBatch?.outputDetail.currentCount as number) ?? 0) / ((recentBatch?.outputDetail?.totalCount as number) ?? 1)


    const allModels: BizModel[] = props?.allModels ?? BizModels;
    const allCollections: BizCollection[] = props?.allCollections ?? BizCollections;;

    const currentCollection = recentBatch?.collectionItemModel;
    const currentModels = recentBatch?.modelListItemModel;
   
    let outputImages = [];
    const outputHDImages = recentBatch?.outputDetail.data[recentBatch?.outputDetail.data.length - 1]?.OUTPUT_IMAGE.split(',')
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [index, setIndex] = useState(0)

    recentBatch?.outputDetail.data.forEach(resultItem => {
        let urls = resultItem?.OUTPUT_IMAGE?.split(',')
        outputImages = outputImages.concat(urls)
    });
    // 
    // 

    // React.useEffect(() => {
    //     const interval = setInterval(() => {
    //         setValue((v) => (v >= 100 ? 0 : v + 1));
    //     }, 500);

    //     return () => clearInterval(interval);
    // }, []);
    return (
        <div className="flex flex-col relative overflow-hidden height-auto text-foreground box-border bg-content1 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-medium rounded-large transition-transform-background motion-reduce:transition-none max-w-xl" tabIndex={-1}>
            <div className="relative flex w-full p-3 flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased px-3 pb-1">
                <div className="relative shadow-black/5 shadow-none rounded-large px-2 ">
                    {/* <Skeleton className="rounded-lg hover:scale-110"> */}
                    <div className="w-full h-[400px] space-y-5 " >
                        {recentBatch?.outputDetail.data?.length ?
                            (
                                <div id="controls-carousel" className="relative w-full" data-carousel="static">

                                    <div className="relative overflow-hidden rounded-lg h-[280px]">
                                        {
                                            outputImages.map((url, i) => (
                                                <div key={i} className={`${i == index ? "block" : "hidden"} rounded-lg mb-[50px] duration-700 ease-in-out`} data-carousel-item>
                                                    <img
                                                        onClick={() => props.onPreViewItem(outputImages, i)}
                                                        key={i} height={"200"} width={"180"}
                                                        src={url} className="absolute rounded-lg object-contain block -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                                                </div>
                                            )
                                            )
                                        }
                                    </div>

                                    <button onClick={() => setIndex(index - 1)} type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                                            </svg>
                                            <span className="sr-only">Previous</span>
                                        </span>
                                    </button>

                                    <button onClick={() => setIndex(index + 1)} type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                            </svg>
                                            <span className="sr-only">Next</span>
                                        </span>
                                    </button>

                                </div>
                            )
                            : (
                                <Skeleton className="rounded-lg">
                                    <div className="h-[200px] rounded-lg bg-default-300"></div>
                                </Skeleton>
                            )
                        }

                        <div className=" flex p-4">
                            <div className="w-2/5 rounded-lg">

                                <div className="w-full items-center">
                                    <AvatarGroup max={3} total={currentModels?.length ?? 10}>
                                        {
                                            currentCollection?.images?.map((url, i) => (
                                                <Avatar key={i} src={url} onClick={() => props.onPreViewItem(Array.from<string>([url]), 0)} />
                                            ))
                                        }
                                    </AvatarGroup>

                                    <p className="text-small text-default-500 h-[40px] overflow-hidden">
                                        {currentCollection?.name}
                                    </p>
                                </div>


                            </div>
                            <div className="w-3/5 rounded-lg">
                                <div className="w-full items-center justify-center">
                                    <AvatarGroup isBordered max={3} total={currentModels?.length ?? 10}>
                                        {
                                            currentModels?.map((model, i) => (
                                                <Avatar key={i} src={Array.from<string>(model?.images)[0]} onClick={() => props.onPreViewItem(Array.from<string>(model?.images), 0)} />
                                            ))
                                        }
                                    </AvatarGroup>
                                    <p className="text-small pl-12 justify-center text-default-500">
                                        {currentModels?.map(x => x.name)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="group inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-unit-3 min-w-unit-16 h-unit-8 text-tiny gap-unit-2 rounded-full [&amp;>svg]:max-w-[theme(spacing.unit-8)] data-[pressed=true]:scale-[0.97] transition-transform-colors-opacity motion-reduce:transition-none  text-default-foreground data-[hover=true]:opacity-hover absolute right-4 top-8 z-10" type="button">
                        {percentage < 100 && (<span> Processing </span>)}
                        {percentage >= 100 && (<> <Chip
                            startContent={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                            }


                        >
                            Completed
                        </Chip></>)}
                    </button>
                </div>
                <span aria-hidden="true" className="w-px h-px block pt-3" style={{ marginLeft: "0.25rem", marginTop: "0.5rem" }}></span>
                <div className="flex flex-col gap-2 px-2">
                    <p className="text-large font-medium">Recent ablum: {recentBatch?.name}</p>
                    <Progress
                        aria-label="Generating..."
                        size="md"
                        isIndeterminate={percentage < 100 ? true : false}
                        value={percentage}
                        color="secondary"
                        showValueLabel={true}
                        label={"AI Generating album..."}
                        className="max-w-lg "
                    />
                    <p className="text-small text-default-400">The AI model is heavy and take some minutes to complete your tasks. Estimate completed after ... minutes.</p>
                </div>
            </div>
            <div className="p-3 h-auto flex w-full items-center overflow-hidden color-inherit subpixel-antialiased rounded-b-large justify-end gap-2">
                {/* 
                    <button className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-unit-4 min-w-unit-20 h-unit-10 text-small gap-unit-2 rounded-medium w-full [&amp;>svg]:max-w-[theme(spacing.unit-8)] data-[pressed=true]:scale-[0.97] transition-transform-colors-opacity motion-reduce:transition-none bg-transparent text-default-foreground data-[hover=true]:bg-default/40" type="button">
                        Cancel
                    </button> 
                */}
                <button
                    onClick={() => { props.openGenerativeResult(recentBatch) }}
                    className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-unit-4 min-w-unit-20 h-unit-10 text-small gap-unit-2 rounded-medium w-full [&amp;>svg]:max-w-[theme(spacing.unit-8)] data-[pressed=true]:scale-[0.97] transition-transform-colors-opacity motion-reduce:transition-none bg-default text-default-foreground data-[hover=true]:opacity-hover" type="button">
                    Open Detail
                </button>

            </div>
        </div>
    )
}


export function BizCardListModel(props) {
    if (props?.allModels == null) return <p>Loading...</p>
    const models = props.allModels ?? BizModels;

    const filteredmodels = (props?.size == "sm") ? models?.slice(0, models.length >= 5 ? 5 : models.length)
        : models;

    return (
        <div className={` ${(props?.size == "sm") ? ' max-w-lg ' : ' max-w-4xl '} `}>
            <div className="flex flex-col relative overflow-hidden height-auto text-foreground box-border bg-content1 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-medium rounded-large transition-transform-background motion-reduce:transition-none " >
                <div className="flex p-3 z-10 w-full items-center shrink-0 overflow-inherit color-inherit subpixel-antialiased rounded-t-large justify-center px-6 pb-0 pt-6">

                </div>
                <div className="relative flex w-full px-3 flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased">
                    <div className="  flex flex-col gap-2">
                        {
                            filteredmodels?.map((item, i) => (
                                <div key={i} id='i'>
                                    <div onClick={() => props.openModelDetail(item)} className="pb-4 cursor-pointer flex items-center justify-between gap-2 rounded-medium p-8 bg-transparent px-3 py-1">
                                        <div className="flex items-center gap-2">
                                            <span className="flex relative justify-center items-center overflow-hidden align-middle z-0 outline-none data-[focus-visible=true]:z-10 w-12 h-12 text-tiny bg-default text-default-foreground rounded-lg ">
                                                {
                                                    item?.images?.length && (<img
                                                        onClick={() => props.onPreViewItem(item.images, i)}
                                                        src={Array.from<string>(item.images)[0]} className="flex object-contain w-full h-full transition-opacity !duration-500 opacity-0 data-[loaded=true]:opacity-100" alt="avatar" data-loaded="true" />)
                                                }
                                            </span>

                                            <p className="text-small text-default-500">{item.name} </p>
                                        </div>
                                        <div className="flex items-center gap-2 max-w-sm">
                                            <p className="text-small text-default-500 overflow-hidden">{item.desc}</p>
                                        </div>
                                        <button onClick={() => props.openModelDetail(item)} className="text-small text-default-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                            </svg>
                                        </button>
                                    </div>
                                    <hr className="shrink-0 bg-divider border-none w-full h-divider" role="separator" />
                                </div>
                            ))
                        }

                    </div>
                </div>
                {/* <div className="p-3 h-auto flex w-full items-center overflow-hidden color-inherit subpixel-antialiased rounded-b-large justify-end gap-2">
                <button onClick={props.onAddNew} className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-unit-3 min-w-unit-16 h-unit-8 text-tiny gap-unit-2 rounded-small [&amp;>svg]:max-w-[theme(spacing.unit-8)] data-[pressed=true]:scale-[0.97] transition-transform-colors-opacity motion-reduce:transition-none bg-default/40 text-default-foreground data-[hover=true]:opacity-hover" type="button">
                    Add New
                </button>
                <button className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-unit-3 min-w-unit-16 h-unit-8 text-tiny gap-unit-2 rounded-small [&amp;>svg]:max-w-[theme(spacing.unit-8)] data-[pressed=true]:scale-[0.97] transition-transform-colors-opacity motion-reduce:transition-none bg-default/40 text-default-foreground data-[hover=true]:opacity-hover" type="button">
                    View All
                </button>
            </div> */}
            </div>
        </div>
    )
}

export function BizCardListGeneratives(props) {
    if (props?.allGeneratives == null) return <p>Loading...</p>
    const generatives: BizGenerate[] = props.allGeneratives ?? BizGenerateBatchs;
    const filteredCollections = (props?.size == "sm") ? generatives?.slice(0, generatives.length >= 5 ? 5 : generatives.length)
        : generatives;

    return (
        <div className={`flex ${(props?.size == "sm") ? ' max-w-xl ' : ' max-w-4xl '} flex-col gap-3`}>
            {
                filteredCollections?.map((item, i) =>
                    <button onClick={() => props.openGenerativeResult(item)} key={i} className="flex flex-col relative overflow-hidden height-auto text-foreground box-border bg-content1 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-small rounded-large cursor-pointer transition-transform-background motion-reduce:transition-none data-[pressed=true]:scale-[0.97] tap-highlight-transparent border-default-200" type="button" role="button">
                        <div className="relative w-full flex-auto place-content-inherit align-items-inherit break-words text-left overflow-y-auto subpixel-antialiased flex h-full flex-row items-start gap-3 p-4">
                            <div className="item-center flex rounded-medium border p-2 bg-default-50 border-default-100">
                                <svg aria-hidden="true" role="img" className="text-default-500 iconify iconify--solar" width="24" height="24" viewBox="0 0 24 24">
                                    <g fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M3 10c0-3.771 0-5.657 1.172-6.828C5.343 2 7.229 2 11 2h2c3.771 0 5.657 0 6.828 1.172C21 4.343 21 6.229 21 10v4c0 3.771 0 5.657-1.172 6.828C18.657 22 16.771 22 13 22h-2c-3.771 0-5.657 0-6.828-1.172C3 19.657 3 17.771 3 14z"></path>
                                        <path strokeLinecap="round" d="M12 6v2m0 0v2m0-2h-2m2 0h2m-6 6h8m-7 4h6"></path>
                                    </g>
                                </svg>
                            </div>
                            <div className={`flex flex-col ${(props?.size == "sm") ? '  w-full  ' : ' w-full '} overflow-hidden`}>
                                <p className="text-medium">{item.name}</p>
                                <p className="text-small text-default-400 w-full">{item.desc?.substring(0, item.desc.length > 75 ? 75 : item.desc.length)}</p>
                            </div>

                            <div className="flex w-full flex-col items-center">
                                <div className="flex items-center justify-center h-auto w-max-content" role="group">

                                </div>
                                <span aria-hidden="true" className="w-px h-px block" style={{ marginLeft: "0.25rem", marginTop: "0.5rem" }}>

                                </span>
                            </div>
                        </div>
                    </button>
                )
            }
        </div>
    )
}

export function BizCardListCollection(props) {
    const collections: BizCollection[] = (props.allCollections ?? BizCollections);
    const filteredCollections = (props?.size == "sm") ?
        collections?.slice(0, collections.length >= 5 ? 5 : collections.length)
        : collections;

    return (
        <div className={`flex ${(props?.size == "sm") ? ' max-w-lg ' : ' max-w-4xl '} flex-col gap-3`}>

            {
                filteredCollections.map((item, i) =>
                    <button onClick={() => props.openCollectionDetail(item)} key={i} className="flex flex-col relative overflow-hidden height-auto text-foreground box-border bg-content1 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-small rounded-large cursor-pointer transition-transform-background motion-reduce:transition-none data-[pressed=true]:scale-[0.97] tap-highlight-transparent border-default-200" type="button" role="button">
                        <div className="relative w-full flex-auto place-content-inherit align-items-inherit break-words text-left overflow-y-auto subpixel-antialiased flex h-full flex-row items-start gap-3 p-4">
                            <div className="item-center flex rounded-medium border p-2 bg-default-50 border-default-100">
                                <svg aria-hidden="true" role="img" className="text-default-500 iconify iconify--solar" width="24" height="24" viewBox="0 0 24 24">
                                    <g fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M3 10c0-3.771 0-5.657 1.172-6.828C5.343 2 7.229 2 11 2h2c3.771 0 5.657 0 6.828 1.172C21 4.343 21 6.229 21 10v4c0 3.771 0 5.657-1.172 6.828C18.657 22 16.771 22 13 22h-2c-3.771 0-5.657 0-6.828-1.172C3 19.657 3 17.771 3 14z"></path>
                                        <path strokeLinecap="round" d="M12 6v2m0 0v2m0-2h-2m2 0h2m-6 6h8m-7 4h6"></path>
                                    </g>
                                </svg>
                            </div>
                            <div className="flex flex-col  w-[200px] overflow-hidden">
                                <p className="text-medium">{item.name}</p>
                                <p className="text-small text-default-400">{item.desc}</p>
                            </div>

                            <div className="flex flex-col items-center">
                                <div className="flex items-center justify-center h-auto" role="group">


                                    <AvatarGroup isGrid max={(props?.size == "sm") ? 3 : 10} className='pt-1'>
                                        {
                                            item?.images?.map((image, i2) => (
                                                <Avatar radius="lg" className='pt-1 px-2 object-contain' key={i2} src={image} onClick={() => props.onPreViewItem(item.images, i)} />
                                            ))
                                        }
                                    </AvatarGroup>

                                </div>
                                <span aria-hidden="true" className="w-px h-px block" style={{ marginLeft: "0.25rem", marginTop: "0.5rem" }}>

                                </span>
                            </div>
                        </div>
                    </button>
                )
            }
        </div>
    )
}

export function BizCardBilling() {

    return (
        <div className="max-w-lg flex flex-col relative overflow-hidden height-auto text-foreground outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-medium rounded-large backdrop-blur-md backdrop-saturate-150 transition-transform-background motion-reduce:transition-none bg-background/60 p-3 dark:bg-default-100/50 !border-small border-secondary/50">
            <div className="max-w-fit inline-flex items-center justify-between box-border whitespace-nowrap px-1 h-7 text-small rounded-full bg-secondary/20 text-secondary absolute right-4 top-4">
                <span className="flex-1 text-inherit font-normal px-2">
                    Biz A Level
                </span>
            </div>
            <div className="p-3 z-10 w-full justify-start shrink-0 overflow-inherit color-inherit subpixel-antialiased rounded-t-large flex flex-col items-start gap-2 pb-6">
                <h2 className="text-large font-medium">Your billing & history</h2>
                <p className="text-medium text-default-500">For small teams that have less that 10 members.</p>
            </div>
            <hr className="shrink-0 bg-divider border-none w-full h-divider" role="separator" />
            <div className="relative flex w-full p-3 flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased gap-8">
                <p className="flex items-baseline gap-1 pt-2"><span className="inline bg-gradient-to-br from-foreground to-foreground-600 bg-clip-text text-4xl font-semibold leading-7 tracking-tight text-transparent">$72</span><span className="text-small font-medium text-default-400">/per year</span></p>
                <ul className="flex flex-col gap-2">
                    <li className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="text-secondary iconify iconify--ci" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m6 12l4.243 4.243l8.484-8.486"></path>
                        </svg>
                        <p className="text-default-500">1 admin users included</p>
                    </li>
                    <li className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="text-secondary iconify iconify--ci" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m6 12l4.243 4.243l8.484-8.486"></path>
                        </svg>
                        <p className="text-default-500">1000 credits/month</p>
                    </li>
                    <li className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="text-secondary iconify iconify--ci" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m6 12l4.243 4.243l8.484-8.486"></path>
                        </svg>
                        <p className="text-default-500">10 GB of storage</p>
                    </li>
                    <li className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="text-secondary iconify iconify--ci" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m6 12l4.243 4.243l8.484-8.486"></path>
                        </svg>
                        <p className="text-default-500">Full HD images</p>
                    </li>
                    <li className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="text-secondary iconify iconify--ci" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m6 12l4.243 4.243l8.484-8.486"></path>
                        </svg>
                        <p className="text-default-500">Help center access</p>
                    </li>

                </ul>


            </div>
            <div className="p-3 h-auto flex w-full items-center overflow-hidden color-inherit subpixel-antialiased rounded-b-large"><a className="tap-highlight-transparent no-underline hover:opacity-80 active:opacity-disabled transition-opacity z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-unit-4 min-w-unit-20 h-unit-10 text-small gap-unit-2 rounded-medium w-full [&amp;>svg]:max-w-[theme(spacing.unit-8)] data-[pressed=true]:scale-[0.97] transition-transform-colors-opacity motion-reduce:transition-none bg-secondary text-secondary-foreground data-[hover=true]:opacity-hover" role="button" href="#">
                Pay now
            </a>
            </div>
        </div>
    )
}