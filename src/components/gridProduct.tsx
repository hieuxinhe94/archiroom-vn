import React from "react";
import { BizAffiliateProduct } from "./biz/bizAffiliateProduct";
import { ProductItem } from "./ProductItem";

export function GridProduct({ products = [], size = 20 }) {
    const [page, setPage] = React.useState(0);
    const pageLength = Array.from(products).length / size;

    return (
        <div className="flex w-full gap-4 ">
            <div className="grid grid-cols-4 gap-4">
                {(products as BizAffiliateProduct[])?.slice(page, page + (size)).map((product, index) => (
                    <div key={index} className="w-full">
                        <ProductItem key={index} product={product} index={index} />
                    </div>
                ))}
            </div>
        </div>
    )
}

