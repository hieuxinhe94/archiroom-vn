interface UserEntity {

  hasAccount?: boolean,
  hasLogin?: boolean,

  id?: string,
  name?: string,
  email?: string,
  cookie?: string,
  access_token?: string,

  avatar?: string,

  mainBodyPhoto?: string,
  bodyPhoto?: string[],
  mainClothesPhoto?: string,
  mainClothesMetadata?: {},
  clothesPhoto?: string[],
  dateCreated?: string[],

  mainPredictedPhoto?: string,
  mainPredictedPhotoHD?: string,
  predictedPhotos?: string[],
  predictedPhotosHD?: string[],
  predictedMessages?: string[],
  // new
  bizId?: string,
  username?: string,
  nickname?: string,
  credit?: number,
  isStartWithFree?: boolean,
 
}