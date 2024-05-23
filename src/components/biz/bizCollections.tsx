export class BizCollection {
  id? : string;
  bizId: string;
  name ?: string;
  type ?: string;
  age ?: number;
  desc?: string;
  images: any[];
  createdDate?: string;
}

const BizCollections: BizCollection[] = [
  {
    id: "collection00000001",
    name: 'Summer collection 2024 ',
    bizId: '0',
    age: 20,
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
  },
  {
    id: "collection00000002",
    name: 'Spring collection 2024 ',
    bizId: '0',
    age: 22,
    desc: 'Template collection demo',
    images: [
      {
        id: 1,
        url: 'https://www.tryonhub.ai/clothes/partners/0003.png'
      },
      {
        id: 2,
        url: 'https://www.tryonhub.ai/clothes/partners/0004.png'
      }
    ],
  },

]

export default BizCollections
