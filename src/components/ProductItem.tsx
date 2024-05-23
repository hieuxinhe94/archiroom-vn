import { CircularProgress } from "@nextui-org/react";

export function ProductItem({ product, index, width = 1920, height = 2400 }) {

  return (

    <a
      data-testid="product-link"
      className="grid grid-rows-[1fr_minmax(25px_50px)_40px] place-items-stretch w-full min-h-full justify-stretch items-stretch relative product-link"
      href={"/affiliate-product/" + product.id}
    >
      <div className="absolute top-3 left-2 bg-green2 items-center flex z-[20] justify-center rounded-full w-[45px] h-[45px] text-[#fff] text-sm">
        {product.affiliateProvider}
      </div>
      <div className="absolute top-3 right-2 bg-green2 items-center flex z-[20] justify-center rounded-full w-[45px] h-[45px] text-[#fff] text-sm">
        {/* <CircularProgress
            size="sm"
            value={0}
            color="warning"
            showValueLabel={true}
          /> */}
      </div>
      <div
        // style={{ height: height }}
        className=" img-container  img-contain img-border border-solid border border-[#dfdfdf]  bg-[#fff] rounded-md  overflow-hidden grow-1">

        <img
          src={product.images.length ? product.images[0] : ""}
          style={
            {objectFit: "contain", height: "350px"}
          }
          alt="tasd"
          width={width}
          height={height}
          loading="lazy"
        />

      </div>
      <div className="pl-1">
        <p className="text-md line-clamp-2 overflow-hidden">
          {product.name}
        </p>
      </div>
      <div className="pl-1">
        <div>
          <div className="flex flex-wrap  flex-col">
            <div className="line-through font-semibold pt-1 text-xs">
              <span className="crystallize-price ">
                {product.oldPrice ?? ""} $
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <div className="text-md font-semibold text-green2">
                <span className="crystallize-price ">
                  {((product.priceText ?? product.price.toString() ?? "") as string).substring(0,12)} $
                </span>
              </div>
              <div className="text-sm py-1 px-2 h-[26px] rounded-md bg-[#efefef] font-medium">
                {product.oldPrice && Math.trunc((100 * (product.price - product.oldPrice)) / product.oldPrice) as number}% off
              </div>
            </div>
          </div>
        </div>
      </div>
    </a>

  )
}



function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

