import { Accordion, AccordionItem, Avatar, AvatarGroup, Button, Card, Checkbox, Chip, cn, image, Input, Listbox, ListboxItem, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Progress, Select, Selection, SelectItem, Skeleton, useDisclosure } from '@nextui-org/react';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import useSWR from 'swr'

import { vtoService } from '~/services/VTOService';

import BizCollections, { BizCollection } from './bizCollections';
import BizGenerateBatchs, { BizGenerate, BizOutput, BizResult } from './bizGenerate';
import BizModels, { BizModel } from './bizModels';
import { getUpdateAuthenticateUser } from '~/pages/business-app';

async function getGeneratesDetail(albumId: string): Promise<BizGenerate> {
    const res = await vtoService.getGenerative(albumId);
    if (res.status !== 200) { throw new Error('Failed to fetch data') }
    return res.data
}
const fetcher = (albumId) => fetch(`https://api.tryonhub.ai/biz/generatives/getItem/${albumId}`, { headers: { Authorization: 'Bearer 000' } }).then((res) => res.json())
var socket = null;

export default function BizGenerateItemResult(props) {
    const allModels: BizModel[] = props?.allModels ?? BizModels;
    const allCollections: BizCollection[] = props?.allCollections ?? BizCollections;;
    let currentGenerative = (props?.item as BizGenerate);
    const session = props?.session;
    let currentUser: UserEntity = props?.currentUser ?? getUpdateAuthenticateUser({});
    // const { data, error } = useSWR(currentGenerative._id, fetcher)
    const router = useRouter()
    const [selectedImages, setSelectedImages] = useState<File[]>(null);
    const [batchName, setBatchName] = useState(currentGenerative?.name);
    const [batchDesc, setBatchDesc] = useState(currentGenerative?.desc);
    const [versionName, setVersionName] = useState(null);
    const [selectingCollection, setSelectingCollection] = useState<BizCollection>(null);
    const [selectingModel, setSelectingModel] = useState<BizModel>(null);
    const [isSelectedHd, setIsSelectedHd] = useState(false);
    const [onChange, setOnChange] = useState(false);
    const [currentModels, setCurrentModels] = useState<BizModel[]>([]);
    const [currentGeneration, setCurrentGeneration] = useState<BizGenerate>(currentGenerative)
    

    let images = [];
    currentGenerative?.outputDetail?.data.forEach(resultItem => {
        let urls = resultItem?.OUTPUT_IMAGE?.split(',')
        images = images.concat(urls)
    });
    const [outputImages, setOutputImages] = useState<string[]>(images);
    const [deletedImages, setDeteltedImage] = useState<string[]>([]);

    useEffect(() => {
        if (!currentGeneration?.outputDetail?.data) {
            
            getGeneratesDetail(currentGenerative._id).then((res: BizGenerate) => {
                
                
                setCurrentGeneration(res)
                let images = [];
                res?.outputDetail?.data.forEach(resultItem => {
                    let urls = resultItem?.OUTPUT_IMAGE?.split(',')
                    images = images.concat(urls)
                });
                setOutputImages(images)
            }).catch(e => { })
        }

    }, [currentGeneration, currentGenerative._id])

    // useEffect(() => {
    //     
    //     socket = io('https://api.tryonhub.ai/socket/vto_biz');

    //     // Standard socket management
    //     socket.on('connect', () => {
    //         

    //         socket.emit('biz_update', { myBizId: '000' });

    //         socket.emit('identity', JSON.stringify(currentUser), response =>
    //             
    //         );

    //         socket.on("biz_update", (msg) => {
    //             
    //             console.info(msg)

    //         })
    //     });

    //     socket.on("biz_update", (msg) => {
    //         
    //         console.info(msg)
    //         try {
    //             var newBizUpdate = JSON.parse(msg);

    //             if (newBizUpdate) {
    //                 newBizUpdate.type === 'reply-result-v2';
    //                 currentGeneration.percentage += 1;
    //                 setCurrentGeneration({ ...currentGeneration })
    //             }
    //         } catch { }

    //     })

    //     socket.on('disconnect', () => {
    //         
    //     });

    //     socket.on('connect_error', (error) => {
    //         
    //     });

    //     return () => {
    //         socket?.disconnect();
    //     };
    // }, [currentGeneration, currentUser]);

    // This function will be triggered when the "Remove This Image" button is clicked
    const removeSelectedImage = () => {
        setSelectedImages(null);
    };

    const [collectionValues, setCollectionValues] = React.useState<Selection>(new Set([]));

    const handleCollectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCollectionValues(new Set(e.target.value.split(",")));
    };

    const [modelValues, setModelValues] = React.useState<Selection>(new Set([]));

    const handleModelSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setModelValues(new Set(e.target.value.split(",")));
    };

    const onDeleteOutput = useCallback(async (outputId: string, urlIndex: number) => {
        if (!session && !currentUser.username) {
            alert('You are running in demo mode. Please Sign In to continue...')
            //router.push(`/authenticate`)
            return;
        }
        await vtoService.deleteOutput(currentGeneration.bizId, currentGeneration._id, outputId, urlIndex).then(
            (res) => {
                
                //router.reload()
            }
        ).catch((e) => {
            
        }).finally(() => {
        });
    }, [currentGeneration, currentUser, session]);

    const onDeleteModel = useCallback(async () => {
        if (!session && !currentUser.username) {
            alert('You are running in demo mode. Please Sign In to continue...')
            //router.push(`/authenticate`)
            return;
        }
        await vtoService.deleteGenerative(currentGeneration._id).then(
            (res) => {
                
                router.reload()
            }
        ).catch((e) => {
            
        }).finally(() => {
        });
    }, [currentGeneration, router, currentUser, session]);

    const onRegenerate = useCallback(async () => {
        if (!session && !currentUser.username) {
            alert('You are running in demo mode. Please Sign In to continue...')
            //router.push(`/authenticate`)
            return;
        }
        
        await vtoService.regenerateGenerative(currentGeneration.id).then(
            (res) => {
                
                router.reload()
            }
        ).catch((e) => {
            
        }).finally(() => {
        });
    }, [currentGeneration, router, currentUser, session]);

    const onSave = useCallback(async () => {
        if (!session || !currentUser.username) {
            alert('You are running in demo mode. Please Sign In to continue...')
            //router.push(`/authenticate`)
            return;
        }
        currentGeneration.outputDetail.detetedImage = deletedImages;
        await vtoService.saveBatch(currentGeneration).then(
            (res) => {
                
                router.reload()
            }
        ).catch((e) => {
            
        }).finally(() => {
        });
    }, [currentGeneration, router, currentUser, session, deletedImages]);

    const percentage = 100 * ((currentGeneration?.outputDetail?.currentCount as number) ?? 0) / ((currentGeneration?.outputDetail?.totalCount as number) ?? 1)

    const numberOfModelImages = currentGeneration?.modelListItemModel?.map(x => x.images.length).reduce((partialSum, a) => partialSum + a, 0)
    const numberOfCollectionImages = currentGeneration?.collectionItemModel?.images.length

    return (
        <div className="container m-auto bg-white rounded-xl">
            <div className="grid  grid-flow-col gap-4">
                <div className="w-full flex-1 flex-col p-4">
                    <header className="flex h-16 items-center gap-2 justify-between rounded-medium border-small border-divider px-4">

                        <div onClick={props.onBack} className='flex cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>

                            <h2 className="text-medium font-medium text-default-700 px-2">Back</h2>
                        </div>

                        <Progress
                            aria-label="Generating..."
                            size="md"
                            value={percentage}
                            color="secondary"
                            showValueLabel={true}
                            label={`${(currentGeneration?.outputDetail?.currentCount as number) ?? 0}/${((currentGeneration?.outputDetail?.totalCount as number) ?? 1)}`}
                            className="max-w-lg "
                        />

                        <div className='flex'>
                            <button onClick={onRegenerate} className='mx-6 flex py-2 bg-gray-100 px-2 rounded-full'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.712 4.33a9.027 9.027 0 0 1 1.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 0 0-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 0 1 0 9.424m-4.138-5.976a3.736 3.736 0 0 0-.88-1.388 3.737 3.737 0 0 0-1.388-.88m2.268 2.268a3.765 3.765 0 0 1 0 2.528m-2.268-4.796a3.765 3.765 0 0 0-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 0 1-1.388.88m2.268-2.268 4.138 3.448m0 0a9.027 9.027 0 0 1-1.306 1.652c-.51.51-1.064.944-1.652 1.306m0 0-3.448-4.138m3.448 4.138a9.014 9.014 0 0 1-9.424 0m5.976-4.138a3.765 3.765 0 0 1-2.528 0m0 0a3.736 3.736 0 0 1-1.388-.88 3.737 3.737 0 0 1-.88-1.388m2.268 2.268L7.288 19.67m0 0a9.024 9.024 0 0 1-1.652-1.306 9.027 9.027 0 0 1-1.306-1.652m0 0 4.138-3.448M4.33 16.712a9.014 9.014 0 0 1 0-9.424m4.138 5.976a3.765 3.765 0 0 1 0-2.528m0 0c.181-.506.475-.982.88-1.388a3.736 3.736 0 0 1 1.388-.88m-2.268 2.268L4.33 7.288m6.406 1.18L7.288 4.33m0 0a9.024 9.024 0 0 0-1.652 1.306A9.025 9.025 0 0 0 4.33 7.288" />
                                </svg>

                                Re-generate
                            </button>
                            <button onClick={onDeleteModel} className='mx-2 flex py-2 bg-gray-100 px-2 rounded-full'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                </svg>
                                Archive
                            </button>
                            {
                                onChange && (<button onClick={onSave} className='mx-6 bg-gray-100 px-2 rounded-full'>
                                    Save Changes
                                </button>)

                            }
                        </div>
                    </header>
                    <main className="mt-4 flex w-full overflow-visible rounded-medium border-small border-divider ">
                        <div className='p-4 w-full lg:w-1/2'>
                            <Accordion selectionMode="multiple">
                                <AccordionItem
                                    key="1"

                                    startContent={
                                        <span className='px-5 text-sm'>
                                            Album settings:    {currentGeneration?.name}
                                        </span>
                                    }
                                >

                                    <div className="flex px-5 h-[90%] w-full lg:w-1/2 flex-col gap-4  ">

                                        <div className='text-xs'>
                                            Batch Name:
                                        </div>

                                        <div className="flex flex-col gap-4 max-w-sm">
                                            <Input
                                                isRequired
                                                value={batchName}
                                                onValueChange={setBatchName}
                                                isInvalid={(batchName?.length <= 3)}
                                                type="text"

                                                label="Enter a batch name"
                                                className="w-full font-normal bg-transparent !outline-none placeholder:text-foreground-500 focus-visible:outline-none data-[has-start-content=true]:ps-1.5 data-[has-end-content=true]:pe-1.5 text-small group-data-[has-value=true]:text-default-foreground h-full"
                                            />
                                        </div>
                                        <div className='text-xs'>
                                            Description:
                                        </div>
                                        <div className="flex flex-col gap-4 max-w-sm">

                                            <div data-slot="inner-wrapper" className="inline-flex w-full items-center h-full box-border">
                                                <Input
                                                    isRequired
                                                    value={batchDesc}
                                                    onValueChange={setBatchDesc}
                                                    isInvalid={(batchDesc?.length <= 3)}
                                                    type="text"

                                                    label="Enter a batch name"
                                                    className="w-full font-normal bg-transparent !outline-none placeholder:text-foreground-500 focus-visible:outline-none data-[has-start-content=true]:ps-1.5 data-[has-end-content=true]:pe-1.5 text-small group-data-[has-value=true]:text-default-foreground h-full"
                                                />
                                            </div>
                                        </div>

                                        <div className='text-xs'>
                                            Select AI version:
                                        </div>

                                        <div className="flex flex-col gap-4 max-w-sm">
                                            <Select
                                                isRequired
                                                label="Select an version"
                                                placeholder="Select an version"
                                                value={versionName}
                                                onChange={setVersionName}
                                                defaultSelectedKeys={["Version 1"]}

                                                className=" max-w-sm"
                                            >
                                                {["Version 1", "Version 2 - beta"].map((val) => (
                                                    <SelectItem key={val} value={val}>
                                                        {val}
                                                    </SelectItem>
                                                ))}
                                            </Select>

                                        </div>

                                        <div className='text-xs'>
                                            Select AI version:
                                        </div>

                                        <div className="flex flex-col gap-4 max-w-sm pl-2">
                                            <Checkbox
                                                aria-label={"user.name"}
                                                classNames={{
                                                    base: cn(
                                                        "inline-flex w-full max-w-md bg-content1 bg-gray-100",
                                                        "hover:bg-content2 items-center justify-start",
                                                        "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                                                        "data-[selected=true]:border-primary",
                                                    ),
                                                    label: "w-full",
                                                }}
                                                isSelected={isSelectedHd}
                                                onValueChange={setIsSelectedHd}
                                            >
                                                <div className="w-full flex justify-between gap-2 ">

                                                    <div className="flex flex-col items-end gap-1">
                                                        <span className="text-tiny text-default-500">4K quality output</span>
                                                        <Chip color="success" size="sm" variant="flat">
                                                            3840 x 2160
                                                        </Chip>
                                                    </div>
                                                </div>
                                            </Checkbox>
                                        </div>
                                    </div>

                                </AccordionItem>
                                <AccordionItem
                                    key="2"
                                    aria-label="Janelle Lenard"
                                    startContent={
                                        <span className='px-5 text-sm'>
                                            The collection:    {currentGeneration?.collectionItemModel?.name}
                                        </span>
                                    }
                                >
                                    <div className='flex w-full lg:w-1/2'>
                                        <div className="">
                                            <AvatarGroup max={3} total={currentModels.length}>
                                                {
                                                    currentGeneration?.collectionItemModel?.images?.map((url, i) => (
                                                        <Avatar key={i} src={url} />
                                                    ))
                                                }
                                            </AvatarGroup>
                                            <p className="text-small pl-12 text-default-500">
                                                {currentGeneration?.collectionItemModel?.name}
                                            </p>
                                        </div>
                                    </div>
                                </AccordionItem>
                                <AccordionItem
                                    key="3"
                                    aria-label="Current model"
                                    startContent={
                                        <span className='px-5 text-sm'>
                                            The models:    {Array.from(currentGeneration?.modelListItemModel?.map(x => x.name) ?? []).join(", ")}
                                        </span>
                                    }
                                    subtitle={
                                        <div className="flex items-left justify-start h-auto w-max-content" role="group">
                                            {
                                                currentGeneration?.models?.map((item, i2) => (
                                                    <span key={i2} className="flex relative justify-center items-center box-border overflow-hidden align-middle z-0 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 w-8 h-8 text-tiny bg-default text-default-foreground rounded-full ring-2 ring-offset-2 ring-offset-background dark:ring-offset-background-dark data-[hover=true]:-translate-x-3 transition-transform data-[focus-visible=true]:-translate-x-3 ring-default ms-0">
                                                        <img src={item?.images[0]?.urlHd} className="flex object-cover w-full h-full transition-opacity !duration-500 opacity-0 data-[loaded=true]:opacity-100" alt="avatar" data-loaded="true" />
                                                    </span>
                                                ))
                                            }
                                        </div>
                                    }
                                >
                                    <div className='flex flex w-full lg:w-1/2'>
                                        {
                                            currentGeneration?.modelListItemModel?.map((item, i) => (
                                                <div key={i} className="w-full">
                                                    <div onClick={() => props.openModelDetail(item)} className="w-full cursor-pointer flex items-center justify-between gap-2 rounded-medium p-8 bg-transparent px-3 py-1">
                                                        <div className="flex items-center gap-2">
                                                            <span className="flex relative justify-center items-center overflow-hidden align-middle z-0 outline-none data-[focus-visible=true]:z-10 w-12 h-12 text-tiny bg-default text-default-foreground rounded-lg ">
                                                                {
                                                                    item?.images?.length && (<img
                                                                        src={Array.from<string>(item.images)[0]} className="flex object-contain w-full h-full transition-opacity !duration-500 opacity-0 data-[loaded=true]:opacity-100" alt="avatar" data-loaded="true" />)
                                                                }
                                                            </span>

                                                            <p className="text-small text-default-500">{item.name} </p>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <p className="text-small text-default-500">{item.desc}</p>
                                                        </div>

                                                    </div>

                                                </div>
                                            ))
                                        }
                                    </div>
                                </AccordionItem>
                            </Accordion>
                        </div>
                        <div className='p-4 hidden lg:block  lg:w-1/2'>

                            <div className=" flex p-4">
                                <div className="w-2/5 rounded-lg">

                                    <div className="w-full items-center">
                                        <AvatarGroup max={3} total={numberOfCollectionImages}>
                                            {
                                                currentGeneration?.collectionItemModel?.images?.map((url, i) => (
                                                    <Avatar size='lg' key={i} src={url} onClick={() => props.onPreViewItem(Array.from<string>([url]), 0)} />
                                                ))
                                            }
                                        </AvatarGroup>

                                        <p className="text-small pl-12 text-default-500">
                                            {currentGeneration?.collectionItemModel?.name}
                                        </p>
                                    </div>


                                </div>
                                <div className="w-3/5 rounded-lg">
                                    <div className="w-full items-center ">
                                        <AvatarGroup max={3} total={numberOfModelImages}>
                                            {
                                                currentGeneration?.modelListItemModel?.map((model, i) => (
                                                    <Avatar onClick={() => props.onPreViewItem(Array.from<string>(model?.images), 0)} size='lg' key={i} src={Array.from<string>(model?.images)[0]} />
                                                ))
                                            }
                                        </AvatarGroup>
                                        <p className="text-small pl-12  text-default-500">
                                            {currentGeneration?.modelListItemModel?.map(x => x.name + ",")}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </main>
                    <div className='rounded-medium border-small border-divider px-4 rounded-lg mt-2 pb-2'>
                        <header className="flex h-16 items-center gap-2 justify-between ">

                            <div className='flex cursor-pointer'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                                </svg>


                                <h2 className="text-medium font-medium text-default-700 px-2">Output</h2>
                            </div>

                            <div onClick={props.onStop} className='flex'>
                            </div>
                        </header>

                        {
                            (currentGeneration && currentGeneration?.outputDetail?.data) && (
                                <ListboxWrapper
                                    {...props}
                                    key={currentGeneration}
                                    results={currentGeneration?.outputDetail?.data ?? []}
                                    onRemoveItem={(index: number, index2: number) => {
                                        
                                        let results = currentGeneration?.outputDetail?.data ?? [];
                                        let itemDelete = results.splice(index, 1);
                                        currentGeneration.outputDetail.data = results;
                                        setCurrentGeneration({ ...currentGeneration })
                                        if (itemDelete) onDeleteOutput(itemDelete[0].uid, index2)

                                    }} />)
                        }
                    </div>
                </div >
            </div >
        </div >
    )
}


export function ListboxWrapper(props) {
    
    const outputs: BizResult[] = props.results ?? [];
    let images = [];
    console.log("ListboxWrapper")
    console.log(outputs);
    outputs.forEach((output, i) => {
        let splitimages = output.OUTPUT_IMAGE?.split(',') ?? null
        if (!splitimages) return (null)
        splitimages.forEach(url => {
            if (url?.trim()?.length !== 0) images.push(url)
        });
    });

    const outputsHD: BizResult[] = props.results ?? [];
    let imagesHD = [];
    outputsHD.forEach((output, i) => {
        let splitimages = output.OUTPUT_IMAGE_2HD?.split(',') ?? null
        if (!splitimages ) return (null)
        splitimages.forEach(url => {
            if (url?.trim()?.length !== 0) imagesHD.push(url)
        });
    });

    return (
        <div className="my-auto grid max-w-7xl grid-cols-1 gap-5 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {
                images && images?.map((url, i) => {
                    if (url?.trim()?.length == 0) return <></>
                    return (
                        <>
                            {url.trim().length > 0 && (<div key={i} className="relative flex w-full flex-none flex-col gap-3" id={i.toString()}>
                                <button onClick={() => { url = ''; props?.onRemoveItem(i, 0) }}
                                    className="group inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-tiny gap-unit-2 rounded-full px-unit-0 !gap-unit-0 data-[pressed=true]:scale-[0.97] transition-transform-colors-opacity motion-reduce:transition-none text-default-foreground min-w-unit-8 w-unit-8 h-unit-8 data-[hover=true]:opacity-hover absolute right-6 top-1 z-20 bg-background/20 backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50" type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                    </svg>
                                </button>
                                <button className="group inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-tiny gap-unit-2 rounded-full px-unit-0 !gap-unit-0 data-[pressed=true]:scale-[0.97] transition-transform-colors-opacity motion-reduce:transition-none text-default-foreground min-w-unit-8 w-unit-8 h-unit-8 data-[hover=true]:opacity-hover absolute right-16 top-1 z-20 bg-background/20 backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50" type="button">
                                    <a href={url + '-2HD'} target="_blank">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                        </svg>
                                    </a>
                                </button>
                                <div onClick={() => props.onPreViewItem(images, i)}
                                    className="relative shadow-black/5 shadow-none rounded-large"
                                    style={{ maxWidth: "fit-content;", cursor: "zoom-in" }}>
                                    <div className="w-[210px] h-[250px] relative overflow-hidden rounded-inherit rounded-large">
                                        <img src={url}  onError={() => {url = url.replace('-2HD', '')}} height={350} className="relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none object-cover transform transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large  w-full hover:scale-110" alt="Ponta do Sol, Portugal" data-loaded="true" />
                                    </div>
                                    <img src={url} onError={() => {url = url.replace('-2HD', '')}} height={250} className="absolute z-0 inset-0 w-full h-full object-cover filter blur-lg scale-105 saturate-150 opacity-30 translate-y-1 rounded-large" alt="Ponta do Sol, Portugal" aria-hidden="true" data-loaded="true" />
                                </div>
                            </div>)}
                        </>
                    )
                })

            }



        </div>
    )
};
