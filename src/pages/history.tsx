import { Button, Card, CardFooter, Chip, getKeyValue,Image as Image2, Skeleton, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, User } from '@nextui-org/react'
import confetti from 'canvas-confetti'
import Image from 'next/image'
import Script from 'next/script';
import { NextSeo } from 'next-seo';
import { useState } from 'react'
import React from 'react';
import { useForm } from "react-hook-form";

import Container from '~/components/Container'
import Footer from '~/components/footer';
import Navbar from '~/components/navbar';
import { getClient } from '~/lib/sanity.client';

import polygon from "../assets/background-images/polygon.svg"
import polygonfooter from "../assets/background-images/polygon-footer.svg"
import purpleGradient from "../assets/background-images/purple-gradient.svg"
import vector from "../assets/background-images/vector.svg"

 async function getHistory(): Promise<any[]> {
  const res = await fetch('https://api.tryonhub.ai/result');

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export const getServerSideProps  = async ({ draftMode = false }) => {

  const historyResult = await getHistory();
  return {
    props: {
      historyResult: historyResult
    },
  }
}

export default function History(props) {
  const [page, setPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasMore, setHasMore] = React.useState(true);


  // 
  // 

  const renderCell = (item, columnKey) => {
    const cellValue = item[columnKey];

    //   { name: "Human", uid: "human" },
    //   { name: "Clothing", uid: "clothing" },
    //   { name: "Output", uid: "output" },
    //   { name: "ELAPSED TIME", uid: "elapsedtime" },
    //   { name: "Status", uid: "status" },
    //   { name: "Actions", uid: "actions" },
    // {
    //   "_id": "",
    //   "bodySrc": "",
    //   "clothesSrc": "",
    //   "SECOND_OF_TIME_TAKEN": "",
    //   "uid": "",
    //   "createdDate": ""
    // },

    let imageUrls = (item["OUTPUT_IMAGE"] as string).split(',');
    // 

    switch (columnKey) {
      case "createdtime":
        var date = new Date(Math.floor(item["createdDate"] as number));

        return (
          <Chip className="capitalize" color={statusColorMap[0]} size="sm" variant="flat">
            {date.toTimeString()}
          </Chip>
        );
      case "human":
        return (
          <>
            <Tooltip content={item["bodySrc"]}>
              <Image2
                isBlurred
                width={120}
                src={item["bodySrc"]}
                alt="bodySrc"
                className="m-5"
              /></Tooltip>

          </>
        );
      case "clothing":
        return (
          <>
            <Tooltip content={item["clothesSrc"]}>
              <Image2
                isBlurred
                width={120}
                src={item["clothesSrc"]}
                alt="clothesSrc"
                className="m-5"
              />
            </Tooltip>

          </>
        );
      case "output":
        return (
          <>
            <div className='flex'>
              {
                imageUrls.map((imageUrl, index) => (
                  <div key={index} className='w-1/2'>
                    <Card
                      isFooterBlurred
                      radius="lg"
                      className="border-none"
                    >

                      <Tooltip content={imageUrl + "-2HD"}>

                        <Image2
                          key={imageUrl}
                          isBlurred
                          width={120}
                          src={imageUrl}
                          alt="OUTPUT_IMAGE"
                          className="m-5"
                        />

                      </Tooltip>
                      <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                        <p className="text-tiny text-gray-800">{imageUrls?.length > 1? " V2.(new) - " + index : " V1.Normal"}</p>

                      </CardFooter>
                    </Card>
                  </div>
                ))
              }
              {/* <div className='w-1/2'>

                <Card
                  isFooterBlurred
                  radius="lg"
                  className="border-none"
                >
                  {
                    imageUrls.map(imageUrl => (
                      <Image2
                        key={imageUrl}
                        isBlurred
                        width={120}
                        src={imageUrl}
                        alt="OUTPUT_IMAGE"
                        className="m-5"
                      />
                    ))
                  }
                  <Tooltip content={item["OUTPUT_IMAGE"] + "-2HD"}>


                  </Tooltip>
                  <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                    <p className="text-tiny text-gray-800 bg-purple-200 px-2">V1.HD</p>

                  </CardFooter>
                </Card>


              </div> */}
            </div>

            <p className='text-gray-600 text-xs pt-4'>id: {item["_id"]}</p>

            {/* <div className='flex py-5'>
              <div className='w-1/2'>
                <Card
                  isFooterBlurred
                  radius="lg"
                  className="border-none"
                >
                  <Tooltip >
                    {
                      item["OUTPUT_IMAGE"].split(',').map(imageUrl => (
                        <Image2
                        key={imageUrl}
                          isBlurred
                          width={120}
                          src={imageUrl}
                          alt="OUTPUT_IMAGE"
                          className="m-5"
                        />
                      ))
                    }

                  </Tooltip>
                  <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                    <p className="text-tiny text-gray-800">V2.Normal</p>

                  </CardFooter>
                </Card>
              </div></div> */}
          </>
        );
      case "elapsedtime":
        return (
          <Chip className="capitalize" color={statusColorMap[0]} size="sm" variant="flat">
            {item["SECOND_OF_TIME_TAKEN"]} seconds
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit ">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete ">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  };

  return (
    <>

      <section className='bg-black/10'>
        <Container>
          <div className="relative ">
            <Image priority={true} src={purpleGradient} width={200} height={200} className='absolute top-[-100px] right-[70px]' alt={''} />
            <Image priority={true} src={polygon} width={900} height={900} className='absolute top-[-100px] right-[200px]' alt={''} />
          </div>

        </Container>
      </section>

      <NextSeo
        title={`${"Log History"}`}
        description={"" || ""}
        canonical={`/history/`}
        twitter={{
          cardType: "summary_large_image",
        }}
      />
      <div className="w-2/3 mx-auto " style={{ zIndex: 50 }}>
        <h1 className="mt-32 mb-3 text-2xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl dark:text-white"></h1>
        <div className="text-center"></div>

        <div className="grid my-10 text-white z-50">
          <div className="my-10">
            <h2 className="text-2xl font-semibold dark:text-white">SIMPLIFY TECH.INC</h2>
            <p className="max-w-sm mt-5 text-justify">

              Output logs: (thêm -2HD vào đuôi ảnh để có ảnh 2HD)

            </p>

            <p className='mt-12'></p>
            <div className="mt-5">

              <Table aria-label="Example table with custom cells">
                <TableHeader columns={columns}>
                  {(column) => (
                    <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                      {column.name}
                    </TableColumn>
                  )}
                </TableHeader>
                <TableBody items={props.historyResult || []}>
                  {(item) => (
                    <TableRow key={item["_id"]}>
                      {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                  )}
                </TableBody>
              </Table>

            </div>
          </div>
          <div>
          </div>
        </div>
      </div>{" "}

      <Footer />

    </>
  )
}


export const EditIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 20 20"
    width="1em"
    {...props}
  >
    <path
      d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
    />
    <path
      d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
    />
    <path
      d="M2.5 18.3333H17.5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
    />
  </svg>
);


export const DeleteIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 20 20"
    width="1em"
    {...props}
  >
    <path
      d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M8.60834 13.75H11.3833"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M7.91669 10.4167H12.0834"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </svg>
);

export const EyeIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 20 20"
    width="1em"
    {...props}
  >
    <path
      d="M12.9833 10C12.9833 11.65 11.65 12.9833 10 12.9833C8.35 12.9833 7.01666 11.65 7.01666 10C7.01666 8.35 8.35 7.01666 10 7.01666C11.65 7.01666 12.9833 8.35 12.9833 10Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M9.99999 16.8916C12.9417 16.8916 15.6833 15.1583 17.5917 12.1583C18.3417 10.9833 18.3417 9.00831 17.5917 7.83331C15.6833 4.83331 12.9417 3.09998 9.99999 3.09998C7.05833 3.09998 4.31666 4.83331 2.40833 7.83331C1.65833 9.00831 1.65833 10.9833 2.40833 12.1583C4.31666 15.1583 7.05833 16.8916 9.99999 16.8916Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </svg>
);

const columns = [
  { name: "Created ", uid: "createdtime" },
  { name: "Human", uid: "human" },
  { name: "Clothing", uid: "clothing" },
  { name: "Output", uid: "output" },
  { name: "ELAPSED TIME", uid: "elapsedtime" },
  { name: "Status", uid: "status" },
  { name: "Actions", uid: "actions" },
];

const histories = [
  {
    "_id": "",
    "bodySrc": "",
    "clothesSrc": "",
    "SECOND_OF_TIME_TAKEN": "",
    "uid": "",
    "createdDate": ""
  },
]


