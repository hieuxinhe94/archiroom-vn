import { AvatarGroup, Avatar, Card, CardBody, Tabs, Tab, Input, Textarea, Image as Image2, Button, useDisclosure, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Chip, Pagination, Progress, CircularProgress, link } from "@nextui-org/react";
import BizCollections, { BizCollection } from "./bizCollections";
import BizAffiliateProducts, { BizAffiliateProduct, BizAffiliateProductCategory } from "./bizAffiliateProduct";
import { useCallback, useRef, useState } from "react";
import { Editor } from '@tinymce/tinymce-react';
import { vtoService } from "~/services/VTOService";
import { getUpdateAuthenticateUser } from "~/pages/business-app";
import React from "react";
import * as ImageJS from 'image-js'
import { imageKitService } from "~/services";
import { useRouter } from 'next/router';
import { ProductItem } from "../ProductItem";

async function getAllCategory(userid: string): Promise<BizAffiliateProductCategory[]> {
    const res = await vtoService.getAllCategories(userid ?? "000");
    if (res.status !== 200) {
        throw new Error('Failed to fetch data')
    }
    return res.data
}

async function getAllProducts(userid: string, offset: number): Promise<BizAffiliateProduct[]> {
    const res = await vtoService.getAffiliateProducts(userid ?? "000", offset);
    if (res.status !== 200) {
        throw new Error('Failed to fetch data')
    }
    return res.data
}

let selectingCategoryItem = ""
export function BizCardAffiliate(props) {
    const router = useRouter()
    const affiliateProducts: BizAffiliateProduct[] = (props.collections ?? BizAffiliateProducts);
    const [allProducts, setAllProducts] = useState<BizAffiliateProduct[]>();
    const [selectingProduct, setSelectingProduct] = useState<BizAffiliateProduct>();
    const [managingCatagory, setManagingCatagory] = useState<boolean>(false);
    const [managingImport, setManagingImport] = useState<boolean>(false);
    const [managingProduct, setManagingProduct] = useState<boolean>(false);
    const [categories, setCategories] = useState<BizAffiliateProductCategory[]>([]);
    const [selectingCategory, setSelectingCategory] = useState(categories?.length ? categories[0].label : "");
    const [selectingCategoryItem, setSelectingCategoryItem] = useState<BizAffiliateProductCategory>();
    let currentUser: UserEntity = props?.currentUser ?? getUpdateAuthenticateUser({});

    React.useEffect(() => {
        console.log("Reload data")
        getAllCategory(currentUser.bizId)
            .then((data) => {

                console.log("Reload setCategories")
                setCategories(data)
            });
        getAllProducts(currentUser.bizId, 0)
            .then((data) => {

                console.log("Reload setAllProducts")
                setAllProducts(data)
            });
    }, [selectingCategory, currentUser]);

    const onDeleteProduct = useCallback(async (id: string) => {
        if (!(currentUser.username || currentUser.email)) {
            alert('You are running in demo mode. Please Sign In to continue...')
            //router.push(`/authenticate`)
            return;
        }
        await vtoService.deleteAffiliateProduct(currentUser.bizId, id).then(
            (res) => {


                //props.onBack();
                router.reload();

                setTimeout(() => {
                }, 1000)
            }
        ).catch((e) => {

        }).finally(() => {

            // temp:
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const queryData = (offset: number) => {
        console.log("Reload setAllProducts skip " + offset)
        getAllProducts(currentUser.bizId, offset)
            .then((data) => {

                console.log("Reload setAllProducts")
                setAllProducts(data)
            });
    }

    return (
        <>
            <div className="relative w-full ">

                <Tabs color="primary" aria-label="Dynamic tabs" selectedKey={selectingCategory} items={categories} onSelectionChange={(key) => {
                    setSelectingCategory(key.toString());
                    const item = categories.findLast(i => i.id == key.toString());
                    setSelectingCategoryItem(item)
                }} >
                    {(item) => (
                        <Tab key={item.id} title={item.label} style={{}} >
                            <div>
                                <section className="w-1/2 mt-12">
                                    <Input labelPlacement="outside" isRequired type="text" className="my-2 max-w-xs" label="Tiêu đề danh mục" placeholder={item.label} />
                                    <Textarea
                                        isRequired
                                        className="my-2 max-w-xl"
                                        label="Miêu tả danh mục"
                                        labelPlacement="outside"
                                        placeholder="Enter your description"
                                        value={item.content}
                                    />

                                </section>

                            </div>
                        </Tab>
                    )}
                </Tabs>
                <div className="absolute top-0 right-10 flex">
                    <Button onClick={() => { setManagingCatagory(!managingCatagory) }} style={{ backgroundColor: "#0C0053" }} className="text-white mx-1" endContent={<><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    </>}>
                        Quản lý danh mục
                    </Button>
                    <Button onClick={() => { setSelectingProduct({ bizId: currentUser.bizId }); setManagingProduct(!managingProduct) }} style={{ backgroundColor: "#0C0053" }} className="text-white mx-1" endContent={<><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                    </svg>
                    </>}>
                        Thêm mới sản phẩm
                    </Button>
                    <Button onClick={() => { setManagingImport(!managingImport) }} style={{ backgroundColor: "#0C0053" }} className="text-white mx-1" endContent={<>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                        </svg>

                    </>}>
                        Import dữ liệu
                    </Button>
                </div>
            </div>

            {managingProduct && <AffiliateProductDetail isActive={true} productItem={selectingProduct}
                categories={categories} categoryItem={selectingCategoryItem} onClose={() => setManagingProduct(!managingProduct)} />}
            {managingCatagory && <ManagingCategory isActive={true} _categories={categories} onClose={() => setManagingCatagory(!managingCatagory)} />}
            {managingImport && <ManagingImport isActive={true} _categories={categories} onClose={() => setManagingImport(!managingImport)} />}


            <div className="w-full flex ">
                <Pagination loop showControls color="success" total={10} initialPage={1} onChange={(page: number) => queryData((page - 1) * 20)} />
            </div>
            <div className={`grid grid-cols-3 gap-3`}>
                {
                    allProducts?.length && allProducts.map((item, i) =>
                    (
                        <Card
                            key={item.id}
                            isBlurred
                            className="border-none mt-8  bg-background/60 dark:bg-default-100/50 w-full"
                            shadow="sm"
                        >
                            <CardBody>
                                <div key={i} className="flex  w-full text-sm   flex-auto place-content-inherit align-items-inherit h-auto break-words text-left subpixel-antialiased relative flex-col md:flex-row md:items-center gap-4 md:gap-9 overflow-visible">
                                    <div className="flex-none w-full sm:w-32 h-32 mb-6 sm:mb-0 relative z-10 before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-br transition-all !ease-soft-spring !duration-500 will-change-auto before:transition-all before:rounded-2xl before:from-[#010187] before:to-[#18000E]">
                                        <img alt="Shoes theme example" loading="lazy" decoding="async" data-nimg="fill"
                                            className="mt-2 ml-2 opacity-10 shadow-black/5 data-[loaded=true]:opacity-90 shadow-none transition-transform-opacity motion-reduce:transition-none object-[45%_50%]  absolute z-10 sm:left-2 inset-0 w-full h-full object-cover rounded-lg transition-all will-change-auto !ease-soft-spring !duration-300" sizes="60vw"
                                            src={item.images?.length ? item.images[0] : ''}
                                            style={{ position: "absolute", height: "85%", width: "80%", top: "18px", left: "8px", inset: "0px", color: "transparent" }} data-loaded="true" /></div>
                                    <div className="flex flex-col justify-center transition-all h-[150px]">
                                        <div className="relative flex flex-wrap items-center">
                                            <span className="relative w-full flex-none text-sm font-semibold text-foreground">{item.name}</span>
                                            <p className="relative w-full text-xs text-default-500">{item.desc.substring(0, 200)}.</p>
                                            {item.priceText ?? item.price ?? ""}
                                            <p className="relative line-through font-semibold text-xs ml-3">{item.oldPrice ?? ""}</p>
                                            <p className="relative font-normal  text-success ml-3">{item.oldPrice && Math.trunc((100 * (item.price - item.oldPrice)) / item.oldPrice) as number}% off</p>
                                        </div>
                                        <div className="relative flex flex-col gap-2 my-4" aria-label="select size" role="radiogroup" aria-orientation="horizontal" id="react-aria5424086005-:r17:">
                                            <div className="flex flex-col flex-wrap gap-2 data-[orientation=horizontal]:flex-row" role="presentation" data-orientation="horizontal">
                                                <label className="group relative max-w-fit inline-flex items-center justify-start cursor-pointer tap-highlight-transparent p-2 -m-2" data-selected="true">
                                                    XS
                                                </label>
                                                <label className="group relative max-w-fit inline-flex items-center justify-start cursor-pointer tap-highlight-transparent p-2 -m-2" data-selected="true">
                                                    SM
                                                </label>
                                            </div>
                                        </div>
                                        <div className="flex space-x-4">
                                            <button onClick={() => { setSelectingProduct(item); setManagingProduct(!managingProduct) }} className="flex mx-1 mt-1" type="button"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                            </svg>
                                                Chỉnh sửa
                                            </button>
                                            <button onClick={() => { onDeleteProduct(item.id) }} className="flex mx-1 mt-1" type="button"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                            </svg>
                                                Xóa
                                            </button>
                                        </div>
                                    </div>
                                    {/* <button className="z-0 group inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-small gap-unit-2 rounded-full px-unit-0 !gap-unit-0 data-[pressed=true]:scale-[0.97] transition-transform-colors-opacity motion-reduce:transition-none bg-transparent data-[hover=true]:bg-default/40 min-w-unit-10 w-unit-10 h-unit-10 absolute top-3 right-3 text-default-400 data-[liked=true]:text-warning" type="button" aria-label="like" data-liked="false">
                                                            <svg aria-hidden="true" fill="none" focusable="false" height="20" role="presentation" viewBox="0 0 24 24" width="20">
                                                                <path d="M13.73 3.51001L15.49 7.03001C15.73 7.52002 16.37 7.99001 16.91 8.08001L20.1 8.61001C22.14 8.95001 22.62 10.43 21.15 11.89L18.67 14.37C18.25 14.79 18.02 15.6 18.15 16.18L18.86 19.25C19.42 21.68 18.13 22.62 15.98 21.35L12.99 19.58C12.45 19.26 11.56 19.26 11.01 19.58L8.01997 21.35C5.87997 22.62 4.57997 21.67 5.13997 19.25L5.84997 16.18C5.97997 15.6 5.74997 14.79 5.32997 14.37L2.84997 11.89C1.38997 10.43 1.85997 8.95001 3.89997 8.61001L7.08997 8.08001C7.61997 7.99001 8.25997 7.52002 8.49997 7.03001L10.26 3.51001C11.22 1.60001 12.78 1.60001 13.73 3.51001Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
                                                            </svg>
                                                        </button> */}
                                </div>
                            </CardBody>
                        </Card>
                    ))
                }
            </div>

        </>
    )
}

var uploadProductCount = 0;

export function AffiliateProductDetail({ isActive = false, productItem, categoryItem, onClose, ...props }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure({ isOpen: isActive });
    const router = useRouter()

    const [selectedImages, setSelectedImages] = useState<File[]>(null);
    const [uploadedImages, setUploadedImages] = useState<string[]>(productItem?.images ?? []);
    const [name, setName] = useState(productItem?.name);
    const [desc, setDesc] = useState(productItem?.desc);
    const [allCategories, setAllCategories] = useState(props?.categories);
    const [affiliateUrl, setAffiliateUrl] = useState(productItem?.affiliateUrl);
    const [affiliateText, setAffiliateText] = useState(productItem?.affiliateUrl);
    const [affiliateProvider, setAffiliateProvider] = useState(productItem?.affiliateProvider);
    const [status, setStatus] = useState(productItem?.status);
    const [groupType, setGroupType] = useState(productItem?.groupType);
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };
    const [price, setPrice] = useState(productItem?.price);
    const [priceText, setPriceText] = useState(productItem?.priceText);
    const [oldPrice, setOldPrice] = useState(productItem?.oldPrice);
    const [category, setCategory] = useState(productItem?.category);
    const [collectionType, setCollectionType] = useState(productItem.groupType);
    const [isUploadingImages, setIsUploadingImages] = useState(false)
    const [uploadImageFileCount, setUploadImageFileCount] = useState<number>(0);
    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImages(Array.from(e.target.files));

            setUploadImageFileCount(e.target.files.length);
            uploadProductCount = e.target.files.length;
        }
    };
    const session = props?.session;
    let currentUser: UserEntity = props?.currentUser ?? getUpdateAuthenticateUser({});

    // This is the promise code, so this is the useful bit
    const ensureCallAPIVTO = useCallback(async (timeout = 200000) => {
        var start = Date.now();
        return new Promise(waitForUploadedAllImages); // set the promise object within the waitForUploadedAllImages object
        function waitForUploadedAllImages(resolve, reject) {

            if ((uploadProductCount == 0)) {

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



    const onSave = async () => {
        //validate...
        if (!session && !(currentUser.username || currentUser.email)) {
            alert('You are running in demo mode. Please Sign In to continue...')
            //router.push(`/authenticate`)
            return;
        }
        // wait for upload images:
        selectedImages?.forEach(async (image, i) => {
            var newFileName = `${currentUser?.id ?? 'anonymous'}-${encodeURI(name)}-${i}` + '.png'
            const imageUrl = URL.createObjectURL(image)
            const img = await ImageJS.Image.load(imageUrl)

            await imageKitService
                .upload({
                    file: img.toDataURL(),
                    fileName: (newFileName),
                })
                .then((uploaded) => {


                    uploadedImages.push(uploaded.url);
                    setUploadedImages(uploadedImages)
                    uploadProductCount--;

                });
        });


        const affiliateProduct: BizAffiliateProduct = {
            id: productItem.id,
            bizId: (currentUser.bizId || currentUser.email),
            name: name,
            desc: editorRef.current.getContent(),
            price: price,
            oldPrice: oldPrice,
            categoryId: categoryItem.id,
            category: category,
            images: uploadedImages,
            affiliateUrl: affiliateUrl,
            affiliateText: affiliateText,
            affiliateProvider: affiliateProvider,
            status: status,
            groupType: groupType,
            priceText: priceText
        };



        await ensureCallAPIVTO().then(async function () {
            await vtoService.saveAffiliateProduct(affiliateProduct).then(
                (res) => {

                    router.reload();

                }
            ).catch((e) => {

            }).finally(() => {
                // temp:
            });
        });
    }

    return (
        <>

            <Modal size="full"
                className=""
                style={{ overflowY: "scroll" }}
                isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={true} isKeyboardDismissDisabled={true} onClose={onClose}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Chỉnh sửa sản phẩm</ModalHeader>
                            <ModalBody>
                                <main className="h-full w-full text-base">
                                    <div className="flex  w-full flex-col gap-4 p-2">
                                        <div className="flex w-full gap-4 max-w-xs">
                                            <Chip color="default">  {category} </Chip>  <Chip color="default">  {groupType} {status}</Chip>
                                        </div>
                                        <div className="flex  gap-4 w-full">
                                            <div data-slot="main-wrapper" className="h-full w-1/3 flex flex-col">
                                                <div data-slot="inner-wrapper" className="inline-flex w-full items-center h-full box-border">
                                                    <Select defaultSelectedKeys={[groupType]} value={groupType} onChange={(e) => setGroupType(e.target.value)} label="Chọn loại trang phục" className="max-w-xs">
                                                        <SelectItem key={"UPPERBODY"} value={"UPPERBODY"}>
                                                            Upper Body
                                                        </SelectItem>
                                                        <SelectItem key={"LOWERBODY"} value={"LOWERBODY"}>
                                                            Lower Body
                                                        </SelectItem>
                                                        <SelectItem key={"DRESS"} value={"DRESS"}>
                                                            Dress
                                                        </SelectItem>
                                                    </Select>
                                                </div>
                                            </div>

                                            <div data-slot="main-wrapper" className="h-full w-1/3 flex flex-col">
                                                <div data-slot="inner-wrapper" className="inline-flex w-full items-center h-full box-border">
                                                    <Select defaultSelectedKeys={[status]} value={status} onChange={(e) => setStatus(e.target.value)} label="Chọn trạng thái" className="max-w-xs">
                                                        <SelectItem key={"TRENDING"} value={"TRENDING"}>
                                                            TRENDING
                                                        </SelectItem>
                                                        <SelectItem key={"NEW"} value={"NEW"}>
                                                            NEW
                                                        </SelectItem>
                                                        <SelectItem key={"SALE-OFF"} value={"SALE-OFF"}>
                                                            SALE-OFF
                                                        </SelectItem>
                                                        <SelectItem key={"SALE-OFF"} value={"SALE-OFF"}>
                                                            RECOMMEND
                                                        </SelectItem>
                                                        <SelectItem key={"SALE-OFF"} value={"SALE-OFF"}>
                                                            OTHERS
                                                        </SelectItem>
                                                    </Select>
                                                </div>
                                            </div>

                                            <div data-slot="main-wrapper" className="h-full w-1/3 flex flex-col">
                                                <div data-slot="inner-wrapper" className="inline-flex w-full items-center h-full box-border">
                                                    <Select defaultSelectedKeys={[category]} value={category} onChange={(e) => setCategory(e.target.value)} label="Chọn group" className="max-w-xs">
                                                        {allCategories.map((item: BizAffiliateProductCategory) =>
                                                        (<SelectItem key={item.label} value={item.label}>
                                                            {item.label}
                                                        </SelectItem>
                                                        ))}
                                                    </Select>
                                                </div>
                                            </div>
                                        </div>

                                        <Input
                                            isRequired
                                            labelPlacement="outside"
                                            className="max-w-xl p-1"
                                            label="Tên sản phẩm"
                                            value={name}
                                            onValueChange={setName}
                                        />

                                        <div className="flex w-full">
                                            <div className="flex w-1/3">
                                                <Input
                                                    isRequired
                                                    labelPlacement="outside"
                                                    className="max-w-lg mr-5"
                                                    type="number"
                                                    label="Giá sau khuyến mãi"
                                                    value={price}
                                                    onValueChange={setPrice}

                                                />
                                            </div> <div className="flex w-1/3">
                                                <Input
                                                    isRequired
                                                    labelPlacement="outside"
                                                    className="max-w-lg mr-5"
                                                    type="text"
                                                    label="priceText"
                                                    value={priceText}
                                                    onValueChange={setPriceText}

                                                />
                                            </div>
                                            <div className="flex w-1/3">
                                                <Input
                                                    isRequired
                                                    labelPlacement="outside"
                                                    className="max-w-lg mr-5"
                                                    label="Giá trước khuyến mãi"
                                                    type="number"
                                                    value={oldPrice}
                                                    onValueChange={setOldPrice}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex w-full">
                                            <div className="flex w-1/2">
                                                <Input
                                                    isRequired
                                                    labelPlacement="outside"
                                                    className="max-w-lg mr-5"
                                                    type="text"
                                                    label="Affiliate Url"
                                                    value={affiliateUrl}
                                                    onValueChange={setAffiliateUrl}

                                                />
                                            </div>
                                            <div className="flex w-1/2">
                                                <Input
                                                    isRequired
                                                    labelPlacement="outside"
                                                    className="max-w-lg mr-5"
                                                    label="Affiliate Provider"
                                                    type="text"
                                                    value={affiliateProvider}
                                                    onValueChange={setAffiliateProvider}
                                                />
                                            </div>
                                        </div>


                                        <Editor
                                            apiKey='6cc3em9fltlc8qy7kfu77my9xvxvvl7l4yfez8w155zv1o8v'
                                            onInit={(_evt, editor) => editorRef.current = editor}
                                            initialValue={desc}
                                            init={{
                                                height: 200,
                                                menubar: false,
                                                plugins: [
                                                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                                ],
                                                toolbar: 'undo redo | blocks | ' +
                                                    'bold italic forecolor | alignleft aligncenter ' +
                                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                                    'removeformat | help',
                                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                            }}
                                        />


                                        <div className='text-xs'>
                                            Drag & drop collections images:
                                        </div>

                                        <div className="flex w-full flex-col gap-4 ">
                                            <form className="flex w-full flex-col items-start rounded-medium bg-default-100 transition-colors hover:bg-default-200/70 ">
                                                <div className="group  gap-2 px-4 pt-4">
                                                    {
                                                        uploadedImages && uploadedImages.map((url, i) =>
                                                        (<div key={i} className="relative inline-flex shrink-0 p-2">
                                                            <div className="relative shadow-black/5 shadow-none rounded-large" style={{ maxWidth: "fit-content" }}>
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
                                                            <div className="relative shadow-black/5 shadow-none rounded-large" style={{ maxWidth: "fit-content" }}>
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
                                                            width: "150px",
                                                            height: "150px !important", opacity: 0,
                                                            position: "absolute",
                                                            zIndex: -1
                                                        }}>
                                                    </input>
                                                    <label htmlFor="upload-photo">

                                                        <div data-slot="input-wrapper" className="cursor-pointer relative w-full inline-flex tap-highlight-transparent px-3 bg-default-100 data-[hover=true]:bg-default-200 group-data-[focus=true]:bg-default-100 min-h-unit-10 rounded-large flex-col items-start justify-center gap-0 !h-auto transition-background motion-reduce:transition-none !duration-150 outline-none group-data-[focus-visible=true]:z-10 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-2 group-data-[focus-visible=true]:ring-offset-background h-14 py-2 !bg-transparent shadow-none" data-has-multiple-rows="true" style={{ cursor: "text" }}>
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
                                                                        <p className="py-1 text-tiny text-default-400">{uploadProductCount}/5 image uploaded</p>
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
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Hủy
                                </Button>

                                <Button onClick={() => { onSave(); onClose() }} style={{ backgroundColor: "#0C0053" }} className="text-white mx-1" endContent={<><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                </>}>
                                    Lưu lại
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export function ManagingCategory({ isActive = false, _categories, onClose, ...props }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure({ isOpen: isActive });
    const router = useRouter()
    const [categories, setCategories] = useState<BizAffiliateProductCategory[]>(_categories)
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const session = props?.session;
    let currentUser: UserEntity = props?.currentUser ?? getUpdateAuthenticateUser({});
    const onSave = async () => {
        //validate...
        if (!session && !(currentUser.username || currentUser.email)) {
            alert('You are running in demo mode. Please Sign In to continue...')
            //router.push(`/authenticate`)
            return;
        }
        const lastItem: BizAffiliateProductCategory = categories.findLast((item) => (item.type == "NEW"));
        if (name && name.length) {
            lastItem.label = name;
            lastItem.content = desc;
            lastItem.bizId = currentUser.bizId;
            lastItem.type = "";
        }



        await vtoService.saveCategories(categories).then(
            (res) => {
                onClose();

                router.reload();

                setTimeout(() => {
                }, 1000)
            }
        ).catch((e) => {

        }).finally(() => {
            // temp:
        });
    }

    const onDeleteCategory = useCallback(async (id: string) => {
        if (!session && !(currentUser.username || currentUser.email)) {
            alert('You are running in demo mode. Please Sign In to continue...')
            //router.push(`/authenticate`)
            return;
        }
        await vtoService.deleteCategory(currentUser.bizId, id).then(
            (res) => {


                //props.onBack();


                setTimeout(() => {
                }, 1000)
            }
        ).catch((e) => {

        }).finally(() => {

            // temp:
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>

            <Modal size="5xl" isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} onClose={onClose}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Quản lý danh mục</ModalHeader>
                            <ModalBody>
                                <div className="relative flex w-full px-3 flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased">
                                    <div className="  flex flex-col gap-2">
                                        {
                                            categories?.map((item, i) => (
                                                <div key={i} id='i'>
                                                    <div onClick={null} className="pb-4 cursor-pointer flex items-center justify-between gap-2 rounded-medium p-8 bg-transparent px-3 py-1">
                                                        <div className=" items-center w-1/3 ">
                                                            {item.type !== "NEW" ? (item.label) : (<Input
                                                                isRequired
                                                                labelPlacement="outside"
                                                                className="max-w-lg mr-5"
                                                                label="Label"
                                                                value={name}
                                                                onValueChange={setName}
                                                            />)}


                                                        </div>
                                                        <div className=" gap-2 w-1/2">
                                                            {item.type !== "NEW" ? (item.content) : (<Textarea
                                                                isRequired
                                                                rows={1}
                                                                className=" w-full"
                                                                label="Miêu tả danh mục"
                                                                labelPlacement="outside"
                                                                value={desc}
                                                                onValueChange={setDesc}
                                                            />)}


                                                        </div>
                                                        {item.type !== "NEW" ? (<button onClick={() => { categories.splice(i, 1); setCategories([...categories]); onDeleteCategory(item.id) }} className="text-small text-default-400">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z" />
                                                            </svg>
                                                        </button>) : (<button className="mx-3"> {" "}</button>)}


                                                    </div>
                                                    <hr className="shrink-0 bg-divider border-none w-full h-divider" role="separator" />
                                                </div>
                                            ))
                                        }

                                    </div>

                                    <div className="py-4 max-w-sm">
                                        <Button onClick={() => {
                                            // save last row
                                            const lastItem: BizAffiliateProductCategory = categories.findLast((item) => (item.type == "NEW"));
                                            if (name && name.length) {
                                                lastItem.label = name;
                                                lastItem.content = desc;
                                                lastItem.bizId = currentUser.bizId;
                                                lastItem.type = "";
                                            }
                                            // init new row
                                            categories.push({
                                                id: "", label: "", content: "", type: "NEW"
                                            })
                                            setCategories([...categories])
                                            setName("")
                                            setDesc("")
                                        }} style={{ backgroundColor: "#0C0053" }} className="text-white mx-1"
                                            endContent={<>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                </svg>

                                            </>}>
                                            Thêm
                                        </Button>

                                    </div>

                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={() => { onSave(); }}>
                                    Lưu lại
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}


export function ManagingImport({ isActive = false, _categories, onClose, ...props }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure({ isOpen: isActive });
    const router = useRouter()
    const [categories, setCategories] = useState<BizAffiliateProductCategory[]>(_categories)
    const [records, setRecords] = useState<string[]>();
    const [desc, setDesc] = useState("");
    const [url, setUrl] = useState("");
    const [title, setTitle] = useState(null);
    const [isCrawling, setIsCrawling] = useState(false);
    const session = props?.session;
    let currentUser: UserEntity = props?.currentUser ?? getUpdateAuthenticateUser({});
    const [creatingProducts, setCreatingProducts] = useState<BizAffiliateProduct[]>([]);
    const onSave = async () => {
        //validate...
        if (!session && !(currentUser.username || currentUser.email)) {
            alert('You are running in demo mode. Please Sign In to continue...')
            //router.push(`/authenticate`)
            return;
        }

        if (records) {
            records.splice(0, 1);

            // submit
            let _creatingProducts: BizAffiliateProduct[] = [];

            records.forEach(item => {
                let dataArray = item.replace('"', '').split(',')
                let images = [dataArray[5]?.replace('\"', '').replace('\"', '')];
                creatingProducts.push({

                    bizId: (currentUser.bizId || currentUser.email),
                    name: dataArray[1]?.replace('\"', '').replace('\"', ''),
                    desc: dataArray[6],
                    price: Number.parseInt(dataArray[3]?.replace('\"', '').replace('\"', '')),
                    oldPrice: Number.parseInt(dataArray[4]?.replace('\"', '').replace('\"', '')),
                    categoryId: (currentUser.bizId || currentUser.email) + 'auto',
                    category: dataArray[8]?.replace('\"', '').replace('\"', ''),
                    images: images,
                    affiliateUrl: dataArray[2]?.replace('\"', '').replace('\"', ''),
                    affiliateText: dataArray[0]?.replace('\"', '').replace('\"', ''),
                    affiliateProvider: desc
                });

            });
            await vtoService.importAffiliateProduct(_creatingProducts).then(
                (res) => {
                    console.log(res);
                    alert(res + ' records import successfully!')
                    router.reload();
                }
            ).catch((e) => {

            }).finally(() => {
                // temp:
            });


        }

        if (creatingProducts) {
            await vtoService.importAffiliateProduct(creatingProducts).then(
                (res) => {
                    console.log(res);
                    alert(res + ' records import successfully!')
                    router.reload();
                }
            ).catch((e) => {

            }).finally(() => {
                // temp:
            });
        }
    }


    const onCrawlingUrlAmazon = useCallback(async (url: string) => {
        const urls = url.split(',');
        setIsCrawling(true)
        await vtoService.crawAmazoneProduct(urls).then(
            (res) => {
                setIsCrawling(false)
                console.log(res);
                let affiliateProducts: BizAffiliateProduct[] = [];
                Array.from(res?.data).forEach((page: any) => {
                    setTitle((title ?? '') + ',' + page.title)
                    affiliateProducts.push({
                        bizId: (currentUser.bizId || currentUser.email),
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

                setCreatingProducts(affiliateProducts);
            }
        ).catch((e) => {

        }).finally(() => {
            // temp:
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const onDeleteCategory = useCallback(async (id: string) => {
        if (!session && !(currentUser.username || currentUser.email)) {
            alert('You are running in demo mode. Please Sign In to continue...')
            //router.push(`/authenticate`)
            return;
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const fileReader = new FileReader();
    const fileUploadChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            var file = e.target.files[0];
            if (file) {
                fileReader.onload = function (event) {
                    const csvOutput = event.target.result;
                    const csvText = csvOutput.toString();
                    var allTextLines = csvText.split(/\r\n|\n/);


                    var entries = allTextLines[0].split(',');
                    var lines = [];

                    var headings = entries.splice(0, 1);
                    console.log(headings);
                    // for (let i = 0; i < allTextLines.length; i++) {
                    //     const line = allTextLines[i];
                    //     console.log(line);
                    // }
                    setRecords(allTextLines);
                    console.log(lines);
                };

                fileReader.readAsText(file);
            }
        }
    };

    return (
        <>
            <Modal size="5xl" isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} onClose={onClose}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Import dữ liệu</ModalHeader>
                            <ModalBody>
                                <div className="relative flex w-full px-3 flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased">

                                    <div className="w-full flex">
                                        <Input
                                            isRequired
                                            labelPlacement="outside"
                                            className="max-w-xl py-1"
                                            label=" URL sản phẩm (amazone url)"
                                            value={url}
                                            onValueChange={(value) => {

                                                setUrl(value);
                                            }}
                                        />
                                        <span className="my-8">
                                            {creatingProducts && creatingProducts.length && (<ProductItem width={150} height={150} product={creatingProducts[0]} index={0} />)}

                                        </span>

                                        {isCrawling && <CircularProgress
                                            aria-label="Generating..."
                                            size="md"
                                            value={1}
                                            color="default"
                                            showValueLabel={true}
                                            label={"Processing..."}
                                            className="max-w-lg text-sm"
                                        />}

                                    </div>
                                    *Các link cách nhau bằng dấu phẩy
                                    <Button onClick={() => {
                                        onCrawlingUrlAmazon(url)
                                    }} style={{ backgroundColor: "#0C0053" }} className="text-white mx-1 max-w-sm my-2"
                                    >
                                        Check urls
                                    </Button>
                                    <hr className="my-12" />
                                    <span className=" pt-4">hoặc Accesstrade</span>
                                    <Input
                                        isRequired
                                        labelPlacement="outside"
                                        className="max-w-xl py-1"
                                        label="Tên Provider"
                                        value={desc}
                                        onValueChange={setDesc}
                                    />



                                    <div className=" bold flex flex-col gap-2"> Bạn có chắc chắn import {records?.length} bản ghi. Ví dụ: </div>

                                    <hr className="my-12" />
                                    <div className="  flex flex-col gap-2">


                                        {
                                            records?.slice(0, 5).map((item, i) => (
                                                <div key={i} id='i'>
                                                    <div onClick={null} className="pb-4 cursor-pointer flex items-center justify-between gap-2 rounded-medium p-8 bg-transparent px-3 py-1">
                                                        <div className=" ">
                                                            {
                                                                (item as string).split(',').map(t => (<span key={t}> {t.replace('\"', '')}  || </span>))
                                                            }
                                                        </div>
                                                    </div>
                                                    <hr className="shrink-0 bg-divider border-none w-full h-divider" role="separator" />
                                                </div>
                                            ))
                                        }
                                    </div>


                                    <div className="py-4 w-full flex">
                                        <Button onClick={() => {
                                        }} style={{ backgroundColor: "#0C0053" }} className="text-white mx-1"
                                            endContent={<>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                                                </svg>

                                            </>}>

                                            <input
                                                id="upload-photo"
                                                data-slot="input"
                                                accept=".csv"
                                                type="file"
                                                multiple
                                                onChange={fileUploadChange}
                                                data-has-start-content="true"
                                                data-has-end-content="true"
                                                className="w-full font-normal bg-transparent !outline-none placeholder:text-foreground-500 focus-visible:outline-none data-[has-start-content=true]:ps-1.5 data-[has-end-content=true]:pe-1.5 resize-none data-[hide-scroll=true]:scrollbar-hide group-data-[has-value=true]:text-default-foreground transition-height !duration-100 motion-reduce:transition-none py-0 pt-1 pb-6 !pr-10 text-medium"
                                                aria-label="Prompt"
                                                placeholder="Upload fashion images here!"
                                                data-hide-scroll="true"
                                                style={{
                                                    width: "300px",
                                                    height: "300px !important", opacity: 0,
                                                    position: "absolute",
                                                    zIndex: -1
                                                }}>
                                            </input>
                                            Chọn file csv
                                        </Button>


                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={() => { onSave(); }}>
                                    Tiếp tục
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}