import BizCollections, { BizCollection } from "./bizCollections";
import BizModels, { BizModel } from "./bizModels";
export class BizResult {
  uid: string;
  userid: string;
  bizId?: string;
  albumId?: string;
  collectionId?: string;
  collectionImageId?: string;
  modelId?: string;
  modelImageId?: string;
  bodySrc: string;
  clotheName: string;
  clothesSrc: string;
  createdDate: string;
  SECOND_OF_TIME_TAKEN ?: string;
  OUTPUT_IMAGE ?: string;  
  OUTPUT_IMAGE_2HD ?: string;  
}

export class BizOutput {
  id ?: string;
  createdDate?: string;
  completedDate?: string;
  totalCount ?: number;
  currentCount ?: number;
  data?: BizResult[];
  detetedImage?: string[];
}

export class BizGenerate {
  _id ?: string;
  id ?: string;
  bizId: string;
  name: string;
  state: string;
  startTime?: number;
  endEnd?: number;
  percentage?: number;
  lastest: boolean;
  desc?: string;
  models?: BizModel[];
  modelsIds?: BizModel[];
  collection?: BizCollection[];
  collectionItemId?: string
  modelListIds?: string[];
  output?: any[];
  createdDate?: string;
  versionName ?: string;

  
  collectionItemModel?: BizCollection;
  modelListItemModel?: BizModel[];
  outputDetail ?: BizOutput;
}

const BizGenerateBatchs: BizGenerate[] = [
  {
    id: "0",
    bizId: "0",
    name: 'Lisaa ',
    state: 'processing',
    startTime: 1709526234,
    endEnd: 1709526234,
    percentage: 12,
    lastest: true,
    desc: 'batch spring generate...',
    models: BizModels,
    collection: BizCollections,
    output: [
      {
        id: '0',
        human: {
          id: '0',
          url: 'https://www.tryonhub.ai/images/body-photo-1.jpg'
        },
        clothes: {
          id: '0',
          url: 'https://www.tryonhub.ai/clothes/partners/0003.png'
        },
        outputV1: {
          id: '0',
          url: 'https://ik.imagekit.io/hwh9a2pvdz/1709494859.074176_SBJRazXz_',
          urlHd: 'https://ik.imagekit.io/hwh9a2pvdz/1709494859.074176_SBJRazXz_-2HD',
          timestamp: 30.3323,
          server: "GPU-T4-1"
        },
        outputV2: {
          id: '0',
          url: 'https://ik.imagekit.io/hwh9a2pvdz/1709494859.074176_SBJRazXz_',
          urlHd: 'https://ik.imagekit.io/hwh9a2pvdz/1709494859.074176_SBJRazXz_-2HD',
          timestamp: 30.3323,
          server: "GPU-T4-2"
        },
      },
      {
        id: '22222',
        human: {
          id: '2',
          url: 'https://www.tryonhub.ai/images/body-photo-1.jpg'
        },
        clothes: {
          id: '2',
          url: 'https://www.tryonhub.ai/clothes/partners/0003.png'
        },
      }
    ],
  },
  {
    id: "tryonhub00000002",
    bizId: "0",
    name: 'Jissooo ',
    state: 'done',
    startTime: 1709526234,
    endEnd: 1709526234,
    percentage: 100,
    lastest: true,
    desc: 'batch summer generate...',
    output: [
      {
        id: 1,
        human: {
          id: 1,
          url: 'https://www.tryonhub.ai/images/body-photo-2.jpg'
        },
        clothes: {
          id: 1,
          url: 'https://www.tryonhub.ai/clothes/partners/0002.png'
        },
        outputV1: {
          id: 1,
          url: 'https://ik.imagekit.io/hwh9a2pvdz/1709494859.074176_SBJRazXz_',
          urlHd: 'https://ik.imagekit.io/hwh9a2pvdz/1709494859.074176_SBJRazXz_-2HD',
          timestamp: 30.3323,
          server: "GPU-T4-1"
        },
        outputV2: {
          id: 1,
          url: 'https://ik.imagekit.io/hwh9a2pvdz/1709494859.074176_SBJRazXz_',
          urlHd: 'https://ik.imagekit.io/hwh9a2pvdz/1709494859.074176_SBJRazXz_-2HD',
          timestamp: 30.3323,
          server: "GPU-T4-2"
        },
      }
    ],
  },
]

export default BizGenerateBatchs
