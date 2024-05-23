 
 export class BizModel {
 
  id ?: string;
  bizId: string;
  name: string;
  age?: number;
  desc?: string;
  images: any[
    
  ];
  createdDate?: string;
}

const BizModels: BizModel[] = [
  {
    id: "tryonhub00000001",
    name: 'Lisaa',
    bizId: '0',
    age: 20,
    desc: 'Lisaa aaaaaaaaaaaaaa aa',
    images: [
      {
        id: 1,
        url: 'https://www.tryonhub.ai/images/body-photo-1.jpg'
      },
      {
        id: 2,
        url: 'https://www.tryonhub.ai/images/body-photo-2.jpg'
      }
    ],
  },
  {
    id: "tryonhub00000002",
    name: 'Jisoo ',
    bizId: '0',
    age: 22,
    desc: 'Lisaa aaaaaaaaaaaaaa aa',
    images: [
      {
        id: 1,
        url: 'https://www.tryonhub.ai/images/body-photo-3.jpg'
      },
      {
        id: 2,
        url: 'https://www.tryonhub.ai/images/body-photo-4.jpg'
      }
    ],
  },
  ,
  {
    id: "tryonhub00000003",
    name: 'AAAAA ',
    bizId: '0',
    age: 22,
    desc: 'Lisaa aaaaaaaaaaaaaa aa',
    images: [
      {
        id: 1,
        url: 'https://www.tryonhub.ai/images/body-photo-5.jpg'
      },
      
    ],
  },
  ,
  {
    id: "tryonhub00000004",
    name: 'VVVV ',
    bizId: '0',
    age: 22,
    desc: 'Lisaa aaaaaaaaaaaaaa aa',
    images: [
      {
        id: 1,
        url: 'https://www.tryonhub.ai/images/body-photo-6.jpg'
      },
     
    ],
  },
]

export default BizModels
