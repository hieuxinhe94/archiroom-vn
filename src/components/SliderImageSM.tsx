import React from "react";


export function SliderImageSM({ dataArray = [] }) {
    const [value, setValue] = React.useState(0);
    const length = Array.from(dataArray).length;

    React.useEffect(() => {
        if (!dataArray) return;

        if (length <= 1) return;
        const interval = setInterval(() => {
            setValue((v) => (v >= (length - 1) ? 0 : v + 1));
        },
            1500);
        return () => clearInterval(interval);
    }, [dataArray, length]);


    return (<div
        id="custom-controls-gallery"
        className="relative w-full"
        data-carousel="slide"
        style={{
            marginLeft: "10px",
            marginTop: "10px"
        }}
    >

        <div className="relative h-56 overflow-hidden rounded-lg md:h-96">

            {
                (dataArray?.map((item, idx) => (
                    <div key={idx} className={(idx == (value) ? "" : "hidden ") + (value) + " duration-700 ease-in-out"} data-carousel-item={idx}>
                        <img
                            style={
                                { height: 400, paddingBottom: '30px', width: "auto", paddingLeft: '2px' }
                            }
                            src={item}
                            className="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                            height={400}
                            loading="lazy"
                            alt=""
                        />
                    </div>
                )))
            }


            <span className="sr-only">AI Rendering</span>
        </div>
        {
            length > 1 && (<div className="flex justify-center items-center pt-4">
                <button
                    type="button"
                    onClick={() => { if (value >= 1) setValue(value - 1) }}
                    className="flex justify-center items-center me-4 h-full cursor-pointer group focus:outline-none"
                    data-carousel-prev=""
                >
                    <span className="text-gray-400 hover:text-gray-900 dark:hover:text-white group-focus:text-gray-900 dark:group-focus:text-white">
                        <svg
                            className="rtl:rotate-180 w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 5H1m0 0 4 4M1 5l4-4"
                            />
                        </svg>
                        <span className="sr-only">Previous</span>
                    </span>
                </button>
                <button
                    type="button"
                    className="flex justify-center items-center h-full cursor-pointer group focus:outline-none"
                    onClick={() => { if (value < length) setValue(value + 1) }}
                >
                    <span className="text-gray-400 hover:text-gray-900 dark:hover:text-white group-focus:text-gray-900 dark:group-focus:text-white">
                        <svg
                            className="rtl:rotate-180 w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                        </svg>
                        <span className="sr-only">Next</span>
                    </span>
                </button>
            </div>)

        }

    </div>
    )
}
