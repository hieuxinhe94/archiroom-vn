import { Avatar, Button, Checkbox, Chip, CircularProgress, cn, Input, Listbox, ListboxItem, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Progress,Select, Selection, SelectItem, useDisclosure } from '@nextui-org/react';
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react';

import { getUpdateAuthenticateUser } from '~/pages/business-app';
import { getCurrentUserByBrowser, handleConfetti } from '~/pages/try-on-plugin';
import { TryOnViewModel, vtoService } from '~/services/VTOService';

import BizCollections, { BizCollection } from './bizCollections';
import BizGenerateBatchs, { BizGenerate } from './bizGenerate';
import BizModels, { BizModel } from './bizModels';

var ssoEmail = null;
export default function BizGenerateItem(props) {
    let originGenerate = (null);
    let currentUser: UserEntity = props?.currentUser ?? getUpdateAuthenticateUser({});
    
    

    const allModels: BizModel[] = props?.allModels ?? BizModels;
    const allCollections: BizCollection[] = props?.allCollections ?? BizCollections;;
    const allGeneratives: BizGenerate[] = props?.allGeneratives ?? BizGenerateBatchs;
    const session = props?.session;
    
    
    if (originGenerate) {
        originGenerate.modelListIds = (originGenerate?.modelListIds?.length > 0 ? originGenerate?.modelListIds : [])
        originGenerate.modelListIds = originGenerate?.modelListIds?.length > 0 ? originGenerate?.modelListIds : []
    }
    const router = useRouter()

    const [currentBatch, setCurrentBatch] = useState<BizGenerate>({
        bizId: currentUser.bizId ?? session?.user?.email ?? '000',
        name: originGenerate?.name ?? 'Demo Shop',

        collection: allCollections.filter(x => originGenerate?.collectionItemId == x.id) ?? null,
        collectionItemId: originGenerate?.collectionItemId ?? null,

        models: allModels.filter(x => originGenerate?.modelListIds.indexOf(x.id)) ?? null,
        modelListIds: originGenerate?.modelListIds ?? [],

        lastest: true,
        state: originGenerate?.state ?? 'NEW',
        id: originGenerate?.id ?? null,
        _id: originGenerate?._id ?? null
    });

    
    
    const [selectedImages, setSelectedImages] = useState<File[]>(null);
    const [batchName, setBatchName] = useState(originGenerate?.name);
    const [batchDesc, setBatchDesc] = useState(originGenerate?.desc);
    const [versionName, setVersionName] = useState(null);
    const [selectingCollection, setSelectingCollection] = useState<BizCollection>();
    const [isSelectedHd, setIsSelectedHd] = useState(false);
    const [currentCollections, setCurrentCollections] = useState<BizCollection[]>(originGenerate?.collection);
    const [currentModels, setCurrentModels] = useState<BizModel[]>(allModels.filter(a => originGenerate?.models));
    const [calculatedCost, setCalculatedCost] = useState<string>("0");
    const [isLoading, setIsLoading] = useState(false);
    const [startDate, setStartDate] = useState(0);
    const [totalTimming, setTotalTimming] = useState(0);
    const [counter, setCounter] = useState<number>(0);
    const [totalCredit, setTotalCredit] = useState<number>(currentUser?.credit);
    const [isRequiredPayment, setIsRequiredPayment] = useState<boolean>(true);
 
    useEffect(() => {

    })

    // This function will be triggered when the file field change
    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {

            setSelectedImages(Array.from(e.target.files));
            
        }
    };

    // This function will be triggered when the "Remove This Image" button is clicked
    const removeSelectedImage = () => {
        setSelectedImages(null);
    };

    const [collectionValues, setCollectionValues] = React.useState<Selection>(new Set([currentBatch.collectionItemId]));

    const handleCollectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCollectionValues(new Set(e.target.value.split(",")));

        //recalculatedCost();
    };

    const [modelValues, setModelValues] = React.useState<Selection>(new Set([]));



    const handleModelSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        

        let tmpSet = new Set<string>();
        let tmpBizNModel: BizModel[] = [];

        var selectionKeys = e.target.value.split(",");
        
        
        for (var i = 0; i < selectionKeys?.length; ++i) {
            tmpSet.add(selectionKeys[i])
            tmpBizNModel.push(allModels.filter(x => x.id == selectionKeys[i])[0])
        }
        setModelValues(tmpSet);
        setCurrentModels(tmpBizNModel)

    };

    useEffect(() => {
        let tempCollectionSize = 0;
        for (var i = 0; i < currentCollections?.length; ++i) {
            tempCollectionSize += currentCollections[i]?.images?.length ?? 0;
        }
        
        
        
        
        
        let tempMoldesSize = 0;
        for (var i = 0; i < currentModels.length; ++i) {
            tempMoldesSize += currentModels[i]?.images?.length ?? 0;
        }
        
        
        let tempCost = tempMoldesSize * tempCollectionSize * 0.5;
        let tempCostStr = ((tempCost).toFixed(2))
        

        if(tempCost < totalCredit) { setIsRequiredPayment(false); }

        setCalculatedCost(tempCostStr);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentCollections, currentModels]);

    const onSave = async () => {
        //validate...
        if (!session && !(currentUser.username|| currentUser.email)) {
            alert('You are running in demo mode. Please Sign In to continue...')
            //router.push(`/authenticate`)
            return;
        }

        currentBatch.name = batchName;
        currentBatch.desc = batchDesc;
        currentBatch.percentage = 0;
        currentBatch.models = Array.from(modelValues).map(n => allModels.findLast(m => m.id === n.toString()));
        currentBatch.collection = currentCollections;
        currentBatch.collectionItemId = currentCollections ? currentCollections[0]?.id : null
        currentBatch.modelListIds = Array.from(modelValues).map(m => m.toString())
        currentBatch.modelsIds = Array.from(modelValues).map(n => allModels.findLast(m => m.id === n.toString()))

        if (isRequiredPayment) {
            // push to cache
            localStorage.setItem("payment-for-item", JSON.stringify(currentBatch))
            router.push(`/paymentgate?&collectionIds=${currentBatch.collectionItemId}&session=${session?.user?.email}&amount=${calculatedCost}`);
            return;
        }

        setIsLoading(true);
        
        
        localStorage.setItem("currentGenerate", JSON.stringify(currentBatch))
        setCurrentBatch({ ...currentBatch })

        await vtoService.createBatch(currentBatch).then(
            (res) => {
                
                
                router.refresh()

                setTimeout(() => {
                }, 1000)
            }
        ).catch((e) => {
            
        }).finally(() => {

            // temp:
        });
    }

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

                        <div>
                            {isLoading && <Progress
                                aria-label="Generating..."
                                size="md"
                                value={1}
                                color="default"
                                showValueLabel={true}
                                label={"Processing..."}
                                className="max-w-lg text-sm"
                            />}
                        </div>

                        <div className='flex'>
                            <button onClick={onSave} disabled={isLoading} className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-unit-4 min-w-unit-20 h-unit-10 text-small gap-unit-2 rounded-medium w-full [&amp;>svg]:max-w-[theme(spacing.unit-8)] data-[pressed=true]:scale-[0.97] transition-transform-colors-opacity motion-reduce:transition-none data-[hover=true]:opacity-hover text-white main-btn text-white hover:shadow-purple-700 hover:shadow-[0_0_20px_5px_rgba(0,0,0,0.1)] duration-500 rounded-full bg-gradient-to-r from-purple-gd to-blue-gd cursor-pointer" type="button">
                                Start Process Genetate
                                {isLoading && <CircularProgress color="danger" size='sm' isDisabled={true} hidden={true} aria-label="Loading..." />}
                            </button>

                        </div>
                    </header>
                    <main className="mt-4 block  lg:flex h-full w-full overflow-visible rounded-medium border-small border-divider ">
                        <div className="flex w-full lg:w-1/2 flex-col gap-4  p-8">
                            <div className='text-xs'>
                                Album Name:
                            </div>

                            <div className="flex flex-col gap-4 max-w-sm">

                                <Input
                                    isRequired
                                    value={batchName}
                                    onValueChange={setBatchName}
                                    isInvalid={(batchName?.length <= 3)}

                                    type="text"
                                    placeholder="eg: Lisa "
                                    label="Enter a album name"
                                    className="w-full font-normal bg-transparent !outline-none placeholder:text-foreground-500 focus-visible:outline-none data-[has-start-content=true]:ps-1.5 data-[has-end-content=true]:pe-1.5 text-small group-data-[has-value=true]:text-default-foreground h-full"
                                />

                            </div>


                            <div className='text-xs'>
                                Description:
                            </div>

                            <div className="flex flex-col gap-4 max-w-sm">

                                <Input
                                    isRequired
                                    value={batchDesc}
                                    onValueChange={setBatchDesc}


                                    type="text"
                                    placeholder="eg: Lisa "
                                    label="Enter a album desc"
                                    className="w-full font-normal bg-transparent !outline-none placeholder:text-foreground-500 focus-visible:outline-none data-[has-start-content=true]:ps-1.5 data-[has-end-content=true]:pe-1.5 text-small group-data-[has-value=true]:text-default-foreground h-full"
                                />

                            </div>

                            <div className='text-xs'>
                                Select a collection: {Array.from(collectionValues).join(", ")}
                            </div>
                            <Select
                                isRequired
                                label="Select collection"
                                placeholder="Select an collection"
                                defaultSelectedKeys={[currentBatch.collectionItemId]}
                                className=" max-w-sm"
                                isInvalid={(currentCollections?.length <= 0 && currentBatch?.collectionItemId == undefined)}
                                onChange={(evt) => {
                                    

                                    setCurrentCollections(allCollections.filter(a => a.id === evt.target.value));
                                    handleCollectionChange(evt)
                                }}
                            >
                                {allCollections.map((val) => (
                                    <SelectItem key={val.id} value={val.name}>
                                        {val.name}
                                    </SelectItem>
                                ))}
                            </Select>


                            <div className='text-xs'>
                                Select the models:    {Array.from(modelValues).join(", ")}
                            </div>
                            <div className='flex'>

                                <Select
                                    isRequired
                                    label="Pick mutiple models"
                                    selectionMode="multiple"
                                    placeholder="Select an models"
                                    defaultSelectedKeys={currentBatch?.modelListIds ?? []}
                                    selectedKeys={modelValues}
                                    isInvalid={(Array.from(modelValues).length <= 0 && currentBatch?.modelListIds?.length <= 0)}

                                    className="max-w-sm"
                                    onChange={(evt) => {
                                        

                                        setCurrentModels(allModels.filter(a => a.id === evt.target.value));
                                        handleModelSelectionChange(evt)
                                    }}
                                >
                                    {allModels.map((model: BizModel) => (
                                        <SelectItem key={model.id} value={model.id}>
                                            {model.name}
                                        </SelectItem>
                                    ))}
                                </Select>
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

                            {/* <div className='text-xs'>
                                After completion, email to:
                            </div>
                            <div className="flex flex-col gap-4 max-w-sm">
                                <div data-slot="input-wrapper" className="relative w-full inline-flex tap-highlight-transparent flex-row items-center shadow-sm px-3 gap-3 bg-default-100 data-[hover=true]:bg-default-200 group-data-[focus=true]:bg-default-100 h-unit-10 min-h-unit-10 rounded-medium transition-background motion-reduce:transition-none !duration-150 outline-none group-data-[focus-visible=true]:z-10 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-2 group-data-[focus-visible=true]:ring-offset-background">
                                    <div data-slot="inner-wrapper" className="inline-flex w-full items-center h-full box-border">
                                        <input data-slot="input"
                                            className="w-full font-normal bg-transparent !outline-none placeholder:text-foreground-500 focus-visible:outline-none data-[has-start-content=true]:ps-1.5 data-[has-end-content=true]:pe-1.5 text-small group-data-[has-value=true]:text-default-foreground h-full"
                                            aria-label="Enter a name for your collection"
                                            placeholder="eg: email@gmail.com "
                                            type="email"
                                        /></div>
                                </div>
                            </div> */}
                        </div>

                        <div className='w-full lg:w-1/2 p-4'>
                            <div className='text-xs py-2'>
                                Preview:
                            </div>

                            <div className="flex w-full mr-12 flex-col overflow-hidden height-auto text-foreground box-border bg-content1 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-medium rounded-large transition-transform-background motion-reduce:transition-none overflow-none relative  border-small border-foreground/10  bg-gray-200 text-gray-800" >
                                <div className="flex p-3 z-10 w-full justify-start items-center shrink-0 overflow-inherit color-inherit subpixel-antialiased rounded-t-large">
                                    <div className="flex items-center gap-3">
                                        <span className="flex relative justify-center items-center box-border overflow-hidden align-middle z-0 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 w-10 h-10 text-tiny text-default-foreground rounded-full border-small border-white/20 bg-transparent">
                                            <span aria-label="avatar" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-inherit w-full h-full" role="img">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                                                </svg>

                                            </span>
                                        </span>
                                        <p className="text-large font-medium text-gray-800">Estimating Cost</p>
                                    </div>
                                </div>
                                <div className="relative flex w-full p-3 flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased px-3">
                                    <div className="flex flex-col gap-2 px-2">
                                        <div className="flex items-baseline gap-1 text-foreground">

                                        </div>
                                        <span className="inline bg-gradient-to-br from-foreground to-foreground-600 bg-clip-text text-4xl font-semibold leading-8 tracking-tight text-gray-800">
                                            {calculatedCost}$

                                        </span>
                                        <p className="text-small text-gray-800">Unlock the full power of our AI! Gain expertise and insights from top organizations through guided tutorials, boosting productivity, enhancing security, and enabling seamless collaboration.</p>
                                    </div>
                                </div>
                                <div className="p-3 h-auto flex w-full items-center overflow-hidden color-inherit subpixel-antialiased rounded-b-large justify-end gap-2">
                                    <div style={{ minHeight: "300px" }} className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-unit-4 min-w-unit-20 h-unit-10 text-small gap-unit-2 rounded-medium w-full [&amp;>svg]:max-w-[theme(spacing.unit-8)] data-[pressed=true]:scale-[0.97] transition-transform-colors-opacity motion-reduce:transition-none data-[hover=true]:opacity-hover border-small border-white/20 bg-white/10 text-white" >
                                        <div className="grid grid-cols-4 gap-4">
                                            {
                                                currentCollections?.map((collection, ic) => (
                                                    collection?.images?.map((image, i2) => (
                                                        <span key={i2} className="flex relative justify-center items-center box-border overflow-hidden align-middle z-0 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 w-16 h-16 text-tiny bg-default text-default-foreground rounded-full ring-2 ring-offset-2 ring-offset-background dark:ring-offset-background-dark data-[hover=true]:-translate-x-3 transition-transform data-[focus-visible=true]:-translate-x-3 ring-default ms-0">
                                                            <img src={image} className="flex object-cover w-full h-full transition-opacity !duration-500 opacity-0 data-[loaded=true]:opacity-100" alt="avatar" data-loaded="true" />
                                                        </span>
                                                    ))
                                                ))
                                            }
                                        </div>


                                    </div>

                                    <div style={{ minHeight: "300px" }} className="z-0  group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-unit-4 min-w-unit-20 h-unit-10 text-small gap-unit-2 rounded-medium w-full [&amp;>svg]:max-w-[theme(spacing.unit-8)] data-[pressed=true]:scale-[0.97] transition-transform-colors-opacity motion-reduce:transition-none data-[hover=true]:opacity-hover border-small border-white/20 bg-white/10 text-white" >
                                        <div className="grid grid-cols-4 gap-4">  {
                                            currentModels?.map((model, im) => (

                                                model?.images?.map((image, i2) => (
                                                    <span key={i2} className="flex relative justify-center items-center box-border overflow-hidden align-middle z-0 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 w-16 h-16  text-tiny bg-default text-default-foreground rounded-full ring-2 ring-offset-2 ring-offset-background dark:ring-offset-background-dark data-[hover=true]:-translate-x-3 transition-transform data-[focus-visible=true]:-translate-x-3 ring-default ms-0">
                                                        <img src={image} className="flex object-cover w-full h-full transition-opacity !duration-500 opacity-0 data-[loaded=true]:opacity-100" alt="avatar" data-loaded="true" />
                                                    </span>
                                                ))
                                            ))
                                        }
                                        </div>


                                    </div>

                                </div>
                            </div>

                        </div>
                    </main>
                </div >
            </div >
        </div >
    )
}

export const ListboxWrapper = ({ children }) => (
    <div className="w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
        {children}
    </div>
);

export function Model({ title, description }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>

            <Modal
                backdrop="opaque"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                radius="lg"
                classNames={{
                    body: "py-6",
                    backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
                    base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
                    header: "border-b-[1px] border-[#292f46]",
                    footer: "border-t-[1px] border-[#292f46]",
                    closeButton: "hover:bg-white/5 active:bg-white/10",
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
                            <ModalBody>
                                {description}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="default" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20" onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}