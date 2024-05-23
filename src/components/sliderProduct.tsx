import React from "react";
import { BizAffiliateProduct } from "./biz/bizAffiliateProduct";
import { ProductItem } from "./ProductItem";

export function SliderProduct({ products = [], size = 5 }) {
    const [page, setPage] = React.useState(0);

    const pageLength = Array.from(products).length / size;

    // React.useEffect(() => {
    //     if (!products) return;
    //     const length = Array.from(products).length / 5;
    //     const interval = setInterval(() => {
    //         setValue((v) => (v >= (length) ? 1 : v + 1));
    //     },
    //         5000);
    //     return () => clearInterval(interval);
    // }, [products]);


    return (
        <div>
            <div
                className="splide splide--slide splide--ltr splide--draggable is-active is-initialized "
                id="splide03"
                role="region"
                aria-roledescription="carousel"
            >
                <div className="splide__arrows splide__arrows--ltr">
                    <button
                        onClick={() => { if (page >= 1) setPage(page - 1) }}
                        className="splide__arrow splide__arrow--prev"
                        type="button"

                        aria-label="Previous slide"
                        aria-controls="splide03-track"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 40 40"
                            width={40}
                            height={40}
                            focusable="false"
                        >
                            <path d="m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z" />
                        </svg>
                    </button>
                    <button
                        className="splide__arrow splide__arrow--next"
                        type="button"
                        onClick={() => { if (page < pageLength) setPage(page + 1) }}
                        aria-label="Next slide"
                        aria-controls="splide03-track"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 40 40"
                            width={40}
                            height={40}
                            focusable="false"
                        >
                            <path d="m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z" />
                        </svg>
                    </button>
                </div>
                <div
                    className="splide__track splide__track--slide splide__track--ltr splide__track--draggable"
                    id="splide03-track"
                    style={{ paddingLeft: 0, paddingRight: 0 }}
                    aria-live="polite"
                    aria-atomic="true"
                >
                    <ul
                        className="splide__list block lg:flex"
                        id="splide03-list"
                        role="presentation"
                        security=""
                        style={{ transform: "translateX(0px)" }}
                    >
                        {(products as BizAffiliateProduct[])?.slice(page, page + (size )).map((product, index) => (
                            <li
                                key={index}
                                className="splide__slide slide items-stretch pb-10 is-active is-visible w-full lg:w-1/4 "
                                id="splide03-slide01"
                                role="group"
                                aria-roledescription="slide"
                                aria-label="1 of 4"
                                style={{ marginRight: 10, }}
                            >
                                <ProductItem product={product} index={index} />
                            </li>

                        ))}

                    </ul>
                </div>
            </div>
        </div>
    )
}

