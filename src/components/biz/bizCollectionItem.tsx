import { Avatar, AvatarGroup, CircularProgress, Input, Progress, Select, SelectItem, Skeleton } from '@nextui-org/react'
import * as ImageJS from 'image-js'
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';

import { getUpdateAuthenticateUser } from '~/pages/business-app';
import { imageKitService } from '~/services/ImageKitService';
import { vtoService } from '~/services/VTOService';

import BizCollections, { BizCollection } from './bizCollections';

var uploadCollectionCount = 0;
export default function BizCollectionItem(props) {
    const originCollection = (props?.item as BizCollection);
    const session = props?.session;
    let currentUser: UserEntity = props?.currentUser ?? getUpdateAuthenticateUser({});

    
    

    const [currentCollection, setCurrentCollection] = useState<BizCollection>({
        bizId:  currentUser.bizId ?? session?.user?.email ?? '000',
        name: originCollection?.name ?? 'Demo Collection',
        images: originCollection?.images ?? [],
        id: originCollection?.id ?? null
    });

    
    
    const router = useRouter()
    const [selectedImages, setSelectedImages] = useState<File[]>(null);
    const [uploadedImages, setUploadedImages] = useState<string[]>(currentCollection.images);
    const [collectionName, setCollectionName] = useState(currentCollection.name);
    const [collectionDesc, setCollectionDesc] = useState(currentCollection.desc);
    const [collectionType, setCollectionType] = useState(null);
    const [isUploadingImages, setIsUploadingImages] = useState(false)
    const [uploadImageFileCount, setUploadImageFileCount] = useState<number>(0);
    // This function will be triggered when the file field change
    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {

            setSelectedImages(Array.from(e.target.files));
            
            setUploadImageFileCount(e.target.files.length);
            uploadCollectionCount = e.target.files.length;
        }
    };

    // This function will be triggered when the "Remove This Image" button is clicked
    const removeSelectedImage = () => {
        setSelectedImages(null);
    };

    // This is the promise code, so this is the useful bit
    const ensureCallAPIVTO = useCallback(async (timeout = 200000) => {
        var start = Date.now();
        return new Promise(waitForUploadedAllImages); // set the promise object within the waitForUploadedAllImages object
        function waitForUploadedAllImages(resolve, reject) {
            
            if ((uploadCollectionCount == 0)) {
                
                resolve();
            }

            else if (timeout && (Date.now() - start) >= timeout) {
                
                reject(new Error("timeout"));
            }
            else {
                setTimeout(waitForUploadedAllImages.bind(this, resolve, reject), 300);
            }
        }
    }, [])

    const onCreateCollection = useCallback(async () => {
        
        
        if (!session && !(currentUser.username|| currentUser.email)) {
            alert('You are running in demo mode. Please Sign In to continue...')
            //router.push(`/authenticate`)
            return;
        }

        setIsUploadingImages(true);
        
        currentCollection.images =  uploadedImages;

        if (!currentCollection.images) {
            currentCollection.images = []
        }

        

        // wait for upload images:
        selectedImages?.forEach(async (image, i) => {
            var newFileName = `${currentUser?.bizId ?? 'anonymous'}-${encodeURI(collectionName)}-${i}` + '.png'
            const imageUrl = URL.createObjectURL(image)
            const img = await ImageJS.Image.load(imageUrl)

            await imageKitService
                .upload({
                    file: img.toDataURL(),
                    fileName: newFileName,
                })
                .then((uploaded) => {
                    
                    
                    currentCollection.images.push(uploaded.url);
                    setCurrentCollection({ ...currentCollection })
                    uploadCollectionCount--;
                    
                });
        });

        currentCollection.name = collectionName;
        currentCollection.desc = collectionDesc;
        //currentCollection.type = collectionType;

        await ensureCallAPIVTO().then(async function () {
            
            
            await vtoService.createNewCollection(currentCollection).then(
                (res) => {
                    
                    router.reload()
                    // BizCollections.push(currentCollection)

                    setTimeout(() => {
                    }, 1000)
                }
            ).catch((e) => {
                
            }).finally(() => {
                setIsUploadingImages(false);
                // temp:
            });
        });
    }, [collectionDesc, collectionName, currentCollection, currentUser, ensureCallAPIVTO, selectedImages, router, uploadedImages, session]);

    const onDeleteCollection = useCallback(async () => {
        if (!session && !(currentUser.username|| currentUser.email)) {
            alert('You are running in demo mode. Please Sign In to continue...')
            //router.push(`/authenticate`)
            return;
        }
        await vtoService.deleteCollection(currentCollection.id).then(
            (res) => {
                

                //props.onBack();
                router.reload()

                setTimeout(() => {
                }, 1000)
            }
        ).catch((e) => {
            
        }).finally(() => {
            setIsUploadingImages(false);
            // temp:
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentCollection, router, session, currentUser.username]);

    return (
        <div className="container m-auto">
            <div className="grid grid-rows-3 grid-flow-col gap-4">
                <div className="w-full flex-1 flex-col p-4">
                    <header className="flex h-16 items-center gap-2 justify-between rounded-medium border-small border-divider px-4">

                        <div onClick={props.onBack} className='flex cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>

                            <h2 className="text-medium font-medium text-default-700 px-2">Back</h2>
                        </div>

                        <div className='flex'>

                            <button onClick={onDeleteCollection} className='mx-6 bg-gray-100 px-2 rounded-full'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                </svg>
                            </button>

                            <button onClick={onCreateCollection} className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-unit-4 min-w-unit-20 h-unit-10 text-small gap-unit-2 rounded-medium w-full [&amp;>svg]:max-w-[theme(spacing.unit-8)] data-[pressed=true]:scale-[0.97] transition-transform-colors-opacity motion-reduce:transition-none data-[hover=true]:opacity-hover text-white bg-secondary" type="button">
                                {currentCollection.id ? "Update Collection" : "Save Collection"}
                                {isUploadingImages && <CircularProgress color="danger" size='sm' isDisabled={true} hidden={true} aria-label="Loading..." />}
                            </button>


                        </div>
                    </header>
                    <main className="mt-4 h-full w-full overflow-visible">
                        <div className="flex h-[90%] w-full flex-col gap-4 rounded-medium border-small border-divider  p-8">

                            <div className="flex flex-col gap-4 max-w-sm">

                                <Input
                                    isRequired
                                    value={collectionName}
                                    onValueChange={setCollectionName}
                                    isInvalid={(collectionName?.length <= 3)}
                                    type="text"
                                    placeholder="eg: Lisa "
                                    label="Enter a name"
                                    className="w-full font-normal bg-transparent !outline-none placeholder:text-foreground-500 focus-visible:outline-none data-[has-start-content=true]:ps-1.5 data-[has-end-content=true]:pe-1.5 text-small group-data-[has-value=true]:text-default-foreground h-full"
                                />
                            </div>

                            <div className="flex flex-col gap-4 max-w-sm">

                                <Input
                                    multiple={true}
                                    value={collectionDesc}
                                    onValueChange={setCollectionDesc}
                                    isInvalid={(collectionDesc?.length <= 3)}
                                    type="text"
                                    placeholder="More detail"
                                    label="More detail"
                                    className="w-full font-normal bg-transparent !outline-none placeholder:text-foreground-500 focus-visible:outline-none data-[has-start-content=true]:ps-1.5 data-[has-end-content=true]:pe-1.5 text-small group-data-[has-value=true]:text-default-foreground h-full"
                                />


                            </div>



                            <div className="flex flex-col gap-4 max-w-xs">
                                <div data-slot="main-wrapper" className="h-full flex flex-col">
                                    <div data-slot="inner-wrapper" className="inline-flex w-full items-center h-full box-border">
                                        <Select value={collectionType} onChange={setCollectionType} label="Select a clothes type" className="max-w-xs">
                                            <SelectItem key={"upperbody"} value={"upperbody"}>
                                                Upper Body
                                            </SelectItem>
                                            <SelectItem key={"lowerbody"} value={"lowerbody"}>
                                                Lower Body
                                            </SelectItem>
                                            <SelectItem key={"dress"} value={"dress"}>
                                                Dress
                                            </SelectItem>
                                            <SelectItem key={"dress"} value={"dress"}>
                                                Mixed all
                                            </SelectItem>
                                        </Select>

                                    </div>
                                </div>
                            </div>

                            <div className='text-xs'>
                                Drag & drop collections images:
                            </div>

                            <div className="flex w-full flex-col gap-4 ">
                                <form className="flex w-full flex-col items-start rounded-medium bg-default-100 transition-colors hover:bg-default-200/70 ">
                                    <div className="group  gap-2 px-4 pt-4">
                                        {
                                            uploadedImages && uploadedImages.map((url, i) =>
                                            (<div key={i} className="relative inline-flex shrink-0 p-2">
                                                <div className="relative shadow-black/5 shadow-none rounded-large" style={{ maxWidth: "fit-content;" }}>
                                                    <img
                                                        src={url}
                                                        className="relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 h-64 w-64 rounded-small border-small border-default-200/50 object-cover" alt="uploaded image cover" data-loaded="true" />
                                                </div>
                                                <span className="cursor-pointer flex z-10 flex-wrap absolute box-border rounded-full whitespace-nowrap place-content-center origin-center items-center select-none font-regular scale-100 subpixel-antialiased data-[invisible=true]:scale-0 data-[invisible=true]:opacity-0 text-small px-0 transition-transform-opacity !ease-soft-spring !duration-300 border-2 border-background bg-default text-default-foreground w-5 h-5 min-w-5 min-h-5 top-[5%] right-[5%] translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100">
                                                    <button
                                                        onClick={() => {
                                                            var copyArr = [...uploadedImages];
                                                            copyArr.splice(i, 1)
                                                            setUploadedImages(copyArr)
                                                        }}
                                                        className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-tiny gap-unit-2 rounded-full px-unit-0 !gap-unit-0 data-[pressed=true]:scale-[0.97] transition-transform-colors-opacity motion-reduce:transition-none bg-transparent text-default-foreground data-[hover=true]:bg-default/40 min-w-unit-8 w-unit-8 h-unit-8" type="button">
                                                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="text-foreground iconify iconify--iconamoon" width="16" height="16" viewBox="0 0 24 24">
                                                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m7 7l10 10M7 17L17 7"></path>
                                                        </svg>
                                                    </button>
                                                </span>
                                            </div>
                                            ))
                                        }

                                        {
                                            selectedImages && selectedImages.map((image, i) =>
                                            (<div key={i} className="relative inline-flex shrink-0 p-2">
                                                <div className="relative shadow-black/5 shadow-none rounded-large" style={{ maxWidth: "fit-content;" }}>
                                                    <img
                                                        src={URL.createObjectURL(image)}
                                                        className="relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 h-64 w-64 rounded-small border-small border-default-200/50 object-cover" alt="uploaded image cover" data-loaded="true" />
                                                </div>
                                                <span className="cursor-pointer flex z-10 flex-wrap absolute box-border rounded-full whitespace-nowrap place-content-center origin-center items-center select-none font-regular scale-100 subpixel-antialiased data-[invisible=true]:scale-0 data-[invisible=true]:opacity-0 text-small px-0 transition-transform-opacity !ease-soft-spring !duration-300 border-2 border-background bg-default text-default-foreground w-5 h-5 min-w-5 min-h-5 top-[5%] right-[5%] translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100">
                                                    <button
                                                        onClick={() => {
                                                            var copyArr = [...selectedImages];
                                                            copyArr.splice(i, 1);
                                                            setSelectedImages(copyArr)
                                                        }}

                                                        className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-tiny gap-unit-2 rounded-full px-unit-0 !gap-unit-0 data-[pressed=true]:scale-[0.97] transition-transform-colors-opacity motion-reduce:transition-none bg-transparent text-default-foreground data-[hover=true]:bg-default/40 min-w-unit-8 w-unit-8 h-unit-8" type="button">
                                                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="text-foreground iconify iconify--iconamoon" width="16" height="16" viewBox="0 0 24 24">
                                                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m7 7l10 10M7 17L17 7"></path>
                                                        </svg>
                                                    </button>
                                                </span>
                                            </div>
                                            ))

                                        }

                                    </div>
                                    <div className="group flex flex-col w-full min-h-[40px]" data-slot="base" data-filled="true" data-filled-within="true">
                                        <input
                                            id="upload-photo"
                                            data-slot="input"
                                            accept="image/*"
                                            type="file"
                                            multiple
                                            onChange={imageChange}
                                            data-has-start-content="true"
                                            data-has-end-content="true"
                                            className="w-full font-normal bg-transparent !outline-none placeholder:text-foreground-500 focus-visible:outline-none data-[has-start-content=true]:ps-1.5 data-[has-end-content=true]:pe-1.5 resize-none data-[hide-scroll=true]:scrollbar-hide group-data-[has-value=true]:text-default-foreground transition-height !duration-100 motion-reduce:transition-none py-0 pt-1 pb-6 !pr-10 text-medium"
                                            aria-label="Prompt"
                                            placeholder="Upload fashion images here!"
                                            data-hide-scroll="true"
                                            style={{
                                                width: "300px",
                                                height: "300px !important;", opacity: 0,
                                                position: "absolute",
                                                zIndex: -1
                                            }}>

                                        </input>
                                        <label htmlFor="upload-photo">

                                            <div data-slot="input-wrapper" className="cursor-pointer relative w-full inline-flex tap-highlight-transparent px-3 bg-default-100 data-[hover=true]:bg-default-200 group-data-[focus=true]:bg-default-100 min-h-unit-10 rounded-large flex-col items-start justify-center gap-0 !h-auto transition-background motion-reduce:transition-none !duration-150 outline-none group-data-[focus-visible=true]:z-10 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-2 group-data-[focus-visible=true]:ring-offset-background h-14 py-2 !bg-transparent shadow-none" data-has-multiple-rows="true" style={{ cursor: "text;" }}>
                                                <div data-slot="inner-wrapper" className="inline-flex w-full h-full box-border items-start group-data-[has-label=true]:items-start pb-12 pt-2 relative">
                                                    <button className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-tiny gap-unit-2 rounded-full px-unit-0 !gap-unit-0 data-[pressed=true]:scale-[0.97] transition-transform-colors-opacity motion-reduce:transition-none bg-transparent text-default-foreground data-[hover=true]:bg-default/40 min-w-unit-8 w-unit-8 h-unit-8" type="button" >
                                                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="text-default-500 iconify iconify--solar" width="20" height="20" viewBox="0 0 24 24">
                                                            <g fill="none" stroke="currentColor" strokeWidth="1.5">
                                                                <path d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12Z"></path>
                                                                <circle cx="16" cy="8" r="2"></circle>
                                                                <path strokeLinecap="round" d="m5 13.307l.81-.753a2.3 2.3 0 0 1 3.24.108l2.647 2.81c.539.572 1.42.649 2.049.18a2.317 2.317 0 0 1 2.986.181L19 18"></path>
                                                            </g>
                                                        </svg>

                                                    </button>

                                                    <span className='pt-2 text-xs'> Upload images here!</span>


                                                    <div className="absolute right-0 flex h-full flex-col items-end justify-between gap-2">

                                                        <button className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-tiny gap-unit-2 rounded-full px-unit-0 !gap-unit-0 data-[pressed=true]:scale-[0.97] transition-transform-colors-opacity motion-reduce:transition-none bg-transparent text-default-foreground data-[hover=true]:bg-default/40 min-w-unit-8 w-unit-8 h-unit-8" type="button">

                                                        </button>

                                                        <div className="flex items-end gap-2">
                                                            <p className="py-1 text-tiny text-default-400">{uploadCollectionCount}/20 image uploaded</p>
                                                            <button className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-tiny gap-unit-2 rounded-large opacity-disabled pointer-events-none px-unit-0 !gap-unit-0 data-[pressed=true]:scale-[0.97] transition-transform-colors-opacity motion-reduce:transition-none bg-default text-default-foreground min-w-unit-8 w-unit-8 h-unit-8 data-[hover=true]:opacity-hover" data-disabled="true" type="button" >
                                                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="[&amp;>path]:stroke-[2px] text-default-600 iconify iconify--solar" width="20" height="20" viewBox="0 0 24 24">
                                                                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 20V4m0 0l6 6m-6-6l-6 6"></path>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </main>
                </div >
            </div >
        </div >
    )
}

