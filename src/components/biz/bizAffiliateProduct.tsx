export class BizAffiliateProduct {
  id?: string;
  bizId: string;
  name?: string;
  category?: string;
  categoryId?: string;
  type?: string;
  price?: number;
  priceText?: string;
  oldPrice?: number;
  discountPercentage?: number;
  desc?: string;
  images?: any[];
  createdDate?: string;
  affiliateUrl?: string;

  affiliateText?: string;

  affiliateProvider?: string;

  groupType? = "UPPERBODY" || "DRESS" || "LOWERBODY" || "UNKNOWN";


  status? = "TRENDING" || "NEW" || "DISABLE" || "SALE";
}

export class BizAffiliateProductCategory {
  id?: string;
  bizId?: string;
  label?: string;
  type?: string;
  content?: string;
  imageSrc?: string;
  createdDate?: string;
}

const BizAffiliateProducts: BizAffiliateProduct[] = [
  {
    id: "collection00000001",
    name: 'Summer collection 2024 ',
    bizId: '0',
    price: 20,
    oldPrice: 30,
    desc: 'Template collection demo',
    images: [
      {
        id: 1,
        url: 'https://www.tryonhub.ai/clothes/partners/0001.png'
      },
      {
        id: 2,
        url: 'https://www.tryonhub.ai/clothes/partners/0002.png'
      }
    ],
  }


]

export default BizAffiliateProducts
