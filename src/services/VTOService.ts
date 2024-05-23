import axios from 'axios'
import { getCookie } from 'cookies-next'
import {
  BizAffiliateProduct,
  BizAffiliateProductCategory,
} from '~/components/biz/bizAffiliateProduct'

import { BizCollection } from '~/components/biz/bizCollections'
import { BizGenerate } from '~/components/biz/bizGenerate'
import { BizModel } from '~/components/biz/bizModels'

export class TryOnViewModel {
  public userId?: string

  public username?: string

  public clientUniqueKey?: number

  public humanBodyImageSrc?: string

  public humanBodyImageTemplateId?: string

  public clothesImageSrc: string

  public clothesImageSrcTemplateId?: string
  
  public clothesType?: string;

  public productId?: string;

  public browserKey?: string

  public lastActive?: string

  constructor({
    humanBodyImageSrc: _humanBodyImageSrc,
    clothesImageSrc: _clothesImageSrc,
    clothesType: _clothesType,
    productId: _productId,
  }) {
    this.humanBodyImageSrc = _humanBodyImageSrc
    this.clothesImageSrc = _clothesImageSrc
    this.clothesType = (_clothesType)?.toLowerCase()
    this.productId = _productId
  }
}

export class BizGenerateModel {
  public bizId: string

  public bizUsername: string

  public albumName: string

  public albumDescription: string

  public collectionItem?: {}

  public modelList?: {}

  public versionAI: string

  public isHDImage: boolean

  public isMultipleOutput: boolean
}

export class VTOService {
  tokenHeader = '000'
  bizId = null
  async uploadSrcHumanClothSK(src: TryOnViewModel) {
    return await axios.post(
      `https//api.tryonhub.ai/public/gen-human-clothes-image`,
      src,
      { timeout: 5 * 60 * 1000 },
    )
  }
  async uploadSrcHumanClothRest(src: TryOnViewModel) {
    return await axios.post(
      `https//api.tryonhub.ai/public/gen-human-clothes-image`,
      src,
      { timeout: 5 * 60 * 1000 },
    )
  }

  async uploadSrcHumanClothRestV2(src: TryOnViewModel) {
    return await axios.post(
      `https://api.tryonhub.ai/public/gen-human-clothes-image-v2`,
      src,
      {
        timeout: 5 * 60 * 1000,
        headers: { Authorization: 'Bearer ' + this.tokenHeader },
      },
    )
  }

  async createBatch(src: BizGenerate) {
    return await axios.post(
      `https://api.tryonhub.ai/biz/generatives/new`,
      src,
      {
        timeout: 5 * 60 * 1000,
        headers: { Authorization: 'Bearer ' + this.tokenHeader },
      },
    )
  }

  async saveBatch(src: BizGenerate) {
    return await axios.post(
      `https://api.tryonhub.ai/biz/generatives/save`,
      src,
      {
        timeout: 5 * 60 * 1000,
        headers: { Authorization: 'Bearer ' + this.tokenHeader },
      },
    )
  }

  async createNewModel(src: BizModel) {
    return await axios.post(`https://api.tryonhub.ai/biz/models/new`, src, {
      timeout: 5 * 60 * 1000,
      headers: { Authorization: 'Bearer ' + this.tokenHeader },
    })
  }

  //
  async createNewCollection(src: BizCollection) {
    return await axios.post(
      `https://api.tryonhub.ai/biz/collections/new`,
      src,
      {
        timeout: 5 * 60 * 1000,
        headers: { Authorization: 'Bearer ' + this.tokenHeader },
      },
    )
  }

  async deleteCollection(id: string) {
    return await axios.get(
      `https://api.tryonhub.ai/biz/collections/delete/${id}`,
      {
        timeout: 5 * 60 * 1000,
        headers: { Authorization: 'Bearer ' + this.tokenHeader },
      },
    )
  }

  async deleteModel(id: string) {
    return await axios.get(`https://api.tryonhub.ai/biz/models/delete/${id}`, {
      timeout: 5 * 60 * 1000,
      headers: { Authorization: 'Bearer ' + this.tokenHeader },
    })
  }

  async deleteGenerative(id: string) {
    return await axios.get(
      `https://api.tryonhub.ai/biz/generatives/delete/${id}`,
      {
        timeout: 5 * 60 * 1000,
        headers: {
          Authorization:
            'Bearer ' +
            (this.tokenHeader ?? localStorage.getItem('access_token')),
        },
      },
    )
  }

  async regenerateGenerative(id: string) {
    return await axios.post(
      `https://api.tryonhub.ai/biz/generatives/re-generate/${id}`,
      {},
      {
        timeout: 5 * 60 * 1000,
        headers: {
          Authorization:
            'Bearer ' +
            (this.tokenHeader ?? localStorage.getItem('access_token')),
        },
      },
    )
  }

  async deleteOutput(
    bizId: string,
    albumId: string,
    outputId: string,
    urlIndex: number,
  ) {
    return await axios.get(
      `https://api.tryonhub.ai/biz/generatives/${bizId}/album/${albumId}/remove-output/${outputId}/${urlIndex}`,
      {
        timeout: 5 * 60 * 1000,
        headers: { Authorization: 'Bearer ' + this.tokenHeader },
      },
    )
  }

  async getGenerative(albumId: string) {
    return await axios.get(
      `https://api.tryonhub.ai/biz/generatives/getItem/${albumId}`,
      {
        timeout: 5 * 60 * 1000,
        headers: { Authorization: 'Bearer ' + this.tokenHeader },
      },
    )
  }

  async deleteAll(bizId: string) {
    return await axios.get(`https://api.tryonhub.ai/biz/deleteAll/${bizId}`, {
      timeout: 5 * 60 * 1000,
      headers: { Authorization: 'Bearer ' + this.tokenHeader },
    })
  }

  async getAllModels(bizId: string) {
    return await axios.get<BizModel[]>(
      `https://api.tryonhub.ai/biz/models/getAll/${bizId}`,
      {
        timeout: 5 * 60 * 1000,
        headers: { Authorization: 'Bearer ' + this.tokenHeader },
      },
    )
  }

  async getAllCollections(bizId: string) {
    return await axios.get(
      `https://api.tryonhub.ai/biz/collections/getAll/${bizId}`,
      {
        timeout: 5 * 60 * 1000,
        headers: { Authorization: 'Bearer ' + this.tokenHeader },
      },
    )
  }
  async getAllGeneratives(bizId: string) {
    return await axios.get(
      `https://api.tryonhub.ai/biz/generatives/getAll/${bizId}`,
      {
        timeout: 5 * 60 * 1000,
        headers: { Authorization: 'Bearer ' + this.tokenHeader },
      },
    )
  }

  async registerAPI(loginObj: {}): Promise<any> {
    return await axios.post(
      `https://api.tryonhub.ai/auth/register`,
      loginObj,
      {
        timeout: 5 * 60 * 1000,
        headers: { Authorization: 'Bearer ' + this.tokenHeader },
      },
    )
  }

  async ssoLoginAPI(loginObj: {}): Promise<any> {
    return await axios.post(
      `https://api.tryonhub.ai/auth/sso-signin`,
      loginObj,
      {
        timeout: 5 * 60 * 1000,
        headers: { Authorization: 'Bearer ' + this.tokenHeader },
      },
    )
  }

  async loginAPI(loginObj: {}): Promise<any> {
    return await axios.post(`https://api.tryonhub.ai/auth/login`, loginObj, {
      timeout: 5 * 60 * 1000,
      headers: { Authorization: 'Bearer ' + this.tokenHeader },
    })
  }

  async getUserInfo(usernameOrEmail: string) {
    return await axios.get(
      `https://api.tryonhub.ai/auth/find/${usernameOrEmail}`,
      {
        timeout: 5 * 60 * 1000,
        headers: { Authorization: 'Bearer ' + this.tokenHeader },
      },
    )
  }

  async saveCategories(src: BizAffiliateProductCategory[]) {
    return await axios.post(
      `https://api.tryonhub.ai/biz/category/new`,
      src,
      {
        timeout: 5 * 60 * 1000,
        headers: { Authorization: 'Bearer ' + this.tokenHeader },
      },
    )
  }

  async getAllCategories(bizId: string) {
    return await axios.get(
      `https://api.tryonhub.ai/biz/category/getAll/${bizId}`,
      {
        timeout: 5 * 60 * 1000,
        headers: { Authorization: 'Bearer ' + this.tokenHeader },
      },
    )
  }

  async getAllProvider(bizId: string) {
    return await axios.get(
      `https://api.tryonhub.ai/public/affiliate-products/getProviders`,
      {
        timeout: 5 * 60 * 1000,
        headers: { Authorization: 'Bearer ' + this.tokenHeader },
      },
    )
  }


  async deleteCategory(bizId: string, id: string) {
    return await axios.get(`https://api.tryonhub.ai/biz/category/delete/${id}`, {
      timeout: 5 * 60 * 1000,
      headers: { Authorization: 'Bearer ' + this.tokenHeader },
    })
  }

  async saveAffiliateProduct(src: BizAffiliateProduct) {
    return await axios.post(`https://api.tryonhub.ai/biz/products/new`, src, {
      timeout: 5 * 60 * 1000,
      headers: { Authorization: 'Bearer ' + this.tokenHeader },
    })
  }

  async importAffiliateProduct(src: BizAffiliateProduct[]) {
    return await axios.post(`https://api.tryonhub.ai/biz/products/import`, src, {
      timeout: 5 * 60 * 1000,
      headers: { Authorization: 'Bearer ' + this.tokenHeader },
    })
  }

  async crawAmazoneProduct(urls: string[]) {
    return await axios.post(`https://api.tryonhub.ai/biz/products/crawl/amazon`, urls, {
      timeout: 5 * 60 * 1000,
      headers: { Authorization: 'Bearer ' + this.tokenHeader },
    })
  }

  async getAffiliateProducts(bizId: string, offset: number = 0) {
    return await axios.get(
      `https://api.tryonhub.ai/biz/products/getAll/${bizId}/${offset}`,
      {
        timeout: 5 * 60 * 1000,
        headers: { Authorization: 'Bearer ' + this.tokenHeader },
      },
    )
  }

  async deleteAffiliateProduct(bizId: string, id: string) {
    return await axios.get(`https://api.tryonhub.ai/biz/products/delete/${id}`, {
      timeout: 5 * 60 * 1000,
      headers: { Authorization: 'Bearer ' + this.tokenHeader },
    })
  }

  // =================================================================

  async getAIRecommendingProducts(human_url: string) {
    return await axios.post(
      `https://api.tryonhub.ai/public/affiliate-products/getAIRecommendingProducts`,
      {
        human_url: human_url
      },
      {
        timeout: 5 * 60 * 1000,
        headers: { Authorization: 'Bearer ' + this.tokenHeader },
      },
      
    )
  }
  async getLastTryProducts(human_url: string) {
    return await axios.post(
      `https://api.tryonhub.ai/public/affiliate-products/getLastTry`,
      {
        human_url: human_url
      },
      {
        timeout: 5 * 60 * 1000,
        headers: { Authorization: 'Bearer ' + this.tokenHeader },
      },
      
    )
  }
  async getTrendingProducts(bizId: string) {
    return await axios.get(
      `https://api.tryonhub.ai/public/affiliate-products/getTrends`,
      {
        timeout: 5 * 60 * 1000,
        headers: { Authorization: 'Bearer ' + this.tokenHeader },
      },
    )
  }
  async getByStatusProducts( status: string) {
    return await axios.get(
      `https://api.tryonhub.ai/public/affiliate-products/getByStatus/${status}`,
      {
        timeout: 5 * 60 * 1000,
        headers: { Authorization: 'Bearer ' + this.tokenHeader },
      },
    )
  }
  async getByCategoryProducts(bizId: string, categoryName: string) {
    return await axios.get(
      `https://api.tryonhub.ai/public/affiliate-products/getCategories/${bizId}/${categoryName}`,
      {
        timeout: 5 * 60 * 1000,
        headers: { Authorization: 'Bearer ' + this.tokenHeader },
      },
    )
  }
  async getByGroupProducts(productGroupType: string) {
    return await axios.get(
      `https://api.tryonhub.ai/public/affiliate-products/getProductsByGroupType/${productGroupType.toUpperCase()}`,
      {
        timeout: 5 * 60 * 1000,
        headers: { Authorization: 'Bearer ' + this.tokenHeader },
      },
    )
  }


}

export const vtoService = new VTOService()
